scenario(async out=>{
  await until(()=>document.querySelector('#views button'));await sleep(300);
  const cnt=l=>findBtn('#views button',new RegExp('^'+l)).querySelector('.n').textContent;
  out.getsStart=ARCH.gets;out.erledigtBefore=cnt('Erledigt');out.archivBefore=cnt('Archiv');
  document.getElementById('ver').click();await sleep(30);out.bookBefore=(document.getElementById('bookcount')||{}).textContent;press(document.body,'Escape');await sleep(30);
  await goView('Erledigt');await sleep(50);out.erlLine=$$('#board .archive > .cnt').map(x=>x.textContent).join('/');
  await goView('Statistik');await until(()=>ARCH.gets&&!document.getElementById('st-archwait'),3000);await sleep(100);
  const heads=$$('.statbox thead tr:first-child th').map(x=>x.textContent.replace(/[▲▼]/g,''));
  const cell=(v,h)=>{const i=heads.indexOf(h),tr=$$('.statbox tbody tr').find(t=>t.children[0].textContent===v);return tr&&i>=0?tr.children[i].textContent:null};
  out.tokensB27=cell('3.0.0b27','davon auf Karten');out.tokensB26=cell('3.0.0b26','davon auf Karten');out.recB27=cell('3.0.0b27','Meiner Empfehlung gefolgt');
  out.getsStat=ARCH.gets;
  await goView('Archiv');await sleep(100);out.erledigtAfter=cnt('Erledigt');out.archivAfter=cnt('Archiv');
  document.getElementById('ver').click();await sleep(30);out.bookAfter=(document.getElementById('bookcount')||{}).textContent;press(document.body,'Escape');
});
