import { Card } from "@/components/ui/card";

/** Four headline numbers for one partner — never another company's, never another sector's. */
export default function PartnerKpiRow({ items = [], accent }) {
  return (
    <div className="grid grid-cols-2 lg:grid-cols-4 gap-3">
      {items.map(({ label, value, icon: Icon }) => (
        <Card key={label} className="p-4">
          <div className="flex items-center gap-2 text-muted-foreground">
            {Icon ? <Icon className="w-4 h-4" style={{ color: accent }} /> : null}
            <span className="text-xs">{label}</span>
          </div>
          <p className="font-heading font-bold text-xl mt-2 tabular-nums">{value}</p>
        </Card>
      ))}
    </div>
  );
}