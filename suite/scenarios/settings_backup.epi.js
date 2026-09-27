scenario(async out=>{
  // the version number opens only the change log; "⚙ Einstellungen" opens the settings in their own dialog, focused
  const v=await until(()=>document.getElementById('ver'));v.click();await sleep(50);
  out.logHasSettings=!!document.querySelector('.vlog #sicherung-zyklus');press(document.body,'Escape');await sleep(50);
  document.getElementById('setbtn').click();await sleep(50);
  out.dialog=(document.querySelector('.vlog [role="dialog"]')||{getAttribute:()=>''}).getAttribute('aria-label');
  out.focused=document.activeElement&&document.activeElement.id;out.noLog=!document.querySelector('.vlog h3');
  const btn=await until(()=>{const b=document.getElementById('jetzt-sichern');return b&&!b.hidden&&b});
  out.btnShown=!!btn;if(!btn)return;const sel=document.getElementById('sicherung-zyklus');out.defaultCycle=sel&&sel.value;
  btn.click();await until(()=>window.SAVED);await sleep(50);
  const d=JSON.parse(window.SAVED.data);out.fileName=/^entscheidungsbuch-.*\.json$/.test(window.SAVED.filename);
  out.collections=Object.keys(d.daten).sort();out.cards=Object.keys(d.daten.entscheidungen).length;out.talk=!!d.daten.gespraech.g1;
  const n0=CALLS.filter(c=>/meta\/einstellungen/.test(c)&&/^(update|set)/.test(c)).length;
  sel.value='15min';sel.dispatchEvent(new Event('change'));await sleep(200);
  sel.dispatchEvent(new Event('change'));await sleep(200);
  out.writes=CALLS.filter(c=>/meta\/einstellungen/.test(c)&&/^(update|set)/.test(c)).length-n0;
  out.stored=(__DB.store.get('meta/einstellungen')||{}).sicherung_zyklus;
});
