// The small parts at 1300 px (light): filter fields in table heads are 28 px, a dependency pill and a card link in a
// table row are 24 px targets (the row no higher than one without a link), a kind label is as high as the stand chip
// beside it and "Auftrag" is a pill like the others, an opened row keeps off the table's edge, "Erledigt" takes the
// board's width, the gear is drawn large enough to read, and unselected tabs and group labels are in the tabs' grey.
document.documentElement.setAttribute('data-theme','light');
seed(40);const S=__DB.store;S.set('meta/stand',{aktuell:'3.0.0b28'});
S.set('entscheidungen/E-810',{ueberschrift:'Aus einem Auftrag',blatt:'entschieden',rang:1,ziel:'3.0.0b28',von:'Claude',status:'offen',art:'auftrag',verlauf:[],kommentare:[],geaendert:'2026-09-20T08:00:00.000Z'});
S.set('entscheidungen/E-811',{ueberschrift:'Hängt an einer anderen',blatt:'offen',ziel:'3.0.0b28',von:'Claude',status:'offen',haengt_an:'E-010',verlauf:[],kommentare:[],geaendert:'2026-09-20T08:00:00.000Z'});
S.set('auftraege/a1',{text:'Übernommen, mit Karte',zeit:'2026-09-27T08:00:00.000Z',status:'übernommen',karte:'E-810',bilder:[]});
S.set('auftraege/a2',{text:'Übernommen, ohne Karte',zeit:'2026-09-27T07:00:00.000Z',status:'übernommen',antwort:'Erledigt',bilder:[]});
localStorage.setItem('eb-view','dich');
