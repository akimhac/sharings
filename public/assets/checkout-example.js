/* Usage:
fetch('/.netlify/functions/stripe-create-session', {
  method:'POST',
  headers:{'content-type':'application/json'},
  body: JSON.stringify({
    price_cents: 6500,
    currency: 'eur',
    success_url: window.location.origin + '/dashboard.html',
    cancel_url: window.location.href,
    listing_id: 'LISTING_UUID',
    reservation_id: 'RESERV_UUID',
    user_id: window?.currentUser?.id || null,
    description: 'Réservation siège'
  })
}).then(r=>r.json()).then(({url})=>{ if(url) window.location.href=url; });
*/
