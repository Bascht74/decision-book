// "Frühere" is a table: Datum/Zeit, Art, Anfang des Texts, Karte; sortable heads, an "Art" filter, a count line,
// and a click on a row opens the talk or order right below it (messages and pictures as before).
const S=__DB.store;S.set('meta/stand',{aktuell:'3.0.0b28'});
seed(3);
const png='data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVR42mNk+M9QDwADhgGAWjR9awAAAABJRU5ErkJggg==';
S.set('gespraech/g1',{start:'2026-09-27T07:00:00.000Z',status:'gelesen',thread:'t0',titel:'Titel des Gesprächs',nachrichten:[{von:'Eigner',text:'Erste Zeile eins',zeit:'2026-09-27T07:00:00.000Z',bilder:[png]},{von:'Claude',text:'Antwort von Claude',zeit:'2026-09-27T07:01:00.000Z'}]});
S.set('gespraech/g2',{start:'2026-09-27T09:10:00.000Z',status:'gelesen',thread:'t1',karte:'E-002',nachrichten:[{von:'Eigner',text:'Beta Frage',zeit:'2026-09-27T09:10:00.000Z'}]});
S.set('auftraege/a1',{text:'Alpha Auftrag alt',zeit:'2026-09-26T07:00:00.000Z',status:'übernommen',antwort:'Antwort auf Alpha'});
S.set('auftraege/a2',{text:'Zulu Auftrag',zeit:'2026-09-27T08:00:00.000Z',status:'übernommen',karte:'E-001'});
localStorage.setItem('eb-view','sitzung');
