// At 320 px (the width WCAG asks a page to reflow to) nothing runs over the right edge, a long word in a headline
// included; the run line of a step stands under its name, step pills are as high as their text, no head of the releases
// table runs into its neighbour, the column tabs keep their text, and the dialog's close button stays on one line.
document.documentElement.setAttribute('data-theme','light');
seed(40);const S=__DB.store;S.set('meta/stand',{aktuell:'3.0.0b28',wartet_auf_start:true});
S.set('gespraech/g1',{start:'2026-09-27T07:00:00.000Z',status:'offen',wartet:'',nachrichten:[{von:'Claude',text:'Antwort',zeit:'2026-09-27T07:01:00.000Z'}]});
S.set('auftraege/a1',{text:'Neu',zeit:'2026-09-27T08:00:00.000Z',status:'neu',bilder:[]});
S.set('entscheidungen/E-800',{ueberschrift:'Mit Verlauf',blatt:'offen',ziel:'3.0.0b28',wartet:'Dich',abweichung:'anders gebaut',frist:'2026-12-01T10:00:00.000Z',haengt_an:'E-010',verlauf:[{zeit:'2026-09-27T08:00:00.000Z',text:'Schritt'}]});
S.set('meta/schritte',{release:'3.0.0b28',schritte:{"2":{zustand:"erledigt"},"3":{zustand:"erledigt",text:"alle Texte übersetzt"},"4":{zustand:"läuft",text:"zählt gerade",teile:[{name:"Karten",zustand:"erledigt"},{name:"Aufträge",zustand:"läuft"},{name:"Bilder",zustand:"offen"}]}}});
S.set('meta/laeufe',{laeufe:[{name:'tests.yml auf dem Zweig runde-b28',url:'https://example.org/actions/runs/9',status:'läuft',gestartet:'2026-09-27T08:00:00.000Z'}]});
S.set('entscheidungen/E-801',{ueberschrift:'Pfad /Volumes/beispiel/Dokumente/Projekt/development/ein_sehr_langer_dateiname.json',blatt:'offen',ziel:'3.0.0b28',wartet:'Dich'});
localStorage.setItem('eb-view','dich');localStorage.setItem('eb-open',JSON.stringify([['E-800:offen',true]]));
