scenario(async out=>{
  await until(()=>document.querySelector('#board .abgrp'));await sleep(50);
  const grp=()=>$$('#board .abgrp').map(s=>s.dataset.rel+':'+s.querySelector('.relbtn').getAttribute('aria-expanded')).join('|');
  const nrs=()=>$$('#board .abtab tbody tr[data-nr]').map(t=>t.dataset.nr).sort().join(',');
  typeIn(document.getElementById('ab-suche'),'zauberwort');await sleep(400);
  out.searchRows=nrs();out.searchGroups=grp();out.searchCnt=(document.getElementById('ab-cnt')||{}).textContent;
  typeIn(document.getElementById('ab-suche'),'alter auftrag');await sleep(400);
  out.orderHit=$$('#board .absub').map(b=>b.dataset.kind+':'+b.querySelector('.relbtn').getAttribute('aria-expanded')).join('|')+'/'+nrs();
  typeIn(document.getElementById('ab-suche'),'');await sleep(400);out.afterClear=grp();
  const v=document.getElementById('bf-von');v.value='Eigner';v.dispatchEvent(new Event('change'));await sleep(80);out.filterRows=nrs();
  const op=document.getElementById('bf-von-op');op.value='!=';op.dispatchEvent(new Event('change'));await sleep(80);out.filterNeRows=nrs();
  const z=document.getElementById('bf-ziel');out.zielChoices=[...z.options].map(o=>o.value).join(',');
  // the card an archived order led to opens in the archive
  op.value='=';op.dispatchEvent(new Event('change'));v.value='';v.dispatchEvent(new Event('change'));await sleep(60);
  document.getElementById('ab:3.0.0b27').click();await sleep(60);document.getElementById('ab:3.0.0b27|auftraege').click();await sleep(60);
  document.querySelector('#board .absub[data-kind="auftraege"] tbody tr[data-ab]').click();await sleep(60);
  const kb=findBtn('#board .absub tr.gfull .kbtn',/E-010/);if(kb){kb.click();await sleep(100)}
  const t10=document.querySelector('#board .abtab tr[data-nr="E-010"]');out.orderToCard=t10?t10.getAttribute('aria-expanded'):null;
});
