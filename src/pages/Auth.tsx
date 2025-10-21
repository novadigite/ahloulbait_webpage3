import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { supabase } from '@/integrations/supabase/client';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { useToast } from '@/hooks/use-toast';
import { LogIn, Shield } from 'lucide-react';
import { authSchema } from '@/lib/validation';
import { checkRateLimit } from '@/lib/rateLimit';

const Auth = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [username, setUsername] = useState('');
  const [isLogin, setIsLogin] = useState(true);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const { toast } = useToast();

  useEffect(() => {
    // Check if user is already logged in
    supabase.auth.getSession().then(({ data: { session } }) => {
      if (session) {
        navigate('/adminpanel-7f3a9b2c');
      }
    });

    const { data: { subscription } } = supabase.auth.onAuthStateChange((event, session) => {
      if (session) {
        navigate('/adminpanel-7f3a9b2c');
      }
    });

    return () => subscription.unsubscribe();
  }, [navigate]);

  const handleAuth = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      // Validate inputs
      const validationData = isLogin
        ? { email, password }
        : { email, password, username };

      const result = authSchema.safeParse(validationData);

      if (!result.success) {
        const firstError = result.error.errors[0];
        toast({
          title: "Erreur de validation",
          description: firstError.message,
          variant: "destructive",
        });
        setLoading(false);
        return;
      }

      // Check rate limit
      const rateLimitResult = await checkRateLimit(
        result.data.email,
        isLogin ? 'login' : 'signup'
      );

      if (!rateLimitResult.allowed) {
        toast({
          title: "Trop de tentatives",
          description: rateLimitResult.message || `Réessayez dans ${rateLimitResult.remainingMinutes} minute(s).`,
          variant: "destructive",
        });
        setLoading(false);
        return;
      }

      if (rateLimitResult.attemptsRemaining && rateLimitResult.attemptsRemaining <= 2) {
        toast({
          title: "Attention",
          description: `${rateLimitResult.attemptsRemaining} tentative(s) restante(s).`,
          variant: "default",
        });
      }

      if (isLogin) {
        const { error } = await supabase.auth.signInWithPassword({
          email: result.data.email,
          password: result.data.password,
        });

        if (error) {
          toast({
            title: "Erreur d'authentification",
            description: "Identifiants incorrects",
            variant: "destructive",
          });
          setLoading(false);
          return;
        }

        toast({
          title: "Connexion réussie",
          description: "Bienvenue !",
        });
      } else {
        const { error } = await supabase.auth.signUp({
          email: result.data.email,
          password: result.data.password,
          options: {
            data: {
              username: result.data.username,
            },
            emailRedirectTo: `${window.location.origin}/adminpanel-7f3a9b2c`,
          },
        });

        if (error) {
          toast({
            title: "Erreur",
            description: "Impossible de créer le compte",
            variant: "destructive",
          });
          setLoading(false);
          return;
        }

        toast({
          title: "Inscription réussie",
          description: "Vous pouvez maintenant vous connecter.",
        });
        setIsLogin(true);
      }
    } catch {
      toast({
        title: "Erreur",
        description: "Une erreur est survenue",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-spiritual p-4">
      <Card className="w-full max-w-md">
        <CardHeader className="space-y-1">
          <CardTitle className="text-2xl text-center text-sage">
            {isLogin ? 'Connexion Admin' : 'Créer un compte'}
          </CardTitle>
          <CardDescription className="text-center">
            {isLogin
              ? 'Connectez-vous pour gérer les événements'
              : 'Créez un compte administrateur'}
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleAuth} className="space-y-4">
            {!isLogin && (
              <div className="space-y-2">
                <label htmlFor="username" className="text-sm font-medium">
                  Nom d'utilisateur
                </label>
                <Input
                  id="username"
                  type="text"
                  placeholder="Votre nom d'utilisateur"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  required
                  minLength={3}
                  maxLength={50}
                />
              </div>
            )}
            <div className="space-y-2">
              <label htmlFor="email" className="text-sm font-medium">
                Email
              </label>
              <Input
                id="email"
                type="email"
                placeholder="admin@example.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>
            <div className="space-y-2">
              <label htmlFor="password" className="text-sm font-medium">
                Mot de passe
              </label>
              <Input
                id="password"
                type="password"
                placeholder="••••••••"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                minLength={8}
                maxLength={128}
              />
            </div>
            <Button
              type="submit"
              className="w-full bg-gradient-to-r from-sage to-gold"
              disabled={loading}
            >
              <LogIn className="w-4 h-4 mr-2" />
              {loading ? 'Chargement...' : isLogin ? 'Se connecter' : "S'inscrire"}
            </Button>
          </form>
          <div className="mt-4 text-center text-sm">
            <button
              type="button"
              onClick={() => setIsLogin(!isLogin)}
              className="text-sage hover:underline"
            >
              {isLogin
                ? "Pas encore de compte ? S'inscrire"
                : 'Déjà un compte ? Se connecter'}
            </button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default Auth;
