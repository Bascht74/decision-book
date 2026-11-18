// Zeiten (0.5.1): a day without its own "spalten" while a column is left out shows the remaining columns only.
__DL=true;
localStorage.setItem("eb-view","zeiten");
// synthetic fixture: two days, columns Projekt A, Projekt B, Übergreifend
const S=__DB.store;
const cols=[{"key": "a", "name": "Projekt A", "gruppe": "Projekt A"}, {"key": "b", "name": "Projekt B", "gruppe": "Projekt A"}, {"key": "z", "name": "Übergreifend", "gruppe": "Übergreifend"}];
const day=(datum,st)=>({datum,raster_min:30,spalten:cols,slots:[{ab:"08:00",n:{a:1},sonst:0,stand:"belegt",ort:"Rechner",h:st}],stunden:st,anwesend_h:1});
S.set("zeiten/2026-11-12",day("2026-11-12",{"a": 1.5, "b": 0.5, "z": 0}));
S.set("zeiten/2026-11-13",Object.assign(day("2026-11-13",{"a": 1, "b": 0.5}),{spalten:undefined}));
S.set("meta/zeiten",{satz:80,einheit:"€",aktualisiert:"2026-11-18T07:30:00Z"});
