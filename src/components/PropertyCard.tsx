import React from 'react';
import { Link } from 'react-router-dom';
import { MapPin, Home, User } from 'lucide-react';
import { useTranslation } from '@/hooks/useTranslation';
import { Button } from '@/components/ui/button';

export interface Property {
  id: string;
  title: string;
  description: string;
  city: string;
  neighborhood: string;
  rooms: number;
  surface: number;
  status: 'available' | 'rented' | 'sold';
  price?: string;
  images: string[];
  features: string[];
  contactInfo?: {
    name: string;
    phone: string;
    email: string;
  };
}

interface PropertyCardProps {
  property: Property;
  showContactInfo?: boolean;
}

export const PropertyCard: React.FC<PropertyCardProps> = ({ 
  property, 
  showContactInfo = false 
}) => {
  const { t } = useTranslation();

  const getStatusBadgeClass = (status: Property['status']) => {
    switch (status) {
      case 'available':
        return 'badge-available';
      case 'rented':
        return 'badge-rented';
      case 'sold':
        return 'badge-sold';
      default:
        return 'badge-available';
    }
  };

  return (
    <div className="card-property">
      {/* Property Image */}
      <div className="aspect-[4/3] bg-muted rounded-t-lg overflow-hidden">
        <img
          src={property.images[0] || '/placeholder.svg'}
          alt={property.title}
          className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
        />
      </div>

      {/* Property Content */}
      <div className="p-6 space-y-4">
        {/* Status Badge */}
        <div className="flex justify-between items-start">
          <span className={getStatusBadgeClass(property.status)}>
            {t(`properties.status.${property.status}`)}
          </span>
          {property.price && (
            <span className="text-lg font-semibold text-foreground">
              {property.price}
            </span>
          )}
        </div>

        {/* Title & Description */}
        <div className="space-y-2">
          <h3 className="text-lg font-semibold text-foreground line-clamp-2">
            {property.title}
          </h3>
          <p className="text-sm text-muted-foreground line-clamp-2">
            {property.description}
          </p>
        </div>

        {/* Property Details */}
        <div className="flex items-center justify-between text-sm text-muted-foreground">
          <div className="flex items-center space-x-1">
            <MapPin className="h-4 w-4" />
            <span>{property.city}</span>
          </div>
          <div className="flex items-center space-x-1">
            <Home className="h-4 w-4" />
            <span>{property.rooms} {t('properties.rooms')}</span>
          </div>
        </div>

        {/* Contact Info (if logged in) */}
        {showContactInfo && property.contactInfo ? (
          <div className="border-t border-border pt-4 space-y-2">
            <h4 className="text-sm font-medium text-foreground">
              {t('properties.contactInfo')}
            </h4>
            <div className="space-y-1 text-sm text-muted-foreground">
              <div className="flex items-center space-x-2">
                <User className="h-4 w-4" />
                <span>{property.contactInfo.name}</span>
              </div>
              <p>{property.contactInfo.phone}</p>
              <p>{property.contactInfo.email}</p>
            </div>
          </div>
        ) : !showContactInfo ? (
          <div className="border-t border-border pt-4">
            <p className="text-xs text-muted-foreground">
              {t('auth.loginRequired')}
            </p>
          </div>
        ) : null}

        {/* View Details Button */}
        <Link to={`/property/${property.id}`} className="block">
          <Button variant="outline" className="w-full">
            {t('properties.viewDetails')}
          </Button>
        </Link>
      </div>
    </div>
  );
};