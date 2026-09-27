// "Verworfen" is a Stand of its own. Under "Erledigt" the rejected cards stand below the done ones in a group
// that starts shut and keeps its toggle for the session; in "Releases" they form a shut group "Verworfen" whose cards
// cannot be moved and count nothing to "fertig". The "Erledigt" count stays the done cards.
const S=__DB.store;S.set('meta/stand',{aktuell:'3.0.0b28'});
const C=(n,blatt,x)=>S.set('entscheidungen/E-'+n,Object.assign({ueberschrift:'Karte '+n,beschreibung:'Text '+n,blatt,ziel:'3.0.0b28',von:'Claude',kommentare:[],verlauf:[],geaendert:'2026-09-20T08:00:00.000Z'},x||{}));
C('301','erledigt',{tokens_prognose:10000,tokens_ist:10000,geaendert:'2026-09-21T08:00:00.000Z'});
C('302','verworfen',{geaendert:'2026-09-22T08:00:00.000Z'});
C('303','verworfen',{geaendert:'2026-09-23T08:00:00.000Z',status:'verworfen'});
C('304','offen');
localStorage.setItem('eb-view','archiv');
