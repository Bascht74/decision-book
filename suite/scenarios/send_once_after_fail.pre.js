// After a failed db write, "Senden" again only writes: the comment to Claude went out once (card, live talk, new order).
seed(12);__DB.store.set('gespraech/g1',{start:'2026-09-27T07:00:00.000Z',status:'offen',wartet:'',thread:'t0',nachrichten:[{von:'Claude',text:'Hallo',zeit:'2026-09-27T07:01:00.000Z'}]});
localStorage.setItem('eb-view','dich');
