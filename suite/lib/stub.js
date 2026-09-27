// In-memory stand-in for the artifact runtime (window.claude.use: db, user, comments), with live snapshots.
// Knobs a scenario's pre.js may set BEFORE the page runs:
//   __LAT (ms, default 40)      latency of every db call      __SYNC=true   snapshots and writes without any delay
//   __OWNER=false               viewer is not the owner       __USE_DELAY={comments:ms,...}  slow capability
//   __FAIL={update:/re/,set:/re/,get:/re/,send:true}   make matching writes / reads / sendToClaude throw
//   __SEND_DELAY (ms)           sendToClaude takes this long  __ON_SEND(text)  called when sendToClaude is called
//   __ON_GET(path)              called at the start of every doc get (e.g. to let another writer in between)
//   __ASSETS=true               serve a minimal "assets" (upload only; the real accepted types; UPLOADS logs them)
//   __ASSETS_HAVE=[ids]         the asset ids assets.list() reports
//   __CAN_WRITE=false           the viewer may read, not write (user.can("data.write") answers false)
//   __OLD_BOOK=true             the book has no meta/buch (a book from before 0.1.0); otherwise meta/buch is put in at the
//                               first use("db") with version = the page's PAGE_VERSION, so the page has nothing to migrate
// Logs: CALLS (writes and sends, in order), READS (doc gets).
(function(){
const store=new Map(),subs=new Set();const LAT=window.__LAT||40;
const clone=x=>x==null?x:JSON.parse(JSON.stringify(x));
const cp=p=>p.split('/').slice(0,-1).join('/');
function docSnap(path,pend){const d=store.get(path);const fz=d?Object.freeze(clone(d)):undefined;return {id:path.split('/').pop(),exists:!!d,data:()=>fz,metadata:{fromCache:false,hasPendingWrites:!!pend}}}
function collSnap(c,pend){const docs=[...store.keys()].filter(k=>cp(k)===c).sort().map(k=>docSnap(k,pend));return {docs,size:docs.length,empty:!docs.length,docChanges:()=>[],metadata:{fromCache:false,hasPendingWrites:!!pend}}}
window.SNAPS=0;
function notify(path,pend){(window.__SYNC?(f=>f()):(f=>setTimeout(f,0)))(()=>{for(const s of [...subs]){if(s.kind==='doc'&&s.path===path){SNAPS++;s.cb(docSnap(path,pend))}else if(s.kind==='coll'&&s.path===cp(path)){SNAPS++;s.cb(collSnap(s.path,pend))}}})}
window.CALLS=[];window.READS=[];const log=x=>CALLS.push(x);
const wait=()=>window.__SYNC?Promise.resolve():new Promise(r=>setTimeout(r,LAT));
const failing=(kind,path)=>{const f=(window.__FAIL||{})[kind];return f instanceof RegExp&&f.test(path)};
function docr(path){return {id:path.split('/').pop(),path,
 get:async()=>{READS.push(path);if(window.__ON_GET)window.__ON_GET(path);await wait();if(failing('get',path))throw {code:'unavailable',message:'stand-in: get fails'};return docSnap(path)},
 set:async d=>{log('set '+path+' '+JSON.stringify(d).slice(0,300));if(failing('set',path)){await wait();throw {code:'unavailable',message:'stand-in: set fails'}}store.set(path,clone(d));notify(path,true);await wait()},
 update:async d=>{log('update '+path+' '+JSON.stringify(d).slice(0,300));if(failing('update',path)){await wait();throw {code:'unavailable',message:'stand-in: update fails'}}if(!store.has(path)){await wait();throw {code:'invalid_argument'}}store.set(path,Object.assign(clone(store.get(path)),clone(d)));notify(path,true);await wait()},
 delete:async()=>{log('delete '+path);store.delete(path);notify(path,true);await wait()},
 acquire:async()=>({acquired:true}),
 onSnapshot(cb,err){const s={kind:'doc',path,cb,err};subs.add(s);(window.__SYNC?queueMicrotask:(f=>setTimeout(f,5)))(()=>{SNAPS++;cb(docSnap(path))});return()=>subs.delete(s)},
 collection:c=>coll(path+'/'+c)}}
let n=0;
function coll(c){const q={path:c,where:()=>q,orderBy:()=>q,limit:()=>q,get:async()=>{await wait();return collSnap(c)},
 doc:id=>docr(c+'/'+(id||('a'+(++n)))),add:async d=>{const r=q.doc();await r.set(d);return r},
 onSnapshot(cb,err){const s={kind:'coll',path:c,cb,err};subs.add(s);(window.__SYNC?queueMicrotask:(f=>setTimeout(f,5)))(()=>{SNAPS++;cb(collSnap(c))});return()=>subs.delete(s)}};return q}
const DB=Object.freeze({doc:docr,collection:coll});
const USER=Object.freeze({can:async()=>window.__CAN_WRITE!==false,isOwner:async()=>window.__OWNER!==false,canEdit:async()=>window.__CAN_WRITE!==false,id:async()=>'u_1',me:async()=>({id:'u_1',name:'',isOwner:window.__OWNER!==false,canEdit:window.__CAN_WRITE!==false})});
const CM=Object.freeze({canSendToClaude:async()=>'available',
 anchorFor:async el=>{if(!el||!el.isConnected)throw {code:'invalid',message:'detached'};return {path:'#x',x:1,y:1}},
 sendToClaude:async t=>{log('SEND '+JSON.stringify(t).slice(0,160));if(window.__ON_SEND)window.__ON_SEND(t);if(window.__SEND_DELAY)await new Promise(r=>setTimeout(r,window.__SEND_DELAY));if((window.__FAIL||{}).send)throw {code:'unavailable',message:'stand-in: send fails'};return {threadId:'t'+(++n),commentId:'c'+n}}});
const AT=['image/png','image/jpeg','image/gif','image/webp','image/svg+xml','video/mp4','video/webm','application/pdf','font/woff2','font/woff','font/ttf','font/otf','text/csv','text/markdown','application/json','text/plain','text/css','text/javascript'];
window.UPLOADS=[];
// list() answers the asset ids a scenario puts in __ASSETS_HAVE (the ones "still in the store")
const AS=Object.freeze({list:async()=>{await wait();return {assets:(window.__ASSETS_HAVE||[]).map(id=>({id,url:'/_blob/'+id})),usage:{}}},upload:async(b,o)=>{const t=(o&&o.type)||b.type;await wait();if(!AT.includes(t))throw {code:'unsupported_type',message:'stand-in'};
 const id=[...crypto.getRandomValues(new Uint8Array(16))].map(x=>x.toString(16).padStart(2,'0')).join('');UPLOADS.push({type:t,size:b.size});return {id,url:'/_blob/'+id,sizeBytes:b.size,contentType:t}}});
const CAPS={db:DB,user:USER,comments:CM};Object.defineProperty(CAPS,'assets',{get:()=>window.__ASSETS?AS:undefined});
// a downloads stand-in, only with __DL; what was offered lands in window.SAVED
Object.defineProperty(CAPS,'downloads',{get:()=>window.__DL?{save:async r=>{window.SAVED=r;log('SAVE '+r.filename);return {status:'saved'}}}:undefined});
window.claude={use:async name=>{if(name==='db'&&!window.__OLD_BOOK&&!store.has('meta/buch')&&typeof PAGE_VERSION==='string')store.set('meta/buch',{version:PAGE_VERSION,migriert:[]});const d=(window.__USE_DELAY||{})[name];if(d)await new Promise(r=>setTimeout(r,d));return CAPS[name]||null}};
// another writer (Claude, a second tab): changes the store and notifies without a pending-write flag
window.__DB={store,subs,external(path,patch){store.set(path,Object.assign(clone(store.get(path)||{}),clone(patch)));notify(path,false)},fail(coll,code){for(const s of subs)if(s.path===coll&&s.err)s.err({code,message:'x'})}};
// synthetic data only: roles "Eigner" and "Claude", no real names
window.seed=function(N){const bl=['erledigt','erledigt','erledigt','erledigt','erledigt','erledigt','erledigt','vorrat','entschieden','arbeit','offen','pruefen'];
 const zs=['3.0.0b26','3.0.0b27','3.0.0b28','3.0.0b29','später','Buch',''];const lorem='Beschreibung mit Link https://example.org/pfad und etwas Text. '.repeat(12);
 for(let i=1;i<=N;i++){const nr='E-'+String(i).padStart(3,'0');const b=bl[i%bl.length];
  store.set('entscheidungen/'+nr,{ueberschrift:'Karte '+i,beschreibung:lorem,option1:'Eins',option2:'Zwei',empfehlung:'Option 1',entscheidung:i%3?'':'Ja',blatt:b,status:b==='erledigt'?'umgesetzt':'offen',ziel:zs[i%zs.length],von:i%2?'Claude':'Eigner',typ:'Aufgabe',
   tokens_prognose:100000,tokens_ist:90000,verlauf:[{zeit:'2026-09-20T10:00',text:'Schritt'}],kommentare:[{von:'Claude',text:'Antwort',zeit:'2026-09-20T08:30:00.000Z'}],geaendert:'2026-09-20T08:00:00.000Z'})}
 store.set('meta/stand',{aktuell:'3.0.0b28'});
};
})();
