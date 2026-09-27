scenario(async out=>{
  await until(()=>document.querySelector('#ready .rtab'));await sleep(100);
  const rd=document.getElementById('ready'),b=rd.querySelector('.stepbtn').getBoundingClientRect(),t=rd.querySelector('.rtab').getBoundingClientRect();
  out.below=t.top>=b.bottom-1;out.leftAligned=Math.abs(t.left-b.left)<=2;out.width=innerWidth;
});
