scenario(async out=>{
  const d=await until(()=>document.querySelector('details[data-nr="E-010"]'));d.open=true;
  typeIn(document.getElementById('ans-E-010'),'Mit Bild');
  const c0=CALLS.length;findBtn('details[data-nr="E-010"] .answer .act',/^Senden/).click();
  await until(()=>CALLS.slice(c0).some(c=>c.startsWith('update entscheidungen/E-010')));await sleep(100);
  out.order=CALLS.slice(c0).map(x=>x.startsWith('SEND')?'comment':x.startsWith('set auftragsbilder')?'image':x.startsWith('update entscheidungen')?'card':x.slice(0,20));
  const r=__DB.store.get('entscheidungen/E-010');out.cardBilder=(r.bilder||[]).length;out.lastMessageBilder=(((r.kommentare||[]).slice(-1)[0]||{}).bilder||[]).length;
});
