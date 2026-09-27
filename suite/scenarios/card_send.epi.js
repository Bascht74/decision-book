scenario(async out=>{
  // a card's body is built when it is opened
  const ta=await until(()=>{const d=document.querySelector('details[data-nr="E-701"]');if(d)d.open=true;return document.getElementById('ans-E-701')});
  ta.closest('details').open=true;
  typeIn(ta,'Bitte so umsetzen');
  const b=findBtn('details[data-nr="E-701"] .answer .act',/^Senden/);
  out.buttonEnabled=!b.disabled;
  b.click();
  await until(()=>CALLS.some(c=>c.startsWith('update entscheidungen/E-701')));await sleep(300);
  out.sends=CALLS.filter(c=>c.startsWith('SEND')).map(c=>JSON.parse(c.slice(5)).text);
  out.writes=CALLS.filter(c=>/entscheidungen\/E-701/.test(c)).length;
  out.reReadBeforeWrite=READS.includes('entscheidungen/E-701');
  const d=__DB.store.get('entscheidungen/E-701');
  out.kommentare=d.kommentare.map(k=>k.von+': '+k.text);
  out.lastLive=d.kommentare.slice(-1)[0].live;out.wartet=d.wartet;out.blatt=d.blatt;out.threadSaved=!!d.thread;
  const f=document.getElementById('ans-E-701');out.fieldAfter=f&&f.value;
  out.draftText=JSON.parse(localStorage.getItem('eb-draft:t:ans:E-701')||'""');
  out.otherCardUntouched=!CALLS.some(c=>/E-702/.test(c));
});
