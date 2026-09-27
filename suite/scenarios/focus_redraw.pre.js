// A change from Claude never sends keyboard focus back to the start of the page: a view button, a lane head, a filter button
// and a card's head line keep focus through the redraw -- a card that moved keeps it on its head in the new place.
const S=__DB.store;S.set('meta/stand',{aktuell:'3.0.0b28'});
S.set('entscheidungen/E-730',{ueberschrift:'Offen',blatt:'offen',ziel:'3.0.0b28',von:'Eigner'});
S.set('entscheidungen/E-731',{ueberschrift:'Nachbar',blatt:'offen',ziel:'3.0.0b28',von:'Claude'});
S.set('entscheidungen/E-732',{ueberschrift:'Bei Claude',blatt:'arbeit',ziel:'3.0.0b28',von:'Eigner'});
localStorage.setItem('eb-view','dich');
