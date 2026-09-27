scenario(async out=>{
  const sends=()=>CALLS.filter(c=>c.startsWith('SEND')).length;
  const d=await until(()=>document.querySelector('details[data-nr="E-010"]'));d.open=true;
  let ta=document.getElementById('ans-E-010');typeIn(ta,'Antwort A');
  window.__FAIL={update:/entscheidungen\/E-010/};findBtn('details[data-nr="E-010"] .answer .act',/^Senden/).click();await sleep(600);
  out.cardNoteAfterFail=document.querySelector('details[data-nr="E-010"] .answer .saved').textContent;window.__FAIL={};
  findBtn('details[data-nr="E-010"] .answer .act',/^Senden/).click();await sleep(800);
  out.cardSends=sends();const c=__DB.store.get('entscheidungen/E-010');out.cardKommentare=(c.kommentare||[]).filter(k=>k.von!=='Claude').length;out.cardBlatt=c.blatt;
  await goView('Aufträge');ta=await until(()=>document.getElementById('g-g1'));typeIn(ta,'Frage B');
  window.__FAIL={update:/gespraech\/g1/};ta.parentNode.querySelector('.row .act').click();await sleep(600);
  out.talkFieldAfterFail=document.getElementById('g-g1').value;window.__FAIL={};
  document.getElementById('g-g1').parentNode.querySelector('.row .act').click();await sleep(800);
  out.talkSends=sends()-out.cardSends;out.talkMsgs=__DB.store.get('gespraech/g1').nachrichten.length;
  const at=document.getElementById('auftrag-text');typeIn(at,'Neuer Auftrag C');
  window.__FAIL={set:/gespraech\//};document.getElementById('auftrag-senden').click();await sleep(600);
  out.orderFieldAfterFail=document.getElementById('auftrag-text').value;window.__FAIL={};
  document.getElementById('auftrag-senden').click();await sleep(800);
  out.orderSends=sends()-out.cardSends-out.talkSends;out.talks=[...__DB.store.keys()].filter(k=>k.startsWith('gespraech/')).length;
});
