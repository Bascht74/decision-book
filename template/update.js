/* == book-update: begin == made from template/update.js by template/build_template.py -- edit it there, then rebuild */
// THE BOOK'S DATA VERSION. PAGE_VERSION is this page's version (x.y.z, the repository's file VERSION). The data in the
// db carries its own: meta/buch {version:"x.y.z", migriert:["0.1.0", …], aktualisiert:"<ISO>"}. A book without
// meta/buch is older than 0.1.0 (the page then counted v1, v2 … v113).
// On load, a viewer who may write runs every migration in MIGRATIONS whose "to" is newer than meta/buch.version and not
// newer than PAGE_VERSION, oldest first. Each one records itself in meta/buch.migriert (a recorded one is not run
// again) and must be idempotent (run twice, it changes nothing the second time). Only when every one has run is
// meta/buch.version set to PAGE_VERSION. A failure stops right there, names the migration and leaves meta/buch.version
// as it was; the next load tries again. A viewer without write access gets a hint instead, and the page works as it is.
// The owner's automatic rule writes (runRules) stay off (UPD.busy) from the start until the book's data version is
// known to be the page's: while migrations run, after one failed, for a reader, and when the book is newer than the page.
// RULE: every change to the shape of the data ships a migration here -- a renamed or moved field, a new required field,
// a changed format. Old fields are copied, never deleted: a page of the previous version may still be open somewhere.
const MIGRATIONS=[
 {to:"0.1.0",was:"der Stempel des Eigners auf einer Karte heißt eigner_am",
  // Before 0.1.0 the owner's stamp on a card (written by every card write from the page) was named after the owner:
  // "<name>_am". Since 0.1.0 it is "eigner_am". The old name is found, in this order: meta/buch.stempel_alt (set by
  // hand when the page cannot tell), the owner name in meta/einstellungen.eigner, lower-cased, + "_am" (when cards carry
  // it), the one "<word>_am" field on cards the page does not know. Several unknown ones and no hint: the migration
  // stops and asks for meta/buch.stempel_alt. It copies old -> eigner_am where eigner_am is missing or older, on the
  // cards and on the cards in the archive; the old field stays.
  run:async(db,say)=>{
   const KNOWN=new Set(["eigner_am","erledigt_am","gelesen_am","karte_am"]);
   const data=async p=>{const s=await db.doc(p).get();return s&&s.exists?(s.data()||{}):{}};
   const bk=await data("meta/buch"),set=await data("meta/einstellungen");
   const cards=(await db.collection("entscheidungen").get()).docs.map(d=>({id:d.id,d:d.data()||{}}));
   const arch=(await db.collection("archiv").get()).docs.map(d=>({id:d.id,d:d.data()||{}}))
     .filter(a=>Array.isArray(a.d.eintraege)&&(a.d.art==="karten"||/^karten-/.test(a.id)));
   const seen=new Set(),look=o=>{for(const k of Object.keys(o||{}))if(/^[a-z][a-z0-9]*_am$/.test(k)&&!KNOWN.has(k))seen.add(k)};
   for(const c of cards)look(c.d);for(const a of arch)for(const e of a.d.eintraege)look(e);
   let old=typeof bk.stempel_alt==="string"?bk.stempel_alt.trim():"";
   if(!old){const n=String(set.eigner||"").trim().toLowerCase();if(n&&seen.has(n+"_am"))old=n+"_am"}
   if(!old){if(seen.size>1)throw new Error("mehrere mögliche alte Stempelfelder ("+[...seen].sort().join(", ")+"); das richtige in meta/buch.stempel_alt eintragen");
     old=[...seen][0]||""}
   if(!old||old==="eigner_am")return "kein altes Stempelfeld";
   const take=d=>{const o=d&&d[old],n=d&&d.eigner_am;return o&&(!n||String(o)>String(n))?o:null};
   const todo=cards.filter(c=>take(c.d)!=null);
   for(let i=0;i<todo.length;i+=10){const part=todo.slice(i,i+10);
     const r=await Promise.allSettled(part.map(c=>db.doc("entscheidungen/"+c.id).update({eigner_am:take(c.d)})));
     const k=r.findIndex(x=>x.status==="rejected");if(k>=0)throw new Error("Karte "+part[k].id+": "+errWord(r[k].reason));
     say(Math.min(i+10,todo.length)+" von "+todo.length+" Karten")}
   let na=0;for(const a of arch){let ch=false;const l=a.d.eintraege.map(e=>{const v=take(e);if(v==null)return e;ch=true;return Object.assign({},e,{eigner_am:v})});
     if(ch){try{await db.doc("archiv/"+a.id).update({eintraege:l})}catch(e){throw new Error("Archiv "+a.id+": "+errWord(e))}na++}}
   return old+" → eigner_am: "+todo.length+" Karten, "+na+" Archiv-Dokumente"}},
];
const UPD={busy:true,book:null,done:[]};
function errWord(e){return String(e&&(e.message||e.code)||e||"Fehler").slice(0,160)}
// "1.2.3" -> [1,2,3]; anything else (no meta/buch, an old "v113") counts as 0.0.0
function verParts(v){const m=/^(\d+)\.(\d+)\.(\d+)$/.exec(String(v||"").trim());return m?[+m[1],+m[2],+m[3]]:[0,0,0]}
function verCmp(a,b){const x=verParts(a),y=verParts(b);for(let i=0;i<3;i++)if(x[i]!==y[i])return x[i]<y[i]?-1:1;return 0}
function updBar(text,kind){let b=document.getElementById("book-update");
  if(!document.getElementById("book-update-css")){const s=document.createElement("style");s.id="book-update-css";
    s.textContent=".updbar{margin:0 0 12px;padding:8px 12px;border:1px solid var(--line);border-left-width:4px;border-radius:8px;background:var(--sheet);font-size:14px;overflow-wrap:anywhere}"+
      ".updbar.run{border-left-color:var(--accent)}.updbar.warn{border-left-color:var(--notready)}.updbar.fail{border-left-color:var(--wait);color:var(--wait)}.updbar.ok{border-left-color:var(--ready)}";
    document.head.append(s)}
  if(!b){b=document.createElement("div");b.id="book-update";b.setAttribute("role","status");const h=document.querySelector(".wrap header");if(h)h.after(b);else document.body.prepend(b)}
  b.className="updbar "+kind;b.dataset.kind=kind;b.textContent=text;b.hidden=false}
