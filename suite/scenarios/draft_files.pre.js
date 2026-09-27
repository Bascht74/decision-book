// with the assets store, a send field takes other files too (PDF, text, CSV, JSON, Markdown, video): an unsent
// one is a chip with its name and size and the same ×; a sent one opens as a link; zip and docx are refused by name.
window.__ASSETS=true;
const S=__DB.store;S.set('meta/stand',{aktuell:'3.0.0b28'});
S.set('gespraech/g1',{start:'2026-09-27T07:00:00.000Z',status:'offen',wartet:'',thread:'t0',nachrichten:[{von:'Claude',text:'Hallo',zeit:'2026-09-27T07:01:00.000Z'}]});
localStorage.setItem('eb-view','sitzung');
