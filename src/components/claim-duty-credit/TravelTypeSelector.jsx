import { useTranslation } from "react-i18next";
import { Label } from "@/components/ui/label";
import { TRAVEL_TYPES } from "@/data/travelTypes";

export default function TravelTypeSelector({ value, onChange }) {
  const { t } = useTranslation();

  return (
    <div>
      <Label className="text-sm font-semibold mb-2 block">
        {t('claimDutyCredit.travel_type_label')}
      </Label>
      <div className="grid grid-cols-3 gap-2">
        {TRAVEL_TYPES.map(({ id, icon: Icon }) => {
          const active = value === id;
          return (
            <button
              key={id}
              type="button"
              onClick={() => onChange(id)}
              aria-pressed={active}
              className={`flex flex-col items-center justify-center gap-1.5 rounded-xl border px-2 py-3 transition-colors ${
                active
                  ? "border-primary bg-primary/5 text-primary"
                  : "border-border text-muted-foreground hover:border-primary/40 hover:text-foreground"
              }`}
            >
              <Icon className="w-5 h-5" />
              <span className="text-xs font-medium text-center leading-tight">
                {t(`claimDutyCredit.verticals.${id}.name`)}
              </span>
            </button>
          );
        })}
      </div>
    </div>
  );
}