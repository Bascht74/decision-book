MIGRATIONS.unshift({to:"0.0.2",run:async()=>{RAN.push('0.0.2');if(BREAK2)throw new Error('Test-Fehler zwei')}},{to:"0.0.1",run:async()=>{RAN.push('0.0.1')}});
scenario(async out=>{
  await until(()=>BAR.some(t=>/^fail:/.test(t)),4000);await sleep(300);
  const bk=()=>__DB.store.get('meta/buch')||{};
  out.ran=RAN.join(',');out.barFail=BAR.filter(t=>/^fail:/.test(t));out.migriert=bk().migriert||[];out.version=bk().version||'none';
  out.card=__DB.store.get('entscheidungen/E-001').eigner_am||'none';out.busy=UPD.busy;await sleep(1500);out.ruleHeld=__DB.store.get('entscheidungen/E-009').blatt;
  // the next load, with the fault gone
  BREAK2=false;RAN.length=0;await bookUpdate(db);
  out.ranAgain=RAN.join(',');out.migriertAfter=bk().migriert||[];out.versionAfter=bk().version===PAGE_VERSION;
  out.cardAfter=__DB.store.get('entscheidungen/E-001').eigner_am||'none';out.busyAfter=UPD.busy;
  await until(()=>__DB.store.get('entscheidungen/E-009').blatt!=='pruefen',3000);out.ruleAfter=__DB.store.get('entscheidungen/E-009').blatt;
});
