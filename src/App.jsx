import { Toaster } from "@/components/ui/toaster"
import { QueryClientProvider } from '@tanstack/react-query'
import { queryClientInstance } from '@/lib/query-client'
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import PageNotFound from './lib/PageNotFound';
import { AuthProvider, useAuth } from '@/lib/AuthContext';
import UserNotRegisteredError from '@/components/UserNotRegisteredError';
import Layout from './components/Layout';
import ScrollRestoration from './components/ScrollRestoration';
import Home from './pages/Home';
import LandingPage from './pages/LandingPage';
import VouchersPage from './pages/VouchersPage';
import RetailersPage from './pages/RetailersPage';
import TravelAgenciesPage from './pages/TravelAgenciesPage';
import AdminPanel from './pages/AdminPanel';
import RetailerDashboard from './pages/RetailerDashboard';
import ScanVoucher from './pages/ScanVoucher';
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
import RetailerIntegrationGuide from './pages/RetailerIntegrationGuide';
import UserGuide from './pages/UserGuide';
import AdminDashboard from './pages/AdminDashboard';
import SelectUserType from './pages/SelectUserType';
import AirportMap from './pages/AirportMap';
import DemoLanding from './pages/DemoLanding';
import LeadsAdmin from './pages/LeadsAdmin';
import DemoAgencyDashboard from './pages/DemoAgencyDashboard';
import DemoRetailerDashboard from './pages/DemoRetailerDashboard';
import DemoAdminDashboard from './pages/DemoAdminDashboard';
import RetailerScanQR from './pages/RetailerScanQR';
import BusinessTravel from './pages/BusinessTravel';
import BusinessTravelGetStarted from './pages/BusinessTravelGetStarted';
import CorporateTravelAdmin from './pages/CorporateTravelAdmin';
import CorporateTravelDashboard from './pages/CorporateTravelDashboard';
import DemoCorporateDashboard from './pages/DemoCorporateDashboard';
import CorporateBudgetAllocation from './pages/CorporateBudgetAllocation';
import RetailerScanOnly from './pages/RetailerScanOnly';
import HotelShowcase from './pages/HotelShowcase';
import CarRentalShowcase from './pages/CarRentalShowcase';
import HotelPortal from './pages/HotelPortal';
import CarRentalPortal from './pages/CarRentalPortal';
import HotelSignup from './pages/HotelSignup';
import CarRentalSignup from './pages/CarRentalSignup';
import DemoHotelDashboard from './pages/DemoHotelDashboard';
import DemoCarRentalDashboard from './pages/DemoCarRentalDashboard';
import TravelPartnerSurvey from './pages/TravelPartnerSurvey';

import AgencyPortal from './pages/AgencyPortal';
import ComingSoonPage from './pages/ComingSoonPage';
import AgencySignup from './pages/AgencySignup';
import RetailerPortal from './pages/RetailerPortal';
import RetailerSignup from './pages/RetailerSignup';
import RetailerShowcase from './pages/RetailerShowcase';
import AgencyShowcase from './pages/AgencyShowcase';
import RegistrationFlow from './pages/RegistrationFlow';
import EmailPreview from './pages/EmailPreview';
import AgencyOnePager from './pages/AgencyOnePager';
import RetailerOnePager from './pages/RetailerOnePager';
import GTMTestingChecklist from './pages/GTMTestingChecklist';
import StagingValidationGuide from './pages/StagingValidationGuide';
import RetailerPresentationFuture from './pages/RetailerPresentationFuture';
import RetailerCalculator from './pages/RetailerCalculator';
import TravelPartnerPresentationFuture from './pages/TravelPartnerPresentationFuture';

