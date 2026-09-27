scenario(async out=>{
  await openSettings();await until(()=>document.getElementById('pack:3.0.0b27'));
  const w0=CALLS.length;document.getElementById('pack:3.0.0b27').click();await sleep(100);document.getElementById('pack-ja').click();
  await until(()=>/^(Gepackt|Gestoppt|Nicht)/.test(packNote()),8000);await sleep(100);
  out.note=packNote();const c=calls(w0);
  out.deletes=c.filter(x=>/^delete /.test(x)).length;out.statWrites=c.filter(x=>/ statistik\//.test(x)&&!/^get /.test(x)).length;
  out.readsAfterMismatch=c.slice(c.indexOf('get archiv/auftraege-3.0.0b27')+1).filter(x=>/^get archiv\//.test(x)).length;
  out.cardsLeft=['E-010','E-011','E-012'].filter(n=>__DB.store.has('entscheidungen/'+n)).length;
  out.stillPackable=packLines().some(l=>/\[pack:3\.0\.0b27\]/.test(l));
});
