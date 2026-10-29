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
// colours for the look_* scenarios: [r,g,b,a] from rgb(), rgba() and color(srgb …) (what color-mix() computes to)
window.rgbaOf=c=>{let m=/^color\(srgb ([\d.e+-]+) ([\d.e+-]+) ([\d.e+-]+)(?: \/ ([\d.]+))?\)/.exec(c);
  if(m)return [m[1]*255,m[2]*255,m[3]*255,m[4]===undefined?1:+m[4]];
  m=(c.match(/[\d.]+/g)||[]).map(Number);return [m[0]||0,m[1]||0,m[2]||0,m.length>3?m[3]:1]};
// what an element (self) or its surroundings (self=false) look like: the backgrounds laid over each other up to an opaque one
window.groundOf=(e,self=true)=>{const ls=[];for(let n=self?e:e.parentElement;n&&n.nodeType===1;n=n.parentElement){const c=rgbaOf(getComputedStyle(n).backgroundColor);if(c[3]>0)ls.push(c);if(c[3]>=1)break}
  let g=[255,255,255];for(const c of ls.reverse())g=g.map((x,i)=>x*(1-c[3])+c[i]*c[3]);return g};
window.lumOf=c=>{const [r,g,b]=c.slice(0,3).map(x=>{x/=255;return x<=0.04045?x/12.92:((x+0.055)/1.055)**2.4});return 0.2126*r+0.7152*g+0.0722*b};
window.ratio=(a,b)=>{const [x,y]=[lumOf(a),lumOf(b)].sort((p,q)=>p-q);return Math.round((y+0.05)/(x+0.05)*100)/100};
// elements that stick out of the window and are not inside a box that scrolls or clips them
window.sticksOut=()=>{const W=innerWidth,res=[];for(const e of document.querySelectorAll('.wrap *')){const r=e.getBoundingClientRect();
    if(!r.width||(r.right<=W+0.5&&r.left>=-0.5))continue;let inBox=false;
    for(let n=e.parentElement;n&&n!==document.body;n=n.parentElement){const o=getComputedStyle(n).overflowX;if(o!=='visible'){const q=n.getBoundingClientRect();if(q.right<=W+0.5&&q.left>=-0.5){inBox=true;break}}}
    if(!inBox)res.push((e.id?'#'+e.id:e.tagName.toLowerCase()+(typeof e.className==='string'&&e.className?'.'+e.className.split(' ')[0]:''))+' '+Math.round(r.left)+'..'+Math.round(r.right))}
  return res};
// how many px of an element's focus ring (its outline beyond the offset) a box that scrolls or clips it cuts away (0: whole)
window.ringCut=e=>{const r=e.getBoundingClientRect(),c=getComputedStyle(e),o=Math.max(0,parseFloat(c.outlineOffset)+parseFloat(c.outlineWidth));let cut=0;
  for(let n=e.parentElement;n&&n.nodeType===1;n=n.parentElement){const k=getComputedStyle(n),q=n.getBoundingClientRect(),b=s=>parseFloat(k['border'+s+'Width'])||0;
    if(k.overflowX!=='visible')cut=Math.max(cut,q.left+b('Left')-(r.left-o),r.right+o-(q.right-b('Right')));
    if(k.overflowY!=='visible')cut=Math.max(cut,q.top+b('Top')-(r.top-o),r.bottom+o-(q.bottom-b('Bottom')))}
  return Math.max(0,Math.round(cut*10)/10)};
try{localStorage.clear()}catch(e){}
