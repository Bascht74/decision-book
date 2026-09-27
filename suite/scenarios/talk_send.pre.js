// A talk under "Aufträge": one send, however often the button is hit; field empties at once; button grey while sending.
seed(20);
__DB.store.set('gespraech/g1',{start:'2026-09-27T07:00:00.000Z',status:'offen',wartet:'',thread:'t0',nachrichten:[{von:'Claude',text:'Hallo',zeit:'2026-09-27T07:01:00.000Z'}]});
window.__SEND_DELAY=400;
localStorage.setItem('eb-view','sitzung');
