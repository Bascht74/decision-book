scenario(async out=>{
  await until(()=>document.querySelector('#zover tbody tr'));await sleep(150);
const amounts=()=>$$('#zover tbody tr,#zover tfoot tr').map(r=>r.lastElementChild.textContent).join('|');
  out.noMeta=amounts();out.rate0=document.querySelector('.zhead').textContent;out.dayLine=document.querySelector('details.zday summary').textContent;
  __DB.external('meta/zeiten',{hinweis:'Nur ein Hinweis.',aktualisiert:'2026-11-18T07:30:00Z'});await sleep(150);
  out.noSatz=amounts();out.hint=(document.querySelector('.zhint')||{}).textContent;
  __DB.external('meta/zeiten',{satz:100});await sleep(150);out.withSatz=amounts();
});
