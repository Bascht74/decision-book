// synchronous (see README "Timing"): with __SYNC the whole page has drawn inside this script
{const out={};try{
  const all=$$('#board details');out.cards=all.length;
  out.closed=all.filter(d=>!d.open).length;out.closedWithBody=all.filter(d=>!d.open&&d.querySelector('.body')).length;
  out.nodesPerClosedCard=Math.round(all.filter(d=>!d.open).reduce((a,d)=>a+d.getElementsByTagName('*').length,0)/Math.max(1,out.closed));
  const a=all[0];a.querySelector('summary').click();out.clickBuilds=!!a.querySelector('.body textarea');
  const b=all[1];b.open=true;out.scriptOpenBuilds=!!b.querySelector('.body textarea')&&b.open===true;
  b.open=false;out.closesAgain=b.open===false;
  let t=performance.now();render(true);out.claudeRenderMs=Math.round(performance.now()-t);
  view='archiv';t=performance.now();render(true);out.archiveRenderMs=Math.round(performance.now()-t);out.rows=$$('#board .atab tbody tr').length;
  q='karte 1';t=performance.now();render(true);out.archiveSearchRenderMs=Math.round(performance.now()-t);out.hits=$$('#board .atab tbody tr').length;q='';
  const g=document.getElementById('gsuche');typeIn(g,'E-512');findBtn('#gtreffer .kbtn',/Öffnen/).click();
  const f=document.querySelector('#board details[data-nr="E-512"]');out.foundOpenWithBody=!!f&&f.open&&!!f.querySelector('#ans-E-512');
}catch(e){out._exception=String(e&&e.stack||e).slice(0,300)}probe(out)}
