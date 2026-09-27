scenario(async out=>{
  await sleep(200);out.innerWidth=innerWidth;
  const over=[];const chk=name=>{const sw=document.scrollingElement.scrollWidth;if(sw>innerWidth)over.push(name+' '+sw+'>'+innerWidth)};
  document.querySelector('#ready .stepbtn').click();await sleep(50);chk('ready steps open');
  for(const v of ['Releases','Für Dich','Aufträge','Bei Claude','Erledigt','Statistik']){if(!findBtn('#views button',new RegExp('^'+v)))continue;await goView(v);chk(v);
    if(v==='Aufträge'){const t=document.querySelector('#fruehere .donebtn');if(t){t.click();await sleep(50);chk(v+' (Frühere open)')}}}
  await goView('Bei Claude');for(const b of $$('#tabs button')){b.click();await sleep(30);chk('Bei Claude tab '+b.textContent)}
  const gs=document.getElementById('gsuche');typeIn(gs,'Karte');await sleep(50);chk('search hits');
  findBtn('#gtreffer .kbtn',/Öffnen/).click();await sleep(50);chk('found card');
  document.getElementById('ver').click();await sleep(50);chk('change log');
  out.overflowing=over;window.scrollTo(300,0);out.scrollXAfterScrollTo=scrollX;
});
