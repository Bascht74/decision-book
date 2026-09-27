scenario(async out=>{
  await until(()=>document.querySelector('#views button'));await sleep(200);document.getElementById('setbtn').click();
  const btn=await until(()=>{const b=document.getElementById('jetzt-sichern');return b&&!b.hidden&&b});btn.click();await until(()=>window.SAVED,15000);await sleep(100);
  const d=JSON.parse(window.SAVED.data);out.bilder=Object.keys(d.bilder||{});out.aaa=d.bilder&&d.bilder.aaa;out.archiv=Object.keys(d.daten.archiv||{});
  out.fetched=(window.FETCHED||[]).map(u=>u.replace(/^.*\/_blob\//,''));
  out.note=(document.querySelector('.vlog .sets .saved')||{}).textContent;
  // and back: the same file read in (the book is not empty, so it asks; delete and read in)
  pickFiles('import-datei',[jf('back.json',d)]);const yes=await until(()=>document.getElementById('import-loeschen'));if(yes)yes.click();
  await until(()=>/^Eingelesen/.test(impNote()),8000);out.back=impNote();const p1=__DB.store.get('auftragsbilder/p1')||{};out.p1Moved=!!p1.asset_id&&p1.asset_id!=='aaa';
  out.upload=UPLOADS.map(u=>u.type+' '+u.size);
});
