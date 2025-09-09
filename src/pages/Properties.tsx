import React, { useState } from 'react';
import { Search, SlidersHorizontal, Grid3X3, List, Filter } from 'lucide-react';
import { motion } from 'framer-motion';
import { useTranslation } from '@/hooks/useTranslation';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { PropertyCard } from '@/components/PropertyCard';
import { PropertyListCard } from '@/components/PropertyListCard';
import { mockProperties } from '@/data/mockProperties';

export const PropertiesPage: React.FC = () => {
  const { t } = useTranslation();
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCity, setSelectedCity] = useState('');
  const [selectedRooms, setSelectedRooms] = useState('');
  const [selectedStatus, setSelectedStatus] = useState('');
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
  const [showFilters, setShowFilters] = useState(false);

  // Mock authentication state - in real app this would come from auth context
  const isAuthenticated = false;

  // Filter properties based on search criteria
  const filteredProperties = mockProperties.filter(property => {
    const matchesSearch = property.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         property.city.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         property.neighborhood.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesCity = !selectedCity || property.city.toLowerCase().includes(selectedCity.toLowerCase());
    const matchesRooms = !selectedRooms || 
                        (selectedRooms === '1-2' && property.rooms <= 2) ||
                        (selectedRooms === '3-4' && property.rooms >= 3 && property.rooms <= 4) ||
                        (selectedRooms === '5+' && property.rooms >= 5);
    const matchesStatus = !selectedStatus || property.status === selectedStatus;
    
    return matchesSearch && matchesCity && matchesRooms && matchesStatus;
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
              <Search className="absolute left-6 top-1/2 transform -translate-y-1/2 h-6 w-6 text-muted-foreground" />
              <Input
                placeholder={t('properties.search.placeholder')}
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-16 py-8 text-lg rounded-2xl border-2 shadow-lg focus:shadow-2xl transition-all"
              />
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
                <Select value={selectedCity} onValueChange={setSelectedCity}>
                  <SelectTrigger className="w-[150px]">
                    <SelectValue placeholder={t('properties.filters.city')} />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="">{t('properties.filters.allCities')}</SelectItem>
                    <SelectItem value="lausanne">Lausanne</SelectItem>
                    <SelectItem value="geneve">Genève</SelectItem>
                    <SelectItem value="montreux">Montreux</SelectItem>
                  </SelectContent>
                </Select>

                <Select value={selectedRooms} onValueChange={setSelectedRooms}>
                  <SelectTrigger className="w-[150px]">
                    <SelectValue placeholder={t('properties.filters.rooms')} />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="">{t('properties.filters.allRooms')}</SelectItem>
                    <SelectItem value="1-2">1-2 {t('properties.rooms')}</SelectItem>
                    <SelectItem value="3-4">3-4 {t('properties.rooms')}</SelectItem>
                    <SelectItem value="5+">5+ {t('properties.rooms')}</SelectItem>
                  </SelectContent>
                </Select>

                <Select value={selectedStatus} onValueChange={setSelectedStatus}>
                  <SelectTrigger className="w-[150px]">
                    <SelectValue placeholder={t('properties.filters.status')} />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="">{t('properties.filters.allStatus')}</SelectItem>
                    <SelectItem value="available">{t('properties.status.available')}</SelectItem>
                    <SelectItem value="rented">{t('properties.status.rented')}</SelectItem>
                    <SelectItem value="sold">{t('properties.status.sold')}</SelectItem>
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
                    setSearchTerm('');
                    setSelectedCity('');
                    setSelectedRooms('');
                    setSelectedStatus('');
                  }}
                >
                  {t('properties.clearFilters')}
                </Button>
              </div>
            </motion.div>
          )}
        </div>
      </div>
    </div>
  );
};