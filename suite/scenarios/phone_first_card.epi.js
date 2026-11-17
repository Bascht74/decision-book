scenario(async out=>{
  const vis=e=>!!e&&e.getClientRects().length>0,first=()=>$$('#board section.col.on details[data-nr]').find(vis);
  await until(()=>first()&&!document.getElementById('waits').hidden);await sleep(150);
  const h=s=>{const e=document.querySelector(s);return vis(e)?Math.round(e.getBoundingClientRect().height):0};
  const look=()=>({first:Math.round(first().getBoundingClientRect().top),nr:first().dataset.nr,header:h('header'),views:h('#views'),toolbar:h('.toolbar'),auftrag:h('#auftrag'),tabs:h('#tabs'),
    badge:document.getElementById('waits').textContent,waitsH:h('#waits'),field:vis(document.getElementById('auftrag-text')),btn:vis(document.getElementById('auftrag-auf')),wide:document.scrollingElement.scrollWidth>innerWidth});
  out.one=look();
  {const b=findBtn('#tabs button',/^Prüfen/);if(b){b.click();await sleep(60)}out.pruefen=$$('#board section.col.on details[data-nr]').map(d=>d.dataset.nr).join(',');const o=findBtn('#tabs button',/^Offen/);if(o){o.click();await sleep(60)}}
  for(const n of ['E-902','E-904','E-905','E-910'])__DB.external('entscheidungen/'+n,{ziel:'später'});await sleep(150);
  out.two=look();
  // the order field opens with a tap on "+ Auftrag" and takes the focus; tapped again it closes; a draft keeps it open
  const ab=document.getElementById('auftrag-auf'),ta=document.getElementById('auftrag-text');
  ab.click();await sleep(60);out.opened=[vis(ta),document.activeElement===ta,ab.getAttribute('aria-expanded'),ab.textContent].join('|');
  ab.click();await sleep(60);out.closed=[vis(ta),ab.getAttribute('aria-expanded')].join('|');
  ab.click();await sleep(30);typeIn(ta,'Entwurf');await sleep(30);ab.click();await sleep(60);out.draftKeeps=vis(ta);
  out.wide=document.scrollingElement.scrollWidth>innerWidth;
});
