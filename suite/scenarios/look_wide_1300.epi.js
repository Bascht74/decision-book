scenario(async out=>{
  await until(()=>document.querySelector('#board details')&&document.querySelector('#ready .stepbtn'));await sleep(100);
  const over=new Set();
  const chk=w=>{const sw=document.scrollingElement.scrollWidth;if(sw>innerWidth)over.add(w+': page '+sw+'>'+innerWidth);for(const x of sticksOut().slice(0,3))over.add(w+': '+x)};
  document.querySelector('#ready .stepbtn').click();await sleep(30);chk('Schritte');
  for(const v of ['Releases','Für Dich','Aufträge','Bei Claude','Erledigt','Archiv','Statistik']){if(!findBtn('#views button',new RegExp('^'+v)))continue;await goView(v);
    for(const d of $$('#board details').slice(0,3))d.open=true;await sleep(30);chk(v);
    for(const b of $$('#tabs button')){if(!b.getClientRects().length)continue;b.click();await sleep(20);chk(v+'/'+b.textContent.trim().slice(0,12))}}
  typeIn(document.getElementById('gsuche'),'Karte');await sleep(30);chk('Suche');
  out.width=innerWidth;out.overflowing=[...over].slice(0,8);
});
