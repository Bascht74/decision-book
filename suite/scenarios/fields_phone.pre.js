// on a 390 px phone: the five dropdowns of a card (Stand, Ziel, wartet auf, von, Art) stay inside the screen, and the
// "Verworfen" group under "Erledigt" (open, with a card open below its row) makes nothing wider than the screen.
const S=__DB.store;S.set('meta/stand',{aktuell:'3.0.0b28'});S.set('meta/einstellungen',{eigner:'Eigner mit langem Namen'});
const C=(n,blatt,x)=>S.set('entscheidungen/E-'+n,Object.assign({ueberschrift:'Eine recht lange Überschrift für die Karte '+n,beschreibung:'Text '+n,option1:'Eins',option2:'Zwei',blatt,ziel:'3.0.0b28',von:'Eigner mit langem Namen',wartet:'Claude',typ:'Auftrag',kommentare:[],verlauf:[],geaendert:'2026-09-20T08:00:00.000Z'},x||{}));
C('401','offen');C('402','pruefen',{art:'hinweis'});C('403','verworfen');C('404','erledigt');
localStorage.setItem('eb-view','dich');
