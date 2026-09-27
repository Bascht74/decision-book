scenario(async out=>{
  const head=nr=>document.querySelector('#board details[data-nr="'+nr+'"] summary');
  await until(()=>head('E-721')&&head('E-722'));
  const f=nr=>[...head(nr).querySelectorAll('.frist')].map(x=>x.textContent);
  out.future=f('E-721');out.past=f('E-722');out.none=f('E-723');
  const d=new Date(__DB.store.get('entscheidungen/E-721').frist),p=x=>String(x).padStart(2,'0');
  out.localHm=p(d.getHours())+':'+p(d.getMinutes());out.hasLocalHm=(out.future[0]||'').includes(out.localHm);
  await sleep(1000);out.writes=CALLS.length;
});
