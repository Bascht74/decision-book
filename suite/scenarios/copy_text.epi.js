scenario(async out=>{
  const card=nr=>document.querySelector('#board details[data-nr="'+nr+'"]'),T=__DB.store.get('entscheidungen/E-691').kopiertext;
  const d=await until(()=>card('E-691')&&card('E-692')&&card('E-691'));await sleep(100);
  // closed: no box, but project and text are there for the browser's find
  out.closedBox=!!d.querySelector('.kopie');out.findText=[/Haus/,/Guten Tag/].map(re=>re.test((d.querySelector('.ftext')||{}).textContent||''));
  d.open=true;card('E-692').open=true;await sleep(60);
  const box=d.querySelector('.kopie'),f=box&&box.querySelector('textarea');
  out.box=box?box.querySelector('h3').textContent:null;out.text=f?f.value===T:null;out.readOnly=f?f.readOnly:null;out.markup=box?box.querySelectorAll('strong,em,code,a').length:null;
  const kids=[...d.querySelector('.body').children],iDesc=kids.findIndex(k=>/Worum es geht/.test(k.textContent)),iBox=kids.indexOf(box),iAns=kids.findIndex(k=>k.classList.contains('quick'));
  out.place=iBox===iDesc+1&&iBox<iAns;
  out.none=!!card('E-692').querySelector('.kopie');
  if(f){f.focus();await sleep(20);out.marksAll=[f.selectionStart,f.selectionEnd-T.length]}
  const kb=findBtn('.kopie button',/^Kopieren$/,d),note=()=>(d.querySelector('.kopie .saved')||{}).textContent||null;
  if(kb){kb.click();await sleep(50)}out.copied=COPIED.length===1&&COPIED[0]===T;out.note=note();
  // the browser refuses the clipboard: the text stays marked, and the line says so
  window.CLIP_OK=false;document.execCommand=()=>false;if(f){f.blur();f.setSelectionRange(0,0)}
  if(kb){kb.click();await sleep(50)}out.refused=note();out.stillMarked=f?[f.selectionStart,f.selectionEnd-T.length]:null;out.writes=CALLS.length;
});
