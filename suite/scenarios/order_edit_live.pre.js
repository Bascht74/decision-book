// Saving an edited order and sending a draft as a new order both go live to Claude first ("[A:<id>]"), then write the order.
seed(5);
__DB.store.set('auftraege/o1',{text:'Alt',zeit:'2026-09-27T08:00:00.000Z',status:'neu',bilder:[]});
__DB.store.set('auftraege/o2',{text:'Schon genommen',zeit:'2026-09-27T07:00:00.000Z',status:'übernommen',bilder:[]});
localStorage.setItem('eb-draft:aed:o2',JSON.stringify({text:'Mein Entwurf',bilder:[]}));
localStorage.setItem('eb-view','sitzung');
