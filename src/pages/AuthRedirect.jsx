import { useEffect, useState } from 'react';
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
        // Check if email has a SignupApplication (retailer or agency)
        const apps = await base44.entities.SignupApplication.filter({ email: user.email });
        if (apps.length > 0) {
          const app = apps[0];
          if (app.business_type === 'Airport Retailer') {
            navigate('/retailer-dashboard');
          } else if (app.business_type === 'Travel Agency') {
            navigate('/agency-portal');
          }
          return;
        }

        // Check if email is in Retailer entity
        const retailers = await base44.entities.Retailer.filter({ owner_email: user.email });
        if (retailers.length > 0) {
          navigate('/retailer-dashboard');
          return;
        }

        // Default to traveler portal
        navigate('/traveler-portal');
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