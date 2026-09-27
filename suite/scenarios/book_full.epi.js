scenario(async out=>{
  const at=await until(()=>document.getElementById('auftrag-text'));await until(()=>/^live/.test(document.getElementById('live').textContent));
  typeIn(at,'Neuer Auftrag');document.getElementById('auftrag-senden').click();await until(()=>CALLS.some(c=>c.startsWith('QUOTA')));await sleep(300);
  out.orderNote=document.getElementById('auftrag-note').textContent;out.orderFieldKept=document.getElementById('auftrag-text').value;
  out.markedFull=!!(__DB.store.get('meta/stand')||{}).buch_voll;
  out.statsSay=(document.querySelector('#stats .bookfull')||{}).textContent||null;
  const ta=document.getElementById('g-g1');typeIn(ta,'Antwort im alten Gespräch');ta.parentNode.querySelector('.row .act').click();await sleep(600);
  out.replyStored=__DB.store.get('gespraech/g1').nachrichten.length;
  out.replyNote=ta.parentNode.querySelector('.row .saved')?ta.parentNode.querySelector('.row .saved').textContent:null;
  out.standMarks=CALLS.filter(c=>c.startsWith('update meta/stand')).length;
});
