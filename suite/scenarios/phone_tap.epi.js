scenario(async out=>{
  await until(()=>document.querySelector('#board details'));await sleep(100);
  const small=new Set();
  const chk=where=>{for(const b of $$('button,[role="button"]')){if(b.classList.contains('tx'))continue;const r=b.getBoundingClientRect();if(!r.width||!r.height)continue;
      if(r.height<31.5||r.width<31.5)small.add(where+': '+(b.className||b.tagName)+' "'+b.textContent.trim().slice(0,14)+'" '+Math.round(r.width)+'x'+Math.round(r.height))}};
  document.querySelector('#ready .stepbtn').click();await sleep(30);
  for(const v of ['Releases','Für Dich','Aufträge','Bei Claude','Erledigt','Statistik']){if(!findBtn('#views button',new RegExp('^'+v)))continue;await goView(v);
    if(v==='Für Dich'){const d=document.querySelector('#board details[data-nr="E-800"]');d.open=true;const k=d.querySelector('.ktalk .donebtn');if(k&&k.getAttribute('aria-expanded')!=='true')k.click();await sleep(30)}
    if(v==='Aufträge'){const t=document.querySelector('#fruehere .donebtn');if(t){t.click();await sleep(30)}}
    if(v==='Bei Claude'){for(const b of $$('#tabs button')){b.click();await sleep(20);for(const d of $$('#board .col.on details').slice(0,2))d.open=true;chk(v+'/'+b.textContent)}}
    chk(v)}
  typeIn(document.getElementById('gsuche'),'Karte');await sleep(30);chk('Suche');
  document.getElementById('ver').click();await sleep(30);chk('Änderungen');
  out.checked=true;out.small=[...small].slice(0,12);
});
