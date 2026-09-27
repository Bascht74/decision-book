scenario(async out=>{
  await openImport();const w0=writes().length;pickFiles('import-datei',[jf('entscheidungsbuch.json',backup(3))]);
  await until(()=>document.getElementById('import-loeschen'));press(document,'Escape');await sleep(100);out.closed=!document.querySelector('.vlog');
  document.getElementById('setbtn').click();await until(()=>document.getElementById('import-stand'));await sleep(100);
  out.enabled=$$('#import .row button').map(b=>!b.disabled);out.note=impNote();out.writes=writes().length-w0;
});
