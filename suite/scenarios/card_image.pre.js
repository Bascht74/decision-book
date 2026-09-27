// "Senden" with an image and no text. A big image takes longer than 400 ms to shrink; here every image load
// is held 800 ms, so the button's check that ran 400 ms after the paste saw no image yet.
const S=__DB.store;S.set('meta/stand',{aktuell:'3.0.0b28'});
S.set('entscheidungen/E-701',{ueberschrift:'Karte in Umsetzung',blatt:'arbeit',status:'entschieden',ziel:'3.0.0b28',von:'Eigner'});
S.set('entscheidungen/E-702',{ueberschrift:'Karte zum Prüfen',blatt:'pruefen',status:'umgesetzt',ziel:'3.0.0b28',von:'Eigner',wartet:'Dich',tokens_prognose:1,tokens_ist:1});
{const I=window.Image;window.Image=function(){const im=new I();let cb=null;Object.defineProperty(im,'onload',{set(f){cb=f},get(){return cb}});
  im.addEventListener('load',e=>setTimeout(()=>cb&&cb.call(im,e),800));return im}}
localStorage.setItem('eb-view','claude');
