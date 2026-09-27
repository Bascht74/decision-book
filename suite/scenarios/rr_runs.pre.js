// a running GitHub run stands in "Releases", right under the sum of the current release: "GitHub-Prüflauf", its
// name, status and a link "Live" (http(s) only); a finished one is not shown. "Aufträge" shows no runs and no run count.
// The step line says "GitHub-Prüflauf" (the page's default steps) and carries a "Live" link while a run goes.
const S=__DB.store;S.set("meta/stand",{aktuell:"3.0.0b28"});
const C=(n,ziel,blatt,x)=>S.set("entscheidungen/E-"+n,Object.assign({ueberschrift:"Karte "+n,blatt,ziel,von:"Claude",art:"entscheidung",tokens_prognose:100000,tokens_ist:90000,kommentare:[],verlauf:[],geaendert:"2026-09-20T08:00:00.000Z"},x||{}));
C("301","3.0.0b28","erledigt");C("302","3.0.0b29","offen");
S.set("meta/schritte",{release:"3.0.0b28",schritte:{"2":{zustand:"erledigt"},"3":{zustand:"erledigt"},"4":{zustand:"erledigt"},"5":{zustand:"erledigt"},"6":{zustand:"erledigt"},"7":{zustand:"erledigt"},"9":{zustand:"läuft"}}});
S.set("meta/laeufe",{laeufe:[{name:"tests.yml auf dem Zweig runde-b28",url:"https://example.org/actions/runs/1",status:"läuft",gestartet:"2026-09-27T10:00:00.000Z"},
  {name:"alter Lauf",url:"https://example.org/actions/runs/0",status:"fertig",gestartet:"2026-09-26T10:00:00.000Z"},
  {name:"Lauf mit falscher Adresse",url:"javascript:alert(1)",status:"wartet"}]});
localStorage.setItem("eb-view","releases");
