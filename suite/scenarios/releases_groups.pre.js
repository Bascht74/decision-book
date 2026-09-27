// follow-up: within a release the rows stand in groups by Stand (Offen, Entschieden, in Arbeit, Prüfen, Erledigt, Vorrat),
// each with a group row: ▸/▾, the count and the token sums. "Erledigt" and "in Arbeit" start shut; a toggle is kept for
// the session; sorting works within the groups; the Stand filter and the release sum row keep working.
const S=__DB.store;S.set("meta/stand",{aktuell:"3.0.0b28"});
const C=(n,blatt,p,i,t)=>S.set("entscheidungen/E-"+n,{ueberschrift:t||"Karte "+n,beschreibung:"Text "+n,option1:"Eins",option2:"Zwei",blatt,ziel:"3.0.0b28",von:"Claude",typ:"Aufgabe",status:blatt==="erledigt"?"umgesetzt":"offen",tokens_prognose:p,tokens_ist:i,kommentare:[],verlauf:[],geaendert:"2026-09-20T08:00:00.000Z"});
C("061","vorrat",null,null);C("051","erledigt",1000000,900000);C("052","erledigt",300000,400000);
C("011","offen",100000,50000);C("012","offen",20000,30000);C("013","offen",null,null);
C("031","arbeit",200000,100000);C("032","arbeit",100000,50000);C("021","entschieden",40000,null);C("041","pruefen",10000,12000);
localStorage.setItem("eb-view","releases");
