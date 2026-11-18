// Zeiten: hours with more than two decimals are rounded per value before adding, so rows and footer agree; a day without its own "spalten" still shows its hours in the day table.
localStorage.setItem("eb-view","zeiten");
const S=__DB.store;
const cols=[{key:"a",name:"Projekt A",gruppe:"Projekt A"}];
const day=(datum,h,own)=>{const d={datum,raster_min:30,slots:[{ab:"08:00",n:{a:1},sonst:0,stand:"belegt",ort:"Rechner",h:{a:h}}],stunden:{a:h},anwesend_h:1};if(own)d.spalten=cols;return d};
S.set("zeiten/2026-11-09",day("2026-11-09",1.333,true));
S.set("zeiten/2026-11-10",day("2026-11-10",1.333,true));
S.set("zeiten/2026-11-11",day("2026-11-11",1.333,true));
S.set("zeiten/2026-11-12",day("2026-11-12",1,true));
S.set("zeiten/2026-11-13",day("2026-11-13",2,false));
S.set("meta/zeiten",{satz:80,einheit:"€",aktualisiert:"2026-11-18T07:30:00Z"});
window.__DL=true;
