(function(){
  // Focus visible outlines
  const s=document.createElement('style');
  s.innerHTML=':focus-visible{outline:3px solid #ff385c; outline-offset:2px}';
  document.head.appendChild(s);

  // Lazy loading for listing images
  window.addEventListener('DOMContentLoaded', ()=>{
    document.querySelectorAll('.listing-image img').forEach(img=>{
      img.setAttribute('loading','lazy');
      img.setAttribute('decoding','async');
      img.setAttribute('fetchpriority','low');
    });
  });

  // Debounce helper
  function debounce(fn, delay){ let t; return (...args)=>{ clearTimeout(t); t=setTimeout(()=>fn(...args), delay); }; }
  // Price slider debounce → triggers search if disponible
  window.addEventListener('DOMContentLoaded', ()=>{
    const slider = document.getElementById('price-range');
    const display = document.getElementById('price-display');
    if (slider && display){
      const run = debounce(()=>{ if (typeof window.searchListings==='function') window.searchListings(); }, 250);
      slider.addEventListener('input', ()=>{
        display.textContent = slider.value + '€';
        run();
      });
    }
  });

  // Mount calendar if placeholder exists
  window.addEventListener('DOMContentLoaded', ()=>{
    if (window.SharingsCalendar && document.getElementById('availability-calendar')){
      const min = new Date(); min.setDate(min.getDate()-1);
      window.SharingsCalendar.mount('#availability-calendar', {
        min,
        onChange: ({start,end})=>{
          const from = document.getElementById('date-from');
          const to = document.getElementById('date-to');
          if (from) from.value = start ? start.toISOString().slice(0,10) : '';
          if (to) to.value = end ? end.toISOString().slice(0,10) : '';
        }
      });
    }
  });
})();
