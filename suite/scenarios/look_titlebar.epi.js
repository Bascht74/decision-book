scenario(async out=>{
  await until(()=>document.querySelector('#board details')&&!document.getElementById('waits').hidden);await sleep(100);
  const h=document.querySelector('.wrap>header'),r=h.getBoundingClientRect();
  out.background=getComputedStyle(h).backgroundColor;
  out.edges=[Math.round(r.left),Math.round(r.top),Math.round(r.right)-innerWidth];   // from edge to edge, at the top
  out.height=Math.round(r.height);
  out.name=getComputedStyle(h.querySelector('h1')).color;
  // every text in the bar against what it stands on
  const res=$$('*',h).filter(e=>e.getClientRects().length&&[...e.childNodes].some(n=>n.nodeType===3&&n.textContent.trim()))
    .map(e=>({t:e.textContent.trim().slice(0,14),c:ratio(rgbaOf(getComputedStyle(e).color),groundOf(e))})).sort((a,b)=>a.c-b.c);
  out.minText=res[0].c;out.worst=res[0];
  const w=document.getElementById('waits'),wr=w.getBoundingClientRect();
  out.waitsLight=lumOf(groundOf(w))>0.7;out.waitsFromRight=Math.round(r.right-wr.right);
});
