import React from 'react';
import { useTranslation } from '@/hooks/useTranslation';

export const TermsPage: React.FC = () => {
  const { t } = useTranslation();

  return (
    <div className="min-h-screen bg-background">
      <div className="container-custom section-padding">
        <div className="max-w-4xl mx-auto">
          <header className="text-center space-y-4 mb-12">
            <h1 className="text-3xl md:text-4xl font-heading font-bold text-foreground">
              {t('legal.terms')}
            </h1>
            <p className="text-lg text-muted-foreground">
              {t('language') === 'fr' 
                ? 'Dernière mise à jour: 1er janvier 2024'
                : 'Last updated: January 1st, 2024'
              }
            </p>
          </header>

          <div className="prose prose-lg max-w-none space-y-8">
            <section>
              <h2 className="text-2xl font-heading font-bold text-foreground mb-4">
                {t('language') === 'fr' ? '1. Acceptation des conditions' : '1. Acceptance of Terms'}
              </h2>
              <p className="text-muted-foreground leading-relaxed">
                {t('language') === 'fr' 
                  ? 'En accédant et en utilisant cette plateforme, vous acceptez d\'être lié par ces conditions générales d\'utilisation et toutes les lois et réglementations applicables.'
                  : 'By accessing and using this platform, you agree to be bound by these terms and conditions of use and all applicable laws and regulations.'
                }
              </p>
            </section>
          </div>
        </div>
      </div>
    </div>
  );
};