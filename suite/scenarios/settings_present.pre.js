// meta/einstellungen drives the owner's name, the links, the release and its steps (synthetic values only).
const S=__DB.store;
S.set('meta/einstellungen',{eigner:'Eignerin',sitzung_url:'https://example.org/sitzung',github_repo:'beispiel/buch',release:'3.0.0b40',schritte:['Eins – erster Schritt','Zwei – zweiter Schritt']});
S.set('entscheidungen/E-930',{ueberschrift:'Karte der Eignerin',blatt:'offen',ziel:'3.0.0b40',von:'Eignerin'});
S.set('entscheidungen/E-931',{ueberschrift:'Karte ohne von',blatt:'offen',ziel:'3.0.0b40'});
// since 0.4.0 a card under "Offen" labels its yellow field "Oder frei antworten"; one under "Prüfen" still names the owner
S.set('entscheidungen/E-932',{ueberschrift:'Zu prüfen',blatt:'pruefen',ziel:'3.0.0b40',von:'Eignerin',tokens_prognose:1,tokens_ist:1});
localStorage.setItem('eb-view','dich');
