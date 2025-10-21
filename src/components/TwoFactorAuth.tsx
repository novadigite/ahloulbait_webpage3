import { useState } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { useToast } from '@/hooks/use-toast';
import { Shield, ShieldCheck, ShieldOff, QrCode } from 'lucide-react';

const TwoFactorAuth = () => {
  const [loading, setLoading] = useState(false);
  const [qrCode, setQrCode] = useState<string | null>(null);
  const [verifyCode, setVerifyCode] = useState('');
  const [isEnrolled, setIsEnrolled] = useState(false);
  const { toast } = useToast();

  const checkEnrollment = async () => {
    try {
      const { data, error } = await supabase.auth.mfa.listFactors();
      if (error) throw error;
      
      const totpFactor = data?.totp?.find((f) => f.factor_type === 'totp');
      setIsEnrolled(totpFactor?.status === 'verified');
    } catch (error: any) {
      if (import.meta.env.DEV) {
        console.error('Error checking 2FA enrollment:', error);
      }
    }
  };

  const enableTwoFactor = async () => {
    setLoading(true);
    try {
      const { data, error } = await supabase.auth.mfa.enroll({
        factorType: 'totp',
        friendlyName: 'Authenticator App'
      });

      if (error) throw error;

      if (data?.totp?.qr_code) {
        setQrCode(data.totp.qr_code);
        toast({
          title: "2FA Activé",
          description: "Scannez le QR code avec votre application d'authentification.",
        });
      }
    } catch (error: any) {
      toast({
        title: "Erreur",
        description: error.message || "Impossible d'activer le 2FA",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  const verifyAndComplete = async () => {
    if (verifyCode.length !== 6) {
      toast({
        title: "Code invalide",
        description: "Le code doit contenir 6 chiffres",
        variant: "destructive",
      });
      return;
    }

    setLoading(true);
    try {
      const factors = await supabase.auth.mfa.listFactors();
      if (!factors.data?.totp?.[0]) throw new Error('No TOTP factor found');

      const factorId = factors.data.totp[0].id;

      const { error } = await supabase.auth.mfa.challengeAndVerify({
        factorId,
        code: verifyCode,
      });

      if (error) throw error;

      toast({
        title: "2FA Configuré",
        description: "L'authentification à deux facteurs est maintenant active !",
      });
      
      setQrCode(null);
      setVerifyCode('');
      setIsEnrolled(true);
    } catch (error: any) {
      toast({
        title: "Erreur",
        description: error.message || "Code de vérification invalide",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  const disableTwoFactor = async () => {
    setLoading(true);
    try {
      const { data: factors } = await supabase.auth.mfa.listFactors();
      const totpFactor = factors?.totp?.find((f) => f.factor_type === 'totp');
      
      if (!totpFactor) throw new Error('No TOTP factor found');

      const { error } = await supabase.auth.mfa.unenroll({
        factorId: totpFactor.id,
      });

      if (error) throw error;

      toast({
        title: "2FA Désactivé",
        description: "L'authentification à deux facteurs est maintenant désactivée.",
      });
      
      setIsEnrolled(false);
    } catch (error: any) {
      toast({
        title: "Erreur",
        description: error.message || "Impossible de désactiver le 2FA",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Shield className="w-5 h-5" />
          Authentification à Deux Facteurs (2FA)
        </CardTitle>
        <CardDescription>
          Renforcez la sécurité de votre compte avec une couche de protection supplémentaire
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        {!isEnrolled && !qrCode && (
          <div className="space-y-4">
            <p className="text-sm text-muted-foreground">
              Activez le 2FA pour protéger votre compte contre les accès non autorisés. 
              Vous aurez besoin d'une application d'authentification comme Google Authenticator ou Authy.
            </p>
            <Button 
              onClick={enableTwoFactor} 
              disabled={loading}
              className="w-full"
            >
              <ShieldCheck className="w-4 h-4 mr-2" />
              Activer le 2FA
            </Button>
          </div>
        )}

        {qrCode && !isEnrolled && (
          <div className="space-y-4">
            <div className="flex flex-col items-center gap-4">
              <div className="p-4 bg-white rounded-lg">
                <img src={qrCode} alt="QR Code 2FA" className="w-48 h-48" />
              </div>
              <p className="text-sm text-center text-muted-foreground">
                Scannez ce QR code avec votre application d'authentification
              </p>
            </div>
            
            <div className="space-y-2">
              <label className="text-sm font-medium">Code de vérification</label>
              <Input
                type="text"
                placeholder="000000"
                value={verifyCode}
                onChange={(e) => setVerifyCode(e.target.value.replace(/\D/g, '').slice(0, 6))}
                maxLength={6}
                className="text-center text-2xl tracking-widest"
              />
            </div>
            
            <Button 
              onClick={verifyAndComplete}
              disabled={loading || verifyCode.length !== 6}
              className="w-full"
            >
              Vérifier et Activer
            </Button>
          </div>
        )}

        {isEnrolled && (
          <div className="space-y-4">
            <div className="flex items-center gap-2 p-4 bg-green-50 dark:bg-green-900/20 rounded-lg">
              <ShieldCheck className="w-5 h-5 text-green-600 dark:text-green-400" />
              <p className="text-sm font-medium text-green-600 dark:text-green-400">
                Le 2FA est activé sur votre compte
              </p>
            </div>
            
            <Button 
              onClick={disableTwoFactor}
              disabled={loading}
              variant="destructive"
              className="w-full"
            >
              <ShieldOff className="w-4 h-4 mr-2" />
              Désactiver le 2FA
            </Button>
          </div>
        )}

        <div className="mt-6 p-4 bg-muted rounded-lg">
          <h4 className="text-sm font-semibold mb-2 flex items-center gap-2">
            <QrCode className="w-4 h-4" />
            Applications recommandées
          </h4>
          <ul className="text-sm space-y-1 text-muted-foreground">
            <li>• Google Authenticator</li>
            <li>• Microsoft Authenticator</li>
            <li>• Authy</li>
            <li>• 1Password</li>
          </ul>
        </div>
      </CardContent>
    </Card>
  );
};

export default TwoFactorAuth;