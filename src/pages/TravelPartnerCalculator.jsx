import { useTranslation } from "react-i18next";
import DutyBoostLogo from "../components/DutyBoostLogo";
import PageFooter from "../components/PageFooter";
import LanguageSwitcher from "../components/LanguageSwitcher";
import { TravelPartnerTab } from "./RetailerCalculator";

export default function TravelPartnerCalculator() {
  const { t } = useTranslation();

  return (
    <main className="min-h-screen bg-slate-50 text-slate-900 px-4 py-10">
      <div className="max-w-6xl mx-auto space-y-8">
        {/* Top bar */}
        <div className="flex justify-between items-center">
          <DutyBoostLogo height={55} linkTo="/" />
          <LanguageSwitcher />
        </div>

        {/* Travel partner calculator (self-contained title, inputs, results, CTA) */}
        <TravelPartnerTab t={t} />
      </div>
      <PageFooter />
    </main>
  );
}