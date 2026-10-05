import { BarChart3 } from "lucide-react";
import AirportRetailerIcon from "@/components/AirportRetailerIcon";
import TravelerIcon from "@/components/TravelerIcon";
import { ACCENT, GridBg, SlideWrapper } from "../Shared";
import { useDeckLang } from "../LanguageContext";

const ICONS = [TravelerIcon, AirportRetailerIcon, BarChart3];
const TONES = [
  { bg: "bg-green-50", border: "border-green-200", text: "text-green-600" },
  { bg: "bg-slate-50", border: "border-slate-200", text: "text-slate-700" },
  { bg: "bg-amber-50", border: "border-amber-200", text: "text-amber-600" },
];

export default function SlideTransaction() {
  const { t } = useDeckLang();
  const c = t.retail.transaction;

  return (
    <SlideWrapper>
      <div className="flex-1 flex flex-col justify-center px-5 py-6 md:px-12 md:py-6 relative">
        <GridBg />
        <div className="relative z-10">
          <div className="mb-6">
            <span className="text-sm font-semibold uppercase tracking-widest" style={{ color: ACCENT }}>{c.eyebrow}</span>
            <h2 className="text-xl md:text-3xl font-heading font-bold text-[#0a0f1e] mt-2">{c.title}</h2>
          </div>

          <div className="grid grid-cols-3 gap-3 mb-6">
            {c.parties.map((p, i) => {
              const Icon = ICONS[i];
              return (
                <div key={p.party} className={`${TONES[i].bg} border ${TONES[i].border} rounded-2xl p-4 text-center`}>
                  <Icon className={`w-9 h-9 mx-auto mb-2 ${TONES[i].text}`} />
                  <div className="text-slate-800 font-semibold text-xs sm:text-sm mb-2">{p.party}</div>
                  <div className={`text-2xl font-bold mb-1 ${TONES[i].text}`}>{p.value}</div>
                  <div className="text-slate-500 text-xs leading-snug">{p.sub}</div>
                </div>
              );
            })}
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            <div className="bg-slate-50 border border-slate-200 rounded-2xl p-5">
              <div className="text-slate-500 text-xs uppercase tracking-wide mb-2">{c.total}</div>
              <div className="flex h-6 rounded-full overflow-hidden gap-px">
                <div className="bg-green-500" style={{ width: "5%" }} />
                <div className="bg-slate-700" style={{ width: "92.5%" }} />
                <div className="bg-amber-500" style={{ width: "2.5%" }} />
              </div>
              <div className="flex gap-3 mt-2 text-xs flex-wrap">
                {[
                  { color: "bg-green-500", label: c.legend[0] },
                  { color: "bg-slate-700", label: c.legend[1] },
                  { color: "bg-amber-500", label: c.legend[2] },
                ].map((l) => (
                  <div key={l.label} className="flex items-center gap-1.5">
                    <div className={`w-3 h-3 rounded-sm ${l.color}`} />
                    <span className="text-slate-600">{l.label}</span>
                  </div>
                ))}
              </div>
            </div>
            <div className="rounded-2xl p-5 text-white" style={{ background: `linear-gradient(135deg, ${ACCENT} 0%, #6b1f66 100%)` }}>
              <h3 className="font-bold mb-3">{c.integrateTitle}</h3>
              <p className="text-white/85 text-sm leading-relaxed">{c.integrateBody}</p>
              <div className="mt-3 text-white/80 font-semibold text-sm">{c.integrateFooter}</div>
            </div>
          </div>

          <div className="mt-5 bg-amber-50 border border-amber-200 rounded-2xl p-4">
            <p className="text-slate-700 text-sm leading-relaxed">
              <span className="font-bold">{c.cacTitle}</span> {c.cacBody}
            </p>
          </div>
        </div>
      </div>
    </SlideWrapper>
  );
}