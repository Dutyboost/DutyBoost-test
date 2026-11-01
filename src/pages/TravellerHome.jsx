import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";
import TravellerShell from "@/components/TravellerShell";
import CreditTierTable from "@/components/traveller/CreditTierTable";
import WhyDutyCredit from "@/components/traveller/WhyDutyCredit";
import HowItWorks from "@/components/traveller/HowItWorks";
import { Button } from "@/components/ui/button";
import { QrCode, ShieldCheck, Check } from "lucide-react";

const BENEFITS = ["what_b1", "what_b2", "what_b3"];

export default function TravellerHome() {
  const { t } = useTranslation();
  const tr = (key, opts) => t(`traveller.${key}`, opts);

  return (
    <TravellerShell>
      <div className="space-y-6">
        <div className="text-center space-y-3">
          <h1 className="text-3xl sm:text-4xl font-heading font-bold tracking-tight">{tr('title')}</h1>
          <p className="text-base sm:text-lg text-muted-foreground">{tr('subtitle')}</p>
          <p className="inline-flex items-center gap-1.5 text-xs text-muted-foreground">
            <ShieldCheck className="w-3.5 h-3.5" /> {tr('no_account')}
          </p>
        </div>

        <div className="bg-card rounded-2xl border border-border p-6 space-y-3">
          <h2 className="font-heading font-bold text-lg">{tr('what_title')}</h2>
          <p className="text-sm text-muted-foreground">{tr('what_body')}</p>
          <ul className="space-y-2 pt-1">
            {BENEFITS.map((key) => (
              <li key={key} className="flex items-start gap-2 text-sm text-foreground">
                <Check className="w-4 h-4 text-primary shrink-0 mt-0.5" />
                <span>{tr(key)}</span>
              </li>
            ))}
          </ul>
        </div>

        <WhyDutyCredit />

        <CreditTierTable />

        <HowItWorks />

        <div className="bg-card rounded-2xl border border-border p-6 space-y-3">
          <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center">
            <QrCode className="w-5 h-5 text-primary" />
          </div>
          <h2 className="font-heading font-bold text-lg">{tr('claim_title')}</h2>
          <p className="text-sm text-muted-foreground">{tr('claim_desc')}</p>
          <Link to="/claim-duty-credit" className="block">
            <Button size="lg" className="w-full py-3 gap-2">
              <QrCode className="w-4 h-4" /> {tr('claim_cta')}
            </Button>
          </Link>
        </div>
      </div>
    </TravellerShell>
  );
}