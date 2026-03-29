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
import AirportsPage from './pages/AirportsPage';
import AdminPanel from './pages/AdminPanel';
import RetailerDashboard from './pages/RetailerDashboard';
import TravelerVoucher from './pages/TravelerVoucher';
import ScanVoucher from './pages/ScanVoucher';
import TravelerScan from './pages/TravelerScan';

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
      // Allow public landing page without login
      if (window.location.pathname === '/') {
        return <LandingPage />;
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
      <Route element={<Layout />}>
        <Route path="/dashboard" element={<Home />} />
        <Route path="/vouchers" element={<VouchersPage />} />
        <Route path="/retailers" element={<RetailersPage />} />
        <Route path="/airports" element={<AirportsPage />} />
        <Route path="/admin" element={<AdminPanel />} />
        <Route path="/retailer-dashboard" element={<RetailerDashboard />} />
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
        </Router>
        <Toaster />
      </QueryClientProvider>
    </AuthProvider>
  )
}

export default App