scenario(async out=>{
  const card=nr=>document.querySelector('#board details[data-nr="'+nr+'"]'),doc=nr=>__DB.store.get('entscheidungen/'+nr);
  const d=await until(()=>card('E-651'));await sleep(150);
  let blocked=false;try{localStorage.getItem('x')}catch(e){blocked=true}out.storageBlocked=blocked;
  out.closed=$$('#board details[data-nr]').every(x=>!x.open);
  const sm=d.querySelector('summary');sm.click();await sleep(60);out.opens=d.open&&!!d.querySelector('.quick button');
  sm.click();await sleep(60);out.closes=!d.open;sm.click();await sleep(60);
  // the project filter and the answer work without storage too
  const pb=findBtn('#filter .pgrp button',/^Haus/);if(pb)pb.click();await sleep(60);out.filtered=$$('#board details[data-nr]').map(x=>x.dataset.nr).join(',');
  const b=findBtn('.quick button',/^Option 2/,card('E-651'));if(b)b.click();await until(()=>doc('E-651').blatt==='entschieden');await sleep(150);
  out.answered=[doc('E-651').entscheidung,doc('E-651').blatt].join('|');out.undoShown=!document.getElementById('undo').hidden;
});
