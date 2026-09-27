// HTML inside a Markdown text stays literal text; no element comes from it, nothing runs.
const S=__DB.store;S.set('meta/stand',{aktuell:'3.0.0b28'});
const T='## <img src=x onerror="window.pwnMd=1">Kopf\n<script>window.pwnMd2=1<\/script> **<b>fett</b>** `<i>code</i>`\n\n| <a href="javascript:window.pwnMd3=1">x</a> | <svg onload="window.pwnMd4=1"> |\n|---|---|\n| <iframe src="javascript:1"></iframe> | *<u>u</u>* |';
S.set('entscheidungen/E-701',{ueberschrift:'Karte',blatt:'offen',status:'offen',ziel:'3.0.0b28',von:'Claude',wartet:'Dich',beschreibung:T,
  kommentare:[{von:'Claude',text:T,zeit:'2026-09-27T07:00:00.000Z'}]});
S.set('gespraech/g1',{start:'2026-09-27T07:00:00.000Z',status:'offen',nachrichten:[{von:'Claude',text:T,zeit:'2026-09-27T07:01:00.000Z'}]});
localStorage.setItem('eb-view','fuerdich');
