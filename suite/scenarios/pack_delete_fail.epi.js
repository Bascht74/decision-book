scenario(async out=>{
  await openSettings();await until(()=>document.getElementById('pack:3.0.0b27'));
  const w0=CALLS.length;document.getElementById('pack:3.0.0b27').click();await sleep(100);document.getElementById('pack-ja').click();
  await until(()=>/^(Gepackt|Gestoppt|Nicht)/.test(packNote()),8000);await sleep(100);
  out.note=packNote();out.deletes=calls(w0).filter(x=>/^delete /.test(x));
  out.left=['E-010','E-011','E-012'].filter(n=>__DB.store.has('entscheidungen/'+n)).join(',');
  out.statArchiv=!!(__DB.store.get('statistik/3.0.0b27')||{}).archiv;
});
