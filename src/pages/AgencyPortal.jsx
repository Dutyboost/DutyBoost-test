import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { base44 } from "@/api/base44Client";
import { Button } from "@/components/ui/button";
import DutyBoostLogo from "../components/DutyBoostLogo";
import LanguageSwitcher from "../components/LanguageSwitcher";
import { LogOut, LogIn, ChevronLeft, UserPlus, Briefcase, Trash2 } from "lucide-react";

export default function AgencyPortal() {
  const navigate = useNavigate();
  const { t } = useTranslation();
  const [user, setUser] = useState(null);
  const [authed, setAuthed] = useState(false);
  const [loading, setLoading] = useState(true);
  const [deleteStep, setDeleteStep] = useState(0); // 0=hidden, 1=pick reason, 2=confirm
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
    // step 2 = confirmed
    await base44.entities.AccountDeletion.create({
      email: user?.email || "",
      user_type: "Travel Partner",
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
        <button onClick={() => navigate("/travel-partner-showcase")} className="flex items-center gap-1 text-sm font-medium text-muted-foreground hover:text-foreground transition-colors">
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
            <Briefcase className="w-8 h-8 text-primary" />
          </div>
          <h1 className="text-3xl font-heading font-bold">{t('portal.agency.title')}</h1>
          <p className="text-muted-foreground leading-relaxed">{t('portal.agency.desc')}</p>
        </div>

        <div className="w-full space-y-3">
          {authed ? (
            <>
              <p className="text-sm font-medium">{t('portal.signed_in_as')} <span className="text-primary">{user?.email}</span></p>
              <Button className="w-full gap-2 text-base h-12" onClick={() => navigate("/dashboard")}>
                <Briefcase className="w-4 h-4" /> {t('portal.go_to_dashboard')}
              </Button>
              <Button variant="outline" className="w-full gap-2 text-base h-12" onClick={() => base44.auth.logout("/travel-partner-portal")}>
                <LogOut className="w-4 h-4" /> {t('portal.sign_out')}
              </Button>
              <div className="pt-6 border-t border-border space-y-3">
                {deleteStep === 0 && (
                  <button onClick={handleDeleteAccount} className="flex items-center gap-1.5 text-xs text-muted-foreground hover:text-destructive transition-colors mx-auto">
                    <Trash2 className="w-3 h-3" /> {t('portal.delete_account')}
                  </button>
                )}
                {deleteStep === 1 && (
                  <div className="space-y-2 text-left">
                    <p className="text-xs text-muted-foreground text-center">{t('portal.delete_reason')}</p>
                    {DELETE_REASONS.map(r => (
                      <button key={r} onClick={() => setDeleteReason(r)} className={`w-full text-left text-xs px-3 py-2 rounded-lg border transition-colors ${deleteReason === r ? "border-destructive bg-destructive/5 text-destructive" : "border-border hover:border-muted-foreground"}`}>
                        {r}
                      </button>
                    ))}
                    {deleteReason === "Other" && (
                      <input className="w-full text-xs px-3 py-2 rounded-lg border border-border bg-background" placeholder="Please describe..." value={deleteOther} onChange={e => setDeleteOther(e.target.value)} />
                    )}
                    <div className="flex gap-2 pt-1">
                      <button onClick={() => { setDeleteStep(0); setDeleteReason(""); }} className="flex-1 text-xs text-muted-foreground hover:text-foreground transition-colors">{t('common.cancel')}</button>
                      <button onClick={handleDeleteAccount} disabled={!deleteReason} className="flex-1 text-xs text-destructive hover:text-destructive/80 disabled:opacity-40 transition-colors">{t('common.continue')} →</button>
                    </div>
                  </div>
                )}
                {deleteStep === 2 && (
                  <div className="space-y-2 text-center">
                    <p className="text-xs text-destructive font-medium">{t('portal.delete_permanent')}</p>
                    <div className="flex gap-2">
                      <button onClick={() => setDeleteStep(0)} className="flex-1 text-xs text-muted-foreground hover:text-foreground transition-colors">{t('common.cancel')}</button>
                      <button onClick={handleDeleteAccount} className="flex-1 text-xs text-destructive font-medium hover:text-destructive/80 transition-colors">{t('portal.delete_confirm')}</button>
                    </div>
                  </div>
                )}
              </div>
            </>
          ) : (
            <>
              <Button className="w-full gap-2 text-base h-12" onClick={() => navigate("/travel-partner-signup")}>
                <UserPlus className="w-4 h-4" /> {t('portal.agency.create_account')}
              </Button>
              <Button variant="outline" className="w-full gap-2 text-base h-12" onClick={() => base44.auth.redirectToLogin(window.location.pathname)}>
                <LogIn className="w-4 h-4" /> {t('portal.sign_in')}
              </Button>
              <p className="text-xs text-muted-foreground">{t('portal.agency.new_desc')}</p>
            </>
          )}
        </div>
      </div>
    </div>
  );
}