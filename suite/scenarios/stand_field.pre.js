// a card has one visible state, "Stand" (= "blatt"); changing it moves the card there, on the path the buttons
// take ("Prüfen"/"Erledigt" through the token mark, "Erledigt" stamps erledigt_am). The old "status" is neither shown nor
// edited: no Status dropdown, the chip says the Stand, and a card with the old status "zurückgestellt" still stands.
const S=__DB.store;S.set('meta/stand',{aktuell:'3.0.0b28'});
const C=(n,blatt,x)=>S.set('entscheidungen/E-'+n,Object.assign({ueberschrift:'Karte '+n,beschreibung:'Text '+n,option1:'Eins',option2:'Zwei',blatt,ziel:'3.0.0b28',von:'Eigner',typ:'Thema',status:'offen',kommentare:[],verlauf:[],geaendert:'2026-09-20T08:00:00.000Z'},x||{}));
C('101','offen');
C('103','arbeit',{von:'Claude'});
C('104','entschieden',{tokens_prognose:20000,tokens_ist:25000});
C('105','entschieden');
C('106','offen',{status:'zurückgestellt',ziel:'später'});
localStorage.setItem('eb-view','dich');
