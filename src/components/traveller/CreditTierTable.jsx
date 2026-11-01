import { useTranslation } from "react-i18next";
import { DUTY_CREDIT_TIERS } from "@/data/dutyCreditTiers";

const eur = (value) => `€${value.toFixed(2).replace(/\.00$/, "")}`;

const basketLabel = (tier) =>
  tier.max ? `€${tier.min}–€${tier.max}` : `€${tier.min}+`;

const savingLabel = (tier) =>
  tier.discountMin === tier.discount
    ? eur(tier.discount)
    : `${eur(tier.discountMin)}–${eur(tier.discount)}`;

export default function CreditTierTable() {
  const { t } = useTranslation();
  const tr = (key) => t(`traveller.${key}`);

  return (
    <div className="bg-card rounded-2xl border border-border p-6 space-y-4">
      <div>
        <h2 className="font-heading font-bold text-lg">{tr("worth_title")}</h2>
        <p className="text-sm text-muted-foreground mt-1">{tr("worth_desc")}</p>
      </div>

      <div className="divide-y divide-border">
        <div className="flex items-center justify-between pb-2 text-xs font-semibold uppercase tracking-wide text-muted-foreground">
          <span>{tr("worth_basket")}</span>
          <span>{tr("worth_save")}</span>
        </div>
        {DUTY_CREDIT_TIERS.map((tier) => (
          <div key={tier.name} className="flex items-center justify-between py-2 text-sm">
            <span className="text-foreground">{basketLabel(tier)}</span>
            <span className="font-semibold text-primary">{savingLabel(tier)}</span>
          </div>
        ))}
      </div>

      <p className="text-xs text-muted-foreground">{tr("worth_note")}</p>
    </div>
  );
}