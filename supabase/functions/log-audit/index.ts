import { createClient } from 'https://esm.sh/@supabase/supabase-js@2.58.0';

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

interface AuditLogRequest {
  action: string;
  tableName?: string;
  recordId?: string;
  oldData?: any;
  newData?: any;
}

// Hash IP address for privacy - one-way hash that preserves uniqueness for analysis
// but cannot be reversed to get the original IP
async function hashIpAddress(ip: string): Promise<string> {
  if (!ip || ip === 'unknown') return 'unknown';
  
  // Add salt for additional security
  const salt = Deno.env.get('SUPABASE_SERVICE_ROLE_KEY')?.substring(0, 16) || 'audit_salt_2024';
  const data = new TextEncoder().encode(ip + salt);
  const hashBuffer = await crypto.subtle.digest('SHA-256', data);
  const hashArray = Array.from(new Uint8Array(hashBuffer));
  // Return first 16 chars of hash for readability while maintaining uniqueness
  return hashArray.map(b => b.toString(16).padStart(2, '0')).join('').substring(0, 32);
}

// Anonymize user agent to remove potentially identifying details
function anonymizeUserAgent(userAgent: string): string {
  if (!userAgent || userAgent === 'unknown') return 'unknown';
  
  // Keep only browser family and OS - remove version details that could fingerprint
  const browserMatch = userAgent.match(/(Chrome|Firefox|Safari|Edge|Opera)/i);
  const osMatch = userAgent.match(/(Windows|Mac|Linux|Android|iOS)/i);
  
  const browser = browserMatch ? browserMatch[1] : 'Unknown Browser';
  const os = osMatch ? osMatch[1] : 'Unknown OS';
  
  return `${browser} on ${os}`;
}

Deno.serve(async (req) => {
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
    );

    // Verify user is authenticated
    const { data: { user }, error: authError } = await supabaseClient.auth.getUser();
    
    if (authError || !user) {
      return new Response(
        JSON.stringify({ error: 'Unauthorized' }),
        { status: 401, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      );
    }

    // Verify user is admin
    const { data: isAdmin, error: roleError } = await supabaseClient.rpc('is_admin');
    
    if (roleError || !isAdmin) {
      return new Response(
        JSON.stringify({ error: 'Forbidden' }),
        { status: 403, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      );
    }

    const { action, tableName, recordId, oldData, newData }: AuditLogRequest = await req.json();
    
    if (!action) {
      return new Response(
        JSON.stringify({ error: 'Missing action' }),
        { status: 400, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      );
    }

    // Extract and anonymize client info
    const rawIpAddress = req.headers.get('x-forwarded-for')?.split(',')[0] || 
                         req.headers.get('x-real-ip') || 
                         'unknown';
    const rawUserAgent = req.headers.get('user-agent') || 'unknown';
    
    // Hash IP and anonymize user agent for privacy
    const hashedIp = await hashIpAddress(rawIpAddress);
    const anonymizedUserAgent = anonymizeUserAgent(rawUserAgent);

    // Use service role key to insert audit log
    const adminClient = createClient(
      Deno.env.get('SUPABASE_URL') ?? '',
      Deno.env.get('SUPABASE_SERVICE_ROLE_KEY') ?? ''
    );

    const { error: insertError } = await adminClient
      .from('audit_logs')
      .insert({
        user_id: user.id,
        action,
        table_name: tableName,
        record_id: recordId,
        old_data: oldData,
        new_data: newData,
        ip_address: hashedIp,
        user_agent: anonymizedUserAgent
      });
    if (insertError) {
      console.error('Error inserting audit log:', insertError);
      return new Response(
        JSON.stringify({ error: 'Failed to log audit entry' }),
        { status: 500, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      );
    }

    return new Response(
      JSON.stringify({ success: true }),
      { headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
    );

  } catch (error) {
    console.error('Unexpected error:', error);
    return new Response(
      JSON.stringify({ error: 'Internal server error' }),
      { status: 500, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
    );
  }
});