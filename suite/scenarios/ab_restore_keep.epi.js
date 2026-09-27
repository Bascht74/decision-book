scenario(async out=>{
  await until(()=>document.querySelector('#board .abgrp'));await sleep(50);
  document.getElementById('ab:3.0.0b27').click();await sleep(60);
  document.querySelector('#board .abtab tr[data-nr="E-011"]').click();await sleep(60);
  findBtn('#board .abrow button',/^Zurückholen$/).click();await sleep(100);
  out.askText=(document.querySelector('#board .abnote')||{}).textContent;
  {const yes=findBtn('#board .abrow button',/^Ja, zurückholen$/);if(yes)yes.click()}
  await until(()=>document.getElementById('ab-msg'));await sleep(200);
  const st=__DB.store.get('entscheidungen/E-011')||{};
  out.ziel=st.ziel;out.hasVorher='ziel_vorher' in st;
  out.msg=(document.getElementById('ab-msg')||{}).textContent||null;
});
