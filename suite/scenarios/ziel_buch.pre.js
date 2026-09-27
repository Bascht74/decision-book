// A card's "Ziel" dropdown offers "Buch" only while a card in the book carries that target: first no card does, then
// another writer gives a done card the target "Buch" (a done card adds no other target). Synthetic fixture, roles only.
window.__SYNC=true;const S=__DB.store;S.set('meta/stand',{aktuell:'3.0.0b28'});
const C=(n,blatt,ziel,x)=>S.set('entscheidungen/E-'+n,Object.assign({ueberschrift:'Karte '+n,beschreibung:'Text',blatt,ziel,von:'Claude',art:'aufgabe',kommentare:[],verlauf:[],geaendert:'2026-09-20T08:00:00.000Z'},x||{}));
C('001','vorrat','3.0.0b28');C('002','vorrat','später');C('003','vorrat','3.0.0b29');C('004','erledigt','3.0.0b27');
localStorage.setItem('eb-view','claude');
