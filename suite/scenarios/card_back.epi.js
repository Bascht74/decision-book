scenario(async out=>{
  const look=(nr,text)=>{const d=document.querySelector('#board details[data-nr="'+nr+'"]');if(!d)return 'missing';if(!d.open)return 'closed';
    const chat=d.querySelector('.ktalk .chat');if(!chat||chat.hidden)return 'talk folded';
    const st=$$('.step',chat).find(s=>s.textContent.includes(text));if(!st)return 'no message';return st.querySelector('.full').hidden?'message folded':'visible'};
  await until(()=>document.querySelector('#board details[data-nr="E-803"]'));await sleep(200);
  out.reloaded=look('E-803','Fertig, bitte prüfen');out.seenStaysClosed=look('E-804','Gesehen');
  const add=(nr,patch,text,z)=>__DB.external('entscheidungen/'+nr,Object.assign(patch,{kommentare:[...__DB.store.get('entscheidungen/'+nr).kommentare,{von:'Claude',text,zeit:z}]}));
  add('E-801',{blatt:'pruefen',status:'umgesetzt',wartet:'Dich'},'Umgesetzt, bitte prüfen','2026-09-27T09:00:00.000Z');
  add('E-802',{blatt:'offen',status:'offen',wartet:'Dich'},'Rückfrage: welche Variante?','2026-09-27T09:01:00.000Z');
  await until(()=>document.querySelector('#board details[data-nr="E-802"]'));await sleep(300);
  out.toPruefen=look('E-801','Umgesetzt, bitte prüfen');out.toOffen=look('E-802','Rückfrage: welche Variante?');
  // a later snapshot keeps it so, and his own fold is kept after that
  __DB.external('entscheidungen/E-804',{geaendert:'2026-09-27T09:05:00.000Z'});await sleep(300);
  out.afterSnapshot=look('E-801','Umgesetzt, bitte prüfen');
  const d=document.querySelector('#board details[data-nr="E-801"]');d.querySelector('summary').click();await sleep(50);
  __DB.external('entscheidungen/E-804',{geaendert:'2026-09-27T09:06:00.000Z'});await sleep(300);
  out.hisCloseKept=look('E-801','Umgesetzt, bitte prüfen');
});
