// 0.4.0 -- the field for a new order also stands under "Für Dich": its label, the field and "Senden" in one line above the
// cards; the talks, the old orders and "Frühere" stay under "Aufträge". Sent from there it goes live like a talk, and the
// line says where it stands.
const S=__DB.store;S.set('meta/stand',{aktuell:'3.0.0b28'});
S.set('entscheidungen/E-681',{ueberschrift:'Karte',blatt:'offen',ziel:'3.0.0b28',von:'Eigner',kommentare:[],verlauf:[]});
S.set('entscheidungen/E-682',{ueberschrift:'In Arbeit',blatt:'arbeit',ziel:'3.0.0b28',von:'Eigner',kommentare:[],verlauf:[]});
S.set('gespraech/g1',{start:'2026-09-27T07:00:00.000Z',status:'offen',wartet:'',nachrichten:[{von:'Claude',text:'Antwort',zeit:'2026-09-27T07:01:00.000Z'}]});
S.set('gespraech/g2',{start:'2026-09-26T07:00:00.000Z',status:'gelesen',nachrichten:[{von:'Eigner',text:'Alt',zeit:'2026-09-26T07:01:00.000Z'}]});
localStorage.setItem('eb-view','dich');
