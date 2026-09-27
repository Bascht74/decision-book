// (the owner's case): a card in "Prüfen" was found moved to b29 with its sheet at "entschieden". Moving writes "ziel"
// and nothing else, so sheet and status stay; and a card in "Prüfen" cannot be moved at all -- neither by "Verschieben" in
// the releases table nor by the "Ziel" dropdown of the card itself (in the table's expanded row and in "Für Dich").
const S=__DB.store;S.set("meta/stand",{aktuell:"3.0.0b28"});
const C=(n,blatt,status,extra)=>S.set("entscheidungen/E-"+n,Object.assign({ueberschrift:"Karte "+n,beschreibung:"Text "+n,option1:"Eins",option2:"Zwei",blatt,status,ziel:"3.0.0b28",von:"Eigner",typ:"Aufgabe",kommentare:[],verlauf:[],geaendert:"2026-09-20T08:00:00.000Z"},extra||{}));
C("101","entschieden","entschieden",{entscheidung:"Option 1",tokens_prognose:50000});
C("102","pruefen","umgesetzt",{von:"Claude",tokens_prognose:10000,tokens_ist:12000});
C("103","offen","offen",{tokens_prognose:20000});
localStorage.setItem("eb-view","releases");
