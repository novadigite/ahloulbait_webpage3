-- Table pour l'audit logging (traçage des actions admin)
CREATE TABLE IF NOT EXISTS public.audit_logs (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID REFERENCES auth.users(id) ON DELETE SET NULL,
  action TEXT NOT NULL,
  table_name TEXT,
  record_id UUID,
  old_data JSONB,
  new_data JSONB,
  ip_address INET,
  user_agent TEXT,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Index pour recherche rapide
CREATE INDEX idx_audit_logs_user_id ON public.audit_logs(user_id);
CREATE INDEX idx_audit_logs_created_at ON public.audit_logs(created_at DESC);
CREATE INDEX idx_audit_logs_action ON public.audit_logs(action);

-- Enable RLS
ALTER TABLE public.audit_logs ENABLE ROW LEVEL SECURITY;

-- Politique RLS : seuls les admins peuvent consulter les logs
CREATE POLICY "Only admins can view audit logs"
ON public.audit_logs
FOR SELECT
USING (is_admin());

-- Table pour rate limiting (limitation de tentatives)
CREATE TABLE IF NOT EXISTS public.auth_attempts (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  identifier TEXT NOT NULL, -- email ou IP
  attempt_type TEXT NOT NULL, -- 'login', 'signup', 'contact'
  attempts_count INTEGER NOT NULL DEFAULT 1,
  first_attempt_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  last_attempt_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  blocked_until TIMESTAMP WITH TIME ZONE,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Index unique pour éviter les doublons et accélérer les requêtes
CREATE UNIQUE INDEX idx_auth_attempts_identifier_type ON public.auth_attempts(identifier, attempt_type);
CREATE INDEX idx_auth_attempts_blocked_until ON public.auth_attempts(blocked_until);

-- Enable RLS
ALTER TABLE public.auth_attempts ENABLE ROW LEVEL SECURITY;

-- Politique RLS : seuls les admins peuvent consulter les tentatives
CREATE POLICY "Only admins can view auth attempts"
ON public.auth_attempts
FOR SELECT
USING (is_admin());

-- Fonction pour nettoyer les anciennes entrées (>30 jours)
CREATE OR REPLACE FUNCTION public.cleanup_old_auth_attempts()
RETURNS void
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
BEGIN
  DELETE FROM public.auth_attempts 
  WHERE created_at < now() - interval '30 days';
END;
$$;

-- Fonction pour nettoyer les anciens logs d'audit (>90 jours)
CREATE OR REPLACE FUNCTION public.cleanup_old_audit_logs()
RETURNS void
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
BEGIN
  DELETE FROM public.audit_logs 
  WHERE created_at < now() - interval '90 days';
END;
$$;

COMMENT ON TABLE public.audit_logs IS 'Traçage de toutes les actions administratives pour conformité et sécurité';
COMMENT ON TABLE public.auth_attempts IS 'Suivi des tentatives d''authentification pour rate limiting et protection contre force brute';