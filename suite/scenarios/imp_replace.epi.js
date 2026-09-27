scenario(async out=>{
  await openImport();const w0=writes().length;pickFiles('import-datei',[jf('entscheidungsbuch.json',backup(3))]);
  const yes=await until(()=>document.getElementById('import-loeschen'));out.question=(document.querySelector('#import-frage .impq')||{}).textContent;
  yes.click();await until(()=>/^Eingelesen/.test(impNote()),8000);
  const ws=writes().slice(w0);out.deletes=ws.filter(c=>/^delete/.test(c)).length;
  out.deleteFirst=ws.findIndex(c=>/^set/.test(c))>ws.map(c=>/^delete/.test(c)).lastIndexOf(true);
  out.cards=docIds('entscheidungen').join(',');out.card1=(__DB.store.get('entscheidungen/E-001')||{}).ueberschrift;
  out.orders=docIds('auftraege').join(',');out.talks=docIds('gespraech').join(',');out.stand=!!__DB.store.get('meta/stand');
  out.note=impNote();out.lines=lines();out.deleting=NOTES.some(t=>/^löscht … \d+ von 10$/.test(t));out.dialogs=DIALOGS.join(',');
});
