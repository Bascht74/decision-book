scenario(async out=>{
  await until(()=>document.querySelector('#zover tbody tr'));await sleep(150);
for(const d of $$('details.zday'))d.open=true;await sleep(100);
  const zb=document.querySelector('.zeitbox');out.pwn=window.PWN||null;out.injected=zb.querySelectorAll('img,b,i,u').length;
  out.hint=document.querySelector('.zhint').textContent;out.thead=[...document.querySelectorAll('#zover thead th')].map(c=>c.textContent).join('|');
  out.days=$$('details.zday').length;out.stand=document.querySelector('.zhead').textContent.includes('Stand–');
  out.rows=$$('#zover tbody tr').map(r=>r.children[0].textContent);
});
