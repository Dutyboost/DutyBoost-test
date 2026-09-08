import { Toaster } from "@/components/ui/toaster"
import { QueryClientProvider } from '@tanstack/react-query'
import { queryClientInstance } from '@/lib/query-client'
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import PageNotFound from './lib/PageNotFound';
import { AuthProvider, useAuth } from '@/lib/AuthContext';
import UserNotRegisteredError from '@/components/UserNotRegisteredError';
import Layout from './components/Layout';
import ScrollRestoration from './components/ScrollRestoration';
import TrafficTracker from './components/TrafficTracker';
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

import DemoDisclaimer from './components/DemoDisclaimer';
import FAQ from './pages/FAQ';
import AgencyIntegrationGuide from './pages/AgencyIntegrationGuide';
import AgencyIntegrationPage from './pages/AgencyIntegrationPage';
import RetailerIntegrationGuide from './pages/RetailerIntegrationGuide';
import UserGuide from './pages/UserGuide';
import AdminDashboard from './pages/AdminDashboard';
import SelectUserType from './pages/SelectUserType';

import DemoLanding from './pages/DemoLanding';
import LeadsAdmin from './pages/LeadsAdmin';
import DemoAgencyDashboard from './pages/DemoAgencyDashboard';
import DemoRetailerDashboard from './pages/DemoRetailerDashboard';
import DemoRetailerDashboardHeinemann from './pages/DemoRetailerDashboardHeinemann';
import DemoRetailerDashboardAvolta from './pages/DemoRetailerDashboardAvolta';
import DemoRetailerDashboardAvoltaAruba from './pages/DemoRetailerDashboardAvoltaAruba';
import DemoRetailerDashboardDFPWorld from './pages/DemoRetailerDashboardDFPWorld';
import DemoRetailerDashboardSintMaarten from './pages/DemoRetailerDashboardSintMaarten';
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
import SurveyAirportRetailer from './pages/SurveyAirportRetailer';
import SurveyTravelPartner from './pages/SurveyTravelPartner';
import SurveyPosProvider from './pages/SurveyPosProvider';
import SurveyCorporatePartner from './pages/SurveyCorporatePartner';

import AgencyPortal from './pages/AgencyPortal';
import ComingSoonPage from './pages/ComingSoonPage';
import AgencySignup from './pages/AgencySignup';
import RetailerPortal from './pages/RetailerPortal';
import RetailerSignup from './pages/RetailerSignup';
import RetailerShowcase from './pages/RetailerShowcase';
import AgencyShowcase from './pages/AgencyShowcase';
import RegistrationFlow from './pages/RegistrationFlow';
import EmailPreview from './pages/EmailPreview';
import FlightPartnerOnePager from './pages/FlightPartnerOnePager';
import AccommodationPartnerOnePager from './pages/AccommodationPartnerOnePager';
import CarRentalPartnerOnePager from './pages/CarRentalPartnerOnePager';
import RetailerOnePager from './pages/RetailerOnePager';
import CorporatePartnerOnePager from './pages/CorporatePartnerOnePager';
import AgglomerationTravelPartnerOnePager from './pages/TravelStackOnePager';
import GTMTestingChecklist from './pages/GTMTestingChecklist';
import StagingValidationGuide from './pages/StagingValidationGuide';
import RetailerCalculator from './pages/RetailerCalculator';
import TravelPartnerCalculator from './pages/TravelPartnerCalculator';
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
import MagicLinkLogin from './pages/MagicLinkLogin';
import CircularRevenueFlow from './pages/CircularRevenueFlow';
import LetterOfIntent from './pages/LetterOfIntent';
import LetterOfIntentRetailer from './pages/LetterOfIntentRetailer';
import BrandGuidelines from './pages/BrandGuidelines';
import ClaimDutyCredit from './pages/ClaimDutyCredit';
import PosChannelPartner from './pages/PosChannelPartner';
import PosPartnerCallback from './pages/PosPartnerCallback';
import PosPartnerOnePager from './pages/PosPartnerOnePager';
import WhyDutyBoostOnePager from './pages/WhyDutyBoostOnePager';
import EligibilityShowcase from './pages/EligibilityShowcase';
import DutyBoostPresentation from './pages/DutyBoostPresentation';
import DutyBoostPresentationGlobal from './pages/DutyBoostPresentationGlobal';
import DutyBoostPresentationAruba from './pages/DutyBoostPresentationAruba';
import DutyBoostPresentationZim from './pages/DutyBoostPresentationZim';
import DutyBoostPresentationSintMaarten from './pages/DutyBoostPresentationSintMaarten';
import PatentPresentation from './pages/PatentPresentation';
import PatentDisclosureDocument from './pages/PatentDisclosureDocument';
import InvestorPitchDeck from './pages/InvestorPitchDeck';
import RetailerPitchDeck from './pages/RetailerPitchDeck';
import RetailerPitchDeckCaribbean from './pages/RetailerPitchDeckCaribbean';
import RetailerSupplierPitchDeckSxm from './pages/RetailerSupplierPitchDeckSxm';
import AirportPitchDeck from './pages/AirportPitchDeck';
import PosProviderPitchDeck from './pages/PosProviderPitchDeck';
import PosProviderPitchDeckUsd from './pages/PosProviderPitchDeckUsd';
import TravelPartnerPitchDeck from './pages/TravelPartnerPitchDeck';
import CorporatePartnerPitchDeck from './pages/CorporatePartnerPitchDeck';
import CorporatePartnerShowcase from './pages/CorporatePartnerShowcase';
import CorporatePartnerRequest from './pages/CorporatePartnerRequest';
import CorporatePartnerCalculator from './pages/CorporatePartnerCalculator';
import AirportRetailersCampaignList from './pages/AirportRetailersCampaignList';

