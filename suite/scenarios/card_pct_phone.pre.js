// on a 390 px phone: "NN % fertig" stays on one line at the right edge of the card or order, and nothing is wider than the screen.
window.__SYNC=true;const S=__DB.store;S.set('meta/stand',{aktuell:'3.0.0b28'});
const c=(nr,blatt,x)=>S.set('entscheidungen/'+nr,Object.assign({ueberschrift:'Eine recht lange Überschrift für die Karte '+nr+' auf dem Telefon',blatt,ziel:'3.0.0b28',von:'Eigner'},x||{}));
c('E-821','offen',{fertig_pct:100,tokens_prognose:1234567});c('E-822','pruefen',{tokens_prognose:12345678,tokens_ist:23456789});
c('E-823','arbeit');c('E-824','entschieden',{fertig_pct:5});c('E-825','vorrat',{typ:'Aufgabe',quelle:'eine lange Quelle ohne Pause'});
S.set('auftraege/a1',{text:'Ein Auftrag mit einem ziemlich langen Text, der auf dem Telefon umbricht',zeit:'2026-09-27T08:00:00.000Z',status:'neu',bilder:[]});
localStorage.setItem('eb-view','dich');
