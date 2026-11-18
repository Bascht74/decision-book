scenario(async out=>{
  await until(()=>document.querySelector('#zover tbody tr'));await sleep(150);
for(const d of $$('details.zday'))d.open=true;await sleep(100);
  out.dark=getComputedStyle(document.body).backgroundColor;out.overflowing=sticksOut();
  const low=[];let n=0;for(const e of $$('.zeitbox *')){if(!e.getClientRects().length||![...e.childNodes].some(n=>n.nodeType===3&&n.textContent.trim()))continue;n++;const c=ratio(rgbaOf(getComputedStyle(e).color),groundOf(e));if(c<4.5)low.push(e.className+' '+e.textContent.slice(0,12)+' '+c)}
  out.checked=n;out.lowContrast=low.slice(0,5);
});
