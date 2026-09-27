// The db write of a talk message fails: the text comes back into the field and stays as a draft.
seed(5);
__DB.store.set('gespraech/g1',{start:'2026-09-27T07:00:00.000Z',status:'offen',wartet:'',thread:'t0',nachrichten:[{von:'Claude',text:'Hallo',zeit:'2026-09-27T07:01:00.000Z'}]});
window.__FAIL={update:/^gespraech\//};
localStorage.setItem('eb-view','sitzung');
