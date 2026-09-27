{const out={};try{
  out.hrefs=$$('a').map(a=>a.getAttribute('href')).filter(h=>h!=null);
  out.notHttp=out.hrefs.filter(h=>!/^https?:\/\//i.test(h));
  out.badImg=$$('img[src]').map(i=>i.getAttribute('src')).filter(s=>!/^(https?:\/\/|data:image\/|blob:|\/_blob\/)/i.test(s));
  out.talkLinks=$$('[data-g="g1"] .bub a').map(a=>a.getAttribute('href'));
}catch(e){out._exception=String(e&&e.stack||e).slice(0,300)}probe(out)}
