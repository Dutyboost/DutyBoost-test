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
import EntryPage from './pages/EntryPage';
import LandingPage from './pages/LandingPage';
import VouchersPage from './pages/VouchersPage';
import RetailersPage from './pages/RetailersPage';
import TravelAgenciesPage from './pages/TravelAgenciesPage';
import AdminPanel from './pages/AdminPanel';
import ScanVoucher from './pages/ScanVoucher';
import GetStarted from './pages/GetStarted';
import PrivacyPolicy from './pages/PrivacyPolicy';
import TermsOfService from './pages/TermsOfService';
import RefundPolicy from './pages/RefundPolicy';
import CodeOfConduct from './pages/CodeOfConduct';
import CookiePolicy from './pages/CookiePolicy';
import DataProcessingAgreement from './pages/DataProcessingAgreement';
import AccessibilityStatement from './pages/AccessibilityStatement';
import DataCollectionPolicy from './pages/DataCollectionPolicy';
import CookieConsentBar from './components/CookieConsentBar';

import FAQ from './pages/FAQ';
import AgencyIntegrationGuide from './pages/AgencyIntegrationGuide';
import AgencyIntegrationPage from './pages/AgencyIntegrationPage';
import RetailerIntegrationGuide from './pages/RetailerIntegrationGuide';
import AdminDashboard from './pages/AdminDashboard';
import SelectUserType from './pages/SelectUserType';

import LeadsAdmin from './pages/LeadsAdmin';
import RetailerScanQR from './pages/RetailerScanQR';
import BusinessTravel from './pages/BusinessTravel';
import BusinessTravelGetStarted from './pages/BusinessTravelGetStarted';
import CorporateTravelAdmin from './pages/CorporateTravelAdmin';
import CorporateTravelDashboard from './pages/CorporateTravelDashboard';
import CorporateBudgetAllocation from './pages/CorporateBudgetAllocation';
import RetailerScanOnly from './pages/RetailerScanOnly';
import HotelShowcase from './pages/HotelShowcase';
import CarRentalShowcase from './pages/CarRentalShowcase';
import HotelPortal from './pages/HotelPortal';
import CarRentalPortal from './pages/CarRentalPortal';
import HotelSignup from './pages/HotelSignup';
import CarRentalSignup from './pages/CarRentalSignup';
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
import RetailPartnerOnePager from './pages/RetailPartnerOnePager';
import AgglomerationTravelPartnerOnePager from './pages/TravelStackOnePager';
import GTMTestingChecklist from './pages/GTMTestingChecklist';
import StagingValidationGuide from './pages/StagingValidationGuide';
import RetailerCalculator from './pages/RetailerCalculator';
import TravelPartnerCalculator from './pages/TravelPartnerCalculator';
import FlightPartnerCalculator from './pages/FlightPartnerCalculator';
import AccommodationPartnerCalculator from './pages/AccommodationPartnerCalculator';
import CarRentalPartnerCalculator from './pages/CarRentalPartnerCalculator';
import TrainPartnerCalculator from './pages/TrainPartnerCalculator';
import CoachPartnerCalculator from './pages/CoachPartnerCalculator';
import CoachShowcase from './pages/CoachShowcase';
import CoachSignup from './pages/CoachSignup';
import SurveyDashboard from './pages/SurveyDashboard';
import CruiseShowcase from './pages/CruiseShowcase.jsx';
import CruisePartnerCalculator from './pages/CruisePartnerCalculator.jsx';
import CruiseSignup from './pages/CruiseSignup.jsx';
import TrainShowcase from './pages/TrainShowcase.jsx';
import TrainPortal from './pages/TrainPortal.jsx';
import TrainSignup from './pages/TrainSignup.jsx';
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
import MutualNda from './pages/MutualNda';
import BrandGuidelines from './pages/BrandGuidelines';
import BusinessCardRael from './pages/BusinessCardRael';
import BusinessCardJaquelin from './pages/BusinessCardJaquelin';
import ClaimDutyCredit from './pages/ClaimDutyCredit';
import TravellerHome from './pages/TravellerHome';
import WhyDutyBoostOnePager from './pages/WhyDutyBoostOnePager';
import Team from './pages/Team';
import EligibilityShowcase from './pages/EligibilityShowcase';
import DutyBoostPresentation from './pages/DutyBoostPresentation';
import DutyBoostPresentationGlobal from './pages/DutyBoostPresentationGlobal';
import DutyBoostPresentationAruba from './pages/DutyBoostPresentationAruba';
import DutyBoostPresentationZim from './pages/DutyBoostPresentationZim';
import DutyBoostPresentationSintMaarten from './pages/DutyBoostPresentationSintMaarten';
import PatentPresentation from './pages/PatentPresentation';
import PatentDisclosureDocument from './pages/PatentDisclosureDocument';
import InvestorPitchDeck from './pages/InvestorPitchDeck';
import InvestorPitchDeckV2 from './pages/InvestorPitchDeckV2';
import RetailerPitchDeck from './pages/RetailerPitchDeck';
import RetailerPitchDeckLagardere from './pages/RetailerPitchDeckLagardere';
import RetailerPitchDeckAvolta from './pages/RetailerPitchDeckAvolta';
import RetailerPitchDeckCaribbean from './pages/RetailerPitchDeckCaribbean';
import RetailerPitchDeckTrinidad from './pages/RetailerPitchDeckTrinidad';
import RetailerPitchDeckMartinique from './pages/RetailerPitchDeckMartinique';
import RetailerSupplierPitchDeckSxm from './pages/RetailerSupplierPitchDeckSxm';
import CaribbeanAirlinesPitchDeck from './pages/CaribbeanAirlinesPitchDeck';
import DominicanRepublicPitchDeck from './pages/DominicanRepublicPitchDeck';
import AirportPitchDeck from './pages/AirportPitchDeck';
import AirportPitchDeckAruba from './pages/AirportPitchDeckAruba';
import PhygridPitchDeck from './pages/PhygridPitchDeck';
import TravelPartnerPitchDeck from './pages/TravelPartnerPitchDeck';
import TravelPartnerPitchDeckAFKLM from './pages/TravelPartnerPitchDeckAFKLM';
import PartnerWorkspace from './pages/PartnerWorkspace';

