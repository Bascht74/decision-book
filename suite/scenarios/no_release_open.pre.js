// 0.4.0 -- the tab "Releases" of a book without releases goes only once the viewer has left it: a view that is open
// (remembered from before) stays reachable and is not taken away under him.
const S=__DB.store;S.set('meta/stand',{aktuell:''});
S.set('entscheidungen/E-705',{ueberschrift:'Karte',blatt:'offen',ziel:'später',von:'Eigner',kommentare:[],verlauf:[]});
localStorage.setItem('eb-view','releases');
