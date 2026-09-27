// at 390 px: the runs under the current release, the "Live" link beside the step line and the release overview
// stay inside the screen, also with a long run name without a break.
const S=__DB.store;S.set("meta/stand",{aktuell:"3.0.0b28"});
const C=(n,ziel,blatt,x)=>S.set("entscheidungen/E-"+n,Object.assign({ueberschrift:"Karte "+n,blatt,ziel,von:"Claude",art:"entscheidung",tokens_prognose:100000,tokens_ist:90000,kommentare:[],verlauf:[],geaendert:"2026-09-20T08:00:00.000Z"},x||{}));
C("301","3.0.0b28","offen");C("302","3.0.0b29","offen");C("303","später","vorrat");C("304","Runde vom Tag: ein recht langer alter Name","pruefen");
S.set("meta/laeufe",{laeufe:[{name:"tests.yml_auf_dem_Zweig_rundeb28_mit_einem_sehr_langen_Namen_ohne_jede_Pause_dazwischen",url:"https://example.org/actions/runs/1",status:"läuft",gestartet:"2026-09-27T10:00:00.000Z"}]});
localStorage.setItem("eb-view","releases");
