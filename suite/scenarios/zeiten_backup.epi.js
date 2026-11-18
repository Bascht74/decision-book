scenario(async out=>{
  document.getElementById('setbtn').click();await sleep(50);
  const btn=await until(()=>{const b=document.getElementById('jetzt-sichern');return b&&!b.hidden&&b});
  btn.click();await until(()=>window.SAVED);
  const d=JSON.parse(window.SAVED.data);out.zeiten=Object.keys(d.daten.zeiten||{});out.metaZeiten=!!(d.daten.meta||{}).zeiten;
});
