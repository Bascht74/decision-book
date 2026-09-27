scenario(async out=>{
  await openSettings();await until(()=>document.getElementById('pack:3.0.0b27'));out.innerWidth=innerWidth;const over=[];
  const chk=n=>{const b=document.querySelector('.vlog .box');const sw=document.scrollingElement.scrollWidth;if(sw>innerWidth)over.push(n+' page '+sw);if(b&&b.scrollWidth>b.clientWidth+1)over.push(n+' box '+b.scrollWidth+'>'+b.clientWidth)};
  chk('list');document.getElementById('pack:3.0.0b27').click();await sleep(100);chk('question');
  const r=document.getElementById('pack-ja').getBoundingClientRect(),r2=document.getElementById('pack-nein').getBoundingClientRect(),r3=document.getElementById('pack:3.0.0b27').getBoundingClientRect();
  out.btnsInside=r.left>=0&&r2.right<=innerWidth&&r3.right<=innerWidth;out.tall=Math.min(r.height,r2.height,r3.height)>=32;
  document.getElementById('pack-ja').click();await until(()=>/^(Gepackt|Gestoppt)/.test(packNote()),8000);chk('done');
  out.overflowing=over;
});
