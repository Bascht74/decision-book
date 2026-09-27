// every release in "Releases" shuts as a whole with ▸/▾ at its heading; shut, the heading and the sum row stay.
// All start open; a toggle is kept for this browser session (sessionStorage) and survives a redraw.
const S=__DB.store;S.set("meta/stand",{aktuell:"3.0.0b28"});
const C=(n,ziel,blatt,p,i)=>S.set("entscheidungen/E-"+n,{ueberschrift:"Karte "+n,beschreibung:"Text "+n,option1:"Eins",option2:"Zwei",blatt,ziel,von:"Claude",typ:"Aufgabe",status:"offen",tokens_prognose:p,tokens_ist:i,kommentare:[],verlauf:[],geaendert:"2026-09-20T08:00:00.000Z"});
C("001","3.0.0b28","offen",100000,50000);C("002","3.0.0b28","entschieden",20000,null);C("003","3.0.0b29","offen",30000,40000);
localStorage.setItem("eb-view","releases");
