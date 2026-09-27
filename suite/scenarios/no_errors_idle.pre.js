// Every view, the steps, the change log and a card of each kind open without a script error or an unhandled rejection.
seed(60);const S=__DB.store;
for(let i=0;i<3;i++)S.set('statistik/s'+i,{version:'3.0.0b2'+i,ordnung:i,veroeffentlicht:'2026-09-2'+i+'T10:00:00Z',commits:100+i});
S.set('gespraech/g1',{start:'2026-09-27T07:00:00.000Z',status:'offen',wartet:'Claude',karte:'E-010',nachrichten:[{von:'Eigner',text:'Hallo',zeit:'2026-09-27T07:01:00.000Z'}]});
S.set('auftraege/a1',{text:'Neu',zeit:'2026-09-27T08:00:00.000Z',status:'neu',bilder:[]});
S.set('meta/schritte',{release:'3.0.0b28',schritte:{'2':{zustand:'läuft',text:'halb',teile:[{name:'Teil',zustand:'erledigt'}]}}});
