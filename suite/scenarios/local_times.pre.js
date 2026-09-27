// Times the page writes (UTC, "…Z") show in local time; hand-written ones without a zone stay as written (converted from review s3). TZ Europe/Berlin.
const S=__DB.store;S.set('meta/stand',{aktuell:'3.0.0b28'});
S.set('entscheidungen/E-500',{ueberschrift:'Zeiten',blatt:'offen',ziel:'3.0.0b28',wartet:'Dich',kommentare:[{von:'Eigner',text:'Frage',zeit:'2026-09-27T08:30:00.000Z'}],verlauf:[{zeit:'2026-09-27T10:00',text:'Schritt'}]});
S.set('gespraech/g1',{start:'2026-09-27T07:00:00.000Z',status:'offen',nachrichten:[{von:'Claude',text:'Hallo',zeit:'2026-09-27T07:01:00.000Z'}]});
localStorage.setItem('eb-view','dich');
