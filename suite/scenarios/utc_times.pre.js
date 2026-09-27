// Times the page writes are UTC with "Z" and are shown in local time; old zoneless steps stay as written.
seed(5);__DB.store.set('auftraege/o1',{text:'Auftrag um 10:20 Ortszeit',zeit:'2026-09-27T08:20:00.000Z',status:'neu',bilder:[]});
__DB.store.set('entscheidungen/E-600',{ueberschrift:'Zeiten',blatt:'offen',ziel:'3.0.0b28',wartet:'Dich',verlauf:[{zeit:'2026-09-27T10:00',text:'alt ohne Zone'},{zeit:'2026-09-27T09:15:00.000Z',text:'neu mit Zone'}]});
__DB.store.set('entscheidungen/E-601',{ueberschrift:'Token fehlen',blatt:'pruefen',ziel:'3.0.0b28',geaendert:new Date().toISOString()});
localStorage.setItem('eb-view','sitzung');
