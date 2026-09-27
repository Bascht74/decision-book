scenario(async out=>{
  if(!matchMedia('(prefers-color-scheme: dark)').matches){out._skip='this Chrome does not emulate prefers-color-scheme: dark';return}
  await until(()=>document.querySelector('#board details'));await sleep(100);
  const cs=e=>getComputedStyle(e);
  out.bodyBackground=cs(document.body).backgroundColor;out.bodyText=cs(document.body).color;
  out.colorScheme=cs(document.documentElement).colorScheme;
  const d=document.querySelector('#board details');out.cardBackground=cs(d).backgroundColor;
  // every visible text in the board is lighter than the dark paper: sample the luminance of the text colours used
  const lum=c=>{const m=c.match(/\d+(\.\d+)?/g).map(Number);return (0.2126*m[0]+0.7152*m[1]+0.0722*m[2])/255};
  const dark=$$('#board *').filter(e=>e.childNodes.length&&[...e.childNodes].some(n=>n.nodeType===3&&n.textContent.trim())&&e.getBoundingClientRect().width).filter(e=>lum(cs(e).color)<0.35).map(e=>e.tagName+'.'+e.className+' '+cs(e).color);
  out.darkTextOnDarkPaper=[...new Set(dark)].slice(0,5);
  await goView('Aufträge');out.talkFieldBackground=cs(document.getElementById('g-g1')).backgroundColor;
});
