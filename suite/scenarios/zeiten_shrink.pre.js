// Zeiten (0.5.1): a group of two columns of which one has no hours on any day shrinks to one column under the group's name (no "gesamt").
__DL=true;
localStorage.setItem("eb-view","zeiten");
// synthetic fixture: two days, columns Projekt A, Projekt B, Projekt D
const S=__DB.store;
const cols=[{"key": "a", "name": "Projekt A", "gruppe": "Projekt A"}, {"key": "b", "name": "Projekt B", "gruppe": "Projekt A"}, {"key": "c", "name": "Projekt D", "gruppe": "Projekt D"}];
const day=(datum,st)=>({datum,raster_min:30,spalten:cols,slots:[{ab:"08:00",n:{a:1},sonst:0,stand:"belegt",ort:"Rechner",h:st}],stunden:st,anwesend_h:1});
S.set("zeiten/2026-11-12",day("2026-11-12",{"a": 1.5, "b": 0, "c": 1}));
S.set("zeiten/2026-11-13",day("2026-11-13",{"a": 1, "c": 1.25}));
S.set("meta/zeiten",{satz:80,einheit:"€",aktualisiert:"2026-11-18T07:30:00Z"});
