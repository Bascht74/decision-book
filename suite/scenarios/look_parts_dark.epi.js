scenario(async out=>{
  if(!matchMedia('(prefers-color-scheme: dark)').matches){out._skip='this Chrome does not emulate prefers-color-scheme: dark';return}
  await until(()=>document.querySelector('#board .col details'));await sleep(100);
  const col=document.querySelector('#board .col'),card=col.querySelector('details');
  const colBelow=lumOf(groundOf(col))<lumOf(groundOf(card));
  await goView('Releases');await sleep(50);
  const sg=document.querySelector('#board .atab.rtab tr.sgrp>td'),td=document.querySelector('#board .atab.rtab tbody tr[data-nr]>td');
  out.surfaces=[colBelow,sg&&td?lumOf(groundOf(sg))>lumOf(groundOf(td)):'none'];
});
