import { Toaster } from "@/components/ui/toaster"
import { QueryClientProvider } from '@tanstack/react-query'
import { queryClientInstance } from '@/lib/query-client'
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import PageNotFound from './lib/PageNotFound';
import { AuthProvider, useAuth } from '@/lib/AuthContext';
import UserNotRegisteredError from '@/components/UserNotRegisteredError';
import Layout from './components/Layout';
import Home from './pages/Home';
import LandingPage from './pages/LandingPage';
import VouchersPage from './pages/VouchersPage';
import RetailersPage from './pages/RetailersPage';
import TravelAgenciesPage from './pages/TravelAgenciesPage';
import AdminPanel from './pages/AdminPanel';
import RetailerDashboard from './pages/RetailerDashboard';
import TravelerVoucher from './pages/TravelerVoucher';
import ScanVoucher from './pages/ScanVoucher';
import TravelerScan from './pages/TravelerScan';
import GetStarted from './pages/GetStarted';
import PrivacyPolicy from './pages/PrivacyPolicy';
import TermsOfService from './pages/TermsOfService';
import RefundPolicy from './pages/RefundPolicy';
import CodeOfConduct from './pages/CodeOfConduct';
import CookiePolicy from './pages/CookiePolicy';
import DataProcessingAgreement from './pages/DataProcessingAgreement';
import CookieConsentBar from './components/CookieConsentBar';
import FAQ from './pages/FAQ';
import AgencyIntegrationGuide from './pages/AgencyIntegrationGuide';
import AgencyIntegrationPage from './pages/AgencyIntegrationPage';
import UserGuide from './pages/UserGuide';
import AdminDashboard from './pages/AdminDashboard';

const AuthenticatedApp = () => {
  const { isLoadingAuth, isLoadingPublicSettings, authError, navigateToLogin } = useAuth();

  // Show loading spinner while checking app public settings or auth
  if (isLoadingPublicSettings || isLoadingAuth) {
    return (
      <div className="fixed inset-0 flex items-center justify-center">
        <div className="w-8 h-8 border-4 border-slate-200 border-t-slate-800 rounded-full animate-spin"></div>
      </div>
    );
  }

  // Handle authentication errors
  if (authError) {
    if (authError.type === 'user_not_registered') {
      return <UserNotRegisteredError />;
    } else if (authError.type === 'auth_required') {
      const publicPaths = ['/', '/get-started', '/voucher', '/scan', '/privacy', '/terms', '/refunds', '/code-of-conduct', '/cookies', '/faq', '/dpa', '/integration-guide', '/user-guide'];
      if (publicPaths.includes(window.location.pathname)) {
        return (
          <Routes>
            <Route path="/" element={<LandingPage />} />
            <Route path="/get-started" element={<GetStarted />} />
            <Route path="/voucher" element={<TravelerVoucher />} />
            <Route path="/scan" element={<TravelerScan />} />
            <Route path="/privacy" element={<PrivacyPolicy />} />
            <Route path="/terms" element={<TermsOfService />} />
            <Route path="/refunds" element={<RefundPolicy />} />
            <Route path="/code-of-conduct" element={<CodeOfConduct />} />
            <Route path="/cookies" element={<CookiePolicy />} />
            <Route path="/dpa" element={<DataProcessingAgreement />} />
            <Route path="/faq" element={<FAQ />} />
            <Route path="/user-guide" element={<UserGuide />} />
          </Routes>
        );
      }
      navigateToLogin();
      return null;
    }
  }

  // Render the main app
  return (
    <Routes>
      <Route path="/" element={<LandingPage />} />
      <Route path="/voucher" element={<TravelerVoucher />} />
      <Route path="/scan" element={<TravelerScan />} />
      <Route path="/get-started" element={<GetStarted />} />
      <Route path="/privacy" element={<PrivacyPolicy />} />
      <Route path="/terms" element={<TermsOfService />} />
      <Route path="/refunds" element={<RefundPolicy />} />
      <Route path="/code-of-conduct" element={<CodeOfConduct />} />
      <Route path="/cookies" element={<CookiePolicy />} />
      <Route path="/dpa" element={<DataProcessingAgreement />} />
      <Route path="/faq" element={<FAQ />} />
      <Route path="/integration-guide" element={<AgencyIntegrationGuide />} />
      <Route path="/user-guide" element={<UserGuide />} />
      <Route element={<Layout />}>
        <Route path="/dashboard" element={<Home />} />
        <Route path="/vouchers" element={<VouchersPage />} />
        <Route path="/retailers" element={<RetailersPage />} />
        <Route path="/travel-agencies" element={<TravelAgenciesPage />} />
        <Route path="/admin" element={<AdminPanel />} />
        <Route path="/admin-dashboard" element={<AdminDashboard />} />
        <Route path="/retailer-dashboard" element={<RetailerDashboard />} />
        <Route path="/agency-integration" element={<AgencyIntegrationPage />} />
        <Route path="/scan-redeem" element={<ScanVoucher />} />
        <Route path="*" element={<PageNotFound />} />
      </Route>
    </Routes>
  );
};


function App() {

  return (
    <AuthProvider>
      <QueryClientProvider client={queryClientInstance}>
        <Router>
          <AuthenticatedApp />
          <CookieConsentBar />
        </Router>
        <Toaster />
      </QueryClientProvider>
    </AuthProvider>
  )
}

export default App