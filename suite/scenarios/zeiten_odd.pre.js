// Zeiten with odd data: markup in names and notes stays text; missing or strange fields give empty cells, no error.
localStorage.setItem("eb-view","zeiten");
const S=__DB.store;
S.set("zeiten/2026-11-12",{datum:"2026-11-12",spalten:[{key:"a",name:"<b>fett</b>",gruppe:"<i>G</i>"},{key:"b"},{name:"ohne Schlüssel"},"kaputt"],slots:[{ab:"08:00",n:{a:"3",b:"x"},stand:"<u>?</u>",h:{a:"0,5"}},null,{ab:"zz",stand:"pause"},{}],stunden:{a:1.5,b:"viel"}});
S.set("zeiten/schief",{datum:"<img src=x onerror=\"window.PWN=1\">"});
S.set("zeiten/2026-11-14",{});
S.set("meta/zeiten",{satz:"80",einheit:"<b>€</b>",hinweis:"<img src=x onerror=\"window.PWN=1\"> Text",aktualisiert:"kein Datum"});
