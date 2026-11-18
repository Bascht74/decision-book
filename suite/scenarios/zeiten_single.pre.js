// Zeiten (0.5.1): every billing group has exactly one column: one column per group under the group's name, no "gesamt", no "davon".
__DL=true;
localStorage.setItem("eb-view","zeiten");
// synthetic fixture: two days, columns Spalte A, Spalte B
const S=__DB.store;
const cols=[{"key": "a", "name": "Spalte A", "gruppe": "Gruppe A"}, {"key": "b", "name": "Spalte B", "gruppe": "Gruppe B"}];
const day=(datum,st)=>({datum,raster_min:30,spalten:cols,slots:[{ab:"08:00",n:{a:1},sonst:0,stand:"belegt",ort:"Rechner",h:st}],stunden:st,anwesend_h:1});
S.set("zeiten/2026-11-12",day("2026-11-12",{"a": 1.5, "b": 0.5}));
S.set("zeiten/2026-11-13",day("2026-11-13",{"a": 1, "b": 0.5}));
S.set("meta/zeiten",{satz:80,einheit:"€",aktualisiert:"2026-11-18T07:30:00Z"});
