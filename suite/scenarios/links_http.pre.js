// Only http(s) addresses become links, from every place the db feeds: settings, runs, messages, pictures.
window.__SYNC=true;seed(3);const S=__DB.store;
S.set('meta/einstellungen',{sitzung_url:'javascript:localStorage.setItem("pwn","sitzung")',github_repo:'x/y" onmouseover="alert(1)'});
S.set('meta/laeufe',{laeufe:[{name:'Lauf',url:'data:text/html,<b>x</b>',status:'läuft'}]});
S.set('auftragsbilder/b1',{url:'javascript:localStorage.setItem("pwn2","img")',zeit:'x'});
S.set('auftraege/o1',{text:'Bild',zeit:'2026-09-27T08:00:00Z',status:'neu',bilder:['b1']});
S.set('gespraech/g1',{start:'2026-09-27T07:00:00.000Z',status:'offen',nachrichten:[{von:'Claude',text:'www.example.org/x ftp://example.org/y mailto:a@example.org https://example.org/ok',zeit:'2026-09-27T07:01:00.000Z'}]});
localStorage.setItem('eb-view','sitzung');
