#!/usr/bin/env python3
"""check.py NAME DOMFILE EXPECTFILE -- prints "ok NAME", "skip NAME: why" or "FAIL NAME: ..."; exit 0 ok, 2 skip, 1 fail.
Expectations (EXPECTFILE "expect"): key -> value. A key may be a dotted path ("a.b.0"). A value is compared exactly,
unless it is an object whose keys are all matchers: {"min":n} {"max":n} {"re":"regex"} {"len":n} {"has":x} {"lacks":x}
{"eq":x}. Every output must also carry "_errors": [] and no "_exception"."""
import sys, os, json, re, base64
name, domf, expf = sys.argv[1:4]
MATCH = {'min', 'max', 're', 'len', 'has', 'lacks', 'eq'}
def short(v, n=300):
    s = json.dumps(v, ensure_ascii=False)
    return s if len(s) <= n else s[:n] + '…'
def fail(msg):
    print('FAIL %s: %s' % (name, msg)); sys.exit(1)
try: dom = open(domf, encoding='utf-8', errors='replace').read()
except OSError: dom = ''
m = re.search(r'<pre id="suite-out">([A-Za-z0-9+/=]+)</pre>', dom)
if not m:
    fail('no output from the page (scenario never probed, Chrome timed out, or the page did not load); dom %d bytes' % len(dom))
out = json.loads(base64.b64decode(m.group(1)).decode('utf-8'))
spec = json.load(open(expf, encoding='utf-8'))
if os.environ.get('SHOW'): sys.stderr.write('--- %s output: %s\n' % (name, json.dumps(out, ensure_ascii=False)))
if out.get('_errors'): fail('page error(s): %s' % short(out['_errors']))
if out.get('_exception'): fail('scenario threw: %s' % out['_exception'])
if out.get('_skip'): print('skip %s: %s' % (name, out['_skip'])); sys.exit(2)
MISSING = object()
def get(o, path):
    for p in path.split('.'):
        if isinstance(o, dict) and p in o: o = o[p]
        elif isinstance(o, list) and p.lstrip('-').isdigit() and -len(o) <= int(p) < len(o): o = o[int(p)]
        else: return MISSING
    return o
def contains(v, x):
    if isinstance(v, str): return isinstance(x, str) and x in v
    if isinstance(v, list): return x in v or (isinstance(x, str) and any(isinstance(e, str) and x in e for e in v))
    return False
def judge(v, e):
    """None if v satisfies e, else a reason"""
    if isinstance(e, dict) and e and set(e) <= MATCH:
        for k, x in e.items():
            if v is MISSING: return 'missing'
            if k == 'eq' and v != x: return 'not equal'
            if k == 'min' and not (isinstance(v, (int, float)) and v >= x): return 'below min %s' % x
            if k == 'max' and not (isinstance(v, (int, float)) and v <= x): return 'above max %s' % x
            if k == 're' and not (isinstance(v, str) and re.search(x, v)): return 'no match for /%s/' % x
            if k == 'len' and not (hasattr(v, '__len__') and len(v) == x): return 'length is not %s' % x
            if k == 'has' and not contains(v, x): return 'does not contain %s' % short(x)
            if k == 'lacks' and contains(v, x): return 'contains %s' % short(x)
        return None
    return None if v == e else 'differs'
bad = []
for path, e in spec.get('expect', {}).items():
    v = get(out, path)
    why = judge(v, e)
    if why:
        bad.append('%s %s: expected %s, got %s' % (path, why, short(e, 160), 'nothing' if v is MISSING else short(v, 240)))
if bad: fail(' | '.join(bad))
print('ok %s' % name)
