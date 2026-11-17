scenario(async out=>{
  const S=__DB.store,card=nr=>document.querySelector('#board details[data-nr="'+nr+'"]'),doc=nr=>S.get('entscheidungen/'+nr);
  const tap=async(nr,re)=>{const d=await until(()=>card(nr));d.open=true;await sleep(40);const b=findBtn('.quick button',re,card(nr));if(b)b.click()};
  const u=()=>document.getElementById('undo'),ut=()=>(u().querySelector('.utext')||{}).textContent||null;
  await tap('E-611',/^Option 2/);await until(()=>doc('E-611').blatt==='entschieden'&&!u().hidden);await sleep(100);
  out.sent=[doc('E-611').entscheidung,doc('E-611').blatt,doc('E-611').wartet].join('|');
  const n0=CALLS.length,ub=findBtn('#undo button',/^Rückgängig$/);if(ub)ub.click();
  await until(()=>doc('E-611').blatt==='offen');await sleep(300);
  const d=doc('E-611');
  out.back=[d.entscheidung,d.blatt,d.status,d.wartet].join('|');
  out.kommentare=d.kommentare.map(k=>k.von+': '+k.text+(k.live?' (live)':''));
  out.takeBack=CALLS.slice(n0).filter(c=>c.startsWith('SEND')).map(c=>{const x=JSON.parse(c.slice(5));return (x.threadId===d.thread?'thread':'no thread')+' '+x.text});
  out.undoWrites=CALLS.slice(n0).filter(c=>/^update entscheidungen\/E-611/.test(c)).length;
  const c=card('E-611');out.cardBack=c?c.closest('section.col').getAttribute('aria-label')+'|'+(c.open?'open':'closed'):'gone';
  out.lineAfter=ut();
  await sleep(3500);out.lineGone=u().hidden;
  // no tap on "Rückgängig": the line goes after ten seconds, the answer stands
  await tap('E-612',/^Später/);await until(()=>doc('E-612').blatt==='vorrat'&&!u().hidden);await sleep(100);
  out.later=ut();await sleep(5000);out.stillAt5s=!u().hidden;await sleep(6000);out.goneAt11s=u().hidden;
  out.stands=[doc('E-612').blatt,doc('E-612').ziel,doc('E-612').wartet,(doc('E-612').kommentare.slice(-1)[0]||{}).text].join('|');
});
