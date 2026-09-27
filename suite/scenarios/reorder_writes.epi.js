scenario(async out=>{
  const d=await until(()=>document.querySelector('details[data-nr="R-12"]'));d.open=true;
  const lane=()=>$$('#board details[data-nr^="R-"]').map(x=>x.dataset.nr);
  out.before=lane().slice(-3);
  const c0=CALLS.length;findBtn('details[data-nr="R-12"] .mv',/↑/).click();await sleep(800);
  out.writes=CALLS.slice(c0).map(c=>c.split(' ')[1]);
  out.after=lane().slice(-3);document.querySelector('details[data-nr="R-01"]').open=true; // body built on opening
  out.upOnTopDisabled=findBtn('details[data-nr="R-01"] .mv',/↑/).disabled;
});
