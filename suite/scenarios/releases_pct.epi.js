scenario(async out=>{
  await until(()=>document.querySelector('#board .rtab tr[data-nr="E-101"]'));await sleep(100);
  const g=z=>document.querySelector('#board .relgrp[data-rel="'+z+'"]');
  const heads=z=>$$('thead th',g(z)).map(t=>t.textContent.replace(/[↓↑]/g,'').trim());
  out.heads=heads('3.0.0b28');
  const idx=out.heads.indexOf('fertig');out.idx=idx;
  const cell=nr=>{const tr=document.querySelector('#board .rtab tr[data-nr="'+nr+'"]');return tr?tr.children[idx].textContent:null};
  out.cells=Object.fromEntries(['E-101','E-102','E-103','E-104','E-105','E-201','E-202','E-203'].map(n=>[n,cell(n)]));
  out.groups=Object.fromEntries($$('tr.sgrp',g('3.0.0b28')).map(t=>[t.dataset.stand,t.querySelector('td.pc').textContent]));
  out.groups29=Object.fromEntries($$('tr.sgrp',g('3.0.0b29')).map(t=>[t.dataset.stand,t.querySelector('td.pc').textContent]));
  out.sum28=g('3.0.0b28').querySelector('tfoot td.pc').textContent;out.sum29=g('3.0.0b29').querySelector('tfoot td.pc').textContent;
  const c=document.querySelector('#board .rtab tr[data-nr="E-101"]').children[idx];out.align=getComputedStyle(c).textAlign;
  out.colClass=g('3.0.0b28').querySelectorAll('colgroup col')[idx].className;
  const th=$$('thead th',g('3.0.0b28'))[idx],w0=Math.round(th.getBoundingClientRect().width);
  out.fitsHundred=[...$$('td.pc')].every(td=>td.scrollWidth<=td.clientWidth);
  // sorting by "fertig" (within the groups): highest first, "–" last; the width stays
  th.querySelector('button').click();await sleep(80);
  out.sorted=$$('tbody tr[data-nr]',g('3.0.0b28')).map(t=>t.dataset.nr).join(',');
  out.widthKept=Math.round($$('thead th',g('3.0.0b28'))[idx].getBoundingClientRect().width)===w0;
  out.writes=CALLS.length;
});
