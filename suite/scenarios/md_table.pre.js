// a Markdown report in a card comment, a talk and a card section renders as heading, table, lists, bold and code.
const S=__DB.store;S.set('meta/stand',{aktuell:'3.0.0b28'});
const REP=['## Die Stichprobe','','„Stränge“ = Aufträge, die die Kartennummer nennen. Das ist *eine obere Grenze*, siehe `price.py`.','',
 '| Karte | Schätzung | auf Karte | in Strängen gefunden | fehlt / zu viel | Urteil |','|---|---|---:|---|---|---|',
 '| E-901 Beispiel eins | 12 Mio. | 763 839 | 2,71 Mio. (Plan, A1–A4) | es fehlen 8 Stränge | **zu niedrig**, Faktor 3,5 |',
 '| E-902 Beispiel zwei | 6 Mio. | 236 016 | 236 016 + 178 615 | es fehlt die Nacharbeit | **zu niedrig** (+76 %) |',
 '| E-903 Beispiel drei | 80 000 | 20 000 | Anteil am Strang | Hauptsitzung ≤ 45 000 | **geschätzt** |','',
 '- erster Punkt','- zweiter **Punkt** https://example.org/a','','1. eins','2. zwei'].join('\n');
S.set('entscheidungen/E-701',{ueberschrift:'Karte mit Bericht',blatt:'offen',status:'offen',ziel:'3.0.0b28',von:'Claude',wartet:'Dich',
  beschreibung:'# Worum\nText mit **fett**.\n\n| a | b |\n|---|---|\n| 1 | 2 |',
  kommentare:[{von:'Claude',text:'## Kopf der ersten\n**fett** und | Zelle |',zeit:'2026-09-27T06:00:00.000Z'},{von:'Claude',text:REP,zeit:'2026-09-27T07:00:00.000Z'}]});
S.set('gespraech/g1',{start:'2026-09-27T07:00:00.000Z',status:'offen',nachrichten:[{von:'Claude',text:'### Kurz\n| x | y |\n|:-:|--:|\n| **1** | `2` |',zeit:'2026-09-27T07:01:00.000Z'}]});
localStorage.setItem('eb-view','fuerdich');
