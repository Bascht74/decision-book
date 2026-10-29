scenario(async out=>{
  await until(()=>document.querySelector('#board details')&&document.querySelector('#views button'));await sleep(100);
  const R=e=>e.getBoundingClientRect(),H=e=>Math.round(R(e).height*10)/10,shown=e=>e.getClientRects().length>0;
  // the gear in the title bar; the grey of an unselected tab and of a group label
  const g=document.querySelector('#setbtn [aria-hidden]');out.gear=g?H(g):0;
  const tab=document.querySelector('#views button[aria-selected="false"]'),who=document.querySelector('#filter .who');
  out.tabInk=[tab?getComputedStyle(tab).color:'',who?getComputedStyle(who).color:''];
  // a kind label against the stand chip in the same card head; the dependency pills
  const head=$$('#board summary').find(s=>s.querySelector('.artlbl')&&s.querySelector('.top .chip'));
  out.labelHeight=head?Math.round((H(head.querySelector('.artlbl'))-H(head.querySelector('.top .chip')))*10)/10:'none';
  const tg=$$('#board .dep').filter(shown).map(H);
  // "Bei Claude": the label "Auftrag" stands in the line of the number, without a box of its own
  await goView('Bei Claude');await sleep(50);
  const al=document.querySelector('#board .artlbl.auftrag');out.auftragLabel=al?[getComputedStyle(al).display,getComputedStyle(al).borderTopWidth]:'none';
  // "Aufträge", the earlier ones: a card link in a row, and the row against one without a link
  await goView('Aufträge');await sleep(50);
  const t=$$('.wrap button').find(b=>/Frühere/.test(b.textContent));if(t){t.click();await sleep(50)}
  tg.push(...$$('.wrap .atab td>.linkbtn').filter(shown).map(H));out.targets=tg.length?Math.min(...tg):0;out.targetsCount=tg.length;
  const rows=$$('.wrap .etab .atab tbody tr').filter(shown),withL=rows.find(r=>r.querySelector('.linkbtn')),without=rows.find(r=>!r.querySelector('.linkbtn'));
  out.linkRow=withL&&without?Math.round((H(withL)-H(without))*10)/10:'none';
  // "Erledigt": the table's share of the board, the head filters, an opened row
  await goView('Erledigt');await sleep(50);
  const tb=document.querySelector('#board .atab');out.tableShare=tb?Math.round(R(tb).width/R(document.getElementById('board')).width*100)/100:0;
  const fs=$$('#board .afil select,#board .atab .fcell select').filter(shown).map(H);
  const tr=document.querySelector('#board .atab tbody tr[data-nr]');if(tr){tr.click();await sleep(50)}
  const gf=document.querySelector('#board .atab tr.gfull>td');out.gfull=gf&&gf.firstElementChild?Math.round(R(gf.firstElementChild).left-R(gf.closest('table')).left):'none';
  await goView('Statistik');await sleep(50);fs.push(...$$('.stab .fcell select,.stab .fcell input').filter(shown).map(H));
  await goView('Releases');await sleep(50);fs.push(...$$('#board .rfil select,#board .mvsel').filter(shown).map(H));
  out.fields=fs.length?Math.min(...fs):0;out.fieldsCount=fs.length;
});
