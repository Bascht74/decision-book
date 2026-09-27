scenario(async out=>{
  await until(()=>document.querySelector('#board details[data-nr="E-001"]'));await sleep(1500);
  out.writes=CALLS.filter(c=>/^(set|update) (meta\/buch|archiv)/.test(c)).length;
  out.reads=READS.filter(p=>p==='meta/buch').length;out.bar=BAR.slice();out.version=__DB.store.get('meta/buch').version===PAGE_VERSION;
  out.card=__DB.store.get('entscheidungen/E-001').eigner_am||'none';out.rule=__DB.store.get('entscheidungen/E-009').blatt;
});
