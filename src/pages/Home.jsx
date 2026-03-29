import { useState, useEffect } from "react";
import { base44 } from "@/api/base44Client";
import AgencyDashboard from "./AgencyDashboard";
import RetailerDashboard from "./RetailerDashboard";
import AdminPanel from "./AdminPanel";

export default function Home() {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    base44.auth.me().then((u) => {
      setUser(u);
      setLoading(false);
    });
  }, []);

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-[50vh]">
        <div className="w-8 h-8 border-4 border-primary/20 border-t-primary rounded-full animate-spin" />
      </div>
    );
  }

  const role = user?.role || "agency";

  if (role === "admin") return <AdminPanel />;
  if (role === "retailer") return <RetailerDashboard />;
  return <AgencyDashboard />;
}