scenario(async out=>{
  const T0=Date.now();const live=document.getElementById('live');
  await until(()=>/^live/.test(live.textContent),15000);
  out.msUntilLive=Date.now()-T0;out.cardsShown=$$('#board details').length;
});
