scenario(async out=>{
  await until(()=>document.querySelector('#board .rtab'));await sleep(100);
  {let t;while((t=document.querySelector('#board tr.sgrp[aria-expanded="false"]'))){t.click();await sleep(30)}}
  const tr=nr=>document.querySelector('#board .rtab tr[data-nr="'+nr+'"]'),ms=nr=>tr(nr).querySelector('select.mvsel');
  const force=(s,v)=>{s.value=v;s.dispatchEvent(new Event('change',{bubbles:true}))};
  const doc=nr=>{const d=__DB.store.get('entscheidungen/'+nr);return d.ziel+'|'+d.blatt+'|'+d.status};
  const n0=CALLS.length,writes=()=>CALLS.slice(n0).filter(c=>/^(update|set)/.test(c));
  // a decided card moves: one write, "ziel" only; sheet and status stay, and it stands under "Entschieden" in b29
  force(ms('E-101'),'3.0.0b29');await sleep(300);
  out.moveWrite=(writes()[0]||'').replace(/"(geaendert|eigner_am)":"[^"]*",?/g,'');
  out.moved=doc('E-101');
  out.movedGroup=(tr('E-101').closest('.relgrp')||{dataset:{}}).dataset.rel+'|'+(()=>{let p=tr('E-101').previousElementSibling;while(p&&!p.classList.contains('sgrp'))p=p.previousElementSibling;return p&&p.dataset.stand})();
  // the card in "Prüfen": the dropdown is shut, and even a forced change writes nothing
  out.pruefenSelect=ms('E-102').disabled+'|'+ms('E-102').title;
  force(ms('E-102'),'3.0.0b29');await sleep(200);
  // its own card, opened below the row: the "Ziel" dropdown is shut too
  {const t=tr('E-102');if(t){t.click();await sleep(100)}}
  const zi=document.querySelector('#board tr.gfull #zi-E-102');out.cardZiel=zi?zi.disabled+'|'+zi.title:'none';
  if(zi){force(zi,'3.0.0b29');await sleep(200)}
  // the open card keeps its own "Ziel"
  {const t=tr('E-103');if(t){t.click();await sleep(100)}}const z3=document.querySelector('#board tr.gfull #zi-E-103');out.offenZiel=z3?String(z3.disabled):'none';
  await goView('Für Dich');const d=document.querySelector('#board details[data-nr="E-102"]');if(d){d.open=true;await sleep(80)}
  const zf=document.querySelector('#board details[data-nr="E-102"] #zi-E-102');out.fuerDichZiel=zf?String(zf.disabled):'none';
  if(zf){force(zf,'später');await sleep(200)}
  out.writes=writes().length;out.pruefenDoc=doc('E-102');
});
