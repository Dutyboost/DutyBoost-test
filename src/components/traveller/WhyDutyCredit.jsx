import { useTranslation } from "react-i18next";

const REASONS = [1, 2, 3];

export default function WhyDutyCredit() {
  const { t } = useTranslation();
  const tr = (key) => t(`traveller.${key}`);

  return (
    <div className="bg-card rounded-2xl border border-border p-6 space-y-4">
      <div>
        <h2 className="font-heading font-bold text-lg">{tr("why_title")}</h2>
        <p className="text-sm text-muted-foreground mt-1">{tr("why_body")}</p>
      </div>
      <div className="space-y-3">
        {REASONS.map((n) => (
          <div key={n} className="space-y-0.5">
            <p className="text-sm font-semibold text-foreground">{tr(`why_${n}_title`)}</p>
            <p className="text-sm text-muted-foreground">{tr(`why_${n}_desc`)}</p>
          </div>
        ))}
      </div>
    </div>
  );
}