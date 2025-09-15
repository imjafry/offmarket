import React, { useState } from 'react';
import { ArrowLeft, Send, Search, CheckCircle, Star, Users, Home, MapPin, DollarSign, MessageSquare, Award, Clock, Shield } from 'lucide-react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { useTranslation } from '@/hooks/useTranslation';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Textarea } from '@/components/ui/textarea';
import { toast } from 'sonner';

export const PropertyFinderPage: React.FC = () => {
  const { t } = useTranslation();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    propertyType: '',
    location: '',
    budget: '',
    message: ''
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
      
      toast.success(t('propertyFinder.form.success'));
      setFormData({
        firstName: '',
        lastName: '',
        email: '',
        phone: '',
        propertyType: '',
        location: '',
        budget: '',
        message: ''
      });
    } catch (error) {
      toast.error(t('propertyFinder.form.error'));
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
            <Link to="/become-member">
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
                {t('propertyFinder.title')}
              </h1>
              <p className="text-xl md:text-2xl text-muted-foreground leading-relaxed max-w-4xl mx-auto">
                {t('propertyFinder.subtitle')}
              </p>
            </motion.div>

            {/* CTA Button */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.4 }}
              className="text-center mb-16"
            >
              <Button size="lg" className="btn-primary group px-8 py-4 text-lg">
                {t('propertyFinder.cta')}
                <Search className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
              </Button>
            </motion.div>

            {/* Process Steps */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.6 }}
              className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16"
            >
              <div className="text-center group">
                <div className="w-16 h-16 bg-primary/10 rounded-2xl flex items-center justify-center mx-auto mb-4 group-hover:bg-primary/20 transition-colors">
                  <Search className="h-8 w-8 text-primary" />
                </div>
                <h3 className="font-semibold text-foreground mb-2">
                  {t('propertyFinder.process.search.title')}
                </h3>
                <p className="text-sm text-muted-foreground">
                  {t('propertyFinder.process.search.description')}
                </p>
              </div>
              <div className="text-center group">
                <div className="w-16 h-16 bg-primary/10 rounded-2xl flex items-center justify-center mx-auto mb-4 group-hover:bg-primary/20 transition-colors">
                  <CheckCircle className="h-8 w-8 text-primary" />
                </div>
                <h3 className="font-semibold text-foreground mb-2">
                  {t('propertyFinder.process.selection.title')}
                </h3>
                <p className="text-sm text-muted-foreground">
                  {t('propertyFinder.process.selection.description')}
                </p>
              </div>
              <div className="text-center group">
                <div className="w-16 h-16 bg-primary/10 rounded-2xl flex items-center justify-center mx-auto mb-4 group-hover:bg-primary/20 transition-colors">
                  <Award className="h-8 w-8 text-primary" />
                </div>
                <h3 className="font-semibold text-foreground mb-2">
                  {t('propertyFinder.process.negotiation.title')}
                </h3>
                <p className="text-sm text-muted-foreground">
                  {t('propertyFinder.process.negotiation.description')}
                </p>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Description Section */}
      <section className="py-20 bg-muted/20">
        <div className="container-custom">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="max-w-4xl mx-auto text-center"
          >
            <h2 className="text-3xl md:text-4xl font-heading font-bold text-foreground mb-8">
              {t('propertyFinder.description.title')}
            </h2>
            <p className="text-lg md:text-xl leading-relaxed text-muted-foreground mb-12">
              {t('propertyFinder.description.content')}
            </p>
            
            {/* Benefits Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {[
                { icon: Clock, text: t('propertyFinder.benefits.time') },
                { icon: Shield, text: t('propertyFinder.benefits.expertise') },
                { icon: Users, text: t('propertyFinder.benefits.network') },
                { icon: Home, text: t('propertyFinder.benefits.personalized') }
              ].map((benefit, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                  viewport={{ once: true }}
                  className="text-center p-6 rounded-2xl bg-card border hover:shadow-lg transition-all duration-300"
                >
                  <benefit.icon className="h-8 w-8 text-primary mx-auto mb-4" />
                  <p className="text-sm font-medium text-foreground">{benefit.text}</p>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </section>

      {/* Testimonials Section */}
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
              {t('propertyFinder.testimonials.title')}
            </h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              {t('propertyFinder.testimonials.subtitle')}
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[
              {
                name: t('propertyFinder.testimonials.client1.name'),
                location: t('propertyFinder.testimonials.client1.location'),
                text: t('propertyFinder.testimonials.client1.text'),
                rating: 5
              },
              {
                name: t('propertyFinder.testimonials.client2.name'),
                location: t('propertyFinder.testimonials.client2.location'),
                text: t('propertyFinder.testimonials.client2.text'),
                rating: 5
              },
              {
                name: t('propertyFinder.testimonials.client3.name'),
                location: t('propertyFinder.testimonials.client3.location'),
                text: t('propertyFinder.testimonials.client3.text'),
                rating: 5
              }
            ].map((testimonial, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: index * 0.2 }}
                viewport={{ once: true }}
                className="group"
              >
                <Card className="h-full hover:shadow-xl transition-all duration-300 border-0 bg-gradient-to-br from-white to-gray-50 overflow-hidden">
                  <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-primary/10 to-primary/5 rounded-full -translate-y-16 translate-x-16 opacity-50 group-hover:opacity-70 transition-opacity"></div>
                  <CardContent className="p-8">
                    <div className="flex items-center mb-4">
                      {[...Array(testimonial.rating)].map((_, i) => (
                        <Star key={i} className="h-5 w-5 text-primary fill-current" />
                      ))}
                    </div>
                    <p className="text-muted-foreground leading-relaxed mb-6 italic">
                      "{testimonial.text}"
                    </p>
                    <div className="border-t pt-4">
                      <p className="font-semibold text-foreground">{testimonial.name}</p>
                      <p className="text-sm text-muted-foreground">{testimonial.location}</p>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Property Finder Form Section */}
      <section className="py-20 bg-muted/20 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-primary/5 to-transparent opacity-50" />
        <div className="container-custom relative">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="max-w-4xl mx-auto"
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
                    {t('propertyFinder.form.title')}
                  </CardTitle>
                  <p className="text-muted-foreground text-lg">
                    {t('propertyFinder.form.subtitle')}
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
                    {/* First Name */}
                    <div className="space-y-3">
                      <Label htmlFor="firstName" className="text-sm font-semibold text-foreground flex items-center">
                        {t('propertyFinder.form.firstName')}
                        <span className="text-destructive ml-1">*</span>
                      </Label>
                      <Input
                        id="firstName"
                        type="text"
                        value={formData.firstName}
                        onChange={(e) => handleInputChange('firstName', e.target.value)}
                        required
                        className="h-14 text-lg border-2 transition-all duration-300 focus:border-primary focus:shadow-lg focus:shadow-primary/20"
                      />
                    </div>

                    {/* Last Name */}
                    <div className="space-y-3">
                      <Label htmlFor="lastName" className="text-sm font-semibold text-foreground flex items-center">
                        {t('propertyFinder.form.lastName')}
                        <span className="text-destructive ml-1">*</span>
                      </Label>
                      <Input
                        id="lastName"
                        type="text"
                        value={formData.lastName}
                        onChange={(e) => handleInputChange('lastName', e.target.value)}
                        required
                        className="h-14 text-lg border-2 transition-all duration-300 focus:border-primary focus:shadow-lg focus:shadow-primary/20"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {/* Email */}
                    <div className="space-y-3">
                      <Label htmlFor="email" className="text-sm font-semibold text-foreground flex items-center">
                        {t('propertyFinder.form.email')}
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

                    {/* Phone */}
                    <div className="space-y-3">
                      <Label htmlFor="phone" className="text-sm font-semibold text-foreground flex items-center">
                        {t('propertyFinder.form.phone')}
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
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {/* Property Type */}
                    <div className="space-y-3">
                      <Label htmlFor="propertyType" className="text-sm font-semibold text-foreground flex items-center">
                        {t('propertyFinder.form.propertyType')}
                        <span className="text-destructive ml-1">*</span>
                      </Label>
                      <Select value={formData.propertyType} onValueChange={(value) => handleInputChange('propertyType', value)} required>
                        <SelectTrigger className="h-14 text-lg border-2 transition-all duration-300 focus:border-primary focus:shadow-lg focus:shadow-primary/20">
                          <SelectValue placeholder={t('propertyFinder.form.propertyType')} />
                        </SelectTrigger>
                        <SelectContent className="bg-background border-2 shadow-xl">
                          <SelectItem value="apartment" className="text-lg py-3">
                            {t('propertyFinder.form.propertyTypes.apartment')}
                          </SelectItem>
                          <SelectItem value="house" className="text-lg py-3">
                            {t('propertyFinder.form.propertyTypes.house')}
                          </SelectItem>
                          <SelectItem value="villa" className="text-lg py-3">
                            {t('propertyFinder.form.propertyTypes.villa')}
                          </SelectItem>
                          <SelectItem value="penthouse" className="text-lg py-3">
                            {t('propertyFinder.form.propertyTypes.penthouse')}
                          </SelectItem>
                          <SelectItem value="commercial" className="text-lg py-3">
                            {t('propertyFinder.form.propertyTypes.commercial')}
                          </SelectItem>
                        </SelectContent>
                      </Select>
                    </div>

                    {/* Desired Location */}
                    <div className="space-y-3">
                      <Label htmlFor="location" className="text-sm font-semibold text-foreground flex items-center">
                        {t('propertyFinder.form.location')}
                        <span className="text-destructive ml-1">*</span>
                      </Label>
                      <Input
                        id="location"
                        type="text"
                        value={formData.location}
                        onChange={(e) => handleInputChange('location', e.target.value)}
                        placeholder={t('propertyFinder.form.locationPlaceholder')}
                        required
                        className="h-14 text-lg border-2 transition-all duration-300 focus:border-primary focus:shadow-lg focus:shadow-primary/20"
                      />
                    </div>
                  </div>

                  {/* Budget */}
                  <div className="space-y-3">
                    <Label htmlFor="budget" className="text-sm font-semibold text-foreground flex items-center">
                      {t('propertyFinder.form.budget')}
                      <span className="text-destructive ml-1">*</span>
                    </Label>
                    <Input
                      id="budget"
                      type="text"
                      value={formData.budget}
                      onChange={(e) => handleInputChange('budget', e.target.value)}
                      placeholder={t('propertyFinder.form.budgetPlaceholder')}
                      required
                      className="h-14 text-lg border-2 transition-all duration-300 focus:border-primary focus:shadow-lg focus:shadow-primary/20"
                    />
                  </div>

                  {/* Message */}
                  <div className="space-y-3">
                    <Label htmlFor="message" className="text-sm font-semibold text-foreground flex items-center">
                      {t('propertyFinder.form.message')}
                    </Label>
                    <Textarea
                      id="message"
                      value={formData.message}
                      onChange={(e) => handleInputChange('message', e.target.value)}
                      placeholder={t('propertyFinder.form.messagePlaceholder')}
                      className="min-h-[120px] text-lg border-2 transition-all duration-300 focus:border-primary focus:shadow-lg focus:shadow-primary/20"
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
                          <span>{t('propertyFinder.form.submit')}</span>
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

      {/* Bottom CTA Section */}
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
              {t('propertyFinder.bottomCta.title')}
            </h3>
            <p className="text-lg text-muted-foreground mb-8">
              {t('propertyFinder.bottomCta.description')}
            </p>
            <Button size="lg" className="btn-primary group px-8 py-4 text-lg">
              {t('propertyFinder.cta')}
              <Search className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
            </Button>
          </motion.div>
        </div>
      </section>
    </div>
  );
};
