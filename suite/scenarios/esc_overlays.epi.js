scenario(async out=>{
  const im=await until(()=>{const i=document.querySelector('[data-g="g1"] .bub img');return i&&i.onclick&&i});
  const ta=document.getElementById('g-g1');ta.focus();
  im.onclick();out.bigOpen=!!document.getElementById('bigimg');
  press(ta,'Escape');await sleep(50);
  out.bigAfterEsc=!!document.getElementById('bigimg');out.fieldKeptFocus=document.activeElement===ta;
  press(ta,'Escape');await sleep(50);out.secondEscLeavesField=document.activeElement!==ta;
  im.onclick();press(document.body,'Escape');await sleep(50);out.bigAfterEscOnPage=!!document.getElementById('bigimg');
  document.getElementById('ver').click();await sleep(50);
  const lg=document.querySelector('.vlog');out.logOpen=!!lg;out.logEntries=lg?lg.querySelectorAll('h3').length:0;
  press(document.activeElement||document.body,'Escape');await sleep(50);out.logAfterEsc=!!document.querySelector('.vlog');
  press(document.getElementById('ver'),'Enter');await sleep(50);out.logOpensByKey=!!document.querySelector('.vlog');
  document.querySelector('.vlog').click();await sleep(50);out.logClosedByBackdrop=!document.querySelector('.vlog');
});
