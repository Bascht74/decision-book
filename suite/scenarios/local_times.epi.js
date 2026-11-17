scenario(async out=>{
  out.tz=Intl.DateTimeFormat().resolvedOptions().timeZone;
  const d=await until(()=>document.querySelector('details[data-nr="E-500"]'));d.open=true; // since 0.4.0 every card starts closed
  await until(()=>document.querySelector('details[data-nr="E-500"] .step'));
  out.cardSteps=$$('details[data-nr="E-500"] .step .who').map(x=>x.textContent.replace(/\s+/g,' ').trim());
  await goView('Aufträge');out.talkTime=document.querySelector('[data-g="g1"] .bub time').textContent;
});
