scenario(async out=>{
  await until(()=>document.querySelector('#board .rtab'));await sleep(100);
  const g=z=>document.querySelector('#board .relgrp[data-rel="'+z+'"]'),vis=e=>!!e&&e.getClientRects().length>0;
  const st=z=>{const s=g(z),b=s.querySelector('h3 .relbtn');return [b.textContent.trim(),b.getAttribute('aria-expanded'),$$('tbody tr[data-nr]',s).filter(vis).length,$$('tbody tr.sgrp',s).filter(vis).length,vis(s.querySelector('thead')),$$('tfoot td',s).filter(vis).map(t=>t.textContent).join('|')].join(' / ')};
  out.atStart=[st('3.0.0b28'),st('3.0.0b29')];
  {const b=g('3.0.0b28').querySelector('h3 .relbtn');b.focus();b.click();await sleep(80)}
  out.shut=[st('3.0.0b28'),st('3.0.0b29')];out.stored=sessionStorage.getItem('eb-rrel');
  out.focus=(document.activeElement||{}).id||'';
  // a redraw from outside keeps it shut
  __DB.external('entscheidungen/E-003',{ueberschrift:'Karte 003 neu'});await sleep(150);out.afterSnapshot=st('3.0.0b28');
  g('3.0.0b28').querySelector('h3 .relbtn').click();await sleep(80);
  out.reopened=st('3.0.0b28');out.storedAfter=sessionStorage.getItem('eb-rrel');
});
