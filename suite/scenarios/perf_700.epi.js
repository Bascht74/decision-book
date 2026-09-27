// Synchronous on purpose: under --virtual-time-budget the clocks stand still in every later task, and only
// run while the page is still being parsed. With __SYNC every snapshot and render happens inside this script.
{const out={};try{
  out.firstPaintMs=Math.round(performance.now()-T0);out.cardsInStore=[...__DB.store.keys()].filter(k=>k.startsWith('entscheidungen/')).length;
  out.liveAtStart=/^live/.test(document.getElementById('live').textContent);
  const click=l=>{const b=findBtn('#views button',new RegExp('^'+l));b.click()};
  let worst=0;const per={};
  for(const v of ['Für Dich','Bei Claude','Erledigt','Aufträge']){let t=performance.now();click(v);const sw=performance.now()-t;
    t=performance.now();for(let i=0;i<3;i++)__DB.external('entscheidungen/E-005',{geaendert:'2026-09-27T10:0'+i+':00.000Z'});const snap=(performance.now()-t)/3;
    per[v]={switchMs:Math.round(sw),snapshotMs:Math.round(snap),details:$$('#board details').length};worst=Math.max(worst,sw,snap)}
  out.perView=per;out.worstViewMs=Math.round(worst);
  click('Erledigt');out.archiveCards=$$('#board .atab tbody tr').length;
  const s=document.getElementById('suche');let t=performance.now();typeIn(s,'k');out.archiveKeystrokeMs=Math.round(performance.now()-t);
  const g=document.getElementById('gsuche');t=performance.now();typeIn(g,'karte 1');out.searchKeystrokeMs=Math.round(performance.now()-t);
  out.clockRuns=out.firstPaintMs>0;
}catch(e){out._exception=String(e&&e.stack||e).slice(0,300)}probe(out)}
