scenario(async out=>{
  await until(()=>BAR.some(t=>/^fail:/.test(t)),4000);
  const bk=()=>__DB.store.get('meta/buch')||{},g=nr=>__DB.store.get('entscheidungen/'+nr).eigner_am||'none';
  out.two=BAR.filter(t=>/^fail:/.test(t));out.twoVersion=bk().version||'none';out.twoCards=g('E-001')+'|'+g('E-002');
  // set by hand: the old field is boss_am
  __DB.external('meta/buch',{stempel_alt:'boss_am'});await bookUpdate(db);
  out.hand=g('E-001')+'|'+g('E-002');out.handVersion=bk().version===PAGE_VERSION;
  // one unknown field only, and a fresh book: it is found alone
  __DB.store.delete('meta/buch');__DB.store.set('entscheidungen/E-002',{ueberschrift:'Zwei',blatt:'offen',ziel:'1.0.0b2'});
  __DB.store.set('entscheidungen/E-003',{ueberschrift:'Drei',blatt:'offen',ziel:'1.0.0b2',boss_am:'2026-01-12T10:00:00.000Z'});
  await bookUpdate(db);out.alone=g('E-003');out.aloneVersion=bk().version===PAGE_VERSION;
  // a failing card write: stops, names the card
  __DB.store.delete('meta/buch');__DB.store.set('entscheidungen/E-004',{ueberschrift:'Vier',blatt:'offen',ziel:'1.0.0b2',boss_am:'2026-01-13T10:00:00.000Z'});
  window.__FAIL={update:/entscheidungen\/E-004/};BAR.length=0;await bookUpdate(db);window.__FAIL={};
  out.cardFail=BAR.filter(t=>/^fail:/.test(t));out.cardFailVersion=bk().version||'none';
});
