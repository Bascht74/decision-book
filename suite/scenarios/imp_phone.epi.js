scenario(async out=>{
  await openImport();out.innerWidth=innerWidth;const over=[];const chk=n=>{const b=document.querySelector('.vlog .box');const sw=document.scrollingElement.scrollWidth;
    if(sw>innerWidth)over.push(n+' page '+sw);if(b&&b.scrollWidth>b.clientWidth+1)over.push(n+' box '+b.scrollWidth+'>'+b.clientWidth)};
  chk('settings');pickFiles('import-datei',[jf('entscheidungsbuch-mit-einem-sehr-langen-namen.json',backup(2))]);await until(()=>document.getElementById('import-loeschen'));chk('question');
  const r=document.getElementById('import-loeschen').getBoundingClientRect(),r2=document.getElementById('import-abbrechen').getBoundingClientRect();
  out.btnsInside=r.left>=0&&r2.right<=innerWidth;out.tall=Math.min(r.height,r2.height)>=32;
  document.getElementById('import-loeschen').click();await until(()=>/^Eingelesen/.test(impNote()),8000);chk('done');
  out.overflowing=over;
});
