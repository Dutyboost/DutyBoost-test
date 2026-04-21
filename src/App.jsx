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

  if (isLoadingPublicSettings || isLoadingAuth) {
    return (
      <div className="fixed inset-0 flex items-center justify-center">
        <div className="w-8 h-8 border-4 border-slate-200 border-t-slate-800 rounded-full animate-spin"></div>
      </div>
    );
  }

  if (authError) {
    if (authError.type === 'user_not_registered') {
      return <UserNotRegisteredError />;
    } else if (authError.type === 'auth_required') {
      return (
        <>
          <ScrollRestoration />
          <Routes>
            <Route path="*" element={<ComingSoonPage />} />
          </Routes>
        </>
      );
    }
  }

  return (
    <>
      <ScrollRestoration />
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/coming-soon" element={<ComingSoonPage />} />
        <Route path="/landing" element={isAdmin ? <LandingPage /> : <ComingSoonPage />} />
        <Route path="/airport-map" element={isAdmin ? <AirportMap /> : <ComingSoonPage />} />
        <Route path="/demo" element={isAdmin ? <DemoLanding /> : <ComingSoonPage />} />
        <Route path="/demo/travel-partner" element={isAdmin ? <DemoAgencyDashboard /> : <ComingSoonPage />} />
        <Route path="/demo/retailer" element={isAdmin ? <DemoRetailerDashboard /> : <ComingSoonPage />} />
        <Route path="/demo/hotel" element={isAdmin ? <DemoHotelDashboard /> : <ComingSoonPage />} />
        <Route path="/demo/car-rental" element={isAdmin ? <DemoCarRentalDashboard /> : <ComingSoonPage />} />
        <Route path="/demo/admin" element={isAdmin ? <DemoAdminDashboard /> : <ComingSoonPage />} />
        <Route path="/get-started" element={isAdmin ? <SelectUserType /> : <ComingSoonPage />} />
        <Route path="/registration" element={isAdmin ? <GetStarted /> : <ComingSoonPage />} />
        <Route path="/travel-partner-portal" element={isAdmin ? <AgencyPortal /> : <ComingSoonPage />} />
        <Route path="/travel-partner-signup" element={isAdmin ? <AgencySignup /> : <ComingSoonPage />} />
        <Route path="/retailer-showcase" element={isAdmin ? <RetailerShowcase /> : <ComingSoonPage />} />
        <Route path="/travel-partner-showcase" element={isAdmin ? <AgencyShowcase /> : <ComingSoonPage />} />
        <Route path="/registration-flow" element={isAdmin ? <RegistrationFlow /> : <ComingSoonPage />} />
        <Route path="/email-preview" element={isAdmin ? <EmailPreview /> : <ComingSoonPage />} />
        <Route path="/travel-partner-one-pager" element={isAdmin ? <AgencyOnePager /> : <ComingSoonPage />} />
        <Route path="/retailer-one-pager" element={isAdmin ? <RetailerOnePager /> : <ComingSoonPage />} />
        <Route path="/gtm-checklist" element={isAdmin ? <GTMTestingChecklist /> : <ComingSoonPage />} />
        <Route path="/staging-validation" element={isAdmin ? <StagingValidationGuide /> : <ComingSoonPage />} />
        <Route path="/retailer-future-presentation" element={isAdmin ? <RetailerPresentationFuture /> : <ComingSoonPage />} />
        <Route path="/retailer-calculator" element={isAdmin ? <RetailerCalculator /> : <ComingSoonPage />} />
        <Route path="/travel-partner-presentation" element={isAdmin ? <TravelPartnerPresentationFuture /> : <ComingSoonPage />} />
        <Route path="/retailer-portal" element={isAdmin ? <RetailerPortal /> : <ComingSoonPage />} />
        <Route path="/retailer-signup" element={isAdmin ? <RetailerSignup /> : <ComingSoonPage />} />
        <Route path="/retailer-scan-only" element={isAdmin ? <RetailerScanOnly /> : <ComingSoonPage />} />
        <Route path="/hotel-showcase" element={isAdmin ? <HotelShowcase /> : <ComingSoonPage />} />
        <Route path="/hotel-portal" element={isAdmin ? <HotelPortal /> : <ComingSoonPage />} />
        <Route path="/hotel-signup" element={isAdmin ? <HotelSignup /> : <ComingSoonPage />} />
        <Route path="/car-rental-showcase" element={isAdmin ? <CarRentalShowcase /> : <ComingSoonPage />} />
        <Route path="/car-rental-portal" element={isAdmin ? <CarRentalPortal /> : <ComingSoonPage />} />
        <Route path="/car-rental-signup" element={isAdmin ? <CarRentalSignup /> : <ComingSoonPage />} />
        <Route path="/privacy" element={isAdmin ? <PrivacyPolicy /> : <ComingSoonPage />} />
        <Route path="/terms" element={isAdmin ? <TermsOfService /> : <ComingSoonPage />} />
        <Route path="/refunds" element={isAdmin ? <RefundPolicy /> : <ComingSoonPage />} />
        <Route path="/code-of-conduct" element={isAdmin ? <CodeOfConduct /> : <ComingSoonPage />} />
        <Route path="/cookies" element={isAdmin ? <CookiePolicy /> : <ComingSoonPage />} />
        <Route path="/dpa" element={isAdmin ? <DataProcessingAgreement /> : <ComingSoonPage />} />
        <Route path="/faq" element={isAdmin ? <FAQ /> : <ComingSoonPage />} />
        <Route path="/travel-partner-integration-guide" element={isAdmin ? <AgencyIntegrationGuide /> : <ComingSoonPage />} />
        <Route path="/retailer-integration-guide" element={isAdmin ? <RetailerIntegrationGuide /> : <ComingSoonPage />} />
        <Route path="/user-guide" element={isAdmin ? <UserGuide /> : <ComingSoonPage />} />
        <Route element={<Layout />}>
          <Route path="/dashboard" element={<Home />} />
          <Route path="/vouchers" element={<VouchersPage />} />
          <Route path="/retailers" element={<RetailersPage />} />
          <Route path="/travel-partners" element={<TravelAgenciesPage />} />
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