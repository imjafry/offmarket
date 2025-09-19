import React, { useState, useRef, useEffect } from 'react';
import { Search, SlidersHorizontal, Grid3X3, List, Filter, ChevronDown } from 'lucide-react';
import { motion } from 'framer-motion';
import { useTranslation } from '@/hooks/useTranslation';
import { useAuth } from '@/contexts/AuthContext';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { PropertyCard } from '@/components/PropertyCard';
import { PropertyListCard } from '@/components/PropertyListCard';
import { swissCities, filterCities } from '@/data/swissCities';
import { supabase } from '@/lib/supabaseClient';

export const PropertiesPage: React.FC = () => {
  const { t } = useTranslation();
  const { isAuthenticated } = useAuth();
  const [properties, setProperties] = useState<any[]>([]);
  const [totalCount, setTotalCount] = useState(0);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedRooms, setSelectedRooms] = useState('');
  const [selectedType, setSelectedType] = useState('');
  const [selectedStatus, setSelectedStatus] = useState('');
  const [priceRange, setPriceRange] = useState({ min: '', max: '' });
  const [surfaceRange, setSurfaceRange] = useState({ min: '', max: '' });
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
  const [showFilters, setShowFilters] = useState(false);
  const [showSuggestions, setShowSuggestions] = useState(false);
  const [page, setPage] = useState(1);
  const [pageSize, setPageSize] = useState(12);

  // Generate room options
  const roomOptions = [] as string[];
  for (let i = 1; i <= 10; i += 0.5) {
    roomOptions.push(i.toString());
  }
  roomOptions.push('10+');

  // Generate search suggestions
  const searchSuggestions = [
    'All locations',
    ...swissCities,
    'Appartement', 'Maison', 'Villa', 'Loft', 'Penthouse', 'Studio', 'Duplex', 'Chalet', 'Château'
  ];

  // Filter suggestions based on current search term
  const filteredSuggestions = searchTerm 
    ? searchSuggestions.filter(suggestion => 
        suggestion.toLowerCase().includes(searchTerm.toLowerCase())
      )
    : searchSuggestions;

  // Server-side fetch
  useEffect(() => {
    const fetchProps = async () => {
      setLoading(true);
      setError('');
      try {
        let query = supabase
          .from('properties')
          .select('*', { count: 'exact' })
          .order('created_at', { ascending: false });

        const term = searchTerm && searchTerm !== 'all' ? `%${searchTerm.toLowerCase()}%` : '';
        if (term) {
          query = query.or(
            `title.ilike.${term},city.ilike.${term},neighborhood.ilike.${term},property_type.ilike.${term}`
          );
        }
        if (selectedRooms) {
          if (selectedRooms === '10+') query = query.gte('rooms', 10);
          else query = query.eq('rooms', parseFloat(selectedRooms));
        }
        if (selectedType) {
          query = query.eq('property_type', selectedType);
        }
        if (selectedStatus) {
          query = query.eq('listing_type', selectedStatus);
        }
        if (surfaceRange.min) query = query.gte('surface', parseFloat(surfaceRange.min));
        if (surfaceRange.max) query = query.lte('surface', parseFloat(surfaceRange.max));
        // Note: price is a text field; skipping server numeric filtering for price

        const from = (page - 1) * pageSize;
        const to = from + pageSize - 1;
        const { data, error, count } = await query.range(from, to);
        if (error) throw error;
        setProperties(data || []);
        setTotalCount(count || 0);
      } catch (e: any) {
        setError(e?.message || 'Failed to load properties');
        setProperties([]);
        setTotalCount(0);
      } finally {
        setLoading(false);
      }
    };
    fetchProps();
  }, [searchTerm, selectedRooms, selectedType, selectedStatus, surfaceRange.min, surfaceRange.max, page, pageSize]);

  const totalPages = Math.max(1, Math.ceil(totalCount / pageSize));

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
              <Input
                type="text"
                value={searchTerm}
                onChange={(e) => {
                  setSearchTerm(e.target.value.toLowerCase());
                  setShowSuggestions(true);
                  setPage(1);
                }}
                onFocus={() => setShowSuggestions(true)}
                onBlur={() => setTimeout(() => setShowSuggestions(false), 200)}
                placeholder="Search by city, neighbourhood or type..."
                className="pl-16 py-8 text-lg rounded-2xl border-2 shadow-lg focus:shadow-2xl transition-all"
              />
              
              {/* Search Suggestions Dropdown */}
              {showSuggestions && filteredSuggestions.length > 0 && (
                <div className="absolute top-full left-0 right-0 mt-2 bg-background border border-border rounded-2xl shadow-xl z-50 max-h-60 overflow-y-auto">
                  {filteredSuggestions.slice(0, 10).map((suggestion, index) => (
                    <button
                      key={index}
                      onClick={() => {
                        setSearchTerm(suggestion === 'All locations' ? 'all' : suggestion.toLowerCase());
                        setShowSuggestions(false);
                        setPage(1);
                      }}
                      className="w-full px-6 py-4 text-left hover:bg-muted/50 transition-colors first:rounded-t-2xl last:rounded-b-2xl"
                    >
                      <span className="text-lg">{suggestion}</span>
                    </button>
                  ))}
                </div>
              )}
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
                <Select value={selectedStatus} onValueChange={(v) => { setSelectedStatus(v); setPage(1); }}>
                  <SelectTrigger className="w-[120px]">
                    <SelectValue placeholder="Status" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="rent">Rent</SelectItem>
                    <SelectItem value="sale">Buy</SelectItem>
                  </SelectContent>
                </Select>

                {/* Rooms Filter */}
                <Select value={selectedRooms} onValueChange={(v) => { setSelectedRooms(v); setPage(1); }}>
                  <SelectTrigger className="w-[140px]">
                    <SelectValue placeholder="Rooms" />
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
                <Select value={selectedType} onValueChange={(v) => { setSelectedType(v); setPage(1); }}>
                  <SelectTrigger className="w-[150px]">
                    <SelectValue placeholder="Type" />
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
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {/* Price Range (text field in DB; left as client hint only) */}
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
                      onChange={(e) => { setSurfaceRange(prev => ({ ...prev, min: e.target.value })); setPage(1); }}
                      type="number"
                    />
                    <Input
                      placeholder="Max"
                      value={surfaceRange.max}
                      onChange={(e) => { setSurfaceRange(prev => ({ ...prev, max: e.target.value })); setPage(1); }}
                      type="number"
                    />
                  </div>
                </div>

                {/* Clear Filters */}
                <div className="space-y-2">
                  <label className="text-sm font-medium">Actions</label>
                  <Button
                    variant="outline"
                    onClick={() => {
                      setSearchTerm('');
                      setSelectedRooms('');
                      setSelectedType('');
                      setSelectedStatus('');
                      setPriceRange({ min: '', max: '' });
                      setSurfaceRange({ min: '', max: '' });
                      setPage(1);
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
              {totalCount} {t('properties.results')}
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
          {loading && (
            <div className="text-center text-muted-foreground">{t('common.loading')}</div>
          )}
          {!loading && (viewMode === 'grid' ? (
            <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-8">
              {properties.map((property, index) => (
                <motion.div
                  key={property.id}
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.05 }}
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
              {properties.map((property, index) => (
                <motion.div
                  key={property.id}
                  initial={{ opacity: 0, x: -30 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: index * 0.05 }}
                >
                  <PropertyListCard 
                    property={property}
                    showContactInfo={isAuthenticated}
                  />
                </motion.div>
              ))}
            </div>
          ))}

          {/* Empty State */}
          {!loading && properties.length === 0 && (
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
                    setSelectedRooms('');
                    setSelectedStatus('');
                    setSelectedType('');
                    setPriceRange({ min: '', max: '' });
                    setSurfaceRange({ min: '', max: '' });
                    setPage(1);
                  }}
                >
                  {t('properties.clearFilters')}
                </Button>
              </div>
            </motion.div>
          )}
        </motion.div>

        {/* Pagination */}
        <div className="flex items-center justify-between mt-6">
          <div className="text-sm text-gray-500">
            {t('language') === 'fr' 
              ? `Affichage de ${(page - 1) * pageSize + 1} à ${Math.min(page * pageSize, totalCount)} sur ${totalCount} résultats`
              : `Showing ${(page - 1) * pageSize + 1} to ${Math.min(page * pageSize, totalCount)} of ${totalCount} results`
            }
          </div>
          <div className="flex items-center space-x-3">
            <span className="text-sm text-gray-500">{t('language') === 'fr' ? `Page ${page} sur ${totalPages}` : `Page ${page} of ${totalPages}`}</span>
            <Select value={String(pageSize)} onValueChange={(v) => { setPageSize(parseInt(v)); setPage(1); }}>
              <SelectTrigger className="w-24">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="12">12 / page</SelectItem>
                <SelectItem value="24">24 / page</SelectItem>
                <SelectItem value="48">48 / page</SelectItem>
              </SelectContent>
            </Select>
            <div className="flex space-x-2">
              <Button variant="outline" size="sm" disabled={page === 1} onClick={() => setPage(p => Math.max(1, p - 1))}>
                {t('language') === 'fr' ? 'Précédent' : 'Previous'}
              </Button>
              <Button variant="outline" size="sm" disabled={page === totalPages} onClick={() => setPage(p => Math.min(totalPages, p + 1))}>
                {t('language') === 'fr' ? 'Suivant' : 'Next'}
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};