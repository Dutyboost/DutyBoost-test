import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { base44 } from "@/api/base44Client";
import { Button } from "@/components/ui/button";
import DutyBoostLogo from "../components/DutyBoostLogo";
import BillingAndPayouts from "../components/BillingAndPayouts";
import { LogOut, LogIn, ChevronLeft, UserPlus, Store, CreditCard, LayoutDashboard } from "lucide-react";

export default function RetailerPortal() {
  const navigate = useNavigate();
  const [user, setUser] = useState(null);
  const [authed, setAuthed] = useState(false);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState("overview");

  useEffect(() => {
    base44.auth.isAuthenticated().then(async (isAuth) => {
      setAuthed(isAuth);
      if (isAuth) setUser(await base44.auth.me());
      setLoading(false);
    });
  }, []);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-background">
        <div className="w-8 h-8 border-4 border-border border-t-primary rounded-full animate-spin" />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background flex flex-col">
      <div className="border-b border-border px-5 py-6 flex items-center justify-between">
        <button onClick={() => navigate("/retailer-showcase")} className="flex items-center gap-1 text-sm font-medium text-muted-foreground hover:text-foreground transition-colors">
          <ChevronLeft className="w-4 h-4" /> Back
        </button>
        <button onClick={() => navigate("/")} className="hover:opacity-80 transition-opacity">
          <DutyBoostLogo height={150} />
        </button>
        <div className="w-12" />
      </div>

      {authed ? (
        <div className="flex-1 flex flex-col px-6 max-w-4xl mx-auto py-8">
          <div className="flex gap-1 border-b border-border mb-8">
            {[{ id: "overview", label: "Dashboard", icon: LayoutDashboard }, { id: "billing", label: "Billing & Payouts", icon: CreditCard }].map(({ id, label, icon: Icon }) => (
              <button
                key={id}
                onClick={() => setActiveTab(id)}
                className={`flex items-center gap-2 px-4 py-2.5 text-sm font-medium border-b-2 transition-all ${
                  activeTab === id ? "border-primary text-primary" : "border-transparent text-muted-foreground hover:text-foreground"
                }`}
              >
                <Icon className="w-4 h-4" /> {label}
              </button>
            ))}
          </div>

          {activeTab === "billing" ? (
            <BillingAndPayouts userEmail={user?.email} />
          ) : (
            <div className="space-y-6 text-center">
              <div className="space-y-3">
                <div className="w-16 h-16 bg-primary/10 rounded-2xl flex items-center justify-center mx-auto">
                  <Store className="w-8 h-8 text-primary" />
                </div>
                <h1 className="text-3xl font-heading font-bold">Airport Retailer Dashboard</h1>
                <p className="text-muted-foreground leading-relaxed max-w-md mx-auto">
                  Redeem vouchers and manage your store's participation in the DutyBoost program.
                </p>
              </div>
              <div className="flex gap-4 justify-center flex-wrap">
                <Button className="gap-2" onClick={() => navigate("/dashboard")}>
                  <Store className="w-4 h-4" /> Go to Full Dashboard
                </Button>
                <Button variant="outline" className="gap-2" onClick={() => base44.auth.logout("/retailer-portal")}>
                  <LogOut className="w-4 h-4" /> Sign Out
                </Button>
              </div>
            </div>
          )}
        </div>
      ) : (
        <div className="flex-1 flex flex-col items-center justify-center px-6 text-center space-y-8 max-w-md mx-auto">
          <div className="space-y-3">
            <div className="w-16 h-16 bg-primary/10 rounded-2xl flex items-center justify-center mx-auto">
              <Store className="w-8 h-8 text-primary" />
            </div>
            <h1 className="text-3xl font-heading font-bold">Airport Retailer Portal</h1>
            <p className="text-muted-foreground leading-relaxed">
              Redeem vouchers and manage your store's participation in the DutyBoost program.
            </p>
          </div>

          <div className="w-full space-y-3">
            <Button className="w-full gap-2 text-base h-12" onClick={() => navigate("/retailer-signup")}>
              <UserPlus className="w-4 h-4" /> Create Retailer Account
            </Button>
            <Button variant="outline" className="w-full gap-2 text-base h-12" onClick={() => base44.auth.redirectToLogin(window.location.pathname)}>
              <LogIn className="w-4 h-4" /> Sign In
            </Button>
            <p className="text-xs text-muted-foreground">New to DutyBoost? Create an account to start redeeming DutyCredits at your store.</p>
          </div>
        </div>
      )}
    </div>
  );
}