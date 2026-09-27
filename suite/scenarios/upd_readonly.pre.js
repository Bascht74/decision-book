// A book from before 0.1.0 opened by a viewer who may only read: no migration, no write, a hint that the book is
// updated once somebody with write access opens it; the cards are shown as they are.
// every text the update bar (#book-update) shows, in order, as "kind: text"
window.BAR=[];new MutationObserver(()=>{const b=document.getElementById("book-update");if(!b)return;const t=(b.hidden?"hidden":b.dataset.kind)+": "+b.textContent;if(BAR[BAR.length-1]!==t)BAR.push(t)}).observe(document.documentElement,{subtree:true,childList:true,characterData:true,attributes:true});
window.__OLD_BOOK=true;window.__CAN_WRITE=false;const S=__DB.store;S.set('meta/stand',{aktuell:'1.0.0b2'});
S.set('entscheidungen/E-001',{ueberschrift:'Karte eins',blatt:'offen',ziel:'1.0.0b2',chef_am:'2026-01-10T10:00:00.000Z'});
