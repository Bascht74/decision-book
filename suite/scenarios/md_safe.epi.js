scenario(async out=>{
  const d=await until(()=>{const d=document.querySelector('details[data-nr="E-701"]');if(d)d.open=true;return d&&d.querySelector('.ktalk')&&d});
  const bt=d.querySelector('.ktalk .donebtn');if(bt.getAttribute('aria-expanded')!=='true')bt.click();await sleep(50);
  await goView('Aufträge');await sleep(50);
  const boxes=[d.querySelector('.ktalk .step:last-of-type .full'),d.querySelector('.body .md'),document.querySelector('[data-g="g1"] .bub')];
  out.boxes=boxes.filter(Boolean).length;
  out.foreignElements=boxes.filter(Boolean).map(b=>b.querySelectorAll('img,script,b,i,a,svg,iframe,u').length);
  out.mdElements=boxes.filter(Boolean).map(b=>b.querySelectorAll('strong,code,em,table,.mdh').length);
  out.literal=boxes.filter(Boolean).map(b=>b.textContent.includes('<script>window.pwnMd2=1<\/script>')&&b.textContent.includes('<b>fett</b>'));
  await sleep(300);out.pwn=[window.pwnMd,window.pwnMd2,window.pwnMd3,window.pwnMd4].map(x=>x||null);
});
