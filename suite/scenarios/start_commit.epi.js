scenario(async out=>{
  const btn=()=>document.querySelector('#ready .startrel');
  await until(btn);
  out.withText=btn().textContent;out.info=(document.querySelector('#ready .startinfo')||{}).textContent||'';
  out.link=((document.querySelector('#ready .startinfo a')||{}).href)||'';
  btn().click();await until(()=>CALLS.some(c=>c.startsWith('SEND')));
  out.standWrite=CALLS.some(c=>c.startsWith('update meta/stand')&&c.includes('"gestartet_commit":"abc1234def5678"'));
  out.orderWrite=CALLS.some(c=>c.startsWith('set auftraege/')&&c.includes('"commit":"abc1234def5678"')&&c.includes('"lauf_gruen":true'));
  out.sentText=SENT[0]||'';out.sent=out.sentText.includes('abc1234def5678')&&out.sentText.includes('https://example.org/lauf/1');
  const n0=CALLS.length;
  __DB.external('meta/stand',{wartet_auf_start:true,start_commit:'',start_lauf_url:'',start_lauf_gruen:false});
  await until(()=>btn()&&!btn().disabled);
  out.missingText=btn().textContent;
  btn().click();await sleep(300);out.writesAfterFirstClick=CALLS.length-n0;out.secondText=btn()?btn().textContent:null;
  if(btn())btn().click();await until(()=>CALLS.length>n0+1);await sleep(100);
  out.missingWrite=CALLS.slice(n0).some(c=>c.startsWith('set auftraege/')&&c.includes('Stand fehlt')&&c.includes('"lauf_gruen":false'));
});
