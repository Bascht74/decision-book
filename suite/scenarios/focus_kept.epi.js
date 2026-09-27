scenario(async out=>{
  // a card's body is built when it is opened
  const ta=await until(()=>{const d=document.querySelector('details[data-nr="E-720"]');if(d)d.open=true;return document.getElementById('ans-E-720')});ta.closest('details').open=true;
  ta.focus();ta.value='Meine Antwort';ta.dispatchEvent(new Event('input'));ta.setSelectionRange(3,5);
  const c=__DB.store.get('entscheidungen/E-720');
  __DB.external('entscheidungen/E-720',{kommentare:[...c.kommentare,{von:'Claude',text:'NEUE RUECKFRAGE',zeit:'2026-09-27T08:00:00.000Z'}],wartet:'Dich'});
  __DB.external('entscheidungen/E-721',{ueberschrift:'Nachbar neu'});await sleep(300);
  out.focusKept=document.activeElement===ta;out.sameNode=document.getElementById('ans-E-720')===ta;out.value=ta.value;out.selection=[ta.selectionStart,ta.selectionEnd];
  ta.blur();await sleep(100);
  out.afterLeavingShowsQuestion=document.querySelector('details[data-nr="E-720"]').textContent.includes('NEUE RUECKFRAGE');
  out.neighbourUpdated=document.querySelector('details[data-nr="E-721"] .head').textContent;
  out.valueAfterRebuild=document.getElementById('ans-E-720').value;
});
