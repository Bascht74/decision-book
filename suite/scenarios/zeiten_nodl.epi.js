scenario(async out=>{
  await until(()=>document.querySelector('#zover tbody tr'));await sleep(150);
out.button=!!document.getElementById('zcsv');out.table=!!document.getElementById('zover');
});
