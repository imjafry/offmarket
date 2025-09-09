import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';
import { useTranslation } from '@/hooks/useTranslation';
import { Button } from '@/components/ui/button';
import { PropertyCard } from '@/components/PropertyCard';
import { featuredProperties } from '@/data/mockProperties';

export const HomePage: React.FC = () => {
  const { t } = useTranslation();

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="section-padding bg-background">
        <div className="container-custom">
          <div className="max-w-4xl mx-auto text-center space-y-8">
            <h1 className="text-4xl md:text-6xl font-heading font-bold text-foreground leading-tight">
              {t('home.hero.title')}
            </h1>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto leading-relaxed">
              {t('home.hero.subtitle')}
            </p>
            <Link to="/properties">
              <Button size="lg" className="btn-primary group">
                {t('home.hero.cta')}
                <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Featured Properties Section */}
      <section className="section-padding bg-muted/20">
        <div className="container-custom">
          <div className="text-center space-y-4 mb-12">
            <h2 className="text-3xl md:text-4xl font-heading font-bold text-foreground">
              {t('home.featured.title')}
            </h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              {t('home.featured.subtitle')}
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {featuredProperties.map((property) => (
              <PropertyCard 
                key={property.id} 
                property={property}
                showContactInfo={false}
              />
            ))}
          </div>

          <div className="text-center mt-12">
            <Link to="/properties">
              <Button variant="outline" size="lg">
                {t('home.hero.cta')}
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Trust Section */}
      <section className="section-padding bg-background">
        <div className="container-custom">
          <div className="max-w-3xl mx-auto text-center space-y-6">
            <h3 className="text-2xl md:text-3xl font-heading font-semibold text-foreground">
              {t('language') === 'fr' ? 'Accès Exclusif' : 'Exclusive Access'}
            </h3>
            <p className="text-lg text-muted-foreground leading-relaxed">
              {t('language') === 'fr' 
                ? 'Nos propriétés ne sont pas disponibles sur le marché public. Seuls nos membres ont accès à ces opportunités uniques sélectionnées par nos experts immobiliers.'
                : 'Our properties are not available on the public market. Only our members have access to these unique opportunities selected by our real estate experts.'
              }
            </p>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-12">
              <div className="space-y-2">
                <div className="text-3xl font-bold text-primary">50+</div>
                <p className="text-sm text-muted-foreground">
                  {t('language') === 'fr' ? 'Propriétés Exclusives' : 'Exclusive Properties'}
                </p>
              </div>
              <div className="space-y-2">
                <div className="text-3xl font-bold text-primary">100%</div>
                <p className="text-sm text-muted-foreground">
                  {t('language') === 'fr' ? 'Hors-Marché' : 'Off-Market'}
                </p>
              </div>
              <div className="space-y-2">
                <div className="text-3xl font-bold text-primary">24h</div>
                <p className="text-sm text-muted-foreground">
                  {t('language') === 'fr' ? 'Support Premium' : 'Premium Support'}
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};