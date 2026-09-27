scenario(async out=>{
  const card=nr=>document.querySelector('#board details[data-nr="'+nr+'"]');
  const openCard=async nr=>{const d=await until(()=>card(nr));d.open=true;await sleep(60);return d};
  const force=(s,v)=>{s.value=v;s.dispatchEvent(new Event('change',{bubbles:true}))};
  const n0=CALLS.length,writes=()=>CALLS.slice(n0).filter(c=>/^(update|set)/.test(c)),w=nr=>writes().find(c=>c.startsWith('update entscheidungen/'+nr+' '));
  const strip=w=>(w||'').replace(/"(geaendert|eigner_am)":"[^"]*",?/g,'').replace(/"erledigt_am":"[^"]*"/,'"erledigt_am":"…"').replace(/,}/,'}');
  let d=await openCard('E-101');
  out.fields=$$('.fields select',d).map(s=>s.getAttribute('aria-label'));
  out.standOptions=[...d.querySelector('#sd-E-101').options].map(o=>o.value+'='+o.textContent);
  out.standValue=d.querySelector('#sd-E-101').value;
  out.statusSelects=$$('select[aria-label="Status"],select[id^="st-"]').length;
  out.chip=d.querySelector('summary .chip').textContent;
  const d6=await openCard('E-106');out.oldDeferred=d6.querySelector('summary .chip').textContent+'|'+d6.querySelector('#sd-E-106').value+'|'+d6.querySelector('#zi-E-106').value;
  out.statusWordShown=/zurückgestellt/.test(document.body.innerText);
  // Offen -> Entschieden: one write, "blatt" only; the card now stands under "Bei Claude" / "Entschieden"
  force(d.querySelector('#sd-E-101'),'entschieden');await sleep(300);
  out.toEntschieden=strip(w('E-101'));
  await goView('Bei Claude');const m=await until(()=>card('E-101'));
  out.movedTo=m?m.dataset.blatt+'|'+m.closest('section.col').getAttribute('aria-label'):'none';
  // In Umsetzung without tokens -> Prüfen: the buttons' path marks the missing tokens, and the token rule (kept) pulls it back
  d=await openCard('E-103');force(d.querySelector('#sd-E-103'),'pruefen');await sleep(300);
  out.toPruefen=strip(w('E-103'));out.pulledBack=writes().filter(c=>c.startsWith('update entscheidungen/E-103 ')).length+'|'+__DB.store.get('entscheidungen/E-103').blatt;
  // Entschieden with tokens -> Erledigt: stamps erledigt_am
  d=await openCard('E-104');force(d.querySelector('#sd-E-104'),'erledigt');await sleep(300);
  out.toErledigt=strip(w('E-104'));
  // -> Verworfen: "blatt" only; the card leaves the board and stands under "Erledigt" / "Verworfen"
  d=await openCard('E-105');force(d.querySelector('#sd-E-105'),'verworfen');await sleep(300);
  out.toVerworfen=strip(w('E-105'));
  out.gone=!card('E-105');
  out.docs=['E-101','E-103','E-104','E-105'].map(n=>{const x=__DB.store.get('entscheidungen/'+n);return n+':'+x.blatt+'|'+x.status}).join(',');
  out.writes=writes().length;
});
