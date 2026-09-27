scenario(async out=>{
  await until(()=>document.querySelector('#board .rtab'));await sleep(100);
  // follow-up: "Erledigt" and "in Arbeit" start shut; open every group first
  {let t;while((t=document.querySelector('#board tr.sgrp[aria-expanded="false"]'))){t.click();await sleep(30)}}
  out.firstView=$$('#views button')[0].querySelector('.lng').textContent;
  out.groups=$$('#board .relgrp').map(s=>s.dataset.rel).join(',');
  const g=z=>document.querySelector('#board .relgrp[data-rel="'+z+'"]');
  const rowsOf=z=>$$('tbody tr[data-nr]',g(z));const col=(z,i)=>rowsOf(z).map(tr=>tr.children[i].textContent);
  out.heads=$$('thead th',g('3.0.0b28')).map(h=>h.textContent.replace(/[↓↑]/g,'').trim());
  out.order=rowsOf('3.0.0b28').map(tr=>tr.dataset.nr).join(',');
  out.stand=col('3.0.0b28',2).join(',');
  out.pct=col('3.0.0b28',3).join('|');out.prog=col('3.0.0b28',4).join('|');out.ist=col('3.0.0b28',5).join('|');out.diffs=col('3.0.0b28',6).join('|');
  out.sum=$$('tfoot td',g('3.0.0b28')).map(t=>t.textContent).join('|');
  out.emptyNext=(g('3.0.0b29')||{textContent:''}).textContent.includes('keine Karten');
  const btn=l=>$$('thead button',g('3.0.0b28')).find(b=>b.textContent.startsWith(l));
  btn('Nr.').click();await sleep(80);out.reversed=rowsOf('3.0.0b28').map(tr=>tr.dataset.nr).join(',');
  btn('Nr.').click();await sleep(80);
  const s=document.getElementById('rf-stand');s.value='offen';s.dispatchEvent(new Event('change'));await sleep(80);
  out.onlyOffen=$$('#board .rtab tbody tr[data-nr]').map(tr=>tr.dataset.nr).join(',');
  out.sumFiltered=$$('tfoot td',g('3.0.0b28')).map(t=>t.textContent).join('|');
  const s2=document.getElementById('rf-stand');s2.value='';s2.dispatchEvent(new Event('change'));await sleep(80);
  rowsOf('3.0.0b28')[0].click();await sleep(100);
  const r0=rowsOf('3.0.0b28')[0],full=r0&&r0.nextElementSibling;
  out.expandedBelow=!!(full&&full.classList.contains('gfull')&&full.querySelector('details[data-nr="E-001"][open]'));
  out.answerField=!!(full&&full.querySelector('#ans-E-001'));out.stillHere=!!document.querySelector('#board .rtab');if(!r0||!out.stillHere)return;
  out.arrow=rowsOf('3.0.0b28')[0].children[0].textContent.trim()[0];
  rowsOf('3.0.0b28')[0].click();await sleep(80);out.closed=$$('#board .rtab tr.gfull details').length;
});
