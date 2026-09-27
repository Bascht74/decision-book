scenario(async out=>{
  const L=()=>document.getElementById('live').textContent;
  await until(()=>/^live/.test(L()));out.before=L();
  __DB.fail('gespraech','unavailable');await sleep(50);out.afterFail=L();
  await until(()=>/^live/.test(L()),6000);out.afterRetry=L();
  out.gespraechListeners=[...__DB.subs].filter(s=>s.path==='gespraech').length;
  __DB.external('gespraech/g9',{start:new Date().toISOString(),status:'offen',wartet:'',nachrichten:[{von:'Claude',text:'NACH NEUVERBINDUNG',zeit:new Date().toISOString()}]});await sleep(300);
  out.newTalkShown=document.body.textContent.includes('NACH NEUVERBINDUNG');
  __DB.fail('statistik','revoked');await sleep(50);out.afterRevoked=L();await sleep(3000);
  out.statistikListeners=[...__DB.subs].filter(s=>s.path==='statistik').length;
});
