// 700 cards, 60 orders, 40 talks: first paint, a snapshot per view and a keystroke stay within generous bounds.
window.__SYNC=true;window.T0=performance.now();seed(700);const S=__DB.store;
for(let i=0;i<60;i++)S.set('auftraege/o'+i,{text:'Auftrag '+i,zeit:'2026-09-2'+(i%7)+'T08:00:00.000Z',status:'übernommen',karte:'E-001',antwort:'x'});
for(let i=0;i<40;i++)S.set('gespraech/g'+i,{start:'2026-09-26T0'+(i%9)+':00:00.000Z',status:'gelesen',nachrichten:[{von:'Eigner',text:'Frage',zeit:'2026-09-26T08:00:00.000Z'},{von:'Claude',text:'Antwort',zeit:'2026-09-26T08:01:00.000Z'}]});
