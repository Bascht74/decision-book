scenario(async out=>{
  await until(()=>document.querySelector('#ready .stepbtn')&&document.querySelector('#board details'));await sleep(100);
  const over=new Set(),chk=w=>{const sw=document.scrollingElement.scrollWidth;if(sw>innerWidth)over.add(w+': page '+sw+'>'+innerWidth);for(const x of sticksOut().slice(0,3))over.add(w+': '+x)};
  chk('Für Dich');
  const cut=()=>$$('#tabs button').filter(b=>b.getClientRects().length&&b.scrollWidth>b.clientWidth+1).map(b=>b.textContent.trim());
  out.tabsCutDich=cut();   // no column tab gives up its text
  // squeezed (more cards, longer names, a larger font): the bar scrolls, still no tab gives up its text
  const bar=document.getElementById('tabs');bar.style.maxWidth='180px';await sleep(30);
  out.tabsSqueezed=[cut(),bar.scrollWidth>bar.clientWidth];bar.style.maxWidth='';await sleep(30);
  // the release steps: a run line stands under its step's name, a pill is as high as its text
  document.querySelector('#ready .stepbtn').click();await sleep(50);chk('Schritte');
  const run=document.querySelector('#steps-list .steprun');out.runColumn=run?getComputedStyle(run).gridColumnStart:'none';
  out.pillHeight=Math.max(...$$('#steps-list [class^="z-"]').map(p=>Math.round(p.getBoundingClientRect().height)));
  // the releases table: every column head keeps its word within its column
  await goView('Releases');await sleep(50);chk('Releases');
  out.headsCut=$$('#board .rtab thead button').filter(b=>b.getClientRects().length&&b.scrollWidth>b.clientWidth+1).map(b=>b.textContent.trim());
  // the column tabs of "Bei Claude" fit the bar
  await goView('Bei Claude');await sleep(50);chk('Bei Claude');
  const nav=document.getElementById('tabs');out.tabsScroll=nav.scrollWidth-nav.clientWidth;out.tabsCut=cut();
  for(const v of ['Aufträge','Erledigt']){await goView(v);await sleep(30);chk(v)}
  typeIn(document.getElementById('gsuche'),'Karte');await sleep(50);chk('Suche');
  // a hit wraps here, and "Öffnen" goes to the right end of its line
  const ob=$$('#gtreffer>li').filter(li=>li.querySelector('.kbtn')).map(li=>Math.round(li.getBoundingClientRect().right-li.querySelector('.kbtn').getBoundingClientRect().right));
  out.openOff=ob.length?Math.max(...ob):-1;out.openCount=ob.length;
  // the change log's close button stays on one line
  document.getElementById('ver').click();await sleep(50);
  const cb=findBtn('.vlog button',/^Schließen/);out.closeHeight=cb?Math.round(cb.getBoundingClientRect().height):0;
  out.width=innerWidth;out.overflowing=[...over].slice(0,8);
});
