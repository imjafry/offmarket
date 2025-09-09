import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Lock, ArrowLeft } from 'lucide-react';
import { useTranslation } from '@/hooks/useTranslation';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';

export const LoginPage: React.FC = () => {
  const { t } = useTranslation();
  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    
    // Simulate login process
    setTimeout(() => {
      setIsLoading(false);
      // In real app, handle authentication here
      console.log('Login attempt with password:', password);
    }, 2000);
  };

  return (
    <div className="min-h-screen bg-background flex items-center justify-center px-4">
      <div className="w-full max-w-md space-y-6">
        {/* Back Link */}
        <Link 
          to="/" 
          className="inline-flex items-center text-sm text-muted-foreground hover:text-primary transition-colors"
        >
          <ArrowLeft className="h-4 w-4 mr-2" />
          {t('language') === 'fr' ? 'Retour à l\'accueil' : 'Back to Home'}
        </Link>

        {/* Login Card */}
        <Card className="border-border">
          <CardHeader className="text-center space-y-2">
            <div className="mx-auto w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center">
              <Lock className="h-6 w-6 text-primary" />
            </div>
            <CardTitle className="text-2xl font-heading">
              {t('auth.login')}
            </CardTitle>
            <CardDescription>
              {t('language') === 'fr' 
                ? 'Accédez à votre espace membre privilégié'
                : 'Access your privileged member area'
              }
            </CardDescription>
          </CardHeader>

          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="space-y-2">
                <label htmlFor="password" className="form-label">
                  {t('auth.password')}
                </label>
                <Input
                  id="password"
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder={t('language') === 'fr' ? 'Entrez votre mot de passe' : 'Enter your password'}
                  className="form-input"
                  required
                />
              </div>

              <Button 
                type="submit" 
                className="w-full btn-primary"
                disabled={isLoading}
              >
                {isLoading 
                  ? t('common.loading') 
                  : t('auth.submit')
                }
              </Button>
            </form>

            <div className="mt-6 text-center">
              <p className="text-xs text-muted-foreground">
                {t('language') === 'fr' 
                  ? 'Mot de passe oublié? Contactez votre conseiller.'
                  : 'Forgotten password? Contact your advisor.'
                }
              </p>
            </div>
          </CardContent>
        </Card>

        {/* Demo Info */}
        <div className="bg-muted/50 border border-border rounded-lg p-4">
          <p className="text-xs text-muted-foreground text-center">
            <strong>Demo:</strong> {t('language') === 'fr' 
              ? 'Utilisez n\'importe quel mot de passe pour tester'
              : 'Use any password to test'
            }
          </p>
        </div>
      </div>
    </div>
  );
};