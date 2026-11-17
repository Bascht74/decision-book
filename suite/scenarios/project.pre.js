// 0.4.0 -- "projekt" on a card: a coloured pill after the number, and a filter "Projekt:" (only while a card carries one)
// with "alle Projekte", a button per project with the number of its cards under "Für Dich", and "ohne Projekt". A button
// shows only its project in every view; the same button again, or "alle Projekte", shows all. The choice is remembered.
document.documentElement.setAttribute('data-theme','light');
window.__SYNC=true;const S=__DB.store;S.set('meta/stand',{aktuell:'3.0.0b28'});
const C=(n,blatt,projekt,x)=>S.set('entscheidungen/E-'+n,Object.assign({ueberschrift:'Karte '+n,beschreibung:'Text',blatt,ziel:'3.0.0b28',von:'Eigner',kommentare:[],verlauf:[],geaendert:'2026-09-20T08:0'+n.slice(-1)+':00.000Z'},projekt?{projekt}:{},x||{}));
C('661','offen','Haus');C('662','offen','Funk');C('663','offen','');C('664','offen','Haus',{art:'aufgabe'});
C('665','pruefen','Funk',{tokens_prognose:1,tokens_ist:1});C('666','arbeit','Haus');C('667','vorrat','Garten');C('668','erledigt','Funk',{tokens_prognose:1,tokens_ist:1});
localStorage.setItem('eb-view','dich');
