scenario(async out=>{
  await until(()=>document.getElementById('rel-runs'));await sleep(150);out.innerWidth=innerWidth;
  const over=[];const chk=name=>{const sw=document.scrollingElement.scrollWidth;if(sw>innerWidth)over.push(name+' '+sw+'>'+innerWidth)};
  chk('Releases with a run');
  const l=document.getElementById('step-live').getBoundingClientRect();out.stepLiveInside=l.left>=0&&l.right<=innerWidth;
  document.querySelector('#ready .stepbtn').click();await sleep(60);chk('steps open');
  out.overflowing=over;
});
