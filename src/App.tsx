import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { TranslationProvider } from "@/components/TranslationProvider";
import { AuthProvider } from "@/contexts/AuthContext";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { HomePage } from "@/pages/Home";
import { PropertiesPage } from "@/pages/Properties";
import { PropertyDetailPage } from "@/pages/PropertyDetail";
import { LoginPage } from "@/pages/Login";
import { ContactPage } from "@/pages/Contact";
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
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <TranslationProvider>
        <AuthProvider>
          <BrowserRouter>
            <Routes>
              {/* Admin Routes - No main layout wrapper */}
              <Route path="/admin/login" element={<AdminLoginPage />} />
              <Route path="/admin/dashboard" element={<AdminDashboard />} />
              <Route path="/admin/properties" element={<PropertyManagement />} />
              <Route path="/admin/properties/new" element={<PropertyForm />} />
              <Route path="/admin/properties/:id/edit" element={<PropertyForm />} />
              <Route path="/admin/accounts" element={<AccountManagement />} />
              
              {/* Public Routes - With main layout wrapper */}
              <Route path="*" element={
                <div className="min-h-screen flex flex-col">
                  <Navbar />
                  <main className="flex-1">
                    <Routes>
                      <Route path="/" element={<HomePage />} />
                      <Route path="/properties" element={<PropertiesPage />} />
                      <Route path="/property/:id" element={<PropertyDetailPage />} />
                      <Route path="/contact" element={<ContactPage />} />
                      <Route path="/login" element={<LoginPage />} />
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
        </AuthProvider>
      </TranslationProvider>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
