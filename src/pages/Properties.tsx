import React, { useState, useRef, useEffect } from 'react';
import { Search, SlidersHorizontal, Grid3X3, List, Filter, ChevronDown } from 'lucide-react';
import { motion } from 'framer-motion';
import { useTranslation } from '@/hooks/useTranslation';
import { useAuth } from '@/contexts/AuthContext';
import { useProperties } from '@/contexts/PropertyContext';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { PropertyCard } from '@/components/PropertyCard';
import { PropertyListCard } from '@/components/PropertyListCard';
import { swissCities, filterCities } from '@/data/swissCities';

export const PropertiesPage: React.FC = () => {
  const { t } = useTranslation();
  const { isAuthenticated } = useAuth();
  const { properties } = useProperties();
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedRooms, setSelectedRooms] = useState('3.5');
  const [selectedType, setSelectedType] = useState('apartment');
  const [selectedStatus, setSelectedStatus] = useState('rent');
  const [priceRange, setPriceRange] = useState({ min: '', max: '' });
  const [surfaceRange, setSurfaceRange] = useState({ min: '', max: '' });
  const [selectedFeatures, setSelectedFeatures] = useState<string[]>([]);
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
  const [showFilters, setShowFilters] = useState(false);

  // Get all unique features for filter options
  const allFeatures = Array.from(new Set(properties.flatMap(p => p.features)));

  // Generate room options
  const roomOptions = [];
  for (let i = 1; i <= 10; i += 0.5) {
    roomOptions.push(i.toString());
  }
  roomOptions.push('10+');

  // Filter properties based on search criteria
  const filteredProperties = properties.filter(property => {
    const matchesSearch = !searchTerm || searchTerm === 'all' ||
                         property.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         property.city.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         property.neighborhood.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         property.propertyType.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesRooms = !selectedRooms || 
                        (selectedRooms === '10+' && property.rooms >= 10) ||
                        (selectedRooms !== '10+' && property.rooms === parseFloat(selectedRooms));
    
    const matchesType = !selectedType || property.propertyType === selectedType;
    
    const matchesStatus = !selectedStatus || property.listingType === selectedStatus;
    
    // Price range filter
    const matchesPrice = !priceRange.min && !priceRange.max || (() => {
      if (!property.price) return true;
      const price = parseFloat(property.price.replace(/[^\d]/g, ''));
      const min = priceRange.min ? parseFloat(priceRange.min) : 0;
      const max = priceRange.max ? parseFloat(priceRange.max) : Infinity;
      return price >= min && price <= max;
    })();
    
    // Surface range filter
    const matchesSurface = !surfaceRange.min && !surfaceRange.max || (() => {
      const min = surfaceRange.min ? parseFloat(surfaceRange.min) : 0;
      const max = surfaceRange.max ? parseFloat(surfaceRange.max) : Infinity;
      return property.surface >= min && property.surface <= max;
    })();
    
    // Features filter
    const matchesFeatures = selectedFeatures.length === 0 || 
                           selectedFeatures.every(feature => property.features.includes(feature));
    
    return matchesSearch && matchesRooms && matchesType && matchesStatus && matchesPrice && matchesSurface && matchesFeatures;
  });

  return (
    <div className="min-h-screen bg-background">
      <div className="container-custom py-8">
        {/* Header */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="space-y-6 mb-8"
        >
          <div className="text-center space-y-4">
            <h1 className="text-4xl md:text-5xl font-heading font-bold text-foreground">
              {t('properties.title')}
            </h1>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto leading-relaxed">
              {t('properties.subtitle')}
            </p>
          </div>

          {/* Enhanced Search and Filters */}
          <div className="max-w-6xl mx-auto space-y-6">
            {/* Main Search Bar */}
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="relative"
            >
              <Search className="absolute left-6 top-1/2 transform -translate-y-1/2 h-6 w-6 text-muted-foreground z-10" />
              <Select value={searchTerm} onValueChange={setSearchTerm}>
                <SelectTrigger className="pl-16 py-8 text-lg rounded-2xl border-2 shadow-lg focus:shadow-2xl transition-all">
                  <SelectValue placeholder="Search by city, neighbourhood or type..." />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All locations</SelectItem>
                  {swissCities.map((city) => (
                    <SelectItem key={city} value={city.toLowerCase()}>
                      {city}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </motion.div>

            {/* View Toggle and Filters Bar */}
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
              className="flex flex-col lg:flex-row justify-between items-center space-y-4 lg:space-y-0 lg:space-x-4"
            >
              {/* View Mode Toggle */}
              <div className="flex items-center space-x-3">
                <span className="text-sm font-medium text-muted-foreground">View:</span>
                <div className="flex bg-muted rounded-lg p-1">
                  <Button
                    variant={viewMode === 'grid' ? 'default' : 'ghost'}
                    size="sm"
                    onClick={() => setViewMode('grid')}
                    className="rounded-md"
                  >
                    <Grid3X3 className="h-4 w-4" />
                  </Button>
                  <Button
                    variant={viewMode === 'list' ? 'default' : 'ghost'}
                    size="sm"
                    onClick={() => setViewMode('list')}
                    className="rounded-md"
                  >
                    <List className="h-4 w-4" />
                  </Button>
                </div>
              </div>

              {/* Filters */}
              <div className="flex flex-wrap items-center gap-3">
                {/* Status Filter */}
                <Select value={selectedStatus} onValueChange={setSelectedStatus}>
                  <SelectTrigger className="w-[120px]">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="rent">Rent</SelectItem>
                    <SelectItem value="sale">Buy</SelectItem>
                  </SelectContent>
                </Select>

                {/* Rooms Filter */}
                <Select value={selectedRooms} onValueChange={setSelectedRooms}>
                  <SelectTrigger className="w-[140px]">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    {roomOptions.map((room) => (
                      <SelectItem key={room} value={room}>
                        {room} {room === '10+' ? 'rooms' : 'rooms'}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>

                {/* Property Type Filter */}
                <Select value={selectedType} onValueChange={setSelectedType}>
                  <SelectTrigger className="w-[150px]">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="apartment">Appartement</SelectItem>
                    <SelectItem value="house">Maison</SelectItem>
                    <SelectItem value="villa">Villa</SelectItem>
                    <SelectItem value="loft">Loft</SelectItem>
                    <SelectItem value="penthouse">Penthouse</SelectItem>
                    <SelectItem value="studio">Studio</SelectItem>
                    <SelectItem value="duplex">Duplex</SelectItem>
                    <SelectItem value="chalet">Chalet</SelectItem>
                    <SelectItem value="castle">Château</SelectItem>
                  </SelectContent>
                </Select>

                <Button 
                  variant="outline" 
                  onClick={() => setShowFilters(!showFilters)}
                  className="flex items-center space-x-2"
                >
                  <Filter className="h-4 w-4" />
                  <span>{t('properties.filters.more')}</span>
                </Button>
              </div>
            </motion.div>
          </div>

          {/* Advanced Filters */}
          {showFilters && (
            <motion.div 
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              className="mt-6 p-6 bg-muted/20 rounded-2xl border border-border"
            >
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                {/* Price Range */}
                <div className="space-y-2">
                  <label className="text-sm font-medium">Prix (CHF)</label>
                  <div className="flex space-x-2">
                    <Input
                      placeholder="Min"
                      value={priceRange.min}
                      onChange={(e) => setPriceRange(prev => ({ ...prev, min: e.target.value }))}
                      type="number"
                    />
                    <Input
                      placeholder="Max"
                      value={priceRange.max}
                      onChange={(e) => setPriceRange(prev => ({ ...prev, max: e.target.value }))}
                      type="number"
                    />
                  </div>
                </div>

                {/* Surface Range */}
                <div className="space-y-2">
                  <label className="text-sm font-medium">Surface (m²)</label>
                  <div className="flex space-x-2">
                    <Input
                      placeholder="Min"
                      value={surfaceRange.min}
                      onChange={(e) => setSurfaceRange(prev => ({ ...prev, min: e.target.value }))}
                      type="number"
                    />
                    <Input
                      placeholder="Max"
                      value={surfaceRange.max}
                      onChange={(e) => setSurfaceRange(prev => ({ ...prev, max: e.target.value }))}
                      type="number"
                    />
                  </div>
                </div>

                {/* Features */}
                <div className="space-y-2">
                  <label className="text-sm font-medium">Caractéristiques</label>
                  <div className="max-h-32 overflow-y-auto space-y-2">
                    {allFeatures.slice(0, 8).map((feature) => (
                      <label key={feature} className="flex items-center space-x-2 text-sm">
                        <input
                          type="checkbox"
                          checked={selectedFeatures.includes(feature)}
                          onChange={(e) => {
                            if (e.target.checked) {
                              setSelectedFeatures(prev => [...prev, feature]);
                            } else {
                              setSelectedFeatures(prev => prev.filter(f => f !== feature));
                            }
                          }}
                          className="rounded"
                        />
                        <span>{feature}</span>
                      </label>
                    ))}
                  </div>
                </div>

                {/* Clear Filters */}
                <div className="space-y-2">
                  <label className="text-sm font-medium">Actions</label>
                  <Button
                    variant="outline"
                    onClick={() => {
                      setPriceRange({ min: '', max: '' });
                      setSurfaceRange({ min: '', max: '' });
                      setSelectedFeatures([]);
                      setSelectedType('apartment');
                    }}
                    className="w-full"
                  >
                    Effacer les filtres
                  </Button>
                </div>
              </div>
            </motion.div>
          )}
        </motion.div>

        {/* Results Header */}
        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.4 }}
          className="flex items-center justify-between mb-8"
        >
          <div>
            <p className="text-lg text-foreground font-semibold">
              {filteredProperties.length} {t('properties.results')}
            </p>
            <p className="text-muted-foreground">
              {t('language') === 'fr' ? 'Propriétés exclusives disponibles' : 'Exclusive properties available'}
            </p>
          </div>
          <Select defaultValue="newest">
            <SelectTrigger className="w-[200px]">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="newest">{t('language') === 'fr' ? 'Plus récent' : 'Newest'}</SelectItem>
              <SelectItem value="price-low">{t('language') === 'fr' ? 'Prix croissant' : 'Price: Low to High'}</SelectItem>
              <SelectItem value="price-high">{t('language') === 'fr' ? 'Prix décroissant' : 'Price: High to Low'}</SelectItem>
            </SelectContent>
          </Select>
        </motion.div>

        {/* Property Grid/List */}
        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5 }}
          className="space-y-6"
        >
          {viewMode === 'grid' ? (
            <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-8">
              {filteredProperties.map((property, index) => (
                <motion.div
                  key={property.id}
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                >
                  <PropertyCard 
                    property={property}
                    showContactInfo={isAuthenticated}
                  />
                </motion.div>
              ))}
            </div>
          ) : (
            <div className="space-y-6">
              {filteredProperties.map((property, index) => (
                <motion.div
                  key={property.id}
                  initial={{ opacity: 0, x: -30 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: index * 0.1 }}
                >
                  <PropertyListCard 
                    property={property}
                    showContactInfo={isAuthenticated}
                  />
                </motion.div>
              ))}
            </div>
          )}

          {/* Empty State */}
          {filteredProperties.length === 0 && (
            <motion.div 
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              className="text-center py-24"
            >
              <div className="max-w-md mx-auto space-y-4">
                <div className="w-24 h-24 bg-muted rounded-full flex items-center justify-center mx-auto">
                  <Search className="h-12 w-12 text-muted-foreground" />
                </div>
                <h3 className="text-xl font-heading font-semibold text-foreground">
                  {t('properties.noResults')}
                </h3>
                <p className="text-muted-foreground">
                  {t('language') === 'fr' 
                    ? 'Essayez d\'ajuster vos filtres ou votre recherche' 
                    : 'Try adjusting your filters or search terms'
                  }
                </p>
                <Button 
                  variant="outline" 
                  onClick={() => {
                    setSearchTerm('all');
                    setSelectedRooms('3.5');
                    setSelectedStatus('rent');
                    setSelectedType('apartment');
                    setPriceRange({ min: '', max: '' });
                    setSurfaceRange({ min: '', max: '' });
                    setSelectedFeatures([]);
                  }}
                >
                  {t('properties.clearFilters')}
                </Button>
              </div>
            </motion.div>
          )}
        </motion.div>
      </div>
    </div>
  );
};