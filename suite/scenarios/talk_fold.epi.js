scenario(async out=>{
  await until(()=>$$('#gespraech .ghead').length===3);
  const heads=()=>Object.fromEntries($$('#gespraech .gsp[data-g]').map(g=>[g.dataset.g,(g.querySelector('.ghead')||{}).textContent]));
  const bubs=id=>$$('#gespraech [data-g="'+id+'"] .bub').length;
  out.heads=heads();out.g2FoldedFromStore=bubs('g2');out.g2HasField=!!document.getElementById('g-g2');out.g1Bubbles=bubs('g1');
  document.querySelector('#gespraech [data-g="g1"] .ghead .tgl').click();await sleep(50);
  out.g1AfterFold=bubs('g1');out.g1Field=!!document.getElementById('g-g1');out.stored=JSON.parse(localStorage.getItem('eb-gfold')).sort();
  out.g1Toggle=document.querySelector('#gespraech [data-g="g1"] .tgl').getAttribute('aria-expanded');
  __DB.external('gespraech/g3',{wartet:''});await sleep(100);out.g1StillFoldedAfterSnapshot=bubs('g1');
  document.querySelector('#gespraech [data-g="g2"] .ghead .tgl').click();await sleep(50);
  out.g2AfterUnfold=bubs('g2');out.stored2=JSON.parse(localStorage.getItem('eb-gfold')).sort();
});
