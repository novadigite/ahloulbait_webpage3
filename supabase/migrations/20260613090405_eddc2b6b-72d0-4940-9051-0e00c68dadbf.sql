
-- Defense-in-depth restrictive policy on audit_logs: only admins can SELECT
CREATE POLICY "Restrict audit_logs reads to admins"
ON public.audit_logs
AS RESTRICTIVE
FOR SELECT
TO authenticated, anon
USING (public.is_admin());

-- Defense-in-depth restrictive policy on profiles:
-- a row is only readable if it's the user's own profile OR the requester is an admin
CREATE POLICY "Restrict profile reads to owner or admin"
ON public.profiles
AS RESTRICTIVE
FOR SELECT
TO authenticated, anon
USING (auth.uid() = id OR public.is_admin());
