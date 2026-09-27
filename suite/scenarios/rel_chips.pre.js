// the chips "Release:" offer only the targets a card shown in that tab carries (after "Entschieden von";
// a folded target stays offered), in the order current release, the ones after it, "später", "Buch", older ones, "Ziel
// offen"; done and rejected cards and cards of the other tab add nothing. A card's "Ziel" dropdown offers no release behind
// the current one and no old name, except the card's own value. Synthetic fixture, roles only.
window.__SYNC=true;const S=__DB.store;S.set('meta/stand',{aktuell:'3.0.0b28'});
const C=(n,blatt,ziel,x)=>S.set('entscheidungen/E-'+n,Object.assign({ueberschrift:'Karte '+n,beschreibung:'Text',blatt,ziel,von:'Claude',art:'aufgabe',kommentare:[],verlauf:[],geaendert:'2026-09-20T08:00:00.000Z'},x||{}));
C('001','vorrat','3.0.0b29');C('002','entschieden','3.0.0b28',{empfehlung:'Option 1',entscheidung:'Option 1',art:'entscheidung'});C('003','arbeit','später');C('004','vorrat','Buch');
C('005','offen','3.0.0b30',{art:'entscheidung'});C('006','erledigt','3.0.0b22');C('007','verworfen','Runde vom Tag: Beispiel');C('008','erledigt','3.0.0b23');
C('009','vorrat','');C('010','arbeit','3.0.0b26',{von:'Eigner'});C('011','offen','3.0.0b27',{art:'entscheidung',blatt:'erledigt'});
localStorage.setItem('eb-view','claude');
