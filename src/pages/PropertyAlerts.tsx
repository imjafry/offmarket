import React, { useState, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { 
  Bell, 
  Plus, 
  Edit, 
  Trash2, 
  ArrowLeft, 
  Filter, 
  Search, 
  MapPin, 
  DollarSign, 
  Home, 
  Calendar,
  CheckCircle,
  AlertCircle,
  Settings,
  Eye,
  EyeOff
} from 'lucide-react';
import { useTranslation } from '@/hooks/useTranslation';
import { useAuth } from '@/contexts/AuthContext';
import { useAppSelector } from '@/store/hooks';
import { supabase } from '@/lib/supabaseClient';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Badge } from '@/components/ui/badge';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Switch } from '@/components/ui/switch';
import { Separator } from '@/components/ui/separator';

interface PropertyAlert {
  id: string;
  user_id: string;
  transaction_type: 'rent' | 'sale';
  property_type: 'apartment' | 'house' | 'villa' | 'land';
  max_budget?: number;
  min_budget?: number;
  location?: string;
  rooms?: number;
  is_active: boolean;
  created_at: string;
  updated_at: string;
}

const PropertyAlertsPage: React.FC = () => {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const { isAuthenticated } = useAuth();
  const { user: currentUser, isLoading: authLoading } = useAppSelector((state) => state.auth);

  const [alerts, setAlerts] = useState<PropertyAlert[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isCreating, setIsCreating] = useState(false);
  const [isEditing, setIsEditing] = useState<string | null>(null);
  const [error, setError] = useState<string>('');
  const [success, setSuccess] = useState<string>('');
  const [activeTab, setActiveTab] = useState('manage');

  // Form state
  const [formData, setFormData] = useState({
    transaction_type: '' as 'rent' | 'sale' | '',
    property_type: '' as 'apartment' | 'house' | 'villa' | 'land' | '',
    min_budget: '',
    max_budget: '',
    location: '',
    rooms: ''
  });

  useEffect(() => {
    // Wait for auth to load before checking
    if (authLoading) {
      return;
    }

    // Only redirect to login if we're definitely not authenticated
    // Don't redirect during state updates or if we have user data
    if (!isAuthenticated && !currentUser) {
      console.log('PropertyAlerts: Not authenticated, redirecting to login');
      navigate('/login');
      return;
    }

    // Only fetch alerts if we have a valid user
    if (currentUser) {
      console.log('PropertyAlerts: User authenticated, fetching alerts');
      fetchAlerts();
    }
  }, [isAuthenticated, currentUser, authLoading, navigate]);

  // Separate effect to handle auth state changes without causing redirects
  useEffect(() => {
    // Only fetch alerts when we have a user and are not loading
    if (currentUser && !authLoading && !isLoading) {
      fetchAlerts();
    }
  }, [currentUser, authLoading]);

  const fetchAlerts = async () => {
    if (!currentUser) return;
    
    setIsLoading(true);
    setError(''); // Clear any previous errors
    try {
      const { data, error } = await supabase
        .from('property_alerts')
        .select('*')
        .eq('user_id', currentUser.id)
        .order('created_at', { ascending: false });

      if (error) {
        console.error('Error fetching alerts:', error);
        // Don't throw error, just set it in state to prevent logout
        setError(t('language') === 'fr' ? 'Erreur lors du chargement des alertes' : 'Error loading alerts');
        return;
      }
      setAlerts(data || []);
    } catch (err: any) {
      console.error('Error fetching alerts:', err);
      setError(t('language') === 'fr' ? 'Erreur lors du chargement des alertes' : 'Error loading alerts');
    } finally {
      setIsLoading(false);
    }
  };

  const handleCreateAlert = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!currentUser) return;

    setError('');
    setSuccess('');

    if (!formData.transaction_type || !formData.property_type) {
      setError(t('language') === 'fr' ? 'Veuillez sélectionner le type de transaction et le type de bien' : 'Please select transaction type and property type');
      return;
    }

    setIsCreating(true);
    try {
      const payload: any = {
        user_id: currentUser.id,
        transaction_type: formData.transaction_type,
        property_type: formData.property_type,
        is_active: true
      };

      if (formData.min_budget) {
        const minBudget = Number(formData.min_budget.replace(/[^0-9.]/g, ''));
        if (!Number.isFinite(minBudget)) {
          throw new Error(t('language') === 'fr' ? 'Budget minimum invalide' : 'Invalid minimum budget');
        }
        payload.min_budget = minBudget;
      }

      if (formData.max_budget) {
        const maxBudget = Number(formData.max_budget.replace(/[^0-9.]/g, ''));
        if (!Number.isFinite(maxBudget)) {
          throw new Error(t('language') === 'fr' ? 'Budget maximum invalide' : 'Invalid maximum budget');
        }
        payload.max_budget = maxBudget;
      }

      if (formData.location) {
        payload.location = formData.location;
      }

      if (formData.rooms) {
        const rooms = Number(formData.rooms);
        if (!Number.isFinite(rooms) || rooms < 1) {
          throw new Error(t('language') === 'fr' ? 'Nombre de pièces invalide' : 'Invalid number of rooms');
        }
        payload.rooms = rooms;
      }

      const { error: insertError } = await supabase
        .from('property_alerts')
        .insert(payload);

      if (insertError) throw insertError;

      setSuccess(t('language') === 'fr' ? 'Alerte créée avec succès' : 'Alert created successfully');
      setFormData({
        transaction_type: '',
        property_type: '',
        min_budget: '',
        max_budget: '',
        location: '',
        rooms: ''
      });
      fetchAlerts();
    } catch (err: any) {
      console.error('Error creating alert:', err);
      setError(err.message || (t('language') === 'fr' ? 'Erreur lors de la création de l\'alerte' : 'Error creating alert'));
    } finally {
      setIsCreating(false);
    }
  };

  const handleToggleAlert = async (alertId: string, isActive: boolean) => {
    try {
      const { error } = await supabase
        .from('property_alerts')
        .update({ is_active: isActive })
        .eq('id', alertId);

      if (error) throw error;

      setAlerts(prev => prev.map(alert => 
        alert.id === alertId ? { ...alert, is_active: isActive } : alert
      ));
    } catch (err: any) {
      console.error('Error toggling alert:', err);
      setError(t('language') === 'fr' ? 'Erreur lors de la mise à jour de l\'alerte' : 'Error updating alert');
    }
  };

  const handleDeleteAlert = async (alertId: string) => {
    if (!confirm(t('language') === 'fr' ? 'Êtes-vous sûr de vouloir supprimer cette alerte ?' : 'Are you sure you want to delete this alert?')) {
      return;
    }

    try {
      const { error } = await supabase
        .from('property_alerts')
        .delete()
        .eq('id', alertId);

      if (error) throw error;

      setAlerts(prev => prev.filter(alert => alert.id !== alertId));
      setSuccess(t('language') === 'fr' ? 'Alerte supprimée avec succès' : 'Alert deleted successfully');
    } catch (err: any) {
      console.error('Error deleting alert:', err);
      setError(t('language') === 'fr' ? 'Erreur lors de la suppression de l\'alerte' : 'Error deleting alert');
    }
  };

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('fr-CH', {
      style: 'currency',
      currency: 'CHF',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0
    }).format(amount);
  };

  const getPropertyTypeLabel = (type: string) => {
    const labels = {
      apartment: t('language') === 'fr' ? 'Appartement' : 'Apartment',
      house: t('language') === 'fr' ? 'Maison' : 'House',
      villa: t('language') === 'fr' ? 'Villa' : 'Villa',
      land: t('language') === 'fr' ? 'Terrain' : 'Land'
    };
    return labels[type as keyof typeof labels] || type;
  };

  const getTransactionTypeLabel = (type: string) => {
    const labels = {
      rent: t('language') === 'fr' ? 'Location' : 'Rent',
      sale: t('language') === 'fr' ? 'Achat' : 'Purchase'
    };
    return labels[type as keyof typeof labels] || type;
  };

  // Show loading while auth is loading
  if (authLoading) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="text-center">
          <div className="w-8 h-8 border-4 border-primary border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-muted-foreground">{t('language') === 'fr' ? 'Chargement...' : 'Loading...'}</p>
        </div>
      </div>
    );
  }

  if (!isAuthenticated || !currentUser) {
    return null;
  }

  return (
    <div className="min-h-screen bg-background">
      <div className="container-custom py-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="mb-8"
        >
          <div className="flex items-center space-x-4 mb-6">
            <Button 
              variant="ghost" 
              size="sm"
              onClick={() => navigate('/profile')}
              className="flex items-center space-x-2"
            >
              <ArrowLeft className="h-4 w-4" />
              <span>{t('language') === 'fr' ? 'Retour' : 'Back'}</span>
            </Button>
            <div>
              <h1 className="text-3xl font-heading font-bold text-foreground flex items-center">
                <Bell className="h-8 w-8 mr-3 text-primary" />
                {t('language') === 'fr' ? 'Mes Alertes' : 'My Alerts'}
              </h1>
              <p className="text-muted-foreground">
                {t('language') === 'fr' 
                  ? 'Gérez vos alertes de propriétés et recevez des notifications personnalisées'
                  : 'Manage your property alerts and receive personalized notifications'
                }
              </p>
            </div>
          </div>
        </motion.div>

        {/* Tabs */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.1 }}
        >
          <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
            <TabsList className="grid w-full grid-cols-2">
              <TabsTrigger value="manage" className="flex items-center space-x-2">
                <Bell className="h-4 w-4" />
                <span>{t('language') === 'fr' ? 'Gérer' : 'Manage'}</span>
              </TabsTrigger>
              <TabsTrigger value="create" className="flex items-center space-x-2">
                <Plus className="h-4 w-4" />
                <span>{t('language') === 'fr' ? 'Créer' : 'Create'}</span>
              </TabsTrigger>
            </TabsList>

            {/* Manage Alerts Tab */}
            <TabsContent value="manage" className="space-y-6">
              {error && (
                <Alert variant="destructive">
                  <AlertCircle className="h-4 w-4" />
                  <AlertDescription>{error}</AlertDescription>
                </Alert>
              )}

              {success && (
                <Alert>
                  <CheckCircle className="h-4 w-4" />
                  <AlertDescription>{success}</AlertDescription>
                </Alert>
              )}

              {isLoading ? (
                <div className="flex items-center justify-center py-12">
                  <div className="text-center">
                    <div className="w-8 h-8 border-4 border-primary border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
                    <p className="text-muted-foreground">{t('language') === 'fr' ? 'Chargement...' : 'Loading...'}</p>
                  </div>
                </div>
              ) : alerts.length === 0 ? (
                <Card>
                  <CardContent className="flex flex-col items-center justify-center py-12 text-center">
                    <Bell className="h-12 w-12 text-muted-foreground mb-4" />
                    <h3 className="text-lg font-semibold mb-2">
                      {t('language') === 'fr' ? 'Aucune alerte' : 'No alerts'}
                    </h3>
                    <p className="text-muted-foreground mb-4">
                      {t('language') === 'fr' 
                        ? 'Vous n\'avez pas encore créé d\'alerte. Créez-en une pour recevoir des notifications personnalisées.'
                        : 'You haven\'t created any alerts yet. Create one to receive personalized notifications.'
                      }
                    </p>
                    <Button onClick={() => setActiveTab('create')}>
                      <Plus className="h-4 w-4 mr-2" />
                      {t('language') === 'fr' ? 'Créer une alerte' : 'Create Alert'}
                    </Button>
                  </CardContent>
                </Card>
              ) : (
                <div className="grid gap-6">
                  {alerts.map((alert) => (
                    <motion.div
                      key={alert.id}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.3 }}
                    >
                      <Card className="hover:shadow-lg transition-shadow duration-300">
                        <CardHeader>
                          <div className="flex items-center justify-between">
                            <div className="flex items-center space-x-3">
                              <div className="p-2 bg-primary/10 rounded-lg">
                                <Home className="h-5 w-5 text-primary" />
                              </div>
                              <div>
                                <CardTitle className="text-lg">
                                  {getPropertyTypeLabel(alert.property_type)} - {getTransactionTypeLabel(alert.transaction_type)}
                                </CardTitle>
                                <CardDescription>
                                  {t('language') === 'fr' ? 'Créé le' : 'Created on'} {new Date(alert.created_at).toLocaleDateString()}
                                </CardDescription>
                              </div>
                            </div>
                            <div className="flex items-center space-x-2">
                              <Badge variant={alert.is_active ? 'default' : 'secondary'}>
                                {alert.is_active 
                                  ? (t('language') === 'fr' ? 'Actif' : 'Active')
                                  : (t('language') === 'fr' ? 'Inactif' : 'Inactive')
                                }
                              </Badge>
                              <Switch
                                checked={alert.is_active}
                                onCheckedChange={(checked) => handleToggleAlert(alert.id, checked)}
                              />
                            </div>
                          </div>
                        </CardHeader>
                        <CardContent>
                          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                            {alert.location && (
                              <div className="flex items-center space-x-2 text-sm">
                                <MapPin className="h-4 w-4 text-muted-foreground" />
                                <span className="text-muted-foreground">{t('language') === 'fr' ? 'Localisation:' : 'Location:'}</span>
                                <span>{alert.location}</span>
                              </div>
                            )}
                            {alert.rooms && (
                              <div className="flex items-center space-x-2 text-sm">
                                <Home className="h-4 w-4 text-muted-foreground" />
                                <span className="text-muted-foreground">{t('language') === 'fr' ? 'Pièces:' : 'Rooms:'}</span>
                                <span>{alert.rooms}</span>
                              </div>
                            )}
                            {(alert.min_budget || alert.max_budget) && (
                              <div className="flex items-center space-x-2 text-sm">
                                <DollarSign className="h-4 w-4 text-muted-foreground" />
                                <span className="text-muted-foreground">{t('language') === 'fr' ? 'Budget:' : 'Budget:'}</span>
                                <span>
                                  {alert.min_budget && alert.max_budget 
                                    ? `${formatCurrency(alert.min_budget)} - ${formatCurrency(alert.max_budget)}`
                                    : alert.min_budget 
                                    ? `${t('language') === 'fr' ? 'Min' : 'Min'}: ${formatCurrency(alert.min_budget)}`
                                    : `${t('language') === 'fr' ? 'Max' : 'Max'}: ${formatCurrency(alert.max_budget)}`
                                  }
                                </span>
                              </div>
                            )}
                          </div>
                          <Separator className="my-4" />
                          <div className="flex items-center justify-between">
                            <div className="flex items-center space-x-2 text-sm text-muted-foreground">
                              <Calendar className="h-4 w-4" />
                              <span>
                                {t('language') === 'fr' ? 'Dernière mise à jour:' : 'Last updated:'} {new Date(alert.updated_at).toLocaleDateString()}
                              </span>
                            </div>
                            <div className="flex items-center space-x-2">
                              <Button
                                variant="outline"
                                size="sm"
                                onClick={() => handleDeleteAlert(alert.id)}
                                className="text-destructive hover:text-destructive"
                              >
                                <Trash2 className="h-4 w-4 mr-2" />
                                {t('language') === 'fr' ? 'Supprimer' : 'Delete'}
                              </Button>
                            </div>
                          </div>
                        </CardContent>
                      </Card>
                    </motion.div>
                  ))}
                </div>
              )}
            </TabsContent>

            {/* Create Alert Tab */}
            <TabsContent value="create" className="space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center">
                    <Plus className="h-5 w-5 mr-2" />
                    {t('language') === 'fr' ? 'Créer une nouvelle alerte' : 'Create New Alert'}
                  </CardTitle>
                  <CardDescription>
                    {t('language') === 'fr' 
                      ? 'Configurez vos critères pour recevoir des notifications personnalisées'
                      : 'Configure your criteria to receive personalized notifications'
                    }
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <form onSubmit={handleCreateAlert} className="space-y-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div className="space-y-2">
                        <Label htmlFor="transaction_type">
                          {t('language') === 'fr' ? 'Type de transaction' : 'Transaction Type'} *
                        </Label>
                        <Select 
                          value={formData.transaction_type} 
                          onValueChange={(value: 'rent' | 'sale') => setFormData(prev => ({ ...prev, transaction_type: value }))}
                        >
                          <SelectTrigger>
                            <SelectValue placeholder={t('language') === 'fr' ? 'Sélectionnez...' : 'Select...'} />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="rent">{t('language') === 'fr' ? 'Location' : 'Rent'}</SelectItem>
                            <SelectItem value="sale">{t('language') === 'fr' ? 'Achat' : 'Purchase'}</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>

                      <div className="space-y-2">
                        <Label htmlFor="property_type">
                          {t('language') === 'fr' ? 'Type de bien' : 'Property Type'} *
                        </Label>
                        <Select 
                          value={formData.property_type} 
                          onValueChange={(value: 'apartment' | 'house' | 'villa' | 'land') => setFormData(prev => ({ ...prev, property_type: value }))}
                        >
                          <SelectTrigger>
                            <SelectValue placeholder={t('language') === 'fr' ? 'Sélectionnez...' : 'Select...'} />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="apartment">{t('language') === 'fr' ? 'Appartement' : 'Apartment'}</SelectItem>
                            <SelectItem value="house">{t('language') === 'fr' ? 'Maison' : 'House'}</SelectItem>
                            <SelectItem value="villa">{t('language') === 'fr' ? 'Villa' : 'Villa'}</SelectItem>
                            <SelectItem value="land">{t('language') === 'fr' ? 'Terrain' : 'Land'}</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>

                      <div className="space-y-2">
                        <Label htmlFor="location">
                          {t('language') === 'fr' ? 'Localisation' : 'Location'}
                        </Label>
                        <Input
                          id="location"
                          placeholder={t('language') === 'fr' ? 'Ex: Genève, Lausanne...' : 'e.g., Geneva, Lausanne...'}
                          value={formData.location}
                          onChange={(e) => setFormData(prev => ({ ...prev, location: e.target.value }))}
                        />
                      </div>

                      <div className="space-y-2">
                        <Label htmlFor="rooms">
                          {t('language') === 'fr' ? 'Nombre de pièces' : 'Number of Rooms'}
                        </Label>
                        <Input
                          id="rooms"
                          type="number"
                          min="1"
                          placeholder={t('language') === 'fr' ? 'Ex: 3.5' : 'e.g., 3.5'}
                          value={formData.rooms}
                          onChange={(e) => setFormData(prev => ({ ...prev, rooms: e.target.value }))}
                        />
                      </div>

                      <div className="space-y-2">
                        <Label htmlFor="min_budget">
                          {t('language') === 'fr' ? 'Budget minimum (CHF)' : 'Minimum Budget (CHF)'}
                        </Label>
                        <Input
                          id="min_budget"
                          placeholder={t('language') === 'fr' ? 'Ex: 500000' : 'e.g., 500000'}
                          value={formData.min_budget}
                          onChange={(e) => setFormData(prev => ({ ...prev, min_budget: e.target.value }))}
                        />
                      </div>

                      <div className="space-y-2">
                        <Label htmlFor="max_budget">
                          {t('language') === 'fr' ? 'Budget maximum (CHF)' : 'Maximum Budget (CHF)'}
                        </Label>
                        <Input
                          id="max_budget"
                          placeholder={t('language') === 'fr' ? 'Ex: 2000000' : 'e.g., 2000000'}
                          value={formData.max_budget}
                          onChange={(e) => setFormData(prev => ({ ...prev, max_budget: e.target.value }))}
                        />
                      </div>
                    </div>

                    {error && (
                      <Alert variant="destructive">
                        <AlertCircle className="h-4 w-4" />
                        <AlertDescription>{error}</AlertDescription>
                      </Alert>
                    )}

                    {success && (
                      <Alert>
                        <CheckCircle className="h-4 w-4" />
                        <AlertDescription>{success}</AlertDescription>
                      </Alert>
                    )}

                    <div className="flex items-center justify-between pt-4">
                      <Button
                        type="button"
                        variant="outline"
                        onClick={() => setActiveTab('manage')}
                      >
                        {t('language') === 'fr' ? 'Annuler' : 'Cancel'}
                      </Button>
                      <Button 
                        type="submit" 
                        disabled={isCreating}
                        className="bg-gradient-to-r from-primary to-primary/80 hover:from-primary/90 hover:to-primary/70"
                      >
                        {isCreating ? (
                          <>
                            <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin mr-2" />
                            {t('language') === 'fr' ? 'Création...' : 'Creating...'}
                          </>
                        ) : (
                          <>
                            <Plus className="h-4 w-4 mr-2" />
                            {t('language') === 'fr' ? 'Créer l\'alerte' : 'Create Alert'}
                          </>
                        )}
                      </Button>
                    </div>
                  </form>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </motion.div>
      </div>
    </div>
  );
};

export default PropertyAlertsPage;