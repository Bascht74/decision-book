scenario(async out=>{
  await openImport();out.buttons=$$('#import .row button').map(b=>b.textContent+(b.disabled?' (aus)':''));
  out.folderInput=!!document.querySelector('#import-ordner[webkitdirectory][multiple]');
  const b=backup(12);b.daten.fremd={x:{a:1}};
  const w0=writes().length;pickFiles('import-datei',[jf('entscheidungsbuch.json',b)]);
  await until(()=>/^Eingelesen/.test(impNote()),8000);
  out.asked=!!document.querySelector('#import-frage:not([hidden])');out.note=impNote();out.lines=lines();
  out.cards=docIds('entscheidungen').length;out.card1=(__DB.store.get('entscheidungen/E-001')||{}).ueberschrift;
  out.idsKept=docIds('auftraege').join(',')+'|'+docIds('gespraech').join(',')+'|'+docIds('archiv').join(',')+'|'+docIds('auftragsbilder').join(',');
  out.picture=(__DB.store.get('auftragsbilder/p1')||{}).data;out.deletes=writes().slice(w0).filter(c=>/^delete/.test(c)).length;
  out.maxInFlight=INFLIGHT.max;out.progress=NOTES.some(t=>/^liest ein … \d+ von 19/.test(t));out.fremd=!!__DB.store.get('fremd/x');
  out.order=writes().slice(w0).map(c=>c.split(' ')[1].split('/')[0]).filter((x,i,a)=>a.indexOf(x)===i);
  out.dialogs=DIALOGS.join(',');await sleep(200);out.boardCard=!!document.querySelector('details[data-nr="E-001"]')||[...document.querySelectorAll('#board *')].some(e=>e.textContent==='Gesicherte Karte 1');
});
