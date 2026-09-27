scenario(async out=>{
  await until(()=>document.querySelector('#board .relgrp[data-rel="3.0.0b29"]'));await sleep(150);
  const g=z=>document.querySelector('#board .relgrp[data-rel="'+z+'"]');
  out.groupsB28=$$('tr.sgrp',g('3.0.0b28')).map(t=>t.dataset.stand+' '+t.querySelector('td.pc').textContent).join(',');
  out.sumB28=g('3.0.0b28').querySelector('tfoot td.pc').textContent;out.sumB29=g('3.0.0b29').querySelector('tfoot td.pc').textContent;
  const heads=()=>$$('thead th button',g('3.0.0b28'));
  const judge=()=>{const broken=[],over=[];
    for(const b of heads()){const tn=[...b.childNodes].find(n=>n.nodeType===3);if(!tn)continue;const s=tn.textContent;let i=0;
      for(const w of s.split(' ')){if(w.length>1){const r=document.createRange();r.setStart(tn,i);r.setEnd(tn,i+w.length);if(new Set([...r.getClientRects()].map(x=>Math.round(x.top))).size>1)broken.push(w)}i+=w.length+1}
      if(b.scrollWidth>b.parentElement.clientWidth+0.5)over.push(s)}
    return [broken,over]};
  [out.brokenWords,out.overflowHeads]=judge();
  heads().find(b=>b.textContent.startsWith('verbraucht')).click();await sleep(80);
  const [b2,o2]=judge();out.brokenSorted=b2;out.overSorted=o2;
});
