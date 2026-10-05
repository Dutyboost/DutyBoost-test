import { CheckCircle } from "lucide-react";
import { ACCENT, GridBg, SlideWrapper } from "../Shared";
import { useDeckLang } from "../LanguageContext";

const money = (v) => `$${v.toLocaleString("en-US", { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`;
const units = (v) => `$${v.toLocaleString("en-US", { maximumFractionDigits: 0 })}`;
const round2 = (n) => Math.round(n * 100) / 100;

export default function SlideTierMix() {
  const { t } = useDeckLang();
  const c = t.retail.tierMix;

  const rows = c.rows.map((r) => {
    const saves = r.capped ? Math.min(round2(r.basket * r.discPct), 60) : round2(r.basket * r.discPct);
    const fee = r.capped ? Math.min(round2(r.basket * 0.025), 25) : round2(r.basket * 0.025);
    const cost = round2(saves + fee);
    const keeps = round2(r.basket - cost);
    return { ...r, saves, fee, cost, keeps, keepsPct: `${((keeps / r.basket) * 100).toFixed(1)}%` };
  });

  return (
    <SlideWrapper>
      <div className="flex-1 flex flex-col justify-center px-5 py-5 md:px-10 md:py-5 relative">
        <GridBg />
        <div className="relative z-10">
          <div className="mb-3">
            <span className="text-xs font-semibold uppercase tracking-widest" style={{ color: ACCENT }}>{c.eyebrow}</span>
            <h2 className="text-xl md:text-2xl font-heading font-bold text-[#0a0f1e] mt-1.5">
              {c.title} <span style={{ color: ACCENT }}>{c.titleAccent}</span>
            </h2>
            <p className="text-slate-500 mt-1 max-w-4xl text-[13px]">{c.subtitle}</p>
          </div>

          <div className="overflow-x-auto mb-3">
            <table className="w-full min-w-[700px] border-collapse text-xs">
              <thead>
                <tr className="bg-slate-800 text-white">
                  {c.headers.map((h, i) => (
                    <th
                      key={h}
                      className={`font-semibold px-2.5 py-2 ${i === 0 ? "text-left rounded-tl-xl" : i === c.headers.length - 1 ? "text-right rounded-tr-xl" : "text-center"}`}
                    >
                      {h}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {rows.map((r, i) => (
                  <tr key={`${r.basket}${r.plus ? "+" : ""}`} className={`border-b border-slate-100 ${r.hot ? "bg-slate-100" : i % 2 === 0 ? "bg-slate-50" : "bg-white"}`}>
                    <td className="font-bold text-slate-800 px-2.5 py-2">{units(r.label ?? r.basket)}{r.plus ? "+" : ""}</td>
                    <td className="text-center font-semibold px-2.5 py-2" style={{ color: ACCENT }}>{r.share}</td>
                    <td className="text-center text-slate-600 px-2.5 py-2">{r.disc}</td>
                    <td className="text-center text-slate-600 px-2.5 py-2">{money(r.saves)}</td>
                    <td className="text-center text-slate-600 px-2.5 py-2">{money(r.fee)}</td>
                    <td className="text-center font-semibold text-red-600 px-2.5 py-2">{money(r.cost)}</td>
                    <td className="text-right font-semibold text-green-700 px-2.5 py-2">
                      {money(r.keeps)} <span className="text-slate-400 font-normal">({r.keepsPct})</span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <div className="bg-green-50 border border-green-200 rounded-xl flex items-start gap-2 px-3 py-2 mb-3">
            <CheckCircle className="w-4 h-4 text-green-600 flex-shrink-0 mt-0.5" />
            <p className="text-green-800 text-[13px]">{c.aboveNote}</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-2.5 mb-3">
            {c.stats.map((s) => (
              <div key={s.value} className="rounded-2xl text-white text-center p-3.5" style={{ background: `linear-gradient(135deg, ${ACCENT} 0%, #6b1f66 100%)` }}>
                <div className="text-2xl font-bold mb-1">{s.value}</div>
                <div className="font-semibold text-sm">{s.label}</div>
                <div className="text-white/70 mt-1 text-[11px] leading-snug">{s.sub}</div>
              </div>
            ))}
          </div>

          <div className="border-t border-slate-200 pt-2">
            <p className="text-slate-500 text-[11px] leading-relaxed">
              <span className="font-semibold uppercase tracking-wide text-slate-600">{c.basisTitle}: </span>
              {c.basis}
            </p>
          </div>
        </div>
      </div>
    </SlideWrapper>
  );
}