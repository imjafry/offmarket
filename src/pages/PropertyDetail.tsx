import React, { useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { ArrowLeft, MapPin, Home, Maximize, Phone, Mail, User, Star, Heart, Share2, Calendar, Eye, Wifi, Car, Dumbbell, Waves, TreePine, Shield, Snowflake, Camera, Play, MessageCircle, ChevronDown } from 'lucide-react';
import { motion } from 'framer-motion';
import { useTranslation } from '@/hooks/useTranslation';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';
import { PropertyGallery } from '@/components/PropertyGallery';
import { mockProperties } from '@/data/mockProperties';

export const PropertyDetailPage: React.FC = () => {
  const { t } = useTranslation();
  const { id } = useParams<{ id: string }>();
  const [isFavorited, setIsFavorited] = useState(false);
  const [showFullDescription, setShowFullDescription] = useState(false);
  const [selectedTab, setSelectedTab] = useState('overview');
  
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

  // Enhanced property features with icons
  const propertyFeatures = [
    { icon: Home, label: `${property.rooms} ${t('properties.rooms')}`, category: 'layout' },
    { icon: Maximize, label: `${property.surface} m²`, category: 'layout' },
    { icon: Car, label: 'Parking: 1', category: 'amenities' },
    { icon: Wifi, label: 'High-speed WiFi', category: 'amenities' },
    { icon: Dumbbell, label: 'Fitness Center', category: 'amenities' },
    { icon: Waves, label: 'Swimming Pool', category: 'amenities' },
    { icon: TreePine, label: 'Garden View', category: 'view' },
    { icon: Shield, label: '24/7 Security', category: 'security' },
  ];

  const amenityIcons = {
    'Vue lac': Eye,
    'Balcon': Home,
    'Cave': Shield,
    'Place de parc': Car,
    'Piscine': Waves,
    'Jardin': TreePine,
    'Garage 2 places': Car,
    'Cheminée': Home,
    'Design': Star,
    'Terrasse': Home,
    'Ascenseur': Home,
    'Concierge': User,
  };

  const mockReviews = [
    {
      id: 1,
      name: 'Joseph Massey',
      rating: 5,
      date: '2 days ago',
      comment: 'This hotel exceeded my expectations! The pool, spa, and dining options were top-notch, and the room had every amenity I could ask for. It felt like a true getaway.',
      helpful: 21,
      replies: 0
    },
    {
      id: 2,
      name: 'Jeffrey Jones',
      rating: 5,
      date: '2 days ago',
      comment: 'This hotel exceeded my expectations! The pool, spa, and dining options were top-notch, and the room had every amenity I could ask for. It felt like a true getaway.',
      helpful: 41,
      replies: 95
    }
  ];

  return (
    <div className="min-h-screen bg-background">
      {/* Back Navigation */}
      <div className="container-custom pt-8">
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
        >
          <Link 
            to="/properties" 
            className="inline-flex items-center text-sm text-muted-foreground hover:text-primary transition-colors mb-6"
          >
            <ArrowLeft className="h-4 w-4 mr-2" />
            {t('language') === 'fr' ? 'Retour aux propriétés' : 'Back to Properties'}
          </Link>
        </motion.div>
      </div>

      {/* Hero Section with Status Badges */}
      <div className="relative bg-background pb-8">
        <div className="container-custom">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="flex flex-wrap items-center justify-between mb-6"
          >
            {/* Status Badges */}
            <div className="flex items-center space-x-3">
              <Badge className="bg-red-500 text-white px-4 py-2">
                {t('language') === 'fr' ? 'Tendance' : 'Trending'}
              </Badge>
              <Badge className="bg-orange-500 text-white px-4 py-2">
                {t('language') === 'fr' ? 'Vedette' : 'Featured'}
              </Badge>
            </div>
            
            {/* Stats */}
            <div className="flex items-center space-x-6 text-muted-foreground">
              <span className="text-sm">{t('language') === 'fr' ? 'Total de visites' : 'Total No of Visits'}: 45</span>
              <div className="flex items-center space-x-2">
                <Eye className="h-4 w-4" />
                <span className="text-sm">Last Updated: 24 Feb 2025</span>
              </div>
            </div>
          </motion.div>

          {/* Property Gallery */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.2 }}
          >
            <PropertyGallery 
              images={property.images} 
              title={property.title}
              hasVideo={true}
            />
          </motion.div>
        </div>
      </div>

      <div className="container-custom pb-16">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-8">
            {/* Property Header */}
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
              className="space-y-6"
            >
              {/* Title and Actions */}
              <div className="flex items-start justify-between">
                <div className="space-y-4">
                  {/* Rating */}
                  <div className="flex items-center space-x-3">
                    <div className="flex items-center space-x-1">
                      {[...Array(5)].map((_, i) => (
                        <Star key={i} className="h-5 w-5 fill-yellow-400 text-yellow-400" />
                      ))}
                    </div>
                    <span className="text-lg font-semibold text-foreground">5.0</span>
                    <span className="text-muted-foreground">
                      318-330 S Oakley Blvd, Chicago, IL 60612, USA
                    </span>
                    <Button variant="link" className="text-primary p-0 h-auto">
                      View Location
                    </Button>
                  </div>

                  {/* Title */}
                  <h1 className="text-4xl md:text-5xl font-heading font-bold text-foreground leading-tight">
                    {property.title}
                  </h1>
                  
                  {/* Location */}
                  <div className="flex items-center space-x-2 text-lg text-muted-foreground">
                    <MapPin className="h-5 w-5" />
                    <span>{property.city}, {property.neighborhood}</span>
                  </div>
                </div>

                {/* Price and Actions */}
                <div className="text-right space-y-4">
                  {property.price && (
                    <div className="text-3xl md:text-4xl font-bold text-primary">
                      {property.price}
                    </div>
                  )}
                  <div className="flex items-center space-x-3">
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => setIsFavorited(!isFavorited)}
                      className="p-2"
                    >
                      <Heart className={`h-5 w-5 ${isFavorited ? 'fill-red-500 text-red-500' : ''}`} />
                    </Button>
                    <Button variant="outline" size="sm" className="p-2">
                      <Share2 className="h-5 w-5" />
                    </Button>
                  </div>
                </div>
              </div>

              {/* Quick Stats */}
              <div className="grid grid-cols-3 gap-8 py-6 border-y border-border">
                <div className="text-center">
                  <div className="flex items-center justify-center mb-2">
                    <Home className="h-6 w-6 text-primary" />
                  </div>
                  <div className="text-2xl font-bold text-foreground">2</div>
                  <div className="text-sm text-muted-foreground">Bedroom</div>
                </div>
                <div className="text-center">
                  <div className="flex items-center justify-center mb-2">
                    <div className="w-6 h-6 flex items-center justify-center">
                      <span className="text-primary font-bold">2</span>
                    </div>
                  </div>
                  <div className="text-2xl font-bold text-foreground">2</div>
                  <div className="text-sm text-muted-foreground">Bath</div>
                </div>
                <div className="text-center">
                  <div className="flex items-center justify-center mb-2">
                    <Maximize className="h-6 w-6 text-primary" />
                  </div>
                  <div className="text-2xl font-bold text-foreground">{property.surface}</div>
                  <div className="text-sm text-muted-foreground">Sq Ft</div>
                </div>
              </div>

              {/* Listed Info */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 py-4">
                <div>
                  <span className="text-muted-foreground">Listed on:</span>
                  <span className="ml-2 font-medium">02 May 2025</span>
                </div>
                <div>
                  <span className="text-muted-foreground">Category:</span>
                  <span className="ml-2 font-medium">
                    {t('language') === 'fr' ? 'Appartement' : 'Apartment'}
                  </span>
                </div>
              </div>
            </motion.div>

            {/* Tabs Navigation */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.4 }}
            >
              <div className="border-b border-border">
                <nav className="flex space-x-8">
                  {[
                    { id: 'overview', label: t('language') === 'fr' ? 'Aperçu' : 'Overview' },
                    { id: 'description', label: t('property.description') },
                    { id: 'features', label: t('property.features') },
                    { id: 'amenities', label: t('language') === 'fr' ? 'Commodités' : 'Amenities' },
                    { id: 'video', label: t('language') === 'fr' ? 'Vidéo' : 'Video' },
                    { id: 'reviews', label: t('language') === 'fr' ? 'Avis' : 'Reviews' }
                  ].map((tab) => (
                    <button
                      key={tab.id}
                      onClick={() => setSelectedTab(tab.id)}
                      className={`py-4 px-2 border-b-2 font-medium text-sm transition-colors ${
                        selectedTab === tab.id
                          ? 'border-primary text-primary'
                          : 'border-transparent text-muted-foreground hover:text-foreground'
                      }`}
                    >
                      {tab.label}
                    </button>
                  ))}
                </nav>
              </div>
            </motion.div>

            {/* Tab Content */}
            <motion.div
              key={selectedTab}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="space-y-8"
            >
              {selectedTab === 'overview' && (
                <div className="space-y-6">
                  <div>
                    <p className="text-muted-foreground leading-relaxed mb-4">
                      {property.description}
                    </p>
                    {!showFullDescription && (
                      <Button 
                        variant="link" 
                        onClick={() => setShowFullDescription(true)}
                        className="text-primary p-0"
                      >
                        Read More ↓
                      </Button>
                    )}
                  </div>
                  
                  {/* Key Points */}
                  <div className="space-y-4">
                    <h3 className="text-xl font-heading font-bold">Key Highlights</h3>
                    <div className="space-y-3">
                      {[
                        '100 meters from school. 3km away from bypass.',
                        'First floor - 2 large bedrooms with attached bathrooms.',
                        'Spacious and well-Equipped kitchen.',
                        'Inviting living room with balcony.',
                        'Terrace with breathtaking views.',
                        'Independent electric and water connections.'
                      ].map((point, index) => (
                        <div key={index} className="flex items-start space-x-3">
                          <div className="w-2 h-2 bg-primary rounded-full mt-2 flex-shrink-0" />
                          <span className="text-muted-foreground">{point}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              )}

              {selectedTab === 'features' && (
                <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
                  {propertyFeatures.map((feature, index) => (
                    <motion.div
                      key={index}
                      initial={{ opacity: 0, scale: 0.9 }}
                      animate={{ opacity: 1, scale: 1 }}
                      transition={{ delay: index * 0.1 }}
                      className="flex flex-col items-center p-6 bg-muted/20 rounded-2xl text-center space-y-3 hover:bg-muted/40 transition-colors"
                    >
                      <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center">
                        <feature.icon className="h-6 w-6 text-primary" />
                      </div>
                      <span className="font-medium text-sm">{feature.label}</span>
                    </motion.div>
                  ))}
                </div>
              )}

              {selectedTab === 'amenities' && (
                <div className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    {property.features.map((feature, index) => {
                      const IconComponent = amenityIcons[feature as keyof typeof amenityIcons] || Home;
                      return (
                        <motion.div
                          key={index}
                          initial={{ opacity: 0, x: -20 }}
                          animate={{ opacity: 1, x: 0 }}
                          transition={{ delay: index * 0.1 }}
                          className="flex items-center space-x-3 p-4 bg-muted/20 rounded-lg"
                        >
                          <IconComponent className="h-5 w-5 text-primary" />
                          <span className="font-medium">{feature}</span>
                        </motion.div>
                      );
                    })}
                  </div>
                </div>
              )}

              {selectedTab === 'video' && (
                <div className="space-y-6">
                  <div className="aspect-video bg-muted rounded-2xl flex items-center justify-center relative overflow-hidden">
                    <img 
                      src="/placeholder.svg" 
                      alt="Property Video Thumbnail" 
                      className="w-full h-full object-cover"
                    />
                    <Button 
                      size="lg" 
                      className="absolute bg-white/20 hover:bg-white/30 text-white backdrop-blur-sm rounded-full w-20 h-20 p-0"
                    >
                      <Play className="h-10 w-10" />
                    </Button>
                  </div>
                </div>
              )}

              {selectedTab === 'reviews' && (
                <div className="space-y-8">
                  {/* Review Summary */}
                  <div className="bg-muted/20 rounded-2xl p-8">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                      <div className="text-center">
                        <div className="text-5xl font-bold text-foreground mb-2">4.9</div>
                        <div className="flex items-center justify-center mb-2">
                          {[...Array(5)].map((_, i) => (
                            <Star key={i} className="h-5 w-5 fill-yellow-400 text-yellow-400" />
                          ))}
                        </div>
                        <p className="text-muted-foreground">Based on 2,649 Reviews</p>
                      </div>
                      <div className="space-y-3">
                        {[5, 4, 3, 2, 1].map((star) => (
                          <div key={star} className="flex items-center space-x-3">
                            <span className="text-sm w-2">{star}</span>
                            <Star className="h-4 w-4 text-yellow-400" />
                            <div className="flex-1 bg-muted rounded-full h-2">
                              <div 
                                className="bg-yellow-400 h-2 rounded-full"
                                style={{ width: star === 5 ? '80%' : star === 4 ? '15%' : '3%' }}
                              />
                            </div>
                            <span className="text-sm text-muted-foreground w-8">
                              {star === 5 ? '247' : star === 4 ? '145' : '60'}
                            </span>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>

                  {/* Individual Reviews */}
                  <div className="space-y-6">
                    {mockReviews.map((review) => (
                      <div key={review.id} className="border-b border-border pb-6 last:border-b-0">
                        <div className="flex items-start space-x-4">
                          <div className="w-10 h-10 bg-primary rounded-full flex items-center justify-center">
                            <span className="text-primary-foreground font-medium">
                              {review.name.charAt(0)}
                            </span>
                          </div>
                          <div className="flex-1">
                            <div className="flex items-center justify-between mb-2">
                              <div>
                                <h4 className="font-medium">{review.name}</h4>
                                <div className="flex items-center space-x-2 text-sm text-muted-foreground">
                                  <div className="flex items-center">
                                    {[...Array(review.rating)].map((_, i) => (
                                      <Star key={i} className="h-3 w-3 fill-yellow-400 text-yellow-400" />
                                    ))}
                                  </div>
                                  <span>{review.date}</span>
                                </div>
                              </div>
                            </div>
                            <p className="text-muted-foreground leading-relaxed mb-3">
                              {review.comment}
                            </p>
                            <div className="flex items-center space-x-4 text-sm">
                              <button className="flex items-center space-x-1 text-muted-foreground hover:text-foreground">
                                <span>👍</span>
                                <span>{review.helpful}</span>
                              </button>
                              <button className="flex items-center space-x-1 text-muted-foreground hover:text-foreground">
                                <span>👎</span>
                                <span>0</span>
                              </button>
                              <button className="text-primary hover:text-primary-hover">
                                Reply
                              </button>
                            </div>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>

                  {/* Load More Reviews */}
                  <div className="text-center">
                    <Button variant="outline">
                      See All Reviews
                    </Button>
                  </div>
                </div>
              )}
            </motion.div>
          </div>

          {/* Enhanced Sidebar */}
          <div className="space-y-8">
            {/* Inquiry Form */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.5 }}
            >
              <Card className="overflow-hidden">
                <CardHeader className="bg-primary text-primary-foreground">
                  <CardTitle className="text-xl">
                    {t('language') === 'fr' ? 'Demande' : 'Enquiry'}
                  </CardTitle>
                </CardHeader>
                <CardContent className="p-6 space-y-6">
                  <div className="flex space-x-3">
                    <Button className="flex-1 bg-primary-hover text-primary-foreground">
                      {t('language') === 'fr' ? 'Demander des infos' : 'Request Info'}
                    </Button>
                    <Button variant="outline" className="flex-1">
                      {t('language') === 'fr' ? 'Programmer visite' : 'Schedule a Visit'}
                    </Button>
                  </div>

                  {/* Agent Info */}
                  <div className="flex items-center space-x-4 p-4 bg-muted/20 rounded-lg">
                    <div className="w-12 h-12 bg-primary rounded-full flex items-center justify-center">
                      <User className="h-6 w-6 text-primary-foreground" />
                    </div>
                    <div>
                      <h4 className="font-medium">Adrian Henriques</h4>
                      <p className="text-sm text-muted-foreground">Company Agent</p>
                    </div>
                  </div>

                  {/* Contact Form */}
                  <div className="space-y-4">
                    <div>
                      <label className="text-sm font-medium mb-2 block">Name</label>
                      <Input placeholder="Your Name" />
                    </div>
                    <div>
                      <label className="text-sm font-medium mb-2 block">Email</label>
                      <Input placeholder="Your Email" type="email" />
                    </div>
                    <div>
                      <label className="text-sm font-medium mb-2 block">Phone</label>
                      <Input placeholder="Your Phone Number" />
                    </div>
                    <div>
                      <label className="text-sm font-medium mb-2 block">Description</label>
                      <Textarea placeholder="Tell us about your requirements..." rows={4} />
                    </div>
                    <Button className="w-full btn-primary">
                      Submit
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </motion.div>

            {/* Owner Details */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.6 }}
            >
              <Card>
                <CardHeader>
                  <CardTitle>Listing Owner Details</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex items-center space-x-4">
                    <div className="w-12 h-12 bg-primary rounded-full flex items-center justify-center">
                      <span className="text-primary-foreground font-medium">JC</span>
                    </div>
                    <div>
                      <h4 className="font-medium">John Carter</h4>
                      <div className="flex items-center space-x-2 text-sm text-muted-foreground">
                        <div className="flex items-center">
                          {[...Array(5)].map((_, i) => (
                            <Star key={i} className="h-3 w-3 fill-yellow-400 text-yellow-400" />
                          ))}
                        </div>
                        <span>5.0 (12 Reviews)</span>
                      </div>
                    </div>
                  </div>

                  <Separator />

                  <div className="space-y-3 text-sm">
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Phone</span>
                      <span>Call Us - +1 12345 45648</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Email</span>
                      <span>info@example.com</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">No of Listings</span>
                      <span>05</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">No of Bookings</span>
                      <span>225</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Member on</span>
                      <span>15 Jan2014</span>
                    </div>
                  </div>

                  <Separator />

                  <div className="flex space-x-2">
                    <Button className="flex-1 bg-emerald-500 hover:bg-emerald-600 text-white">
                      WhatsApp
                    </Button>
                    <Button variant="outline" className="flex-1">
                      Chat Now
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </motion.div>

            {/* Share Property */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.7 }}
            >
              <Card>
                <CardHeader>
                  <CardTitle>Share Property</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-3 gap-3">
                    {['Facebook', 'Twitter', 'LinkedIn', 'WhatsApp', 'Email', 'Copy'].map((platform) => (
                      <Button
                        key={platform}
                        variant="outline"
                        size="sm"
                        className="text-xs"
                      >
                        {platform}
                      </Button>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </motion.div>

            {/* Mortgage Calculator */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.8 }}
            >
              <Card>
                <CardHeader>
                  <CardTitle>Mortgage Calculator</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div>
                    <label className="text-sm font-medium mb-2 block">Total Amount ($)</label>
                    <Input defaultValue="15000" />
                  </div>
                  <div>
                    <label className="text-sm font-medium mb-2 block">Down Payment ($)</label>
                    <Input defaultValue="15000" />
                  </div>
                  <div>
                    <label className="text-sm font-medium mb-2 block">Loan Terms (Years)</label>
                    <Input defaultValue="5" />
                  </div>
                  <div>
                    <label className="text-sm font-medium mb-2 block">Interest Rate (%)</label>
                    <Input defaultValue="15" />
                  </div>
                  <div>
                    <label className="text-sm font-medium mb-2 block">Min Soft</label>
                    <Input />
                  </div>
                  <Button className="w-full btn-primary">
                    View larger map
                  </Button>
                </CardContent>
              </Card>
            </motion.div>
          </div>
        </div>
      </div>
    </div>
  );
};