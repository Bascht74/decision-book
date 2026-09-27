// A book one version behind with no migration pending (it ran 0.1.0 before): the page only moves meta/buch.version on,
// keeps meta/buch.migriert as it was, runs no migration again, says so once, and the owner's rules start.
// every text the update bar (#book-update) shows, in order, as "kind: text"
window.BAR=[];new MutationObserver(()=>{const b=document.getElementById("book-update");if(!b)return;const t=(b.hidden?"hidden":b.dataset.kind)+": "+b.textContent;if(BAR[BAR.length-1]!==t)BAR.push(t)}).observe(document.documentElement,{subtree:true,childList:true,characterData:true,attributes:true});
const S=__DB.store;S.set('meta/stand',{aktuell:'1.0.0b2'});
S.set('meta/buch',{version:'0.1.0',migriert:['0.1.0'],aktualisiert:'2026-01-01T00:00:00.000Z'});
// stands in "Prüfen" without token numbers: once the data is current the owner's rule pulls it back
S.set('entscheidungen/E-009',{ueberschrift:'Ohne Tokens',blatt:'pruefen',ziel:'1.0.0b2',von:'Claude',geaendert:'2026-01-10T10:00:00.000Z'});
S.set('entscheidungen/E-001',{ueberschrift:'Karte',blatt:'offen',ziel:'1.0.0b2',chef_am:'2026-01-10T10:00:00.000Z'});
