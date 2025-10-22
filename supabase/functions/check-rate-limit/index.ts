import { createClient } from 'https://esm.sh/@supabase/supabase-js@2.58.0';
import { z } from "https://deno.land/x/zod@v3.23.8/mod.ts";

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

// Validation schema for rate limit requests
const rateLimitSchema = z.object({
  identifier: z.string().email('Invalid email format').max(255, 'Identifier too long'),
  attemptType: z.enum(['login', 'signup', 'contact'], {
    errorMap: () => ({ message: 'Attempt type must be login, signup, or contact' })
  })
});

interface RateLimitRequest {
  identifier: string;
  attemptType: 'login' | 'signup' | 'contact';
}

interface RateLimitConfig {
  maxAttempts: number;
  windowMinutes: number;
  blockMinutes: number;
}

const RATE_LIMIT_CONFIGS: Record<string, RateLimitConfig> = {
  login: { maxAttempts: 5, windowMinutes: 15, blockMinutes: 15 },
  signup: { maxAttempts: 3, windowMinutes: 60, blockMinutes: 30 },
  contact: { maxAttempts: 3, windowMinutes: 60, blockMinutes: 60 },
};

Deno.serve(async (req) => {
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const supabaseClient = createClient(
      Deno.env.get('SUPABASE_URL') ?? '',
      Deno.env.get('SUPABASE_SERVICE_ROLE_KEY') ?? ''
    );

    const body = await req.json();
    
    // Validate input with Zod
    const validationResult = rateLimitSchema.safeParse(body);
    
    if (!validationResult.success) {
      console.error('Validation error:', validationResult.error);
      return new Response(
        JSON.stringify({ 
          error: 'Invalid input', 
          details: validationResult.error.errors.map(e => e.message).join(', ')
        }),
        { 
          status: 400, 
          headers: { ...corsHeaders, 'Content-Type': 'application/json' } 
        }
      );
    }

    const { identifier, attemptType } = validationResult.data;

    const config = RATE_LIMIT_CONFIGS[attemptType];
    if (!config) {
      return new Response(
        JSON.stringify({ error: 'Invalid attempt type' }),
        { status: 400, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      );
    }

    // Check existing attempts
    const { data: existingAttempt, error: fetchError } = await supabaseClient
      .from('auth_attempts')
      .select('*')
      .eq('identifier', identifier)
      .eq('attempt_type', attemptType)
      .maybeSingle();

    if (fetchError) {
      console.error('Error fetching auth attempts:', fetchError);
      return new Response(
        JSON.stringify({ error: 'Database error' }),
        { status: 500, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      );
    }

    const now = new Date();

    // Check if blocked
    if (existingAttempt?.blocked_until) {
      const blockedUntil = new Date(existingAttempt.blocked_until);
      if (now < blockedUntil) {
        const remainingMinutes = Math.ceil((blockedUntil.getTime() - now.getTime()) / 60000);
        return new Response(
          JSON.stringify({ 
            allowed: false, 
            blocked: true,
            remainingMinutes,
            message: `Trop de tentatives. Réessayez dans ${remainingMinutes} minute(s).`
          }),
          { status: 429, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
        );
      }
    }

    // Check if within time window
    if (existingAttempt) {
      const firstAttempt = new Date(existingAttempt.first_attempt_at);
      const windowExpired = (now.getTime() - firstAttempt.getTime()) > (config.windowMinutes * 60000);

      if (windowExpired) {
        // Reset counter
        const { error: updateError } = await supabaseClient
          .from('auth_attempts')
          .update({
            attempts_count: 1,
            first_attempt_at: now.toISOString(),
            last_attempt_at: now.toISOString(),
            blocked_until: null
          })
          .eq('identifier', identifier)
          .eq('attempt_type', attemptType);

        if (updateError) {
          console.error('Error updating auth attempts:', updateError);
        }

        return new Response(
          JSON.stringify({ allowed: true, attemptsRemaining: config.maxAttempts - 1 }),
          { headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
        );
      }

      // Increment counter
      const newCount = existingAttempt.attempts_count + 1;
      const shouldBlock = newCount > config.maxAttempts;

      const { error: updateError } = await supabaseClient
        .from('auth_attempts')
        .update({
          attempts_count: newCount,
          last_attempt_at: now.toISOString(),
          blocked_until: shouldBlock 
            ? new Date(now.getTime() + config.blockMinutes * 60000).toISOString()
            : null
        })
        .eq('identifier', identifier)
        .eq('attempt_type', attemptType);

      if (updateError) {
        console.error('Error updating auth attempts:', updateError);
      }

      if (shouldBlock) {
        return new Response(
          JSON.stringify({ 
            allowed: false, 
            blocked: true,
            remainingMinutes: config.blockMinutes,
            message: `Trop de tentatives. Réessayez dans ${config.blockMinutes} minute(s).`
          }),
          { status: 429, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
        );
      }

      return new Response(
        JSON.stringify({ 
          allowed: true, 
          attemptsRemaining: config.maxAttempts - newCount 
        }),
        { headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      );
    }

    // First attempt
    const { error: insertError } = await supabaseClient
      .from('auth_attempts')
      .insert({
        identifier,
        attempt_type: attemptType,
        attempts_count: 1,
        first_attempt_at: now.toISOString(),
        last_attempt_at: now.toISOString()
      });

    if (insertError) {
      console.error('Error inserting auth attempt:', insertError);
      return new Response(
        JSON.stringify({ error: 'Database error' }),
        { status: 500, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      );
    }

    return new Response(
      JSON.stringify({ allowed: true, attemptsRemaining: config.maxAttempts - 1 }),
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