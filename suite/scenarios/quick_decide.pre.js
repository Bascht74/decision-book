// 0.4.0 -- a decision under "Offen" is answered with one tap: "Wie empfohlen" (it names the option the recommendation
// starts with), a button per option, "Später", "Erklär es einfacher". The tap goes live to Claude and writes the card once,
// keeping what another writer added meanwhile; a line apart from the cards says what was sent. A closed card shows none
// of the buttons, and a card that is not under "Offen" has none.
const S=__DB.store;S.set('meta/stand',{aktuell:'3.0.0b28'});
const C=(n,x)=>S.set('entscheidungen/E-'+n,Object.assign({ueberschrift:'Karte '+n,beschreibung:'Worum es geht',blatt:'offen',ziel:'3.0.0b28',von:'Eigner',wartet:'Dich',status:'offen',art:'entscheidung',
  kommentare:[{von:'Claude',text:'Vorlage',zeit:'2026-09-27T07:00:00.000Z'}],verlauf:[],geaendert:'2026-09-20T08:00:00.000Z'},x||{}));
C('601',{option1:'Eins',option2:'Zwei',empfehlung:'Option 2. Weil es kürzer ist.'});
C('602',{option1:'Eins',option2:'Zwei'});                          // no recommendation
C('603',{option1:'Nur eine',empfehlung:'Lieber so, ohne Nummer'}); // a recommendation that names no option
C('604',{option1:'Eins',option2:'Zwei',empfehlung:'Option 1',blatt:'arbeit',wartet:''});
C('605',{option1:'Eins',option2:'Zwei',empfehlung:'Option 1'});
// while the first answer is on its way, Claude writes to the same card
let first=true;window.__ON_SEND=()=>{if(!first)return;first=false;const c=S.get('entscheidungen/E-601');__DB.external('entscheidungen/E-601',{kommentare:[...c.kommentare,{von:'Claude',text:'Zwischenfrage',zeit:'2026-09-27T07:30:00.000Z'}]})};
localStorage.setItem('eb-view','dich');
