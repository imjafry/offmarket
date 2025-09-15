import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { MapPin, Home, User, Heart, Eye } from 'lucide-react';
import { motion } from 'framer-motion';
import { useTranslation } from '@/hooks/useTranslation';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { useAuth } from '@/contexts/AuthContext';
import { AlertDialog, AlertDialogAction, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle } from '@/components/ui/alert-dialog';

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
  listingType?: 'sale' | 'rent';
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
  views?: number;
  inquiries?: number;
  createdAt?: string;
  updatedAt?: string;
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
  const [showFavDialog, setShowFavDialog] = useState(false);
  const { isAuthenticated } = useAuth();

  const priceText = (property.price || '').trim();
  const isOnRequest = !priceText || /on\s*request|sur\s*demande/i.test(priceText);
  const listingType = property.listingType || (property.status === 'rented' ? 'rent' : 'sale');

  const getStatusBadgeClass = (status: Property['status']) => {
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
    <Link to={`/property/${property.id}`} className="block">
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        whileHover={{ y: -8 }}
        transition={{ duration: 0.3 }}
        className="group bg-white rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 overflow-hidden cursor-pointer"
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
        
        {/* Listing Type Badge (Sale / Rent) */}
        <Badge className={`absolute top-4 left-4 ${getStatusBadgeClass(property.status)} px-3 py-1`}>
          {listingType === 'rent' ? t('property.listing.rent') : t('property.listing.sale')}
        </Badge>

        {/* Featured Badge removed */}

        {/* Favorite Button */}
        <button
          onClick={(e) => {
            e.preventDefault();
            e.stopPropagation();
            if (!isAuthenticated) {
              setShowFavDialog(true);
              return;
            }
            setIsFavorited(!isFavorited);
          }}
          className="absolute top-4 right-4 p-2 bg-white/20 backdrop-blur-sm rounded-full hover:bg-white/30 transition-colors"
        >
          <Heart className={`h-5 w-5 ${isFavorited ? 'fill-primary text-primary' : 'text-white'}`} />
        </button>

        {/* Image Navigation Dots */}
        {property.images.length > 1 && (
          <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex space-x-2">
            {property.images.map((_, index) => (
              <button
                key={index}
                onClick={(e) => {
                  e.preventDefault();
                  e.stopPropagation();
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

        {/* Price Tag or On Request */}
        <div className="absolute bottom-4 left-4 bg-white/95 backdrop-blur-sm rounded-lg px-3 py-2">
          {!isOnRequest ? (
            <div className="flex flex-col">
              <span className="text-sm text-muted-foreground">
                {listingType === 'rent' ? t('property.listing.rent') : t('property.listing.sale')}
              </span>
              <span className="text-lg font-bold text-foreground">
                {priceText}
              </span>
            </div>
          ) : (
            <Link to="/contact" className="text-lg font-bold text-primary hover:underline">
              {t('property.onRequest')}
            </Link>
          )}
        </div>

        {/* Views Counter */}
        <div className="absolute bottom-4 right-4 flex items-center space-x-1 bg-white/20 backdrop-blur-sm rounded-lg px-2 py-1 text-white text-sm">
          <Eye className="h-4 w-4" />
          <span>45</span>
        </div>
      </div>

      {/* Property Content */}
      <div className="p-6 space-y-4">

        {/* Title & Location */}
        <div className="space-y-2">
          <h3 className="text-lg font-heading font-bold text-foreground line-clamp-2 group-hover:text-primary transition-colors min-h-[3.5rem] flex items-start">
            {property.title}
          </h3>
          <div className="flex items-center space-x-2 text-muted-foreground">
            <MapPin className="h-4 w-4" />
            <span className="text-sm">{property.city}, {property.neighborhood}</span>
          </div>
        </div>

        {/* Property Features */}
        <div className="grid grid-cols-3 gap-4 py-3 border-t border-b border-gray-light">
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

        {/* Contact Info (only show if showContactInfo is true) */}
        {showContactInfo && property.contactInfo && (
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
        )}
      </div>
      </motion.div>
      {/* Favorites Auth Dialog */}
      <AlertDialog open={showFavDialog} onOpenChange={setShowFavDialog}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>{t('language') === 'fr' ? 'Devenez membre' : 'Become a member'}</AlertDialogTitle>
            <AlertDialogDescription>
              {t('language') === 'fr'
                ? 'Devenez membre pour enregistrer vos favoris et accéder aux avantages réservés aux membres.'
                : 'Become a member to save favorites and access member benefits.'}
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <Button variant="outline" onClick={() => setShowFavDialog(false)}>
              {t('language') === 'fr' ? 'Plus tard' : 'Not now'}
            </Button>
            <Link to="/become-member">
              <AlertDialogAction>
                {t('language') === 'fr' ? 'Devenir membre' : 'Become a member'}
              </AlertDialogAction>
            </Link>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </Link>
  );
};