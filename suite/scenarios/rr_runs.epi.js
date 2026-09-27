scenario(async out=>{
  await until(()=>document.querySelector('#board .relgrp'));await sleep(150);
  const box=document.getElementById('rel-runs');
  out.inReleases=box?box.closest('.relgrp').dataset.rel+(box.previousElementSibling&&box.previousElementSibling.querySelector('tfoot tr.sum')?' under Summe':''):null;
  out.runNames=box?$$('.run',box).map(r=>r.textContent.replace(/\s+/g,' ').trim()):[];
  out.links=box?$$('a',box).map(a=>a.textContent+' '+(a.getAttribute('href')||'-')):[];
  out.stepText=document.querySelector('#ready .stepbtn').textContent;
  const sl=document.getElementById('step-live');out.stepLive=sl?sl.textContent+' '+sl.getAttribute('href'):null;
  const au=findBtn('#views button',/^Aufträge/);out.badge=au.textContent;
  await goView('Aufträge');await sleep(80);out.runsInAuftraege=/Prüfl/.test(document.getElementById('board').textContent.replace('Alle GitHub-Prüfläufe',''))||!!document.querySelector('#board .runs');
  await goView('Releases');await sleep(50);
  __DB.external('meta/laeufe',{laeufe:[{name:"tests.yml auf dem Zweig runde-b28",url:"https://example.org/actions/runs/1",status:"fertig"}]});await sleep(150);
  out.afterDone=[!!document.getElementById('rel-runs'),!!document.getElementById('step-live')].join(',');
});