async function bookUpdate(db){
  let can=true;
  try{const u=await window.claude.use("user");if(u&&typeof u.can==="function"&&(await u.can("data.write"))===false)can=false}catch(e){}
  let cur;
  try{const s=await db.doc("meta/buch").get();cur=s&&s.exists?(s.data()||{}):{}}
  catch(e){updBar("Der Datenstand des Buchs (meta/buch) ist nicht lesbar – keine Aktualisierung: "+errWord(e),"warn");return}
  const have=cur.version?String(cur.version):"";UPD.book=have||null;
  const shown=have||"vor 0.1.0",c=verCmp(have,PAGE_VERSION);
  if(c===0){UPD.busy=false;if(typeof runRules==="function")setTimeout(runRules,0);return}
  if(c>0){updBar("Das Buch hat Datenstand "+have+", diese Seite ist "+PAGE_VERSION+" und damit älter. Bitte die neue Seite veröffentlichen.","warn");return}
  const todo=MIGRATIONS.filter(m=>verCmp(m.to,have)>0&&verCmp(m.to,PAGE_VERSION)<=0).sort((a,b)=>verCmp(a.to,b.to));
  if(!can){updBar("Dieses Buch hat Datenstand "+shown+", die Seite ist "+PAGE_VERSION+". Es wird aktualisiert, sobald jemand mit Schreibrechten es öffnet; bis dahin kann einiges fehlen.","warn");return}
  const done=Array.isArray(cur.migriert)?cur.migriert.slice():[];
  const write=async extra=>{const d=Object.assign({},cur,{migriert:done.slice()},extra||{});await db.doc("meta/buch").set(d);cur=d};
  for(let i=0;i<todo.length;i++){const m=todo[i],step="Schritt "+(i+1)+" von "+todo.length+" ("+m.to+(m.was?": "+m.was:"")+")";
    if(done.includes(m.to))continue;
    updBar("Aktualisiere das Buch von "+shown+" auf "+PAGE_VERSION+" … "+step,"run");
    try{const r=await m.run(db,t=>updBar("Aktualisiere das Buch von "+shown+" auf "+PAGE_VERSION+" … "+step+" – "+t,"run"));
      done.push(m.to);UPD.done.push({to:m.to,r:r==null?"":String(r)});await write()}
    catch(e){updBar("Aktualisierung angehalten bei "+m.to+": "+errWord(e)+". Der Datenstand bleibt "+shown+"; beim nächsten Öffnen wird es noch einmal versucht.","fail");return}}
  try{await write({version:PAGE_VERSION,aktualisiert:new Date().toISOString()})}
  catch(e){updBar("Aktualisierung fast fertig, aber meta/buch ließ sich nicht schreiben: "+errWord(e)+". Der Datenstand bleibt "+shown+".","fail");return}
  UPD.busy=false;UPD.book=PAGE_VERSION;
  updBar("Buch aktualisiert: Datenstand "+shown+" → "+PAGE_VERSION+(todo.length?" ("+todo.map(m=>m.to).join(", ")+")":"")+".","ok");
  setTimeout(()=>{const b=document.getElementById("book-update");if(b&&b.dataset.kind==="ok")b.hidden=true},15000);
  if(typeof runRules==="function")setTimeout(runRules,0)}
/* == book-update: end == */
