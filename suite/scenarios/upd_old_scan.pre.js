// Migration 0.1.0 without an owner name in the settings: one unknown "…_am" field on the cards is taken; two are not
// guessed -- the migration stops and names both; with meta/buch.stempel_alt set by hand it runs. A card write that
// fails stops it too, naming the card.
// every text the update bar (#book-update) shows, in order, as "kind: text"
window.BAR=[];new MutationObserver(()=>{const b=document.getElementById("book-update");if(!b)return;const t=(b.hidden?"hidden":b.dataset.kind)+": "+b.textContent;if(BAR[BAR.length-1]!==t)BAR.push(t)}).observe(document.documentElement,{subtree:true,childList:true,characterData:true,attributes:true});
window.__OLD_BOOK=true;window.__USE_DELAY={db:100};const S=__DB.store;S.set('meta/stand',{aktuell:'1.0.0b2'});
S.set('entscheidungen/E-001',{ueberschrift:'Eins',blatt:'offen',ziel:'1.0.0b2',boss_am:'2026-01-10T10:00:00.000Z'});
S.set('entscheidungen/E-002',{ueberschrift:'Zwei',blatt:'offen',ziel:'1.0.0b2',abgabe_am:'2026-01-11T10:00:00.000Z'});
