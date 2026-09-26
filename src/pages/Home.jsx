import { useState, useEffect } from "react";
import { base44 } from "@/api/base44Client";
import AgencyDashboard from "./AgencyDashboard";
import RetailerDashboard from "./RetailerDashboard";
import AdminPanel from "./AdminPanel";
import PartnerDashboard from "./PartnerDashboard";
import { partnerTypeToKey } from "@/lib/partnerDashboards";

export default function Home() {
  const [user, setUser] = useState(null);
  const [partnerKey, setPartnerKey] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const userData = await base44.auth.me();
        // Only call ensureUserRole if user has no role yet (first login after invite)
        if (!userData?.role) {
          const roleResult = await base44.functions.invoke('ensureUserRole', {}).catch(() => ({ data: null }));
          if (roleResult?.data?.updated === true) {
            window.location.reload();
            return;
          }
        }
        setUser(userData);
        // Partners see their own dashboard instead of the travel-agency one.
        if (userData?.role !== "admin" && userData?.role !== "retailer" && userData?.email) {
          const records = await base44.entities.ParticipatingPartner
            .filter({ contact_email: userData.email }, "-created_date", 20)
            .catch(() => []);
          const key = (records || []).map((r) => partnerTypeToKey(r.partner_type)).find(Boolean);
          if (key) setPartnerKey(key);
        }
      } catch (error) {
        console.error('Failed to fetch user:', error);
      } finally {
        setLoading(false);
      }
    };
    fetchUser();
  }, []);

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="w-8 h-8 border-4 border-primary/20 border-t-primary rounded-full animate-spin" />
      </div>
    );
  }

  if (!user) {
    window.location.replace('/login');
    return null;
  }

  if (!user.role) {
    window.location.replace('/get-started');
    return null;
  }

  const role = user.role;

  if (role === "admin") return <AdminPanel />;
  if (role === "retailer") return <RetailerDashboard />;
  if (partnerKey) return <PartnerDashboard type={partnerKey} />;
  return <AgencyDashboard />
}