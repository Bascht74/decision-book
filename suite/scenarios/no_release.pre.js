// 0.4.0 -- a book without releases (meta/stand.aktuell empty): no release card, no tab "Releases", no chips "Release:" and
// no lane head while there is nothing to choose, no "für <Release>" in the waiting button. With a second target the chips
// and the lane heads are there; a lane folded earlier keeps its head (its cards could not be reached otherwise). Once a
// release is current, or a card has a release as its target, the tab is back.
const S=__DB.store;S.set('meta/stand',{aktuell:''});
const C=(n,blatt,x)=>S.set('entscheidungen/E-'+n,Object.assign({ueberschrift:'Karte '+n,beschreibung:'Text',blatt,ziel:'',von:'Eigner',kommentare:[],verlauf:[],geaendert:'2026-09-20T08:0'+n.slice(-1)+':00.000Z'},x||{}));
C('701','offen');C('702','offen');C('703','offen',{art:'hinweis'});C('704','vorrat');
localStorage.setItem('eb-view','dich');
