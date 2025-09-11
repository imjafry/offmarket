import React, { useEffect, useMemo, useState } from 'react';
import { Link } from 'react-router-dom';
import { 
  Plus, 
  Search, 
  Filter, 
  MoreHorizontal, 
  Edit, 
  Trash2, 
  Eye, 
  Copy,
  Download,
  Upload,
  Building2,
  MapPin,
  DollarSign,
  Calendar,
  CheckSquare,
  Square
} from 'lucide-react';
import { motion } from 'framer-motion';
import { useTranslation } from '@/hooks/useTranslation';
import { useProperties } from '@/contexts/PropertyContext';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Checkbox } from '@/components/ui/checkbox';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuSeparator, DropdownMenuTrigger } from '@/components/ui/dropdown-menu';
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle, AlertDialogTrigger } from '@/components/ui/alert-dialog';
import { AdminLayout } from '@/components/admin/AdminLayout';

export const PropertyManagement: React.FC = () => {
  const { t } = useTranslation();
  const { properties: allProperties, deleteProperty } = useProperties();
  const [searchInput, setSearchInput] = useState('');
  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const [cityFilter, setCityFilter] = useState('all');
  const [selectedProperties, setSelectedProperties] = useState<string[]>([]);
  const [showFilters, setShowFilters] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize, setPageSize] = useState(10);
  const [sortKey, setSortKey] = useState<'title' | 'status' | 'price' | 'views' | 'inquiries' | 'createdAt'>('createdAt');
  const [sortDir, setSortDir] = useState<'asc' | 'desc'>('desc');
  const [showBulkDeleteDialog, setShowBulkDeleteDialog] = useState(false);

  // Debounce search input
  useEffect(() => {
    const id = setTimeout(() => setSearchQuery(searchInput), 300);
    return () => clearTimeout(id);
  }, [searchInput]);

  // Properties with additional fields for admin
  const properties = allProperties.map(prop => ({
    ...prop,
    views: Math.floor(Math.random() * 100),
    inquiries: Math.floor(Math.random() * 20),
    createdAt: '2024-01-15',
    updatedAt: '2024-01-20',
    featured: Math.random() > 0.7
  }));

  const filteredProperties = properties.filter(property => {
    const matchesSearch = property.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         property.city.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesStatus = statusFilter === 'all' || property.status === statusFilter;
    const matchesCity = cityFilter === 'all' || property.city.toLowerCase().includes(cityFilter.toLowerCase());
    
    return matchesSearch && matchesStatus && matchesCity;
  });

  const sortedProperties = useMemo(() => {
    const arr = [...filteredProperties];
    arr.sort((a: any, b: any) => {
      const aVal = (a as any)[sortKey] ?? '';
      const bVal = (b as any)[sortKey] ?? '';
      if (typeof aVal === 'number' && typeof bVal === 'number') {
        return sortDir === 'asc' ? aVal - bVal : bVal - aVal;
      }
      return sortDir === 'asc' ? String(aVal).localeCompare(String(bVal)) : String(bVal).localeCompare(String(aVal));
    });
    return arr;
  }, [filteredProperties, sortKey, sortDir]);

  const totalPages = Math.max(1, Math.ceil(sortedProperties.length / pageSize));
  const paginatedProperties = useMemo(() => {
    const start = (currentPage - 1) * pageSize;
    return sortedProperties.slice(start, start + pageSize);
  }, [sortedProperties, currentPage, pageSize]);

  useEffect(() => {
    // Reset to first page when filters/search change
    setCurrentPage(1);
  }, [searchQuery, statusFilter, cityFilter, pageSize]);

  const handleSelectAll = () => {
    if (selectedProperties.length === filteredProperties.length) {
      setSelectedProperties([]);
    } else {
      setSelectedProperties(filteredProperties.map(p => p.id));
    }
  };

  const handleSelectProperty = (propertyId: string) => {
    setSelectedProperties(prev => 
      prev.includes(propertyId) 
        ? prev.filter(id => id !== propertyId)
        : [...prev, propertyId]
    );
  };

  const handleBulkAction = (action: string) => {
    if (action === 'delete') {
      setShowBulkDeleteDialog(true);
      return;
    }
    console.log(`Bulk action: ${action} on properties:`, selectedProperties);
  };

  const confirmBulkDelete = () => {
    selectedProperties.forEach(id => deleteProperty(id));
    setSelectedProperties([]);
    setShowBulkDeleteDialog(false);
  };

  const exportCSV = () => {
    const header = ['id','title','status','price','city','neighborhood','views','inquiries','createdAt'];
    const rows = filteredProperties.map(p => [p.id, p.title, p.status, p.price, p.city, p.neighborhood, String((p as any).views ?? ''), String((p as any).inquiries ?? ''), (p as any).createdAt ?? '']);
    const csv = [header, ...rows].map(r => r.map(v => `"${String(v ?? '').replace(/"/g,'""')}"`).join(',')).join('\n');
    const blob = new Blob([csv], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'properties.csv';
    a.click();
    URL.revokeObjectURL(url);
  };

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'available':
        return <Badge className="bg-green-100 text-green-800">Available</Badge>;
      case 'sold':
        return <Badge className="bg-red-100 text-red-800">Sold</Badge>;
      case 'rented':
        return <Badge className="bg-orange-100 text-orange-800">Rented</Badge>;
      default:
        return <Badge variant="secondary">{status}</Badge>;
    }
  };

  return (
    <AdminLayout>
      <div className="space-y-6">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">
              {t('admin.properties.title')}
            </h1>
            <p className="text-gray-600">
              {t('language') === 'fr' 
                ? 'Gérez toutes vos propriétés exclusives'
                : 'Manage all your exclusive properties'
              }
            </p>
          </div>
          <div className="flex space-x-3">
            <Button variant="outline" onClick={exportCSV}>
              <Download className="h-4 w-4 mr-2" />
              {t('language') === 'fr' ? 'Exporter' : 'Export'}
            </Button>
            <Button variant="outline">
              <Upload className="h-4 w-4 mr-2" />
              {t('language') === 'fr' ? 'Importer' : 'Import'}
            </Button>
            <Link to="/admin/properties/new">
              <Button className="bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700">
                <Plus className="h-4 w-4 mr-2" />
                {t('admin.properties.add')}
              </Button>
            </Link>
          </div>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <Card>
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">Total Properties</p>
                  <p className="text-2xl font-bold text-gray-900">{properties.length}</p>
                </div>
                <Building2 className="h-8 w-8 text-blue-600" />
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">Available</p>
                  <p className="text-2xl font-bold text-green-600">
                    {properties.filter(p => p.status === 'available').length}
                  </p>
                </div>
                <CheckSquare className="h-8 w-8 text-green-600" />
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">Total Views</p>
                  <p className="text-2xl font-bold text-purple-600">
                    {properties.reduce((sum, p) => sum + p.views, 0)}
                  </p>
                </div>
                <Eye className="h-8 w-8 text-purple-600" />
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">Inquiries</p>
                  <p className="text-2xl font-bold text-orange-600">
                    {properties.reduce((sum, p) => sum + p.inquiries, 0)}
                  </p>
                </div>
                <DollarSign className="h-8 w-8 text-orange-600" />
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Filters and Search */}
        <Card>
          <CardContent className="p-6">
            <div className="flex flex-col lg:flex-row gap-4">
              {/* Search */}
              <div className="flex-1">
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                  <Input
                    placeholder={t('language') === 'fr' ? 'Rechercher des propriétés...' : 'Search properties...'}
                    value={searchInput}
                    onChange={(e) => setSearchInput(e.target.value)}
                    className="pl-10"
                  />
                </div>
              </div>

              {/* Filters */}
              <div className="flex gap-4">
                <Select value={statusFilter} onValueChange={setStatusFilter}>
                  <SelectTrigger className="w-40">
                    <SelectValue placeholder="Status" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Status</SelectItem>
                    <SelectItem value="available">Available</SelectItem>
                    <SelectItem value="sold">Sold</SelectItem>
                    <SelectItem value="rented">Rented</SelectItem>
                  </SelectContent>
                </Select>

                <Select value={cityFilter} onValueChange={setCityFilter}>
                  <SelectTrigger className="w-40">
                    <SelectValue placeholder="City" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Cities</SelectItem>
                    <SelectItem value="lausanne">Lausanne</SelectItem>
                    <SelectItem value="geneve">Genève</SelectItem>
                    <SelectItem value="montreux">Montreux</SelectItem>
                  </SelectContent>
                </Select>

                <Button
                  variant="outline"
                  onClick={() => setShowFilters(!showFilters)}
                >
                  <Filter className="h-4 w-4 mr-2" />
                  {t('language') === 'fr' ? 'Filtres' : 'Filters'}
                </Button>
              </div>
            </div>

            {/* Bulk Actions */}
            {selectedProperties.length > 0 && (
              <motion.div
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                className="mt-4 p-4 bg-blue-50 rounded-lg border border-blue-200"
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-2">
                    <span className="text-sm font-medium text-blue-900">
                      {selectedProperties.length} {t('language') === 'fr' ? 'propriétés sélectionnées' : 'properties selected'}
                    </span>
                  </div>
                  <div className="flex space-x-2">
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => handleBulkAction('feature')}
                    >
                      {t('language') === 'fr' ? 'Mettre en vedette' : 'Feature'}
                    </Button>
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => handleBulkAction('delete')}
                    >
                      <Trash2 className="h-4 w-4 mr-1" />
                      {t('language') === 'fr' ? 'Supprimer' : 'Delete'}
                    </Button>
                  </div>
                </div>
              </motion.div>
            )}
          </CardContent>
        </Card>

        {/* Properties Table */}
        <Card>
          <CardHeader>
            <CardTitle>
              {t('language') === 'fr' ? 'Liste des propriétés' : 'Properties List'}
            </CardTitle>
            <CardDescription>
              {filteredProperties.length} {t('language') === 'fr' ? 'propriétés trouvées' : 'properties found'}
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b">
                    <th className="text-left p-4">
                      <Checkbox
                        checked={selectedProperties.length === filteredProperties.length && filteredProperties.length > 0}
                        onCheckedChange={handleSelectAll}
                      />
                    </th>
                    <th className="text-left p-4 font-medium cursor-pointer" onClick={() => { setSortKey('title'); setSortDir(prev => sortKey === 'title' ? (prev === 'asc' ? 'desc' : 'asc') : 'asc'); }}>Property</th>
                    <th className="text-left p-4 font-medium cursor-pointer" onClick={() => { setSortKey('status'); setSortDir(prev => sortKey === 'status' ? (prev === 'asc' ? 'desc' : 'asc') : 'asc'); }}>Status</th>
                    <th className="text-left p-4 font-medium cursor-pointer" onClick={() => { setSortKey('price'); setSortDir(prev => sortKey === 'price' ? (prev === 'asc' ? 'desc' : 'asc') : 'asc'); }}>Price</th>
                    <th className="text-left p-4 font-medium cursor-pointer" onClick={() => { setSortKey('views'); setSortDir(prev => sortKey === 'views' ? (prev === 'asc' ? 'desc' : 'asc') : 'asc'); }}>Views</th>
                    <th className="text-left p-4 font-medium cursor-pointer" onClick={() => { setSortKey('inquiries'); setSortDir(prev => sortKey === 'inquiries' ? (prev === 'asc' ? 'desc' : 'asc') : 'asc'); }}>Inquiries</th>
                    <th className="text-left p-4 font-medium cursor-pointer" onClick={() => { setSortKey('createdAt'); setSortDir(prev => sortKey === 'createdAt' ? (prev === 'asc' ? 'desc' : 'asc') : 'asc'); }}>Created</th>
                    <th className="text-left p-4 font-medium">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {paginatedProperties.map((property) => (
                    <motion.tr
                      key={property.id}
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      className="border-b hover:bg-gray-50"
                    >
                      <td className="p-4">
                        <Checkbox
                          checked={selectedProperties.includes(property.id)}
                          onCheckedChange={() => handleSelectProperty(property.id)}
                        />
                      </td>
                      <td className="p-4">
                        <div className="flex items-center space-x-3">
                          <div className="w-12 h-12 bg-gray-200 rounded-lg flex items-center justify-center">
                            <Building2 className="h-6 w-6 text-gray-400" />
                          </div>
                          <div className="min-w-0 flex-1">
                            <p className="text-sm font-medium text-gray-900 truncate">
                              {property.title}
                            </p>
                            <div className="flex items-center text-sm text-gray-500">
                              <MapPin className="h-3 w-3 mr-1" />
                              {property.city}, {property.neighborhood}
                            </div>
                            {property.featured && (
                              <Badge className="mt-1 text-xs">Featured</Badge>
                            )}
                          </div>
                        </div>
                      </td>
                      <td className="p-4">
                        {getStatusBadge(property.status)}
                      </td>
                      <td className="p-4">
                        <span className="text-sm font-medium text-gray-900">
                          {property.price}
                        </span>
                      </td>
                      <td className="p-4">
                        <div className="flex items-center text-sm text-gray-600">
                          <Eye className="h-4 w-4 mr-1" />
                          {property.views}
                        </div>
                      </td>
                      <td className="p-4">
                        <span className="text-sm text-gray-600">
                          {property.inquiries}
                        </span>
                      </td>
                      <td className="p-4">
                        <div className="flex items-center text-sm text-gray-500">
                          <Calendar className="h-4 w-4 mr-1" />
                          {property.createdAt}
                        </div>
                      </td>
                      <td className="p-4">
                        <DropdownMenu>
                          <DropdownMenuTrigger asChild>
                            <Button variant="ghost" size="sm">
                              <MoreHorizontal className="h-4 w-4" />
                            </Button>
                          </DropdownMenuTrigger>
                          <DropdownMenuContent align="end">
                            <DropdownMenuItem asChild>
                              <Link to={`/admin/properties/${property.id}`} className="flex items-center">
                                <Eye className="h-4 w-4 mr-2" />
                                {t('language') === 'fr' ? 'Voir' : 'View'}
                              </Link>
                            </DropdownMenuItem>
                            <DropdownMenuItem asChild>
                              <Link to={`/admin/properties/${property.id}/edit`} className="flex items-center">
                                <Edit className="h-4 w-4 mr-2" />
                                {t('language') === 'fr' ? 'Modifier' : 'Edit'}
                              </Link>
                            </DropdownMenuItem>
                            <DropdownMenuItem>
                              <Copy className="h-4 w-4 mr-2" />
                              {t('language') === 'fr' ? 'Dupliquer' : 'Duplicate'}
                            </DropdownMenuItem>
                            <DropdownMenuSeparator />
                            <DropdownMenuItem className="text-red-600">
                              <Trash2 className="h-4 w-4 mr-2" />
                              {t('language') === 'fr' ? 'Supprimer' : 'Delete'}
                            </DropdownMenuItem>
                          </DropdownMenuContent>
                        </DropdownMenu>
                      </td>
                    </motion.tr>
                  ))}
                </tbody>
              </table>
            </div>

            {/* Pagination */}
            <div className="flex items-center justify-between mt-6">
              <div className="text-sm text-gray-500">
                {t('language') === 'fr' 
                  ? `Affichage de ${(currentPage - 1) * pageSize + 1} à ${Math.min(currentPage * pageSize, sortedProperties.length)} sur ${sortedProperties.length} résultats`
                  : `Showing ${(currentPage - 1) * pageSize + 1} to ${Math.min(currentPage * pageSize, sortedProperties.length)} of ${sortedProperties.length} results`
                }
              </div>
              <div className="flex items-center space-x-3">
                <span className="text-sm text-gray-500">{t('language') === 'fr' ? `Page ${currentPage} sur ${totalPages}` : `Page ${currentPage} of ${totalPages}`}</span>
                <Select value={String(pageSize)} onValueChange={(v) => setPageSize(parseInt(v))}>
                  <SelectTrigger className="w-24">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="10">10 / page</SelectItem>
                    <SelectItem value="20">20 / page</SelectItem>
                    <SelectItem value="50">50 / page</SelectItem>
                  </SelectContent>
                </Select>
                <div className="flex space-x-2">
                  <Button variant="outline" size="sm" disabled={currentPage === 1} onClick={() => setCurrentPage(p => Math.max(1, p - 1))}>
                    {t('language') === 'fr' ? 'Précédent' : 'Previous'}
                  </Button>
                  <Button variant="outline" size="sm" disabled={currentPage === totalPages} onClick={() => setCurrentPage(p => Math.min(totalPages, p + 1))}>
                    {t('language') === 'fr' ? 'Suivant' : 'Next'}
                  </Button>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
        {/* Bulk Delete Confirmation */}
        <AlertDialog open={showBulkDeleteDialog} onOpenChange={setShowBulkDeleteDialog}>
          <AlertDialogContent>
            <AlertDialogHeader>
              <AlertDialogTitle>{t('language') === 'fr' ? 'Supprimer les propriétés sélectionnées ?' : 'Delete selected properties?'}</AlertDialogTitle>
              <AlertDialogDescription>
                {t('language') === 'fr' ? 'Cette action est irréversible.' : 'This action cannot be undone.'}
              </AlertDialogDescription>
            </AlertDialogHeader>
            <AlertDialogFooter>
              <AlertDialogCancel>{t('language') === 'fr' ? 'Annuler' : 'Cancel'}</AlertDialogCancel>
              <AlertDialogAction onClick={confirmBulkDelete}>{t('language') === 'fr' ? 'Supprimer' : 'Delete'}</AlertDialogAction>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialog>

      </div>
    </AdminLayout>
  );
};