const AuthenticatedApp = () => {
  const { isLoadingAuth, isLoadingPublicSettings, authError, navigateToLogin, user, isAuthenticated } = useAuth();
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

  // If authenticated but no role assigned, this user was never invited via magic link — redirect to get-started
  if (isAuthenticated && user && !user.role) {
    return (
      <Routes>
        <Route path="/get-started" element={<SelectUserType />} />
        <Route path="*" element={<Navigate to="/get-started" replace />} />
      </Routes>
    );
  }

  // Survey routes are always public
  const surveyRoutes = (
    <>
      <Route path="/survey-airport-retailer" element={<SurveyAirportRetailer />} />
      <Route path="/survey-travel-partner" element={<SurveyTravelPartner />} />
      <Route path="/survey-pos-provider" element={<SurveyPosProvider />} />
      <Route path="/survey-corporate-partner" element={<SurveyCorporatePartner />} />
    </>
  );

  return (
    <>
      <ScrollRestoration />
      <TrafficTracker />
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/coming-soon" element={<ComingSoonPage />} />
        {surveyRoutes}
        <Route path="/landing" element={<LandingPage />} />

        <Route path="/demo" element={<DemoLanding />} />
        <Route path="/demo/travel-partner" element={<DemoAgencyDashboard />} />
        <Route path="/demo/retailer" element={<Navigate to="/demo/retailer-lagardere" replace />} />
        <Route path="/demo/retailer-lagardere" element={<DemoRetailerDashboard />} />
        <Route path="/demo/retailer-heinemann" element={<DemoRetailerDashboardHeinemann />} />
        <Route path="/demo/retailer-avolta" element={<DemoRetailerDashboardAvolta />} />
        <Route path="/demo/retailer-avolta-aruba" element={<DemoRetailerDashboardAvoltaAruba />} />
        <Route path="/demo/retailer-dfp-world" element={<DemoRetailerDashboardDFPWorld />} />
        <Route path="/demo/retailer-sint-maarten" element={<DemoRetailerDashboardSintMaarten />} />
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
        <Route path="/flight-showcase" element={<AgencyShowcase />} />
        <Route path="/registration-flow" element={<RegistrationFlow />} />
        <Route path="/email-preview" element={<EmailPreview />} />
        <Route path="/flight-partner-one-pager" element={<FlightPartnerOnePager />} />
        <Route path="/accommodation-partner-one-pager" element={<AccommodationPartnerOnePager />} />
        <Route path="/car-rental-partner-one-pager" element={<CarRentalPartnerOnePager />} />
        <Route path="/retailer-one-pager" element={<RetailerOnePager />} />
        <Route path="/agglomeration-travel-partner-one-pager" element={<AgglomerationTravelPartnerOnePager />} />
        <Route path="/gtm-checklist" element={<GTMTestingChecklist />} />
        <Route path="/staging-validation" element={<StagingValidationGuide />} />
        <Route path="/retailer-calculator" element={<RetailerCalculator />} />
        <Route path="/roi-calculator" element={<RetailerCalculator />} />
        <Route path="/roi-calculator-travel-partner" element={<TravelPartnerCalculator />} />
        <Route path="/retailer-portal" element={<RetailerPortal />} />
        <Route path="/retailer-signup" element={<Navigate to="/get-started" replace />} />
        <Route path="/retailer-scan-only" element={<RetailerScanOnly />} />
        <Route path="/accommodation-showcase" element={<HotelShowcase />} />
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
        <Route path="/request-more-information" element={<RequestDemoPage />} />
        <Route path="/retailer-presentation" element={<AirportRetailerPresentation />} />
        <Route path="/travel-partner-presentation" element={<TravelPartnerPresentation />} />
        <Route path="/retailer-presentation-dark" element={<AirportRetailerPresentationDark />} />
        <Route path="/travel-partner-presentation-dark" element={<TravelPartnerPresentationDark />} />
        <Route path="/schiphol-retailer-presentation" element={<SchipholRetailerPresentation />} />
        <Route path="/login" element={<MagicLinkLogin />} />
        <Route path="/circular-revenue-flow" element={<CircularRevenueFlow />} />
        <Route path="/circular-revenue-flow/:lang" element={<CircularRevenueFlow />} />
        <Route path="/letter-of-intent" element={<LetterOfIntent />} />
        <Route path="/letter-of-intent-retailer" element={<LetterOfIntentRetailer />} />
        <Route path="/brand-guidelines" element={<BrandGuidelines />} />
        <Route path="/claim-duty-credit" element={<ClaimDutyCredit />} />
        <Route path="/pos-partner" element={<PosChannelPartner />} />
        <Route path="/pos-partner-one-pager" element={<PosPartnerOnePager />} />
        <Route path="/why-dutyboost" element={<WhyDutyBoostOnePager />} />
        <Route path="/pos-partner-callback" element={<PosPartnerCallback />} />
        <Route path="/eligibility-showcase" element={<EligibilityShowcase />} />
        <Route path="/dutyboost-presentation" element={<DutyBoostPresentationGlobal />} />
        <Route path="/dutyboost-presentation-aruba" element={<DutyBoostPresentationAruba />} />
        <Route path="/dutyboost-presentation-zim" element={<DutyBoostPresentationZim />} />
        <Route path="/dutyboost-presentation-sint-maarten" element={<DutyBoostPresentationSintMaarten />} />
        <Route path="/patent-presentation" element={<PatentPresentation />} />
        <Route path="/patent-disclosure" element={<PatentDisclosureDocument />} />
        <Route path="/investor-pitch" element={<InvestorPitchDeck />} />
        <Route path="/retailer-pitch" element={<RetailerPitchDeck />} />
        <Route path="/retailer-pitch-sxm" element={<RetailerPitchDeckCaribbean />} />
        <Route path="/retailer-supplier-pitch-sxm" element={<RetailerSupplierPitchDeckSxm />} />
        <Route path="/airport-pitch" element={<AirportPitchDeck />} />
        <Route path="/pos-provider-pitch" element={<PosProviderPitchDeck />} />
        <Route path="/pos-provider-pitch-usd" element={<PosProviderPitchDeckUsd />} />
        <Route path="/travel-partner-pitch" element={<TravelPartnerPitchDeck />} />
        <Route path="/corporate-partner-one-pager" element={<CorporatePartnerOnePager />} />
        <Route path="/corporate-partner-pitch" element={<CorporatePartnerPitchDeck />} />
        <Route path="/corporate-partner-showcase" element={<CorporatePartnerShowcase />} />
        <Route path="/corporate-partner-request" element={<CorporatePartnerRequest />} />
        <Route path="/roi-calculator-corporate-partner" element={<CorporatePartnerCalculator />} />
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
          <Route path="/DutyBoost-Dashboard" element={<SurveyDashboard />} />
          <Route path="/airport-retailers-campaign-list" element={<AirportRetailersCampaignList />} />

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

          <DemoDisclaimer />
          <Toaster />
        </Router>
      </QueryClientProvider>
    </AuthProvider>
  )
}

export default App