scenario(async out=>{
  const d=await until(()=>document.querySelector('#board details[data-nr="E-910"]'));d.open=true;
  const g=findBtn('details[data-nr="E-910"] button.act',/^Gelesen/);out.buttonEnabled=!g.disabled;
  const c0=CALLS.length;g.click();await sleep(400);
  out.asked=!!document.querySelector('input[id^="tk-"]')||!!document.querySelector('.tokask:not([hidden])');
  const w=CALLS.slice(c0).filter(c=>/E-910/.test(c));out.writes=w.length;
  const x=__DB.store.get('entscheidungen/E-910');out.blatt=x.blatt;out.tokenFehlt=x.token_fehlt;out.gesichtet=!!x.gesichtet;out.wartet=x.wartet;
  out.stillOnBoard=!!document.querySelector('#board details[data-nr="E-910"]');
});
