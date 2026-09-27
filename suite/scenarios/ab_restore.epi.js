scenario(async out=>{
  await until(()=>document.querySelector('#board .abgrp'));await sleep(50);
  const cnt=l=>findBtn('#views button',new RegExp('^'+l)).querySelector('.n').textContent;
  out.countBefore=cnt('Erledigt');
  document.getElementById('ab:3.0.0b27').click();await sleep(60);
  document.querySelector('#board .abtab tr[data-nr="E-011"]').click();await sleep(60);
  const w0=CALLS.length;
  findBtn('#board .abrow button',/^Zurückholen$/).click();await sleep(400);
  out.writesAfterFirst=CALLS.length-w0;
  out.askText=(document.querySelector('#board .abnote')||{}).textContent;
  out.askBtns=$$('#board .abrow button').map(b=>b.textContent).join(',');
  {const yes=findBtn('#board .abrow button',/^Ja, zurückholen$/);if(yes)yes.click()}
  await until(()=>document.getElementById('ab-msg'));await sleep(200);
  out.calls=CALLS.slice(w0).map(c=>c.split(' ').slice(0,2).join(' '));
  const st=__DB.store.get('entscheidungen/E-011'),orig=ORIG.eintraege.find(e=>e.id==='E-011');
  const norm=o=>JSON.stringify(Object.keys(o).sort().map(k=>[k,o[k]]));
  const want=Object.assign({},orig,{ziel:'3.0.0b28',ziel_vorher:'3.0.0b27'});delete want.id;
  // the card takes the current release as its target, the old one stays in ziel_vorher
  out.ziel=st&&st.ziel;out.zielVorher=st&&st.ziel_vorher;
  out.sameFields=!!st&&norm(st)===norm(want);out.hasId=!!st&&'id' in st;
  out.archLeft=__DB.store.get('archiv/karten-3.0.0b27').eintraege.map(e=>e.id).join(',');
  out.statArchiv=__DB.store.get('statistik/3.0.0b27').archiv;
  out.msg=(document.getElementById('ab-msg')||{}).textContent||null;
  out.rowGone=!document.querySelector('#board .abtab tr[data-nr="E-011"]');
  out.countAfter=cnt('Erledigt');
  // a card that already stands in the book is not written over
  {const r10=document.querySelector('#board .abtab tr[data-nr="E-010"]');if(r10){r10.click();await sleep(60)}}
  {const zb=findBtn('#board .abrow button',/^Zurückholen$/);window.CLASH=true;if(zb){zb.click();await sleep(60)}}const w1=CALLS.length;
  {const yes=findBtn('#board .abrow button',/^Ja, zurückholen$/);if(yes){yes.click();await sleep(300)}}
  out.clash=(document.querySelector('#board .abnote')||{}).textContent;out.clashWrites=CALLS.slice(w1);
  out.dialogs=DIALOGS.join(',');
  {const ob=findBtn('#ab-msg button',/Öffnen/);if(ob){ob.click();await sleep(100)}}
  out.opened=!!document.querySelector('#board details[data-nr="E-011"]')&&document.querySelector('#board .found-head')!=null;
});
