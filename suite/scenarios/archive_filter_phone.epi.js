scenario(async out=>{
  await until(()=>document.querySelector('#board .atab'));await sleep(100);
  const shown=n=>!!n&&n.getClientRects().length>0;
  out.headFiltersShown=$$('#board .atab tr.frow select').filter(shown).length;
  out.rowFiltersShown=$$('#board .afil select').filter(shown).length;
  out.hiddenCols=$$('#board .atab thead tr:first-child th').filter(th=>!shown(th)).length;
  const s=document.getElementById('af-ziel-p');s.value='3.0.0b27';s.dispatchEvent(new Event('change'));await sleep(100);
  const n=$$('#board .atab tbody tr').map(tr=>__DB.store.get('entscheidungen/'+tr.dataset.nr).ziel);
  out.filtered=n.length>0&&n.every(z=>z==='3.0.0b27');
  out.overflow=document.scrollingElement.scrollWidth>window.innerWidth;
});
