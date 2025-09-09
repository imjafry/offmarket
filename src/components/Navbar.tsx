import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Globe, LogOut, User } from 'lucide-react';
import { useTranslation } from '@/hooks/useTranslation';
import { useAuth } from '@/contexts/AuthContext';
import { Button } from '@/components/ui/button';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuSeparator, DropdownMenuTrigger } from '@/components/ui/dropdown-menu';

export const Navbar: React.FC = () => {
  const { t, language, setLanguage } = useTranslation();
  const { isAuthenticated, user, logout } = useAuth();
  const location = useLocation();

  const toggleLanguage = () => {
    setLanguage(language === 'fr' ? 'en' : 'fr');
  };

  const handleNavClick = (item: any) => {
    if (item.scrollTo) {
      if (location.pathname === '/') {
        // If we're on the home page, scroll to the section
        const element = document.getElementById(item.scrollTo);
        if (element) {
          element.scrollIntoView({ 
            behavior: 'smooth',
            block: 'start'
          });
          return;
        }
      } else {
        // If we're not on the home page, navigate to home first, then scroll
        window.location.href = '/#' + item.scrollTo;
        return;
      }
    }
    // Otherwise, navigate normally
    window.location.href = item.path;
  };

  const navItems = [
    { key: 'home', path: '/' },
    { key: 'properties', path: '/properties' },
    { key: 'services', path: '/services', scrollTo: 'services-section' },
    { key: 'contact', path: '/contact' },
  ];

  return (
    <nav className="bg-white/95 backdrop-blur-md border-b border-gray-200/50 sticky top-0 z-50 shadow-sm">
      <div className="container-custom">
        <div className="flex items-center justify-between h-20">
          {/* Logo */}
          <Link 
            to="/" 
            className="text-2xl font-heading font-bold bg-gradient-to-r from-primary to-primary/80 bg-clip-text text-transparent hover:from-primary/80 hover:to-primary/60 transition-all duration-300"
          >
            OffMarket
          </Link>

          {/* Navigation Links */}
          <div className="hidden md:flex items-center space-x-1">
            {navItems.map((item) => (
              <button
                key={item.key}
                onClick={() => handleNavClick(item)}
                className={`relative px-4 py-2 text-sm font-semibold transition-all duration-300 rounded-lg group ${
                  location.pathname === item.path 
                    ? 'text-primary bg-primary/10' 
                    : 'text-gray-800 hover:text-primary hover:bg-gray-50'
                }`}
              >
                {t(`navigation.${item.key}`)}
                {location.pathname === item.path && (
                  <div className="absolute bottom-0 left-1/2 transform -translate-x-1/2 w-1 h-1 bg-primary rounded-full"></div>
                )}
              </button>
            ))}
          </div>

          {/* Language Switcher & Auth */}
          <div className="flex items-center space-x-3">
            <Button
              variant="ghost"
              size="sm"
              onClick={toggleLanguage}
              className="flex items-center space-x-2 px-3 py-2 rounded-lg hover:bg-gray-100 transition-all duration-200"
            >
              <Globe className="h-4 w-4 text-gray-700" />
              <span className="text-sm font-medium text-gray-800 uppercase">
                {language}
              </span>
            </Button>
            
            {isAuthenticated ? (
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="outline" size="sm" className="flex items-center space-x-2 px-4 py-2 border-gray-300 text-gray-800 hover:border-primary/50 hover:bg-primary/5 transition-all duration-200">
                    <User className="h-4 w-4" />
                    <span className="font-medium">{user?.username}</span>
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end" className="w-48">
                  <DropdownMenuItem className="px-4 py-2">
                    <User className="mr-3 h-4 w-4" />
                    {t('language') === 'fr' ? 'Profil' : 'Profile'}
                  </DropdownMenuItem>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem onClick={logout} className="px-4 py-2 text-red-600 hover:bg-red-50">
                    <LogOut className="mr-3 h-4 w-4" />
                    {t('language') === 'fr' ? 'Déconnexion' : 'Logout'}
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            ) : (
              <Link to="/login">
                <Button 
                  variant="outline" 
                  size="sm" 
                  className="px-6 py-2 border-primary text-primary hover:bg-primary hover:text-white transition-all duration-200 font-semibold"
                >
                  {t('navigation.login')}
                </Button>
              </Link>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
};