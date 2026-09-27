scenario(async out=>{
  await until(()=>document.querySelector('#board details[data-nr="E-931"]')&&/Eignerin/.test(document.getElementById('filter').textContent));await sleep(100);
  out.filter=$$('#filter button').slice(0,3).map(b=>b.textContent);
  out.metaOfCardWithoutVon=[...document.querySelectorAll('details[data-nr="E-931"] .meta span')].map(s=>s.textContent).find(t=>/^von /.test(t));
  const lbl=document.querySelector('details[data-nr="E-930"] .answer label').textContent;
  out.answerLabelNamesTheOwner=lbl.startsWith('Entscheidung Eignerin');
  out.ready=document.querySelector('#ready .stepbtn').textContent;
  out.cachedSettings=JSON.parse(localStorage.getItem('eb-set')||'{}').eigner;
  await goView('Aufträge');
  out.links=$$('#board .hint a').map(a=>a.getAttribute('href'));
  __DB.external('meta/einstellungen',{eigner:'Eigner Zwei'});await sleep(100);
  await goView('Für Dich');out.filterAfterChange=$$('#filter button')[1].textContent;
});
