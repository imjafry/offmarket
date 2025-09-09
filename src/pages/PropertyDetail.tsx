import React from 'react';
import { useParams, Link } from 'react-router-dom';
import { ArrowLeft, MapPin, Home, Maximize, Phone, Mail, User } from 'lucide-react';
import { useTranslation } from '@/hooks/useTranslation';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { mockProperties } from '@/data/mockProperties';

export const PropertyDetailPage: React.FC = () => {
  const { t } = useTranslation();
  const { id } = useParams<{ id: string }>();
  
  // Mock authentication state
  const isAuthenticated = false;
  
  const property = mockProperties.find(p => p.id === id);

  if (!property) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="text-center space-y-4">
          <h1 className="text-2xl font-heading font-bold text-foreground">
            {t('language') === 'fr' ? 'Propriété non trouvée' : 'Property not found'}
          </h1>
          <Link to="/properties">
            <Button variant="outline">
              {t('language') === 'fr' ? 'Retour aux propriétés' : 'Back to Properties'}
            </Button>
          </Link>
        </div>
      </div>
    );
  }

  const getStatusBadgeClass = (status: string) => {
    switch (status) {
      case 'available':
        return 'bg-available text-available-foreground';
      case 'rented':
        return 'bg-rented text-rented-foreground';
      case 'sold':
        return 'bg-sold text-sold-foreground';
      default:
        return 'bg-available text-available-foreground';
    }
  };

  return (
    <div className="min-h-screen bg-background">
      <div className="container-custom py-8">
        {/* Back Navigation */}
        <Link 
          to="/properties" 
          className="inline-flex items-center text-sm text-muted-foreground hover:text-primary transition-colors mb-6"
        >
          <ArrowLeft className="h-4 w-4 mr-2" />
          {t('language') === 'fr' ? 'Retour aux propriétés' : 'Back to Properties'}
        </Link>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-6">
            {/* Image Gallery */}
            <div className="aspect-[16/10] bg-muted rounded-lg overflow-hidden">
              <img
                src={property.images[0] || '/placeholder.svg'}
                alt={property.title}
                className="w-full h-full object-cover"
              />
            </div>

            {/* Property Info */}
            <div className="space-y-4">
              <div className="flex items-start justify-between">
                <div className="space-y-2">
                  <h1 className="text-3xl font-heading font-bold text-foreground">
                    {property.title}
                  </h1>
                  <div className="flex items-center space-x-4 text-muted-foreground">
                    <div className="flex items-center space-x-1">
                      <MapPin className="h-4 w-4" />
                      <span>{property.city}, {property.neighborhood}</span>
                    </div>
                    <div className="flex items-center space-x-1">
                      <Home className="h-4 w-4" />
                      <span>{property.rooms} {t('properties.rooms')}</span>
                    </div>
                    <div className="flex items-center space-x-1">
                      <Maximize className="h-4 w-4" />
                      <span>{property.surface} m²</span>
                    </div>
                  </div>
                </div>
                <Badge className={getStatusBadgeClass(property.status)}>
                  {t(`properties.status.${property.status}`)}
                </Badge>
              </div>

              {property.price && (
                <div className="text-2xl font-bold text-foreground">
                  {property.price}
                </div>
              )}
            </div>

            {/* Description */}
            <Card>
              <CardHeader>
                <CardTitle>{t('property.description')}</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground leading-relaxed">
                  {property.description}
                </p>
              </CardContent>
            </Card>

            {/* Features */}
            <Card>
              <CardHeader>
                <CardTitle>{t('property.features')}</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-2 md:grid-cols-3 gap-2">
                  {property.features.map((feature, index) => (
                    <Badge key={index} variant="secondary" className="justify-center py-2">
                      {feature}
                    </Badge>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Contact Information */}
            <Card>
              <CardHeader>
                <CardTitle>{t('property.contact')}</CardTitle>
                <CardDescription>
                  {isAuthenticated 
                    ? t('language') === 'fr' 
                      ? 'Contactez directement le propriétaire'
                      : 'Contact the owner directly'
                    : t('auth.loginRequired')
                  }
                </CardDescription>
              </CardHeader>
              <CardContent>
                {isAuthenticated && property.contactInfo ? (
                  <div className="space-y-4">
                    <div className="flex items-center space-x-3">
                      <User className="h-5 w-5 text-muted-foreground" />
                      <span className="font-medium">{property.contactInfo.name}</span>
                    </div>
                    <div className="flex items-center space-x-3">
                      <Phone className="h-5 w-5 text-muted-foreground" />
                      <a 
                        href={`tel:${property.contactInfo.phone}`}
                        className="text-primary hover:text-primary-hover transition-colors"
                      >
                        {property.contactInfo.phone}
                      </a>
                    </div>
                    <div className="flex items-center space-x-3">
                      <Mail className="h-5 w-5 text-muted-foreground" />
                      <a 
                        href={`mailto:${property.contactInfo.email}`}
                        className="text-primary hover:text-primary-hover transition-colors"
                      >
                        {property.contactInfo.email}
                      </a>
                    </div>
                    <Button className="w-full btn-primary mt-4">
                      {t('language') === 'fr' ? 'Contacter' : 'Contact'}
                    </Button>
                  </div>
                ) : (
                  <div className="text-center py-8">
                    <div className="space-y-4">
                      <div className="w-16 h-16 bg-muted rounded-full flex items-center justify-center mx-auto">
                        <User className="h-8 w-8 text-muted-foreground" />
                      </div>
                      <p className="text-sm text-muted-foreground">
                        {t('auth.loginRequired')}
                      </p>
                      <Link to="/login">
                        <Button variant="outline" size="sm">
                          {t('auth.login')}
                        </Button>
                      </Link>
                    </div>
                  </div>
                )}
              </CardContent>
            </Card>

            {/* Property Summary */}
            <Card>
              <CardHeader>
                <CardTitle>{t('property.details')}</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <div className="flex justify-between">
                  <span className="text-muted-foreground">{t('properties.filters.type')}</span>
                  <span className="font-medium">
                    {t('language') === 'fr' ? 'Appartement' : 'Apartment'}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">{t('property.surface')}</span>
                  <span className="font-medium">{property.surface} m²</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">{t('properties.filters.rooms')}</span>
                  <span className="font-medium">{property.rooms}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">{t('property.availability')}</span>
                  <Badge className={getStatusBadgeClass(property.status)}>
                    {t(`properties.status.${property.status}`)}
                  </Badge>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};