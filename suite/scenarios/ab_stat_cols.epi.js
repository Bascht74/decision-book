scenario(async out=>{
  await until(()=>document.querySelector('.statbox tbody tr'));await sleep(150);
  out.subTab=(document.querySelector('.statbox .sub button[aria-pressed="true"]')||{}).textContent;
  out.heads=$$('.statbox thead tr:first-child th').map(x=>x.textContent.replace(/[▲▼]/g,'')).join(',');
  const row=v=>{const tr=$$('.statbox tbody tr').find(t=>t.children[0].textContent===v);return tr?[...tr.children].map(c=>c.textContent).join('|'):null};
  out.rowB27=row('3.0.0b27');out.rowB26=row('3.0.0b26');out.rowB25=row('3.0.0b25');
});
