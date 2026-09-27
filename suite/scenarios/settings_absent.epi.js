scenario(async out=>{
  await until(()=>document.querySelector('#board details[data-nr="E-941"]'));await sleep(100);
  out.filter=$$('#filter button').slice(0,3).map(b=>b.textContent);
  out.metaOfCardWithoutVon=[...document.querySelectorAll('details[data-nr="E-941"] .meta span')].map(s=>s.textContent).find(t=>/^von /.test(t));
  const lbl=document.querySelector('details[data-nr="E-940"] .answer label').textContent;
  // only a yes/no leaves the page, so no name printed by the page ends up in a log
  out.answerLabelNamesOnlyTheRole=/^Entscheidung Eigner( ·|$)/.test(lbl);
  out.ready=document.querySelector('#ready .stepbtn').textContent;
  await goView('Aufträge');
  out.links=$$('#board .hint a').map(a=>a.getAttribute('href'));
  out.anyExternalLinkOnPage=$$('a[href]').filter(a=>/^https?:/.test(a.getAttribute('href'))&&!/example\.org/.test(a.getAttribute('href'))).length;
});
