scenario(async out=>{
  await until(()=>document.querySelector('#board .abgrp'));await sleep(100);
  document.getElementById('ab:3.0.0b27').click();await sleep(60);
  document.querySelector('#board .abtab tr[data-nr="E-011"]').click();await sleep(60);
  out.cardShown=!!document.querySelector('#board .abgrp details[data-nr="E-011"]');
  out.restoreBtns=$$('#board .abrow button').length;
  out.line=(document.querySelector('#board .abrow .saved')||{}).textContent;
});
