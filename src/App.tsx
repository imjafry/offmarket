import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Provider } from 'react-redux';
import { store } from '@/store';
import { TranslationProvider } from "@/components/TranslationProvider";
import { AuthProvider } from "@/contexts/AuthContext";
import { PropertyProvider } from "@/contexts/PropertyContext";
import { NotificationProvider } from "@/contexts/NotificationContext";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import ScrollToTop from "@/components/ScrollToTop";
import { HomePage } from "@/pages/Home";
import { PropertiesPage } from "@/pages/Properties";
import { PropertyDetailPage } from "@/pages/PropertyDetail";
import { ServicesPage } from "@/pages/Services";
import { LoginPage } from "@/pages/Login";
import { ContactPage } from "@/pages/Contact";
import { BecomeMemberPage } from "@/pages/BecomeMember";
import { PropertyFinderPage } from "@/pages/PropertyFinder";
import { PrivateSalesPage } from "@/pages/PrivateSales";
import { PropertyVideosPage } from "@/pages/PropertyVideos";
import { ExclusiveAccessPage } from "@/pages/ExclusiveAccess";
import { AccessExpiredPage } from "@/pages/AccessExpired";
import { TermsPage } from "@/pages/legal/Terms";
import { PrivacyPage } from "@/pages/legal/Privacy";
import { NoticesPage } from "@/pages/legal/Notices";
import { SafetyPage } from "@/pages/legal/Safety";
import { AdminLoginPage } from "@/pages/admin/AdminLogin";
import { AdminDashboard } from "@/pages/admin/AdminDashboard";
import { PropertyManagement } from "@/pages/admin/PropertyManagement";
import { PropertyForm } from "@/pages/admin/PropertyForm";
import { AccountManagement } from "@/pages/admin/AccountManagement";
import AdminSettingsPage from "@/pages/admin/Settings";
import AdminPropertyDetailPage from "@/pages/admin/PropertyDetailAdmin";
import AdminUserProfilePage from "@/pages/admin/UserProfileAdmin";
import NotFound from "./pages/NotFound";
import RequireAdmin from "@/components/admin/RequireAdmin";
import { RegisterPage } from "./pages/Register";
import { FavoritesProvider } from "@/contexts/FavoritesContext";
import AdminInquiriesPage from "@/pages/admin/Inquiries";
import AdminContactsPage from "@/pages/admin/Contacts";
import AdminMembershipsPage from "@/pages/admin/Memberships";
import AdminUsersPage from "@/pages/admin/Users";
import FavoritesPage from "@/pages/Favorites";
import ForgotPasswordPage from "@/pages/ForgotPassword";
import ResetPasswordPage from "@/pages/ResetPassword";
import { EmailConfirmationHandler } from "@/components/EmailConfirmationHandler";

const queryClient = new QueryClient();

const App = () => (
  <Provider store={store}>
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <TranslationProvider>
          <AuthProvider>
            <PropertyProvider>
              <FavoritesProvider>
                <NotificationProvider>
                  <BrowserRouter>
              <ScrollToTop />
              <Routes>
                {/* Admin Routes - No main layout wrapper */}
                <Route path="/admin/login" element={<AdminLoginPage />} />
                <Route path="/admin/dashboard" element={<RequireAdmin><AdminDashboard /></RequireAdmin>} />
                <Route path="/admin/properties" element={<RequireAdmin><PropertyManagement /></RequireAdmin>} />
                <Route path="/admin/properties/new" element={<RequireAdmin><PropertyForm /></RequireAdmin>} />
                <Route path="/admin/properties/:id/edit" element={<RequireAdmin><PropertyForm /></RequireAdmin>} />
                <Route path="/admin/properties/:id" element={<RequireAdmin><AdminPropertyDetailPage /></RequireAdmin>} />
                <Route path="/admin/accounts" element={<RequireAdmin><AccountManagement /></RequireAdmin>} />
                <Route path="/admin/accounts/:id" element={<RequireAdmin><AdminUserProfilePage /></RequireAdmin>} />
                <Route path="/admin/users" element={<RequireAdmin><AdminUsersPage /></RequireAdmin>} />
                <Route path="/admin/inquiries" element={<RequireAdmin><AdminInquiriesPage /></RequireAdmin>} />
                <Route path="/admin/contacts" element={<RequireAdmin><AdminContactsPage /></RequireAdmin>} />
                <Route path="/admin/memberships" element={<RequireAdmin><AdminMembershipsPage /></RequireAdmin>} />
                <Route path="/admin/settings" element={<RequireAdmin><AdminSettingsPage /></RequireAdmin>} />
                
                {/* Public Routes - With main layout wrapper */}
                <Route path="*" element={
                  <div className="min-h-screen flex flex-col">
                    <Navbar />
                    <main className="flex-1">
                      <Routes>
                        <Route path="/" element={<HomePage />} />
                        <Route path="/properties" element={<PropertiesPage />} />
                        <Route path="/property/:id" element={<PropertyDetailPage />} />
                        <Route path="/services" element={<ServicesPage />} />
                        <Route path="/contact" element={<ContactPage />} />
                        <Route path="/favorites" element={<FavoritesPage />} />
                        <Route path="/become-member" element={<BecomeMemberPage />} />
                        <Route path="/property-finder" element={<PropertyFinderPage />} />
                        <Route path="/private-sales" element={<PrivateSalesPage />} />
                        <Route path="/property-videos" element={<PropertyVideosPage />} />
                        <Route path="/exclusive-access" element={<ExclusiveAccessPage />} />
                        <Route path="/login" element={<LoginPage />} />
                        <Route path="/register" element={<RegisterPage />} />
                        <Route path="/forgot-password" element={<ForgotPasswordPage />} />
                        <Route path="/reset-password" element={<ResetPasswordPage />} />
                        <Route path="/confirm-email" element={<EmailConfirmationHandler />} />
                        <Route path="/access-expired" element={<AccessExpiredPage />} />
                        <Route path="/legal/terms" element={<TermsPage />} />
                        <Route path="/legal/privacy" element={<PrivacyPage />} />
                        <Route path="/legal/notices" element={<NoticesPage />} />
                        <Route path="/legal/safety" element={<SafetyPage />} />
                        <Route path="*" element={<NotFound />} />
                      </Routes>
                    </main>
                    <Footer />
                  </div>
                } />
              </Routes>
              <Toaster />
              <Sonner />
                  </BrowserRouter>
                </NotificationProvider>
              </FavoritesProvider>
            </PropertyProvider>
          </AuthProvider>
        </TranslationProvider>
      </TooltipProvider>
    </QueryClientProvider>
  </Provider>
);

export default App;
