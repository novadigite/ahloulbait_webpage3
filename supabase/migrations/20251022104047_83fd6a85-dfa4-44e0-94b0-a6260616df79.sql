-- Fix 1: Remove conflicting SELECT policies on fatwas table
-- Keep only the admin-only policy for editorial control and privacy
DROP POLICY IF EXISTS "Fatwas is viewable by everyone" ON public.fatwas;

-- The admin-only policy "Only admins can view fatwas" remains in place

-- Add comment for clarity on fatwas security model
COMMENT ON TABLE public.fatwas IS 'Fatwas contain sensitive religious questions and responses. Access is restricted to admins only for editorial control and privacy protection.';

-- Fix 2: Add INSERT policy for profiles table to allow user registration
CREATE POLICY "Users can insert own profile"
ON public.profiles
FOR INSERT
TO authenticated
WITH CHECK (auth.uid() = id);