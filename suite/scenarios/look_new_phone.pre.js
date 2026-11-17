// 0.4.0 -- the new parts at 390 px, light: the project pill, the deadline marks, the answer row, the box "Zum Weitergeben",
// the "?" of a column's explanation, the order field under "Für Dich" and the undo line read 4.5:1 on their ground, and
// nothing runs over the window's edge. A book without a release: the first card stands close under the order field.
window.WANT='light';document.documentElement.setAttribute('data-theme','light');
const S=__DB.store;S.set('meta/stand',{aktuell:''});
const p=x=>String(x).padStart(2,'0'),day=n=>{const d=new Date();d.setDate(d.getDate()+n);return d.getFullYear()+'-'+p(d.getMonth()+1)+'-'+p(d.getDate())};
S.set('entscheidungen/E-801',{ueberschrift:'Haus: Soll das Angebot mit einer recht langen Überschrift angenommen werden?',beschreibung:'Du entscheidest: Angebot annehmen oder nicht.',option1:'Annehmen',option2:'Ablehnen',empfehlung:'Option 1. Weil es passt.',projekt:'Haus',frist:day(2),ersatz:'Option 1',blatt:'offen',ziel:'',von:'Eigner',wartet:'Dich',kommentare:[],verlauf:[]});
S.set('entscheidungen/E-802',{ueberschrift:'Funk: Brief weitergeben',art:'aufgabe',beschreibung:'**Was Du tust:** den Text weitergeben.',kopiertext:'Guten Tag,\n\nbitte senden Sie mir das Angebot mit einer sehr langen Zeile ohne Umbruch bis Freitag.\n\nViele Grüße',projekt:'Funk',frist:day(-1),blatt:'offen',ziel:'',wartet:'Dich',kommentare:[],verlauf:[]});
S.set('entscheidungen/E-803',{ueberschrift:'Garten: Zur Kenntnis',art:'hinweis',beschreibung:'Zur Kenntnis: erledigt.',projekt:'Garten',blatt:'offen',ziel:'',wartet:'Dich',kommentare:[],verlauf:[]});
localStorage.setItem('eb-view','dich');
