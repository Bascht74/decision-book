// Text from the db never becomes markup, and a javascript: address never becomes a live link or picture (converted from review s7).
window.__SYNC=true;seed(3);const S=__DB.store;
S.set('meta/laeufe',{laeufe:[{name:'Lauf',url:'javascript:localStorage.setItem("pwn","link")',status:'läuft'}]});
S.set('auftragsbilder/b1',{url:'javascript:localStorage.setItem("pwn2","img")',zeit:'x'});
S.set('auftraege/o1',{text:'x <img src=x onerror=window.pwn3=1> https://example.org/"><b>fett</b>',zeit:'2026-09-27T08:00:00Z',status:'neu',bilder:['b1']});
S.set('gespraech/g1',{start:'2026-09-27T07:00:00.000Z',status:'offen',nachrichten:[{von:'Claude',text:'<script>window.pwn4=1<\/script> javascript:void(0) https://example.org/ok',zeit:'2026-09-27T07:01:00.000Z'}]});
localStorage.setItem('eb-view','sitzung');
