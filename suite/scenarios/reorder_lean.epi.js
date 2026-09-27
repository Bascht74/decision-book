scenario(async out=>{
  await until(()=>document.querySelector('details[data-nr="R-05"]'));
  const lane=()=>$$('#board details[data-nr^="R-"]').map(d=>d.dataset.nr);
  const arrow=async(nr,a)=>{const d=document.querySelector('#board details[data-nr="'+nr+'"]');d.open=true;const c0=CALLS.length;findBtn('#board details[data-nr="'+nr+'"] .mv',new RegExp(a)).click();await sleep(1500);return CALLS.slice(c0)};
  const stamps=w=>w.filter(x=>/geaendert|eigner_am/.test(x)).length;
  let w=await arrow('R-05','↑');out.first={writes:w.length,stamps:stamps(w),order:lane().slice(0,6).join(' ')};
  w=await arrow('R-02','↓');out.second={writes:w.length,stamps:stamps(w),order:lane().slice(0,6).join(' ')};
  w=await arrow('R-20','↑');out.third={writes:w.length,stamps:stamps(w),order:lane().slice(17,22).join(' ')};
  const R=[...__DB.store.entries()].filter(([k])=>k.startsWith('entscheidungen/R-'));
  out.tailUnranked=R.filter(([k,v])=>v.rang==null).length;out.geaendertMoved=R.filter(([k,v])=>v.geaendert!=='2026-09-20T08:00:00.000Z').length;
  out.onlyRang=CALLS.filter(c=>c.startsWith('update entscheidungen/R-')).every(c=>/^update \S+ \{"rang":[\d.e+-]+\}$/.test(c));
});
