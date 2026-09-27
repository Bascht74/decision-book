scenario(async out=>{
  const ta=await until(()=>document.getElementById('g-g1'));
  typeIn(ta,'Wichtige Frage');
  const send=findBtn('[data-g="g1"] .row .act',/^Senden/);
  send.click();out.fieldEmptyAtOnce=ta.value;
  const note=ta.parentNode.querySelector('.row .saved');
  await until(()=>/Nicht gesendet/.test(note.textContent));
  const f=document.getElementById('g-g1');
  out.fieldAfterFailure=f.value;out.note=note.textContent;
  out.draft=localStorage.getItem('eb-draft:t:g:g1');
  out.sendEnabledAgain=!findBtn('[data-g="g1"] .row .act',/^Senden/).disabled;
  out.messagesInDb=__DB.store.get('gespraech/g1').nachrichten.length;
});
