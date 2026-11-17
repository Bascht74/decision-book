scenario(async out=>{
  await until(()=>document.querySelector('#board details[data-nr="E-752"]'));
  const col=k=>document.querySelector('#board section.col[aria-label="'+k+'"]'),nrs=k=>{const c=col(k);return c?$$('details[data-nr]',c).map(d=>d.dataset.nr).join(','):null};
  out.offen=nrs('Offen');out.hinweise=nrs('Hinweise & Aufgaben');out.pruefen=nrs('Prüfen');
  const p=x=>String(x).padStart(2,'0'),dm=n=>{const d=new Date();d.setDate(d.getDate()+n);return p(d.getDate())+'.'+p(d.getMonth()+1)+'.'+(d.getFullYear()!==new Date().getFullYear()?d.getFullYear():'')};
  const b=()=>document.getElementById('waits').textContent,want='● 11 Karten warten auf Dich · 11 für b28 · 4 mit Frist bis '+dm(2);
  out.badge=b()===want?true:{got:b(),want};
  // without a deadline within three days the button says nothing about deadlines
  for(const n of ['E-733','E-736','E-732','E-743'])__DB.external('entscheidungen/'+n,{frist:''});await sleep(50);
  out.badgeNone=b();
  findBtn('#views button',/^Bei Claude/).click();await sleep(50);out.entschieden=nrs('Entschieden');
});
