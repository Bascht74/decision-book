// follow-up: cards that already stand in "Prüfen" when the page is updated: my newest message (comment or step) is newer
// than the owner's last own act -> open with it unfolded, whatever v101's "eb-kseen" seed says; older -> as he left it.
const S=__DB.store;S.set('meta/stand',{aktuell:'3.0.0b28'});
const base={blatt:'pruefen',status:'umgesetzt',ziel:'3.0.0b28',von:'Eigner',wartet:'Dich',tokens_prognose:1,tokens_ist:1};
const his={von:'Eigner',text:'Bitte umsetzen',zeit:'2026-09-27T07:10:00.000Z'};
S.set('entscheidungen/E-811',Object.assign({ueberschrift:'Prüfen mit neuer Nachricht',kommentare:[his,{von:'Claude',text:'Umgesetzt, bitte prüfen',zeit:'2026-09-27T08:00:00.000Z'}]},base));
S.set('entscheidungen/E-812',Object.assign({ueberschrift:'Er hat danach geschrieben',kommentare:[{von:'Claude',text:'Umgesetzt',zeit:'2026-09-27T08:00:00.000Z'},{von:'Eigner',text:'Schaue ich mir an',zeit:'2026-09-27T08:30:00.000Z'}]},base));
S.set('entscheidungen/E-813',Object.assign({ueberschrift:'Neuer Zwischenstand',eigner_am:'2026-09-27T07:00:00.000Z',kommentare:[his],verlauf:[{zeit:'2026-09-27T08:10:00.000Z',text:'Stand: fertig gebaut'}]},base));
S.set('entscheidungen/E-814',Object.assign({ueberschrift:'Er hat zurückgegeben',zurueck:'2026-09-27T09:00:00.000Z',kommentare:[his,{von:'Claude',text:'Alt umgesetzt',zeit:'2026-09-27T08:00:00.000Z'}]},base));
localStorage.setItem('eb-open',JSON.stringify([['E-811:pruefen',false],['E-812:pruefen',false],['E-813:pruefen',false],['E-814:pruefen',false]]));
localStorage.setItem('eb-draft:kz:E-811','0');localStorage.setItem('eb-draft:kz:E-813','0');
// v101 seeded this at its first snapshot with what stood then
localStorage.setItem('eb-kseen',JSON.stringify({'E-811':'2026-09-27T08:00:00.000Z','E-812':'2026-09-27T08:00:00.000Z','E-814':'2026-09-27T08:00:00.000Z'}));
localStorage.setItem('eb-view','dich');
