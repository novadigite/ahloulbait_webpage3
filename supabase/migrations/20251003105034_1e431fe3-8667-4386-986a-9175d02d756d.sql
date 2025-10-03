-- Fix critical security issues (part 1 - database functions and policies)

-- Step 1: Create security definer function to check admin role safely
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

-- Step 2: Create security definer function to check any role
CREATE OR REPLACE FUNCTION public.has_role(_role app_role)
RETURNS boolean
LANGUAGE sql
STABLE
SECURITY DEFINER
SET search_path = public
AS $$
  SELECT EXISTS (
    SELECT 1 FROM public.profiles
    WHERE id = auth.uid() AND role = _role
  )
$$;

-- Step 3: Remove the overly permissive UPDATE policy on profiles
DROP POLICY IF EXISTS "Users can update their own profile" ON public.profiles;

-- Step 4: Create restrictive UPDATE policy that excludes the role column
-- Users can only update username, not their role
CREATE POLICY "Users can update own profile username"
  ON public.profiles
  FOR UPDATE
  USING (auth.uid() = id)
  WITH CHECK (
    auth.uid() = id 
    AND role = (SELECT role FROM public.profiles WHERE id = auth.uid())
  );

-- Step 5: Restrict profile SELECT to own profile only (prevents user enumeration)
DROP POLICY IF EXISTS "Profiles are viewable by everyone" ON public.profiles;

CREATE POLICY "Users can view own profile"
  ON public.profiles
  FOR SELECT
  USING (auth.uid() = id);

CREATE POLICY "Admins can view all profiles"
  ON public.profiles
  FOR SELECT
  USING (public.is_admin());

-- Step 6: Update all RLS policies to use security definer functions (prevents recursion)
-- Events policies
DROP POLICY IF EXISTS "Only admins can insert events" ON public.events;
DROP POLICY IF EXISTS "Only admins can update events" ON public.events;
DROP POLICY IF EXISTS "Only admins can delete events" ON public.events;

CREATE POLICY "Only admins can insert events"
  ON public.events
  FOR INSERT
  WITH CHECK (public.is_admin());

CREATE POLICY "Only admins can update events"
  ON public.events
  FOR UPDATE
  USING (public.is_admin());

CREATE POLICY "Only admins can delete events"
  ON public.events
  FOR DELETE
  USING (public.is_admin());

-- Event media policies
DROP POLICY IF EXISTS "Only admins can insert event media" ON public.event_media;
DROP POLICY IF EXISTS "Only admins can delete event media" ON public.event_media;

CREATE POLICY "Only admins can insert event media"
  ON public.event_media
  FOR INSERT
  WITH CHECK (public.is_admin());

CREATE POLICY "Only admins can delete event media"
  ON public.event_media
  FOR DELETE
  USING (public.is_admin());

-- Step 7: Add input validation constraints
ALTER TABLE public.events
  ADD CONSTRAINT title_length CHECK (char_length(title) > 0 AND char_length(title) <= 200),
  ADD CONSTRAINT description_length CHECK (description IS NULL OR char_length(description) <= 5000);

-- Step 8: Add storage policies for event-media bucket
-- Drop existing policies first
DROP POLICY IF EXISTS "Anyone can view event media" ON storage.objects;
DROP POLICY IF EXISTS "Only admins can upload event media" ON storage.objects;
DROP POLICY IF EXISTS "Only admins can delete event media" ON storage.objects;

-- Create new policies
CREATE POLICY "Anyone can view event media"
  ON storage.objects
  FOR SELECT
  USING (bucket_id = 'event-media');

CREATE POLICY "Only admins can upload event media"
  ON storage.objects
  FOR INSERT
  WITH CHECK (bucket_id = 'event-media' AND public.is_admin());

CREATE POLICY "Only admins can delete event media files"
  ON storage.objects
  FOR DELETE
  USING (bucket_id = 'event-media' AND public.is_admin());