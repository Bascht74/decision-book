scenario(async out=>{
  const card=nr=>document.querySelector('#board details[data-nr="'+nr+'"]');
  await until(()=>card('E-661')&&document.querySelector('#filter .pgrp'));await sleep(50);
  const grp=()=>document.querySelector('#filter .pgrp'),btns=()=>grp()?$$('button',grp()):[];
  const state=()=>btns().map(b=>b.textContent+(b.getAttribute('aria-pressed')==='true'?'*':'')).join(',');
  const nrs=()=>$$('#board details[data-nr]').map(d=>d.dataset.nr).sort().join(',');
  const pb=name=>btns().find(b=>b.firstChild.textContent===name)||{click(){}};
  const kept=()=>{try{return localStorage.getItem('eb-proj')}catch(e){return 'no storage'}};
  out.label=grp().querySelector('.who').textContent;out.buttons=state();
  out.pills=['E-661','E-662','E-663'].map(n=>{const x=card(n).querySelector('summary .nr .proj');return x?x.textContent:null});
  // two projects, two colours; each pill reads 4.5:1 on its ground
  const px=n=>card(n).querySelector('.proj'),c1=px('E-661')?getComputedStyle(px('E-661')).color:'',c2=px('E-662')?getComputedStyle(px('E-662')).color:'';
  out.twoColours=!!c1&&c1!==c2;out.contrast=c1&&c2?Math.min(ratio(rgbaOf(c1),groundOf(px('E-661'))),ratio(rgbaOf(c2),groundOf(px('E-662')))):0;
  out.all=nrs();
  pb('Haus').click();await sleep(50);
  out.haus={buttons:state(),cards:nrs(),views:$$('#views button').map(b=>b.querySelector('.lng').textContent+' '+b.querySelector('.n').textContent).slice(0,4).join(',')};
  out.kept=kept();
  await goView('Bei Claude');out.hausClaude=nrs();await goView('Für Dich');
  pb('ohne Projekt').click();await sleep(50);out.ohne=nrs();
  pb('ohne Projekt').click();await sleep(50);out.again=state()+'|'+nrs();
  pb('Funk').click();await sleep(50);pb('alle Projekte').click();await sleep(50);out.alle=state()+'|'+nrs();out.keptAfterAll=kept();
});
