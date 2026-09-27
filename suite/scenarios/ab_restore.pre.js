// "Zurückholen" on an archived card: the first tap asks in the page (no browser dialog), the second writes the
// card back as its own doc (all fields, without "id"), takes it out of the archive doc and lowers the summary in
// "statistik"; the page says so; the count of "Erledigt" does not change. A card number already in the book is refused.
localStorage.setItem("eb-view","ablage");
// synthetic fixture (roles "Eigner" and "Claude" only): two live cards of b28, the archive of b26 and b27 as Claude packs it
// (format at the top of the page's script), and the statistik docs with their "archiv" summaries.
const S=__DB.store;S.set("meta/stand",{aktuell:"3.0.0b28"});
const card=(n,blatt,ziel,extra)=>Object.assign({ueberschrift:"Karte "+n,beschreibung:"Text "+n,option1:"Eins",option2:"Zwei",empfehlung:"Option 1",entscheidung:"Option 1",blatt,ziel,von:"Claude",art:"entscheidung",tokens_prognose:100000,tokens_ist:90000,kommentare:[{von:"Claude",text:"Antwort "+n,zeit:"2026-09-10T08:00:00.000Z"}],verlauf:[],geaendert:"2026-09-1"+(n%10)+"T08:00:00.000Z"},extra||{});
const ent=(n,blatt,ziel,extra)=>Object.assign({id:"E-"+String(n).padStart(3,"0")},card(n,blatt,ziel,extra));
S.set("entscheidungen/E-101",card(101,"erledigt","3.0.0b28"));
S.set("entscheidungen/E-102",card(102,"offen","3.0.0b28",{entscheidung:""}));
S.set("archiv/karten-3.0.0b27",{art:"karten",release:"3.0.0b27",gepackt:"2026-09-26T10:00:00.000Z",eintraege:[
  ent(10,"erledigt","3.0.0b27",{tokens_ist:400000}),ent(11,"erledigt","3.0.0b27",{von:"Eigner",beschreibung:"Text mit dem Zauberwort",empfehlung:"Option 2",entscheidung:"Option 2",tokens_ist:600000}),
  ent(12,"verworfen","3.0.0b27",{tokens_ist:null})]});
S.set("archiv/karten-3.0.0b26",{art:"karten",release:"3.0.0b26",gepackt:"2026-09-20T10:00:00.000Z",eintraege:[ent(5,"erledigt","3.0.0b26",{tokens_ist:250000})]});
S.set("archiv/auftraege-3.0.0b27",{art:"auftraege",release:"3.0.0b27",gepackt:"2026-09-26T10:00:00.000Z",eintraege:[{id:"a9",text:"Ein alter Auftrag an Claude",zeit:"2026-09-20T09:00:00.000Z",status:"übernommen",karte:"E-010",release:"3.0.0b27"}]});
S.set("archiv/gespraeche-3.0.0b27",{art:"gespraeche",release:"3.0.0b27",gepackt:"2026-09-26T10:00:00.000Z",eintraege:[{id:"g9",titel:"Ein altes Gespräch",status:"gelesen",nachrichten:[{von:"Eigner",text:"Frage an Claude",zeit:"2026-09-21T09:00:00.000Z"},{von:"Claude",text:"Die Antwort",zeit:"2026-09-21T09:05:00.000Z"}]}]});
S.set("statistik/3.0.0b27",{version:"3.0.0b27",ordnung:27,veroeffentlicht:"2026-09-26T09:00:00.000Z",archiv:{erledigt:2,verworfen:1,auftraege:1,gespraeche:1,docs:["karten-3.0.0b27","auftraege-3.0.0b27","gespraeche-3.0.0b27"]}});
S.set("statistik/3.0.0b26",{version:"3.0.0b26",ordnung:26,veroeffentlicht:"2026-09-20T09:00:00.000Z",archiv:{erledigt:1,verworfen:0,auftraege:0,gespraeche:0,docs:["karten-3.0.0b26"]}});
// every read of "archiv" is counted: ARCH.gets (one-shot reads), ARCH.subs (subscriptions); browser dialogs are recorded
window.ARCH={gets:0,subs:0};window.DIALOGS=[];for(const k of ["alert","confirm","prompt"])window[k]=m=>{DIALOGS.push(k);return k==="confirm"};
// __NOWRITE: a viewer without write access
{const use=window.claude.use;window.claude={use:async n=>{const c=await use(n);if(n==="user"&&c&&window.__NOWRITE)return Object.assign({},c,{can:async()=>false});if(n!=="db"||!c)return c;
  return {doc:c.doc,collection:x=>{const q=c.collection(x);if(x!=="archiv")return q;
    return Object.assign({},q,{get:async()=>{ARCH.gets++;return q.get()},onSnapshot:(...a)=>{ARCH.subs++;return q.onSnapshot(...a)}})}}}}}
window.ORIG=JSON.parse(JSON.stringify(S.get("archiv/karten-3.0.0b27")));
// CLASH: while is being brought back, a card turns up in the book (read before the write)
window.__ON_GET=p=>{if(window.CLASH&&p==="entscheidungen/E-010")__DB.store.set(p,{ueberschrift:"Eine andere Karte",blatt:"offen",ziel:"3.0.0b28"})};
