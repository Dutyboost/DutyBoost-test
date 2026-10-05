import { AIRLINE, SlideShell } from "./Shared";
import { AIRLINES, CARRIER_PASSENGERS, num } from "./figures";
import { useDeckLang } from "./LanguageContext";

export default function SlideAirlines() {
  const { t } = useDeckLang();
  const c = t.airlines;

  const fmt = (a) =>
    a.passengers === null
      ? c.notPublished
      : `${a.under ? c.under : a.approx ? c.approx : ""}${num(a.passengers)}${a.plus ? "+" : ""}`;

  return (
    <SlideShell
      eyebrow={c.eyebrow}
      eyebrowColor={AIRLINE}
      title={
        <>
          {c.title} <span style={{ color: AIRLINE }}>{c.titleAccent(num(CARRIER_PASSENGERS))}</span>
        </>
      }
      subtitle={c.subtitle}
    >
      <div className="overflow-x-auto rounded-2xl border border-slate-200">
        <table className="w-full text-sm min-w-[760px]">
          <thead>
            <tr className="bg-slate-50 text-slate-500 text-xs uppercase tracking-wide">
              <th className="text-left px-4 py-3 font-semibold">{c.headers.carrier}</th>
              <th className="text-right px-4 py-3 font-semibold">{c.headers.passengers}</th>
              <th className="text-right px-4 py-3 font-semibold">{c.headers.perDay}</th>
              <th className="text-left px-4 py-3 font-semibold">{c.headers.destinations}</th>
            </tr>
          </thead>
          <tbody>
            {AIRLINES.map((a) => (
              <tr key={a.name} className="border-t border-slate-100 align-top">
                <td className="px-4 py-3 font-semibold text-[#0a0f1e] whitespace-nowrap">{a.name}</td>
                <td className="px-4 py-3 text-right font-bold whitespace-nowrap" style={{ color: AIRLINE }}>
                  {fmt(a)}
                </td>
                <td className="px-4 py-3 text-right text-slate-500 whitespace-nowrap">
                  {c.perDay[a.name]}
                </td>
                <td className="px-4 py-3 text-slate-600 text-xs leading-relaxed">
                  {c.destinations[a.name]}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-3 mt-4">
        {c.kpis.map((k, i) => (
          <div
            key={k.label}
            className={`rounded-2xl p-4 ${i < 2 ? "bg-red-50 border border-red-200" : "bg-slate-50 border border-slate-200"}`}
          >
            <div
              className="text-xl md:text-2xl font-bold"
              style={i < 2 ? { color: AIRLINE } : { color: "#0a0f1e" }}
            >
              {k.value}
            </div>
            <p className="text-slate-600 text-sm mt-1">{k.label}</p>
          </div>
        ))}
      </div>

      <p className="text-slate-400 text-xs mt-3">{c.footnote}</p>
    </SlideShell>
  );
}