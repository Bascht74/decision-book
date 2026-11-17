// 0.4.0 -- a Hinweis has "Gelesen", "Jetzt machen" and "Nein" right under its text, an Aufgabe "Erledigt". "Jetzt machen"
// and "Nein" go to Claude like an answer; "Gelesen" lays the card away with the owner's stamp, nothing is sent, and
// that can be undone too. The button in the yellow box does the same as the one under the text.
const S=__DB.store;S.set('meta/stand',{aktuell:'3.0.0b28'});
const C=(n,art,x)=>S.set('entscheidungen/E-'+n,Object.assign({ueberschrift:'Karte '+n,beschreibung:'Text',art,blatt:'offen',ziel:'3.0.0b28',wartet:'Dich',kommentare:[],verlauf:[],geaendert:'2026-09-20T08:00:00.000Z'},x||{}));
C('631','hinweis');C('632','hinweis');C('633','aufgabe');C('634','hinweis');
localStorage.setItem('eb-view','dich');localStorage.setItem('eb-tab','hinweise');
