// Zeiten on a phone: no sideways scroll of the page, tables scroll in their own frame, first column sticks.
localStorage.setItem("eb-view","zeiten");
// synthetic fixture: two days (Do 12.11. and Fr 13.11.2026), columns "Projekt A", "Projekt B" (same group as A) and "Projekt C"
const S=__DB.store;
const cols=[{key:"a",name:"Projekt A",gruppe:"Projekt A"},{key:"b",name:"Projekt B",gruppe:"Projekt A"},{key:"c",name:"Projekt C",gruppe:"Projekt C"}];
const slot=(ab,stand,ort,n,sonst,h)=>({ab,n,sonst,stand,ort,h});
const day=(datum,slots)=>{const st={a:0,b:0,c:0};for(const s of slots)for(const k in s.h)st[k]+=s.h[k];return {datum,raster_min:30,spalten:cols,slots,stunden:st,anwesend_h:slots.filter(s=>s.stand!=="pause").length/2,geaendert:"2026-11-18T07:30:00Z"}};
S.set("zeiten/2026-11-13",day("2026-11-13",[slot("08:00","belegt","Rechner",{a:2,c:1},0,{a:.5}),slot("08:30","belegt","Rechner",{a:1,b:1},2,{a:.5}),slot("09:00","belegt","Rechner",{b:3},0,{b:.5}),slot("09:30","belegt","Rechner",{c:6},0,{c:.5}),slot("10:00","belegt","Rechner",{c:2},0,{c:.5}),slot("10:30","geschätzt","",{},0,{c:.25})]));
S.set("zeiten/2026-11-12",day("2026-11-12",[slot("08:00","belegt","Rechner",{a:3,b:0,c:2},1,{a:.5,b:0,c:.5}),slot("08:30","geschätzt","",{},0,{a:.5,b:0,c:.5}),slot("09:00","belegt","unterwegs",{b:4},0,{b:.5}),slot("09:30","pause","",{},0,{}),slot("10:00","pause","",{},0,{}),slot("10:30","pause","",{},0,{}),slot("11:00","belegt","Rechner",{a:5},0,{a:.5})]));
S.set("meta/zeiten",{satz:80,einheit:"€",hinweis:"Lücken bis zu einer Stunde gelten als weitergearbeitet.\nPausen zählen nicht.",ab:"2026-11-12",aktualisiert:"2026-11-18T07:30:00Z"});
localStorage.setItem("eb-zopen","x");
