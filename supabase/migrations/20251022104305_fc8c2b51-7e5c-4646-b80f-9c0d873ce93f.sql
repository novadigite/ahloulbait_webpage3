-- Fix: Remove conflicting SELECT policy on fatwas table
-- Keep only the admin-only policy for editorial control and privacy
DROP POLICY IF EXISTS "Fatwas is viewable by everyone" ON public.fatwas;

-- Add comment for clarity on fatwas security model
COMMENT ON TABLE public.fatwas IS 'Fatwas contain sensitive religious questions and responses. Access is restricted to admins only for editorial control and privacy protection.';