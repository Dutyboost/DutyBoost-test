import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { base44 } from "@/api/base44Client";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import DutyBoostLogo from "../components/DutyBoostLogo";
import {
  LogOut, LogIn, ChevronLeft, UserPlus, Briefcase
} from "lucide-react";

export default function AgencyPortal() {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const [user, setUser] = useState(null);
  const [authed, setAuthed] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    init();
  }, []);

  async function init() {
    setLoading(false);
    const isAuth = await base44.auth.isAuthenticated();
    setAuthed(isAuth);
    if (isAuth) {
      const me = await base44.auth.me();
      setUser(me);
    }
  }

  function handleLogin() {
    base44.auth.redirectToLogin(window.location.pathname);
  }

  function handleSignup() {
    navigate("/agency-signup");
  }

  function handleLogout() {
    base44.auth.logout("/agency-portal");
  }

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-background">
        <div className="w-8 h-8 border-4 border-border border-t-primary rounded-full animate-spin" />
      </div>
    );
  }

  if (!authed) {
    return (
      <div className="min-h-screen bg-background flex flex-col">
        {/* Header */}
        <div className="border-b border-border px-5 py-6 flex items-center justify-between">
          <button
            onClick={() => navigate("/")}
            className="flex items-center gap-1 text-sm font-medium text-muted-foreground hover:text-foreground transition-colors"
          >
            <ChevronLeft className="w-4 h-4" /> Back
          </button>
          <button onClick={() => navigate("/")} className="hover:opacity-80 transition-opacity">
            <DutyBoostLogo height={150} />
          </button>
          <div className="w-12" />
        </div>

        {/* Content */}
        <div className="flex-1 flex flex-col items-center justify-center px-6 text-center space-y-8 max-w-md mx-auto">
          <div className="space-y-3">
            <div className="w-16 h-16 bg-primary/10 rounded-2xl flex items-center justify-center mx-auto">
              <Briefcase className="w-8 h-8 text-primary" />
            </div>
            <h1 className="text-3xl font-heading font-bold">Travel Agency Portal</h1>
            <p className="text-muted-foreground leading-relaxed">
              Manage your bookings and DutyCredits for your travelers. Sign in to access your agency dashboard.
            </p>
          </div>

          <div className="w-full space-y-3">
            <Button className="w-full gap-2 text-base h-12" onClick={handleSignup}>
              <UserPlus className="w-4 h-4" /> Create Agency Account
            </Button>
            <Button variant="outline" className="w-full gap-2 text-base h-12" onClick={handleLogin}>
              <LogIn className="w-4 h-4" /> Sign In
            </Button>
            <p className="text-xs text-muted-foreground">
              New to DutyBoost? Create an account to start integrating with our platform.
            </p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background flex flex-col max-w-md mx-auto">
      {/* Header */}
      <header className="bg-card border-b border-border px-5 pt-8 pb-4 flex items-center justify-between sticky top-0 z-10">
        <button
          onClick={() => navigate("/")}
          className="flex items-center gap-1 text-sm font-medium text-muted-foreground hover:text-foreground transition-colors"
        >
          <ChevronLeft className="w-4 h-4" /> Back
        </button>
        <button onClick={() => navigate("/")} className="hover:opacity-80 transition-opacity">
          <DutyBoostLogo height={150} />
        </button>
        <div className="flex items-center gap-2">
          <div className="text-right">
            <p className="text-xs font-medium text-foreground">{user?.full_name || "Agency"}</p>
            <p className="text-xs text-muted-foreground">{user?.email}</p>
          </div>
          <button onClick={handleLogout} className="p-1.5 rounded-lg hover:bg-muted transition-colors ml-1">
            <LogOut className="w-4 h-4 text-muted-foreground" />
          </button>
        </div>
      </header>

      {/* Content */}
      <main className="flex-1 overflow-y-auto pb-6 px-5 py-6">
        <div className="bg-card border border-border rounded-2xl p-8 text-center space-y-4">
          <div className="w-14 h-14 bg-primary/10 rounded-2xl flex items-center justify-center mx-auto">
            <Briefcase className="w-7 h-7 text-primary" />
          </div>
          <h2 className="font-heading font-bold text-lg">Welcome to Your Agency Dashboard</h2>
          <p className="text-sm text-muted-foreground leading-relaxed">
            Your agency portal content and features will be available here. You can manage your bookings, track DutyCredits, and integrate with the DutyBoost platform.
          </p>
          <Badge className="inline-block mt-4">Agency Account</Badge>
        </div>
      </main>
    </div>
  );
}