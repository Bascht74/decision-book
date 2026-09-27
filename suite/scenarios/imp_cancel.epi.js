scenario(async out=>{
  await openImport();const w0=writes().length;pickFiles('import-datei',[jf('entscheidungsbuch.json',backup(3))]);
  const yes=await until(()=>document.getElementById('import-loeschen'));
  out.question=(document.querySelector('#import-frage .impq')||{}).textContent;out.what=(document.getElementById('import-was')||{}).textContent;
  out.btns=$$('#import-frage button').map(b=>b.textContent);out.focused=document.activeElement&&document.activeElement.id;
  out.writesWhileAsking=writes().length-w0;
  {const no=document.getElementById('import-abbrechen');if(no)no.click()}await sleep(300);
  out.note=impNote();out.writes=writes().length-w0;out.cards=docIds('entscheidungen').join(',');out.askGone=!document.querySelector('#import-frage:not([hidden])');
  out.again=!document.getElementById('import-datei-btn').disabled;out.dialogs=DIALOGS.join(',');
});
