scenario(async out=>{
  const png=await new Promise(r=>{const c=document.createElement('canvas');c.width=40;c.height=30;c.getContext('2d').fillRect(0,0,20,20);c.toBlob(r,'image/png')});
  const file=()=>new File([png],'bild.png',{type:'image/png'});
  const field=async(nr,v)=>{await goView(v);
    const ta=await until(()=>{const d=document.querySelector('details[data-nr="'+nr+'"]');if(d)d.open=true;return document.getElementById('ans-'+nr)});ta.closest('details').open=true;return ta};
  const btn=nr=>findBtn('details[data-nr="'+nr+'"] .answer .act',/^Senden/);
  // arbeit: pasted (⌘V)
  let ta=await field('E-701','Bei Claude');
  const dt=new DataTransfer();dt.items.add(file());
  ta.dispatchEvent(new ClipboardEvent('paste',{clipboardData:dt,bubbles:true,cancelable:true}));
  await sleep(1500);
  out.pasteThumbs=$$('details[data-nr="E-701"] .answer .thumbs img').length;
  out.pasteEnabled=!btn('E-701').disabled;btn('E-701').click();
  await until(()=>CALLS.some(c=>c.startsWith('update entscheidungen/E-701')));await sleep(300);
  const a=__DB.store.get('entscheidungen/E-701');out.arbeitSent=CALLS.filter(c=>/^SEND .*E-701/.test(c)).length;out.arbeitBilder=(a.bilder||[]).length;
  // pruefen: dropped onto the field
  ta=await field('E-702','Für Dich');
  const dd=new DataTransfer();dd.items.add(file());
  const over=new DragEvent('dragover',{dataTransfer:dd,bubbles:true,cancelable:true});ta.dispatchEvent(over);out.dropAccepted=over.defaultPrevented;
  ta.dispatchEvent(new DragEvent('drop',{dataTransfer:dd,bubbles:true,cancelable:true}));
  await sleep(1500);
  out.dropThumbs=$$('details[data-nr="E-702"] .answer .thumbs img').length;
  out.dropEnabled=!!btn('E-702')&&!btn('E-702').disabled;if(btn('E-702'))btn('E-702').click();
  await until(()=>CALLS.some(c=>c.startsWith('update entscheidungen/E-702')));await sleep(300);
  const b=__DB.store.get('entscheidungen/E-702');out.pruefenBilder=(b.bilder||[]).length;out.pruefenBlatt=b.blatt;
  // removing the image makes the button grey again
  ta=await field('E-701','Bei Claude');const d2=new DataTransfer();d2.items.add(file());ta.dispatchEvent(new ClipboardEvent('paste',{clipboardData:d2,bubbles:true,cancelable:true}));await sleep(1500);
  const x=document.querySelector('details[data-nr="E-701"] .answer .thumbs .tx');if(x)x.click();await sleep(100);
  out.removedDisabled=btn('E-701').disabled;
});
