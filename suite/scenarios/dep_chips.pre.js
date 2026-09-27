// "haengt_an" shows as "hängt an E-nnn" on the card head (marked while that card is not done) and as "blockiert E-mmm" on the other; a chip opens the card.
window.__SYNC=true;const S=__DB.store;S.set('meta/stand',{aktuell:'3.0.0b28'});
S.set('entscheidungen/E-701',{ueberschrift:'Hängt an einer offenen',blatt:'offen',ziel:'3.0.0b28',haengt_an:['E-702']});
S.set('entscheidungen/E-702',{ueberschrift:'Die offene',blatt:'offen',ziel:'3.0.0b28'});
S.set('entscheidungen/E-703',{ueberschrift:'Hängt an einer erledigten',blatt:'offen',ziel:'3.0.0b28',haengt_an:'E-704'});
S.set('entscheidungen/E-704',{ueberschrift:'Die erledigte',blatt:'erledigt',ziel:'3.0.0b28',tokens_prognose:1,tokens_ist:1});
localStorage.setItem('eb-view','dich');
