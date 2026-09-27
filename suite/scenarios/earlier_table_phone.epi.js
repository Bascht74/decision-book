scenario(async out=>{
  const t=await until(()=>document.querySelector('#fruehere .donebtn'));t.click();await sleep(100);
  const shown=n=>!!n&&n.getClientRects().length>0;
  out.headFiltersShown=$$('#fruehere .atab tr.frow select').filter(shown).length;
  out.rowFiltersShown=$$('#fruehere .afil select').filter(shown).length;
  out.hiddenCols=$$('#fruehere .atab thead tr:first-child th').filter(th=>!shown(th)).length;
  out.drawn=$$('#fruehere tbody tr[data-k]').length;out.cnt=document.querySelector('#fruehere .cnt').textContent;
  const s=document.getElementById('gf-art-p');s.value='Auftrag';s.dispatchEvent(new Event('change'));await sleep(100);
  out.filtered=$$('#fruehere tbody tr[data-k]').every(r=>r.dataset.k.startsWith('a:'));out.cntFiltered=document.querySelector('#fruehere .cnt').textContent;
  out.overflow=document.scrollingElement.scrollWidth>window.innerWidth;
});
