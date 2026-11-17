// 0.4.0 -- on a phone the one-tap answers are written only, without the live comment (the Claude app closes the book when
// one goes out): no send, the message carries live:false, and taking it back sends nothing either. The order field under
// "Für Dich" goes the same way and says so; under "Aufträge" the same field still goes live.
window.matchMedia=q=>({matches:/coarse/.test(q),addEventListener(){},removeEventListener(){},addListener(){},removeListener(){}});
const S=__DB.store;S.set('meta/stand',{aktuell:'3.0.0b28'});S.set('meta/einstellungen',{buch_url:'https://example.org/buch'});
S.set('entscheidungen/E-621',{ueberschrift:'Am Handy',beschreibung:'Text',option1:'Eins',option2:'Zwei',empfehlung:'Option 1',blatt:'offen',ziel:'3.0.0b28',von:'Eigner',wartet:'Dich',kommentare:[],verlauf:[]});
S.set('entscheidungen/E-622',{ueberschrift:'Hinweis am Handy',art:'hinweis',beschreibung:'Text',blatt:'offen',ziel:'3.0.0b28',wartet:'Dich',kommentare:[],verlauf:[]});
localStorage.setItem('eb-view','dich');
