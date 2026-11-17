scenario(async out=>{
  const S=__DB.store,card=nr=>document.querySelector('#board details[data-nr="'+nr+'"]'),doc=nr=>S.get('entscheidungen/'+nr);
  const labels=nr=>$$('.quick button',card(nr)).map(b=>b.textContent);
  const tap=(nr,re)=>{const b=card(nr)&&findBtn('.quick button',re,card(nr));if(b)b.click();return !!b};
  await until(()=>card('E-601')&&card('E-605'));await sleep(100);
  // closed: the head only -- no answer row, no "Wie empfohlen"
  out.closedHasRow=!!card('E-601').querySelector('.quick')||!!findBtn('#board button',/^Wie empfohlen/);
  for(const n of ['E-601','E-602','E-603','E-605'])card(n).open=true;await sleep(60);
  out.buttons=labels('E-601');out.noRec=labels('E-602');out.recNoOption=labels('E-603');
  out.primary=$$('.quick button',card('E-601')).filter(b=>!b.classList.contains('ghost')).map(b=>b.textContent);
  // the row stands right under the recommendation, above the fields and the history
  const q=card('E-601').querySelector('.quick'),f=card('E-601').querySelector('.fields'),rec=card('E-601').querySelector('.rec');
  out.rowPlace=q&&f&&rec?[!!(rec.compareDocumentPosition(q)&4),!!(q.compareDocumentPosition(f)&4)]:null;
  out.label=card('E-601').querySelector('.answer label').textContent.replace(/ · Bilder.*$/,'');
  await goView('Bei Claude');const w=await until(()=>card('E-604'));w.open=true;await sleep(40);out.notOffen=labels('E-604');
  await goView('Für Dich');await until(()=>card('E-601')&&card('E-601').querySelector('.quick'));
  const n0=CALLS.length;
  tap('E-601',/^Wie empfohlen/);
  await until(()=>CALLS.slice(n0).some(c=>c.startsWith('update entscheidungen/E-601')));await sleep(300);
  out.sends=CALLS.slice(n0).filter(c=>c.startsWith('SEND')).map(c=>JSON.parse(c.slice(5)).text);
  out.writes=CALLS.slice(n0).filter(c=>/^update entscheidungen\/E-601/.test(c)).length;
  const d=doc('E-601');out.doc=[d.entscheidung,d.blatt,d.status,d.wartet].join('|');
  out.kommentare=d.kommentare.map(k=>k.von+': '+k.text);out.lastLive=d.kommentare.slice(-1)[0].live;out.threadSaved=!!d.thread;
  out.left=!card('E-601');
  const u=document.getElementById('undo');out.undoShown=!u.hidden;out.undoText=(u.querySelector('.utext')||{}).textContent||null;out.undoBtn=!!findBtn('#undo button',/^Rückgängig$/);
  // a recommendation without an option number answers "Wie empfohlen"; an option button answers with its option
  tap('E-603',/^Wie empfohlen/);await until(()=>doc('E-603').blatt==='entschieden');await sleep(100);out.plain=doc('E-603').entscheidung||null;
  tap('E-602',/^Option 1/);await until(()=>doc('E-602').blatt==='entschieden');await sleep(100);
  out.option=doc('E-602').entscheidung||null;out.undoLater=(document.querySelector('#undo .utext')||{}).textContent||null;
  // "Erklär es einfacher" is only a message: the card stays under "Offen" and waits for Claude
  tap('E-605',/^Erklär es einfacher/);await until(()=>doc('E-605').wartet==='Claude');await sleep(100);
  const e=doc('E-605');out.explain=[e.blatt,e.wartet,e.entscheidung||'',(e.kommentare.slice(-1)[0]||{}).text].join('|');
});
