scenario(async out=>{
  await until(()=>/live/.test(document.getElementById('live').textContent));
  const rd=document.getElementById('ready');out.rows=$$('.rtab tr',rd).map(tr=>[...tr.children].map(c=>c.textContent).join("|"));
  out.step=rd.querySelector('.stepbtn').textContent;
  rd.querySelector('.stepbtn').click();out.step1=(rd.querySelector('.steps li:not(.doneline)')||{}).textContent;
  out.writes=CALLS.length;
});
