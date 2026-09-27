scenario(async out=>{
  const btn=(id,re)=>findBtn('li[data-auftrag="'+id+'"] button',re);
  await until(()=>btn('o1',/^Bearbeiten/));btn('o1',/^Bearbeiten/).click();
  const ta=await until(()=>document.getElementById('aed-o1'));typeIn(ta,'Neu formuliert');
  let c0=CALLS.length;btn('o1',/^Speichern/).click();await until(()=>CALLS.slice(c0).some(c=>c.startsWith('update auftraege/o1')));await sleep(100);
  const sv=CALLS.slice(c0);out.saveFirst=(sv[0]||'').slice(0,4);out.saveSend=(sv.find(c=>c.startsWith('SEND'))||'').includes('[A:o1] Neu formuliert');
  out.saveStatus=__DB.store.get('auftraege/o1').status;
  c0=CALLS.length;btn('o2',/^Als neuen Auftrag senden/).click();await until(()=>CALLS.slice(c0).some(c=>c.startsWith('set auftraege/')));await sleep(100);
  const nw=CALLS.slice(c0);out.newFirst=(nw[0]||'').slice(0,4);
  const sid=((nw.find(c=>c.startsWith('SEND'))||'').match(/\[A:([^\]]+)\] Mein Entwurf/)||[])[1],wid=((nw.find(c=>c.startsWith('set auftraege/'))||'').match(/^set auftraege\/(\S+)/)||[])[1];
  out.newSameId=!!sid&&sid===wid;out.newIsNotOld=wid!=='o2';
  out.orders=[...__DB.store.keys()].filter(k=>k.startsWith('auftraege/')).length;
});
