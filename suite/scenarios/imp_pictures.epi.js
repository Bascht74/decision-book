scenario(async out=>{
  await openImport();
  // 1) Claude's backup folder: one JSON per doc, the picture files beside them in bilder/
  const png=new Uint8Array([137,80,78,71,13,10,26,10,0,0,0,1]);
  pickFiles('import-ordner',[jf('2026-09-27_1200/meta/einstellungen.json',{release:'3.0.0b28'}),
    jf('2026-09-27_1200/auftragsbilder/p1.json',{data:'data:image/png;base64,iVBORw0KGgo=',zeit:'2026-09-21T09:00:00.000Z'}),
    jf('2026-09-27_1200/auftragsbilder/p2.json',{asset_id:'aaa',url:'/_blob/aaa',type:'image/png',zeit:'2026-09-21T09:00:00.000Z'}),
    jf('2026-09-27_1200/auftragsbilder/p3.json',{asset_id:'bbb',url:'/_blob/bbb',type:'image/png',zeit:'2026-09-21T09:00:00.000Z'}),
    jf('2026-09-27_1200/auftragsbilder/p4.json',{asset_id:'ccc',url:'/_blob/ccc',type:'image/jpeg',zeit:'2026-09-21T09:00:00.000Z'}),
    jf('2026-09-27_1200/bilder/aaa.png',png,'image/png'),jf('2026-09-27_1200/buch_v112.html','<!doctype html>','text/html')]);
  await until(()=>/^(Eingelesen|Gestoppt)/.test(impNote()),8000);
  out.folderNote=impNote();out.folderLines=lines();
  const p2=__DB.store.get('auftragsbilder/p2')||{};out.p1=(__DB.store.get('auftragsbilder/p1')||{}).data;
  out.p2New=!!p2.asset_id&&p2.asset_id!=='aaa'&&p2.url==='/_blob/'+p2.asset_id;out.p2Type=p2.type;out.p2Zeit=p2.zeit;
  out.p3=!!__DB.store.get('auftragsbilder/p3');out.p4=(__DB.store.get('auftragsbilder/p4')||{}).asset_id;
  out.uploads=UPLOADS.map(u=>u.type+' '+u.size);
  // 2) one file in the page's format, the picture file inside it as base64 ("bilder"); the book counts as empty still
  const b={zeit:'2026-09-27T10:00:00.000Z',seite:'v113',daten:{auftragsbilder:{q1:{asset_id:'ddd',url:'/_blob/ddd',type:'image/png',zeit:'2026-09-22T09:00:00.000Z'},
    q2:{asset_id:'eee',url:'/_blob/eee',type:'image/png',zeit:'2026-09-22T09:00:00.000Z'}}},bilder:{ddd:{type:'image/png',data:'iVBORw0KGgoAAAAB'}}};
  NOTES.length=0;pickFiles('import-datei',[jf('entscheidungsbuch.json',b)]);await until(()=>/^(Eingelesen|Gestoppt)/.test(impNote()),8000);
  out.fileNote=impNote();const q1=__DB.store.get('auftragsbilder/q1')||{};out.q1New=!!q1.asset_id&&q1.asset_id!=='ddd';out.q2=!!__DB.store.get('auftragsbilder/q2');
  out.uploads2=UPLOADS.slice(1).map(u=>u.type+' '+u.size);
});
