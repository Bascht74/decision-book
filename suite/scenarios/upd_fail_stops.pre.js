// Migrations run oldest first; a failing one stops the run: it is named, the ones after it do not run, what ran before
// it stays recorded in meta/buch.migriert, meta/buch.version stays unset, the owner's rule writes stay off. The next
// load runs only what is not recorded yet and then sets the version.
// Two test migrations are put in front of 0.1.0 (0.0.1 and 0.0.2, listed in the wrong order on purpose); the db is
// handed out 100 ms late so the scenario can add them before the page asks.
// every text the update bar (#book-update) shows, in order, as "kind: text"
window.BAR=[];new MutationObserver(()=>{const b=document.getElementById("book-update");if(!b)return;const t=(b.hidden?"hidden":b.dataset.kind)+": "+b.textContent;if(BAR[BAR.length-1]!==t)BAR.push(t)}).observe(document.documentElement,{subtree:true,childList:true,characterData:true,attributes:true});
window.__OLD_BOOK=true;window.__USE_DELAY={db:100};const S=__DB.store;S.set('meta/stand',{aktuell:'1.0.0b2'});
S.set('entscheidungen/E-001',{ueberschrift:'Karte',blatt:'offen',ziel:'1.0.0b2',chef_am:'2026-01-10T10:00:00.000Z'});
// E-009 stands in "Prüfen" without token numbers: the owner's rule would pull it back -- not while the update is not done
S.set('entscheidungen/E-009',{ueberschrift:'Ohne Tokens',blatt:'pruefen',ziel:'1.0.0b2',von:'Claude',geaendert:'2026-01-10T10:00:00.000Z'});
window.RAN=[];window.BREAK2=true;
