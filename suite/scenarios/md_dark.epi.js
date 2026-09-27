scenario(async out=>{
  if(!matchMedia('(prefers-color-scheme: dark)').matches){out._skip='this Chrome does not emulate prefers-color-scheme: dark';return}
  const d=await until(()=>{const d=document.querySelector('details[data-nr="E-701"]');if(d)d.open=true;return d&&d.querySelector('.ktalk')&&d});
  const bt=d.querySelector('.ktalk .donebtn');if(bt.getAttribute('aria-expanded')!=='true')bt.click();await sleep(50);
  const rgb=c=>c.match(/[\d.]+/g).map(Number);
  const L=c=>{const [r,g,b]=rgb(c).slice(0,3).map(x=>{x/=255;return x<=0.03928?x/12.92:((x+0.055)/1.055)**2.4});return 0.2126*r+0.7152*g+0.0722*b};
  const cr=(a,b)=>{const [x,y]=[L(a),L(b)].sort((p,q)=>p-q);return (y+0.05)/(x+0.05)};
  const bg=n=>{for(;n;n=n.parentElement){const c=getComputedStyle(n).backgroundColor;const v=rgb(c);if(v.length<4||v[3]>0)return c}return 'rgb(255,255,255)'};
  const res=[];for(const n of d.querySelectorAll('.mdt th,.mdt td,.mdt strong,.mdc,.mdh'))res.push(Math.round(cr(getComputedStyle(n).color,bg(n))*100)/100);
  out.texts=res.length;out.minContrast=Math.min(...res);
  out.boxDark=L(bg(d.querySelector('.mdtw')))<0.1;
});
