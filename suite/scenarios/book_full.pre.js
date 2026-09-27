// A full book (5000 documents): a create rejects "quota_exceeded"; the page says "Das Buch ist voll – Claude räumt auf" instead of
// "bitte noch einmal", keeps the text, marks meta/stand once, and a write to an existing document still goes through.
seed(8);const S=__DB.store;S.set('meta/stand',{aktuell:'3.0.0b28'});
S.set('gespraech/g1',{start:'2026-09-27T07:00:00.000Z',status:'offen',wartet:'',thread:'t0',nachrichten:[{von:'Claude',text:'Hallo',zeit:'2026-09-27T07:01:00.000Z'}]});
localStorage.setItem('eb-view','sitzung');
// every create of a new document fails like the real store when it is full
{const use=window.claude.use;window.claude.use=async n=>{const c=await use(n);if(n!=='db'||!c)return c;
  const full=async()=>{await sleep(20);throw {code:'quota_exceeded',message:'documents in this artifact\'s database: 5000'}};
  const ref=r=>new Proxy(r,{get(t,k){if(k==='set'&&!S.has(t.path))return async d=>{CALLS.push('QUOTA set '+t.path);return full()};if(k==='collection')return c2=>coll(t.collection(c2));return t[k]}});
  const coll=q=>new Proxy(q,{get(t,k){if(k==='doc')return id=>ref(t.doc(id));if(k==='add')return async d=>{CALLS.push('QUOTA add '+t.path);return full()};return t[k]}});
  return {doc:p=>ref(c.doc(p)),collection:p=>coll(c.collection(p))}}}
