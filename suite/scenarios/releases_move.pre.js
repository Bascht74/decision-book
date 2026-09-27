// "Verschieben" is a dropdown: the releases shown, always one beyond the highest numbered one, and "später";
// the card's own release selected as "(hier)". A choice writes only "ziel" of that one card and the row moves to the chosen
// release; a card in work, in "Prüfen" or done cannot be moved.
const S=__DB.store;S.set("meta/stand",{aktuell:"3.0.0b28"});
const C=(n,ziel,blatt,p,i)=>S.set("entscheidungen/E-"+n,{ueberschrift:"Karte "+n,beschreibung:"Text "+n,option1:"Eins",option2:"Zwei",blatt,ziel,von:"Claude",typ:"Aufgabe",status:blatt==="erledigt"?"umgesetzt":"offen",tokens_prognose:p,tokens_ist:i,kommentare:[],verlauf:[],geaendert:"2026-09-20T08:00:00.000Z"});
C("001","3.0.0b28","offen",100000,120000);C("002","3.0.0b28","arbeit",200000,150000);C("003","3.0.0b28","erledigt",1000000,1500000);
C("004","3.0.0b28","entschieden",50000,null);C("009","3.0.0b28","pruefen",10000,10000);C("005","3.0.0b30","offen",30000,null);
C("006","später","vorrat",null,null);C("007","Buch","pruefen",40000,45000);C("008","3.0.0b27","erledigt",5000,6000);
localStorage.setItem("eb-view","releases");
