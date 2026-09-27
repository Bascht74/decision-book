scenario(async out=>{
  await until(()=>document.querySelector('#board .rtab'));await sleep(100);
  const tb=document.querySelector('#board .relgrp[data-rel="3.0.0b28"] table'),bd=document.getElementById('board');
  const tr=tb.querySelector('tr[data-nr="E-001"]'),t=tr.querySelector('td.t'),n=tr.querySelectorAll('td.n');
  const cs=e=>getComputedStyle(e),bw=bd.getBoundingClientRect().width,tw=tb.getBoundingClientRect().width;
  out.tableWidthShare=Math.round(100*tw/bw);
  out.titleShare=Math.round(100*t.getBoundingClientRect().width/tw);
  out.titleMono=/mono|menlo/i.test(cs(t).fontFamily);out.titleFontIsBody=cs(t).fontFamily===cs(document.body).fontFamily;
  out.titleAlign=cs(t).textAlign;out.numbersAlign=[...n].map(x=>cs(x).textAlign).join(',');
  {const r=document.createRange();r.selectNodeContents(t);out.titleLines=new Set([...r.getClientRects()].map(x=>Math.round(x.top))).size}
  const rt=document.querySelector('#ready .rtab');
  out.countsTable=rt?{mono:/mono|menlo/i.test(cs(rt.querySelector('td')).fontFamily),maxWidth:cs(rt).maxWidth}:null;
});
