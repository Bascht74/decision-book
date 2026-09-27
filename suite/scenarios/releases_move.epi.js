scenario(async out=>{
  await until(()=>document.querySelector('#board .rtab'));await sleep(100);
  // follow-up: "Erledigt" and "in Arbeit" start shut; open every group first
  {let t;while((t=document.querySelector('#board tr.sgrp[aria-expanded="false"]'))){t.click();await sleep(30)}}
  const tr=nr=>document.querySelector('#board .rtab tr[data-nr="'+nr+'"]');const ms=nr=>tr(nr).querySelector('select.mvsel');
  out.arbeitDisabled=ms('E-002').disabled;out.arbeitTitle=ms('E-002').title;
  out.pruefenDisabled=ms('E-009').disabled;out.pruefenTitle=ms('E-009').title;out.doneTitle=ms('E-003').title;out.offenEnabled=!ms('E-001').disabled;
  out.oldButtons=$$('#board .rtab .mvbtn').length;
  // the choices -- the releases shown, one beyond the highest, "später"; the card's own one selected and not choosable
  out.choices=$$('option',ms('E-001')).map(o=>o.textContent).join(',');
  {const o=ms('E-001').selectedOptions[0];out.hereSelected=o.textContent;out.hereDisabled=o.disabled}
  out.buchChoices=$$('option',ms('E-007')).map(o=>o.textContent).join(',');
  const n0=CALLS.length;
  const s=ms('E-001');s.value='3.0.0b31';s.dispatchEvent(new Event('change',{bubbles:true}));await sleep(300);
  const w=CALLS.slice(n0).filter(c=>/^(update|set)/.test(c));out.writes=w.length;
  out.write=w.length?w[0].replace(/"(geaendert|eigner_am)":"[^"]*",?/g,''):'';
  out.stored=__DB.store.get('entscheidungen/E-001').ziel;
  out.expandedByChange=$$('#board .rtab tr.gfull details').length;
  out.nowIn=(tr('E-001')||{closest:()=>null}).closest('.relgrp')?.dataset.rel;
  out.oldRow=$$('#board .relgrp[data-rel="3.0.0b28"] tr[data-nr="E-001"]').length;
  // the new highest release brings one more choice
  out.choicesAfter=$$('option',ms('E-004')).map(o=>o.value).join(',');
});
