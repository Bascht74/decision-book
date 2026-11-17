scenario(async out=>{
  const card=nr=>document.querySelector('#board details[data-nr="'+nr+'"]'),vis=e=>!!e&&e.getClientRects().length>0;
  await until(()=>card('E-651')&&card('E-653'));await sleep(150);
  const open=()=>$$('#board details[data-nr]').filter(d=>d.open).map(d=>d.dataset.nr);
  out.openOffen=open();out.recommendShown=$$('#board .quick button').filter(b=>vis(b)&&/^Wie empfohlen/.test(b.textContent)).length;
  out.oldKey=localStorage.getItem('eb-open');
  for(const t of [/^Prüfen/,/^Hinweise/]){const b=findBtn('#tabs button',t);if(b){b.click();await sleep(60)}out[t.source.slice(1)]=open()}
  // what he opens now is kept, under the new key
  const b=findBtn('#tabs button',/^Offen/);if(b){b.click();await sleep(60)}
  card('E-652').querySelector('summary').click();await sleep(60);
  out.kept=JSON.parse(localStorage.getItem('eb-klapp')||'[]').filter(x=>x[1]).map(x=>x[0]);
});
