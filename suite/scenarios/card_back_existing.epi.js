scenario(async out=>{
  const look=(nr,text)=>{const d=document.querySelector('#board details[data-nr="'+nr+'"]');if(!d)return 'missing';if(!d.open)return 'closed';
    const chat=d.querySelector('.ktalk .chat');if(!chat||chat.hidden)return 'talk folded';
    const st=$$('.step',chat).find(s=>s.textContent.includes(text));if(!st)return 'no message';return st.querySelector('.full').hidden?'message folded':'visible'};
  await until(()=>document.querySelector('#board details[data-nr="E-811"]'));await sleep(200);
  out.newerMessage=look('E-811','Umgesetzt, bitte prüfen');out.hisCommentAfter=look('E-812','Umgesetzt');
  out.newerStep=look('E-813','Stand: fertig gebaut');out.hisBackAfter=look('E-814','Alt umgesetzt');
  // his closing wins from then on
  document.querySelector('#board details[data-nr="E-811"] summary').click();await sleep(50);
  __DB.external('entscheidungen/E-812',{geaendert:'2026-09-27T09:10:00.000Z'});await sleep(300);
  out.hisCloseKept=look('E-811','Umgesetzt, bitte prüfen');
  let k={};try{k=JSON.parse(localStorage.getItem('eb-kopen'))||{}}catch(e){}
  out.remembered=k['E-811']||'';out.oldSeedGone=localStorage.getItem('eb-kseen')===null;
});
