scenario(async out=>{
  const d=await until(()=>{const d=document.querySelector('details[data-nr="E-701"]');if(d)d.open=true;return d&&d.querySelector('.ktalk')&&d});
  const bt=d.querySelector('.ktalk .donebtn');if(bt.getAttribute('aria-expanded')!=='true')bt.click();await sleep(100);
  const over=[];const chk=n=>{const sw=document.scrollingElement.scrollWidth;if(sw>innerWidth)over.push(n+' '+sw+'>'+innerWidth)};
  chk('card');const boxes=$$('.mdtw').filter(b=>b.getClientRects().length>0);out.cardBoxes=boxes.length;out.where=boxes.map(b=>b.parentElement.className+'/'+b.clientWidth+'/'+b.scrollWidth);
  out.scrollsInside=boxes.map(b=>b.scrollWidth>b.clientWidth+20);
  out.insideScreen=boxes.map(b=>{const r=b.getBoundingClientRect();return r.left>=0&&r.right<=innerWidth+0.5});
  await goView('Aufträge');await sleep(100);chk('talk');
  const g=document.querySelector('[data-g="g1"] .mdtw');out.talkScrollsInside=!!g&&g.scrollWidth>g.clientWidth+20;
  out.overflowing=over;
});
