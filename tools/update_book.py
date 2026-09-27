#!/usr/bin/env python3
"""update_book.py [REPO] [--from VERSION] [--url BOOK_URL] -- what Claude does to move a book to this checkout's page.

    python3 tools/update_book.py                         # this checkout; the book's data version unknown
    python3 tools/update_book.py --from 0.1.0            # the book's meta/buch.version, read before with ArtifactData
    python3 tools/update_book.py --url <the book's URL>  # put the address into the printed steps

Checks the checkout (VERSION, the page's PAGE_VERSION, the update block, the forbidden-strings check) and prints the
file to publish, the migrations that will run and the steps: publish to the book's own URL, open it once as a viewer
who may write (the page migrates the data itself), verify meta/buch. It uses no network and changes nothing; the
publishing is done by Claude with the Artifact tool. Exit 1 when the checkout is not fit to publish."""
import os, re, subprocess, sys


def ver(v):
    m = re.fullmatch(r'(\d+)\.(\d+)\.(\d+)', (v or '').strip())
    return tuple(int(x) for x in m.groups()) if m else (0, 0, 0)


def main(argv):
    args = list(argv); opt = {}
    for k in ('--from', '--url'):
        if k in args:
            i = args.index(k); opt[k] = args[i + 1] if i + 1 < len(args) else ''; del args[i:i + 2]
    repo = os.path.abspath(args[0] if args else os.path.join(os.path.dirname(os.path.abspath(__file__)), '..'))
    page_p = os.path.join(repo, 'template', 'book.html')
    bad = []
    version = open(os.path.join(repo, 'VERSION'), encoding='utf-8').read().strip()
    page = open(page_p, encoding='utf-8').read()
    m = re.search(r'const PAGE_VERSION="([^"]*)";', page)
    pv = m.group(1) if m else None
    if pv != version:
        bad.append('template/book.html has PAGE_VERSION %s, VERSION says %s: run template/build_template.py template/book.html' % (pv, version))
    if '/* == book-update: begin ==' not in page or 'bookUpdate(db);' not in page:
        bad.append('template/book.html has no update block or does not call it: run template/build_template.py template/book.html')
    migs = re.findall(r'\{to:"(\d+\.\d+\.\d+)",was:"([^"]*)"', page)
    if any(ver(t) > ver(version) for t, _ in migs):
        bad.append('a migration is newer than VERSION %s: %s' % (version, ', '.join(t for t, _ in migs if ver(t) > ver(version))))
    top = re.search(r'^const BUCH_LOG=\[\{"v": "([^"]*)"', page, flags=re.M)
    if not top or top.group(1) != version:
        bad.append('the page\'s change log (BUCH_LOG) has no entry for %s on top' % version)
    fb = subprocess.run([sys.executable, os.path.join(repo, 'suite', 'forbidden.py'), page_p], capture_output=True, text=True)
    if fb.returncode:
        bad.append('the forbidden-strings check fails:\n' + fb.stdout.strip())

    frm = opt.get('--from')
    run = [(t, w) for t, w in sorted(migs, key=lambda x: ver(x[0])) if ver(t) > ver(frm) and ver(t) <= ver(version)]
    url = opt.get('--url') or '<the book\'s URL -- it stands in the project\'s own CLAUDE.md, never in this repository>'
    print('Decision book page %s' % version)
    print('  file to publish: %s' % page_p)
    print('  book data now:   %s' % (frm if frm else 'unknown (read meta/buch.version first; no meta/buch = before 0.1.0)'))
    if frm and ver(frm) > ver(version):
        print('  the book is NEWER than this page -- do not publish an older page over it')
        bad.append('book %s is newer than page %s' % (frm, version))
    print('  migrations the page will run: %s' % ('; '.join('%s (%s)' % x for x in run) if run else 'none'))
    print('''
Steps (Claude, with the Artifact and ArtifactData tools):
  1. suite/run_all.sh green on template/book.html (and breaks/counterproof.py after a change to the page).
  2. Read the book's meta/buch with ArtifactData (collection "meta", doc "buch"): note version and migriert.
     Rerun this script with --from <version> (no meta/buch: leave --from out).
  3. Publish: Artifact publish, url = %s,
     file_path = %s. Leave "capabilities" out: the book keeps db, comments, assets, user, downloads.
  4. Open it once in the owner's browser (Artifact open), or let anyone who may write open it. The page itself runs the
     migrations above in order and shows its progress under the header; at the end "Buch aktualisiert: Datenstand … → %s".
     A viewer without write access only sees a hint; nothing is migrated until a writer opens it. Tabs still showing the
     old page should be reloaded: an old page keeps writing the old field names.
  5. Verify with ArtifactData: meta/buch.version == "%s" and meta/buch.migriert contains %s.
     If the page said "Aktualisierung angehalten bei <x>: <why>", meta/buch.version is unchanged: fix the cause
     (for 0.1.0 with several unknown "…_am" fields: set meta/buch.stempel_alt to the old stamp field) and open again.
  6. Nothing to delete: migrations copy old fields and keep them.''' % (url, page_p, version, version, [t for t, _ in migs if ver(t) <= ver(version)]))
    for b in bad:
        print('NOT READY: ' + b)
    return 1 if bad else 0


if __name__ == '__main__':
    sys.exit(main(sys.argv[1:]))
