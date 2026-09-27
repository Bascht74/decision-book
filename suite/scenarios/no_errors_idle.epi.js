scenario(async out=>{
  await sleep(300);
  document.querySelector('#ready .stepbtn').click();await sleep(30);
  for(const v of ['Releases','Für Dich','Aufträge','Bei Claude','Erledigt','Statistik']){if(!findBtn('#views button',new RegExp('^'+v)))continue;await goView(v);
    for(const b of $$('#tabs button,.statbox .sub button')){b.click();await sleep(20)}
    for(const d of $$('#board details').slice(0,5)){d.open=true}await sleep(20)}
  document.getElementById('ver').click();await sleep(30);press(document.body,'Escape');
  await goView('Aufträge');findBtn('#auftrag-list .mv',/Bearbeiten/).click();await sleep(200);
  out.editorOpen=!!document.getElementById('aed-a1');
  // a later snapshot of everything (Claude writes) after all of that
  __DB.external('entscheidungen/E-001',{geaendert:'2026-09-27T10:00:00.000Z'});__DB.external('meta/claude',{zuletzt:'2026-09-27T10:00:00.000Z'});await sleep(300);
  out.views=$$('#views button').length;
});
