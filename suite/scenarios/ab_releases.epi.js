scenario(async out=>{
  await until(()=>document.querySelector('#board .relgrp'));await sleep(150);
  out.groups=$$('#board .relgrp').map(s=>s.dataset.rel).join(',');
  out.hint=(document.getElementById('rel-closed')||{}).textContent||null;
  out.moveChoices=[...(document.querySelector('#board .rtab tr[data-nr="E-102"] select.mvsel')||{options:[]}).options].map(o=>o.value).join(',');
});
