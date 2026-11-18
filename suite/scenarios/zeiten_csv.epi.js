scenario(async out=>{
  await until(()=>document.querySelector('#zover tbody tr'));await sleep(150);
const b=document.getElementById('zcsv');out.button=b?b.textContent:null;b.click();await until(()=>window.SAVED,2000);await sleep(100);
  const s=window.SAVED||{};out.name=s.filename;const u=s.data instanceof Uint8Array?s.data:new Uint8Array(0);
  out.bom=[...u.slice(0,3)].join(',');out.csv=new TextDecoder().decode(u.slice(3)).split('\r\n');out.note=document.getElementById('znote').textContent;
});
