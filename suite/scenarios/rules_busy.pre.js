// The page's rule writes run from one tab only: while another tab holds the lease on meta/regeln this one writes nothing,
// and once that lease has run out it does the work.
const S=__DB.store;S.set('meta/stand',{aktuell:'3.0.0b28'});
S.set('entscheidungen/E-601',{ueberschrift:'Token fehlen',blatt:'pruefen',ziel:'3.0.0b28',geaendert:new Date().toISOString()});
S.set('entscheidungen/E-602',{ueberschrift:'Antwort auf Auftrag',blatt:'erledigt',typ:'Auftrag',ziel:'3.0.0b28',geaendert:new Date().toISOString()});
S.set('entscheidungen/E-603',{ueberschrift:'Nachbar',blatt:'arbeit',ziel:'3.0.0b28'});
window.ACQ=[];window.BUSY_UNTIL=Date.now()+1500;
{const use=window.claude.use;window.claude.use=async n=>{const c=await use(n);if(n!=='db'||!c)return c;
  return {collection:p=>c.collection(p),doc:p=>{const r=c.doc(p);if(p!=='meta/regeln')return r;
    return new Proxy(r,{get(t,k){if(k==='acquire')return async o=>{ACQ.push(o&&o.holder);const busy=Date.now()<BUSY_UNTIL;return busy?{acquired:false,expiresAt:new Date(BUSY_UNTIL).toISOString()}:{acquired:true,holder:o.holder,expiresAt:new Date(Date.now()+30000).toISOString()}};return t[k]}})}}}}
