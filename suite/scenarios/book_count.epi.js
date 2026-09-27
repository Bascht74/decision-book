{const out={};try{
  document.getElementById('ver').click();
  out.count=(document.getElementById('bookcount')||{}).textContent||null;out.warn=!!document.getElementById('bookwarn');
  out.statsWarn=!!document.querySelector('#stats .bookfull');
}catch(e){out._exception=String(e&&e.stack||e).slice(0,300)}probe(out)}
