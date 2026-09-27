scenario(async out=>{
  await openImport();const w0=writes().length;pickFiles('import-datei',[jf('a.json',backup(30))]);
  await until(()=>/^Gestoppt/.test(impNote()),8000);out.note=impNote();
  out.talk=!!__DB.store.get('gespraech/g1');out.cards=docIds('entscheidungen').length;out.after=writes().slice(w0).filter(c=>/entscheidungen\/E-0(2[1-9]|30)/.test(c)).length;
  out.again=!document.getElementById('import-datei-btn').disabled;
});
