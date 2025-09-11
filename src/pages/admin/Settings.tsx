import React from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Textarea } from '@/components/ui/textarea';
import { AdminLayout } from '@/components/admin/AdminLayout';
import { useTranslation } from '@/hooks/useTranslation';
import { Bell, Globe, Mail, Settings } from 'lucide-react';

export const AdminSettingsPage: React.FC = () => {
  const { t, language, setLanguage } = useTranslation();
  const [siteName, setSiteName] = React.useState<string>(() => localStorage.getItem('admin_site_name') || 'OffMarket');
  const [tagline, setTagline] = React.useState<string>(() => localStorage.getItem('admin_site_tagline') || (t('language') === 'fr' ? 'Accès exclusif aux propriétés hors-marché' : 'Exclusive access to off-market properties'));

  return (
    <AdminLayout>
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">
              {t('language') === 'fr' ? 'Paramètres' : 'Settings'}
            </h1>
            <p className="text-gray-600">
              {t('language') === 'fr' ? 'Configurez la plateforme et les préférences' : 'Configure the platform and preferences'}
            </p>
          </div>
          <Button
            className="bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700"
            onClick={() => {
              localStorage.setItem('admin_site_name', siteName);
              localStorage.setItem('admin_site_tagline', tagline);
              const { toast } = require('@/hooks/use-toast');
              toast({ title: t('language') === 'fr' ? 'Enregistré' : 'Saved', description: t('language') === 'fr' ? 'Paramètres enregistrés localement.' : 'Settings saved locally.' });
            }}
          >
            <Settings className="h-4 w-4 mr-2" />
            {t('language') === 'fr' ? 'Enregistrer' : 'Save Changes'}
          </Button>
        </div>

        <Tabs defaultValue="general" className="w-full">
          <TabsList>
            <TabsTrigger value="general">{t('language') === 'fr' ? 'Général' : 'General'}</TabsTrigger>
            <TabsTrigger value="email">{t('language') === 'fr' ? 'E-mails' : 'Emails'}</TabsTrigger>
            <TabsTrigger value="notifications">{t('language') === 'fr' ? 'Notifications' : 'Notifications'}</TabsTrigger>
          </TabsList>

          <TabsContent value="general" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center"><Globe className="h-5 w-5 mr-2 text-blue-600" />{t('language') === 'fr' ? 'Préférences générales' : 'General Preferences'}</CardTitle>
                <CardDescription>{t('language') === 'fr' ? 'Configuration de base du site' : 'Basic site configuration'}</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="siteName">{t('language') === 'fr' ? 'Nom du site' : 'Site Name'}</Label>
                    <Input id="siteName" value={siteName} onChange={(e) => setSiteName(e.target.value)} />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="defaultLang">{t('language') === 'fr' ? 'Langue par défaut' : 'Default Language'}</Label>
                    <Select value={language} onValueChange={setLanguage}>
                      <SelectTrigger id="defaultLang"><SelectValue /></SelectTrigger>
                      <SelectContent>
                        <SelectItem value="fr">Français</SelectItem>
                        <SelectItem value="en">English</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="branding">{t('language') === 'fr' ? 'Slogan' : 'Tagline'}</Label>
                  <Input id="branding" value={tagline} onChange={(e) => setTagline(e.target.value)} />
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="email" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center"><Mail className="h-5 w-5 mr-2 text-purple-600" />{t('language') === 'fr' ? 'Modèles d\'email' : 'Email Templates'}</CardTitle>
                <CardDescription>{t('language') === 'fr' ? 'Personnalisez les e-mails envoyés aux utilisateurs' : 'Customize emails sent to users'}</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="welcomeSubject">{t('language') === 'fr' ? 'Sujet de bienvenue' : 'Welcome Subject'}</Label>
                  <Input id="welcomeSubject" placeholder={t('language') === 'fr' ? 'Bienvenue sur OffMarket' : 'Welcome to OffMarket'} />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="welcomeBody">{t('language') === 'fr' ? 'Contenu de bienvenue' : 'Welcome Body'}</Label>
                  <Textarea id="welcomeBody" rows={6} placeholder={t('language') === 'fr' ? 'Bonjour {{name}}, merci de votre inscription...' : 'Hello {{name}}, thank you for signing up...'} />
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="notifications" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center"><Bell className="h-5 w-5 mr-2 text-orange-600" />{t('language') === 'fr' ? 'Centre de notifications' : 'Notification Center'}</CardTitle>
                <CardDescription>{t('language') === 'fr' ? 'Activer/désactiver les notifications système' : 'Enable/disable system notifications'}</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label>{t('language') === 'fr' ? 'Notifications d\'expérience' : 'Expiry Notifications'}</Label>
                    <Select defaultValue="enabled">
                      <SelectTrigger><SelectValue /></SelectTrigger>
                      <SelectContent>
                        <SelectItem value="enabled">{t('language') === 'fr' ? 'Activé' : 'Enabled'}</SelectItem>
                        <SelectItem value="disabled">{t('language') === 'fr' ? 'Désactivé' : 'Disabled'}</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="space-y-2">
                    <Label>{t('language') === 'fr' ? 'Nouveaux biens' : 'New Properties'}</Label>
                    <Select defaultValue="enabled">
                      <SelectTrigger><SelectValue /></SelectTrigger>
                      <SelectContent>
                        <SelectItem value="enabled">{t('language') === 'fr' ? 'Activé' : 'Enabled'}</SelectItem>
                        <SelectItem value="disabled">{t('language') === 'fr' ? 'Désactivé' : 'Disabled'}</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </AdminLayout>
  );
};

export default AdminSettingsPage;


