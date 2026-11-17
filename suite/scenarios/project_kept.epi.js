scenario(async out=>{
  const nrs=()=>$$('#board details[data-nr]').map(d=>d.dataset.nr).sort().join(',');
  await until(()=>document.querySelector('#board details[data-nr]'));await sleep(50);
  const pressed=()=>$$('#filter .pgrp button').filter(b=>b.getAttribute('aria-pressed')==='true').map(b=>b.firstChild.textContent).join(',');
  out.atLoad=nrs()+'|'+pressed();out.badge=document.getElementById('waits').textContent;
  // the project goes from the book: nothing is hidden, the choice stays remembered
  __DB.external('entscheidungen/E-672',{projekt:'Solar'});await sleep(50);
  out.gone=nrs()+'|'+pressed();let k=null;try{k=localStorage.getItem('eb-proj')}catch(e){}out.kept=k;
  // no card carries a project: no group at all
  for(const n of ['E-671','E-672'])__DB.external('entscheidungen/'+n,{projekt:''});await sleep(50);
  out.noGroup=!document.querySelector('#filter .pgrp');out.pills=$$('#board .proj').length;out.groups=$$('#filter .fgrp').length;
});
