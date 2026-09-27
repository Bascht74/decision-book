#!/usr/bin/env python3
"""pool.py -- a few headless Chromes, started once per suite run and reused by every scenario.

  pool.py serve SOCKET JOBS      starts JOBS headless Chromes (DevTools over --remote-debugging-pipe, no library),
                                 answers on the Unix socket SOCKET, closes every Chrome on SIGTERM/SIGINT or when
                                 its parent (run_all.sh) is gone. One line per launch goes to SOCKET.log.
  pool.py dump SOCKET PAGE WIDTH HEIGHT BUDGET FLAGS DOMFILE
                                 runs PAGE in a free Chrome and writes what `--dump-dom` wrote to DOMFILE.

Per scenario, as `--headless --dump-dom` did with its own profile: a fresh browser context (own localStorage and
IndexedDB, thrown away afterwards), a WIDTHxHEIGHT viewport, --virtual-time-budget=BUDGET, then doctype + outerHTML.
FLAGS: only --force-dark-mode is known; it becomes prefers-color-scheme: dark."""
import fcntl, json, os, queue, shutil, signal, socket, socketserver, subprocess, sys, tempfile, threading

CHROME = os.environ.get('CHROME', '/Applications/Google Chrome.app/Contents/MacOS/Google Chrome')
ARGS = ['--headless', '--disable-gpu', '--hide-scrollbars', '--no-first-run', '--no-default-browser-check',
        '--disable-background-networking', '--disable-sync', '--disable-component-update', '--use-mock-keychain',
        '--password-store=basic', '--host-resolver-rules=MAP * ~NOTFOUND', '--allow-file-access-from-files',
        '--lang=de-DE', '--remote-debugging-pipe']
DUMP = ("(document.doctype?new XMLSerializer().serializeToString(document.doctype)+'\\n':'')"
        "+document.documentElement.outerHTML")
WALL = 45  # seconds a scenario may take at most, as before


class Chrome:
    """One Chrome process and its DevTools pipe (fd 3 in, fd 4 out, NUL-delimited JSON)."""
    def __init__(self, profile):
        to_r, self.to_w = os.pipe()
        self.from_r, from_w = os.pipe()
        def fds():  # in the child: the pipe ends become fd 3 and fd 4
            a, b = fcntl.fcntl(to_r, fcntl.F_DUPFD, 10), fcntl.fcntl(from_w, fcntl.F_DUPFD, 10); os.dup2(a, 3); os.dup2(b, 4)
        env = dict(os.environ, TZ='Europe/Berlin', LANG='de_DE.UTF-8')
        self.proc = subprocess.Popen([CHROME] + ARGS + ['--user-data-dir=' + profile, 'about:blank'], env=env,
                                     stdin=subprocess.DEVNULL, stdout=subprocess.DEVNULL, stderr=subprocess.DEVNULL,
                                     preexec_fn=fds, pass_fds=(3, 4))
        os.close(to_r); os.close(from_w)
        self.profile, self.n, self.lock = profile, 0, threading.Lock()
        self.pending, self.waiters = {}, {}
        threading.Thread(target=self._read, daemon=True).start()

    def _read(self):
        buf = b''
        while True:
            try: chunk = os.read(self.from_r, 1 << 20)
            except OSError: chunk = b''
            if not chunk: break
            buf += chunk
            *msgs, buf = buf.split(b'\0')
            for raw in msgs:
                m = json.loads(raw)
                if 'id' in m:
                    box = self.pending.pop(m['id'], None)
                    if box: box.append(m); box[0].set()
                    continue
                if m.get('method') == 'Page.javascriptDialogOpening':  # nobody is there to click it
                    self.send('Page.handleJavaScriptDialog', {'accept': False}, m.get('sessionId'))
                ev = self.waiters.pop((m.get('method'), m.get('sessionId')), None)
                if ev: ev.set()
        for box in list(self.pending.values()): box[0].set()  # Chrome is gone: wake everyone

    def send(self, method, params=None, sid=None):
        with self.lock:
            self.n += 1; i = self.n
            box = [threading.Event()]; self.pending[i] = box
            msg = {'id': i, 'method': method, 'params': params or {}}
            if sid: msg['sessionId'] = sid
            os.write(self.to_w, json.dumps(msg).encode() + b'\0')
        return box

    def call(self, method, params=None, sid=None):
        box = self.send(method, params, sid)
        if not box[0].wait(WALL) or len(box) < 2: raise RuntimeError('%s: no answer from Chrome' % method)
        if 'error' in box[1]: raise RuntimeError('%s: %s' % (method, box[1]['error'].get('message')))
        return box[1].get('result', {})

    def expect(self, method, sid):
        ev = threading.Event(); self.waiters[(method, sid)] = ev; return ev

    def dump(self, page, width, height, budget, flags):
        unknown = [f for f in flags if f != '--force-dark-mode']
        if unknown: raise RuntimeError('flag not supported by lib/pool.py: %s' % ' '.join(unknown))
        ctx = self.call('Target.createBrowserContext')['browserContextId']
        try:
            tid = self.call('Target.createTarget', {'url': 'about:blank', 'browserContextId': ctx})['targetId']
            sid = self.call('Target.attachToTarget', {'targetId': tid, 'flatten': True})['sessionId']
            self.call('Page.enable', sid=sid)
            self.call('Emulation.setDeviceMetricsOverride',
                      {'width': width, 'height': height, 'deviceScaleFactor': 1, 'mobile': False}, sid)
            if '--force-dark-mode' in flags:
                self.call('Emulation.setEmulatedMedia', {'features': [{'name': 'prefers-color-scheme', 'value': 'dark'}]}, sid)
            # the budget starts at the load event: set before the navigation, it runs out before the file is read
            loaded = self.expect('Page.loadEventFired', sid)
            self.call('Page.navigate', {'url': 'file://' + page}, sid)
            if not loaded.wait(WALL): sys.stderr.write('pool: %s: no load event in %d s\n' % (page, WALL))
            done = self.expect('Emulation.virtualTimeBudgetExpired', sid)
            self.call('Emulation.setVirtualTimePolicy', {'policy': 'pauseIfNetworkFetchesPending', 'budget': budget}, sid)
            if not done.wait(WALL): sys.stderr.write('pool: %s: virtual time budget not reached in %d s\n' % (page, WALL))
            r = self.call('Runtime.evaluate', {'expression': DUMP, 'returnByValue': True}, sid)
            if 'exceptionDetails' in r: raise RuntimeError('DOM dump: %s' % r['result'].get('description', '?')[:200])
            return r['result'].get('value', '')
        finally:
            try: self.call('Target.disposeBrowserContext', {'browserContextId': ctx})
            except RuntimeError: pass

    def close(self):
        try: self.send('Browser.close')
        except OSError: pass
        try: self.proc.wait(5)
        except subprocess.TimeoutExpired: self.proc.kill(); self.proc.wait()
        shutil.rmtree(self.profile, ignore_errors=True)


