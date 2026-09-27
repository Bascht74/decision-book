scenario(async out=>{
  await until(()=>document.querySelector('#ready .rtab'));await sleep(150);
  out.rowsShown=$$('#ready .rtab tr').slice(1).map(tr=>tr.children[0].textContent).join(',');
  out.cells=$$('#ready .rtab tr').slice(1).map(tr=>[...tr.children].slice(1).map(c=>c.textContent).join('')).join('|');
});
