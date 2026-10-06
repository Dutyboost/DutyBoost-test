import { Landmark, ShieldCheck, BarChart3, Globe2, Users2 } from "lucide-react";
import { ACCENT, SlideShell } from "./Shared";
import { MARKET, usdShort } from "./figures";
import { useRetailerRevenue, computeRetailerRevenue } from "./retailer/RetailerRevenueContext";
import { useDeckLang } from "./LanguageContext";

const ICONS = [Users2, BarChart3, ShieldCheck, Globe2];

export default function SlideGovernment() {
  const { t } = useDeckLang();
  const c = t.government;

  // The same scenario entered on the business-model slide, so the figures shown
  // to the government are the ones the retailer model actually produces.
  const { inputs } = useRetailerRevenue();
  const { estate } = computeRetailerRevenue(inputs);

  const VALUES = [usdShort(estate.gross), usdShort(estate.fee), MARKET.drPassengers];

  return (
    <SlideShell
      eyebrow={c.eyebrow}
      eyebrowColor={ACCENT}
      eyebrowClass="text-sm font-semibold uppercase tracking-widest"
      titleClass="text-2xl md:text-4xl font-heading font-bold text-[#0a0f1e] mt-2"
      subtitleClass="text-slate-500 mt-1 text-base leading-relaxed"
      title={
        <>
          {c.title} <span style={{ color: ACCENT }}>{c.titleAccent}</span>
        </>
      }
      subtitle={c.subtitle}
    >
      <div className="grid grid-cols-1 md:grid-cols-3 gap-3 mb-4">
        {c.kpis.map((label, i) => (
          <div
            key={label}
            className="rounded-2xl p-5"
            style={{ background: `${ACCENT}0d`, border: `1px solid ${ACCENT}33` }}
          >
            {i === 0 && <Landmark className="w-6 h-6 mb-2" style={{ color: ACCENT }} />}
            <div className="text-3xl font-bold" style={{ color: ACCENT }}>
              {VALUES[i]}
            </div>
            <p className="text-slate-600 text-sm mt-2 leading-snug">{label}</p>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
        {c.pillars.map((p, i) => {
          const Icon = ICONS[i];
          return (
            <div key={p.title} className="bg-slate-50 border border-slate-200 rounded-2xl p-5">
              <div className="flex items-center gap-2 mb-2">
                <Icon className="w-5 h-5" style={{ color: ACCENT }} />
                <h3 className="font-bold text-[#0a0f1e] text-sm">{p.title}</h3>
              </div>
              <p className="text-slate-600 text-sm leading-relaxed">{p.body}</p>
            </div>
          );
        })}
      </div>

      <div className="mt-4 bg-slate-800 text-white rounded-2xl p-5">
        <p className="text-sm leading-relaxed">
          <span className="font-bold">{c.darkLead}</span> {c.darkBody}
        </p>
      </div>

      <p className="text-slate-400 text-xs mt-3">{c.footnote}</p>
    </SlideShell>
  );
}