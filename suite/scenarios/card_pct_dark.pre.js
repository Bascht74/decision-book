// in dark mode: the same cards and orders; "NN % fertig" keeps a text contrast of at least 4.5:1 on the dark card.
window.__SYNC=true;const S=__DB.store;S.set('meta/stand',{aktuell:'3.0.0b28'});
const c=(nr,blatt,x)=>S.set('entscheidungen/'+nr,Object.assign({ueberschrift:'Karte '+nr,blatt,ziel:'3.0.0b28'},x||{}));
c('E-801','offen');c('E-802','pruefen',{tokens_prognose:1,tokens_ist:1});c('E-803','offen',{fertig_pct:35});
c('E-804','entschieden');c('E-805','arbeit');c('E-806','arbeit',{fertig_pct:60});c('E-807','vorrat');
c('E-808','erledigt',{tokens_prognose:1,tokens_ist:1});c('E-809','arbeit',{fertig_pct:140});c('E-810','pruefen',{fertig_pct:90,tokens_prognose:1,tokens_ist:1});
S.set('auftraege/a1',{text:'Neuer Auftrag',zeit:'2026-09-27T08:00:00.000Z',status:'neu',bilder:[]});
S.set('auftraege/a2',{text:'Übernommener Auftrag',zeit:'2026-09-27T08:05:00.000Z',status:'übernommen',fertig_pct:20,bilder:[]});
S.set('auftraege/a3',{text:'Übernommen ohne Schätzung',zeit:'2026-09-27T08:06:00.000Z',status:'übernommen',bilder:[]});
localStorage.setItem('eb-view','dich');
