scenario(async out=>{
  await until(()=>{const d=document.querySelector('details[data-nr="E-701"]');if(d)d.open=true;return document.getElementById('ans-E-701')});await sleep(200);
  const n=document.querySelector('details[data-nr="E-701"] .extern');
  out.note=n?n.textContent:null;out.href=n&&n.querySelector('a')?n.querySelector('a').href:null;
  const t=document.querySelector('#auftrag .extern, #auftrag-senden + .extern');out.orderNote=!!t;
});
