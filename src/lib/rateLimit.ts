import { supabase } from '@/integrations/supabase/client';

interface RateLimitResponse {
  allowed: boolean;
  blocked?: boolean;
  remainingMinutes?: number;
  attemptsRemaining?: number;
  message?: string;
}

export const checkRateLimit = async (
  identifier: string,
  attemptType: 'login' | 'signup' | 'contact'
): Promise<RateLimitResponse> => {
  try {
    const { data, error } = await supabase.functions.invoke('check-rate-limit', {
      body: { identifier, attemptType }
    });

    if (error) {
      console.error('Rate limit check error:', error);
      // On error, allow the attempt (fail open)
      return { allowed: true };
    }

    return data as RateLimitResponse;
  } catch (error) {
    console.error('Rate limit check failed:', error);
    // On error, allow the attempt (fail open)
    return { allowed: true };
  }
};