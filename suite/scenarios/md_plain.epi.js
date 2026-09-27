scenario(async out=>{
  const d=await until(()=>{const d=document.querySelector('details[data-nr="E-701"]');if(d)d.open=true;return d&&d.querySelector('.ktalk')&&d});
  const bt=d.querySelector('.ktalk .donebtn');if(bt.getAttribute('aria-expanded')!=='true')bt.click();await sleep(50);
  const full=d.querySelector('.ktalk .step:last-of-type .full');
  const ps=[...d.querySelectorAll('.body p')];out.preWrap=getComputedStyle(full).whiteSpace;
  await goView('Aufträge');await sleep(50);
  const bub=document.querySelector('[data-g="g1"] .bub');
  const T='Zeile eins\nZeile zwei mit 5 * 3 * 2 und a_b_c und x|y\n\n  eingerückt\nsiehe ';
  const want=T.replace(/&/g,'&amp;')+'<a href="https://example.org/x" target="_blank" rel="noopener noreferrer">https://example.org/x</a>.';
  out.stepHtml=full.innerHTML===want;out.sectionParas=ps.length;out.sectionHtml=ps.map(p=>p.innerHTML===want);
  out.talkHtml=bub.innerHTML.endsWith('</div>'+want);
  out.mdElements=[full,bub,...ps].map(b=>b.querySelectorAll('.mdb,strong,em,code,table').length);
});
