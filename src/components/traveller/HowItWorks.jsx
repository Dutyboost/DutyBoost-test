import { useTranslation } from "react-i18next";

const STEPS = [1, 2, 3];

export default function HowItWorks() {
  const { t } = useTranslation();
  const tr = (key) => t(`traveller.${key}`);

  return (
    <div className="bg-card rounded-2xl border border-border p-6 space-y-4">
      <h2 className="font-heading font-bold text-lg">{tr("how_title")}</h2>
      <ol className="space-y-4">
        {STEPS.map((n) => (
          <li key={n} className="flex gap-3">
            <span className="shrink-0 w-7 h-7 rounded-full bg-primary/10 text-primary text-sm font-semibold flex items-center justify-center">
              {n}
            </span>
            <div className="space-y-0.5">
              <p className="text-sm font-semibold text-foreground">{tr(`how_s${n}_title`)}</p>
              <p className="text-sm text-muted-foreground">{tr(`how_s${n}_desc`)}</p>
            </div>
          </li>
        ))}
      </ol>
    </div>
  );
}