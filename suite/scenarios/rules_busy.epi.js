scenario(async out=>{
  const w=()=>CALLS.filter(c=>/^update entscheidungen\/E-60[12]/.test(c)).length;
  await until(()=>ACQ.length);await sleep(300);
  out.asked=ACQ.length>0;out.holder=ACQ[0];out.writesWhileBusy=w();
  __DB.external('entscheidungen/E-603',{geaendert:'2026-09-27T10:00:00.000Z'});await sleep(300);out.writesStillBusy=w();
  await sleep(1500);__DB.external('entscheidungen/E-603',{geaendert:'2026-09-27T10:01:00.000Z'});await until(()=>w()>=2);await sleep(300);
  out.writesAfter=w();out.e601=__DB.store.get('entscheidungen/E-601').blatt;out.e602=__DB.store.get('entscheidungen/E-602').art;
});
