// The change log (click on the version) says how many documents the book holds, pictures a card, talk or order points to included.
window.__SYNC=true;seed(30);const S=__DB.store;
for(let i=0;i<5;i++)S.set('gespraech/g'+i,{start:'2026-09-26T0'+i+':00:00.000Z',status:'gelesen',nachrichten:[{von:'Eigner',text:'Frage',zeit:'2026-09-26T08:00:00.000Z',bilder:i<2?['b'+i]:[]}]});
for(let i=0;i<3;i++)S.set('auftraege/o'+i,{text:'Auftrag',zeit:'2026-09-26T08:00:00.000Z',status:'neu',bilder:i===0?['b0','b9']:[]});
S.set('entscheidungen/E-001',Object.assign({},S.get('entscheidungen/E-001'),{bilder:['b7']}));
for(const b of ['b0','b1','b7','b9'])S.set('auftragsbilder/'+b,{data:'data:image/png;base64,iVBORw0KGgo=',zeit:'x'});
S.set('meta/claude',{zuletzt:'2026-09-27T08:00:00.000Z'});
// 30 cards + meta/stand (seed) + meta/claude + 5 talks + 3 orders + 4 pictures pointed to = 44
