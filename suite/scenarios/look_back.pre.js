// cards with "rueckblick_faellig" ask "Hat es gewirkt?" under Hinweise once that release is current or past; Ja/Nein + text land on the card as "rueckblick".
window.__SYNC=true;const S=__DB.store;S.set('meta/stand',{aktuell:'3.0.0b28'});
const c=(nr,f,x)=>S.set('entscheidungen/'+nr,Object.assign({ueberschrift:'Karte '+nr,blatt:'erledigt',ziel:'3.0.0b27',rueckblick_faellig:f,tokens_prognose:1,tokens_ist:1},x||{}));
c('E-731','3.0.0b28');c('E-732','3.0.0b29');c('E-733','3.0.0b27');c('E-734','3.0.0b27',{rueckblick:{antwort:'Ja',text:'',zeit:'2026-09-20T08:00:00.000Z'}});
localStorage.setItem('eb-view','dich');
