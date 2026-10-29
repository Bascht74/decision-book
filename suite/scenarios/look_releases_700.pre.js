// Below 761 px the releases table takes the phone's narrow columns (the token columns go): at 700 px the headline keeps
// room, no column head runs into its neighbour, and the table stays within its section, also with a card open in it.
document.documentElement.setAttribute('data-theme','light');
seed(40);const S=__DB.store;S.set('meta/stand',{aktuell:'3.0.0b28',wartet_auf_start:true});
S.set('gespraech/g1',{start:'2026-09-27T07:00:00.000Z',status:'offen',wartet:'',nachrichten:[{von:'Claude',text:'Antwort',zeit:'2026-09-27T07:01:00.000Z'}]});
S.set('auftraege/a1',{text:'Neu',zeit:'2026-09-27T08:00:00.000Z',status:'neu',bilder:[]});
S.set('entscheidungen/E-800',{ueberschrift:'Mit Verlauf',blatt:'offen',ziel:'3.0.0b28',wartet:'Dich',abweichung:'anders gebaut',frist:'2026-12-01T10:00:00.000Z',haengt_an:'E-010',verlauf:[{zeit:'2026-09-27T08:00:00.000Z',text:'Schritt'}]});
localStorage.setItem('eb-view','releases');localStorage.setItem('eb-open',JSON.stringify([['E-800:offen',true]]));
