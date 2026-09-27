// "● k Karten · a Antworten warten auf Dich · x für bNN": k = the cards of "Für Dich", a = open talks whose last word is
// Claude's (a part with 0 is left out, singular for 1), x = of those cards, the current release's; each part leads to its place,
// the tab title carries the total.
const S=__DB.store;S.set('meta/stand',{aktuell:'3.0.0b28'});
S.set('entscheidungen/E-901',{ueberschrift:'offen b28',blatt:'offen',ziel:'3.0.0b28',von:'Eigner'});
S.set('entscheidungen/E-902',{ueberschrift:'offen b29',blatt:'offen',ziel:'3.0.0b29',von:'Eigner'});
S.set('entscheidungen/E-903',{ueberschrift:'pruefen b28',blatt:'pruefen',ziel:'3.0.0b28',von:'Claude',tokens_prognose:5,tokens_ist:5});
S.set('entscheidungen/E-904',{ueberschrift:'Hinweis b29',art:'hinweis',blatt:'offen',ziel:'3.0.0b29'});
S.set('entscheidungen/E-905',{ueberschrift:'entschieden b28',blatt:'entschieden',ziel:'3.0.0b28'});
S.set('entscheidungen/E-906',{ueberschrift:'erledigt',blatt:'erledigt',ziel:'3.0.0b28',tokens_prognose:5,tokens_ist:5});
S.set('gespraech/g1',{start:'2026-09-27T07:00:00.000Z',status:'offen',thread:'t0',nachrichten:[{von:'Eigner',text:'?',zeit:'2026-09-27T07:00:00.000Z'},{von:'Claude',text:'!',zeit:'2026-09-27T07:01:00.000Z'}]});
S.set('gespraech/g2',{start:'2026-09-27T07:00:00.000Z',status:'offen',thread:'t1',wartet:'Claude',nachrichten:[{von:'Eigner',text:'?',zeit:'2026-09-27T07:02:00.000Z'}]});
S.set('gespraech/g3',{start:'2026-09-27T07:00:00.000Z',status:'gelesen',thread:'t2',nachrichten:[{von:'Claude',text:'!',zeit:'2026-09-27T07:03:00.000Z'}]});
localStorage.setItem('eb-view','claude');
