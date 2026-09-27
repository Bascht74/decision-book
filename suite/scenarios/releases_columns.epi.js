scenario(async out=>{
  await until(()=>document.querySelector('#board .rtab'));await sleep(100);
  const g=z=>document.querySelector('#board .relgrp[data-rel="'+z+'"]');
  const xs=z=>$$('thead th',g(z)).map(th=>{const r=th.getBoundingClientRect();return Math.round(r.left)+':'+Math.round(r.width)}).join(',');
  const open0=xs('3.0.0b28');
  // the owner's case: every group of the release shut (no row with a headline), then one opened
  {let t;while((t=document.querySelector('#board .relgrp[data-rel="3.0.0b28"] tr.sgrp[aria-expanded="true"]'))){t.click();await sleep(40)}}
  const before=xs('3.0.0b28');out.before=before;out.allShutSame=before===open0;out.sameInNext=xs('3.0.0b29')===before;
  document.querySelector('#board .relgrp[data-rel="3.0.0b28"] tr.sgrp[data-stand="erledigt"]').click();await sleep(80);
  out.afterGroup=xs('3.0.0b28')===before;
  document.querySelector('#board .relgrp[data-rel="3.0.0b28"] tr.sgrp[data-stand="entschieden"]').click();await sleep(80);
  document.querySelector('#board .rtab tr[data-nr="E-004"]').click();await sleep(120);
  out.cardOpen=$$('#board tr.gfull').length;out.afterCard=xs('3.0.0b28')===before;
  document.querySelector('#board .rtab tr[data-nr="E-003"]').click();await sleep(120);out.afterSecondCard=xs('3.0.0b28')===before;
  $$('thead button',g('3.0.0b28')).find(b=>b.textContent.startsWith('verbraucht')).click();await sleep(80);out.afterSort=xs('3.0.0b28')===before;
  document.querySelector('#board .relgrp[data-rel="3.0.0b28"] tr.sgrp[data-stand="entschieden"]').click();await sleep(80);out.afterShut=xs('3.0.0b28')===before;
  out.sameInNextAfter=xs('3.0.0b29')===before;
  // the headline takes the rest: its column is wider than all the fixed ones together
  const th=$$('thead th',g('3.0.0b28')),w=i=>th[i].getBoundingClientRect().width;
  out.titleWiderThanRest=w(1)>th.reduce((a,x,i)=>a+(i===1?0:w(i)),0);
  out.fixed=getComputedStyle(g('3.0.0b28').querySelector('table')).tableLayout;
  out.pageOverflow=document.scrollingElement.scrollWidth>innerWidth;
});
