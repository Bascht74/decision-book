scenario(async out=>{
  await until(()=>document.querySelector('#zover tbody tr'));await sleep(150);
for(const d of $$('details.zday'))d.open=true;await sleep(100);
  out.innerWidth=innerWidth;out.docOverflow=document.scrollingElement.scrollWidth>innerWidth;out.overflowing=sticksOut();
  const fr=document.querySelector('#zover tbody td:first-child');out.stickyFirst=getComputedStyle(fr).position;
  out.overviewScrolls=(w=>w.scrollWidth>w.clientWidth)(document.querySelector('#zover').parentElement);
  const dw=document.querySelector('details.zday[open] .stab');out.dayScrolls=dw.scrollWidth>dw.clientWidth;
  dw.scrollLeft=200;await sleep(50);const a=dw.querySelector('tbody td:first-child').getBoundingClientRect(),b=dw.getBoundingClientRect();out.firstStays=Math.abs(a.left-b.left)<4;
  const low=[];for(const e of $$('.zeitbox *')){if(!e.getClientRects().length||![...e.childNodes].some(n=>n.nodeType===3&&n.textContent.trim()))continue;const c=ratio(rgbaOf(getComputedStyle(e).color),groundOf(e));if(c<4.5)low.push(e.className+' '+e.textContent.slice(0,12)+' '+c)}
  out.lowContrast=low.slice(0,5);out.scrollHint=getComputedStyle(document.querySelector('.zroll')).display!=='none';
});
