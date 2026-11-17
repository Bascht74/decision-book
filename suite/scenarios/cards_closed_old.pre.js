// 0.4.0 -- a viewer who had the book open under 0.3.0: that page wrote every card it opened by itself ("Offen", "Prüfen",
// Hinweise) into "eb-open" as open. After the update every card still starts closed and no "Wie empfohlen" stands in
// sight; the old list is dropped once and never read. What he opens from now on is kept under "eb-klapp".
const S=__DB.store;S.set('meta/stand',{aktuell:''});
const C=(n,blatt,x)=>S.set('entscheidungen/E-'+n,Object.assign({ueberschrift:'Karte '+n,beschreibung:'Text '+n,option1:'Eins',option2:'Zwei',empfehlung:'Option 1. Weil.',blatt,ziel:'',von:'Eigner',wartet:'Dich',
  kommentare:[],verlauf:[],geaendert:'2026-09-27T07:05:00.000Z'},x||{}));
C('651','offen');C('652','offen');C('653','offen');C('654','pruefen',{tokens_prognose:1,tokens_ist:1});C('655','offen',{art:'hinweis'});
localStorage.setItem('eb-open',JSON.stringify([['E-651:offen',true],['E-652:offen',true],['E-653:offen',true],['E-654:pruefen',true],['E-655:offen',true]]));
localStorage.setItem('eb-view','dich');
