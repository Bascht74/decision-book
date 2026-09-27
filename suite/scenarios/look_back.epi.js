scenario(async out=>{
  const items=()=>$$('#board details.rueck').map(x=>x.dataset.nr).sort();
  await until(()=>items().length);
  out.items=items();out.question=(document.querySelector('#board details.rueck h3')||{}).textContent||'';
  out.badgeN=Number((/(\d+)/.exec(document.getElementById('waits').textContent)||[])[1]);
  const d=document.querySelector('#board details.rueck[data-nr="E-731"]');
  typeIn(d.querySelector('input'),'Spürbar schneller');
  findBtn('button',/^Nein$/,d).click();
  await until(()=>CALLS.some(c=>c.startsWith('update entscheidungen/E-731')));await sleep(100);
  const w=CALLS.find(c=>c.startsWith('update entscheidungen/E-731'))||'';
  out.stored=/"rueckblick":\{"antwort":"Nein","text":"Spürbar schneller","zeit":"[^"]+"/.test(w);
  out.sent=CALLS.some(c=>c.startsWith('SEND')&&c.includes('E-731')&&c.includes('Rückblick: Nein'));
  document.activeElement&&document.activeElement.blur&&document.activeElement.blur();
  await until(()=>items().length===1);out.itemsAfter=items();
});
