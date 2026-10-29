// Dark mode (Chrome with --force-dark-mode, no theme set): text 4.5:1 (large text 3:1), a button's fill or edge 3:1
// against its ground, a field's lower edge 3:1, pills 4.5:1.
seed(40);const S=__DB.store;S.set('meta/stand',{aktuell:'3.0.0b28',wartet_auf_start:true});
S.set('gespraech/g1',{start:'2026-09-27T07:00:00.000Z',status:'offen',wartet:'',nachrichten:[{von:'Claude',text:'Antwort',zeit:'2026-09-27T07:01:00.000Z'}]});
S.set('auftraege/a1',{text:'Neu',zeit:'2026-09-27T08:00:00.000Z',status:'neu',bilder:[]});
S.set('entscheidungen/E-800',{ueberschrift:'Mit Verlauf',blatt:'offen',ziel:'3.0.0b28',wartet:'Dich',abweichung:'anders gebaut',frist:'2026-12-01T10:00:00.000Z',haengt_an:'E-010',verlauf:[{zeit:'2026-09-27T08:00:00.000Z',text:'Schritt'}]});
localStorage.setItem('eb-view','dich');localStorage.setItem('eb-open',JSON.stringify([['E-800:offen',true]]));
