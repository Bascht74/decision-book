scenario(async out=>{
  const ta=await until(()=>{const d=document.querySelector('details[data-nr="E-701"]');if(d)d.open=true;return document.getElementById('ans-E-701')});
  typeIn(ta,'Nur einmal bitte');
  const b=findBtn('details[data-nr="E-701"] .answer .act',/^Senden/);
  b.click();await sleep(50);
  ta.dispatchEvent(new KeyboardEvent('keydown',{key:'Enter',metaKey:true,ctrlKey:true,bubbles:true}));
  b.disabled=false;b.click();
  await until(()=>CALLS.some(c=>c.startsWith('update entscheidungen/E-701')));await sleep(700);
  out.sends=CALLS.filter(c=>c.startsWith('SEND')).length;
  out.messages=(__DB.store.get('entscheidungen/E-701').kommentare||[]).map(k=>k.text);
});
