// follow-up: the releases table takes the whole content width; "Überschrift" takes what is left, left-aligned, in the body
// font (not the monospace of the counts table in the release bar, whose look stays as it was); numbers right-aligned.
const S=__DB.store;S.set("meta/stand",{aktuell:"3.0.0b28"});
const C=(n,blatt,p,i,t)=>S.set("entscheidungen/E-"+n,{ueberschrift:t||"Karte "+n,beschreibung:"Text "+n,option1:"Eins",option2:"Zwei",blatt,ziel:"3.0.0b28",von:"Claude",typ:"Aufgabe",status:"offen",tokens_prognose:p,tokens_ist:i,kommentare:[],verlauf:[],geaendert:"2026-09-20T08:00:00.000Z"});
C("001","offen",100000,120000,"Eine recht lange Überschrift, die auf einem breiten Schirm in eine einzige Zeile passen muss");
C("002","entschieden",30000,null);
localStorage.setItem("eb-view","releases");
