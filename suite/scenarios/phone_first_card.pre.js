// 0.4.0 -- on a phone (390 x 844) little stands above the first card. A book like a real one without a release: 19 open
// cards without a target, six of them with a deadline (a plain date, two within three days), Hinweise, cards to check.
// The first card under "Für Dich" stands no lower than 440 px (0.3.0: 588), with two lanes ("Ziel offen", "später") 500 px
// (0.3.0: 624), and the overdue card comes first. The waiting button stays one line ("· 2 bald fällig"); the order field
// waits behind "+ Auftrag" beside the search, opens with a tap, and stays open while it holds a draft.
const S=__DB.store;S.set('meta/stand',{aktuell:''});
const p=x=>String(x).padStart(2,'0'),day=n=>{const d=new Date();d.setDate(d.getDate()+n);return d.getFullYear()+'-'+p(d.getMonth()+1)+'-'+p(d.getDate())};
const F={901:-1,903:1,905:4,907:6,909:9,911:12};
for(let i=901;i<=919;i++)S.set('entscheidungen/E-'+i,{ueberschrift:'Karte '+i+': Soll es so gemacht werden, wie vorgeschlagen?',beschreibung:'Text',option1:'Eins',option2:'Zwei',empfehlung:'Option 1. Weil.',
  blatt:'offen',ziel:'',von:'Eigner',wartet:'Dich',frist:F[i]!=null?day(F[i]):undefined,kommentare:[],verlauf:[],geaendert:'2026-09-'+p(i-900)+'T08:00:00.000Z'});
for(let i=921;i<=923;i++)S.set('entscheidungen/E-'+i,{ueberschrift:'Hinweis '+i,art:'hinweis',beschreibung:'Text',blatt:'offen',ziel:'',wartet:'Dich',kommentare:[],verlauf:[]});
// under "Prüfen" the card with a deadline stands first although the other one changed last
for(let i=931;i<=932;i++)S.set('entscheidungen/E-'+i,{ueberschrift:'Geprüft '+i,beschreibung:'Text',blatt:'pruefen',ziel:'',wartet:'Dich',tokens_prognose:1,tokens_ist:1,frist:i===931?day(8):undefined,kommentare:[],verlauf:[],geaendert:'2026-09-0'+(i-930)+'T08:00:00.000Z'});
for(let i=941;i<=945;i++)S.set('entscheidungen/E-'+i,{ueberschrift:'Vorrat '+i,beschreibung:'Text',blatt:'vorrat',ziel:'später',kommentare:[],verlauf:[]});
localStorage.setItem('eb-view','dich');
