// "Erledigt" is a table, newest change first; a click on a column head sorts by it, a second click the other way; a click on a row opens the card right below it.
seed(120);localStorage.setItem('eb-view','archiv');
// change times that run against the numbers: a higher number changed earlier (minutes apart)
for(let i=1;i<=120;i++){const p='entscheidungen/E-'+String(i).padStart(3,'0');const d=__DB.store.get(p);d.geaendert=new Date(Date.UTC(2026,8,25,12,0)-i*60000).toISOString();d.kommentare=[];d.verlauf=[]}
