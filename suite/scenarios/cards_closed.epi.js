scenario(async out=>{
  const card=nr=>document.querySelector('#board details[data-nr="'+nr+'"]');
  await until(()=>card('E-641')&&card('E-645'));await sleep(150);
  const state=()=>$$('#board details[data-nr]').map(d=>d.dataset.nr+(d.open?':open':'')).sort().join(',');
  const kept=()=>{try{return JSON.parse(localStorage.getItem('eb-open')||'[]').filter(x=>x[1]).map(x=>x[0]).sort()}catch(e){return 'no storage'}};
  out.forYou=state();
  const d=card('E-641'),sm=d.querySelector('summary'),tx=s=>(sm.querySelector(s)||{}).textContent||null;
  out.head=[tx('.nr'),tx('.proj'),tx('.chip'),tx('.head'),/^Frist: 15\.01\.2030 \d\d:\d\d – noch \d+ Tage$/.test(tx('.frist')||'')];
  out.closedBody=!!d.querySelector('.body');out.closedButtons=$$('button',d).length;
  sm.click();await sleep(60);out.afterTap=d.open&&!!d.querySelector('.quick button');out.remembered=kept();
  sm.click();await sleep(60);out.afterSecondTap=d.open;out.rememberedClosed=kept();
  // a card that comes in new, with a message of Claude's and no act of the owner: closed
  const now=new Date().toISOString();
  __DB.external('entscheidungen/E-648',{ueberschrift:'Neu angelegt',beschreibung:'Text',blatt:'offen',ziel:'3.0.0b28',von:'Eigner',wartet:'Dich',kommentare:[{von:'Claude',text:'Gerade angelegt',zeit:now}],verlauf:[{zeit:now,text:'angelegt'}],geaendert:now});
  await until(()=>card('E-648'));await sleep(150);out.newCard=card('E-648').open?'open':'closed';
  await goView('Bei Claude');await until(()=>card('E-646'));await sleep(100);out.claude=state();
});
