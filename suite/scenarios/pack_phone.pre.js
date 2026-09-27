// at 390 px the section "Archiv", its question and its result stay inside the screen; the answers are at least 32 px tall.
// synthetic fixture (roles "Eigner" and "Claude" only) for "Archiv packen": b27 is published and closed, b26 is
// packed already, b25 is published but has an open card, 1.0.0-beta is published without anything in it, b28 is current.
const S=__DB.store;S.set("meta/stand",{aktuell:"3.0.0b28"});
const card=(n,blatt,ziel,extra)=>Object.assign({ueberschrift:"Karte "+n,beschreibung:"Text "+n,option1:"Eins",option2:"Zwei",empfehlung:"Option 1",entscheidung:"Option 1",blatt,ziel,von:"Claude",art:"entscheidung",tokens_prognose:100000,tokens_ist:90000,kommentare:[{von:"Claude",text:"Antwort "+n,zeit:"2026-09-22T08:00:00.000Z"}],verlauf:[{zeit:"2026-09-22T08:00:00.000Z",text:"Schritt"}],geaendert:"2026-09-22T08:00:00.000Z"},extra||{});
S.set("entscheidungen/E-010",card(10,"erledigt","3.0.0b27",{beschreibung:"Text mit dem Zauberwort"}));
S.set("entscheidungen/E-011",card(11,"erledigt","3.0.0b27",{art:"aufgabe",tokens_prognose:50000,tokens_ist:80000,empfehlung:"Option 2",entscheidung:"Option 2"}));
S.set("entscheidungen/E-012",card(12,"verworfen","3.0.0b27",{tokens_prognose:20000,tokens_ist:null}));
S.set("entscheidungen/E-020",card(20,"erledigt","Buch"));S.set("entscheidungen/E-021",card(21,"erledigt","später"));S.set("entscheidungen/E-022",card(22,"erledigt",""));
S.set("entscheidungen/E-030",card(30,"offen","3.0.0b28",{entscheidung:""}));S.set("entscheidungen/E-031",card(31,"erledigt","3.0.0b28"));
S.set("entscheidungen/E-040",card(40,"offen","3.0.0b25",{entscheidung:""}));
S.set("auftraege/a1",{text:"Auftrag in b27",zeit:"2026-09-22T09:00:00.000Z",status:"übernommen",karte:"E-010"});
S.set("auftraege/a2",{text:"Auftrag in b27, noch nicht gelesen",zeit:"2026-09-23T09:00:00.000Z",status:"neu"});
S.set("auftraege/a3",{text:"Auftrag in b28",zeit:"2026-09-27T09:00:00.000Z",status:"übernommen",karte:"E-031"});
S.set("auftraege/a4",{text:"Auftrag in b26",zeit:"2026-09-19T09:00:00.000Z",status:"übernommen",karte:"E-005"});
S.set("gespraech/g1",{start:"2026-09-24T08:00:00.000Z",status:"gelesen",wartet:"",nachrichten:[{von:"Eigner",text:"Frage in b27",zeit:"2026-09-24T08:00:00.000Z"},{von:"Claude",text:"Antwort in b27",zeit:"2026-09-24T08:05:00.000Z"}]});
S.set("gespraech/g2",{start:"2026-09-25T08:00:00.000Z",status:"offen",wartet:"Claude",nachrichten:[{von:"Eigner",text:"Offene Frage in b27",zeit:"2026-09-25T08:00:00.000Z"}]});
S.set("gespraech/g3",{start:"2026-09-27T08:00:00.000Z",status:"gelesen",wartet:"",nachrichten:[{von:"Eigner",text:"Frage in b28",zeit:"2026-09-27T08:00:00.000Z"}]});
S.set("archiv/karten-3.0.0b26",{art:"karten",release:"3.0.0b26",gepackt:"2026-09-21T10:00:00.000Z",eintraege:[Object.assign({id:"E-005"},card(5,"erledigt","3.0.0b26"))]});
S.set("statistik/3.0.0b28",{version:"3.0.0b28",ordnung:28});
S.set("statistik/3.0.0b27",{version:"3.0.0b27",ordnung:27,veroeffentlicht:"2026-09-26T09:00:00.000Z",commits:12});
S.set("statistik/3.0.0b26",{version:"3.0.0b26",ordnung:26,veroeffentlicht:"2026-09-20T09:00:00.000Z",archiv:{erledigt:1,verworfen:0,auftraege:0,gespraeche:0,docs:["karten-3.0.0b26"]},karten:1});
S.set("statistik/3.0.0b25",{version:"3.0.0b25",ordnung:25,veroeffentlicht:"2026-09-14T09:00:00.000Z"});
S.set("statistik/1.0.0-beta",{version:"1.0.0-beta",ordnung:1,veroeffentlicht:"2026-08-01T09:00:00.000Z"});
window.ORIG=JSON.parse(JSON.stringify(Object.fromEntries(S)));
// browser dialogs are recorded; every doc get is logged into CALLS too ("get <path>"), so reads and writes stand in one order;
// __NOWRITE: a viewer without write access; __DELFAIL: a regex, a delete of a matching path throws;
// __READBACK(path, data): may change what a get of an archive doc answers
window.DIALOGS=[];for(const k of ["alert","confirm","prompt"])window[k]=m=>{DIALOGS.push(k);return k==="confirm"};
{const use=window.claude.use;window.claude={use:async n=>{const c=await use(n);if(n==="user"&&c&&window.__NOWRITE)return Object.assign({},c,{can:async()=>false});if(n!=="db"||!c)return c;
  const wrap=r=>Object.assign({},r,{get:async()=>{CALLS.push("get "+r.path);const s=await r.get();if(window.__READBACK&&/^archiv\//.test(r.path)&&s.exists){const d=window.__READBACK(r.path,JSON.parse(JSON.stringify(s.data())));return Object.assign({},s,{data:()=>d})}return s},
    delete:async()=>{if(window.__DELFAIL&&window.__DELFAIL.test(r.path)){CALLS.push("delete "+r.path+" FAILED");throw {code:"unavailable",message:"stand-in: delete fails"}}return r.delete()}});
  return {doc:p=>wrap(c.doc(p)),collection:x=>{const q=c.collection(x);return Object.assign({},q,{get:async()=>{CALLS.push("get "+x+"/*");return q.get()}})}}}}}
window.openSettings=async()=>{await until(()=>document.querySelector('#views button'));await sleep(300);document.getElementById('setbtn').click();return until(()=>document.getElementById('archiv-packen')||document.querySelector('.vlog'))};
window.packLines=()=>$$('#pack-liste li').map(li=>(li.querySelector('.packwhat')||li).textContent+(li.querySelector('button')?' ['+li.querySelector('button').id+']':''));
window.packNote=()=>(document.getElementById('pack-stand')||{}).textContent;
window.calls=w0=>CALLS.slice(w0).filter(c=>/^(set|update|delete|get) /.test(c)).map(c=>c.split(' ').slice(0,2).join(' ')+(/ FAILED$/.test(c)?' FAILED':''));
