// Open talks stand by their newest message, newest first; a fresh answer moves its talk to the top.
const S=__DB.store;S.set('meta/stand',{aktuell:'3.0.0b28'});
S.set('gespraech/g1',{start:'2026-09-27T07:00:00.000Z',status:'offen',thread:'t0',nachrichten:[{von:'Eigner',text:'eins',zeit:'2026-09-27T07:00:00.000Z'},{von:'Claude',text:'a',zeit:'2026-09-27T07:05:00.000Z'}]});
S.set('gespraech/g2',{start:'2026-09-27T08:00:00.000Z',status:'offen',thread:'t1',wartet:'Claude',nachrichten:[{von:'Eigner',text:'zwei',zeit:'2026-09-27T08:01:00.000Z'}]});
S.set('gespraech/g3',{start:'2026-09-27T06:00:00.000Z',status:'offen',thread:'t2',nachrichten:[{von:'Eigner',text:'drei',zeit:'2026-09-27T06:00:00.000Z'},{von:'Claude',text:'b',zeit:'2026-09-27T09:00:00.000Z'}]});
S.set('gespraech/g4',{start:'2026-09-27T10:00:00.000Z',status:'gelesen',thread:'t3',nachrichten:[{von:'Claude',text:'alt',zeit:'2026-09-27T10:00:00.000Z'}]});
localStorage.setItem('eb-view','sitzung');
