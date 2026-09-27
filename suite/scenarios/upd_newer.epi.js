scenario(async out=>{
  await until(()=>BAR.length,3000);await sleep(500);
  out.writes=CALLS.filter(c=>/^(set|update) (meta\/buch|entscheidungen|archiv)/.test(c)).length;
  out.bar=BAR.slice();out.version=__DB.store.get('meta/buch').version;
});
