// An arrow in a lane of 25 cards without "rang" writes only "rang", only for the cards that must move, and stamps no time.
seed(30);for(let i=1;i<=25;i++)__DB.store.set('entscheidungen/R-'+String(i).padStart(2,'0'),{ueberschrift:'Spur '+i,blatt:'entschieden',ziel:'3.0.0b28',geaendert:'2026-09-20T08:00:00.000Z'});
localStorage.setItem('eb-view','claude');localStorage.setItem('eb-tab','entschieden');
