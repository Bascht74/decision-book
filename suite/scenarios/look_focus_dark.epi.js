scenario(async out=>{
  if(!matchMedia('(prefers-color-scheme: dark)').matches){out._skip='this Chrome does not emulate prefers-color-scheme: dark';return}
  await until(()=>document.querySelector('#board details')&&!document.getElementById('waits').hidden&&document.querySelector('#ready .act'));await sleep(100);
  const ring=e=>{e.focus();const cs=getComputedStyle(e);
    const r={visible:e.matches(':focus-visible'),style:cs.outlineStyle,width:cs.outlineWidth,c:cs.outlineStyle==='none'?0:ratio(rgbaOf(cs.outlineColor),groundOf(e,false)),cut:ringCut(e)};e.blur();return r};
  out.bar=ring(document.getElementById('setbtn'));             // white on the dark blue bar
  out.waits=ring(document.querySelector('#waits button'));      // on the light button in the bar
  out.tab=ring(document.querySelector('#views [aria-selected="false"]'));
  out.button=ring(document.querySelector('#ready .act'));
  out.card=ring(document.querySelector('#board summary'));
  // no ring is cut by a box that scrolls or clips it
  out.clipped=Object.entries({bar:out.bar,waits:out.waits,tab:out.tab,button:out.button,card:out.card}).filter(([,r])=>r.cut>0).map(([k,r])=>k+' '+r.cut);
  const line=f=>{f.focus();const fs=getComputedStyle(f);const r=[fs.borderBottomColor,/inset/.test(fs.boxShadow),ratio(rgbaOf(fs.borderBottomColor),groundOf(f,false))];f.blur();return r};
  out.field=line(document.getElementById('gsuche'));
  // a filter field in a table head keeps the blue lower edge in focus, though its own rule outweighs the field rule
  await goView('Erledigt');const af=await until(()=>document.getElementById('af-ziel'));out.tableField=af?line(af):null;
});
