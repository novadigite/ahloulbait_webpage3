-- Fix 1: Remove redundant role column from profiles table
-- The user_roles table is the authoritative source for roles
ALTER TABLE public.profiles DROP COLUMN role;

-- Fix 2: Add MIME type validation to storage policies
-- Drop and recreate the upload policy with MIME type restrictions

DROP POLICY IF EXISTS "Only admins can upload event media" ON storage.objects;

CREATE POLICY "Only admins can upload event media with MIME validation"
ON storage.objects
FOR INSERT
WITH CHECK (
  bucket_id = 'event-media' AND
  -- Must be admin
  (
    SELECT EXISTS (
      SELECT 1 FROM public.user_roles
      WHERE user_id = auth.uid() AND role = 'admin'::app_role
    )
  ) AND
  -- Must be an allowed file type based on extension
  (
    -- Allow images
    LOWER((storage.filename(name))) ~ '\.(jpg|jpeg|png|gif|webp)$' OR
    -- Allow videos
    LOWER((storage.filename(name))) ~ '\.(mp4|webm|mov)$' OR
    -- Allow audio
    LOWER((storage.filename(name))) ~ '\.(mp3|wav|m4a|ogg)$'
  )
);