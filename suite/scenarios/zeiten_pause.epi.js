scenario(async out=>{
  await until(()=>document.querySelector('#zover tbody tr'));await sleep(150);
const d13=document.querySelector('details.zday[data-zday="2026-11-13"] tbody tr td');out.d13=d13?d13.textContent:null;const d=document.querySelector('details.zday[data-zday="2026-11-12"]');d.open=true;await sleep(100);
  const trs=[...d.querySelectorAll('tbody tr')];out.rows=trs.length;out.first=trs.map(r=>r.children[0].textContent);
  out.pauseRows=trs.filter(r=>r.classList.contains('pause')).length;out.pauseText=(trs.find(r=>r.classList.contains('pause'))||{children:[{textContent:''}]}).children[0].textContent;
  out.stands=trs.map(r=>r.querySelector('.chip').textContent);out.orte=trs.map(r=>r.children[r.children.length-4]?r.children[r.children.length-4].textContent:'');
  const est=d.querySelector('tr.est'),bel=d.querySelector('tr.bel');
  out.estItalic=getComputedStyle(est).fontStyle;out.belItalic=getComputedStyle(bel).fontStyle;
  out.estPill=getComputedStyle(est.querySelector('.chip')).borderTopStyle;out.belPill=getComputedStyle(bel.querySelector('.chip')).borderTopStyle;
  out.estHours=[...est.querySelectorAll('td.h')].map(c=>c.textContent).join('|');
  out.counts=[...trs[0].querySelectorAll('td.num')].slice(0,4).map(c=>c.textContent).join('|');
});
