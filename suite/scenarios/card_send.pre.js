// "Senden" on a card: a live comment to Claude, and one write whose messages keep what another writer added meanwhile.
const S=__DB.store;S.set('meta/stand',{aktuell:'3.0.0b28'});
S.set('entscheidungen/E-701',{ueberschrift:'Karte in Umsetzung',blatt:'arbeit',status:'entschieden',ziel:'3.0.0b28',von:'Eigner',
  kommentare:[{von:'Claude',text:'Erste Nachricht von Claude',zeit:'2026-09-27T07:00:00.000Z'}]});
S.set('entscheidungen/E-702',{ueberschrift:'Andere Karte',blatt:'arbeit',ziel:'3.0.0b28',von:'Claude'});
// while the owner's message is on its way, Claude writes to the same card
window.__ON_SEND=()=>{const c=S.get('entscheidungen/E-701');__DB.external('entscheidungen/E-701',{kommentare:[...c.kommentare,{von:'Claude',text:'Zwischenfrage von Claude',zeit:'2026-09-27T07:30:00.000Z'}]})};
localStorage.setItem('eb-view','claude');
