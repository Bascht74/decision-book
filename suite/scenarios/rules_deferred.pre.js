// No db write (and no lease) is made inside a snapshot callback: the rule writes run in a task of their own
// (db contract: no writes from a snapshot callback). The lease on meta/regeln is granted for 100 ms only, so
// every new rule case asks for it again -- right at the start of the rule run.
const S=__DB.store;S.set('meta/stand',{aktuell:'3.0.0b28'});
S.set('entscheidungen/E-601',{ueberschrift:'Token fehlen',blatt:'pruefen',ziel:'3.0.0b28',geaendert:new Date().toISOString()});
S.set('entscheidungen/E-602',{ueberschrift:'Antwort auf Auftrag',blatt:'erledigt',typ:'Auftrag',ziel:'3.0.0b28',geaendert:new Date().toISOString()});
window.INSNAP=0;window.INSIDE=[];
{const use=window.claude.use;window.claude.use=async n=>{const c=await use(n);if(n!=='db'||!c)return c;
  const cb=f=>function(){INSNAP++;try{return f.apply(this,arguments)}finally{INSNAP--}};
  const mark=(k,p)=>{if(INSNAP)INSIDE.push(k+' '+p)};
  const ref=r=>new Proxy(r,{get(t,k){if(k==='onSnapshot')return (nx,er)=>t.onSnapshot(cb(nx),er);
      if(k==='acquire'&&t.path==='meta/regeln')return async o=>{mark(k,t.path);await t.acquire(o);return {acquired:true,holder:o.holder,expiresAt:new Date(Date.now()+100).toISOString()}};
      if(['set','update','delete','acquire'].includes(k))return function(){mark(k,t.path);return t[k].apply(t,arguments)};if(k==='collection')return p=>coll(t.collection(p));return t[k]}});
  const coll=q=>new Proxy(q,{get(t,k){if(k==='onSnapshot')return (nx,er)=>t.onSnapshot(cb(nx),er);if(k==='doc')return id=>ref(t.doc(id));
      if(k==='add')return function(d){mark('add',t.path);return t.add(d)};return t[k]}});
  return {doc:p=>ref(c.doc(p)),collection:p=>coll(c.collection(p))}}}
