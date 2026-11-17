scenario(async out=>{
  await until(()=>document.querySelector('#board details[data-nr="E-912"]'));
  const col=k=>document.querySelector('#board section.col[aria-label="'+k+'"]');
  const seq=k=>$$('.lane,details[data-nr]',col(k)).map(e=>e.matches('.lane')?'['+(e.matches('.fold')?e.childNodes[1]:e.firstChild).textContent+']':e.dataset.nr).join(',');
  out.offen=seq('Offen');out.pruefen=seq('Prüfen');
});
