const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

Deno.serve(async (req) => {
  if (req.method === 'OPTIONS') {
    return new Response('ok', { headers: corsHeaders });
  }

  try {
    const { query, ll } = await req.json();
    
    // Utilisation de la clé API directement
    const apiKey = 'fsq3GN4LKPjuOTP0BupQBfiu9tqZaJ9e4F51sOLGonkZ+eA=';
    
    const url = new URL('https://api.foursquare.com/v3/places/search');
    url.searchParams.append('query', query || 'salon de coiffure');
    url.searchParams.append('ll', ll);
    url.searchParams.append('categories', '11062'); // Beauty and Spas category
    url.searchParams.append('sort', 'DISTANCE');
    url.searchParams.append('limit', '10');
    url.searchParams.append('radius', '5000'); // 5km radius

    console.log('Requesting URL:', url.toString());
    
    const response = await fetch(url.toString(), {
      headers: {
        'Authorization': `Bearer ${apiKey}`,
        'Accept': 'application/json'
      }
    });

    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}));
      console.error('Foursquare API error:', errorData);
      throw new Error(`Failed to fetch places: ${response.status} ${response.statusText}`);
    }

    const data = await response.json();
    console.log('Foursquare API response:', data);
    
    return new Response(
      JSON.stringify(data),
      {
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
        status: 200,
      }
    );
  } catch (error) {
    console.error('Error in places-search function:', error);
    return new Response(
      JSON.stringify({ error: error.message }),
      {
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
        status: 400,
      }
    );
  }
});