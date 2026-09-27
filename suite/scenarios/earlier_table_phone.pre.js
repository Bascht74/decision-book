// on a phone "Art" and "Karte" are hidden columns in "Frühere"; the "Art" filter stands above the table.
const S=__DB.store;S.set('meta/stand',{aktuell:'3.0.0b28'});
for(let i=0;i<130;i++){const z=new Date(Date.UTC(2026,8,1,0,i*37)).toISOString();
  if(i%2)S.set('gespraech/g'+i,{start:z,status:'gelesen',thread:'t'+i,nachrichten:[{von:'Eigner',text:'Gespräch Nummer '+i+' mit einem recht langen Satz, der auf dem Telefon umbrechen muss',zeit:z}]});
  else S.set('auftraege/a'+i,{text:'Auftrag Nummer '+i,zeit:z,status:'übernommen',antwort:'ok'})}
localStorage.setItem('eb-view','sitzung');
