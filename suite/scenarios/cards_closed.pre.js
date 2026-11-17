// 0.4.0 -- every card starts closed, in every column: the head shows number, project, Stand, headline and deadline. A tap
// on the head opens it and closes it again; what this viewer opened is remembered and stands open at the next load. A
// card that comes in new stays closed, also when it carries a message of Claude's.
const S=__DB.store;S.set('meta/stand',{aktuell:'3.0.0b28'});
const C=(n,blatt,x)=>S.set('entscheidungen/E-'+n,Object.assign({ueberschrift:'Karte '+n,beschreibung:'Text '+n,option1:'Eins',option2:'Zwei',empfehlung:'Option 1',blatt,ziel:'3.0.0b28',von:'Eigner',wartet:'Dich',
  kommentare:[{von:'Claude',text:'Vorlage',zeit:'2026-09-27T07:00:00.000Z'}],verlauf:[{zeit:'2026-09-27T07:05:00.000Z',text:'Schritt'}],geaendert:'2026-09-27T07:05:00.000Z'},x||{}));
C('641','offen',{projekt:'Haus',frist:'2030-01-15T17:00:00Z'});C('642','offen');C('643','pruefen',{tokens_prognose:1,tokens_ist:1});
C('644','offen',{art:'hinweis'});C('645','offen',{art:'aufgabe'});C('646','arbeit',{wartet:''});C('647','entschieden',{wartet:''});
// remembered from an earlier visit: this viewer had opened one card
localStorage.setItem('eb-klapp',JSON.stringify([['E-642:offen',true]]));
localStorage.setItem('eb-view','dich');
