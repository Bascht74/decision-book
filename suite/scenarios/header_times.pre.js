// The header times follow Claude's newest message: talks -> "Aufträge gelesen", cards -> "Deine Karten bearbeitet",
// the newer of both (or meta/claude) -> "Claude zuletzt". Runs in Europe/Berlin (UTC+2 on this date).
const S=__DB.store;S.set('meta/stand',{aktuell:'3.0.0b28'});
S.set('meta/claude',{auftraege_gelesen:'2026-09-27T06:00:00.000Z',karten_bearbeitet:'2026-09-27T06:00:00.000Z',zuletzt:'2026-09-27T06:00:00.000Z'});
S.set('gespraech/g1',{start:'2026-09-27T08:00:00.000Z',status:'gelesen',thread:'t0',nachrichten:[{von:'Eigner',text:'?',zeit:'2026-09-27T08:00:00.000Z'},{von:'Claude',text:'!',zeit:'2026-09-27T08:15:00.000Z'},{von:'Eigner',text:'danke',zeit:'2026-09-27T09:59:00.000Z'}]});
S.set('entscheidungen/E-920',{ueberschrift:'Karte',blatt:'arbeit',ziel:'3.0.0b28',kommentare:[{von:'Claude',text:'x',zeit:'2026-09-27T08:45:00.000Z'},{von:'Eigner',text:'y',zeit:'2026-09-27T09:58:00.000Z'}]});
localStorage.setItem('eb-view','claude');
