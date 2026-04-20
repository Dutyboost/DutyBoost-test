import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { base44 } from "@/api/base44Client";
import { Button } from "@/components/ui/button";
import DutyBoostLogo from "../components/DutyBoostLogo";
import LanguageSwitcher from "../components/LanguageSwitcher";
import { LogOut, LogIn, ChevronLeft, UserPlus, Car, Trash2 } from "lucide-react";

export default function CarRentalPortal() {
  const navigate = useNavigate();
  const { t } = useTranslation();
  const [user, setUser] = useState(null);
  const [authed, setAuthed] = useState(false);
  const [loading, setLoading] = useState(true);
  const [deleteStep, setDeleteStep] = useState(0);
  const [deleteReason, setDeleteReason] = useState("");
  const [deleteOther, setDeleteOther] = useState("");

  const DELETE_REASONS = [
    "I no longer use the service",
    "Too expensive / not worth it",
    "Technical issues",
    "Switching to a competitor",
    "Privacy concerns",
    "Other",
  ];

  const handleDeleteAccount = async () => {
    if (deleteStep === 0) { setDeleteStep(1); return; }
    if (deleteStep === 1) {
      if (!deleteReason) return;
      setDeleteStep(2);
      return;
    }
    await base44.entities.AccountDeletion.create({
      email: user?.email || "",
      user_type: "Car Rental Partner",
      reason: deleteReason,
      other_reason: deleteReason === "Other" ? deleteOther : undefined,
    });
    await base44.auth.logout("/");
  };

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
        <button onClick={() => navigate("/car-rental-showcase")} className="flex items-center gap-1 text-sm font-medium text-muted-foreground hover:text-foreground transition-colors">
          <ChevronLeft className="w-4 h-4" /> {t('common.back')}
        </button>
        <button onClick={() => navigate("/")} className="hover:opacity-80 transition-opacity">
          <DutyBoostLogo height={150} />
        </button>
        <LanguageSwitcher />
      </div>

      <div className="flex-1 flex flex-col items-center justify-center px-6 text-center space-y-8 max-w-md mx-auto">
        <div className="space-y-3">
          <div className="w-16 h-16 bg-primary/10 rounded-2xl flex items-center justify-center mx-auto">
            <Car className="w-8 h-8 text-primary" />
          </div>
          <h1 className="text-3xl font-heading font-bold">Car Rental Partner Portal</h1>
          <p className="text-muted-foreground leading-relaxed">Manage your car rental partnership and earn rewards from your customers' rentals.</p>
        </div>

        <div className="w-full space-y-3">
          {authed ? (
            <>
              <p className="text-sm font-medium">{t('portal.signed_in_as')} <span className="text-primary">{user?.email}</span></p>
              <Button className="w-full gap-2 text-base h-12" onClick={() => navigate("/dashboard")}>
                <Car className="w-4 h-4" /> Go to Dashboard
              </Button>
              <Button variant="outline" className="w-full gap-2 text-base h-12" onClick={() => base44.auth.logout("/car-rental-portal")}>
                <LogOut className="w-4 h-4" /> {t('portal.sign_out')}
              </Button>
              <div className="pt-6 border-t border-border space-y-3">
                {deleteStep === 0 && (
                  <button onClick={handleDeleteAccount} className="flex items-center gap-1.5 text-xs text-muted-foreground hover:text-destructive transition-colors mx-auto">
                    <Trash2 className="w-3 h-3" /> {t('portal.delete_account')}
                  </button>
                )}
              </div>
            </>
          ) : (
            <>
              <Button className="w-full gap-2 text-base h-12" onClick={() => navigate("/car-rental-signup")}>
                <UserPlus className="w-4 h-4" /> Create Car Rental Account
              </Button>
              <Button variant="outline" className="w-full gap-2 text-base h-12" onClick={() => base44.auth.redirectToLogin(window.location.pathname)}>
                <LogIn className="w-4 h-4" /> {t('portal.sign_in')}
              </Button>
              <p className="text-xs text-muted-foreground">New to DutyBoost? Create an account to get started.</p>
            </>
          )}
        </div>
      </div>
    </div>
  );
}