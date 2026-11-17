scenario(async out=>{
  if(window.WANT==='dark'&&!matchMedia('(prefers-color-scheme: dark)').matches){out._skip='this Chrome does not emulate prefers-color-scheme: dark';return}
  const card=nr=>document.querySelector('#board details[data-nr="'+nr+'"]'),vis=e=>!!e&&e.getClientRects().length>0;
  await until(()=>card('E-801'));await sleep(150);
  const low=[],over=[];let n=0;
  const take=where=>{
    for(const e of $$('.proj,.flags .flag,.quick button,.kopie h3,.kopie textarea,.kopie button,.hintq,.hint,#auftrag textarea,#auftrag-senden,#undo .utext,#undo button')){if(!vis(e))continue;n++;
      const c=ratio(rgbaOf(getComputedStyle(e).color),groundOf(e));if(c<4.5)low.push(where+': '+(e.className||e.id||e.tagName)+' '+e.textContent.trim().slice(0,14)+' '+c)}
    for(const x of sticksOut())over.push(where+': '+JSON.stringify(x).slice(0,80));
    const u=document.getElementById('undo');if(vis(u)){const r=u.getBoundingClientRect();if(r.left<0||r.right>innerWidth)over.push(where+': undo '+Math.round(r.left)+'..'+Math.round(r.right))}
    if(document.scrollingElement.scrollWidth>innerWidth)over.push(where+': page '+document.scrollingElement.scrollWidth)};
  // closed cards: the head only; the first card stands right under the order field
  out.firstTop=Math.round(card('E-801').getBoundingClientRect().top);out.ready=vis(document.getElementById('ready'));
  take('zu');
  card('E-801').open=true;await sleep(60);take('Offen');
  const tb=findBtn('#tabs button',/^Hinweise/);if(tb){tb.click();await sleep(60)}
  for(const nr of ['E-802','E-803'])if(card(nr))card(nr).open=true;await sleep(60);
  const hq=$$('.hintq').find(vis);if(hq){hq.click();await sleep(30)}
  take('Hinweise');
  const g=card('E-803')&&findBtn('.quick button',/^Gelesen/,card('E-803'));if(g)g.click();
  await until(()=>vis(document.getElementById('undo')));await sleep(60);take('Rückgängig');
  out.checked=n;out.low=low;out.over=over;
});
