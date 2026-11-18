scenario(async out=>{
  await until(()=>document.querySelector('#zover tbody tr'));await sleep(150);
  const rows=t=>$$('#zover '+t+' tr').map(r=>[...r.children].map(c=>c.textContent).join('|'));
  out.thead=rows('thead')[0];out.body=rows('tbody');out.foot=rows('tfoot');
  const g=document.querySelector('#zover tbody tr:first-child td.gs'),o=document.querySelector('#zover tbody tr:first-child td.num:not(.gs)');out.gsTint=getComputedStyle(g).backgroundColor!==getComputedStyle(o).backgroundColor&&getComputedStyle(g).backgroundColor!=='rgba(0, 0, 0, 0)';
  const dd=document.querySelector('details.zday');
  out.dayHead=[...dd.querySelectorAll('thead tr')].map(r=>[...r.children].map(c=>c.textContent).join('|')).join(' // ');
  const b=document.getElementById('zcsv');b.click();await until(()=>window.SAVED,2000);await sleep(100);
  out.csv=new TextDecoder().decode(window.SAVED.data.slice(3)).split('\r\n');
});
