scenario(async out=>{
  await openImport();pickFiles('import-datei',[jf('2026-01-01_0000.import.json',HELPER_OUT)]);await until(()=>/^Eingelesen/.test(impNote()),8000);
  out.note=impNote();out.lines=lines();out.cards=docIds('entscheidungen').join(',');const p2=__DB.store.get('auftragsbilder/p2')||{};
  out.p2New=!!p2.asset_id&&p2.asset_id!=='aaa';out.upload=UPLOADS.map(u=>u.type+' '+u.size);out.p3=!!__DB.store.get('auftragsbilder/p3');
});
