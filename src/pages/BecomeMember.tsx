import React from 'react';
import { ArrowLeft, Check, Star, Shield, Users, Crown } from 'lucide-react';
import { Link } from 'react-router-dom';
import { useTranslation } from '@/hooks/useTranslation';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';

export const BecomeMemberPage: React.FC = () => {
  const { t } = useTranslation();

  const features = [
    {
      icon: <Star className="h-6 w-6 text-yellow-500" />,
      title: t('becomeMember.features.exclusiveAccess.title'),
      description: t('becomeMember.features.exclusiveAccess.description')
    },
    {
      icon: <Shield className="h-6 w-6 text-blue-500" />,
      title: t('becomeMember.features.privacy.title'),
      description: t('becomeMember.features.privacy.description')
    },
    {
      icon: <Users className="h-6 w-6 text-green-500" />,
      title: t('becomeMember.features.privilegedNetwork.title'),
      description: t('becomeMember.features.privilegedNetwork.description')
    },
    {
      icon: <Crown className="h-6 w-6 text-purple-500" />,
      title: t('becomeMember.features.premiumService.title'),
      description: t('becomeMember.features.premiumService.description')
    }
  ];

  const benefits = [
    t('becomeMember.benefits.list.0'),
    t('becomeMember.benefits.list.1'),
    t('becomeMember.benefits.list.2'),
    t('becomeMember.benefits.list.3'),
    t('becomeMember.benefits.list.4')
  ];

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <div className="bg-gradient-to-r from-primary to-primary/80 text-white py-16">
        <div className="container-custom">
          <div className="flex items-center space-x-4 mb-8">
            <Link to="/">
              <Button variant="ghost" size="sm" className="text-white hover:bg-white/20">
                <ArrowLeft className="h-4 w-4 mr-2" />
                {t('language') === 'fr' ? 'Retour' : 'Back'}
              </Button>
            </Link>
          </div>
          
          <div className="max-w-3xl">
            <h1 className="text-4xl md:text-6xl font-heading font-bold mb-6">
              {t('becomeMember.title')}
            </h1>
            <p className="text-xl md:text-2xl text-white/90 leading-relaxed">
              {t('becomeMember.subtitle')}
            </p>
          </div>
        </div>
      </div>

      {/* Features Section */}
      <div className="py-16 bg-white">
        <div className="container-custom">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-heading font-bold text-foreground mb-4">
              {t('becomeMember.whyJoin')}
            </h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              {t('becomeMember.whyJoinSubtitle')}
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {features.map((feature, index) => (
              <Card key={index} className="text-center hover:shadow-lg transition-shadow">
                <CardHeader>
                  <div className="flex justify-center mb-4">
                    {feature.icon}
                  </div>
                  <CardTitle className="text-lg">{feature.title}</CardTitle>
                </CardHeader>
                <CardContent>
                  <CardDescription className="text-sm">
                    {feature.description}
                  </CardDescription>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </div>

      {/* Benefits Section */}
      <div className="py-16 bg-gray-50">
        <div className="container-custom">
          <div className="max-w-4xl mx-auto">
            <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-heading font-bold text-foreground mb-4">
              {t('becomeMember.benefits.title')}
            </h2>
            </div>

            <Card className="p-8">
              <div className="space-y-4">
                {benefits.map((benefit, index) => (
                  <div key={index} className="flex items-center space-x-3">
                    <Check className="h-5 w-5 text-green-500 flex-shrink-0" />
                    <span className="text-foreground">{benefit}</span>
                  </div>
                ))}
              </div>
            </Card>
          </div>
        </div>
      </div>

      {/* CTA Section */}
      <div className="py-16 bg-primary text-white">
        <div className="container-custom text-center">
          <h2 className="text-3xl md:text-4xl font-heading font-bold mb-6">
            {t('becomeMember.cta.title')}
          </h2>
          <p className="text-xl text-white/90 mb-8 max-w-2xl mx-auto">
            {t('becomeMember.cta.subtitle')}
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link to="/contact">
              <Button size="lg" variant="secondary" className="px-8 py-4 text-lg">
                {t('becomeMember.cta.contactUs')}
              </Button>
            </Link>
            <Link to="/properties">
              <Button size="lg" variant="outline" className="px-8 py-4 text-lg border-white text-white hover:bg-white hover:text-primary">
                {t('becomeMember.cta.viewProperties')}
              </Button>
            </Link>
          </div>
        </div>
      </div>

      {/* Contact Info */}
      <div className="py-12 bg-background">
        <div className="container-custom">
          <div className="text-center">
            <h3 className="text-2xl font-heading font-bold text-foreground mb-4">
              {t('becomeMember.contactInfo.title')}
            </h3>
            <div className="space-y-2 text-muted-foreground">
              <p>{t('contact.emailAddress')}</p>
              <p>{t('contact.phoneNumber')}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
