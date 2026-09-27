// the release overview on top lists only targets with a card in its columns (Vorrat .. Prüfen), in this order: the
// current release, the next ones ascending, "später", "Buch", then the rest (an older release, an old name), "ohne Ziel".
const S=__DB.store;S.set("meta/stand",{aktuell:"3.0.0b28"});
const C=(n,ziel,blatt,x)=>S.set("entscheidungen/E-"+n,Object.assign({ueberschrift:"Karte "+n,blatt,ziel,von:"Claude",art:"entscheidung",tokens_prognose:100000,tokens_ist:90000,kommentare:[],verlauf:[],geaendert:"2026-09-20T08:00:00.000Z"},x||{}));
C("401","3.0.0b28","offen");C("402","3.0.0b29","erledigt");C("403","3.0.0b31","vorrat");C("404","3.0.0b30","entschieden");C("405","später","entschieden");
C("406","Buch","arbeit");C("407","3.0.0b22","offen");C("408","Runde vom Tag: Beispiel","pruefen");C("409","3.0.0b26","verworfen");C("410","3.0.0b23","erledigt");
C("411","","vorrat");C("412","3.0.0b24","offen",{art:"hinweis"});C("413","später","vorrat");
localStorage.setItem("eb-view","dich");
