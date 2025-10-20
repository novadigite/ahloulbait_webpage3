import { createClient } from 'https://esm.sh/@supabase/supabase-js@2.58.0'

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
}

Deno.serve(async (req) => {
  // Handle CORS preflight requests
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const supabaseClient = createClient(
      Deno.env.get('SUPABASE_URL') ?? '',
      Deno.env.get('SUPABASE_ANON_KEY') ?? '',
      {
        global: {
          headers: { Authorization: req.headers.get('Authorization')! },
        },
      }
    )

    // Get the user from the auth token
    const {
      data: { user },
      error: userError,
    } = await supabaseClient.auth.getUser()

    if (userError || !user) {
      console.error('Auth error: Unauthorized access attempt')
      return new Response(
        JSON.stringify({ isAdmin: false, error: 'Unauthorized' }),
        { 
          headers: { ...corsHeaders, 'Content-Type': 'application/json' },
          status: 401 
        }
      )
    }

    // Call the is_admin() security definer function via RPC
    const { data, error } = await supabaseClient.rpc('is_admin')

    if (error) {
      console.error('Admin check failed')
      return new Response(
        JSON.stringify({ isAdmin: false, error: 'Admin check failed' }),
        { 
          headers: { ...corsHeaders, 'Content-Type': 'application/json' },
          status: 500 
        }
      )
    }

    // Only log sanitized events in development
    if (Deno.env.get('ENVIRONMENT') === 'development') {
      console.log('Admin check:', data === true ? 'success' : 'denied')
    }

    return new Response(
      JSON.stringify({ isAdmin: data === true }),
      { 
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
        status: 200 
      }
    )
  } catch (error) {
    console.error('Admin check error')
    return new Response(
      JSON.stringify({ isAdmin: false, error: 'Admin check failed' }),
      { 
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
        status: 500 
      }
    )
  }
})
