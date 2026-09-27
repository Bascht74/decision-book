scenario(async out=>{
  await until(()=>document.querySelector('.statbox tbody tr'));
  const heads=[...document.querySelectorAll('.statbox thead tr:first-child th')].map(x=>x.textContent.replace(/[▲▼]/g,''));
  const i=heads.indexOf('Meiner Empfehlung gefolgt');out.column=i>=0;
  const row=v=>[...document.querySelectorAll('.statbox tbody tr')].find(tr=>tr.children[0].textContent===v);
  out.cell=i>=0&&row('3.0.0b27')?row('3.0.0b27').children[i].textContent:null;
  out.cellEmpty=i>=0&&row('3.0.0b26')?row('3.0.0b26').children[i].textContent:null;
  out.writes=CALLS.length;
});
