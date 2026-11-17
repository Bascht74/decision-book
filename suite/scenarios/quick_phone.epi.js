scenario(async out=>{
  const S=__DB.store,card=nr=>document.querySelector('#board details[data-nr="'+nr+'"]'),doc=nr=>S.get('entscheidungen/'+nr);
  const sends=()=>CALLS.filter(c=>c.startsWith('SEND')).length,shown=e=>!!e&&e.getClientRects().length>0;
  const tap=(d,re)=>{const b=findBtn('.quick button',re,d);if(b)b.click()};
  const d=await until(()=>card('E-621'));d.open=true;await sleep(60);
  out.pasteHint=/⌘V|Strg\+V/.test(d.querySelector('.answer label').textContent);
  tap(d,/^Wie empfohlen/);await until(()=>doc('E-621').blatt==='entschieden');await sleep(200);
  out.sendsAfterTap=sends();const k=doc('E-621').kommentare.slice(-1)[0]||{};out.message=k.von+': '+k.text+'|'+k.live;
  out.undoShown=!document.getElementById('undo').hidden;
  const ub=findBtn('#undo button',/^Rückgängig$/);if(ub)ub.click();await until(()=>doc('E-621').blatt==='offen');await sleep(200);
  out.sendsAfterUndo=sends();out.afterUndo=doc('E-621').kommentare.map(x=>x.text+'|'+x.live);
  const h=await until(()=>card('E-622'));h.open=true;await sleep(60);
  tap(card('E-622'),/^Jetzt machen/);await until(()=>doc('E-622').blatt==='entschieden');await sleep(200);
  out.hint=[doc('E-622').entscheidung,doc('E-622').status,doc('E-622').wartet,sends()].join('|');
  // the order field under "Für Dich": written, not sent; the note "Senden schließt" is not shown there
  const ta=document.getElementById('auftrag-text'),x=document.querySelector('#auftrag .extern');
  out.externHere=shown(x);
  typeIn(ta,'Bitte Angebot prüfen');document.getElementById('auftrag-senden').click();
  await until(()=>[...S.keys()].some(k=>k.startsWith('gespraech/')));await sleep(200);
  const g=S.get([...S.keys()].find(k=>k.startsWith('gespraech/')))||{nachrichten:[{}]};
  out.order=g.nachrichten[0].text+'|'+g.nachrichten[0].live+'|'+g.wartet;out.sendsAfterOrder=sends();
  out.orderNote=document.getElementById('auftrag-note').textContent;
  // under "Aufträge" the same field still goes live, and says that sending closes the book
  await goView('Aufträge');await sleep(50);out.externThere=shown(x);
  const s0=sends();typeIn(ta,'Jetzt live');document.getElementById('auftrag-senden').click();await until(()=>sends()>s0);await sleep(200);out.sendsLive=sends()-s0;
});
