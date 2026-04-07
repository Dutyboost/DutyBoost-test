import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '@/lib/AuthContext';
import { base44 } from '@/api/base44Client';

export default function AuthRedirect() {
  const navigate = useNavigate();
  const { user, isLoadingAuth } = useAuth();

  useEffect(() => {
    if (isLoadingAuth || !user) {
      if (!isLoadingAuth && !user) navigate('/');
      return;
    }

    const routeUser = async () => {
      try {
        const res = await base44.functions.invoke('getUserDashboardRoute', {});
        navigate(res.data.route);
      } catch (error) {
        console.error('Error routing user:', error);
        navigate('/traveler-portal');
      }
    };

    routeUser();
  }, [user, isLoadingAuth, navigate]);

  return (
    <div className="fixed inset-0 flex items-center justify-center">
      <div className="w-8 h-8 border-4 border-slate-200 border-t-slate-800 rounded-full animate-spin"></div>
    </div>
  );
}