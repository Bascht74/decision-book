// "frist" + "ersatz" on open cards: "Frist: … – sonst: …" before, "Frist abgelaufen – ich nehme: …" after; nothing is written.
window.__SYNC=true;const S=__DB.store;S.set('meta/stand',{aktuell:'3.0.0b28'});
const iso=ms=>new Date(Date.now()+ms).toISOString();
S.set('entscheidungen/E-721',{ueberschrift:'Frist kommt',blatt:'offen',ziel:'3.0.0b28',frist:iso(3*60e3),ersatz:'Option 1'});
S.set('entscheidungen/E-722',{ueberschrift:'Frist vorbei',blatt:'offen',ziel:'3.0.0b28',frist:iso(-3600e3),ersatz:'Option 2'});
S.set('entscheidungen/E-723',{ueberschrift:'Ohne Frist',blatt:'offen',ziel:'3.0.0b28'});
localStorage.setItem('eb-view','dich');
