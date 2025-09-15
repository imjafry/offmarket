import React, { useState } from 'react';
import { ArrowLeft, Send, CheckCircle, AlertCircle, Users, Shield, Star, Home, Video, Key, Search, Lock, Camera, Play, Award } from 'lucide-react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { useTranslation } from '@/hooks/useTranslation';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { toast } from 'sonner';

export const BecomeMemberPage: React.FC = () => {
  const { t } = useTranslation();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    phone: '',
    profile: '',
    project: ''
  });

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      toast.success(t('becomeMember.form.success'));
      setFormData({
        fullName: '',
        email: '',
        phone: '',
        profile: '',
        project: ''
      });
    } catch (error) {
      toast.error(t('becomeMember.form.error'));
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Hero Section */}
      <section className="relative bg-gradient-to-br from-primary/5 via-background to-primary/10 py-20 lg:py-32 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-primary/5 to-transparent" />
        <div className="container-custom relative">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="flex items-center space-x-4 mb-12"
          >
            <Link to="/">
              <Button variant="ghost" size="sm" className="text-muted-foreground hover:text-primary hover:bg-primary/10 transition-all">
                <ArrowLeft className="h-4 w-4 mr-2" />
                {t('language') === 'fr' ? 'Retour' : 'Back'}
              </Button>
            </Link>
          </motion.div>
          
          <div className="max-w-5xl">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="text-center mb-16"
            >
              <h1 className="text-4xl md:text-5xl lg:text-7xl font-heading font-bold mb-8 leading-tight text-foreground">
                {t('becomeMember.title')}
              </h1>
              <p className="text-xl md:text-2xl text-muted-foreground leading-relaxed max-w-4xl mx-auto">
                {t('becomeMember.subtitle')}
              </p>
            </motion.div>

            {/* Trust Indicators */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.4 }}
              className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16"
            >
              <div className="text-center group">
                <div className="w-16 h-16 bg-primary/10 rounded-2xl flex items-center justify-center mx-auto mb-4 group-hover:bg-primary/20 transition-colors">
                  <Shield className="h-8 w-8 text-primary" />
                </div>
                <h3 className="font-semibold text-foreground mb-2">
                  {t('language') === 'fr' ? 'Confidentialité' : 'Confidentiality'}
                </h3>
                <p className="text-sm text-muted-foreground">
                  {t('language') === 'fr' ? 'Transactions discrètes et sécurisées' : 'Discrete and secure transactions'}
                </p>
              </div>
              <div className="text-center group">
                <div className="w-16 h-16 bg-primary/10 rounded-2xl flex items-center justify-center mx-auto mb-4 group-hover:bg-primary/20 transition-colors">
                  <Users className="h-8 w-8 text-primary" />
                </div>
                <h3 className="font-semibold text-foreground mb-2">
                  {t('language') === 'fr' ? 'Réseau Exclusif' : 'Exclusive Network'}
                </h3>
                <p className="text-sm text-muted-foreground">
                  {t('language') === 'fr' ? 'Accès à un cercle privilégié' : 'Access to a privileged circle'}
                </p>
              </div>
              <div className="text-center group">
                <div className="w-16 h-16 bg-primary/10 rounded-2xl flex items-center justify-center mx-auto mb-4 group-hover:bg-primary/20 transition-colors">
                  <Star className="h-8 w-8 text-primary" />
                </div>
                <h3 className="font-semibold text-foreground mb-2">
                  {t('language') === 'fr' ? 'Opportunités Uniques' : 'Unique Opportunities'}
                </h3>
                <p className="text-sm text-muted-foreground">
                  {t('language') === 'fr' ? 'Propriétés hors-marché exclusives' : 'Exclusive off-market properties'}
                </p>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Introduction Section */}
      <section className="py-20 bg-muted/20">
        <div className="container-custom">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="max-w-4xl mx-auto text-center"
          >
            <div className="prose prose-lg max-w-none text-foreground">
              {t('becomeMember.intro').split('\n').map((paragraph, index) => (
                <p key={index} className="mb-8 text-lg md:text-xl leading-relaxed text-muted-foreground">
                  {paragraph}
                </p>
              ))}
            </div>
          </motion.div>
        </div>
      </section>

      {/* Off-Market Services Section */}
      <section className="py-20 bg-background">
        <div className="container-custom">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="text-center space-y-4 mb-16"
          >
            <h2 className="text-3xl md:text-4xl font-heading font-bold text-foreground">
              {t('becomeMember.services.title')}
            </h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              {t('becomeMember.services.subtitle')}
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {/* Private Property Sales */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.1 }}
              viewport={{ once: true }}
              className="group"
            >
              <Card className="h-full hover:shadow-xl transition-all duration-300 border-0 bg-gradient-to-br from-white to-gray-50 overflow-hidden">
                <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-red-500 to-pink-500 rounded-full -translate-y-16 translate-x-16 opacity-10 group-hover:opacity-20 transition-opacity"></div>
                <CardContent className="p-8">
                  <div className="w-16 h-16 bg-primary/10 rounded-2xl flex items-center justify-center mb-6 group-hover:bg-primary/20 transition-colors">
                    <Lock className="h-8 w-8 text-primary" />
                  </div>
                  <h3 className="text-xl font-heading font-bold text-foreground mb-4">
                    {t('becomeMember.services.privateSales.title')}
                  </h3>
                  <p className="text-muted-foreground leading-relaxed mb-6">
                    {t('becomeMember.services.privateSales.description')}
                  </p>
                  <Link to="/private-sales">
                    <Button variant="outline" className="w-full group-hover:bg-primary group-hover:text-primary-foreground group-hover:border-primary transition-all">
                      {t('becomeMember.services.privateSales.cta')}
                    </Button>
                  </Link>
                </CardContent>
              </Card>
            </motion.div>

            {/* Property Showcase Videos */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              viewport={{ once: true }}
              className="group"
            >
              <Card className="h-full hover:shadow-xl transition-all duration-300 border-0 bg-gradient-to-br from-white to-gray-50 overflow-hidden">
                <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-blue-500 to-cyan-500 rounded-full -translate-y-16 translate-x-16 opacity-10 group-hover:opacity-20 transition-opacity"></div>
                <CardContent className="p-8">
                  <div className="w-16 h-16 bg-primary/10 rounded-2xl flex items-center justify-center mb-6 group-hover:bg-primary/20 transition-colors">
                    <Video className="h-8 w-8 text-primary" />
                  </div>
                  <h3 className="text-xl font-heading font-bold text-foreground mb-4">
                    {t('becomeMember.services.videos.title')}
                  </h3>
                  <p className="text-muted-foreground leading-relaxed mb-6">
                    {t('becomeMember.services.videos.description')}
                  </p>
                  <Link to="/property-videos">
                    <Button variant="outline" className="w-full group-hover:bg-primary group-hover:text-primary-foreground group-hover:border-primary transition-all">
                      {t('becomeMember.services.videos.cta')}
                    </Button>
                  </Link>
                </CardContent>
              </Card>
            </motion.div>

            {/* Exclusive Access */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.3 }}
              viewport={{ once: true }}
              className="group"
            >
              <Card className="h-full hover:shadow-xl transition-all duration-300 border-0 bg-gradient-to-br from-white to-gray-50 overflow-hidden">
                <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-purple-500 to-pink-500 rounded-full -translate-y-16 translate-x-16 opacity-10 group-hover:opacity-20 transition-opacity"></div>
                <CardContent className="p-8">
                  <div className="w-16 h-16 bg-primary/10 rounded-2xl flex items-center justify-center mb-6 group-hover:bg-primary/20 transition-colors">
                    <Key className="h-8 w-8 text-primary" />
                  </div>
                  <h3 className="text-xl font-heading font-bold text-foreground mb-4">
                    {t('becomeMember.services.exclusiveAccess.title')}
                  </h3>
                  <p className="text-muted-foreground leading-relaxed mb-6">
                    {t('becomeMember.services.exclusiveAccess.description')}
                  </p>
                  <Link to="/exclusive-access">
                    <Button variant="outline" className="w-full group-hover:bg-primary group-hover:text-primary-foreground group-hover:border-primary transition-all">
                      {t('becomeMember.services.exclusiveAccess.cta')}
                    </Button>
                  </Link>
                </CardContent>
              </Card>
            </motion.div>

            {/* Personalized Assistance */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.4 }}
              viewport={{ once: true }}
              className="group"
            >
              <Card className="h-full hover:shadow-xl transition-all duration-300 border-0 bg-gradient-to-br from-white to-gray-50 overflow-hidden">
                <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-green-500 to-emerald-500 rounded-full -translate-y-16 translate-x-16 opacity-10 group-hover:opacity-20 transition-opacity"></div>
                <CardContent className="p-8">
                  <div className="w-16 h-16 bg-primary/10 rounded-2xl flex items-center justify-center mb-6 group-hover:bg-primary/20 transition-colors">
                    <Search className="h-8 w-8 text-primary" />
                  </div>
                  <h3 className="text-xl font-heading font-bold text-foreground mb-4">
                    {t('becomeMember.services.personalized.title')}
                  </h3>
                  <p className="text-muted-foreground leading-relaxed mb-6">
                    {t('becomeMember.services.personalized.description')}
                  </p>
                  <Link to="/property-finder">
                    <Button variant="outline" className="w-full group-hover:bg-primary group-hover:text-primary-foreground group-hover:border-primary transition-all">
                      {t('becomeMember.services.personalized.cta')}
                    </Button>
                  </Link>
                </CardContent>
              </Card>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Membership Form Section */}
      <section className="py-20 bg-muted/20 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-primary/5 to-transparent opacity-50" />
        <div className="container-custom relative">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="max-w-3xl mx-auto"
          >
            <Card className="shadow-2xl border-0 bg-card/80 backdrop-blur-sm overflow-hidden">
              <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-primary via-primary/80 to-primary" />
              
              <CardHeader className="text-center py-12 px-8">
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: 0.2 }}
                  viewport={{ once: true }}
                >
                  <CardTitle className="text-3xl md:text-4xl font-heading font-bold text-foreground mb-4">
                    {t('becomeMember.form.title')}
                  </CardTitle>
                  <p className="text-muted-foreground text-lg">
                    {t('language') === 'fr' 
                      ? 'Rejoignez notre cercle exclusif en quelques étapes simples'
                      : 'Join our exclusive circle in just a few simple steps'
                    }
                  </p>
                </motion.div>
              </CardHeader>

              <CardContent className="px-8 pb-12">
                <motion.form
                  initial={{ opacity: 0 }}
                  whileInView={{ opacity: 1 }}
                  transition={{ duration: 0.8, delay: 0.3 }}
                  viewport={{ once: true }}
                  onSubmit={handleSubmit}
                  className="space-y-8"
                >
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {/* Full Name */}
                    <div className="space-y-3">
                      <Label htmlFor="fullName" className="text-sm font-semibold text-foreground flex items-center">
                        {t('becomeMember.form.fullName')}
                        <span className="text-destructive ml-1">*</span>
                      </Label>
                      <Input
                        id="fullName"
                        type="text"
                        value={formData.fullName}
                        onChange={(e) => handleInputChange('fullName', e.target.value)}
                        required
                        className="h-14 text-lg border-2 transition-all duration-300 focus:border-primary focus:shadow-lg focus:shadow-primary/20"
                      />
                    </div>

                    {/* Email */}
                    <div className="space-y-3">
                      <Label htmlFor="email" className="text-sm font-semibold text-foreground flex items-center">
                        {t('becomeMember.form.email')}
                        <span className="text-destructive ml-1">*</span>
                      </Label>
                      <Input
                        id="email"
                        type="email"
                        value={formData.email}
                        onChange={(e) => handleInputChange('email', e.target.value)}
                        required
                        className="h-14 text-lg border-2 transition-all duration-300 focus:border-primary focus:shadow-lg focus:shadow-primary/20"
                      />
                    </div>
                  </div>

                  {/* Phone */}
                  <div className="space-y-3">
                    <Label htmlFor="phone" className="text-sm font-semibold text-foreground flex items-center">
                      {t('becomeMember.form.phone')}
                      <span className="text-destructive ml-1">*</span>
                    </Label>
                    <Input
                      id="phone"
                      type="tel"
                      value={formData.phone}
                      onChange={(e) => handleInputChange('phone', e.target.value)}
                      required
                      className="h-14 text-lg border-2 transition-all duration-300 focus:border-primary focus:shadow-lg focus:shadow-primary/20"
                    />
                  </div>

                  {/* Profile */}
                  <div className="space-y-3">
                    <Label htmlFor="profile" className="text-sm font-semibold text-foreground flex items-center">
                      {t('becomeMember.form.profile')}
                      <span className="text-destructive ml-1">*</span>
                    </Label>
                    <Select value={formData.profile} onValueChange={(value) => handleInputChange('profile', value)} required>
                      <SelectTrigger className="h-14 text-lg border-2 transition-all duration-300 focus:border-primary focus:shadow-lg focus:shadow-primary/20">
                        <SelectValue placeholder={t('becomeMember.form.profile')} />
                      </SelectTrigger>
                      <SelectContent className="bg-background border-2 shadow-xl">
                        <SelectItem value="looking" className="text-lg py-3">
                          {t('becomeMember.form.profileOptions.looking')}
                        </SelectItem>
                        <SelectItem value="owner" className="text-lg py-3">
                          {t('becomeMember.form.profileOptions.owner')}
                        </SelectItem>
                        <SelectItem value="other" className="text-lg py-3">
                          {t('becomeMember.form.profileOptions.other')}
                        </SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  {/* Project */}
                  <div className="space-y-3">
                    <Label htmlFor="project" className="text-sm font-semibold text-foreground flex items-center">
                      {t('becomeMember.form.project')}
                      <span className="text-destructive ml-1">*</span>
                    </Label>
                    <Input
                      id="project"
                      type="text"
                      value={formData.project}
                      onChange={(e) => handleInputChange('project', e.target.value)}
                      placeholder={t('becomeMember.form.projectPlaceholder')}
                      required
                      className="h-14 text-lg border-2 transition-all duration-300 focus:border-primary focus:shadow-lg focus:shadow-primary/20"
                    />
                  </div>

                  {/* Submit Button */}
                  <div className="pt-4">
                    <Button 
                      type="submit" 
                      size="lg"
                      className="w-full h-16 text-xl font-semibold transition-all duration-300 hover:scale-[1.02] hover:shadow-xl hover:shadow-primary/25 disabled:hover:scale-100 bg-primary hover:bg-primary/90"
                      disabled={isSubmitting}
                    >
                      {isSubmitting ? (
                        <motion.div
                          initial={{ opacity: 0 }}
                          animate={{ opacity: 1 }}
                          className="flex items-center space-x-3"
                        >
                          <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-white"></div>
                          <span>{t('common.loading')}</span>
                        </motion.div>
                      ) : (
                        <motion.div
                          whileHover={{ scale: 1.05 }}
                          className="flex items-center space-x-3"
                        >
                          <Send className="h-6 w-6" />
                          <span>{t('becomeMember.form.submit')}</span>
                        </motion.div>
                      )}
                    </Button>
                  </div>
                </motion.form>
              </CardContent>
            </Card>
          </motion.div>
        </div>
      </section>

      {/* Contact Info Footer */}
      <section className="py-16 bg-background border-t">
        <div className="container-custom">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="text-center max-w-2xl mx-auto"
          >
            <h3 className="text-2xl md:text-3xl font-heading font-bold text-foreground mb-6">
              {t('contact.title')}
            </h3>
            <p className="text-lg text-muted-foreground mb-8">
              {t('language') === 'fr' 
                ? 'Notre équipe est disponible pour répondre à vos questions et vous accompagner dans votre démarche'
                : 'Our team is available to answer your questions and guide you through the process'
              }
            </p>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-lg mx-auto">
              <div className="p-6 rounded-2xl bg-card border hover:shadow-lg transition-all duration-300">
                <div className="text-lg font-semibold text-foreground mb-2">
                  {t('language') === 'fr' ? 'Email' : 'Email'}
                </div>
                <p className="text-primary font-medium">{t('contact.emailAddress')}</p>
              </div>
              <div className="p-6 rounded-2xl bg-card border hover:shadow-lg transition-all duration-300">
                <div className="text-lg font-semibold text-foreground mb-2">
                  {t('language') === 'fr' ? 'Téléphone' : 'Phone'}
                </div>
                <p className="text-primary font-medium">{t('contact.phoneNumber')}</p>
              </div>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
};
