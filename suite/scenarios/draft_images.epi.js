scenario(async out=>{
  const png=await new Promise(r=>{const c=document.createElement('canvas');c.width=40;c.height=30;c.getContext('2d').fillRect(0,0,20,20);c.toBlob(r,'image/png')});
  const img=()=>new File([png],'bild.png',{type:'image/png'}),txt=()=>new File(['x'],'notiz.txt',{type:'text/plain'});
  const drop=(t,f)=>{const dt=new DataTransfer();dt.items.add(f);const o=new DragEvent('dragover',{dataTransfer:dt,bubbles:true,cancelable:true});t.dispatchEvent(o);
    const d=new DragEvent('drop',{dataTransfer:dt,bubbles:true,cancelable:true});t.dispatchEvent(d);return o.defaultPrevented&&d.defaultPrevented};
  const paste=(t,f)=>{const dt=new DataTransfer();dt.items.add(f);t.dispatchEvent(new ClipboardEvent('paste',{clipboardData:dt,bubbles:true,cancelable:true}))};
  // the × stands at the top right of the thumbnail, can be hit there, and is not cut off
  const xAt=box=>{const w=box&&box.querySelector('.tw'),x=w&&w.querySelector('.tx'),im=w&&w.querySelector('img');if(!x)return 'no ×';
    const a=x.getBoundingClientRect(),b=im.getBoundingClientRect();if(!(a.width>=16&&a.height>=16))return 'too small';
    if(!(a.left+a.width/2>b.left+b.width/2&&a.top+a.height/2<b.top+b.height/2))return 'not top right';
    x.scrollIntoView({block:'center'});const c=x.getBoundingClientRect(),h=document.elementFromPoint(c.left+c.width/2,c.top+c.height/2);
    if(h!==x&&!x.contains(h))return 'covered';for(const [px,py] of [[c.left+1,c.top+c.height/2],[c.right-1,c.top+c.height/2],[c.left+c.width/2,c.top+1]]){const e=document.elementFromPoint(px,py);if(e!==x&&!x.contains(e))return 'cut off'}
    return 'ok'};
  const res={};
  const rgb=c=>c.match(/[\d.]+/g).map(Number);
  const L=c=>{const [r,g,b]=rgb(c).slice(0,3).map(x=>{x/=255;return x<=0.03928?x/12.92:((x+0.055)/1.055)**2.4});return 0.2126*r+0.7152*g+0.0722*b};
  const cr=(a,b)=>{const [x,y]=[L(a),L(b)].sort((p,q)=>p-q);return Math.round((y+0.05)/(x+0.05)*10)/10};
  const one=async(name,ta,box,btn,wrap)=>{const r=res[name]={};
    r.dropImage=drop(ta,img());await until(()=>box.querySelector('.tw'),3000);r.thumbs=box.querySelectorAll('.tw').length;r.enabled=!!btn()&&!btn().disabled;
    r.x=xAt(box);{const cs=getComputedStyle(box.querySelector('.tx'));r.xContrast=cr(cs.color,cs.backgroundColor)}box.querySelector('.tx').click();await sleep(100);r.afterX=box.querySelectorAll('.tw').length;r.greyAgain=!!btn()&&btn().disabled;
    paste(ta,img());await until(()=>box.querySelector('.tw'),3000);r.pasteX=xAt(box);box.querySelector('.tx').click();await sleep(100);r.afterPasteX=box.querySelectorAll('.tw').length;
    r.dropText=drop(ta,txt());await sleep(300);r.textThumbs=box.querySelectorAll('.tw').length;r.note=/nur Bilder/.test(wrap.textContent)};
  out.dark=matchMedia('(prefers-color-scheme: dark)').matches;
  // order field
  const at=await until(()=>document.getElementById('auftrag-text'));
  await one('auftrag',at,document.getElementById('auftrag-bilder'),()=>document.getElementById('auftrag-senden'),document.getElementById('auftrag-note'));
  // talk field
  const gt=await until(()=>document.getElementById('g-g1'));const gbox=gt.closest('[data-g]').querySelector('.thumbs');
  await one('talk',gt,gbox,()=>findBtn('[data-g="g1"] .row .act',/^Senden/),gt.closest('[data-g]'));
  // card field
  await goView('Für Dich');const ct=await until(()=>{const d=document.querySelector('details[data-nr="E-702"]');if(d)d.open=true;return document.getElementById('ans-E-702')});
  const cbox=ct.closest('.answer').querySelector('.thumbs');
  await one('card',ct,cbox,()=>findBtn('details[data-nr="E-702"] .answer .act',/^Senden/),ct.closest('.answer'));
  Object.assign(out,res);
});
