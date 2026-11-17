// 0.4.0 -- the project filter is kept per viewer ("eb-proj"): at the next load the book shows that project again, and the
// button "warten auf Dich" counts what is shown. A remembered project that no card carries any more hides nothing. A book
// whose cards carry no project has no filter group and no pills.
window.__SYNC=true;const S=__DB.store;S.set('meta/stand',{aktuell:'3.0.0b28'});
const C=(n,projekt)=>S.set('entscheidungen/E-'+n,Object.assign({ueberschrift:'Karte '+n,blatt:'offen',ziel:'3.0.0b28',von:'Eigner',kommentare:[],verlauf:[]},projekt?{projekt}:{}));
C('671','Haus');C('672','Funk');C('673','');
localStorage.setItem('eb-proj','Funk');localStorage.setItem('eb-view','dich');
