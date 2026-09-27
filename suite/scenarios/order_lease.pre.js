// "in_bearbeitung" is a lease of 15 minutes: an order left open longer counts as submitted again, and opening it renews the lease.
seed(5);const M=6e4,iso=t=>new Date(Date.now()-t).toISOString();
__DB.store.set('auftraege/a1',{text:'Liegen gelassen',zeit:'2026-09-27T08:00:00.000Z',status:'in_bearbeitung',bearbeitet_seit:iso(20*M),bilder:[]});
__DB.store.set('auftraege/a2',{text:'Gerade offen',zeit:'2026-09-27T08:05:00.000Z',status:'in_bearbeitung',bearbeitet_seit:iso(2*M),bilder:[]});
localStorage.setItem('eb-view','sitzung');
