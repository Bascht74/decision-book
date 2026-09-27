scenario(async out=>{
  await until(()=>document.querySelector('#board .atab'));await sleep(100);
  const nrs=()=>$$('#board .atab tbody tr').map(d=>d.dataset.nr);
  const ts=()=>$$('#board .atab tbody td.z').map(s=>{const m=s.textContent.match(/(\d\d)\.(\d\d)\.(\d{4}),? (\d\d):(\d\d)/);return m?Date.UTC(+m[3],m[2]-1,+m[1],+m[4],+m[5]):NaN});
  const num=a=>a.map(x=>parseInt(x.replace(/\D/g,''),10));
  const mono=(a,down)=>a.every((v,i)=>i===0||(down?a[i-1]>=v:a[i-1]<=v));
  out.cards=nrs().length;out.whens=ts().filter(isFinite).length;out.timeDown=mono(ts(),true);out.firstIsLowest=nrs()[0]===[...nrs()].sort()[0];
  out.heads=$$('#board .atab thead tr:first-child th').map(h=>h.textContent.replace(/[↓↑]/g,'').trim());
  const btn=l=>$$('#board .atab thead button').find(b=>b.textContent.startsWith(l));
  btn('Nr.').click();await sleep(100);out.nrDown=mono(num(nrs()),true);
  btn('Nr.').click();await sleep(100);out.nrUp=mono(num(nrs()),false);
  btn('Geändert').click();await sleep(100);out.backToTime=mono(ts(),true);
  // a click on a row opens the card right below it, in "Erledigt" (no jump to another page); a second click shuts it
  const r2=$$('#board .atab tbody tr[data-nr]')[2],nr2=r2.dataset.nr;r2.click();await sleep(100);out.openedCard=!!document.querySelector('#board details[data-nr="'+nr2+'"][open]');
  const r2b=document.querySelector('#board .atab tbody tr[data-nr="'+nr2+'"]'),nx=r2b&&r2b.nextElementSibling;
  out.openedBelow=!!(nx&&nx.classList.contains('gfull')&&nx.querySelector('details[data-nr="'+nr2+'"][open]'));out.stillErledigt=!!document.querySelector('#board .archive .atab')&&!document.querySelector('#board .found-head');
  if(!r2b)return;out.arrow=r2b.children[0].textContent.trim()[0];r2b.click();await sleep(100);out.shutAgain=$$('#board .atab tr.gfull').length;
});
