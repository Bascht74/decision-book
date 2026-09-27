scenario(async out=>{
  await until(()=>document.querySelector('#board .atab'));await sleep(100);
  const rowsOf=()=>$$('#board .atab tbody tr');
  const col=i=>rowsOf().map(tr=>tr.children[i].textContent);
  const pick=async(id,v)=>{const s=document.getElementById(id);s.focus();s.value=v;s.dispatchEvent(new Event('change'));await sleep(100)};
  out.total=rowsOf().length;
  out.filterCells=$$('#board .atab thead tr.frow th').map(th=>th.querySelectorAll('select').length);
  out.searchStays=!!document.getElementById('suche');
  out.zielChoices=[...document.getElementById('af-ziel').options].map(o=>o.value);
  await pick('af-ziel','3.0.0b27');const z=col(2);out.zielOnly=z.length>0&&z.every(x=>x==='3.0.0b27');out.cnt=(document.querySelector('#board .archive .cnt')||{}).textContent||'';
  await pick('af-ziel-op','!=');const zn=col(2);out.zielNot=zn.length>0&&zn.every(x=>x!=='3.0.0b27')&&zn.length+z.length===out.total;
  await pick('af-ziel-op','=');await pick('af-von','Claude');const v=col(3),z2=col(2);out.both=v.length>0&&v.every(x=>x==='Claude')&&z2.every(x=>x==='3.0.0b27');
  out.focusKept=document.activeElement&&document.activeElement.id;
  await pick('af-ziel','');await pick('af-von','');out.cleared=rowsOf().length;
});
