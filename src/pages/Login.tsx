import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Lock, ArrowLeft, AlertCircle } from 'lucide-react';
import { useTranslation } from '@/hooks/useTranslation';
import { useAuth } from '@/contexts/AuthContext';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Alert, AlertDescription } from '@/components/ui/alert';

export const LoginPage: React.FC = () => {
  const { t } = useTranslation();
  const { login } = useAuth();
  const navigate = useNavigate();
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError('');
    
    try {
      const success = await login(username, password);
      if (success) {
        navigate('/properties');
      } else {
        setError(t('language') === 'fr' 
          ? 'Nom d\'utilisateur ou mot de passe incorrect, ou abonnement expiré'
          : 'Invalid username or password, or subscription expired'
        );
      }
    } catch (err) {
      setError(t('language') === 'fr' 
        ? 'Une erreur est survenue lors de la connexion'
        : 'An error occurred during login'
      );
    } finally {
      setIsLoading(false);
    }
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
            {error && (
              <Alert variant="destructive" className="mb-4">
                <AlertCircle className="h-4 w-4" />
                <AlertDescription>{error}</AlertDescription>
              </Alert>
            )}

            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="space-y-2">
                <label htmlFor="username" className="form-label">
                  {t('language') === 'fr' ? 'Nom d\'utilisateur' : 'Username'}
                </label>
                <Input
                  id="username"
                  type="text"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  placeholder={t('language') === 'fr' ? 'Entrez votre nom d\'utilisateur' : 'Enter your username'}
                  className="form-input"
                  required
                />
              </div>

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
          <h4 className="text-sm font-medium text-foreground mb-2">
            {t('language') === 'fr' ? 'Identifiants de démonstration' : 'Demo Credentials'}
          </h4>
          <div className="text-xs text-muted-foreground space-y-1">
            <p><strong>Username:</strong> marie.dubois</p>
            <p><strong>Password:</strong> demo123</p>
            <p className="text-xs text-success mt-2">
              {t('language') === 'fr' 
                ? 'Abonnement test actif (durée illimitée)'
                : 'Test membership active (lifetime)'
              }
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};