// 0.4.0 -- deadlines first across the lanes of a target: under "Offen" and "Prüfen" with more than one lane, the cards
// with a deadline stand together on top ("Mit Frist", the nearest first), whatever their target; the lanes below hold the
// rest. A lane that only had deadline cards has no head left. An overdue card without a target no longer stands below
// the cards of the lane "später".
window.__SYNC=true;const S=__DB.store;S.set('meta/stand',{aktuell:''});
const p=x=>String(x).padStart(2,'0'),day=n=>{const d=new Date();d.setDate(d.getDate()+n);return d.getFullYear()+'-'+p(d.getMonth()+1)+'-'+p(d.getDate())};
const C=(n,x)=>S.set('entscheidungen/E-'+n,Object.assign({ueberschrift:'Karte '+n,blatt:'offen',ziel:'',von:'Eigner',wartet:'Dich',kommentare:[],verlauf:[],geaendert:'2026-09-2'+n.slice(-1)+'T08:00:00.000Z'},x||{}));
C('901',{frist:day(-1)});C('902');C('903',{ziel:'später',frist:day(5)});C('904',{ziel:'später'});C('905',{ziel:'später'});C('906',{ziel:'3.0.0b30',frist:day(2)});
C('911',{blatt:'pruefen',ziel:'später',tokens_prognose:1,tokens_ist:1});C('912',{blatt:'pruefen',tokens_prognose:1,tokens_ist:1,frist:day(1)});
localStorage.setItem('eb-view','dich');
