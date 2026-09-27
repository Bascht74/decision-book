// "Öffnen" in the card search shows the card on a page of its own, even when a filter or a collapsed release hides it.
const S=__DB.store;S.set('meta/stand',{aktuell:'3.0.0b28'});
S.set('entscheidungen/E-801',{ueberschrift:'Archivkarte Seepferdchen',blatt:'erledigt',status:'umgesetzt',ziel:'3.0.0b27',von:'Eigner',tokens_prognose:1,tokens_ist:1});
S.set('entscheidungen/E-802',{ueberschrift:'Versteckte Karte',blatt:'offen',ziel:'3.0.0b29',von:'Eigner'});
S.set('entscheidungen/E-803',{ueberschrift:'Sichtbare Karte',blatt:'offen',ziel:'3.0.0b28',von:'Claude'});
localStorage.setItem('eb-hidden',JSON.stringify(['3.0.0b29']));
localStorage.setItem('eb-view','dich');
