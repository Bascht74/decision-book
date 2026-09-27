scenario(async out=>{
  const bk=()=>__DB.store.get('meta/buch');
  await until(()=>BAR.some(t=>/^(ok|fail):/.test(t)),4000);
  const g=nr=>__DB.store.get('entscheidungen/'+nr)||{};
  out.version=bk()&&bk().version===PAGE_VERSION;out.migriert=(bk()||{}).migriert;
  out.e1=g('E-001').eigner_am+'|'+g('E-001').chef_am;
  out.e2=g('E-002').eigner_am;out.e3=g('E-003').eigner_am;out.e4=g('E-004').eigner_am||'none';out.e6=g('E-006').eigner_am;
  const a=__DB.store.get('archiv/karten-1.0.0b1').eintraege;out.arch=a.map(e=>e.id+'='+(e.eigner_am||'none')+'/'+(e.chef_am||'none')).join(',');
  out.bar=BAR.slice();out.barRun=BAR.some(t=>/^run: Aktualisiere das Buch von vor 0\.1\.0 auf \S+ … Schritt 1 von 1 \(0\.1\.0: [^)]*\)$/.test(t));
  out.barCards=BAR.some(t=>/^run: Aktualisiere .* – 3 von 3 Karten$/.test(t));
  out.barOk=BAR.some(t=>/^ok: Buch aktualisiert/.test(t));
  out.busy=UPD.busy;
  // run again (another load): nothing more is written
  const n0=CALLS.length;await bookUpdate(db);try{await MIGRATIONS[0].run(db,()=>{})}catch(e){out.againError=String(e&&e.message||e)}out.writesAgain=CALLS.slice(n0).filter(c=>/^(set|update|delete) /.test(c)).length;
  out.cardWritesStamp=CALLS.filter(c=>/^update entscheidungen\//.test(c)).every(c=>!/geaendert/.test(c));
});
