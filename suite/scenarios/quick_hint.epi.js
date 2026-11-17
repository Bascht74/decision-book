scenario(async out=>{
  const S=__DB.store,card=nr=>document.querySelector('#board details[data-nr="'+nr+'"]'),doc=nr=>S.get('entscheidungen/'+nr);
  const open=async nr=>{const d=await until(()=>card(nr));d.open=true;await sleep(40);return card(nr)};
  const labels=d=>$$('.quick button',d).map(b=>b.textContent);
  const tap=(d,sel,re)=>{const b=findBtn(sel,re,d);if(b)b.click()};
  const line=()=>(document.querySelector('#undo .utext')||{}).textContent||null,sendsFrom=n=>CALLS.slice(n).filter(c=>c.startsWith('SEND'));
  out.hinweis=labels(await open('E-631'));out.aufgabe=labels(await open('E-633'));
  const n0=CALLS.length;
  tap(card('E-631'),'.quick button',/^Nein/);await until(()=>doc('E-631').blatt==='verworfen');await sleep(200);
  const a=doc('E-631');out.nein=[a.entscheidung,a.status,a.blatt,a.wartet].join('|');
  out.neinSend=sendsFrom(n0).map(c=>JSON.parse(c.slice(5)).text);out.neinMessage=a.kommentare.map(k=>k.von+': '+k.text);
  // "Gelesen" in the row under the text
  const n1=CALLS.length;
  tap(await open('E-632'),'.quick button',/^Gelesen/);await until(()=>doc('E-632').blatt==='erledigt');await sleep(200);
  const b=doc('E-632');out.gelesen=[b.blatt,b.wartet,typeof b.gelesen,(b.kommentare||[]).length].join('|');
  out.gelesenSends=sendsFrom(n1).length;out.undoText=line();
  tap(document,'#undo button',/^Rückgängig$/);await until(()=>doc('E-632').blatt==='offen');await sleep(200);
  const c=doc('E-632');out.undone=[c.blatt,c.wartet,c.gelesen,(c.kommentare||[]).length].join('|');out.undoneGelesen=JSON.stringify(c.gelesen);out.undoSends=sendsFrom(n1).length;
  // an Aufgabe: "Erledigt" stamps erledigt_am
  tap(await open('E-633'),'.quick button',/^Erledigt/);await until(()=>doc('E-633').blatt==='erledigt');await sleep(100);
  out.erledigt=[doc('E-633').blatt,typeof doc('E-633').erledigt_am].join('|');
  tap(await open('E-634'),'.answer .act',/^Gelesen/);await until(()=>doc('E-634').blatt==='erledigt');await sleep(100);
  out.lower=[doc('E-634').blatt,typeof doc('E-634').gelesen,line()].join('|');
});
