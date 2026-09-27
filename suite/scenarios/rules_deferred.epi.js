scenario(async out=>{
  const rw=()=>CALLS.filter(c=>/^update entscheidungen\/E-60[1-4]/.test(c)).length;
  await until(()=>rw()>=2);await sleep(300);
  // Claude files two more cards that break the rules; they arrive by snapshot, one after the other
  const now=new Date().toISOString();
  __DB.external('entscheidungen/E-603',{ueberschrift:'Noch eine',blatt:'pruefen',ziel:'3.0.0b28',geaendert:now});await sleep(300);
  __DB.external('entscheidungen/E-604',{ueberschrift:'Noch eine Antwort',blatt:'erledigt',typ:'Auftrag',ziel:'3.0.0b28',geaendert:now});
  await until(()=>rw()>=4);await sleep(300);
  out.ruleWrites=rw();out.callsInsideSnapshot=INSIDE.slice(0,5);
});
