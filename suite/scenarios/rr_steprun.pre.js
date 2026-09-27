// while a run in meta/laeufe is not "fertig", the step that "läuft" carries "GitHub-Prüflauf: <name> – Live"
// (at 390 px, within the screen; the link of the run, http(s) only) -- in the collapsed head and in the open step list; a step that does not run carries
// nothing; once the run is "fertig" the line is gone. Synthetic fixture, roles only.
const S=__DB.store;S.set("meta/stand",{aktuell:"3.0.0b28"});
S.set("entscheidungen/E-301",{ueberschrift:"Karte 301",blatt:"erledigt",ziel:"3.0.0b28",von:"Claude",art:"entscheidung",kommentare:[],verlauf:[]});
S.set("meta/schritte",{release:"3.0.0b28",schritte:{"2":{zustand:"erledigt"},"3":{zustand:"erledigt"},"4":{zustand:"erledigt"},"5":{zustand:"erledigt"},"6":{zustand:"erledigt"},"7":{zustand:"erledigt"},"9":{zustand:"erledigt"},"10":{zustand:"läuft",text:"Veröffentlichung läuft"}}});
S.set("meta/laeufe",{laeufe:[{name:"Lauf ohne Adresse",url:"javascript:alert(1)",status:"wartet"},{name:"release.yml zur Marke 3.0.0b28",url:"https://example.org/actions/runs/7",status:"läuft",gestartet:"2026-09-27T17:35:00.000Z"}]});
localStorage.setItem("eb-view","dich");
