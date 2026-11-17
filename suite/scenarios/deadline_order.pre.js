// 0.4.0 -- cards with a deadline stand on top of the owner's columns ("Offen", "Prüfen", "Hinweise & Aufgaben"), the nearest
// first (a passed one before all), then the others by their last change as before -- the newest numbers no longer push a
// deadline down. "Entschieden" keeps the owner's own order. The button "warten auf Dich" names the deadlines of the next
// three days.
window.__SYNC=true;const S=__DB.store;S.set('meta/stand',{aktuell:'3.0.0b28'});
const p=x=>String(x).padStart(2,'0'),day=n=>{const d=new Date();d.setDate(d.getDate()+n);return d.getFullYear()+'-'+p(d.getMonth()+1)+'-'+p(d.getDate())};
const C=(n,x)=>S.set('entscheidungen/E-'+n,Object.assign({ueberschrift:'Karte '+n,blatt:'offen',ziel:'3.0.0b28',von:'Eigner',kommentare:[],verlauf:[],geaendert:'2026-09-2'+n.slice(-1)+'T08:00:00.000Z'},x||{}));
// "Offen": the cards changed last carry no deadline
C('731',{frist:day(9)});C('732',{frist:day(2)});C('733',{frist:day(-1)});C('734');C('735');C('736',{frist:day(2)+'T08:00:00'});
// "Hinweise & Aufgaben"
C('741',{art:'aufgabe',frist:day(5)});C('742',{art:'hinweis'});C('743',{art:'aufgabe',frist:day(1)});
// "Prüfen": E-751 changed last and carries no deadline
C('751',{blatt:'pruefen',tokens_prognose:1,tokens_ist:1,geaendert:'2026-09-29T08:00:00.000Z'});C('752',{blatt:'pruefen',tokens_prognose:1,tokens_ist:1,frist:day(3)});
// "Entschieden": the owner's order, a deadline or not
C('761',{blatt:'entschieden',rang:1});C('762',{blatt:'entschieden',rang:2,frist:day(1)});
localStorage.setItem('eb-view','dich');
