scenario(async out=>{
  await sleep(200);out.innerWidth=innerWidth;
  const over=[],bad=[],seen={};
  const chk=name=>{const sw=document.scrollingElement.scrollWidth;if(sw>innerWidth)over.push(name+' '+sw+'>'+innerWidth);
    for(const p of $$('.pct')){if(!p.getClientRects().length)continue;const box=p.closest('summary')||p.closest('li'),a=p.getBoundingClientRect(),b=box.getBoundingClientRect(),pr=parseFloat(getComputedStyle(box).paddingRight);
      const key=(box.closest('[data-nr]')||box).dataset.nr||box.dataset.auftrag;seen[key]=p.textContent;
      const lh=parseFloat(getComputedStyle(p).fontSize)*1.7;
      if(Math.abs(b.right-pr-a.right)>1)bad.push(key+' not right '+Math.round(b.right-pr-a.right));
      if(a.height>lh)bad.push(key+' wraps '+Math.round(a.height));
      if(a.right>innerWidth)bad.push(key+' past the screen '+Math.round(a.right))}};
  chk('Für Dich');const tabs=()=>$$('#tabs button').filter(b=>b.getClientRects().length).map(b=>b.textContent);
  for(const t of tabs()){const b=$$('#tabs button').find(x=>x.textContent===t);if(b){b.click();await sleep(50);chk('Für Dich tab '+t)}}
  await goView('Bei Claude');for(const b of $$('#tabs button')){b.click();await sleep(30);chk('Bei Claude tab '+b.textContent)}
  await goView('Aufträge');chk('Aufträge');
  out.overflowing=over;out.bad=bad;out.seen=seen;
});
