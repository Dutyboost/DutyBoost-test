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
import TravelPartnerSurveyNL from './pages/TravelPartnerSurveyNL';
import TravelPartnerSurveyES from './pages/TravelPartnerSurveyES';
import TravelPartnerSurveyFR from './pages/TravelPartnerSurveyFR';
import TravelPartnerSurveyDE from './pages/TravelPartnerSurveyDE';
import TravelPartnerSurveyIT from './pages/TravelPartnerSurveyIT';

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
import RetailerCalculator from './pages/RetailerCalculator';
import AirportRetailerSurvey from './pages/AirportRetailerSurvey';
import AirportRetailerSurveyNL from './pages/AirportRetailerSurveyNL';
import AirportRetailerSurveyDE from './pages/AirportRetailerSurveyDE';
import AirportRetailerSurveyES from './pages/AirportRetailerSurveyES';
import AirportRetailerSurveyFR from './pages/AirportRetailerSurveyFR';
import AirportRetailerSurveyIT from './pages/AirportRetailerSurveyIT';
import SurveyDashboard from './pages/SurveyDashboard';
import CruiseShowcase from './pages/CruiseShowcase.jsx';
import CruisePortal from './pages/CruisePortal.jsx';
import CruiseSignup from './pages/CruiseSignup.jsx';
import DemoCruiseDashboard from './pages/DemoCruiseDashboard.jsx';
import TrainShowcase from './pages/TrainShowcase.jsx';
import TrainPortal from './pages/TrainPortal.jsx';
import TrainSignup from './pages/TrainSignup.jsx';
import DemoTrainDashboard from './pages/DemoTrainDashboard.jsx';
import DevWireframe from './pages/DevWireframe';
import RequestDemoPage from './pages/RequestDemoPage';
import AirportRetailerPresentation from './pages/AirportRetailerPresentation';
import TravelPartnerPresentation from './pages/TravelPartnerPresentation';
import AirportRetailerPresentationDark from './pages/AirportRetailerPresentationDark';
import TravelPartnerPresentationDark from './pages/TravelPartnerPresentationDark';
import SchipholRetailerPresentation from './pages/SchipholRetailerPresentation';

