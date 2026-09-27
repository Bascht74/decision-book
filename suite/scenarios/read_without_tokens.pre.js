// "Gelesen" on a "Prüfen" card without token numbers moves it at once, asks nothing, and marks it "token_fehlt" for Claude.
const S=__DB.store;S.set('meta/stand',{aktuell:'3.0.0b28'});
S.set('entscheidungen/E-910',{ueberschrift:'Ohne Tokens',blatt:'pruefen',status:'umgesetzt',ziel:'3.0.0b28',von:'Claude',abweichung:'Anders gebaut'});
S.set('entscheidungen/E-911',{ueberschrift:'Noch eine',blatt:'offen',ziel:'3.0.0b28',von:'Eigner'});
localStorage.setItem('eb-view','dich');localStorage.setItem('eb-tab','pruefen');
