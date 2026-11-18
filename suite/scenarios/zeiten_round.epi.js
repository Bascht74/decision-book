scenario(async out=>{
  await until(()=>document.querySelector('#zover tbody tr'));await sleep(150);
  const rows=t=>$$('#zover '+t+' tr').map(r=>[...r.children].map(c=>c.textContent).join('|'));
  out.body=rows('tbody');out.foot=rows('tfoot');
  const d=document.querySelector('details.zday[data-zday="2026-11-13"]');d.open=true;await sleep(50);
  out.noColsDay=[...d.querySelectorAll('tbody td.h, tfoot td.h')].map(c=>c.textContent).join('|');
  out.hintShown=getComputedStyle(document.querySelector('.zroll')).display!=='none';
});
