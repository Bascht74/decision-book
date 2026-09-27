scenario(async out=>{
  out.tz=Intl.DateTimeFormat().resolvedOptions().timeZone;
  await until(()=>document.querySelector('li[data-auftrag="o1"] time'));
  out.orderTimeShown=document.querySelector('li[data-auftrag="o1"] time').textContent;
  await until(()=>(__DB.store.get('entscheidungen/E-601').verlauf||[]).length);
  const v=(__DB.store.get('entscheidungen/E-601').verlauf||[]).slice(-1)[0];out.pullBackIsUtcZ=!!v&&/^\d{4}-\d\d-\d\dT\d\d:\d\d:\d\d(\.\d+)?Z$/.test(v.zeit);
  await goView('Für Dich');const d=await until(()=>document.querySelector('details[data-nr="E-600"]'));d.open=true;
  out.cardSteps=$$('details[data-nr="E-600"] .step .who').map(x=>x.textContent.trim().slice(0,30));
});
