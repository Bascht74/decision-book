// A book whose meta/buch.version is the page's version (the stand-in's default): nothing is migrated, nothing is
// written by the update, no bar -- also when a card carries an unknown "…_am" field; the owner's rules run.
// every text the update bar (#book-update) shows, in order, as "kind: text"
window.BAR=[];new MutationObserver(()=>{const b=document.getElementById("book-update");if(!b)return;const t=(b.hidden?"hidden":b.dataset.kind)+": "+b.textContent;if(BAR[BAR.length-1]!==t)BAR.push(t)}).observe(document.documentElement,{subtree:true,childList:true,characterData:true,attributes:true});
const S=__DB.store;S.set('meta/stand',{aktuell:'1.0.0b2'});
// E-009 stands in "Prüfen" without token numbers: on a current book the owner's rule pulls it back at once
S.set('entscheidungen/E-009',{ueberschrift:'Ohne Tokens',blatt:'pruefen',ziel:'1.0.0b2',von:'Claude',geaendert:'2026-01-10T10:00:00.000Z'});
S.set('entscheidungen/E-001',{ueberschrift:'Karte',blatt:'offen',ziel:'1.0.0b2',chef_am:'2026-01-10T10:00:00.000Z'});
