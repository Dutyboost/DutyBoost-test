import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '@/lib/AuthContext';

export default function AuthRedirect() {
  const navigate = useNavigate();
  const { user, isLoadingAuth } = useAuth();

  useEffect(() => {
    if (isLoadingAuth) return;

    if (!user) {
      navigate('/');
      return;
    }

    // Route based on user role
    if (user.role === 'admin') {
      navigate('/admin-dashboard');
    } else if (user.role === 'retailer') {
      navigate('/retailer-dashboard');
    } else if (user.role === 'agency') {
      navigate('/agency-portal');
    } else {
      navigate('/traveler-portal');
    }
  }, [user, isLoadingAuth, navigate]);

  return (
    <div className="fixed inset-0 flex items-center justify-center">
      <div className="w-8 h-8 border-4 border-slate-200 border-t-slate-800 rounded-full animate-spin"></div>
    </div>
  );
}