const AuthenticatedApp = () => {
  const { isLoadingAuth, isLoadingPublicSettings, authError, navigateToLogin, user } = useAuth();
  const isAdmin = user?.role === 'admin';

  // Show spinner until BOTH loading flags are done — never render routes early
  if (isLoadingPublicSettings || isLoadingAuth) {
    return (
      <div className="fixed inset-0 flex items-center justify-center bg-white">
        <div className="w-8 h-8 border-4 border-slate-200 border-t-slate-800 rounded-full animate-spin"></div>
      </div>
    );
  }

  if (authError) {
    if (authError.type === 'user_not_registered') {
      return <UserNotRegisteredError />;
    }
  }

  // Survey routes are always public
  const surveyRoutes = (
    <>
      <Route path="/travel-partner-survey" element={<TravelPartnerSurvey />} />
      <Route path="/travel-partner-survey-nl" element={<TravelPartnerSurveyNL />} />
      <Route path="/travel-partner-survey-es" element={<TravelPartnerSurveyES />} />
      <Route path="/travel-partner-survey-fr" element={<TravelPartnerSurveyFR />} />
      <Route path="/travel-partner-survey-de" element={<TravelPartnerSurveyDE />} />
      <Route path="/travel-partner-survey-it" element={<TravelPartnerSurveyIT />} />
      <Route path="/airport-port-retailer-survey" element={<AirportRetailerSurvey />} />
      <Route path="/airport-port-retailer-survey-nl" element={<AirportRetailerSurveyNL />} />
      <Route path="/airport-port-retailer-survey-de" element={<AirportRetailerSurveyDE />} />
      <Route path="/airport-port-retailer-survey-es" element={<AirportRetailerSurveyES />} />
      <Route path="/airport-port-retailer-survey-fr" element={<AirportRetailerSurveyFR />} />
      <Route path="/airport-port-retailer-survey-it" element={<AirportRetailerSurveyIT />} />
    </>
  );

  return (
    <>
      <ScrollRestoration />
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/coming-soon" element={<ComingSoonPage />} />
        {surveyRoutes}
        <Route path="/landing" element={<LandingPage />} />
        <Route path="/airport-map" element={<AirportMap />} />
        <Route path="/demo" element={<DemoLanding />} />
        <Route path="/demo/travel-partner" element={<DemoAgencyDashboard />} />
        <Route path="/demo/retailer" element={<DemoRetailerDashboard />} />
        <Route path="/demo/hotel" element={<DemoHotelDashboard />} />
        <Route path="/demo/car-rental" element={<DemoCarRentalDashboard />} />
        <Route path="/demo/cruise" element={<DemoCruiseDashboard />} />
        <Route path="/demo/train" element={<DemoTrainDashboard />} />
        <Route path="/demo/admin" element={<DemoAdminDashboard />} />
        <Route path="/get-started" element={<SelectUserType />} />
        <Route path="/registration" element={<GetStarted />} />
        <Route path="/travel-partner-portal" element={<AgencyPortal />} />
        <Route path="/travel-partner-signup" element={<Navigate to="/get-started" replace />} />
        <Route path="/retailer-showcase" element={<RetailerShowcase />} />
        <Route path="/travel-partner-showcase" element={<AgencyShowcase />} />
        <Route path="/registration-flow" element={<RegistrationFlow />} />
        <Route path="/email-preview" element={<EmailPreview />} />
        <Route path="/travel-partner-one-pager" element={<AgencyOnePager />} />
        <Route path="/retailer-one-pager" element={<RetailerOnePager />} />
        <Route path="/gtm-checklist" element={<GTMTestingChecklist />} />
        <Route path="/staging-validation" element={<StagingValidationGuide />} />
        <Route path="/retailer-calculator" element={<RetailerCalculator />} />
        <Route path="/retailer-portal" element={<RetailerPortal />} />
        <Route path="/retailer-signup" element={<Navigate to="/get-started" replace />} />
        <Route path="/retailer-scan-only" element={<RetailerScanOnly />} />
        <Route path="/hotel-showcase" element={<HotelShowcase />} />
        <Route path="/hotel-portal" element={<HotelPortal />} />
        <Route path="/hotel-signup" element={<Navigate to="/get-started" replace />} />
        <Route path="/car-rental-showcase" element={<CarRentalShowcase />} />
        <Route path="/car-rental-portal" element={<CarRentalPortal />} />
        <Route path="/car-rental-signup" element={<Navigate to="/get-started" replace />} />
        <Route path="/cruise-showcase" element={<CruiseShowcase />} />
        <Route path="/cruise-portal" element={<CruisePortal />} />
        <Route path="/cruise-signup" element={<Navigate to="/get-started" replace />} />
        <Route path="/train-showcase" element={<TrainShowcase />} />
        <Route path="/train-portal" element={<TrainPortal />} />
        <Route path="/train-signup" element={<Navigate to="/get-started" replace />} />
        <Route path="/dev-wireframe" element={<DevWireframe />} />
        <Route path="/request-demo" element={<RequestDemoPage />} />
        <Route path="/retailer-presentation" element={<AirportRetailerPresentation />} />
        <Route path="/travel-partner-presentation" element={<TravelPartnerPresentation />} />
        <Route path="/retailer-presentation-dark" element={<AirportRetailerPresentationDark />} />
        <Route path="/travel-partner-presentation-dark" element={<TravelPartnerPresentationDark />} />
        <Route path="/schiphol-retailer-presentation" element={<SchipholRetailerPresentation />} />
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
          <Route path="/survey-dashboard" element={<SurveyDashboard />} />

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
          <Toaster />
        </Router>
      </QueryClientProvider>
    </AuthProvider>
  )
}

export default App