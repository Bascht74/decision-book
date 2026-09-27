scenario(async out=>{
  await until(()=>document.querySelector('#board details[data-nr="E-730"]'));await sleep(100);
  const who=()=>{const a=document.activeElement;if(!a||a===document.body)return 'BODY';const c=a.closest('[data-nr],[data-lane],[id]');return a.tagName+' '+(c?(c.dataset.nr||c.dataset.lane||c.id):'')+' '+a.textContent.trim().slice(0,12)};
  let n=0;const claude=()=>__DB.external('entscheidungen/E-732',{geaendert:'2026-09-27T10:0'+(n++)+':00.000Z'});
  findBtn('#views button',/^Bei Claude/).focus();claude();__DB.external('gespraech/g1',{start:'2026-09-27T07:00:00.000Z',status:'offen',nachrichten:[{von:'Claude',text:'x',zeit:'2026-09-27T07:01:00.000Z'}]});await sleep(200);out.viewButton=who();
  findBtn('#filter button',/^Claude$/).focus();claude();await sleep(200);out.filterButton=who();
  document.querySelector('#board .lane.fold').focus();claude();await sleep(200);out.laneHead=who();
  document.querySelector('#board details[data-nr="E-730"] summary').focus();claude();await sleep(200);out.cardHeadStays=who();
  __DB.external('entscheidungen/E-730',{blatt:'pruefen'});await sleep(200);out.cardHeadMoved=who();
});
