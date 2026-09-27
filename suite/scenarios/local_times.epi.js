scenario(async out=>{
  out.tz=Intl.DateTimeFormat().resolvedOptions().timeZone;
  await until(()=>document.querySelector('details[data-nr="E-500"] .step'));
  out.cardSteps=$$('details[data-nr="E-500"] .step .who').map(x=>x.textContent.replace(/\s+/g,' ').trim());
  await goView('Aufträge');out.talkTime=document.querySelector('[data-g="g1"] .bub time').textContent;
});
