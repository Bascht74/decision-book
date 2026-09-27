scenario(async out=>{
  await sleep(300);
  const li=document.querySelector('li[data-auftrag="o1"]');
  out.orderMarkupElements=li.querySelectorAll('.atext img,.atext b').length;
  out.talkMarkupElements=document.querySelectorAll('[data-g="g1"] .bub script').length;
  out.talkLinks=$$('[data-g="g1"] .bub a').map(a=>a.getAttribute('href'));
  out.jsHrefs=$$('a[href]').map(a=>a.getAttribute('href')).filter(h=>/^\s*javascript:/i.test(h));
  out.jsImgSrc=$$('img[src]').map(i=>i.getAttribute('src')).filter(h=>/^\s*javascript:/i.test(h));
  for(const a of $$('.runs a'))a.click();for(const i of $$('li[data-auftrag] img'))i.onclick&&i.onclick();await sleep(500);
  out.pwn=localStorage.getItem('pwn');out.pwn2=localStorage.getItem('pwn2');out.pwn3=window.pwn3||null;out.pwn4=window.pwn4||null;
});
