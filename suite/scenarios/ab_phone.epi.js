scenario(async out=>{
  await until(()=>document.querySelector('#views button'));await sleep(300);out.innerWidth=innerWidth;
  const over=[];const chk=name=>{const sw=document.scrollingElement.scrollWidth;if(sw>innerWidth)over.push(name+' '+sw+'>'+innerWidth)};
  await goView('Archiv');await until(()=>document.querySelector('#board .abgrp'));await sleep(50);chk('Archiv');
  document.getElementById('ab:3.0.0b27').click();await sleep(60);chk('release open');
  document.querySelector('#board .abtab tr[data-nr="E-011"]').click();await sleep(60);chk('card open');
  findBtn('#board .abrow button',/^Zurückholen$/).click();await sleep(60);chk('restore asked');
  document.getElementById('ab:3.0.0b27|auftraege').click();await sleep(60);
  document.querySelector('#board .absub[data-kind="auftraege"] tbody tr[data-ab]').click();await sleep(60);chk('order open');
  document.getElementById('ab:3.0.0b27|gespraeche').click();await sleep(60);
  document.querySelector('#board .absub[data-kind="gespraeche"] tbody tr[data-ab]').click();await sleep(60);chk('talk open');
  const f=document.getElementById('bf-von').getBoundingClientRect();out.filterInside=f.left>=0&&f.right<=innerWidth;
  await goView('Statistik');await sleep(100);findBtn('.statbox .sub button',/Karten und Tokens/).click();await sleep(60);chk('Statistik Karten');
  await goView('Releases');await sleep(60);chk('Releases');
  await goView('Erledigt');await sleep(60);chk('Erledigt');
  typeIn(document.getElementById('gsuche'),'zauberwort');await sleep(100);chk('search hits');
  findBtn('#gtreffer li.garch .kbtn',/Öffnen/).click();await sleep(100);chk('found in archive');
  out.overflowing=over;
});
