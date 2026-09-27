scenario(async out=>{
  const n=()=>CALLS.filter(c=>c.startsWith('SEND')).length;
  const ta=await until(()=>document.getElementById('g-g1'));
  typeIn(ta,'Text im Gespraech');
  document.activeElement.blur();press(document.body,'Enter',{metaKey:true});await sleep(300);out.bodyCmdEnter=n();
  const gs=document.getElementById('gsuche');gs.focus();press(gs,'Enter',{metaKey:true});await sleep(300);out.searchCmdEnter=n();
  const top=document.getElementById('auftrag-text');top.focus();press(top,'Enter',{metaKey:true});await sleep(300);out.emptyTopFieldCmdEnter=n();
  ta.focus();press(ta,'Enter');await sleep(300);out.plainEnterInField=n();
  press(ta,'Enter',{metaKey:true});await sleep(600);out.talkFieldCmdEnter=n();
  await goView('Bei Claude');
  const ca=await until(()=>{const d=document.querySelector('details[data-nr="E-711"]');if(d)d.open=true;return document.getElementById('ans-E-711')}); // body built on openingca.closest('details').open=true;
  typeIn(ca,'Text an der Karte');
  document.activeElement.blur();press(document.body,'Enter',{ctrlKey:true});await sleep(300);out.bodyCtrlEnter=n();
  ca.focus();press(ca,'Enter',{ctrlKey:true});await sleep(600);out.cardFieldCtrlEnter=n();
  out.last=(CALLS.filter(c=>c.startsWith('SEND')).slice(-1)[0]||'').slice(0,80);
});
