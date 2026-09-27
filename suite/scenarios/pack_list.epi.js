scenario(async out=>{
  await openSettings();await until(()=>document.getElementById('pack-liste'));
  out.lines=packLines();out.hint=(document.querySelector('#archiv-packen .hint')||{}).textContent;
  out.writes=calls(0).filter(c=>!/^get /.test(c));
});
