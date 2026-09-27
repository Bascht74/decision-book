// per release, how often the recommendation was the owner's answer ("n von m"); only cards where both name an option count.
window.__SYNC=true;const S=__DB.store;S.set('meta/stand',{aktuell:'3.0.0b28'});
S.set('statistik/b27',{version:'3.0.0b27',ordnung:27});S.set('statistik/b26',{version:'3.0.0b26',ordnung:26});
const c=(nr,z,e,a)=>S.set('entscheidungen/'+nr,{ueberschrift:'Karte '+nr,blatt:'erledigt',ziel:z,empfehlung:e,entscheidung:a,tokens_prognose:1,tokens_ist:1});
c('E-801','3.0.0b27','Option 1 – weil kürzer','Option 1');
c('E-802','3.0.0b27','Option 2','2');
c('E-803','3.0.0b27','a) kurz','Option A, bitte');
c('E-804','3.0.0b27','Option 1','Option 2');
c('E-805','3.0.0b27','Option 1','Ja');
c('E-806','3.0.0b27','Eher nicht','Option 1');
c('E-807','3.0.0b27','Option 1','E-512 zuerst');
localStorage.setItem('eb-view','statistik');localStorage.setItem('eb-stat','zeit');
