scenario(async out=>{
  await until(()=>document.querySelector('#filter button')&&$$('#filter .who').length===2);await sleep(100);
  const R=e=>e.getBoundingClientRect(),f=document.getElementById('filter'),[w1,w2]=$$('#filter .who'),next=w2.nextElementSibling;
  out.twoLines=R(w2).top>=R(w1).bottom-1;                                 // the second group starts a line of its own
  out.withLabel=!!next&&Math.abs(R(next).top-R(w2).top)<2;               // "Release:" on the line of its first button
  const text=e=>{const r=document.createRange();r.selectNodeContents(e);return r.getBoundingClientRect().left};
  out.labelsAligned=Math.round(Math.abs(text(w2)-text(w1)));             // both labels' text at one x
  out.edge=Math.round(R(w2).left-R(f).left);                              // its line lies on the filter's own edge
});
