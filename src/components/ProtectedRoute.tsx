import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { supabase } from '@/integrations/supabase/client';

interface ProtectedRouteProps {
  children: React.ReactNode;
}

const ProtectedRoute = ({ children }: ProtectedRouteProps) => {
  const [isAuthorized, setIsAuthorized] = useState<boolean | null>(null);
  const navigate = useNavigate();

  useEffect(() => {
    checkAuth();
  }, []);

  const checkAuth = async () => {
    try {
      const { data: { session } } = await supabase.auth.getSession();
      
      if (!session) {
        navigate('/', { replace: true });
        return;
      }

      // Use RLS instead of RPC call - try to query user_roles table
      // If query succeeds, user has admin access (leverages RLS policies)
      const { data, error } = await supabase
        .from('user_roles')
        .select('role')
        .eq('user_id', session.user.id)
        .eq('role', 'admin')
        .maybeSingle();
      
      const isAdmin = !error && data !== null;
      
      if (!isAdmin) {
        navigate('/', { replace: true });
        return;
      }

      setIsAuthorized(true);
    } catch {
      navigate('/', { replace: true });
    }
  };

  if (isAuthorized === null) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-spiritual">
        <div className="animate-pulse text-sage text-lg">Vérification...</div>
      </div>
    );
  }

  return isAuthorized ? <>{children}</> : null;
};

export default ProtectedRoute;
