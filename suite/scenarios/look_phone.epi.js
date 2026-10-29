scenario(async out=>{
  await until(()=>document.querySelector('#board details')&&!document.getElementById('waits').hidden);await sleep(100);
  const R=s=>document.querySelector(s).getBoundingClientRect(),mid=r=>r.top+r.height/2;
  const h=R('.wrap>header'),n=R('h1'),v=R('#ver'),s=R('#setbtn'),w=R('#waits');
  out.oneLine=Math.abs(mid(v)-mid(s))<=4&&s.bottom<=n.bottom+1;      // name, version and settings in one row
  out.waitsBelow=w.top>=n.bottom-1;                                     // the light button starts below them
  out.header=[Math.round(h.left),Math.round(h.width)-innerWidth,getComputedStyle(document.querySelector('.wrap>header')).backgroundColor];
  out.targets=['#ver','#setbtn','#waits button'].map(x=>{const r=R(x);return Math.round(Math.min(r.width,r.height))});
  out.toolbar=[Math.round(R('#gsuche').width)>=innerWidth-2*16-12,Math.round(R('#filter').top)>=Math.round(R('#gsuche').bottom)];
  // the phone's own values reach the page (the phone block stands behind the rules it narrows): release card padding,
  // filter buttons, the bar under the active view tab
  const tab=document.querySelector('#views [aria-selected="true"]'),af=getComputedStyle(tab,'::after');
  out.phone=[getComputedStyle(document.getElementById('ready')).padding,getComputedStyle(document.querySelector('#filter button')).fontSize,af.left,af.right];
  // the search hits: "Öffnen" does not drop below the line of the card number
  typeIn(document.getElementById('gsuche'),'Karte');await sleep(50);
  const hits=$$('#gtreffer>li').filter(li=>li.querySelector('.kbtn'));out.hitCount=hits.length;
  out.openWrapped=hits.filter(li=>li.querySelector('.kbtn').getBoundingClientRect().top>=li.firstElementChild.getBoundingClientRect().bottom).map(li=>li.firstElementChild.textContent);
});
