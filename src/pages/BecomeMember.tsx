import React, { useState } from 'react';
import { ArrowLeft, Send, CheckCircle, AlertCircle } from 'lucide-react';
import { Link } from 'react-router-dom';
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
      {/* Header */}
      <div className="bg-gradient-to-br from-primary via-primary to-primary/90 text-white py-20">
        <div className="container-custom">
          <div className="flex items-center space-x-4 mb-8">
            <Link to="/">
              <Button variant="ghost" size="sm" className="text-white hover:bg-white/20 transition-colors">
                <ArrowLeft className="h-4 w-4 mr-2" />
                {t('language') === 'fr' ? 'Retour' : 'Back'}
              </Button>
            </Link>
          </div>
          
          <div className="max-w-4xl animate-fade-in">
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-heading font-bold mb-6 leading-tight">
              {t('becomeMember.title')}
            </h1>
            <p className="text-xl md:text-2xl text-white/90 leading-relaxed mb-8">
              {t('becomeMember.subtitle')}
            </p>
          </div>
        </div>
      </div>

      {/* Introduction Section */}
      <div className="py-16 bg-background">
        <div className="container-custom">
          <div className="max-w-4xl mx-auto">
            <div className="prose prose-lg max-w-none text-foreground">
              {t('becomeMember.intro').split('\n').map((paragraph, index) => (
                <p key={index} className="mb-6 text-lg leading-relaxed">
                  {paragraph}
                </p>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Membership Form Section */}
      <div className="py-16 bg-muted/30">
        <div className="container-custom">
          <div className="max-w-2xl mx-auto">
            <Card className="shadow-xl border-0 bg-card">
              <CardHeader className="text-center pb-8">
                <CardTitle className="text-2xl md:text-3xl font-heading font-bold text-foreground mb-2">
                  {t('becomeMember.form.title')}
                </CardTitle>
              </CardHeader>
              <CardContent className="p-8">
                <form onSubmit={handleSubmit} className="space-y-6">
                  {/* Full Name */}
                  <div className="space-y-2">
                    <Label htmlFor="fullName" className="text-sm font-medium text-foreground">
                      {t('becomeMember.form.fullName')} *
                    </Label>
                    <Input
                      id="fullName"
                      type="text"
                      value={formData.fullName}
                      onChange={(e) => handleInputChange('fullName', e.target.value)}
                      required
                      className="h-12 transition-all duration-200 focus:ring-2 focus:ring-primary"
                    />
                  </div>

                  {/* Email */}
                  <div className="space-y-2">
                    <Label htmlFor="email" className="text-sm font-medium text-foreground">
                      {t('becomeMember.form.email')} *
                    </Label>
                    <Input
                      id="email"
                      type="email"
                      value={formData.email}
                      onChange={(e) => handleInputChange('email', e.target.value)}
                      required
                      className="h-12 transition-all duration-200 focus:ring-2 focus:ring-primary"
                    />
                  </div>

                  {/* Phone */}
                  <div className="space-y-2">
                    <Label htmlFor="phone" className="text-sm font-medium text-foreground">
                      {t('becomeMember.form.phone')} *
                    </Label>
                    <Input
                      id="phone"
                      type="tel"
                      value={formData.phone}
                      onChange={(e) => handleInputChange('phone', e.target.value)}
                      required
                      className="h-12 transition-all duration-200 focus:ring-2 focus:ring-primary"
                    />
                  </div>

                  {/* Profile */}
                  <div className="space-y-2">
                    <Label htmlFor="profile" className="text-sm font-medium text-foreground">
                      {t('becomeMember.form.profile')} *
                    </Label>
                    <Select value={formData.profile} onValueChange={(value) => handleInputChange('profile', value)} required>
                      <SelectTrigger className="h-12 transition-all duration-200 focus:ring-2 focus:ring-primary">
                        <SelectValue placeholder={t('becomeMember.form.profile')} />
                      </SelectTrigger>
                      <SelectContent className="bg-background border shadow-lg">
                        <SelectItem value="looking">{t('becomeMember.form.profileOptions.looking')}</SelectItem>
                        <SelectItem value="owner">{t('becomeMember.form.profileOptions.owner')}</SelectItem>
                        <SelectItem value="other">{t('becomeMember.form.profileOptions.other')}</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  {/* Project */}
                  <div className="space-y-2">
                    <Label htmlFor="project" className="text-sm font-medium text-foreground">
                      {t('becomeMember.form.project')} *
                    </Label>
                    <Input
                      id="project"
                      type="text"
                      value={formData.project}
                      onChange={(e) => handleInputChange('project', e.target.value)}
                      placeholder={t('becomeMember.form.projectPlaceholder')}
                      required
                      className="h-12 transition-all duration-200 focus:ring-2 focus:ring-primary"
                    />
                  </div>

                  {/* Submit Button */}
                  <Button 
                    type="submit" 
                    className="w-full h-12 text-lg font-medium transition-all duration-200 hover:scale-[1.02] disabled:hover:scale-100"
                    disabled={isSubmitting}
                  >
                    {isSubmitting ? (
                      <div className="flex items-center space-x-2">
                        <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white"></div>
                        <span>{t('common.loading')}</span>
                      </div>
                    ) : (
                      <div className="flex items-center space-x-2">
                        <Send className="h-4 w-4" />
                        <span>{t('becomeMember.form.submit')}</span>
                      </div>
                    )}
                  </Button>
                </form>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>

      {/* Contact Info Footer */}
      <div className="py-12 bg-background border-t">
        <div className="container-custom">
          <div className="text-center">
            <h3 className="text-xl font-heading font-semibold text-foreground mb-4">
              {t('contact.title')}
            </h3>
            <div className="space-y-2 text-muted-foreground">
              <p className="flex items-center justify-center space-x-2">
                <span>{t('contact.emailAddress')}</span>
              </p>
              <p className="flex items-center justify-center space-x-2">
                <span>{t('contact.phoneNumber')}</span>
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
