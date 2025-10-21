-- Sécurisation de la table fatwas
-- Supprimer les anciennes policies si elles existent
DROP POLICY IF EXISTS "Fatwas are viewable by everyone" ON public.fatwas;

-- Nouvelle policy: seuls les admins peuvent voir les fatwas (protection des données sensibles)
CREATE POLICY "Only admins can view fatwas"
  ON public.fatwas
  FOR SELECT
  USING (public.is_admin());

-- Les admins peuvent tout gérer
CREATE POLICY "Admins can insert fatwas"
  ON public.fatwas
  FOR INSERT
  WITH CHECK (public.is_admin());

CREATE POLICY "Admins can update fatwas"
  ON public.fatwas
  FOR UPDATE
  USING (public.is_admin());

CREATE POLICY "Admins can delete fatwas"
  ON public.fatwas
  FOR DELETE
  USING (public.is_admin());

-- Sécurisation de la table events
DROP POLICY IF EXISTS "Events are viewable by everyone" ON public.events;

-- Les événements peuvent être vus par tous (information publique)
CREATE POLICY "Events are publicly viewable"
  ON public.events
  FOR SELECT
  USING (true);

-- Seuls les admins peuvent gérer les événements
CREATE POLICY "Admins can manage events"
  ON public.events
  FOR ALL
  USING (public.is_admin());

-- Sécurisation de la table sira
DROP POLICY IF EXISTS "Sira entries are viewable by everyone" ON public.sira;

CREATE POLICY "Sira entries are publicly viewable"
  ON public.sira
  FOR SELECT
  USING (true);

CREATE POLICY "Admins can manage sira"
  ON public.sira
  FOR ALL
  USING (public.is_admin());

-- Sécurisation de la table tafsir
DROP POLICY IF EXISTS "Tafsir entries are viewable by everyone" ON public.tafsir;

CREATE POLICY "Tafsir entries are publicly viewable"
  ON public.tafsir
  FOR SELECT
  USING (true);

CREATE POLICY "Admins can manage tafsir"
  ON public.tafsir
  FOR ALL
  USING (public.is_admin());