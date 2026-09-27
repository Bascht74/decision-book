scenario(async out=>{
  const card=nr=>document.querySelector('#board details[data-nr="'+nr+'"]');
  await until(()=>card('E-711')&&card('E-712'));
  card('E-711').open=true;
  const body=nr=>card(nr).querySelector('.body');
  out.firstPruefen=body('E-711').firstElementChild.className;
  out.items711=[...body('E-711').querySelectorAll('.fw li')].map(x=>x.textContent);
  out.head711=(body('E-711').querySelector('.fwbox h3')||{}).textContent||'';
  const kids=[...body('E-712').children].map(x=>x.className||(x.querySelector('h3')||{}).textContent||'');
  out.after712=kids[kids.indexOf('fwbox')-1]||null;
  out.items712=[...body('E-712').querySelectorAll('.fw li')].map(x=>x.textContent);
  out.inputs=body('E-711').querySelectorAll('.fwbox input,.fwbox textarea,.fwbox button').length;
});
