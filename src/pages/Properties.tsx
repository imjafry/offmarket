import React, { useState, useMemo } from 'react';
import { Search, Filter } from 'lucide-react';
import { useTranslation } from '@/hooks/useTranslation';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { PropertyCard, Property } from '@/components/PropertyCard';
import { mockProperties } from '@/data/mockProperties';

export const PropertiesPage: React.FC = () => {
  const { t } = useTranslation();
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState<string>('all');
  const [roomsFilter, setRoomsFilter] = useState<string>('all');
  
  // Mock authentication state - in real app, this would come from auth context
  const isAuthenticated = false;

  const filteredProperties = useMemo(() => {
    return mockProperties.filter(property => {
      const matchesSearch = property.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                          property.city.toLowerCase().includes(searchTerm.toLowerCase()) ||
                          property.neighborhood.toLowerCase().includes(searchTerm.toLowerCase());
      
      const matchesStatus = statusFilter === 'all' || property.status === statusFilter;
      
      const matchesRooms = roomsFilter === 'all' || 
                          (roomsFilter === '3-' && property.rooms <= 3) ||
                          (roomsFilter === '4-5' && property.rooms >= 4 && property.rooms <= 5) ||
                          (roomsFilter === '6+' && property.rooms >= 6);
      
      return matchesSearch && matchesStatus && matchesRooms;
    });
  }, [searchTerm, statusFilter, roomsFilter]);

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <section className="section-padding">
        <div className="container-custom">
          <div className="text-center space-y-4 mb-12">
            <h1 className="text-3xl md:text-4xl font-heading font-bold text-foreground">
              {t('properties.title')}
            </h1>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              {t('language') === 'fr' 
                ? 'Découvrez notre collection de propriétés exclusives hors-marché'
                : 'Discover our collection of exclusive off-market properties'
              }
            </p>
          </div>

          {/* Search and Filters */}
          <div className="bg-card border border-border rounded-lg p-6 mb-8">
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
              {/* Search Input */}
              <div className="md:col-span-2 relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <Input
                  placeholder={t('properties.search.placeholder')}
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10"
                />
              </div>

              {/* Status Filter */}
              <Select value={statusFilter} onValueChange={setStatusFilter}>
                <SelectTrigger>
                  <SelectValue placeholder={t('properties.filters.status')} />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">
                    {t('language') === 'fr' ? 'Tous les statuts' : 'All Status'}
                  </SelectItem>
                  <SelectItem value="available">{t('properties.status.available')}</SelectItem>
                  <SelectItem value="rented">{t('properties.status.rented')}</SelectItem>
                  <SelectItem value="sold">{t('properties.status.sold')}</SelectItem>
                </SelectContent>
              </Select>

              {/* Rooms Filter */}
              <Select value={roomsFilter} onValueChange={setRoomsFilter}>
                <SelectTrigger>
                  <SelectValue placeholder={t('properties.filters.rooms')} />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">
                    {t('language') === 'fr' ? 'Toutes les pièces' : 'All Rooms'}
                  </SelectItem>
                  <SelectItem value="3-">≤ 3 {t('properties.rooms')}</SelectItem>
                  <SelectItem value="4-5">4-5 {t('properties.rooms')}</SelectItem>
                  <SelectItem value="6+">6+ {t('properties.rooms')}</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          {/* Results Count */}
          <div className="flex items-center justify-between mb-6">
            <p className="text-sm text-muted-foreground">
              {filteredProperties.length} {t('language') === 'fr' ? 'propriétés trouvées' : 'properties found'}
            </p>
            {!isAuthenticated && (
              <div className="text-xs text-muted-foreground bg-muted px-3 py-2 rounded-md">
                {t('auth.loginRequired')}
              </div>
            )}
          </div>

          {/* Property Grid */}
          {filteredProperties.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredProperties.map((property) => (
                <PropertyCard 
                  key={property.id} 
                  property={property}
                  showContactInfo={isAuthenticated}
                />
              ))}
            </div>
          ) : (
            <div className="text-center py-12">
              <p className="text-lg text-muted-foreground">
                {t('language') === 'fr' 
                  ? 'Aucune propriété ne correspond à vos critères'
                  : 'No properties match your criteria'
                }
              </p>
              <Button 
                variant="outline" 
                onClick={() => {
                  setSearchTerm('');
                  setStatusFilter('all');
                  setRoomsFilter('all');
                }}
                className="mt-4"
              >
                {t('language') === 'fr' ? 'Réinitialiser les filtres' : 'Reset Filters'}
              </Button>
            </div>
          )}
        </div>
      </section>
    </div>
  );
};