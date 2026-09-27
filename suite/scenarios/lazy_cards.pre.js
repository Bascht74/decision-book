// 700 cards: a closed card is only its head line; its body is built when it is opened -- by a click on the head or by script.
// The cards stand under "Bei Claude" (all "arbeit"); "Erledigt" is a table and is measured with its rows.
window.__SYNC=true;seed(700);for(const [p,d] of __DB.store)if(p.startsWith('entscheidungen/'))d.blatt=(+p.slice(-3))%2?'arbeit':'erledigt';
localStorage.setItem('eb-view','claude');
