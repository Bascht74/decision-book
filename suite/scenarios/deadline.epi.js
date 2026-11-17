scenario(async out=>{
  const head=nr=>document.querySelector('#board details[data-nr="'+nr+'"] summary');
  await until(()=>head('E-721')&&head('E-728'));
  const fl=nr=>head(nr).querySelector('.frist'),f=nr=>[...head(nr).querySelectorAll('.frist')].map(x=>x.textContent);
  const p=x=>String(x).padStart(2,'0'),dm=n=>{const d=new Date();d.setDate(d.getDate()+n);return p(d.getDate())+'.'+p(d.getMonth()+1)+'.'+(d.getFullYear()!==new Date().getFullYear()?d.getFullYear():'')};
  const same=(got,want)=>JSON.stringify(got)===JSON.stringify(want)?true:{got,want};
  out.withTime=same(f('E-721'),['Frist: '+dm(0)+' 23:59 – heute · sonst: Option 1']);
  out.past=/^Frist: \d\d\.\d\d\.(\d{4})? \d\d:\d\d – überfällig · ich nehme: Option 2$/.test(f('E-722')[0]||'')||f('E-722');
  out.none=f('E-723');
  out.dayOnly=same(f('E-724'),['Frist: '+dm(0)+' – heute']);
  out.dayOnlyEnds=/23:59$/.test((fl('E-724')||{}).title||'')||(fl('E-724')||{}).title||null;
  out.dayOnlyPast=same(f('E-725'),['Frist: '+dm(-1)+' – überfällig']);
  out.tomorrow=same(f('E-726'),['Frist: '+dm(1)+' – morgen']);
  out.twoDays=same(f('E-727'),['Frist: '+dm(2)+' 00:01 – noch 2 Tage']);
  out.tenDays=same(f('E-728'),['Frist: '+dm(10)+' – noch 10 Tage']);
  out.red=['E-721','E-722','E-724','E-725','E-726','E-727','E-728'].filter(n=>fl(n)&&!fl(n).classList.contains('soon')).join(',');
  await sleep(1000);out.writes=CALLS.length;
});
