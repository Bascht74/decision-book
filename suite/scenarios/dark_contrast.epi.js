scenario(async out=>{
  if(!matchMedia('(prefers-color-scheme: dark)').matches){out._skip='this Chrome does not emulate prefers-color-scheme: dark';return}
  const ta=await until(()=>document.querySelector('#board details[open] .answer textarea'));typeIn(ta,'Antwort');await sleep(100); // enables "Senden"
  const rgb=c=>c.match(/[\d.]+/g).map(Number);
  const L=c=>{const [r,g,b]=rgb(c).slice(0,3).map(x=>{x/=255;return x<=0.03928?x/12.92:((x+0.055)/1.055)**2.4});return 0.2126*r+0.7152*g+0.0722*b};
  const cr=(a,b)=>{const [x,y]=[L(a),L(b)].sort((p,q)=>p-q);return (y+0.05)/(x+0.05)};
  const res=[];for(const b of $$('.act:not(.ghost),.waitbadge')){if(b.disabled||!b.getClientRects().length)continue;const cs=getComputedStyle(b);res.push({t:b.textContent.trim().slice(0,12),c:Math.round(cr(cs.color,cs.backgroundColor)*100)/100})}
  out.buttons=res.length;out.minContrast=Math.min(...res.map(x=>x.c));out.worst=res.sort((a,b)=>a.c-b.c)[0];
});
