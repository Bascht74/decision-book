// "Frühere": the search filters read talks and old orders, says how many, keeps the focus, Esc empties it.
const S=__DB.store;S.set('meta/stand',{aktuell:'3.0.0b28'});
S.set('gespraech/g1',{start:'2026-09-27T07:00:00.000Z',status:'gelesen',thread:'t0',nachrichten:[{von:'Eigner',text:'Bilder im Protokoll',zeit:'2026-09-27T07:00:00.000Z'},{von:'Claude',text:'Erledigt mit Zebra',zeit:'2026-09-27T07:01:00.000Z'}]});
S.set('gespraech/g2',{start:'2026-09-27T07:10:00.000Z',status:'gelesen',thread:'t1',nachrichten:[{von:'Eigner',text:'Tasten',zeit:'2026-09-27T07:10:00.000Z'}]});
S.set('auftraege/a1',{text:'Alter Auftrag',zeit:'2026-09-26T07:00:00.000Z',status:'übernommen',antwort:'Antwort mit zebra drin'});
localStorage.setItem('eb-view','sitzung');
