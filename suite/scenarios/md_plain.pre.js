// a text without Markdown is drawn exactly as before (text and links, line breaks kept, no Markdown element).
const S=__DB.store;S.set('meta/stand',{aktuell:'3.0.0b28'});
const T='Zeile eins\nZeile zwei mit 5 * 3 * 2 und a_b_c und x|y\n\n  eingerückt\nsiehe https://example.org/x.';
S.set('entscheidungen/E-701',{ueberschrift:'Karte',blatt:'offen',status:'offen',ziel:'3.0.0b28',von:'Claude',wartet:'Dich',beschreibung:T,empfehlung:T,
  kommentare:[{von:'Claude',text:T,zeit:'2026-09-27T07:00:00.000Z'}]});
S.set('gespraech/g1',{start:'2026-09-27T07:00:00.000Z',status:'offen',nachrichten:[{von:'Claude',text:T,zeit:'2026-09-27T07:01:00.000Z'}]});
localStorage.setItem('eb-view','fuerdich');
