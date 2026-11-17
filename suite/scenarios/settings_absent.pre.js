// Without meta/einstellungen the page shows the neutral role "Eigner", no links and the default ten steps.
const S=__DB.store;S.set('meta/stand',{aktuell:'3.0.0b28'});
S.set('entscheidungen/E-940',{ueberschrift:'Karte',blatt:'offen',ziel:'3.0.0b28',von:'Eigner'});
S.set('entscheidungen/E-941',{ueberschrift:'Karte ohne von',blatt:'offen',ziel:'3.0.0b28'});
// since 0.4.0 a card under "Offen" labels its yellow field "Oder frei antworten"; one under "Prüfen" still names the owner
S.set('entscheidungen/E-942',{ueberschrift:'Zu prüfen',blatt:'pruefen',ziel:'3.0.0b28',von:'Eigner',tokens_prognose:1,tokens_ist:1});
localStorage.setItem('eb-view','dich');
