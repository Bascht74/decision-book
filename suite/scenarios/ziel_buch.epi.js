scenario(async out=>{
  await until(()=>document.querySelector('#board details[data-nr="E-001"]'));await sleep(100);
  const opts=nr=>{const d=document.querySelector('#board details[data-nr="'+nr+'"]');if(!d)return null;d.open=true;d.dispatchEvent(new Event('toggle'));const s=document.getElementById('zi-'+nr);return s?[...s.options].map(o=>o.textContent).join(','):null};
  out.without=await (async()=>{const v=opts('E-001');await sleep(50);return v||opts('E-001')})();
  __DB.external('entscheidungen/E-004',{ziel:'Buch'});await sleep(200);
  out.with=await (async()=>{const v=opts('E-001');await sleep(50);return v||opts('E-001')})();
});
