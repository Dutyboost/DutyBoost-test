import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { base44 } from "@/api/base44Client";
import { Button } from "@/components/ui/button";
import DutyBoostLogo from "../components/DutyBoostLogo";
import { LogOut, LogIn, ChevronLeft, UserPlus, Briefcase } from "lucide-react";

export default function AgencyPortal() {
  const navigate = useNavigate();
  const [user, setUser] = useState(null);
  const [authed, setAuthed] = useState(false);
  const [loading, setLoading] = useState(true);

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
        <button onClick={() => navigate("/agency-showcase")} className="flex items-center gap-1 text-sm font-medium text-muted-foreground hover:text-foreground transition-colors">
          <ChevronLeft className="w-4 h-4" /> Back
        </button>
        <button onClick={() => navigate("/")} className="hover:opacity-80 transition-opacity">
          <DutyBoostLogo height={150} />
        </button>
        <div className="w-12" />
      </div>

      <div className="flex-1 flex flex-col items-center justify-center px-6 text-center space-y-8 max-w-md mx-auto">
        <div className="space-y-3">
          <div className="w-16 h-16 bg-primary/10 rounded-2xl flex items-center justify-center mx-auto">
            <Briefcase className="w-8 h-8 text-primary" />
          </div>
          <h1 className="text-3xl font-heading font-bold">Travel Partner Portal</h1>
          <p className="text-muted-foreground leading-relaxed">
            Manage your bookings and DutyCredits for your travelers.
          </p>
        </div>

        <div className="w-full space-y-3">
          {authed ? (
            <>
              <p className="text-sm font-medium">Signed in as <span className="text-primary">{user?.email}</span></p>
              <Button className="w-full gap-2 text-base h-12" onClick={() => navigate("/dashboard")}>
                <Briefcase className="w-4 h-4" /> Go to Dashboard
              </Button>
              <Button variant="outline" className="w-full gap-2 text-base h-12" onClick={() => base44.auth.logout("/agency-portal")}>
                <LogOut className="w-4 h-4" /> Sign Out
              </Button>
            </>
          ) : (
            <>
              <Button className="w-full gap-2 text-base h-12" onClick={() => navigate("/agency-signup")}>
                <UserPlus className="w-4 h-4" /> Create Travel Partner Account
              </Button>
              <Button variant="outline" className="w-full gap-2 text-base h-12" onClick={() => base44.auth.redirectToLogin(window.location.pathname)}>
                <LogIn className="w-4 h-4" /> Sign In
              </Button>
              <p className="text-xs text-muted-foreground">New to DutyBoost? Create an account to start integrating with our platform.</p>
            </>
          )}
        </div>
      </div>
    </div>
  );
}