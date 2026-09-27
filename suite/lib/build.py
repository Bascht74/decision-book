#!/usr/bin/env python3
"""build.py SRC SCEN_DIR NAME OUT_DIR WRAP_WIDTH HEIGHT
Writes OUT_DIR/NAME.html = the page SRC with stand-in + common + NAME.pre.js right after <body>
and NAME.epi.js right before </body>. With WRAP_WIDTH > 0 also OUT_DIR/w_NAME.html, an iframe of exactly
that width around it (headless Chrome will not make a window narrower than 500 px)."""
import sys, os
src, scen, name, out, wrap, height = sys.argv[1:7]
lib = os.path.dirname(os.path.abspath(__file__))
page = open(src, encoding='utf-8').read()
rd = lambda p: open(p, encoding='utf-8').read() if os.path.exists(p) else ''
pre = rd(os.path.join(lib, 'stub.js')) + '\n' + rd(os.path.join(lib, 'common.js')) + '\n' + '{\n' + rd(os.path.join(scen, name + '.pre.js')) + '\n}'
epi = '{\n' + rd(os.path.join(scen, name + '.epi.js')) + '\n}'
i = page.find('<body>')
if i < 0: sys.exit('no <body> in ' + src)
i += len('<body>')
page = page[:i] + '<script>\n' + pre + '\n</script>' + page[i:]
j = page.rfind('</body>')
if j < 0: j = len(page)
page = page[:j] + '<script>\n' + epi + '\n</script>\n' + page[j:]
open(os.path.join(out, name + '.html'), 'w', encoding='utf-8').write(page)
if int(wrap):
    open(os.path.join(out, 'w_' + name + '.html'), 'w', encoding='utf-8').write(
        '<!doctype html><html><body style="margin:0"><iframe src="%s.html" width="%s" height="%s" style="border:0;display:block"></iframe>'
        '<script>addEventListener("message",e=>{if(typeof e.data!=="string"||!e.data.startsWith("SUITE:"))return;'
        'const p=document.createElement("pre");p.id="suite-out";p.textContent=e.data.slice(6);document.body.appendChild(p)})</script></body></html>'
        % (name, wrap, height))
