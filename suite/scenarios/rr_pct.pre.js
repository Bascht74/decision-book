// the "fertig" of a group and of a release in "Releases": a card without an estimate weighs as much as the average
// card with one (one done card without an estimate used to make the whole sum a plain average: 100 % instead of 98 %);
// "100 %" only when all is done. The column heads do not break inside a word ("verbrauch / t").
const S=__DB.store;S.set("meta/stand",{aktuell:"3.0.0b28"});
const C=(n,ziel,blatt,p,x)=>S.set("entscheidungen/E-"+n,Object.assign({ueberschrift:"Karte "+n,blatt,ziel,von:"Claude",art:"entscheidung",tokens_prognose:p,tokens_ist:p,kommentare:[],verlauf:[],geaendert:"2026-09-20T08:00:00.000Z"},x||{}));
C("500","3.0.0b28","arbeit",3300000,{fertig_pct:80});
for(let i=1;i<=90;i++)C(String(500+i),"3.0.0b28","erledigt",370000);
C("600","3.0.0b28","erledigt",null);
C("700","3.0.0b29","arbeit",1000000,{fertig_pct:96});C("701","3.0.0b29","erledigt",9000000);
localStorage.setItem("eb-view","releases");
sessionStorage.setItem("eb-rgrp",JSON.stringify([["3.0.0b28|arbeit",true]]));
