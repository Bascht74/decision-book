scenario(async out=>{
  await openSettings();await until(()=>document.getElementById('pack:3.0.0b27'));
  const w0=CALLS.length;document.getElementById('pack:3.0.0b27').click();await sleep(100);document.getElementById('pack-ja').click();
  await until(()=>/^(Gepackt|Gestoppt|Nicht)/.test(packNote()),8000);await sleep(100);
  out.note=packNote();const len=s=>new TextEncoder().encode(JSON.stringify(s)).length;
  const docs=[...__DB.store.keys()].filter(k=>/^archiv\/karten-3\.0\.0b27/.test(k)).sort();
  out.docs=docs.join(',');out.maxKB=Math.max(...docs.map(k=>len(__DB.store.get(k))))/1024;
  out.ids=docs.flatMap(k=>__DB.store.get(k).eintraege.map(e=>e.id)).join(',');
  out.readBack=calls(w0).filter(c=>/^get archiv\/karten/.test(c)).length;
  out.statDocs=(__DB.store.get('statistik/3.0.0b27').archiv||{}).docs;
});
