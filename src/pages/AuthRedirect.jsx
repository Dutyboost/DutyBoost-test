import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { base44 } from '@/api/base44Client';

export default function AuthRedirect() {
  const navigate = useNavigate();

  useEffect(() => {
    const redirect = async () => {
      try {
        const user = await base44.auth.me();
        
        if (user.role === 'admin') {
          navigate('/admin-dashboard');
        } else if (user.role === 'agency') {
          navigate('/agency-portal');
        } else if (user.role === 'retailer') {
          navigate('/retailer-portal');
        } else {
          // Default role (user/traveler)
          navigate('/traveler-portal');
        }
      } catch (error) {
        console.error('Auth redirect failed:', error);
        navigate('/');
      }
    };

    redirect();
  }, [navigate]);

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-background">
      <div className="w-8 h-8 border-4 border-slate-200 border-t-slate-800 rounded-full animate-spin"></div>
    </div>
  );
}