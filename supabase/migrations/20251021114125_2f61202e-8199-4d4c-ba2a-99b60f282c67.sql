-- Nettoyer les politiques de stockage en double pour event-media
-- Garder seulement les politiques qui utilisent la fonction is_admin() SECURITY DEFINER

-- Supprimer les anciennes politiques en double pour SELECT
DROP POLICY IF EXISTS "Event media is publicly accessible" ON storage.objects;

-- Supprimer les anciennes politiques qui référencent directement profiles.role
DROP POLICY IF EXISTS "Admins can delete event media" ON storage.objects;
DROP POLICY IF EXISTS "Admins can upload event media" ON storage.objects;

-- Les politiques restantes sont :
-- "Anyone can view event media" (SELECT public)
-- "Only admins can delete event media files" (DELETE avec is_admin())
-- "Only admins can upload event media" (INSERT avec is_admin())