scenario(async out=>{
  await openSettings();await sleep(200);
  out.dialog=!!document.querySelector('.vlog');out.section=!!document.getElementById('archiv-packen');
  out.packBtns=$$('.vlog button').filter(b=>/^Packen$/.test(b.textContent)).length;
});
