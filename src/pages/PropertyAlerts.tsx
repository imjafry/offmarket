import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { useTranslation } from '@/hooks/useTranslation';
import { useAuth } from '@/contexts/AuthContext';
import { supabase } from '@/lib/supabaseClient';

const PropertyAlertsPage: React.FC = () => {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const { user } = useAuth();

  const [transactionType, setTransactionType] = useState<'rent' | 'sale' | ''>('');
  const [propertyType, setPropertyType] = useState<
    'apartment' | 'house' | 'villa' | 'land' | ''
  >('');
  const [maxBudget, setMaxBudget] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState<string>('');
  const [success, setSuccess] = useState<string>('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setSuccess('');

    if (!user) {
      navigate('/login');
      return;
    }

    if (!transactionType || !propertyType) {
      setError(
        t('language') === 'fr'
          ? 'Veuillez sélectionner le type de transaction et le type de bien.'
          : 'Please select transaction type and property type.'
      );
      return;
    }

    setIsSubmitting(true);
    try {
      const payload: any = {
        user_id: user.id,
        transaction_type: transactionType,
        property_type: propertyType,
      };

      if (maxBudget.trim()) {
        const budgetNum = Number(maxBudget.replace(/[^0-9.]/g, ''));
        if (!Number.isFinite(budgetNum)) {
          throw new Error('Invalid budget value');
        }
        payload.max_budget = budgetNum;
      }

      const { error: insertError } = await supabase.from('property_alerts').insert(payload);
      if (insertError) throw insertError;

      setSuccess(
        t('language') === 'fr'
          ? 'Votre alerte a été enregistrée. Vous recevrez un email lorsqu’une nouvelle propriété correspondra à vos critères.'
          : 'Your alert has been saved. You will receive an email when a new property matches your criteria.'
      );
      setTransactionType('');
      setPropertyType('');
      setMaxBudget('');
    } catch (e: any) {
      setError(e.message || 'Failed to save alert');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="container mx-auto px-4 py-8 max-w-2xl">
      <Card>
        <CardHeader>
          <CardTitle>
            {t('language') === 'fr' ? 'Alertes Propriétés' : 'Property Alerts'}
          </CardTitle>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="space-y-2">
              <Label>
                {t('language') === 'fr' ? 'Type de transaction' : 'Transaction Type'} *
              </Label>
              <Select value={transactionType} onValueChange={(v: any) => setTransactionType(v)}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="rent">{t('language') === 'fr' ? 'Location' : 'Rent'}</SelectItem>
                  <SelectItem value="sale">{t('language') === 'fr' ? 'Achat' : 'Purchase'}</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label>
                {t('language') === 'fr' ? 'Type de bien' : 'Property Type'} *
              </Label>
              <Select value={propertyType} onValueChange={(v: any) => setPropertyType(v)}>
                <SelectTrigger>
                  <SelectValue />
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
              <Label>
                {t('language') === 'fr' ? 'Budget maximum (optionnel)' : 'Maximum Budget (optional)'}
              </Label>
              <Input
                placeholder={t('language') === 'fr' ? "Ex: 2800000" : "e.g., 2800000"}
                value={maxBudget}
                onChange={(e) => setMaxBudget(e.target.value)}
              />
            </div>

            {error && <p className="text-sm text-red-600">{error}</p>}
            {success && <p className="text-sm text-green-600">{success}</p>}

            <Button type="submit" disabled={isSubmitting} className="bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700">
              {isSubmitting
                ? t('language') === 'fr' ? 'Enregistrement...' : 'Saving...'
                : t('language') === 'fr' ? 'Enregistrer l’alerte' : 'Save Alert'}
            </Button>
          </form>
        </CardContent>
      </Card>
    </div>
  );
};

export default PropertyAlertsPage;


