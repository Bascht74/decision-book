scenario(async out=>{
  await until(()=>document.querySelector('#board details')&&document.querySelector('#ready .stepbtn'));await sleep(100);
  const $=s=>document.querySelector(s),R=e=>e.getBoundingClientRect();
  const tb=$('#gsuche').closest('.wrap>*'),cs=getComputedStyle(tb);
  out.holds=[tb.contains($('#filter')),tb.contains($('#views')),tb.contains($('#ready'))];
  out.card=[cs.backgroundColor,cs.borderTopLeftRadius,cs.boxShadow!=='none'];
  out.order=[R($('#views')).top>=R($('.wrap>header')).bottom-1,R(tb).top>=R($('#views')).bottom-1,R($('#ready')).top>=R(tb).bottom-1];
  // groups set apart by a line: search | Entschieden von … | Release: …
  out.labels=$$('#filter .who').map(x=>x.textContent.trim());
  out.lines=[getComputedStyle($('#filter')).borderLeftStyle,...$$('#filter .who').map(x=>getComputedStyle(x).borderLeftStyle)];
  out.heights=[Math.round(R($('#gsuche')).height),Math.round(R($('#filter button')).height)];
  const on=$('#filter button[aria-pressed="true"]'),off=$('#filter button[aria-pressed="false"]');
  out.pressed=[getComputedStyle(on).backgroundColor,/inset/.test(getComputedStyle(on).boxShadow),+getComputedStyle(on).fontWeight];
  out.notPressed=[getComputedStyle(off).backgroundColor,getComputedStyle(off).boxShadow,+getComputedStyle(off).fontWeight];
});
