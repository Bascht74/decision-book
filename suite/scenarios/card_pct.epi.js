scenario(async out=>{
  const sum=nr=>document.querySelector('#board details[data-nr="'+nr+'"] > summary');
  const pos=s=>{const p=s.querySelector('.meta .pct');if(!p)return null;const a=p.getBoundingClientRect(),b=s.getBoundingClientRect(),cs=getComputedStyle(s),t=[...s.querySelectorAll('.meta .tok')].pop().getBoundingClientRect();
    const lastB=Math.max(...[...s.querySelector('.meta').children].filter(x=>x!==p).map(x=>x.getBoundingClientRect().bottom));
    return {bottom:a.bottom>=lastB-1,right:Math.round(b.right-parseFloat(cs.paddingRight)-a.right),sameLine:Math.abs(a.top-t.top)<3,w:Math.round(b.width),lines:Math.round(a.height/parseFloat(getComputedStyle(p).lineHeight||16))}};
  const pct={},where={};
  const take=nrs=>{for(const n of nrs){const s=sum(n);if(!s)continue;const p=s.querySelector('.meta .pct');pct[n]=p?p.textContent:null;where[n]=pos(s)}};
  await until(()=>sum('E-801'));take(['E-801','E-802','E-803','E-810']);
  await goView('Bei Claude');await until(()=>sum('E-805'));take(['E-804','E-805','E-806','E-807','E-809']);
  await goView('Erledigt');const row=await until(()=>document.querySelector('#board .atab tbody tr[data-nr="E-808"]'));if(row){row.click();await sleep(100)}take(['E-808']);
  out.pct=pct;
  out.rightGap=Object.values(where).filter(Boolean).map(w=>w.right);out.where=where;out.sameLineWide=['E-801','E-802','E-803','E-810','E-808'].map(n=>where[n]&&where[n].sameLine);out.allAtBottom=Object.values(where).every(w=>w&&w.bottom&&w.lines===1);
  await goView('Aufträge');await until(()=>document.querySelector('#auftrag-list li[data-auftrag="a1"]'));
  const op={};for(const id of ['a1','a2','a3']){const li=document.querySelector('#auftrag-list li[data-auftrag="'+id+'"]'),p=li&&li.querySelector('.pct');op[id]=p?p.textContent:null;
    if(p&&id==='a1'){const b=li.getBoundingClientRect(),a=p.getBoundingClientRect();out.orderRightGap=Math.round(b.right-parseFloat(getComputedStyle(li).paddingRight)-a.right)}}
  out.orders=op;
  // contrast of the text against the card, light or dark
  const rgb=c=>c.match(/[\d.]+/g).map(Number);
  const L=c=>{const [r,g,b]=rgb(c).slice(0,3).map(x=>{x/=255;return x<=0.03928?x/12.92:((x+0.055)/1.055)**2.4});return 0.2126*r+0.7152*g+0.0722*b};
  const bg=n=>{for(;n;n=n.parentElement){const c=getComputedStyle(n).backgroundColor;if(rgb(c)[3]!==0&&c!=='transparent')return c}return 'rgb(255,255,255)'};
  const cr=(a,b)=>{const [x,y]=[L(a),L(b)].sort((p,q)=>p-q);return (y+0.05)/(x+0.05)};
  out.minContrast=Math.min(...$$('.pct').filter(p=>p.getClientRects().length).map(p=>Math.round(cr(getComputedStyle(p).color,bg(p))*100)/100));
  out.writes=CALLS.length;
});
