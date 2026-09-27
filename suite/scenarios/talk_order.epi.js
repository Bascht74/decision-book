scenario(async out=>{
  await until(()=>$$('#gespraech .gsp[data-g]').length===3);
  const order=()=>$$('#gespraech .gsp[data-g]').map(g=>g.dataset.g);
  out.order=order();
  const g1=__DB.store.get('gespraech/g1');
  __DB.external('gespraech/g1',{nachrichten:[...g1.nachrichten,{von:'Claude',text:'neu',zeit:'2026-09-27T10:30:00.000Z'}]});await sleep(100);
  out.orderAfterAnswer=order();
});
