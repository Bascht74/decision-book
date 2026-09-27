// a card I hand back to the owner (it moves to "Prüfen" or "Offen" and carries a new message of mine) arrives
// open, with my newest message unfolded -- also when he had closed the card on an earlier stay there, or folded its talk.
const S=__DB.store;S.set('meta/stand',{aktuell:'3.0.0b28'});
const old=[{von:'Claude',text:'Alte Nachricht',zeit:'2026-09-27T07:00:00.000Z'},{von:'Eigner',text:'Bitte umsetzen',zeit:'2026-09-27T07:10:00.000Z'}];
S.set('entscheidungen/E-801',{ueberschrift:'Geht zurück nach Prüfen',blatt:'arbeit',status:'entschieden',ziel:'3.0.0b28',von:'Eigner',wartet:'Claude',kommentare:old,tokens_prognose:1,tokens_ist:1});
S.set('entscheidungen/E-802',{ueberschrift:'Geht zurück nach Offen',blatt:'arbeit',status:'entschieden',ziel:'3.0.0b28',von:'Eigner',wartet:'Claude',kommentare:old});
// already handed back before this load: my message is newer than the one this viewer saw
S.set('entscheidungen/E-803',{ueberschrift:'Schon zurück',blatt:'pruefen',status:'umgesetzt',ziel:'3.0.0b28',von:'Eigner',wartet:'Dich',tokens_prognose:1,tokens_ist:1,
  kommentare:[...old,{von:'Claude',text:'Fertig, bitte prüfen',zeit:'2026-09-27T08:00:00.000Z'}]});
// already opened once for this message (follow-up: eb-kopen): stays as the owner left it (closed)
S.set('entscheidungen/E-804',{ueberschrift:'Schon gesehen',blatt:'pruefen',status:'umgesetzt',ziel:'3.0.0b28',von:'Eigner',wartet:'Dich',tokens_prognose:1,tokens_ist:1,
  kommentare:[...old,{von:'Claude',text:'Gesehen',zeit:'2026-09-27T08:00:00.000Z'}]});
localStorage.setItem('eb-open',JSON.stringify([['E-801:pruefen',false],['E-802:offen',false],['E-803:pruefen',false],['E-804:pruefen',false]]));
localStorage.setItem('eb-draft:kz:E-801','0');localStorage.setItem('eb-draft:kz:E-803','0');
localStorage.setItem('eb-kopen',JSON.stringify({'E-801':'2026-09-27T07:00:00.000Z','E-802':'2026-09-27T07:00:00.000Z','E-803':'2026-09-27T07:00:00.000Z','E-804':'2026-09-27T08:00:00.000Z'}));
localStorage.setItem('eb-view','dich');