def serve(sock, jobs):
    tmp = tempfile.mkdtemp(prefix='chrome_', dir=os.path.dirname(os.path.abspath(sock)))
    log = open(sock + '.log', 'a')
    chromes = []
    for k in range(jobs):
        c = Chrome(os.path.join(tmp, str(k))); chromes.append(c)
        log.write('launched pid %d\n' % c.proc.pid); log.flush()
    free = queue.Queue()
    for c in chromes: c.call('Browser.getVersion'); free.put(c)
    stop = threading.Event()
    def quit(*_): stop.set()
    signal.signal(signal.SIGTERM, quit); signal.signal(signal.SIGINT, quit)

    class Handler(socketserver.StreamRequestHandler):
        def handle(self):
            page, w, h, budget, flags, domf = json.loads(self.rfile.readline())
            c = free.get()
            try: html, err = c.dump(page, w, h, budget, flags), ''
            except Exception as e: html, err = '', str(e)
            finally: free.put(c)
            with open(domf, 'w', encoding='utf-8') as f: f.write(html + '\n' if html else '')
            self.wfile.write((err or 'ok').encode() + b'\n')

    here = os.getcwd(); os.chdir(os.path.dirname(os.path.abspath(sock)))  # a Unix socket path must stay short
    srv = socketserver.ThreadingUnixStreamServer(os.path.basename(sock), Handler); os.chdir(here)
    srv.daemon_threads = True
    threading.Thread(target=srv.serve_forever, daemon=True).start()
    parent = os.getppid()
    while not stop.wait(0.5):
        if os.getppid() != parent: break  # run_all.sh is gone without telling us
    srv.shutdown(); srv.server_close()
    for c in chromes: c.close()
    shutil.rmtree(tmp, ignore_errors=True)
    try: os.remove(sock)
    except OSError: pass


def dump(sock, page, w, h, budget, flags, domf):
    s = socket.socket(socket.AF_UNIX)
    here = os.getcwd(); os.chdir(os.path.dirname(os.path.abspath(sock)))
    s.connect(os.path.basename(sock)); os.chdir(here)
    s.sendall(json.dumps([page, int(w), int(h), int(budget), flags.split(), os.path.abspath(domf)]).encode() + b'\n')
    ans = s.makefile().readline().strip()
    if ans != 'ok': sys.stderr.write('pool: %s: %s\n' % (os.path.basename(page), ans))


if __name__ == '__main__':
    if sys.argv[1] == 'serve': serve(sys.argv[2], int(sys.argv[3]))
    else: dump(*sys.argv[2:9])
