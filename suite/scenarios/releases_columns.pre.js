// the columns of the releases table stand still -- opening a group or a card row below it, and sorting, move no
// column; every release lines its columns up with the others; the headline takes what the fixed columns leave.
const S=__DB.store;S.set("meta/stand",{aktuell:"3.0.0b28"});
const C=(n,ziel,blatt,p,i,extra)=>S.set("entscheidungen/E-"+n,Object.assign({ueberschrift:"Karte "+n,beschreibung:"Text "+n,option1:"Eins",option2:"Zwei",blatt,ziel,von:"Claude",typ:"Aufgabe",status:blatt==="erledigt"?"umgesetzt":"offen",tokens_prognose:p,tokens_ist:i,kommentare:[],verlauf:[],geaendert:"2026-09-20T08:00:00.000Z"},extra||{}));
C("001","3.0.0b28","offen",null,null,{ueberschrift:"Kurz"});C("002","3.0.0b28","offen",5000,null);
C("003","3.0.0b28","erledigt",12500000,-3000,{ueberschrift:"Eine erledigte Karte mit einer recht langen Überschrift, die umbricht"});
C("004","3.0.0b28","entschieden",40000,null,{beschreibung:"Ein_sehr_langes_Wort_ohne_Leerzeichen_das_eine_Tabelle_ohne_feste_Spalten_breiter_machen_würde_und_noch_länger_und_noch_länger_bis_zum_Rand"});
C("005","3.0.0b29","offen",null,null,{ueberschrift:"Nächstes"});
localStorage.setItem("eb-view","releases");
