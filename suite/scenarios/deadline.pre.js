// "frist" + "ersatz" on open cards: "Frist: <day> <time> – <what is left> · sonst: …" before, "… – überfällig · ich nehme: …"
// after. Since 0.4.0 a plain date ("2026-11-19") holds until the end of that day here and shows no time, and what is left
// counts in calendar days: "heute", "morgen", "noch n Tage". The mark is red on its day and after it. Nothing is written.
// (The times are built from today's date; in the last minute before midnight "heute 23:59" would already be over.)
window.__SYNC=true;const S=__DB.store;S.set('meta/stand',{aktuell:'3.0.0b28'});
const p=x=>String(x).padStart(2,'0');
const day=n=>{const d=new Date();d.setDate(d.getDate()+n);return d.getFullYear()+'-'+p(d.getMonth()+1)+'-'+p(d.getDate())};
const at=(n,h,m)=>{const d=new Date();d.setDate(d.getDate()+n);d.setHours(h,m,0,0);return d.toISOString()};
const C=(n,x)=>S.set('entscheidungen/E-'+n,Object.assign({ueberschrift:'Karte '+n,blatt:'offen',ziel:'3.0.0b28'},x||{}));
C('721',{frist:at(0,23,59),ersatz:'Option 1'});                        // today, with a time
C('722',{frist:new Date(Date.now()-3600e3).toISOString(),ersatz:'Option 2'}); // an hour ago
C('723');                                                               // no deadline
C('724',{frist:day(0)});C('725',{frist:day(-1)});C('726',{frist:day(1)}); // plain dates: today, yesterday, tomorrow
C('727',{frist:at(2,0,1)});                                             // the day after tomorrow, one minute past midnight
C('728',{frist:day(10)});
localStorage.setItem('eb-view','dich');
