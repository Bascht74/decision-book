scenario(async out=>{
  await openImport();const w0=writes().length;
  const many=n=>{const b=backup(0);b.daten={entscheidungen:{}};for(let i=0;i<n;i++)b.daten.entscheidungen['E-'+i]={ueberschrift:'K'+i};return b};
  const run=async f=>{NOTES.length=0;pickFiles('import-datei',[f]);await until(()=>/^(Nichts|Die Datei|In der)/.test(impNote()),8000);return impNote()};
  out.tooMany=await run(jf('a.json',many(5001)));
  out.withBook=await run(jf('b.json',many(4995)));
  {const b=backup(1);b.daten.entscheidungen['E-001'].beschreibung='x'.repeat(300*1024);out.tooBig=await run(jf('c.json',b))}
  {const b=backup(0);b.daten.entscheidungen['a/b']={ueberschrift:'x'};out.badId=await run(jf('d.json',b))}
  out.notJson=await run(jf('e.json','{kein json'));out.noBackup=await run(jf('f.json',{karten:[]}));
  out.writes=writes().length-w0;out.dialogs=DIALOGS.join(',');
});
