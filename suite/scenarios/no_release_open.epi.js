scenario(async out=>{
  await until(()=>document.querySelector('#board .relgrp')&&!document.getElementById('waits').hidden);await sleep(150);
  const views=()=>$$('#views button').map(b=>b.querySelector('.lng').textContent).join(',');
  out.whileOpen=views();out.selected=(document.querySelector('#views [aria-selected="true"] .lng')||{}).textContent||null;
  out.group=$$('#board .relgrp').map(s=>s.dataset.rel).join(',');
  await goView('Für Dich');await sleep(50);out.afterLeaving=views();
});
