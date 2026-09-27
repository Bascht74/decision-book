// the "fertig" column of "Releases" (between "Stand" and "Tokens geschätzt", fixed width, right-aligned): Claude's
// "fertig_pct" or the rule from the Stand; a group row and the release sum take the average weighted by the token estimate
// (a card without an estimate weighs as much as the average card with one; none has one: the plain average);
// "In Umsetzung" without a value is "–" and left out.
const S=__DB.store;S.set("meta/stand",{aktuell:"3.0.0b28"});
const C=(n,ziel,blatt,p,x)=>S.set("entscheidungen/E-"+n,Object.assign({ueberschrift:"Karte "+n,blatt,ziel,von:"Claude",typ:"Aufgabe",status:"offen",tokens_prognose:p,tokens_ist:null,kommentare:[],verlauf:[],geaendert:"2026-09-20T08:00:00.000Z"},x||{}));
C("101","3.0.0b28","arbeit",300000,{fertig_pct:40});C("102","3.0.0b28","arbeit",100000,{fertig_pct:80});C("103","3.0.0b28","arbeit",500000);
C("104","3.0.0b28","offen",100000,{fertig_pct:10});C("105","3.0.0b28","pruefen",200000,{tokens_ist:210000});
C("201","3.0.0b29","arbeit",null,{fertig_pct:30});C("202","3.0.0b29","offen",50000);C("203","3.0.0b29","arbeit",80000);
localStorage.setItem("eb-view","releases");
sessionStorage.setItem("eb-rgrp",JSON.stringify([["3.0.0b28|arbeit",true],["3.0.0b28|pruefen",true],["3.0.0b29|arbeit",true]]));
