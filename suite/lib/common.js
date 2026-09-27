// Loaded right after the stand-in, before the page's own script.
// Every script error and unhandled rejection anywhere lands in ERRS; probe() reports ERRS as "_errors",
// and run_all.sh fails a scenario whose _errors is not empty.
window.ERRS=[];
addEventListener('error',e=>{if(e instanceof ErrorEvent)ERRS.push('error: '+e.message+(e.lineno?' (line '+e.lineno+')':''))});
addEventListener('unhandledrejection',e=>{const r=e.reason;ERRS.push('rejection: '+(r&&(r.message||r.code)?(r.message||r.code):JSON.stringify(r)))});
window.sleep=ms=>new Promise(r=>setTimeout(r,ms));
// wait until cond() is truthy (virtual time), at most ms; returns the last value
window.until=async(cond,ms=3000)=>{const t=Date.now();let v;while(!(v=(()=>{try{return cond()}catch(e){return false}})())&&Date.now()-t<ms)await sleep(25);return v};
let probed=false;
window.probe=o=>{if(probed)return;probed=true;
  const s=JSON.stringify(Object.assign({},o,{_errors:ERRS.slice()}));
  const b=btoa(unescape(encodeURIComponent(s)));
  if(window.parent!==window){parent.postMessage('SUITE:'+b,'*');return}
  const p=document.createElement('pre');p.id='suite-out';p.textContent=b;document.body.append(p)};
// scenario(async out=>{...}): fills out, and probes it also when the scenario itself throws
window.scenario=fn=>{const out={};(async()=>{try{await fn(out)}catch(e){out._exception=String(e&&(e.stack||e.message)||e).slice(0,300)}probe(out)})()};
// small DOM helpers for the scenarios
window.$$=(s,r)=>[...(r||document).querySelectorAll(s)];
window.findBtn=(sel,re,r)=>$$(sel,r).find(b=>re.test(b.textContent));
window.goView=async lbl=>{const b=findBtn('#views button',new RegExp('^'+lbl));if(!b)throw new Error('no view button '+lbl);b.click();await sleep(50)};
window.typeIn=(f,v)=>{f.focus();f.value=v;f.dispatchEvent(new Event('input',{bubbles:true}))};
window.press=(t,k,o)=>t.dispatchEvent(new KeyboardEvent('keydown',Object.assign({key:k,bubbles:true,cancelable:true},o||{})));
try{localStorage.clear()}catch(e){}
