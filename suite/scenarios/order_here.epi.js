scenario(async out=>{
  await until(()=>document.querySelector('#board details[data-nr="E-681"]')&&document.querySelector('#gespraech .gsp'));await sleep(100);
  const box=document.getElementById('auftrag'),shown=e=>!!e&&e.getClientRects().length>0,R=e=>e.getBoundingClientRect();
  const look=()=>({box:shown(box),kurz:box.classList.contains('kurz'),label:box.querySelector('label').textContent,talks:shown(document.getElementById('gespraech')),list:shown(document.getElementById('auftrag-list')),earlier:shown(document.getElementById('fruehere'))});
  out.dich=look();
  const ta=document.getElementById('auftrag-text'),send=document.getElementById('auftrag-senden');
  // one line: the field and "Senden" side by side, above the cards
  out.oneLine=Math.abs((R(ta).top+R(ta).height/2)-(R(send).top+R(send).height/2))<=8&&R(send).left>=R(ta).right-1;
  out.aboveCards=R(box).bottom<=R(document.querySelector('#board details')).top;out.boxHeight=Math.round(R(box).height);
  typeIn(ta,'Bitte das Angebot prüfen');send.click();
  await until(()=>CALLS.some(c=>c.startsWith('set gespraech/')));await sleep(200);
  out.sends=CALLS.filter(c=>c.startsWith('SEND')).map(c=>JSON.parse(c.slice(5)).text.replace(/^\[G:[^\]]+\]/,'[G:id]'));
  out.note=document.getElementById('auftrag-note').textContent;out.fieldAfter=ta.value;
  out.stillDich=(document.querySelector('#views [aria-selected="true"] .lng')||{}).textContent;
  await goView('Bei Claude');out.claude=shown(box);
  await goView('Aufträge');await sleep(50);out.sitzung=look();
  out.talkThere=$$('#gespraech .bub').some(b=>/Bitte das Angebot prüfen/.test(b.textContent));
});
