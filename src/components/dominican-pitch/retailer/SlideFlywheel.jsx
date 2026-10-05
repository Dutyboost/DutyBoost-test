import { Cpu, BarChart3, Link2, Briefcase, Plane, Package } from "lucide-react";
import AirportRetailerIcon from "@/components/AirportRetailerIcon";
import TravelerIcon from "@/components/TravelerIcon";
import { ACCENT, GridBg, SlideWrapper } from "../Shared";
import { useDeckLang } from "../LanguageContext";

const ICONS = [Briefcase, TravelerIcon, AirportRetailerIcon, Cpu, BarChart3, Link2, Plane, Package];

export default function SlideFlywheel() {
  const { t } = useDeckLang();
  const c = t.retail.flywheel;

  return (
    <SlideWrapper>
      <div className="flex-1 flex flex-col justify-center px-5 py-6 md:px-12 md:py-6 relative">
        <GridBg />
        <div className="relative z-10">
          <div className="mb-6">
            <span className="text-sm font-semibold uppercase tracking-widest" style={{ color: ACCENT }}>{c.eyebrow}</span>
            <h2 className="text-xl md:text-3xl font-heading font-bold text-[#0a0f1e] mt-2">
              {c.title} <span style={{ color: ACCENT }}>{c.titleAccent}</span>
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8 items-center">
            <div className="relative flex items-center justify-center" style={{ height: "430px" }}>
              <div className="absolute inset-0 rounded-full border-2" style={{ borderColor: `${ACCENT}33` }} />
              <div
                className="rounded-full w-36 h-36 flex flex-col items-center justify-center text-center z-10"
                style={{ background: ACCENT }}
              >
                <div className="text-white text-sm font-bold leading-tight px-3">
                  Performance-Based Customer Acquisition Infrastructure
                </div>
              </div>
              {c.steps.slice(0, 11).map((step, i) => {
                const angle = (i / 11) * 360 - 90;
                const rad = (angle * Math.PI) / 180;
                const r = 145;
                const x = 50 + (r / 3.4) * Math.cos(rad);
                const y = 50 + (r / 3.4) * Math.sin(rad);
                return (
                  <div
                    key={step}
                    className="absolute bg-white border rounded-lg px-2 py-1 text-center"
                    style={{ left: `${x}%`, top: `${y}%`, transform: "translate(-50%, -50%)", maxWidth: "110px", borderColor: `${ACCENT}33` }}
                  >
                    <div className="text-sm font-semibold leading-tight" style={{ color: ACCENT }}>{step}</div>
                  </div>
                );
              })}
              <div className="absolute inset-0 rounded-full border-2 border-dashed animate-spin" style={{ borderColor: `${ACCENT}55`, animationDuration: "30s" }} />
            </div>

            <div className="space-y-4">
              <div className="bg-slate-50 border border-slate-200 rounded-2xl p-5">
                <h3 className="text-slate-800 font-bold text-lg mb-4">{c.networkTitle}</h3>
                <div className="space-y-3 text-base">
                  {c.networkRows.map((row, i) => {
                    const Icon = ICONS[i];
                    return (
                      <div key={row.party} className="flex items-start gap-2.5">
                        <Icon className="w-5 h-5 mt-0.5 flex-shrink-0" style={{ color: ACCENT }} />
                        <div>
                          <span className="font-semibold" style={{ color: ACCENT }}>{row.party} </span>
                          <span className="text-slate-600">{row.effect}</span>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
              <div className="rounded-2xl p-5 text-white" style={{ background: `linear-gradient(135deg, ${ACCENT} 0%, #6b1f66 100%)` }}>
                <p className="font-bold text-xl lg:text-2xl leading-snug">{c.quote}</p>
                <p className="text-white/80 text-base mt-2">{c.quoteSub}</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </SlideWrapper>
  );
}