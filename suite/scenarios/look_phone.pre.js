// At 390 px the title bar keeps name, version and settings on one line; the waiting button and the times follow below.
// In the search hits "Öffnen" stays on the line of the card number, a long stand ("Verworfen") included.
document.documentElement.setAttribute('data-theme','light');
seed(40);const S=__DB.store;S.set('meta/stand',{aktuell:'3.0.0b28',wartet_auf_start:true});
S.set('gespraech/g1',{start:'2026-09-27T07:00:00.000Z',status:'offen',wartet:'',nachrichten:[{von:'Claude',text:'Antwort',zeit:'2026-09-27T07:01:00.000Z'}]});
S.set('auftraege/a1',{text:'Neu',zeit:'2026-09-27T08:00:00.000Z',status:'neu',bilder:[]});
S.set('entscheidungen/E-800',{ueberschrift:'Mit Verlauf',blatt:'offen',ziel:'3.0.0b28',wartet:'Dich',abweichung:'anders gebaut',frist:'2026-12-01T10:00:00.000Z',haengt_an:'E-010',verlauf:[{zeit:'2026-09-27T08:00:00.000Z',text:'Schritt'}]});
S.set('entscheidungen/E-850',{ueberschrift:'Karte zum Verwerfen',blatt:'verworfen',status:'verworfen',ziel:'3.0.0b28',von:'Claude',verlauf:[],kommentare:[],geaendert:'2026-09-20T08:00:00.000Z'});
S.set('entscheidungen/E-851',{ueberschrift:'Karte mit einem längeren Titel',blatt:'arbeit',ziel:'3.0.0b28',von:'Claude',status:'offen',verlauf:[],kommentare:[],geaendert:'2026-09-20T08:00:00.000Z'});
localStorage.setItem('eb-view','dich');localStorage.setItem('eb-open',JSON.stringify([['E-800:offen',true]]));
