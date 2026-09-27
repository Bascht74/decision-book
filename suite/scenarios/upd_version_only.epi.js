scenario(async out=>{
  await until(()=>document.querySelector('#board details[data-nr="E-001"]'));await sleep(1500);
  const b=__DB.store.get('meta/buch');
  out.version=b.version===PAGE_VERSION;out.migriert=b.migriert;out.metaWrites=CALLS.filter(c=>/^(set|update) meta\/buch/.test(c)).length;
  out.bar=BAR.filter(t=>/^ok: /.test(t));out.card=__DB.store.get('entscheidungen/E-001').eigner_am||'none';
  out.rule=__DB.store.get('entscheidungen/E-009').blatt;
});
