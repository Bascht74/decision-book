scenario(async out=>{
  await until(()=>document.querySelector('#board .rtab'));await sleep(150);
  out.shortLabel=$$('#views button')[0].querySelector('.sht').textContent;
  const vis=e=>e.getClientRects().length>0;
  out.hiddenCols=$$('#board .rtab thead th').slice(0,8).filter(t=>!vis(t)).length;
  out.shownHeads=$$('#board .relgrp[data-rel="3.0.0b28"] thead th').filter(vis).map(t=>t.textContent.replace(/[↓↑]/g,'').trim()).join(',');
  // the headline keeps its width when a card opens below its row (a span over the hidden columns used to squeeze it)
  const hw=()=>Math.round(document.querySelector('#board .relgrp[data-rel="3.0.0b28"] thead th:nth-child(2)').getBoundingClientRect().width);
  const hw0=hw();
  document.querySelector('#board .rtab tr[data-nr="E-001"]').click();await sleep(100);
  out.titleWidthKept=hw()===hw0&&hw0>=80;out.titleWidth=hw();
  {const s=document.querySelector('#board .rtab tr[data-nr="E-004"] select.mvsel');s.focus();await sleep(40);const r=s.getBoundingClientRect();out.selectInside=r.left>=0&&r.right<=innerWidth&&r.height>=31.5}
  out.overflow=document.scrollingElement.scrollWidth>innerWidth;
  const setb=document.getElementById('setbtn');out.setIcon=setb.innerText.trim();out.setLabel=setb.getAttribute('aria-label');
});
