scenario(async out=>{
  await until(()=>document.querySelector('#views button'));await sleep(300);
  out.getsBefore=ARCH.gets;
  const gs=document.getElementById('gsuche');for(const t of ['z','za','zau','zauberwort']){typeIn(gs,t);await sleep(10)}
  await until(()=>$$('#gtreffer li.garch').length);
  const hits=()=>$$('#gtreffer li').filter(li=>li.querySelector('b')).map(li=>li.querySelector('b').textContent+':'+(li.querySelector('.archmark')?li.querySelector('.archmark').textContent:'Buch')).join(',');
  out.hits=hits();
  typeIn(gs,'E-10');await sleep(50);out.numHits=hits();
  typeIn(gs,'karte 1');await sleep(50);out.wordHits=hits();
  out.getsSearch=ARCH.gets;
  typeIn(gs,'zauberwort');await sleep(50);
  {const ob=findBtn('#gtreffer li.garch .kbtn',/Öffnen/);if(ob){ob.click();await sleep(150)}}
  out.openView=(document.querySelector('#views button[aria-selected="true"] .lng')||{}).textContent;
  const tr=document.querySelector('#board .abtab tr[data-nr="E-011"]');
  out.openRow=tr?tr.getAttribute('aria-expanded'):null;
  out.groupOpen=(document.getElementById('ab:3.0.0b27')||{getAttribute:()=>null}).getAttribute('aria-expanded');
  out.cardShown=!!document.querySelector('#board .abgrp details[data-nr="E-011"]');
  out.getsEnd=ARCH.gets;
});
