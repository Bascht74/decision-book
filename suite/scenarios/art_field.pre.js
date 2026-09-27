// one field "Art" (Entscheidung, Aufgabe, Hinweis, Auftrag) replaces "Typ" and "Art". Old cards map: art hinweis ->
// Hinweis, art aufgabe -> Aufgabe, else typ "Auftrag" -> Auftrag, typ "Aufgabe" -> Aufgabe, else Entscheidung; a new value in
// "art" wins over "typ". Writing the field writes "art" only. Everything that keyed on art/typ reads the same mapping.
const S=__DB.store;S.set('meta/stand',{aktuell:'3.0.0b28'});
const C=(n,blatt,x)=>S.set('entscheidungen/E-'+n,Object.assign({ueberschrift:'Karte '+n,beschreibung:'Text '+n,option1:'Eins',option2:'Zwei',blatt,ziel:'3.0.0b28',von:'Claude',status:'offen',kommentare:[],verlauf:[],tokens_prognose:1000,tokens_ist:1000,geaendert:'2026-09-20T08:00:00.000Z'},x||{}));
C('201','entschieden',{art:'hinweis',typ:'Auftrag'});
C('202','entschieden',{art:'aufgabe'});
C('203','entschieden',{typ:'Auftrag'});
C('204','entschieden',{typ:'Aufgabe'});
C('205','entschieden',{typ:'Thema'});
C('206','entschieden',{});
C('207','entschieden',{typ:'Roadmap'});
C('208','entschieden',{art:'',typ:'Aufgabe'});
C('209','entschieden',{art:'entscheidung',typ:'Aufgabe'});
C('210','entschieden',{art:'auftrag',typ:'Thema'});
C('211','entschieden',{art:'hinweis',typ:'Aufgabe'});
C('212','entschieden',{art:'Aufgabe',typ:'Thema'});
// behaviour: an old typ "Aufgabe" in "Offen" is an Aufgabe for the owner (Hinweise & Aufgaben, "Erledigt"); a Hinweis reads "Gelesen";
// a Thema stays a decision under "Offen"
C('220','offen',{typ:'Aufgabe'});C('221','offen',{art:'hinweis'});C('222','offen',{typ:'Thema'});
localStorage.setItem('eb-view','claude');
