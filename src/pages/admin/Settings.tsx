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
import { Bell, Globe, Mail, Settings, Shield, Database, UploadCloud, Image as ImageIcon, Moon } from 'lucide-react';
import { Switch } from '@/components/ui/switch';

export const AdminSettingsPage: React.FC = () => {
  const { t, language, setLanguage } = useTranslation();
  const [siteName, setSiteName] = React.useState<string>(() => localStorage.getItem('admin_site_name') || 'OffMarket');
  const [tagline, setTagline] = React.useState<string>(() => localStorage.getItem('admin_site_tagline') || (t('language') === 'fr' ? 'Accès exclusif aux propriétés hors-marché' : 'Exclusive access to off-market properties'));
  const [darkMode, setDarkMode] = React.useState<boolean>(() => localStorage.getItem('admin_theme') === 'dark');
  const [logoPreview, setLogoPreview] = React.useState<string | null>(() => localStorage.getItem('admin_logo') || null);
  const [senderName, setSenderName] = React.useState<string>(() => localStorage.getItem('admin_email_sender_name') || 'OffMarket');
  const [senderEmail, setSenderEmail] = React.useState<string>(() => localStorage.getItem('admin_email_sender_email') || 'noreply@offmarket.ch');
  const [replyTo, setReplyTo] = React.useState<string>(() => localStorage.getItem('admin_email_reply_to') || 'support@offmarket.ch');
  const [maintenance, setMaintenance] = React.useState<boolean>(() => localStorage.getItem('admin_maintenance') === 'true');

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
            <TabsTrigger value="branding">{t('language') === 'fr' ? 'Branding' : 'Branding'}</TabsTrigger>
            <TabsTrigger value="email">{t('language') === 'fr' ? 'E-mails' : 'Emails'}</TabsTrigger>
            <TabsTrigger value="notifications">{t('language') === 'fr' ? 'Notifications' : 'Notifications'}</TabsTrigger>
            <TabsTrigger value="security">{t('language') === 'fr' ? 'Sécurité' : 'Security'}</TabsTrigger>
            <TabsTrigger value="data">{t('language') === 'fr' ? 'Données' : 'Data'}</TabsTrigger>
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

          <TabsContent value="branding" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center"><ImageIcon className="h-5 w-5 mr-2 text-pink-600" />{t('language') === 'fr' ? 'Branding & Thème' : 'Branding & Theme'}</CardTitle>
                <CardDescription>{t('language') === 'fr' ? 'Logo et préférences d\'apparence' : 'Logo and appearance preferences'}</CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <Label>{t('language') === 'fr' ? 'Logo' : 'Logo'}</Label>
                    <div className="flex items-center space-x-4">
                      <div className="w-16 h-16 bg-muted rounded-xl overflow-hidden flex items-center justify-center">
                        {logoPreview ? (
                          <img src={logoPreview} className="w-full h-full object-cover" />
                        ) : (
                          <ImageIcon className="h-6 w-6 text-muted-foreground" />
                        )}
                      </div>
                      <div>
                        <input
                          type="file"
                          accept="image/*"
                          className="hidden"
                          id="logo-upload"
                          onChange={(e) => {
                            const file = e.target.files?.[0];
                            if (file) {
                              const reader = new FileReader();
                              reader.onload = () => {
                                const url = String(reader.result);
                                setLogoPreview(url);
                                localStorage.setItem('admin_logo', url);
                              };
                              reader.readAsDataURL(file);
                            }
                          }}
                        />
                        <Button variant="outline" onClick={() => document.getElementById('logo-upload')?.click()}>
                          <UploadCloud className="h-4 w-4 mr-2" />
                          {t('language') === 'fr' ? 'Télécharger' : 'Upload'}
                        </Button>
                      </div>
                    </div>
                  </div>
                  <div className="space-y-2">
                    <Label className="flex items-center space-x-2"><Moon className="h-4 w-4 mr-2 text-purple-600" />{t('language') === 'fr' ? 'Mode sombre' : 'Dark Mode'}</Label>
                    <div className="flex items-center justify-between p-3 border rounded-lg">
                      <span className="text-sm text-muted-foreground">{darkMode ? 'Dark' : 'Light'}</span>
                      <Switch checked={darkMode} onCheckedChange={(v) => { setDarkMode(v); localStorage.setItem('admin_theme', v ? 'dark' : 'light'); }} />
                    </div>
                  </div>
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
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div className="space-y-2">
                    <Label>{t('language') === 'fr' ? 'Nom de l\'expéditeur' : 'Sender Name'}</Label>
                    <Input value={senderName} onChange={(e) => setSenderName(e.target.value)} />
                  </div>
                  <div className="space-y-2">
                    <Label>{t('language') === 'fr' ? 'Email expéditeur' : 'Sender Email'}</Label>
                    <Input value={senderEmail} onChange={(e) => setSenderEmail(e.target.value)} />
                  </div>
                  <div className="space-y-2">
                    <Label>Reply-To</Label>
                    <Input value={replyTo} onChange={(e) => setReplyTo(e.target.value)} />
                  </div>
                </div>
                <div className="flex gap-3">
                  <Button
                    type="button"
                    variant="outline"
                    onClick={() => {
                      localStorage.setItem('admin_email_sender_name', senderName);
                      localStorage.setItem('admin_email_sender_email', senderEmail);
                      localStorage.setItem('admin_email_reply_to', replyTo);
                      const { toast } = require('@/hooks/use-toast');
                      toast({ title: t('language') === 'fr' ? 'Paramètres e-mail enregistrés' : 'Email settings saved' });
                    }}
                  >
                    {t('language') === 'fr' ? 'Enregistrer les paramètres e-mail' : 'Save email settings'}
                  </Button>
                  <Button
                    type="button"
                    onClick={() => {
                      const { toast } = require('@/hooks/use-toast');
                      toast({ title: t('language') === 'fr' ? 'Email test envoyé' : 'Test email sent', description: `${senderName} <${senderEmail}> → ${replyTo}` });
                    }}
                  >
                    {t('language') === 'fr' ? 'Tester l\'email' : 'Send test email'}
                  </Button>
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

          <TabsContent value="security" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center"><Shield className="h-5 w-5 mr-2 text-emerald-600" />{t('language') === 'fr' ? 'Sécurité' : 'Security'}</CardTitle>
                <CardDescription>{t('language') === 'fr' ? 'Contrôles de sécurité de base' : 'Basic security controls'}</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center justify-between p-3 border rounded-lg">
                  <div>
                    <div className="font-medium">{t('language') === 'fr' ? 'Mode maintenance' : 'Maintenance Mode'}</div>
                    <div className="text-sm text-muted-foreground">{t('language') === 'fr' ? 'Empêche l\'accès public pendant la maintenance' : 'Prevents public access during maintenance'}</div>
                  </div>
                  <Switch checked={maintenance} onCheckedChange={(v) => { setMaintenance(v); localStorage.setItem('admin_maintenance', String(v)); }} />
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="data" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center"><Database className="h-5 w-5 mr-2 text-indigo-600" />{t('language') === 'fr' ? 'Sauvegarde & Restauration' : 'Backup & Restore'}</CardTitle>
                <CardDescription>{t('language') === 'fr' ? 'Exporter la configuration actuelle' : 'Export current configuration'}</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <Button
                  variant="outline"
                  onClick={() => {
                    const data = {
                      siteName,
                      tagline,
                      darkMode,
                      logoPreview,
                      senderName,
                      senderEmail,
                      replyTo,
                      maintenance
                    };
                    const blob = new Blob([JSON.stringify(data, null, 2)], { type: 'application/json' });
                    const url = URL.createObjectURL(blob);
                    const a = document.createElement('a');
                    a.href = url; a.download = 'admin-settings-backup.json'; a.click();
                    URL.revokeObjectURL(url);
                  }}
                >
                  {t('language') === 'fr' ? 'Exporter la sauvegarde' : 'Export Backup'}
                </Button>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </AdminLayout>
  );
};

export default AdminSettingsPage;


