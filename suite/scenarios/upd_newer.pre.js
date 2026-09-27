// A page older than its book (meta/buch.version newer than PAGE_VERSION): it says so and writes nothing.
// every text the update bar (#book-update) shows, in order, as "kind: text"
window.BAR=[];new MutationObserver(()=>{const b=document.getElementById("book-update");if(!b)return;const t=(b.hidden?"hidden":b.dataset.kind)+": "+b.textContent;if(BAR[BAR.length-1]!==t)BAR.push(t)}).observe(document.documentElement,{subtree:true,childList:true,characterData:true,attributes:true});
const S=__DB.store;S.set('meta/stand',{aktuell:'1.0.0b2'});S.set('meta/buch',{version:'99.0.0',migriert:['0.1.0','99.0.0']});
S.set('entscheidungen/E-001',{ueberschrift:'Karte',blatt:'offen',ziel:'1.0.0b2',chef_am:'2026-01-10T10:00:00.000Z'});
