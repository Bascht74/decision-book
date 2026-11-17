// 0.4.0 -- "Rückgängig" after Claude took the card over: within the ten seconds Claude sets Stand "in Arbeit", "fertig" and
// the estimate. Taking back then reads the card first and leaves every field as Claude set it; only the message
// "Rückgängig: … gilt nicht." is added (and sent live), and the line says so. A Gelesen whose card changed meanwhile is
// not taken back at all. Without a takeover, a field the card did not have comes back empty (""), never null, and the old
// field "status" is left alone.
const S=__DB.store;S.set('meta/stand',{aktuell:''});
const C=(n,x)=>S.set('entscheidungen/E-'+n,Object.assign({ueberschrift:'Karte '+n,beschreibung:'Text',option1:'Eins',option2:'Zwei',empfehlung:'Option 1',blatt:'offen',ziel:'',von:'Eigner',wartet:'Dich',kommentare:[],verlauf:[],geaendert:'2026-09-20T08:00:00.000Z'},x||{}));
C('671');C('672');C('673',{art:'hinweis'});C('674',{art:'hinweis'});
localStorage.setItem('eb-view','dich');
