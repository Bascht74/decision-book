scenario(async out=>{
  const card=nr=>document.querySelector('#board details[data-nr="'+nr+'"]');
  const force=(s,v)=>{s.value=v;s.dispatchEvent(new Event('change',{bubbles:true}))};
  await until(()=>card('E-212'));
  const nrs=['E-201','E-202','E-203','E-204','E-205','E-206','E-207','E-208','E-209','E-210','E-211','E-212'];
  const arts={},labels={};
  for(const nr of nrs){const d=card(nr);d.open=true;await sleep(20);const s=d.querySelector('#ar-'+nr);arts[nr]=s?s.value:null;
    const l=d.querySelector('summary .artlbl');labels[nr]=l?l.textContent:''}
  out.arts=arts;out.labels=labels;
  out.artOptions=[...card('E-205').querySelector('#ar-E-205').options].map(o=>o.value+'='+o.textContent);
  out.typSelects=$$('select[id^="ty-"],select[aria-label="Typ"]').length;
  // writing Art writes "art" only; "typ" stays
  const n0=CALLS.length;force(card('E-205').querySelector('#ar-E-205'),'auftrag');await sleep(300);
  out.write=(CALLS.slice(n0).find(c=>/^update/.test(c))||'').replace(/"(geaendert|eigner_am)":"[^"]*",?/g,'');
  const x=__DB.store.get('entscheidungen/E-205');out.after=x.art+'|'+x.typ;
  out.labelAfter=(card('E-205').querySelector('summary .artlbl')||{}).textContent||'';
  // the mapping drives the columns and the buttons
  await goView('Für Dich');
  const col=nr=>{const d=card(nr);return d?d.closest('section.col').getAttribute('aria-label'):'none'};
  out.cols={'E-220':col('E-220'),'E-221':col('E-221'),'E-222':col('E-222')};
  const btn=nr=>{const d=card(nr);d.open=true;return $$('.answer .row .act',d).map(b=>b.textContent.replace(/ \(.*\)$/,"")).join(',')};
  await sleep(50);out.buttons={'E-220':btn('E-220'),'E-221':btn('E-221'),'E-222':btn('E-222')};
});
