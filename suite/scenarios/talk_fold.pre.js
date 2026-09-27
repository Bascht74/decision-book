// Open talks carry a title (own title, else its card, else the first words) and fold with ▸/▾; the fold is remembered.
const S=__DB.store;S.set('meta/stand',{aktuell:'3.0.0b28'});
S.set('entscheidungen/E-010',{ueberschrift:'Karte zehn',blatt:'arbeit',ziel:'3.0.0b28'});
S.set('gespraech/g1',{start:'2026-09-27T07:00:00.000Z',status:'offen',titel:'Bilder im Protokoll',wartet:'',thread:'t0',nachrichten:[{von:'Eigner',text:'Frage eins',zeit:'2026-09-27T07:00:00.000Z'},{von:'Claude',text:'Antwort eins',zeit:'2026-09-27T07:03:00.000Z'}]});
S.set('gespraech/g2',{start:'2026-09-27T07:10:00.000Z',status:'offen',wartet:'Claude',thread:'t1',nachrichten:[{von:'Eigner',text:'Tasten   bitte\n prüfen',zeit:'2026-09-27T07:02:00.000Z'}]});
S.set('gespraech/g3',{start:'2026-09-27T06:00:00.000Z',status:'offen',karte:'E-010',wartet:'',thread:'t2',nachrichten:[{von:'Eigner',text:'Zur Karte',zeit:'2026-09-27T07:01:00.000Z'}]});
localStorage.setItem('eb-gfold',JSON.stringify(['g2']));
localStorage.setItem('eb-view','sitzung');
