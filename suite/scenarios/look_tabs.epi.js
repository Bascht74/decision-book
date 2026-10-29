scenario(async out=>{
  await until(()=>document.querySelector('#views [aria-selected="true"]'));await sleep(50);
  const st=()=>{const a=document.querySelector('#views [aria-selected="true"]'),cs=getComputedStyle(a),af=getComputedStyle(a,'::after');
    const others=$$('#views [role="tab"]').filter(b=>b!==a);
    // the bar is placed against the tab itself: without a positioned tab it would hang off the next positioned box
    return {label:a.textContent.trim().slice(0,10),weight:+cs.fontWeight,color:cs.color,anchored:cs.position,
      line:af.content==='none'?'none':af.height,lineColor:af.backgroundColor,lineInset:[af.left,af.right],
      othersWeight:Math.max(...others.map(b=>+getComputedStyle(b).fontWeight)),
      othersLines:others.filter(b=>getComputedStyle(b,'::after').content!=='none').length}};
  out.dich=st();
  await goView('Releases');out.releases=st();
  out.lineContrast=ratio(rgbaOf(out.releases.lineColor),groundOf(document.getElementById('views')));
});
