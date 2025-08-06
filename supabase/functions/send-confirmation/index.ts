import { createClient } from 'npm:@supabase/supabase-js@2.39.7';

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

function generatePassword() {
  return Math.random().toString(36).slice(-12) + Math.random().toString(36).slice(-12);
}

Deno.serve(async (req) => {
  if (req.method === 'OPTIONS') {
    return new Response('ok', { headers: corsHeaders });
  }

  try {
    const supabase = createClient(
      Deno.env.get('SUPABASE_URL') ?? '',
      Deno.env.get('SUPABASE_SERVICE_ROLE_KEY') ?? ''
    );

    const { name, email, phone, role, interest } = await req.json();

    // Create user account
    const { data: user, error: userError } = await supabase.auth.admin.createUser({
      email,
      password: generatePassword(),
      email_confirm: true,
      user_metadata: {
        name,
        role,
        phone,
        interest
      },
    });

    if (userError) {
      console.error('Error creating user:', userError);
      throw userError;
    }

    // Update registration with user_id
    const { error: updateError } = await supabase
      .from('registrations')
      .update({ user_id: user.user.id })
      .eq('email', email);

    if (updateError) {
      console.error('Error updating registration:', updateError);
      throw updateError;
    }

    // Send welcome email
    const { error: emailError } = await supabase.auth.admin.generateLink({
      type: 'magiclink',
      email,
      options: {
        data: {
          name,
          role,
          phone,
          interest
        },
      },
    });

    if (emailError) {
      console.error('Error generating email link:', emailError);
      throw emailError;
    }

    return new Response(
      JSON.stringify({ message: 'User created and confirmation email sent successfully' }),
      {
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
        status: 200,
      }
    );
  } catch (error) {
    console.error('Function error:', error);
    return new Response(
      JSON.stringify({ error: error.message }),
      {
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
        status: 400,
      }
    );
  }
});