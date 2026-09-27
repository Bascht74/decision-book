// One arrow in "Entschieden" writes only the cards whose place changed (converted from review s10).
seed(40);const S=__DB.store;for(let i=1;i<=12;i++)S.set('entscheidungen/R-'+String(i).padStart(2,'0'),{ueberschrift:'Spur '+i,blatt:'entschieden',ziel:'3.0.0b28',rang:i*10});
localStorage.setItem('eb-view','claude');localStorage.setItem('eb-tab','entschieden');
