scenario(async out=>{
  const T0=Date.now();const live=document.getElementById('live');
  await until(()=>/^live/.test(live.textContent),15000);out.msUntilLive=Date.now()-T0;out.cardsShown=$$('#views button .n')[0].textContent;
  typeIn(document.getElementById('auftrag-text'),'Frage gleich am Anfang');document.getElementById('auftrag-senden').click();
  await until(()=>[...__DB.store.keys()].some(k=>k.startsWith('gespraech/')),3000);out.msUntilOrderStored=Date.now()-T0;
  await until(()=>!/sendet/.test(document.getElementById('auftrag-note').textContent));out.note=document.getElementById('auftrag-note').textContent;
});
