// the public roadmap is gone: no "Roadmap" badge on a card of typ "Roadmap", and the Typ dropdown offers no
// "Roadmap" (a card that still carries it shows it as its old value, first in the list, like any unknown value).
// the Typ dropdown is gone (one "Art" dropdown); a typ "Roadmap" card maps to Art Entscheidung, typ "Aufgabe" to Aufgabe.
const S=__DB.store;S.set('meta/stand',{aktuell:'3.0.0b28'});
const C=(n,typ,quelle)=>S.set('entscheidungen/E-'+n,{ueberschrift:'Karte '+n,beschreibung:'Text',option1:'Eins',option2:'Zwei',blatt:'offen',ziel:'3.0.0b28',von:'Claude',typ,quelle,status:'offen',kommentare:[],verlauf:[],geaendert:'2026-09-20T08:00:00.000Z'});
C('801','Roadmap','Roadmap');C('802','Aufgabe','');
localStorage.setItem('eb-view','dich');
