// At phone width (390 px, inside an iframe of exactly that width) no view scrolls sideways.
window.__SYNC=true;seed(60);const S=__DB.store;
for(let i=0;i<5;i++)S.set('statistik/s'+i,{version:'3.0.0b2'+i,ordnung:i,veroeffentlicht:'2026-09-2'+i+'T10:00:00Z',commits:100+i,zyklus_std:20+i,codezeilen:30000,geaenderte_zeilen:400,ci_pr_s:900,changelog:{Added:3,Fixed:2}});
S.set('gespraech/g1',{start:'2026-09-27T07:00:00.000Z',status:'offen',wartet:'Claude',titel:'Ein sehr langer Titel eines Gesprächs, der auf dem Telefon umbrechen muss und nicht über den Rand laufen darf',nachrichten:[{von:'Eigner',text:'Eine lange Zeile ohne Umbruch /Volumes/beispiel/Dokumente/Projekt/development/decision_book/ein_sehr_langer_dateiname_ohne_leerzeichen.html',zeit:'2026-09-27T07:01:00.000Z'}]});
S.set('gespraech/g2',{start:'2026-09-26T07:00:00.000Z',status:'gelesen',nachrichten:[{von:'Eigner',text:'https://example.org/ein/sehr/langer/pfad/ohne/leerzeichen/der/weiter/und/weiter/geht/bis/ans/ende',zeit:'2026-09-26T07:01:00.000Z'}]});
S.set('auftraege/a1',{text:'Neuer Auftrag',zeit:'2026-09-27T08:00:00.000Z',status:'neu',bilder:[]});
S.set('meta/laeufe',{laeufe:[{name:'Ein Prüflauf mit einem langen Namen auf GitHub',url:'https://example.org/lauf',status:'läuft',gestartet:'2026-09-27T08:00:00Z'}]});
S.set('meta/stand',{aktuell:'3.0.0b28',wartet_auf_start:true});
localStorage.setItem('eb-open',JSON.stringify([['E-010:offen',true],['E-011:pruefen',true],['E-008:entschieden',true]]));
