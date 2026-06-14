-- Allow public to view fatwas
DROP POLICY IF EXISTS "Only admins can view fatwas" ON public.fatwas;
CREATE POLICY "Fatwas are viewable by everyone"
ON public.fatwas FOR SELECT
USING (true);

-- Restrict UPDATE on event-media storage objects to admins
CREATE POLICY "Only admins can update event-media objects"
ON storage.objects FOR UPDATE
TO authenticated
USING (bucket_id = 'event-media' AND public.is_admin())
WITH CHECK (bucket_id = 'event-media' AND public.is_admin());