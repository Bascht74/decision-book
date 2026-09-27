scenario(async out=>{
  await until(()=>document.querySelector('.statbox tbody tr:not(.sumrow)'));await sleep(300);
  out.order=$$('.statbox tbody tr:not(.sumrow)').map(t=>t.children[0].textContent).join(',');
  const heads=$$('.statbox thead tr:first-child th').map(x=>x.textContent.replace(/[▲▼]/g,''));const sr=document.querySelector('.statbox tbody tr.sumrow');
  out.codeSum=sr?sr.children[heads.indexOf('Codezeilen')].textContent:null;
  await openSettings();await until(()=>document.getElementById('pack-liste'));out.pack=packLines();
});