const AuthenticatedApp = () => {
  const { isLoadingAuth, isLoadingPublicSettings, authError, navigateToLogin, user } = useAuth();
  const isAdmin = user?.role === 'admin';

  // Always allow these two public routes regardless of auth state
  const publicRoutes = (
    <>
      <ScrollRestoration />
      <Routes>
        <Route path="/travel-partner-survey" element={<TravelPartnerSurvey />} />
        <Route path="*" element={<ComingSoonPage />} />
      </Routes>
    </>
  );

  if (isLoadingPublicSettings || isLoadingAuth) {
    // While loading, still serve public routes instantly if on a public path
    const path = window.location.pathname;
    if (path === '/travel-partner-survey' || path === '/') {
      return publicRoutes;
    }
    return (
      <div className="fixed inset-0 flex items-center justify-center">
        <div className="w-8 h-8 border-4 border-slate-200 border-t-slate-800 rounded-full animate-spin"></div>
      </div>
    );
  }

  if (authError) {
    if (authError.type === 'user_not_registered') {
      return <UserNotRegisteredError />;
    }
    return publicRoutes;
  }

  // Non-admins: survey at its URL, everything else → coming soon
  if (!isAdmin) {
    return publicRoutes;
  }

  // Admin-only routes
  return (
    <>
      <ScrollRestoration />
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/coming-soon" element={<ComingSoonPage />} />
        <Route path="/travel-partner-survey" element={<TravelPartnerSurvey />} />
        <Route path="/landing" element={<LandingPage />} />
        <Route path="/airport-map" element={<AirportMap />} />
        <Route path="/demo" element={<DemoLanding />} />
        <Route path="/demo/travel-partner" element={<DemoAgencyDashboard />} />
        <Route path="/demo/retailer" element={<DemoRetailerDashboard />} />
        <Route path="/demo/hotel" element={<DemoHotelDashboard />} />
        <Route path="/demo/car-rental" element={<DemoCarRentalDashboard />} />
        <Route path="/demo/admin" element={<DemoAdminDashboard />} />
        <Route path="/get-started" element={<SelectUserType />} />
        <Route path="/registration" element={<GetStarted />} />
        <Route path="/travel-partner-portal" element={<AgencyPortal />} />
        <Route path="/travel-partner-signup" element={<AgencySignup />} />
        <Route path="/retailer-showcase" element={<RetailerShowcase />} />
        <Route path="/travel-partner-showcase" element={<AgencyShowcase />} />
        <Route path="/registration-flow" element={<RegistrationFlow />} />
        <Route path="/email-preview" element={<EmailPreview />} />
        <Route path="/travel-partner-one-pager" element={<AgencyOnePager />} />
        <Route path="/retailer-one-pager" element={<RetailerOnePager />} />
        <Route path="/gtm-checklist" element={<GTMTestingChecklist />} />
        <Route path="/staging-validation" element={<StagingValidationGuide />} />
        <Route path="/retailer-future-presentation" element={<RetailerPresentationFuture />} />
        <Route path="/retailer-calculator" element={<RetailerCalculator />} />
        <Route path="/travel-partner-presentation" element={<TravelPartnerPresentationFuture />} />
        <Route path="/retailer-portal" element={<RetailerPortal />} />
        <Route path="/retailer-signup" element={<RetailerSignup />} />
        <Route path="/retailer-scan-only" element={<RetailerScanOnly />} />
        <Route path="/hotel-showcase" element={<HotelShowcase />} />
        <Route path="/hotel-portal" element={<HotelPortal />} />
        <Route path="/hotel-signup" element={<HotelSignup />} />
        <Route path="/car-rental-showcase" element={<CarRentalShowcase />} />
        <Route path="/car-rental-portal" element={<CarRentalPortal />} />
        <Route path="/car-rental-signup" element={<CarRentalSignup />} />
        <Route path="/privacy" element={<PrivacyPolicy />} />
        <Route path="/terms" element={<TermsOfService />} />
        <Route path="/refunds" element={<RefundPolicy />} />
        <Route path="/code-of-conduct" element={<CodeOfConduct />} />
        <Route path="/cookies" element={<CookiePolicy />} />
        <Route path="/dpa" element={<DataProcessingAgreement />} />
        <Route path="/faq" element={<FAQ />} />
        <Route path="/travel-partner-integration-guide" element={<AgencyIntegrationGuide />} />
        <Route path="/retailer-integration-guide" element={<RetailerIntegrationGuide />} />
        <Route path="/user-guide" element={<UserGuide />} />
        <Route element={<Layout />}>
          <Route path="/dashboard" element={<Home />} />
          <Route path="/vouchers" element={<VouchersPage />} />
          <Route path="/retailers" element={<RetailersPage />} />
          <Route path="/travel-partners" element={<TravelAgenciesPage />} />
          <Route path="/hotels" element={<HotelPortal />} />
          <Route path="/car-rentals" element={<CarRentalPortal />} />
          <Route path="/admin" element={<AdminPanel />} />
          <Route path="/admin-dashboard" element={<AdminDashboard />} />
          <Route path="/retailer-dashboard" element={<RetailerDashboard />} />
          <Route path="/travel-partner-integration" element={<AgencyIntegrationPage />} />
          <Route path="/scan-redeem" element={<ScanVoucher />} />
          <Route path="/retailer-scan" element={<RetailerScanQR />} />
          <Route path="/leads-admin" element={<LeadsAdmin />} />
          <Route path="*" element={<PageNotFound />} />
        </Route>
      </Routes>
    </>
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