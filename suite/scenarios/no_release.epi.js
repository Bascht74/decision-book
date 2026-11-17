scenario(async out=>{
  const card=nr=>document.querySelector('#board details[data-nr="'+nr+'"]'),shown=e=>!!e&&e.getClientRects().length>0;
  await until(()=>card('E-701')&&!document.getElementById('waits').hidden);await sleep(150);
  const look=()=>({ready:shown(document.getElementById('ready')),views:$$('#views button').map(b=>b.querySelector('.lng').textContent).join(','),
    groups:$$('#filter .fgrp .who').map(w=>w.textContent).join(','),lanes:$$('#board .lane.fold').map(l=>l.dataset.lane).join(','),badge:document.getElementById('waits').textContent,cards:$$('#board details[data-nr]').length});
  const head=()=>document.querySelector('#board .lane.fold[data-lane="offen:"]');
  out.none=look();
  // a second target: there is something to choose again
  __DB.external('entscheidungen/E-702',{ziel:'später'});await sleep(150);out.two=look();
  // the lane without a target is folded, then the second target goes: the head stays while it is folded
  if(head())head().click();await sleep(60);
  __DB.external('entscheidungen/E-702',{ziel:''});await sleep(150);out.folded=look();
  if(head())head().click();await sleep(60);out.unfolded=look();
  // a card with a release as its target: the tab is back, still no release card
  __DB.external('entscheidungen/E-704',{ziel:'3.0.0b29'});await sleep(150);out.target=look();
  __DB.external('entscheidungen/E-704',{ziel:''});await sleep(150);
  // a release becomes current: the card, the tab, the chips and the lane head are back
  __DB.external('meta/stand',{aktuell:'3.0.0b28'});await sleep(150);out.release=look();
});
