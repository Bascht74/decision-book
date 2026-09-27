scenario(async out=>{
  await until(()=>document.querySelector('.statbox tbody tr'));await sleep(300);
  out.heads=$$('.statbox thead tr:first-child th').map(x=>x.textContent.replace(/[▲▼]/g,'')).join(',');
  const row=v=>{const tr=$$('.statbox tbody tr').find(t=>t.children[0].textContent===v);return tr?[...tr.children].map(c=>c.textContent).join('|')+(tr.title?' ('+tr.title+')':''):null};
  for(const v of ['3.0.0b28','3.0.0b27','3.0.0b26','3.0.0b25','1.0.0-beta'])out[v.replace(/\./g,'_')]=row(v);
  {const q=document.querySelector('.statbox tbody tr.livesum td');out.italic=q?getComputedStyle(q).fontStyle:null}
  out.hint=$$('.statbox .hint').map(h=>h.textContent).join(' ');
});
