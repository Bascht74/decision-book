scenario(async out=>{
  await until(()=>BAR.length&&document.querySelector('#board details[data-nr="E-001"]'),3000);await sleep(800);
  out.writes=CALLS.filter(c=>/^(set|update|delete) /.test(c)).length;
  out.bar=BAR.slice();out.buch=__DB.store.has('meta/buch');out.card=__DB.store.get('entscheidungen/E-001').eigner_am||'none';
  out.shown=!!document.querySelector('#board details[data-nr="E-001"]');
  const b=document.getElementById('book-update');out.barAfterHeader=!!(b&&b.previousElementSibling&&b.previousElementSibling.tagName==='HEADER');
});
