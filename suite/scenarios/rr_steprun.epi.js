scenario(async out=>{
  await until(()=>document.querySelector('#ready .stepbtn'));await sleep(150);
  const line=r=>{const l=r&&r.querySelector('.steprun');return l?l.textContent+' '+((l.querySelector('a')||{getAttribute:()=>'-'}).getAttribute('href')):null};
  out.head=line(document.getElementById('ready'));out.headLinkId=!!document.querySelector('#ready > .steprun a#step-live');
  document.querySelector('#ready .stepbtn').click();await sleep(80);
  const cur=document.querySelector('#steps-list li.cur');out.curStep=cur&&cur.querySelector('.num').textContent;out.inList=line(cur);
  out.wide=document.scrollingElement.scrollWidth>innerWidth?document.scrollingElement.scrollWidth:0;out.others=$$('#steps-list li:not(.cur) .steprun').length;
  __DB.external('meta/laeufe',{laeufe:[{name:"release.yml zur Marke 3.0.0b28",url:"https://example.org/actions/runs/7",status:"fertig"}]});await sleep(150);
  out.afterDone=$$('#ready .steprun').length;
  // a run goes again, but the step shown does not run: only the "Live" link stands beside the step line
  __DB.external('meta/schritte',{schritte:{"2":{zustand:"erledigt"},"3":{zustand:"erledigt"},"4":{zustand:"erledigt"},"5":{zustand:"erledigt"},"6":{zustand:"erledigt"},"7":{zustand:"erledigt"},"9":{zustand:"wartet auf Dich"}}});
  __DB.external('meta/laeufe',{laeufe:[{name:"tests.yml",url:"https://example.org/actions/runs/8",status:"läuft"}]});await sleep(150);
  const sl=document.getElementById('step-live');out.bare=(sl?sl.textContent+' '+sl.getAttribute('href'):'-')+' / '+$$('#ready .steprun').length;
});
