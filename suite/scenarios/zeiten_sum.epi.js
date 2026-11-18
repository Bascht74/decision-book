scenario(async out=>{
  await until(()=>document.querySelector('#zover tbody tr'));await sleep(150);
const rows=t=>$$('#zover '+t+' tr').map(r=>[...r.children].map(c=>c.textContent).join('|'));
  out.tab=$$('#views button').map(b=>b.querySelector('.lng').textContent).filter(x=>x==='Zeiten').length;
  out.head=[...document.querySelectorAll('.zhead>div')].map(d=>d.textContent).join(' / ');
  out.hint=document.querySelector('.zhint').textContent;
  out.thead=rows('thead')[0];out.body=rows('tbody');out.foot=rows('tfoot');
  const num=document.querySelector('#zover tbody td.num');out.numAlign=getComputedStyle(num).textAlign;out.numFig=getComputedStyle(num).fontVariantNumeric;
  out.davonSmaller=parseFloat(getComputedStyle(document.querySelector('#zover tbody td.dav')).fontSize)<parseFloat(getComputedStyle(num).fontSize);
  out.days=$$('details.zday').map(d=>d.dataset.zday+(d.open?' offen':' zu'));
  const open=document.querySelector('details.zday[open]');out.dayFoot=open?[...open.querySelectorAll('tfoot td')].map(c=>c.textContent).join('|'):null;
  out.dayHead=open?[...open.querySelectorAll('thead tr')].map(r=>[...r.children].map(c=>c.textContent).join('|')).join(' // '):null;
  await sleep(300);out.subs=ZSUB;
});
