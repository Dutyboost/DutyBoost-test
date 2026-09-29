import { useTranslation } from "react-i18next";
import { Link } from "react-router-dom";
import { Info } from "lucide-react";
import DutyBoostLogo from "@/components/DutyBoostLogo";
import PageFooter from "@/components/PageFooter";
import LanguageSwitcher from "@/components/LanguageSwitcher";
import { Button } from "@/components/ui/button";
import CorporateTravelPartnerTab from "@/components/calculator/CorporateTravelPartnerTab";

export default function CorporatePartnerCalculator() {
  const { t } = useTranslation();

  return (
    <main className="min-h-screen bg-slate-50 text-slate-900 px-4 py-10">
      <div className="max-w-6xl mx-auto space-y-8">
        {/* Top bar */}
        <div className="flex flex-wrap justify-between items-center gap-3">
          <DutyBoostLogo height={55} linkTo="/" />
          <div className="flex items-center gap-3">
            <Link to="/corporate-partner-showcase">
              <Button variant="outline" size="sm" className="gap-1.5 text-slate-600 border-slate-600 hover:text-slate-700 hover:bg-slate-50">
                <Info className="w-4 h-4 shrink-0" /> {t("corporate.calculator.aboutBtn")}
              </Button>
            </Link>
            <LanguageSwitcher />
          </div>
        </div>

        {/* Corporate Travel Partner calculator (self-contained title, inputs, results, CTA) */}
        <CorporateTravelPartnerTab t={t} />
      </div>
      <PageFooter />
    </main>
  );
}