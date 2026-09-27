// a wide Markdown table on a 390 px phone scrolls inside its own box; the page does not scroll sideways.
const S=__DB.store;S.set('meta/stand',{aktuell:'3.0.0b28'});
const row=i=>'| E-9'+i+'0 eine lange Überschrift der Beispielkarte | '+(i*1000)+' | ein_sehr_langer_dateiname_ohne_leerzeichen_'+i+'.html | noch eine recht lange Spalte mit Text | **Urteil** |';
const T=['## Tabelle','| Karte | Zahl | Datei | Spalte | Urteil |','|---|---:|---|---|---|',row(1),row(2),row(3)].join('\n');
S.set('entscheidungen/E-701',{ueberschrift:'Karte',blatt:'offen',status:'offen',ziel:'3.0.0b28',von:'Claude',wartet:'Dich',beschreibung:T,
  kommentare:[{von:'Claude',text:T,zeit:'2026-09-27T07:00:00.000Z'}]});
S.set('gespraech/g1',{start:'2026-09-27T07:00:00.000Z',status:'offen',nachrichten:[{von:'Claude',text:T,zeit:'2026-09-27T07:01:00.000Z'}]});
localStorage.setItem('eb-view','fuerdich');
