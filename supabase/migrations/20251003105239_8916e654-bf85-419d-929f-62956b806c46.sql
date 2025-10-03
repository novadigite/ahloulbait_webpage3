-- Fix privilege escalation by preventing role changes
-- Drop and recreate the profile UPDATE policy with proper role protection

DO $$ 
BEGIN
  -- Drop existing policy if it exists
  DROP POLICY IF EXISTS "Users can update own profile username" ON public.profiles;
  DROP POLICY IF EXISTS "Users can update their own profile" ON public.profiles;
  
  -- Create new restrictive policy that prevents role changes
  CREATE POLICY "Users can update own profile username"
    ON public.profiles
    FOR UPDATE
    USING (auth.uid() = id)
    WITH CHECK (
      auth.uid() = id 
      AND role = (SELECT p.role FROM public.profiles p WHERE p.id = auth.uid())
    );
END $$;

-- Create is_admin function if it doesn't exist
CREATE OR REPLACE FUNCTION public.is_admin()
RETURNS boolean
LANGUAGE sql
STABLE
SECURITY DEFINER
SET search_path = public
AS $$
  SELECT EXISTS (
    SELECT 1 FROM public.profiles
    WHERE id = auth.uid() AND role = 'admin'::app_role
  )
$$;

-- Add input validation constraints if they don't exist
DO $$
BEGIN
  IF NOT EXISTS (
    SELECT 1 FROM pg_constraint WHERE conname = 'title_length'
  ) THEN
    ALTER TABLE public.events
      ADD CONSTRAINT title_length CHECK (char_length(title) > 0 AND char_length(title) <= 200);
  END IF;

  IF NOT EXISTS (
    SELECT 1 FROM pg_constraint WHERE conname = 'description_length'
  ) THEN
    ALTER TABLE public.events
      ADD CONSTRAINT description_length CHECK (description IS NULL OR char_length(description) <= 5000);
  END IF;
END $$;