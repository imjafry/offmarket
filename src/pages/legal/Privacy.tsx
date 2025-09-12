import React from 'react';
import { useTranslation } from '@/hooks/useTranslation';

export const PrivacyPage: React.FC = () => {
  const { t } = useTranslation();

  return (
    <div className="min-h-screen bg-background">
      <div className="container-custom section-padding">
        <div className="max-w-4xl mx-auto">
          <header className="text-center space-y-4 mb-12">
            <h1 className="text-3xl md:text-4xl font-heading font-bold text-foreground">
              {t('legal.privacy')}
            </h1>
          </header>
          <p className="text-muted-foreground">Privacy policy content...</p>
        </div>
      </div>
    </div>
  );
};