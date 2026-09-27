// A book from before 0.1.0 (no meta/buch; the owner's stamp on a card named after the owner, here "chef_am" for the
// owner "Chef") is opened by a viewer who may write: migration 0.1.0 copies the old stamp to "eigner_am" where that is
// missing or older, on the cards and on the archived cards, keeps the old field, records itself in meta/buch.migriert,
// sets meta/buch.version to the page's version, and shows its progress. Another unknown "…_am" field (abgabe_am) is
// on one card: the owner name from the settings picks the right one.
// every text the update bar (#book-update) shows, in order, as "kind: text"
window.BAR=[];new MutationObserver(()=>{const b=document.getElementById("book-update");if(!b)return;const t=(b.hidden?"hidden":b.dataset.kind)+": "+b.textContent;if(BAR[BAR.length-1]!==t)BAR.push(t)}).observe(document.documentElement,{subtree:true,childList:true,characterData:true,attributes:true});
window.__OLD_BOOK=true;const S=__DB.store;
S.set('meta/stand',{aktuell:'1.0.0b2'});S.set('meta/einstellungen',{eigner:'Chef'});
const c=(nr,x)=>S.set('entscheidungen/'+nr,Object.assign({ueberschrift:'Karte '+nr,blatt:'offen',ziel:'1.0.0b2'},x));
c('E-001',{chef_am:'2026-01-10T10:00:00.000Z'});
c('E-002',{chef_am:'2026-01-11T10:00:00.000Z',eigner_am:'2026-01-12T10:00:00.000Z'});
c('E-003',{chef_am:'2026-01-14T10:00:00.000Z',eigner_am:'2026-01-13T10:00:00.000Z'});
c('E-004',{});
c('E-006',{chef_am:'2026-01-15T10:00:00.000Z',abgabe_am:'2026-02-01T10:00:00.000Z'});
S.set('archiv/karten-1.0.0b1',{art:'karten',release:'1.0.0b1',gepackt:'2026-01-05T10:00:00.000Z',
  eintraege:[{id:'E-005',ueberschrift:'Alt',blatt:'erledigt',ziel:'1.0.0b1',chef_am:'2026-01-02T10:00:00.000Z'},{id:'E-007',ueberschrift:'Ohne',blatt:'verworfen',ziel:'1.0.0b1'}]});
