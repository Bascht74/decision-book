scenario(async out=>{
  await until(()=>document.querySelector('#filter button'));await sleep(100);
  const chips=()=>$$('#filter button[title="Auf- oder zuklappen"]').map(b=>b.querySelector('.lng').textContent+(b.getAttribute('aria-pressed')==='false'?' (zu)':''));
  const chip=z=>$$('#filter button[title="Auf- oder zuklappen"]').find(b=>b.querySelector('.lng').textContent===z);
  out.claude=chips().join(',');
  findBtn('#filter button',/^Claude$/).click();await sleep(50);out.claudeOnly=chips().join(',');findBtn('#filter button',/^alle$/).click();await sleep(50);
  {const c=chip('3.0.0b29');if(c)c.click()}await sleep(50);out.folded=chips().join(',');
  // unfold again (should the chip be gone, the fold is taken back by hand)
  {const c=chip('3.0.0b29');if(c)c.click();else{laneFlip('3.0.0b29');render(true)}}await sleep(50);
  const opts=nr=>{const d=document.querySelector('#board details[data-nr="'+nr+'"]');if(!d)return null;d.open=true;d.dispatchEvent(new Event('toggle'));const s=document.getElementById('zi-'+nr);return s?[...s.options].map(o=>o.textContent).join(','):null};
  out.zielNew=await (async()=>{const v=opts('E-002');await sleep(50);return v||opts('E-002')})();
  out.zielOld=await (async()=>{const v=opts('E-010');await sleep(50);return v||opts('E-010')})();
  await goView('Für Dich');await sleep(80);out.dich=chips().join(',');
  await goView('Releases');await sleep(80);out.releases=chips().length+' '+/Release:/.test(document.getElementById('filter').textContent);
});
