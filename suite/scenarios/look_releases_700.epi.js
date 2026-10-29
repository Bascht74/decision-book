scenario(async out=>{
  await until(()=>document.querySelector('#board .rtab tbody tr[data-nr]'));await sleep(100);
  document.querySelector('#board .rtab tbody tr[data-nr]').click();await sleep(80);   // a card opened below its row
  const tb=document.querySelector('#board .rtab'),R=e=>e.getBoundingClientRect();
  out.heads=$$('thead th',tb).filter(t=>t.getClientRects().length&&t.offsetWidth).length;
  out.headsCut=$$('thead button',tb).filter(b=>b.getClientRects().length&&b.scrollWidth>b.clientWidth+1).map(b=>b.textContent.trim());
  out.titleWidth=Math.round(R(tb.querySelector('tbody td.t')).width);
  out.within=R(tb).right<=R(tb.closest('section')).right+0.5;
  out.cardOpen=!!tb.querySelector('tr.gfull details');
});
