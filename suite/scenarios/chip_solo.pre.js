// The chips "Release:" in "Für Dich" show one target at a time: a chip shows only its target (the others fold in the lane
// columns and are left out of "Hinweise & Aufgaben"), the same chip again shows all, "alle" shows all. "Hinweise &
// Aufgaben" follows the chips and "Entschieden von"; the tab counts count what the tab shows. "Only this target" holds for the whole book: a target only on the owner's
// cards, only in "Bei Claude" or on a card that comes in later stays left out; a lane head then folds one lane. Synthetic fixture, roles only.
window.__SYNC=true;const S=__DB.store;S.set('meta/stand',{aktuell:'3.0.0b28'});
const C=(n,blatt,ziel,x)=>S.set('entscheidungen/E-'+n,Object.assign({ueberschrift:'Karte '+n,beschreibung:'Text',blatt,ziel,von:'Claude',art:'entscheidung',kommentare:[],verlauf:[],geaendert:'2026-09-20T08:0'+n.slice(-1)+':00.000Z'},x||{}));
C('001','offen','Funk');C('002','offen','Haus');
C('003','offen','Haus',{art:'hinweis'});C('004','offen','Funk',{art:'aufgabe',von:'Eigner'});C('005','offen','',{art:'hinweis'});
localStorage.setItem('eb-view','dich');localStorage.setItem('eb-tab','hinweise');
