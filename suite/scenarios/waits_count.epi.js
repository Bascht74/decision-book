scenario(async out=>{
  const b=document.getElementById('waits');
  await until(()=>!b.hidden&&/für/.test(b.textContent));await sleep(100);
  const sel=()=>(document.querySelector('#views [aria-selected="true"]')||{}).textContent;
  out.text=b.textContent;out.hidden=b.hidden;out.title=document.title;
  out.parts=$$('button',b).map(x=>x.className+':'+x.textContent);
  // each part leads to its place; a click beside them to "Für Dich" as before
  b.querySelector('button.wa').click();await sleep(50);out.viewAfterAnswers=sel();
  b.querySelector('button.wk').click();await sleep(50);out.viewAfterCards=sel();
  await goView('Bei Claude');b.click();await sleep(50);out.viewAfterClick=sel();
  __DB.external('gespraech/g1',{status:'gelesen'});await sleep(100);
  out.textAfterRead=b.textContent;out.titleAfterRead=document.title;
  __DB.external('entscheidungen/E-903',{blatt:'erledigt'});await sleep(100);
  out.textAfterCardDone=b.textContent;
  __DB.external('entscheidungen/E-902',{blatt:'erledigt'});__DB.external('entscheidungen/E-904',{blatt:'erledigt'});__DB.external('gespraech/g1',{status:'offen'});await sleep(100);
  out.textOneEach=b.textContent;out.titleOneEach=document.title;
  __DB.external('entscheidungen/E-901',{blatt:'erledigt'});await sleep(100);
  out.textAnswerOnly=b.textContent;out.partsAnswerOnly=$$('button',b).map(x=>x.className);
});
