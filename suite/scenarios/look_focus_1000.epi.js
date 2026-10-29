scenario(async out=>{
  await until(()=>document.querySelector('#board details')&&document.querySelector('#tabs button'));await sleep(100);
  const ring=e=>{e.focus();const cs=getComputedStyle(e);
    const r={visible:e.matches(':focus-visible'),width:cs.outlineWidth,c:cs.outlineStyle==='none'?0:ratio(rgbaOf(cs.outlineColor),groundOf(e,false)),cut:ringCut(e)};e.blur();return r};
  const tabs=$$('#tabs button').filter(b=>b.getClientRects().length);out.tabs=tabs.length;
  out.first=ring(tabs[0]);out.last=ring(tabs[tabs.length-1]);
  out.view=ring(document.querySelector('#views [aria-selected="false"]'));
});
