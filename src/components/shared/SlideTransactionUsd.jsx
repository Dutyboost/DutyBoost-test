import { BarChart3 } from "lucide-react";
import AirportRetailerIcon from "@/components/AirportRetailerIcon";
import TravelerIcon from "@/components/TravelerIcon";

// Transaction economics — one transaction, three beneficiaries.
// Shared by the USD pitch decks: identical to the Trinidad & Tobago deck.
export function SlideTransactionUsd({
  accent = "#952d8b",
  gradient = "linear-gradient(135deg, #952d8b 0%, #6b1f66 100%)",
}) {
  const parties = [
    { party: "Traveller", Icon: TravelerIcon, value: "$11.40", sub: "DutyCredit saving (10%)", bg: "bg-green-50", border: "border-green-200", text: "text-green-600" },
    { party: "Airport Retailer", Icon: AirportRetailerIcon, value: "$99.75", sub: "Net before normal costs (87.5%)", bg: "bg-purple-50", border: "border-purple-200", text: "text-purple-600" },
    { party: "DutyBoost", Icon: BarChart3, value: "$2.85", sub: "Platform fee (2.5%)", bg: "bg-orange-50", border: "border-orange-200", text: "text-orange-600" },
  ];

  const legend = [
    { color: "bg-green-500", label: "Traveller 10%" },
    { color: "bg-purple-500", label: "Retailer 87.5%" },
    { color: "bg-orange-500", label: "DutyBoost 2.5%" },
  ];

  return (
    <div className="w-full flex flex-col overflow-y-auto bg-white text-[#0a0f1e]">
      <div className="flex-1 flex flex-col justify-center px-5 py-6 md:px-12 md:py-6 relative">
        <div className="absolute inset-0 opacity-[0.04]" style={{
          backgroundImage: `linear-gradient(${accent} 1px, transparent 1px), linear-gradient(90deg, ${accent} 1px, transparent 1px)`,
          backgroundSize: "40px 40px"
        }} />
        <div className="relative z-10">
          <div className="mb-6">
            <span className="text-sm font-semibold uppercase tracking-widest" style={{ color: accent }}>One Transaction — Three Beneficiaries</span>
            <h2 className="text-xl md:text-3xl font-heading font-bold text-[#0a0f1e] mt-2">
              $114 Qualifying Retail Value Example
            </h2>
          </div>
          <div className="grid grid-cols-3 gap-3 mb-6">
            {parties.map((p) => (
              <div key={p.party} className={`${p.bg} border ${p.border} rounded-2xl p-4 text-center`}>
                <p.Icon className={`w-9 h-9 mx-auto mb-2 ${p.text}`} />
                <div className="text-slate-800 font-semibold text-xs sm:text-sm whitespace-nowrap mb-2">{p.party}</div>
                <div className={`text-2xl font-bold mb-1 ${p.text}`}>{p.value}</div>
                <div className="text-slate-500 text-xs leading-snug">{p.sub}</div>
              </div>
            ))}
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            <div className="bg-slate-50 border border-slate-200 rounded-2xl p-5">
              <div className="text-slate-500 text-xs uppercase tracking-wide mb-2">Total = $114.00</div>
              <div className="flex h-6 rounded-full overflow-hidden gap-px">
                <div className="bg-green-500" style={{ width: "10%" }} />
                <div className="bg-purple-500" style={{ width: "87.5%" }} />
                <div className="bg-orange-500" style={{ width: "2.5%" }} />
              </div>
              <div className="flex gap-3 mt-2 text-xs flex-wrap">
                {legend.map((l) => (
                  <div key={l.label} className="flex items-center gap-1.5">
                    <div className={`w-3 h-3 rounded-sm ${l.color}`} />
                    <span className="text-slate-600">{l.label}</span>
                  </div>
                ))}
              </div>
            </div>
            <div className="rounded-2xl p-5 text-white" style={{ background: gradient }}>
              <h3 className="font-bold mb-3">Integrate Once. Deploy Repeatedly.</h3>
              <p className="text-white/80 text-sm leading-relaxed">
                A single Enterprise POS integration can enable DutyBoost across multiple retailers, stores, airports and geographic markets — creating fundamentally better scaling economics than building individual integrations per retailer.
              </p>
              <div className="mt-3 text-white/90 font-semibold text-sm">
                Technology strategy: INTEGRATE ONCE. DEPLOY REPEATEDLY.
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default SlideTransactionUsd;