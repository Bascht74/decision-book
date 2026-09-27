scenario(async out=>{
  const head=nr=>document.querySelector('#board details[data-nr="'+nr+'"] summary');
  await until(()=>head('E-701'));
  const chips=nr=>[...head(nr).querySelectorAll('.dep')];
  out.on701=chips('E-701').map(b=>b.textContent);out.marked701=chips('E-701').map(b=>b.classList.contains('open'));
  out.blocked702=chips('E-702').map(b=>b.textContent);
  out.on703=chips('E-703').map(b=>b.textContent);out.marked703=chips('E-703').map(b=>b.classList.contains('open'));
  const d=head('E-701').parentElement,was=d.open;
  chips('E-701')[0].click();await sleep(50);
  out.found=(document.querySelector('.found-head')||{}).textContent||'';
  out.foundCard=[...document.querySelectorAll('#board details')].map(x=>x.dataset.nr);
  out.writes=CALLS.length;
});
