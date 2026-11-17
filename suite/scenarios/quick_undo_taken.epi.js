scenario(async out=>{
  const S=__DB.store,card=nr=>document.querySelector('#board details[data-nr="'+nr+'"]'),doc=nr=>S.get('entscheidungen/'+nr);
  const tap=async(nr,re)=>{const d=await until(()=>card(nr));d.open=true;await sleep(40);const b=findBtn('.quick button',re,card(nr));if(b)b.click()};
  const u=()=>document.getElementById('undo'),ut=()=>(u().querySelector('.utext')||{}).textContent||null,undoBtn=()=>findBtn('#undo button',/^Rückgängig$/);
  // Claude takes the card over within the ten seconds
  await tap('E-671',/^Option 1/);await until(()=>doc('E-671').blatt==='entschieden'&&undoBtn());await sleep(100);
  __DB.external('entscheidungen/E-671',{blatt:'arbeit',wartet:'',fertig_pct:10,tokens_prognose:200000});await sleep(100);
  const n0=CALLS.length;undoBtn().click();await until(()=>(doc('E-671').kommentare||[]).length===2);await sleep(200);
  const a=doc('E-671');out.taken=[a.blatt,a.wartet,a.entscheidung,a.fertig_pct].join('|');
  out.takenMessages=a.kommentare.map(k=>k.von+': '+k.text);out.takenSend=CALLS.slice(n0).filter(c=>c.startsWith('SEND')).length;out.takenLine=ut();
  await sleep(3500);
  // "Gelesen", and Claude moves the card meanwhile: nothing is taken back
  await tap('E-673',/^Gelesen/);await until(()=>doc('E-673').blatt==='erledigt'&&undoBtn());await sleep(100);
  __DB.external('entscheidungen/E-673',{blatt:'pruefen'});await sleep(100);
  undoBtn().click();await sleep(300);out.gelesen=[doc('E-673').blatt,typeof doc('E-673').gelesen].join('|');out.gelesenLine=ut();
  await sleep(3500);
  // no takeover: the fields as they stood; fields the card did not have come back as "" (status stays as written)
  await tap('E-674',/^Jetzt machen/);await until(()=>doc('E-674').blatt==='entschieden'&&undoBtn());await sleep(100);
  undoBtn().click();await until(()=>doc('E-674').blatt==='offen');await sleep(200);
  const c=doc('E-674');out.shape=JSON.stringify({entscheidung:c.entscheidung,status:c.status,wartet:c.wartet});
});
