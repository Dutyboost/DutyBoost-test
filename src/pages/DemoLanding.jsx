import { Link } from "react-router-dom";
import { Store, Plane, ArrowRight, Eye } from "lucide-react";
import DutyBoostLogo from "../components/DutyBoostLogo";
import { useTranslation } from "react-i18next";
import PageFooter from "../components/PageFooter";
import LanguageSwitcher from "../components/LanguageSwitcher";

export default function DemoLanding() {
  const { t } = useTranslation();
  return (
    <div className="min-h-screen bg-background flex flex-col">
      <nav className="border-b border-border px-6 h-16 flex items-center justify-between">
        <Link to="/" className="hover:opacity-80 transition-opacity"><DutyBoostLogo height={150} /></Link>
        <span className="text-xs font-semibold uppercase tracking-widest text-muted-foreground bg-muted px-3 py-1 rounded-full">{t('demo.mode_badge')}</span>
        <LanguageSwitcher />
      </nav>

      <div className="flex-1 flex flex-col items-center justify-center p-8 text-center space-y-10">
        <div className="space-y-3 max-w-xl">
          <h1 className="text-4xl font-heading font-bold">{t('demo.title')}</h1>
          <p className="text-muted-foreground text-lg">{t('demo.subtitle')}</p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 w-full max-w-2xl">
          <Link to="/demo/agency" className="group p-8 rounded-2xl border-2 border-border bg-card hover:border-primary hover:bg-primary/5 transition-all text-left space-y-4">
            <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center">
              <Plane className="w-6 h-6 text-primary" />
            </div>
            <div>
              <p className="font-heading font-bold text-xl">{t('demo.agency_title')}</p>
              <p className="text-muted-foreground text-sm mt-1">{t('demo.agency_desc')}</p>
            </div>
            <div className="flex items-center gap-2 text-primary font-semibold text-sm">
            <Eye className="w-4 h-4" /> {t('demo.view_agency')} <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </div>
          </Link>

          <Link to="/demo/retailer" className="group p-8 rounded-2xl border-2 border-border bg-card hover:border-primary hover:bg-primary/5 transition-all text-left space-y-4">
            <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center">
              <Store className="w-6 h-6 text-primary" />
            </div>
            <div>
              <p className="font-heading font-bold text-xl">{t('demo.retailer_title')}</p>
              <p className="text-muted-foreground text-sm mt-1">{t('demo.retailer_desc')}</p>
            </div>
            <div className="flex items-center gap-2 text-primary font-semibold text-sm">
            <Eye className="w-4 h-4" /> {t('demo.view_retailer')} <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </div>
          </Link>

        </div>

        <p className="text-xs text-muted-foreground">{t('demo.disclaimer')}</p>
      </div>
      <PageFooter />
    </div>
  );
}