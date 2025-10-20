-- Fix infinite recursion in user_roles RLS policies
-- Replace direct table queries with SECURITY DEFINER function calls

-- Drop existing policies that cause recursion
DROP POLICY IF EXISTS "Only admins can delete roles" ON public.user_roles;
DROP POLICY IF EXISTS "Only admins can insert roles" ON public.user_roles;
DROP POLICY IF EXISTS "Only admins can update roles" ON public.user_roles;
DROP POLICY IF EXISTS "Only admins can view roles" ON public.user_roles;

-- Create new policies using is_admin() SECURITY DEFINER function
-- This breaks the recursion cycle since SECURITY DEFINER bypasses RLS

CREATE POLICY "Only admins can delete roles"
ON public.user_roles
FOR DELETE
USING (is_admin());

CREATE POLICY "Only admins can insert roles"
ON public.user_roles
FOR INSERT
WITH CHECK (is_admin());

CREATE POLICY "Only admins can update roles"
ON public.user_roles
FOR UPDATE
USING (is_admin());

CREATE POLICY "Only admins can view roles"
ON public.user_roles
FOR SELECT
USING (is_admin());