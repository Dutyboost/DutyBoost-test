import { useState, useEffect } from "react";
import { base44 } from "@/api/base44Client";
import AgencyDashboard from "./AgencyDashboard";
import RetailerDashboard from "./RetailerDashboard";
import AdminPanel from "./AdminPanel";

export default function Home() {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchUser = async () => {
      try {
        // Ensure role is set (handles first login after invite)
        const roleResult = await base44.functions.invoke('ensureUserRole', {}).catch(() => ({ data: null }));
        // If role was just assigned, reload to get fresh session with correct role
        if (roleResult?.data?.updated === true) {
          window.location.reload();
          return;
        }
        const userData = await base44.auth.me();
        setUser(userData);
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
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-center">
          <p className="text-muted-foreground">Unable to load user data</p>
        </div>
      </div>
    );
  }

  const role = user?.role || "agency";

  if (role === "admin") return <AdminPanel />;
  if (role === "retailer") return <RetailerDashboard />;
  return <AgencyDashboard />
}