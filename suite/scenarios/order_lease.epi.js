scenario(async out=>{
  await until(()=>document.querySelector('li[data-auftrag="a1"]'));await sleep(100);
  const st=id=>(document.querySelector('li[data-auftrag="'+id+'"] .st')||{}).textContent;
  out.a1=st('a1');out.a2=st('a2');out.viewButton=findBtn('#views button',/^Aufträge/).textContent;
  findBtn('li[data-auftrag="a1"] button',/^Bearbeiten$/).click();await until(()=>document.getElementById('aed-a1'));await sleep(100);
  const a1=__DB.store.get('auftraege/a1');out.a1AfterOpen={status:a1.status,leaseAgeMin:Math.round((Date.now()-Date.parse(a1.bearbeitet_seit))/6e4)};
  out.editorOpen=!!document.getElementById('aed-a1');
});
