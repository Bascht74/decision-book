scenario(async out=>{
  const tg=await until(()=>document.getElementById('verw-toggle'));
  out.doneRows=$$('#board table.atab:not(.vtab) tbody tr[data-nr]').map(t=>t.dataset.nr);
  out.toggle=tg?tg.textContent+'|'+tg.getAttribute('aria-expanded'):'none';
  out.rowsShut=$$('#board .vtab tbody tr[data-nr]').length;
  out.viewCount=(findBtn('#views button',/^Erledigt/)||{textContent:''}).textContent.replace(/\D/g,'');
  if(tg){tg.click();await sleep(80)}
  const t2=document.getElementById('verw-toggle');
  out.toggleOpen=t2?t2.textContent+'|'+t2.getAttribute('aria-expanded'):'none';
  out.rowsOpen=$$('#board .vtab tbody tr[data-nr]').map(t=>t.dataset.nr);
  out.stored=sessionStorage.getItem('eb-verw');
  // a row opens its card below it; the card's Stand says "Verworfen"
  {const r0=$$('#board .vtab tbody tr[data-nr]')[0];if(r0){r0.click();await sleep(80)}}
  const d=document.querySelector('#board .vtab tr.gfull details');out.cardStand=d?d.querySelector('#sd-'+d.dataset.nr).value+'|'+d.querySelector('summary .chip').textContent:'none';
  // Releases: a shut group "Verworfen" after "Erledigt"
  await goView('Releases');await sleep(80);
  out.groups=$$('#board .relgrp[data-rel="3.0.0b28"] tr.sgrp').map(g=>g.dataset.stand+'|'+g.getAttribute('aria-expanded')+'|'+g.cells[0].textContent+'|'+g.cells[1].textContent);
  const vg=document.getElementById('rg:3.0.0b28|verworfen');if(vg){vg.click();await sleep(80)}
  const tr=document.querySelector('#board .rtab tr[data-nr="E-302"]');
  const ms=tr&&tr.querySelector('select.mvsel');out.move=ms?ms.disabled+'|'+ms.title:'none';
  out.standFilter=[...document.getElementById('rf-stand').options].map(o=>o.textContent);
});
