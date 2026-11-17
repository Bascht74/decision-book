// 0.4.0 -- without the browser's storage (a private window, blocked site data: every access throws) the page works all the
// same: the cards stand closed, a tap opens and closes them, an answer with one tap goes out. Only nothing is remembered.
const S=__DB.store;S.set('meta/stand',{aktuell:'3.0.0b28'});
S.set('entscheidungen/E-651',{ueberschrift:'Ohne Speicher',beschreibung:'Text',option1:'Eins',option2:'Zwei',empfehlung:'Option 1',projekt:'Haus',blatt:'offen',ziel:'3.0.0b28',von:'Eigner',wartet:'Dich',kommentare:[],verlauf:[]});
S.set('entscheidungen/E-652',{ueberschrift:'Zweite',beschreibung:'Text',projekt:'Funk',blatt:'offen',ziel:'3.0.0b28',von:'Eigner',wartet:'Dich',kommentare:[],verlauf:[]});
const no=()=>{throw new DOMException('blocked','SecurityError')};
for(const k of ['getItem','setItem','removeItem','clear','key'])Storage.prototype[k]=no;
Object.defineProperty(Storage.prototype,'length',{configurable:true,get:no});
