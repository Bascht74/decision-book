// 0.4.0 -- "Rückgängig": for ten seconds after a one-tap answer a line at the lower edge of the window offers the way back.
// It writes the card's fields as they stood, adds a message (the first one stays), tells Claude live in the card's thread,
// and the card is back under "Offen", open. Without a tap the line goes after ten seconds and the answer stands.
const S=__DB.store;S.set('meta/stand',{aktuell:'3.0.0b28'});
const C=(n,x)=>S.set('entscheidungen/E-'+n,Object.assign({ueberschrift:'Karte '+n,beschreibung:'Text',option1:'Eins',option2:'Zwei',empfehlung:'Option 1',blatt:'offen',ziel:'3.0.0b28',von:'Eigner',wartet:'Dich',status:'offen',kommentare:[],verlauf:[],geaendert:'2026-09-20T08:00:00.000Z'},x||{}));
C('611');C('612');
localStorage.setItem('eb-view','dich');
