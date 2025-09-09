import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { MapPin, Home, User, Heart, Eye, Star } from 'lucide-react';
import { motion } from 'framer-motion';
import { useTranslation } from '@/hooks/useTranslation';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';

export interface Property {
  id: string;
  title: string;
  description: string;
  city: string;
  neighborhood: string;
  address?: string; // Full address (optional for privacy)
  propertyType: 'apartment' | 'house' | 'loft' | 'penthouse' | 'studio' | 'duplex' | 'villa' | 'chalet' | 'castle';
  rooms: number;
  surface: number;
  status: 'available' | 'rented' | 'sold';
  price?: string;
  availabilityDate?: string; // Available from date
  images: string[];
  videoUrl?: string; // Video URL or upload
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
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [isHovered, setIsHovered] = useState(false);
  const [isFavorited, setIsFavorited] = useState(false);

  const getStatusBadgeClass = (status: Property['status']) => {
    switch (status) {
      case 'available':
        return 'bg-emerald-500 text-white';
      case 'rented':
        return 'bg-orange-500 text-white';
      case 'sold':
        return 'bg-red-500 text-white';
      default:
        return 'bg-emerald-500 text-white';
    }
  };

  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      whileHover={{ y: -8 }}
      transition={{ duration: 0.3 }}
      className="group bg-white rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 overflow-hidden"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => {
        setIsHovered(false);
        setCurrentImageIndex(0);
      }}
    >
      {/* Property Image with Carousel */}
      <div className="relative aspect-[4/3] overflow-hidden">
        <motion.img
          key={currentImageIndex}
          src={property.images[currentImageIndex] || '/placeholder.svg'}
          alt={property.title}
          className="w-full h-full object-cover"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.3 }}
        />
        
        {/* Image Overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/20 via-transparent to-transparent" />
        
        {/* Status Badge */}
        <Badge className={`absolute top-4 left-4 ${getStatusBadgeClass(property.status)} px-3 py-1`}>
          {t(`properties.status.${property.status}`)}
        </Badge>

        {/* Featured Badge */}
        <Badge className="absolute top-4 right-16 bg-orange-500 text-white px-3 py-1">
          {t('language') === 'fr' ? 'Vedette' : 'Featured'}
        </Badge>

        {/* Favorite Button */}
        <button
          onClick={(e) => {
            e.preventDefault();
            setIsFavorited(!isFavorited);
          }}
          className="absolute top-4 right-4 p-2 bg-white/20 backdrop-blur-sm rounded-full hover:bg-white/30 transition-colors"
        >
          <Heart className={`h-5 w-5 ${isFavorited ? 'fill-red-500 text-red-500' : 'text-white'}`} />
        </button>

        {/* Image Navigation Dots */}
        {property.images.length > 1 && (
          <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex space-x-2">
            {property.images.map((_, index) => (
              <button
                key={index}
                onClick={(e) => {
                  e.preventDefault();
                  setCurrentImageIndex(index);
                }}
                className={`w-2 h-2 rounded-full transition-colors ${
                  index === currentImageIndex ? 'bg-white' : 'bg-white/50'
                }`}
              />
            ))}
          </div>
        )}

        {/* Hover Effect for Image Cycling */}
        {isHovered && property.images.length > 1 && (
          <div 
            className="absolute inset-0 grid grid-cols-3"
            onMouseEnter={() => {
              const interval = setInterval(() => {
                setCurrentImageIndex((prev) => 
                  prev < property.images.length - 1 ? prev + 1 : 0
                );
              }, 1000);
              return () => clearInterval(interval);
            }}
          />
        )}

        {/* Price Tag */}
        {property.price && (
          <div className="absolute bottom-4 left-4 bg-white/95 backdrop-blur-sm rounded-lg px-3 py-2">
            <span className="text-lg font-bold text-foreground">{property.price}</span>
          </div>
        )}

        {/* Views Counter */}
        <div className="absolute bottom-4 right-4 flex items-center space-x-1 bg-white/20 backdrop-blur-sm rounded-lg px-2 py-1 text-white text-sm">
          <Eye className="h-4 w-4" />
          <span>45</span>
        </div>
      </div>

      {/* Property Content */}
      <div className="p-6 space-y-4">
        {/* Rating */}
        <div className="flex items-center space-x-2">
          <div className="flex items-center space-x-1">
            {[...Array(5)].map((_, i) => (
              <Star key={i} className="h-4 w-4 fill-yellow-400 text-yellow-400" />
            ))}
          </div>
          <span className="text-sm font-medium text-foreground">4.6</span>
          <span className="text-sm text-muted-foreground">(36 Reviews)</span>
        </div>

        {/* Title & Location */}
        <div className="space-y-2">
          <h3 className="text-xl font-heading font-bold text-foreground line-clamp-2 group-hover:text-primary transition-colors">
            {property.title}
          </h3>
          <div className="flex items-center space-x-2 text-muted-foreground">
            <MapPin className="h-4 w-4" />
            <span className="text-sm">{property.city}, {property.neighborhood}</span>
          </div>
        </div>

        {/* Property Features */}
        <div className="grid grid-cols-3 gap-4 py-3 border-t border-b border-gray-100">
          <div className="text-center">
            <div className="flex items-center justify-center space-x-1 text-primary">
              <Home className="h-4 w-4" />
            </div>
            <span className="text-xs text-muted-foreground mt-1 block">{property.rooms} {t('properties.rooms')}</span>
          </div>
          <div className="text-center">
            <div className="flex items-center justify-center space-x-1 text-primary">
              <span className="text-sm font-semibold">2</span>
            </div>
            <span className="text-xs text-muted-foreground mt-1 block">Bath</span>
          </div>
          <div className="text-center">
            <div className="flex items-center justify-center space-x-1 text-primary">
              <span className="text-sm font-semibold">{property.surface}</span>
            </div>
            <span className="text-xs text-muted-foreground mt-1 block">Sq Ft</span>
          </div>
        </div>

        {/* Contact Info or Login Required */}
        {showContactInfo && property.contactInfo ? (
          <div className="space-y-3">
            <div className="flex items-center space-x-3 p-3 bg-muted/20 rounded-lg">
              <div className="w-10 h-10 bg-primary rounded-full flex items-center justify-center">
                <User className="h-5 w-5 text-primary-foreground" />
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-sm font-medium text-foreground truncate">
                  {property.contactInfo.name}
                </p>
                <p className="text-xs text-muted-foreground">Company Agent</p>
              </div>
            </div>
          </div>
        ) : !showContactInfo ? (
          <div className="p-3 bg-muted/20 rounded-lg">
            <p className="text-sm text-muted-foreground text-center">
              {t('auth.loginRequired')}
            </p>
          </div>
        ) : null}

        {/* Action Buttons */}
        <div className="flex space-x-3 pt-2">
          <Link to={`/property/${property.id}`} className="flex-1">
            <Button variant="outline" className="w-full group border-primary/20 hover:bg-primary hover:text-primary-foreground">
              {t('properties.viewDetails')}
              <Eye className="ml-2 h-4 w-4 group-hover:scale-110 transition-transform" />
            </Button>
          </Link>
          {showContactInfo && (
            <Button className="btn-primary px-6">
              {t('language') === 'fr' ? 'Contacter' : 'Contact'}
            </Button>
          )}
        </div>
      </div>
    </motion.div>
  );
};