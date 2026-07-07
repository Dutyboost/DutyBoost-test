import { useTranslation } from "react-i18next";
import { Users, UserCircle2 } from "lucide-react";

// Groups the currently selected airports by their assigned commercial lead,
// so the per-airport granularity is visible at a glance inside Step 2.
export default function OwnerBreakdown({ selectedAirports, airportOwners }) {
  const { t } = useTranslation();
  if (!selectedAirports || selectedAirports.length === 0) return null;

  const groups = {};
  let unassigned = 0;
  selectedAirports.forEach((a) => {
    const o = airportOwners[a.code];
    if (o?.name) {
      if (!groups[o.name]) groups[o.name] = { name: o.name, email: o.email, count: 0 };
      groups[o.name].count++;
    } else {
      unassigned++;
    }
  });
  const groupList = Object.values(groups).sort((a, b) => b.count - a.count);

  return (
    <div className="mt-4 border-t border-slate-200 pt-3">
      <div className="flex items-center gap-2 mb-2">
        <Users className="w-4 h-4 text-primary" />
        <h4 className="text-xs font-semibold text-slate-700 uppercase tracking-widest">{t("entCalc.owner_breakdown_title")}</h4>
      </div>
      {groupList.length === 0 ? (
        <p className="text-xs text-slate-400">{t("entCalc.owner_breakdown_empty")}</p>
      ) : (
        <div className="flex flex-wrap gap-1.5">
          {groupList.map((g) => (
            <span
              key={g.name}
              className="inline-flex items-center gap-1.5 text-xs bg-primary/5 border border-primary/20 text-primary rounded-full px-2.5 py-1"
              title={g.email ? `${g.name} · ${g.email}` : g.name}
            >
              <UserCircle2 className="w-3.5 h-3.5" />
              <span className="truncate max-w-[120px]">{g.name}</span>
              <span className="font-semibold">{g.count}</span>
            </span>
          ))}
          {unassigned > 0 && (
            <span className="inline-flex items-center gap-1.5 text-xs bg-slate-100 border border-slate-200 text-slate-500 rounded-full px-2.5 py-1">
              {t("entCalc.owner_unassigned_group")}
              <span className="font-semibold">{unassigned}</span>
            </span>
          )}
        </div>
      )}
    </div>
  );
}