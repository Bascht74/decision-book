{const out={};try{
  out.statsWarn=(document.querySelector('#stats .bookfull')||{}).textContent||null;
  document.getElementById('ver').click();
  out.count=(document.getElementById('bookcount')||{}).textContent||null;out.warn=(document.getElementById('bookwarn')||{}).textContent||null;
}catch(e){out._exception=String(e&&e.stack||e).slice(0,300)}probe(out)}
