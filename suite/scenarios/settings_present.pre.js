// meta/einstellungen drives the owner's name, the links, the release and its steps (synthetic values only).
const S=__DB.store;
S.set('meta/einstellungen',{eigner:'Eignerin',sitzung_url:'https://example.org/sitzung',github_repo:'beispiel/buch',release:'3.0.0b40',schritte:['Eins – erster Schritt','Zwei – zweiter Schritt']});
S.set('entscheidungen/E-930',{ueberschrift:'Karte der Eignerin',blatt:'offen',ziel:'3.0.0b40',von:'Eignerin'});
S.set('entscheidungen/E-931',{ueberschrift:'Karte ohne von',blatt:'offen',ziel:'3.0.0b40'});
localStorage.setItem('eb-view','dich');
