{const out={};try{
  const n=s=>Number((/(\d+)/.exec(s||'')||[])[1]);const rd=document.getElementById('ready');
  out.viewButtonN=Number(findBtn('#views button',/^Für Dich/).querySelector('.n').textContent);
  out.badge=document.getElementById('waits').textContent;out.badgeN=n(out.badge);
  out.boardCards=$$('#board details').length;
  out.readyLine=rd.querySelector('.stepbtn').textContent;
  rd.querySelector('.stepbtn').click();const li=document.querySelector('#steps-list li.cur')||document.querySelectorAll('#steps-list li')[0];
  out.step1=li&&li.textContent;
  const cur=rd.querySelector('.rtab tr.cur');const heads=[...rd.querySelectorAll('.rtab tr:first-child th')].map(x=>x.textContent);
  out.tableOffenCur=cur&&cur.children[heads.indexOf('Offen')].textContent;
  out.same=out.viewButtonN===out.badgeN&&out.badgeN===out.boardCards;out.writes=CALLS.length;
}catch(e){out._exception=String(e&&e.stack||e).slice(0,300)}probe(out)}
