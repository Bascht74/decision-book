// At 390 px every main button is at least 32 px high and wide (the picture's × on a thumbnail is left out).
seed(40);const S=__DB.store;S.set('meta/stand',{aktuell:'3.0.0b28',wartet_auf_start:true});
S.set('gespraech/g1',{start:'2026-09-27T07:00:00.000Z',status:'offen',wartet:'',nachrichten:[{von:'Claude',text:'Antwort',zeit:'2026-09-27T07:01:00.000Z'}]});
S.set('gespraech/g2',{start:'2026-09-26T07:00:00.000Z',status:'gelesen',nachrichten:[{von:'Eigner',text:'Alt',zeit:'2026-09-26T07:01:00.000Z'}]});
S.set('auftraege/a1',{text:'Neu',zeit:'2026-09-27T08:00:00.000Z',status:'neu',bilder:[]});
S.set('entscheidungen/E-800',{ueberschrift:'Mit Verlauf',blatt:'offen',ziel:'3.0.0b28',wartet:'Dich',abweichung:'anders gebaut',verlauf:[{zeit:'2026-09-27T08:00:00.000Z',text:'Schritt'}]});
localStorage.setItem('eb-open',JSON.stringify([['E-008:entschieden',true]]));