import AirportShowcase from './pages/AirportShowcase';
import AirportOnlyShowcase from './pages/AirportOnlyShowcase';
import AirportSignup from './pages/AirportSignup';
import PortsShowcase from './pages/PortsShowcase';
import PortsCalculator from './pages/PortsCalculator';
import PortDowntownCalculator from './pages/PortDowntownCalculator';
import PortsPartnerRequest from './pages/PortsPartnerRequest';
import PortRetailerShowcase from './pages/PortRetailerShowcase';
import PortRetailerRequest from './pages/PortRetailerRequest';
import AirportCalculator from './pages/AirportCalculator';
import WholesaleShowcase from './pages/WholesaleShowcase';
import WholesaleCalculator from './pages/WholesaleCalculator';
import AirportPartnerRequest from './pages/AirportPartnerRequest';
import WholesalePartnerRequest from './pages/WholesalePartnerRequest';
import RetailerRequest from './pages/RetailerRequest';
import RetailerConfirmation from './pages/RetailerConfirmation';
import TravelPartnerRequest from './pages/TravelPartnerRequest';
import AccommodationRequest from './pages/AccommodationRequest';
import CarRentalRequest from './pages/CarRentalRequest';
import AirportRetailersCampaignList from './pages/AirportRetailersCampaignList';
import AirportRolloutTemplate from './pages/AirportRolloutTemplate';
import PitchPipeline from './pages/PitchPipeline';
import TravellersTransactionShowcase from './pages/TravellersTransactionShowcase';

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
        <Route path="/" element={user?.role === "user" ? <Navigate to="/dashboard" replace /> : <EntryPage />} />
        <Route path="/partners" element={<LandingPage />} />
        <Route path="/coming-soon" element={<ComingSoonPage />} />
        {surveyRoutes}
        <Route path="/landing" element={<LandingPage />} />

        <Route path="/get-started" element={<SelectUserType />} />
        <Route path="/travel-partner-showcase" element={<SelectUserType travelPartnerOnly />} />
        <Route path="/registration" element={<GetStarted />} />
        <Route path="/travel-partner-portal" element={<AgencyPortal />} />
        <Route path="/travel-partner-signup" element={<Navigate to="/get-started" replace />} />
        <Route path="/travel-retailers" element={<RetailerShowcase />} />
        <Route path="/terminal-retailers" element={<Navigate to="/travel-retailers" replace />} />
        <Route path="/airport-seaport-retailers" element={<Navigate to="/travel-retailers" replace />} />
        <Route path="/retailer-showcase" element={<Navigate to="/travel-retailers" replace />} />
        <Route path="/flight-showcase" element={<AgencyShowcase />} />
        <Route path="/registration-flow" element={<RegistrationFlow />} />
        <Route path="/email-preview" element={<EmailPreview />} />
        <Route path="/airport-rollout-template" element={<AirportRolloutTemplate />} />
        <Route path="/flight-partner-one-pager" element={<FlightPartnerOnePager />} />
        <Route path="/accommodation-partner-one-pager" element={<AccommodationPartnerOnePager />} />
        <Route path="/car-rental-partner-one-pager" element={<CarRentalPartnerOnePager />} />
        <Route path="/retailer-one-pager" element={<RetailPartnerOnePager />} />
        <Route path="/agglomeration-travel-partner-one-pager" element={<AgglomerationTravelPartnerOnePager />} />
        <Route path="/gtm-checklist" element={<GTMTestingChecklist />} />
        <Route path="/staging-validation" element={<StagingValidationGuide />} />
        <Route path="/retailers-calculator" element={<RetailerCalculator />} />
        <Route path="/travel-retailers-calculator" element={<Navigate to="/retailers-calculator" replace />} />
        <Route path="/terminal-retailers-calculator" element={<Navigate to="/retailers-calculator" replace />} />
        <Route path="/airport-seaport-retailers-calculator" element={<Navigate to="/retailers-calculator" replace />} />
        <Route path="/retailer-calculator" element={<Navigate to="/retailers-calculator" replace />} />
        <Route path="/roi-calculator" element={<RetailerCalculator />} />
        <Route path="/roi-calculator-travel-partner" element={<TravelPartnerCalculator />} />
        <Route path="/flight-partner-calculator" element={<FlightPartnerCalculator />} />
        <Route path="/accommodation-partner-calculator" element={<AccommodationPartnerCalculator />} />
        <Route path="/car-rental-partner-calculator" element={<CarRentalPartnerCalculator />} />
        <Route path="/train-partner-calculator" element={<TrainPartnerCalculator />} />
        <Route path="/coach-partner-calculator" element={<CoachPartnerCalculator />} />
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
        <Route path="/cruise-partner-calculator" element={<CruisePartnerCalculator />} />
        <Route path="/cruise-signup" element={<CruiseSignup />} />
        <Route path="/train-showcase" element={<TrainShowcase />} />
        <Route path="/coach-showcase" element={<CoachShowcase />} />
        <Route path="/train-portal" element={<TrainPortal />} />
        <Route path="/train-signup" element={<TrainSignup />} />
        <Route path="/coach-signup" element={<CoachSignup />} />
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
        <Route path="/mutual-nda" element={<MutualNda />} />
        <Route path="/brand-guidelines" element={<BrandGuidelines />} />
        <Route path="/business-card-rael" element={<BusinessCardRael />} />
        <Route path="/business-card-jaquelin" element={<BusinessCardJaquelin />} />
        <Route path="/claim" element={<TravellerHome />} />
        <Route path="/traveller" element={<TravellerHome />} />
        <Route path="/claim-duty-credit" element={<ClaimDutyCredit />} />
        <Route path="/why-dutyboost" element={<WhyDutyBoostOnePager />} />
        <Route path="/team" element={<Team />} />
        <Route path="/eligibility-showcase" element={<EligibilityShowcase />} />
        <Route path="/dutyboost-presentation" element={<DutyBoostPresentationGlobal />} />
        <Route path="/dutyboost-presentation-aruba" element={<DutyBoostPresentationAruba />} />
        <Route path="/dutyboost-presentation-zim" element={<DutyBoostPresentationZim />} />
        <Route path="/dutyboost-presentation-sint-maarten" element={<DutyBoostPresentationSintMaarten />} />
        <Route path="/patent-presentation" element={<PatentPresentation />} />
        <Route path="/patent-disclosure" element={<PatentDisclosureDocument />} />
        <Route path="/investor-pitch" element={<InvestorPitchDeck />} />
        <Route path="/investor-pitch-v2" element={<InvestorPitchDeckV2 />} />
        <Route path="/retailer-pitch" element={<RetailerPitchDeck />} />
        <Route path="/retailer-pitch-lagardere" element={<RetailerPitchDeckLagardere />} />
        <Route path="/retailer-pitch-avolta" element={<Navigate to="/retailer-pitch-avolta-aruba" replace />} />
        <Route path="/retailer-pitch-avolta-aruba" element={<RetailerPitchDeckAvolta />} />
        <Route path="/retailer-pitch-sxm" element={<RetailerPitchDeckCaribbean />} />
        <Route path="/retailer-pitch-trinidad-tobago" element={<RetailerPitchDeckTrinidad />} />
        <Route path="/retailer-pitch-trinidad" element={<Navigate to="/retailer-pitch-trinidad-tobago" replace />} />
        <Route path="/retailer-pitch-martinique" element={<RetailerPitchDeckMartinique />} />
        <Route path="/retailer-supplier-pitch-sxm" element={<RetailerSupplierPitchDeckSxm />} />
        <Route path="/caribbean-airlines-revenue-pitch" element={<CaribbeanAirlinesPitchDeck />} />
        <Route path="/dominican-republic-pitch" element={<DominicanRepublicPitchDeck />} />
        <Route path="/airport-pitch" element={<AirportPitchDeck />} />
        <Route path="/airport-pitch-aruba" element={<AirportPitchDeckAruba />} />
        <Route path="/phygrid-pitch" element={<PhygridPitchDeck />} />
        <Route path="/travel-partner-pitch" element={<TravelPartnerPitchDeck />} />
        <Route path="/travel-partner-pitch-afklm" element={<TravelPartnerPitchDeckAFKLM />} />
        <Route path="/travellers-transaction" element={<TravellersTransactionShowcase />} />
        <Route path="/travel-hubs-showcase" element={<AirportShowcase />} />
        <Route path="/airport-showcase" element={<AirportOnlyShowcase />} />
        <Route path="/airport-partner-request" element={<AirportSignup />} />
        <Route path="/travel-hubs-calculator" element={<AirportCalculator />} />
        <Route path="/airport-calculator" element={<Navigate to="/travel-hubs-calculator" replace />} />
        <Route path="/travel-hubs-partner-request" element={<AirportPartnerRequest />} />
        <Route path="/ports-showcase" element={<PortsShowcase />} />
        <Route path="/ports-calculator" element={<PortsCalculator />} />
        <Route path="/ports-partner-request" element={<PortsPartnerRequest />} />
        <Route path="/local-retailers" element={<PortRetailerShowcase />} />
        <Route path="/local-retailers-calculator" element={<PortDowntownCalculator />} />
        <Route path="/local-retailers-request" element={<PortRetailerRequest />} />
        <Route path="/port-retailer-showcase" element={<Navigate to="/local-retailers" replace />} />
        <Route path="/port-downtown-calculator" element={<Navigate to="/local-retailers-calculator" replace />} />
        <Route path="/port-retailer-request" element={<Navigate to="/local-retailers-request" replace />} />
        <Route path="/wholesale-showcase" element={<WholesaleShowcase />} />
        <Route path="/wholesale-calculator" element={<WholesaleCalculator />} />
        <Route path="/wholesale-partner-request" element={<WholesalePartnerRequest />} />
        <Route path="/travel-retailers-request" element={<RetailerRequest />} />
        <Route path="/terminal-retailers-request" element={<Navigate to="/travel-retailers-request" replace />} />
        <Route path="/airport-seaport-retailers-request" element={<Navigate to="/travel-retailers-request" replace />} />
        <Route path="/retailer-request" element={<Navigate to="/travel-retailers-request" replace />} />
        <Route path="/retailer-confirmation" element={<RetailerConfirmation />} />
        <Route path="/travel-partner-request" element={<TravelPartnerRequest />} />
        <Route path="/accommodation-request" element={<AccommodationRequest />} />
        <Route path="/car-rental-request" element={<CarRentalRequest />} />
        <Route path="/privacy" element={<PrivacyPolicy />} />
        <Route path="/terms" element={<TermsOfService />} />
        <Route path="/refunds" element={<RefundPolicy />} />
        <Route path="/code-of-conduct" element={<CodeOfConduct />} />
        <Route path="/cookies" element={<CookiePolicy />} />
        <Route path="/dpa" element={<DataProcessingAgreement />} />
        <Route path="/accessibility" element={<AccessibilityStatement />} />
        <Route path="/data-collection" element={<DataCollectionPolicy />} />
        <Route path="/faq" element={<FAQ />} />
        <Route path="/travel-partner-integration-guide" element={<AgencyIntegrationGuide />} />
        <Route path="/retailer-integration-guide" element={<RetailerIntegrationGuide />} />
        <Route element={<Layout />}>
          <Route path="/dashboard" element={<Home />} />
          <Route path="/vouchers" element={<VouchersPage />} />
          <Route path="/retailers" element={<RetailersPage />} />
          <Route path="/travel-partners" element={<TravelAgenciesPage />} />
          <Route path="/hotels" element={<HotelPortal />} />
          <Route path="/car-rentals" element={<CarRentalPortal />} />
          <Route path="/admin" element={<AdminPanel />} />
          <Route path="/admin-dashboard" element={<AdminDashboard />} />
          <Route path="/partner" element={<PartnerWorkspace />} />
          <Route path="/travel-partner-integration" element={<AgencyIntegrationPage />} />
          <Route path="/scan-redeem" element={<ScanVoucher />} />
          <Route path="/retailer-scan" element={<RetailerScanQR />} />
          <Route path="/leads-admin" element={<LeadsAdmin />} />
          <Route path="/DutyBoost-Dashboard" element={<SurveyDashboard />} />
          <Route path="/airport-retailers-campaign-list" element={<AirportRetailersCampaignList />} />
          <Route path="/pitch-pipeline" element={<PitchPipeline />} />

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