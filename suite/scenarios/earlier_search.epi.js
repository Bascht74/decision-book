scenario(async out=>{
  const f=await until(()=>document.getElementById('fsuche'));
  out.rowsFolded=$$('#fruehere tbody tr[data-k]').length;out.toggle0=document.querySelector('#fruehere .donebtn').textContent;
  typeIn(f,'zebra');await sleep(50);
  out.rows=$$('#fruehere tbody tr[data-k]').length;out.note=document.querySelector('#fruehere .gsearch .saved').textContent;
  out.toggle=document.querySelector('#fruehere .donebtn').textContent;out.focusKept=document.activeElement&&document.activeElement.id;
  typeIn(document.getElementById('fsuche'),'nichtda');await sleep(50);
  out.rowsNone=$$('#fruehere tbody tr[data-k]').length;out.noteNone=document.querySelector('#fruehere .gsearch .saved').textContent;
  const g=document.getElementById('fsuche');press(g,'Escape');await sleep(50);
  out.afterEsc=document.getElementById('fsuche').value;out.rowsAfterEsc=$$('#fruehere tbody tr[data-k]').length;
});
