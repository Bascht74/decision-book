scenario(async out=>{
  const d=await until(()=>document.querySelector('#board details[data-nr="E-801"]'));d.open=true;
  const d2=document.querySelector('#board details[data-nr="E-802"]');d2.open=true;await sleep(80);
  out.badges=$$('#board .badge').filter(b=>/roadmap/i.test(b.textContent+' '+b.className+' '+(b.title||''))).length;
  const opts=id=>{const s=document.getElementById(id);return s?[...s.options].map(o=>o.value):null};
  // no Typ dropdown at all; the one "Art" dropdown offers no "Roadmap", and a typ "Roadmap" card reads as an Entscheidung
  out.typOld=opts('ty-E-801');out.typNew=opts('ty-E-802');
  out.artOld=opts('ar-E-801');out.artOldValue=(document.getElementById('ar-E-801')||{}).value;out.artNewValue=(document.getElementById('ar-E-802')||{}).value;
  out.issueText=/Issue #1|ROADMAP\.md/.test(document.body.innerText+$$("[title]").map(e=>e.title).join(" "));
});
