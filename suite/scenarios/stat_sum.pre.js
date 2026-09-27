// "Zeit, Umfang und Aufwand": the token columns "Tokens gesamt", "davon auf Karten", "davon von Claude geschrieben",
// "Meiner Empfehlung gefolgt" with a percentage, and a row "Gesamt" on top over the releases shown (sort leaves it on top,
// the filters change its sums and never hide it; Codezeilen: the newest release's). Synthetic numbers, roles only.
window.__SYNC=true;const S=__DB.store;S.set('meta/stand',{aktuell:'3.0.0b28'});
S.set('statistik/b27',{version:'3.0.0b27',ordnung:27,commits:10,geaenderte_zeilen:1000,codezeilen:50000,tokens_neu:20000000,tokens_ausgabe:2000000,zyklus_std:24});
S.set('statistik/b26',{version:'3.0.0b26',ordnung:26,commits:5,geaenderte_zeilen:500,codezeilen:48000,tokens_neu:10000000,tokens_ausgabe:1000000,zyklus_std:48});
S.set('statistik/b25',{version:'3.0.0b25',ordnung:25,commits:1,codezeilen:47000,zyklus_std:12});
const c=(nr,z,e,a,t)=>S.set('entscheidungen/'+nr,{ueberschrift:'Karte '+nr,blatt:'erledigt',ziel:z,empfehlung:e,entscheidung:a,tokens_prognose:1,tokens_ist:t});
c('E-901','3.0.0b27','Option 1','Option 1',3000000);c('E-902','3.0.0b27','Option 1','Option 2',1000000);c('E-903','3.0.0b26','Option 2','2',500000);
localStorage.setItem('eb-view','statistik');localStorage.setItem('eb-stat','zeit');
