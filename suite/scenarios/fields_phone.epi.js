scenario(async out=>{
  await sleep(200);out.innerWidth=innerWidth;
  const over=[],bad=[];let checked=0;
  const chk=name=>{const sw=document.scrollingElement.scrollWidth;if(sw>innerWidth)over.push(name+' '+sw+'>'+innerWidth);
    for(const f of $$('#board .fields')){if(!f.getClientRects().length)continue;const nr=f.closest('[data-nr]').dataset.nr;
      for(const s of $$('select',f)){checked++;const r=s.getBoundingClientRect();if(r.right>innerWidth+0.5||r.left<-0.5)bad.push(name+' '+nr+' '+s.getAttribute('aria-label')+' '+Math.round(r.left)+'..'+Math.round(r.right))}}};
  for(const nr of ['E-401','E-402']){const d=await until(()=>document.querySelector('#board details[data-nr="'+nr+'"]'));
    const t=d.closest('section.col');if(t&&!t.getClientRects().length){const b=$$('#tabs button').find(x=>x.textContent.startsWith(t.getAttribute('aria-label').split(' ')[0]));if(b){b.click();await sleep(60)}}
    const d2=document.querySelector('#board details[data-nr="'+nr+'"]');d2.open=true;await sleep(60);chk('Für Dich '+nr)}
  out.fieldCount=$$('#board details[data-nr="E-402"] .fields select').length||$$('#board details[data-nr="E-401"] .fields select').length;
  await goView('Erledigt');const tg=await until(()=>document.getElementById('verw-toggle'));tg.click();await sleep(80);
  const row=document.querySelector('#board .vtab tr[data-nr="E-403"]');if(row){row.click();await sleep(80)}
  out.verwCardOpen=!!document.querySelector('#board .vtab tr.gfull details[data-nr="E-403"]');
  chk('Erledigt, Verworfen offen');
  await goView('Releases');await sleep(60);const vg=document.getElementById('rg:3.0.0b28|verworfen');if(vg){vg.click();await sleep(60)}chk('Releases, Verworfen offen');
  out.overflowing=over;out.bad=bad;out.checked=checked;
});
