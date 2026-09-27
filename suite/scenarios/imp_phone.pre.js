// At 390 px: the settings with "Sicherung einlesen", its question and its result stay inside the screen; the two answers are at least 32 px tall.
// helpers (synthetic data only, roles "Eigner" and "Claude"): jf(path, obj) makes a JSON file (a path with "/"
// becomes its webkitRelativePath, as a picked folder gives it); pickFiles(inputId, files) hands files to a file input.
// (text() answers at once: a real file read is I/O that the virtual clock of --virtual-time-budget does not wait for)
window.jf=(path,obj,type)=>{const body=typeof obj==='string'||obj instanceof Uint8Array?obj:JSON.stringify(obj),f=new File([body],path.split('/').pop(),{type:type||'application/json'});
  if(path.includes('/'))Object.defineProperty(f,'webkitRelativePath',{value:path});if(typeof body==='string')Object.defineProperty(f,'text',{value:()=>Promise.resolve(body)});return f};
window.pickFiles=(id,files)=>{const i=document.getElementById(id);Object.defineProperty(i,'files',{value:files,configurable:true});i.dispatchEvent(new Event('change'))};
window.DIALOGS=[];for(const k of ["alert","confirm","prompt"])window[k]=m=>{DIALOGS.push(k);return k==="confirm"};
// every note the import shows, in order; how many db writes run at once at most
window.NOTES=[];window.INFLIGHT={now:0,max:0};
{const use=window.claude.use;window.claude={use:async n=>{const c=await use(n);if(n==="user"&&c&&window.__NOWRITE)return Object.assign({},c,{can:async()=>false});if(n!=="db"||!c)return c;
  const wrap=r=>Object.assign({},r,{set:async d=>{INFLIGHT.now++;INFLIGHT.max=Math.max(INFLIGHT.max,INFLIGHT.now);try{return await r.set(d)}finally{INFLIGHT.now--}},
    delete:async()=>{INFLIGHT.now++;INFLIGHT.max=Math.max(INFLIGHT.max,INFLIGHT.now);try{return await r.delete()}finally{INFLIGHT.now--}}});
  return {doc:p=>wrap(c.doc(p)),collection:c.collection}}}}
window.openImport=async()=>{await until(()=>document.querySelector('#views button'));await sleep(200);document.getElementById('setbtn').click();
  const n=await until(()=>document.getElementById('import-stand'));new MutationObserver(()=>{const t=n.textContent;if(t&&NOTES[NOTES.length-1]!==t)NOTES.push(t)}).observe(n,{childList:true,characterData:true,subtree:true});return n};
window.impNote=()=>(document.getElementById('import-stand')||{}).textContent;
window.lines=()=>$$('#import-ergebnis li').map(l=>l.textContent);
window.docIds=c=>[...__DB.store.keys()].filter(k=>k.startsWith(c+'/')).map(k=>k.slice(c.length+1)).sort();
window.writes=()=>CALLS.filter(c=>/^(set|update|delete) /.test(c));
// a backup in the page's format: n cards and a few of everything else
window.backup=(n,extra)=>{const d={meta:{einstellungen:{release:'3.0.0b28',eigner:'Eigner'}},statistik:{'3.0.0b27':{version:'3.0.0b27',ordnung:27}},entscheidungen:{},
  auftraege:{a1:{text:'Auftrag eins',zeit:'2026-09-20T09:00:00.000Z',status:'offen'},a2:{text:'Auftrag zwei',zeit:'2026-09-21T09:00:00.000Z',status:'offen'}},
  gespraech:{g1:{status:'offen',nachrichten:[{von:'Eigner',text:'Frage',zeit:'2026-09-21T09:00:00.000Z'}]}},
  auftragsbilder:{p1:{data:'data:image/png;base64,iVBORw0KGgo=',zeit:'2026-09-21T09:00:00.000Z'}},
  archiv:{'karten-3.0.0b26':{art:'karten',release:'3.0.0b26',gepackt:'2026-09-20T10:00:00.000Z',eintraege:[]}}};
  for(let i=1;i<=n;i++){const nr='E-'+String(i).padStart(3,'0');d.entscheidungen[nr]={ueberschrift:'Gesicherte Karte '+i,beschreibung:'Text',blatt:'offen',ziel:'3.0.0b28',von:'Claude'}}
  return Object.assign({zeit:'2026-09-27T10:00:00.000Z',seite:'v112',daten:d},extra||{})};
seed(3);
