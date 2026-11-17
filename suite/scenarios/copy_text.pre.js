// 0.4.0 -- "kopiertext" on a card: a box "Zum Weitergeben" right after "Worum es geht", the text plain in a field that only
// reads (stars and backticks stay as written); going into the field marks all of it; "Kopieren" puts it on the clipboard,
// and where the browser refuses, the text stays marked and the line says so. A card without the field has no box. The
// clipboard is a stand-in here (headless Chrome has none).
const S=__DB.store;S.set('meta/stand',{aktuell:'3.0.0b28'});
const T='Guten Tag,\n\nbitte senden Sie mir das *Angebot* bis `Freitag`.\n\nViele Grüße';
S.set('entscheidungen/E-691',{ueberschrift:'Mit Text',beschreibung:'**Was Du tust:** Text weitergeben.',art:'aufgabe',projekt:'Haus',kopiertext:T,blatt:'offen',ziel:'3.0.0b28',kommentare:[],verlauf:[]});
S.set('entscheidungen/E-692',{ueberschrift:'Ohne Text',beschreibung:'Nur lesen',art:'aufgabe',blatt:'offen',ziel:'3.0.0b28',kommentare:[],verlauf:[]});
window.COPIED=[];window.CLIP_OK=true;
Object.defineProperty(navigator,'clipboard',{configurable:true,value:{writeText:async t=>{if(!window.CLIP_OK)throw new DOMException('denied','NotAllowedError');window.COPIED.push(t)}}});
localStorage.setItem('eb-view','dich');
