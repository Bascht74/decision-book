scenario(async out=>{
  await until(()=>document.querySelector('#board details[open] .answer textarea'));await sleep(100);
  const vis=e=>e.getClientRects().length&&!e.disabled&&getComputedStyle(e).visibility!=='hidden';
  const name=e=>(typeof e.className==='string'&&e.className?e.className.split(' ')[0]:e.tagName.toLowerCase())+' '+(e.textContent||e.id||'').trim().slice(0,12);
  const col=s=>{const m=/(rgba?|color)\([^)]*\)/.exec(s);return m?rgbaOf(m[0]):null};
  // faded on purpose: a disabled control, or anything under an opacity below 1 (WCAG leaves inactive parts out)
  const faded=e=>{if(e.closest(':disabled'))return true;for(let n=e;n&&n.nodeType===1;n=n.parentElement)if(+getComputedStyle(n).opacity<1)return true;return false};
  const txt=[],edge=[],field=[],pill=[],plain=[];
  const take=where=>{
    for(const b of $$('.wrap button,.wrap [role="button"],#waits')){if(!vis(b))continue;const cs=getComputedStyle(b),own=groundOf(b),around=groundOf(b,false);
      if(b.textContent.trim())txt.push({w:where,t:name(b),c:ratio(rgbaOf(cs.color),own)});
      // a button with a fill or an edge of its own: the fill, the edge or the pressed line stands out 3:1
      const fill=rgbaOf(cs.backgroundColor)[3]>0,bw=parseFloat(cs.borderTopWidth),bc=rgbaOf(cs.borderTopColor),sh=/inset/.test(cs.boxShadow)?col(cs.boxShadow):null;
      if(!fill&&!(bw>0&&bc[3]>0))continue;
      edge.push({w:where,t:name(b),c:Math.max(fill?ratio(own,around):1,bw>0&&bc[3]>0?ratio(bc,around):1,sh?ratio(sh,own):1)})}
    for(const f of $$('.wrap input:not([type=file]),.wrap select,.wrap textarea')){if(!vis(f))continue;const cs=getComputedStyle(f);
      field.push({w:where,t:f.id||name(f),c:ratio(rgbaOf(cs.borderBottomColor),groundOf(f,false))});
      txt.push({w:where,t:'field '+(f.id||f.tagName),c:ratio(rgbaOf(cs.color),groundOf(f))})}
    for(const p of $$('.chip,.flag,.artlbl,.dep,.archmark,.z-erledigt,.z-laeuft,.z-wartet,.z-nicht')){if(!vis(p))continue;
      pill.push({w:where,t:name(p),c:ratio(rgbaOf(getComputedStyle(p).color),groundOf(p))})}
    // every other text: each element shown with a text of its own (hints, card lines, labels, tables), 4.5:1, large text 3:1
    for(const e of $$('.wrap *')){if(!e.getClientRects().length||![...e.childNodes].some(n=>n.nodeType===3&&n.textContent.trim()))continue;
      const cs=getComputedStyle(e);if(cs.visibility==='hidden'||faded(e))continue;
      const px=parseFloat(cs.fontSize),big=px>=24||(px>=18.66&&+cs.fontWeight>=700);
      plain.push({w:where,t:name(e),c:ratio(rgbaOf(cs.color),groundOf(e)),m:big?3:4.5})}};
  for(const v of ['Für Dich','Releases','Aufträge','Bei Claude','Erledigt','Statistik']){if(!findBtn('#views button',new RegExp('^'+v)))continue;await goView(v);
    for(const d of $$('#board details').slice(0,3))d.open=true;await sleep(30);take(v)}
  const low=(a,m)=>a.filter(x=>x.c<(x.m||m)).sort((p,q)=>p.c-q.c).slice(0,4).map(x=>x.w+': '+x.t+' '+x.c);
  out.counts=[txt.length,edge.length,field.length,pill.length,plain.length];
  out.textBelow45=low(txt,4.5);out.edgeBelow3=low(edge,3);out.fieldBelow3=low(field,3);out.pillBelow45=low(pill,4.5);out.plainBelow=low(plain,4.5);
  out.min=[txt,edge,field,pill,plain].map(a=>Math.min(...a.map(x=>x.c)));
});
