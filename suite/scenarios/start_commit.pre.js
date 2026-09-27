// the release start shows the commit and green run from meta/stand and sends them along; without them "Stand fehlt" and a second click.
window.__SYNC=true;const S=__DB.store;
S.set('meta/stand',{aktuell:'3.0.0b28',wartet_auf_start:true,start_commit:'abc1234def5678',start_lauf_url:'https://example.org/lauf/1',start_lauf_gruen:true});
localStorage.setItem('eb-view','dich');
window.SENT=[];window.__ON_SEND=t=>SENT.push(t.text);
