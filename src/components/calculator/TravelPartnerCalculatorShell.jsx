import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { ArrowLeft } from "lucide-react";
import { Button } from "@/components/ui/button";
import DutyBoostLogo from "@/components/DutyBoostLogo";
import PageFooter from "@/components/PageFooter";
import LanguageSwitcher from "@/components/LanguageSwitcher";
import { TravelPartnerTab } from "@/pages/RetailerCalculator";
import { getTravelPartnerCardStrings } from "@/lib/i18nTravelPartnerCards";

/**
 * Standalone ROI calculator for one travel-partner vertical. Every travel
 * partner (flight, accommodation, car rental, rail, touring coach) gets its own
 * page locked to its own vertical, with a link back to its showcase.
 */
export default function TravelPartnerCalculatorShell({ vertical, showcaseTo }) {
  const { t, i18n } = useTranslation();
  const tp = getTravelPartnerCardStrings(i18n.language);

  return (
    <main className="min-h-screen bg-slate-50 text-slate-900 px-4 py-10">
      <div className="max-w-6xl mx-auto space-y-8">
        {/* Top bar */}
        <div className="flex flex-wrap justify-between items-center gap-3">
          <DutyBoostLogo height={55} linkTo="/" />
          <div className="flex items-center gap-3">
            <Link to={showcaseTo}>
              <Button variant="outline" size="sm" className="gap-1.5">
                <ArrowLeft className="w-4 h-4" /> {tp.back_to_showcase}
              </Button>
            </Link>
            <LanguageSwitcher />
          </div>
        </div>

        {/* Travel partner calculator (self-contained title, inputs, results, CTA) */}
        <TravelPartnerTab t={t} vertical={vertical} />
      </div>
      <PageFooter />
    </main>
  );
}