scenario(async out=>{
  await until(()=>document.querySelector('#filter button[title="Nur dieses Ziel zeigen"]'));await sleep(100);
  const zc=()=>$$('#filter button[title="Nur dieses Ziel zeigen"]');
  const chip=z=>zc().find(b=>b.querySelector('.lng').textContent===z);
  const alle=()=>document.querySelector('#filter button[title="Alle Ziele zeigen"]');
  const state=()=>(alle()?'alle'+(alle().getAttribute('aria-pressed')==='true'?'':' (aus)'):'-')+','+zc().map(b=>b.querySelector('.lng').textContent+(b.getAttribute('aria-pressed')==='true'?'':' (aus)')).join(',');
  const col=k=>document.querySelector('#board section.col[aria-label="'+k+'"]');
  const nrs=k=>{const c=col(k);return c?$$('details[data-nr]',c).map(d=>d.dataset.nr).sort().join(','):null};
  const lanes=()=>{const c=col('Offen');return c?$$('.lane.fold',c).map(l=>l.dataset.lane+':'+l.getAttribute('aria-expanded')).join(','):null};
  const tabs=()=>$$('#tabs button').map(b=>b.firstChild.textContent+' '+b.querySelector('.n').textContent).join(',');
  const snap=()=>({chips:state(),hinweise:nrs('Hinweise & Aufgaben'),offen:nrs('Offen'),lanes:lanes(),tabs:tabs()});
  out.start=snap();
  chip('Funk').click();await sleep(50);out.solo=snap();
  chip('Funk').click();await sleep(50);out.again=snap();
  chip('Haus').click();await sleep(50);chip('Funk').click();await sleep(50);out.other=snap();
  alle().click();await sleep(50);out.alle=snap();
  findBtn('#filter button',/^Claude$/).click();await sleep(50);out.claude=snap();
  chip('Haus').click();await sleep(50);out.claudeHaus=snap();
  alle().click();await sleep(50);findBtn('#filter button',/^alle$/).click();await sleep(50);
  let kept=null;try{kept=localStorage.getItem('eb-hidden')}catch(e){}
  chip('Ziel offen').click();await sleep(50);try{kept=localStorage.getItem('eb-hidden')+' '+localStorage.getItem('eb-solo')}catch(e){};out.kept=kept;
  // "only this target" means the whole book: a target only on the owner's cards, one only in "Bei Claude" and one on a
  // card that comes in later all stay left out while a chip shows another target
  alle().click();await sleep(50);
  const N=(n,blatt,ziel,von)=>__DB.external('entscheidungen/E-'+n,{ueberschrift:'Karte '+n,beschreibung:'Text',blatt,ziel,von,art:'entscheidung',kommentare:[],verlauf:[],geaendert:'2026-09-20T09:0'+n.slice(-1)+':00.000Z'});
  N('006','vorrat','Solar','Claude');N('007','offen','Buch','Eigner');await sleep(100);
  const allLanes=()=>$$('#board .lane.fold').map(l=>l.dataset.lane+':'+l.getAttribute('aria-expanded')).join(',');
  findBtn('#filter button',/^Claude$/).click();await sleep(50);chip('Haus').click();await sleep(50);
  findBtn('#filter button',/^alle$/).click();await sleep(50);out.whoBack=snap();
  N('008','offen','Neu','Claude');await sleep(100);out.arrived=snap();
  findBtn('#views button',/^Bei Claude/).click();await sleep(100);out.claudeView={chips:state(),lanes:allLanes()};
  findBtn('#views button',/^Für Dich/).click();await sleep(100);
  document.querySelector('#board .lane.fold[data-lane="offen:Funk"]').click();await sleep(50);
  let kept2=null;try{kept2=localStorage.getItem('eb-hidden')+' '+localStorage.getItem('eb-solo')}catch(e){}
  out.laneHead={chips:state(),offen:nrs('Offen'),kept:kept2};
});
