scenario(async out=>{
  const s=await until(()=>document.getElementById('suche'));await sleep(100);
  // a redraw empties and refills #board; takeRecords() reads them at once (observer callbacks would only run later)
  let n=0;const cnt=l=>l.filter(r=>r.removedNodes.length).length;const mo=new MutationObserver(l=>{n+=cnt(l)});mo.observe(document.getElementById('board'),{childList:true});const redraws=()=>{n+=cnt(mo.takeRecords());const v=n;n=0;return v};
  out.before=$$('#board .atab tbody tr').length;
  for(const t of ['K','Ka','Kar']){const f=document.getElementById('suche');f.focus();f.value=t;f.setSelectionRange(t.length,t.length);f.dispatchEvent(new Event('input',{bubbles:true}))}
  out.redrawsWhileTyping=redraws();
  await sleep(500);out.redrawsAfterPause=redraws();
  const f=document.getElementById('suche');out.focusInField=document.activeElement===f;out.caret=f.selectionStart;out.value=f.value;
  f.value='Karte 12';f.dispatchEvent(new Event('input',{bubbles:true}));await sleep(500);
  out.hits=$$('#board .atab tbody tr').map(d=>d.dataset.nr).sort();
});
