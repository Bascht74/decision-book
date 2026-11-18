scenario(async out=>{
  await until(()=>document.querySelector('#views button'));await sleep(200);
  const tabs=()=>$$('#views button').map(b=>b.querySelector('.lng').textContent);
  out.before=tabs().includes('Zeiten');out.others=tabs().includes('Statistik');
  __DB.external('zeiten/2026-11-12',{datum:'2026-11-12',spalten:[{key:'a',name:'Projekt A',gruppe:'Projekt A'}],slots:[],stunden:{a:1}});await sleep(150);
  out.after=tabs().includes('Zeiten');out.count=(findBtn('#views button',/^Zeiten/)||{textContent:''}).querySelector('.n').textContent;
});
