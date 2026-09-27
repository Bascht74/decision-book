scenario(async out=>{
  await openImport();await sleep(300);
  out.disabled=$$('#import .row button').map(b=>b.disabled);out.note=impNote();
  const w0=writes().length;pickFiles('import-datei',[jf('a.json',backup(2))]);await sleep(500);out.writes=writes().length-w0;out.asked=!!document.getElementById('import-loeschen');
});
