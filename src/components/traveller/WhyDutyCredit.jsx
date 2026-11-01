import { useTranslation } from "react-i18next";

const REASONS = [1, 2, 3];

export default function WhyDutyCredit() {
  const { t } = useTranslation();
  const tr = (key) => t(`traveller.${key}`);

  return (
    <div className="bg-card rounded-2xl border border-border p-5 space-y-2">
      <h2 className="font-heading font-bold text-lg">{tr("why_title")}</h2>
      <p className="text-sm text-muted-foreground">{tr("why_body")}</p>
      <ul className="space-y-1.5 pt-1">
        {REASONS.map((n) => (
          <li key={n} className="flex items-start gap-2 text-sm text-foreground">
            <span className="w-1.5 h-1.5 rounded-full bg-primary shrink-0 mt-1.5" />
            <span>{tr(`why_${n}`)}</span>
          </li>
        ))}
      </ul>
    </div>
  );
}