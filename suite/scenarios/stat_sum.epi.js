scenario(async out=>{
  await until(()=>document.querySelector('.statbox tbody tr'));await sleep(150);
  out.heads=$$('.statbox thead tr:first-child th').map(x=>x.textContent.replace(/[▲▼]/g,'')).join(',');
  const rows=()=>$$('.statbox tbody tr').map(tr=>[...tr.children].map(c=>c.textContent).join('|'));
  const first=()=>{const tr=document.querySelector('.statbox tbody tr');return tr?(tr.classList.contains('sumrow')?'':'(no sumrow) ')+[...tr.children].map(c=>c.textContent).join('|'):null};
  out.sum=first();out.b27=rows().find(r=>r.startsWith('3.0.0b27'));out.count=(document.querySelector('.statbox .stab .cnt')||{}).textContent;
  const hint=[...document.querySelectorAll('.statbox p.hint')].map(p=>p.textContent).join(' ');
  out.hintTokens=/Tokens gesamt: alles, was zwischen zwei Veröffentlichungen verarbeitet wurde – Hauptsitzung und alle Stränge\./.test(hint);
  out.hintCards=/davon auf Karten: was davon einer Karte zugeordnet ist\./.test(hint);
  out.hintWritten=/davon von Claude geschrieben: die Ausgabe-Tokens, also der Teil, den Claude selbst geschrieben hat/.test(hint);
  out.hintRec=/Meiner Empfehlung gefolgt:.*„40 von 43 \(93 %\)“/.test(hint);out.hintSum=/Die Zeile „Gesamt“ oben/.test(hint);
  // sorted by Commits (up, then down): the sum row stays on top
  const th=()=>$$('.statbox thead tr:first-child th').find(x=>x.textContent.replace(/[▲▼]/g,'')==='Commits');
  th().click();await sleep(50);th().click();await sleep(50);out.sortedFirst=first();out.sortedSecond=rows()[1];
  th().click();await sleep(50);
  // filter Release = 3.0.0b26: the sum follows
  const fsel=$$('.statbox thead tr.frow th')[0].querySelectorAll('select')[1];fsel.value='3.0.0b26';fsel.dispatchEvent(new Event('change'));await sleep(50);
  out.filtered=first();fsel.value='';fsel.dispatchEvent(new Event('change'));await sleep(50);
  // a filter nothing passes: the row stays, with nothing to add up
  const ci=$$('.statbox thead tr:first-child th').findIndex(x=>x.textContent.replace(/[▲▼]/g,'')==='Commits');
  const fc=$$('.statbox thead tr.frow th')[ci],op=fc.querySelector('select'),inp=fc.querySelector('input');op.value='>';op.dispatchEvent(new Event('change'));typeIn(inp,'1000');await sleep(50);
  out.none=first();out.noneRows=rows().length;
});
