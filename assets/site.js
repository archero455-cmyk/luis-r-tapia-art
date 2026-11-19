(function(){"use strict";
  function ready(){
    document.querySelectorAll('[data-year]').forEach(el=>el.textContent=String(new Date().getFullYear()));
    document.querySelectorAll('[data-artwork-image]').forEach(img=>{
      function handle(){if(!img.complete||img.naturalWidth===0)img.closest('.art-visual')?.classList.add('is-missing');}
      img.addEventListener('error',handle);
      if(img.complete)handle();
    });
    const menu=document.querySelector('.menu-toggle'),mobile=document.querySelector('.mobile-nav');
    if(menu&&mobile){menu.addEventListener('click',()=>{const show=mobile.hidden;mobile.hidden=!show;menu.setAttribute('aria-expanded',String(show));});mobile.querySelectorAll('a').forEach(a=>a.addEventListener('click',()=>{mobile.hidden=true;menu.setAttribute('aria-expanded','false');}));}
    const filters=[...document.querySelectorAll('[data-filter]')], cards=[...document.querySelectorAll('.art-card')], search=document.getElementById('art-search');
    let selected='all';
    const refresh=()=>{const term=(search?.value||'').toLocaleLowerCase().trim();let count=0;cards.forEach(card=>{const show=(selected==='all'||card.dataset.category===selected)&&(!term||card.dataset.search.includes(term));card.hidden=!show;if(show)count++;});const empty=document.getElementById('no-results');if(empty)empty.hidden=count!==0;};
    filters.forEach(f=>f.addEventListener('click',()=>{selected=f.dataset.filter;filters.forEach(x=>{const active=x===f;x.classList.toggle('active',active);x.setAttribute('aria-pressed',String(active));});refresh();}));
    search?.addEventListener('input',refresh);
    // PayPal identifiers are the original, painting-specific IDs previously supplied by the artist.
    if(window.cartPaypal){
      try{window.cartPaypal.Cart({id:'pp-view-cart'});}catch(e){console.warn('PayPal cart initialization:',e);}
      const ids=new Set([...document.querySelectorAll('paypal-add-to-cart-button[data-id]')].map(el=>el.dataset.id));
      ids.forEach(id=>{try{window.cartPaypal.AddToCart({id});}catch(e){console.warn('PayPal artwork button:',id,e);}});
    } else {console.warn('PayPal script was not loaded. Ensure the visitor is online and content blockers allow PayPal.');}
  }
  if(document.readyState==='loading')document.addEventListener('DOMContentLoaded',ready);else ready();
})();