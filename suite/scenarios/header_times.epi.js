scenario(async out=>{
  await until(()=>$$('#stats .stat').length===4&&!/verbinde/.test(document.getElementById('live').textContent));await sleep(100);
  const t=()=>Object.fromEntries($$('#stats .stat').map(s=>[s.firstChild.textContent.trim(),s.title]));
  out.before=t();
  const g=__DB.store.get('gespraech/g1');
  __DB.external('gespraech/g1',{nachrichten:[...g.nachrichten,{von:'Claude',text:'neu',zeit:'2026-09-27T09:30:00.000Z'}]});await sleep(100);
  out.afterTalkAnswer=t();
  const c=__DB.store.get('entscheidungen/E-920');
  __DB.external('entscheidungen/E-920',{kommentare:[...c.kommentare,{von:'Claude',text:'neu',zeit:'2026-09-27T09:40:00.000Z'}]});await sleep(100);
  out.afterCardAnswer=t();
  __DB.external('meta/claude',{zuletzt:'2026-09-27T09:50:00.000Z'});await sleep(100);
  out.afterMeta=t();
});
