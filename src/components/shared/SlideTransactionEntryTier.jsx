import { BarChart3 } from "lucide-react";
import AirportRetailerIcon from "@/components/AirportRetailerIcon";
import TravelerIcon from "@/components/TravelerIcon";

const ACCENT = "#2563eb";
const GRADIENT = "linear-gradient(135deg, #2563eb 0%, #1e3a8a 100%)";

function SlideWrapper({ children }) {
  return (
    <div className="w-full flex flex-col overflow-y-auto bg-white text-[#0a0f1e]">
      {children}
    </div>
  );
}

function GridBg() {
  return (
    <div className="absolute inset-0 opacity-[0.04]" style={{
      backgroundImage: "linear-gradient(rgba(37,99,235,0.4) 1px, transparent 1px), linear-gradient(90deg, rgba(37,99,235,0.4) 1px, transparent 1px)",
      backgroundSize: "40px 40px"
    }} />
  );
}

export default function SlideTransactionEntryTier() {
  return (
    <SlideWrapper>
      <div className="flex-1 flex flex-col justify-center px-5 py-6 md:px-12 md:py-6 relative">
        <GridBg />
        <div className="relative z-10">
          <div className="mb-6">
            <span className="text-sm font-semibold uppercase tracking-widest" style={{ color: ACCENT }}>One Transaction — Three Beneficiaries</span>
            <h2 className="text-xl md:text-3xl font-heading font-bold text-[#0a0f1e] mt-2">
              $23 Entry-Tier Qualifying Sale Example
            </h2>
          </div>
          <div className="grid grid-cols-3 gap-3 mb-6">
            {[
              { party: "Traveller", Icon: TravelerIcon, value: "$1.15", sub: "DutyCredit saving (5%)", bg: "bg-green-50", border: "border-green-200", text: "text-green-600" },
              { party: "Airport Retailer", Icon: AirportRetailerIcon, value: "$21.28", sub: "Net before normal costs (92.5%)", bg: "bg-blue-50", border: "border-blue-200", text: "text-blue-600" },
              { party: "DutyBoost", Icon: BarChart3, value: "$0.58", sub: "Platform fee (2.5%)", bg: "bg-orange-50", border: "border-orange-200", text: "text-orange-600" },
            ].map((p) => (
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
              <div className="text-slate-500 text-xs uppercase tracking-wide mb-2">Total = $23.00</div>
              <div className="flex h-6 rounded-full overflow-hidden gap-px">
                <div className="bg-green-500" style={{ width: "5%" }} />
                <div className="bg-blue-500" style={{ width: "92.5%" }} />
                <div className="bg-orange-500" style={{ width: "2.5%" }} />
              </div>
              <div className="flex gap-3 mt-2 text-xs flex-wrap">
                {[
                  { color: "bg-green-500", label: "Traveller 5%" },
                  { color: "bg-blue-500", label: "Retailer 92.5%" },
                  { color: "bg-orange-500", label: "DutyBoost 2.5%" },
                ].map((l) => (
                  <div key={l.label} className="flex items-center gap-1.5">
                    <div className={`w-3 h-3 rounded-sm ${l.color}`} />
                    <span className="text-slate-600">{l.label}</span>
                  </div>
                ))}
              </div>
            </div>
            <div className="rounded-2xl p-5 text-white" style={{ background: GRADIENT }}>
              <h3 className="font-bold mb-3">Integrate Once. Deploy Repeatedly.</h3>
              <p className="text-blue-50 text-sm leading-relaxed">
                A single Enterprise POS integration can enable DutyBoost across multiple retailers, stores, airports and geographic markets — creating fundamentally better scaling economics than building individual integrations per retailer.
              </p>
              <div className="mt-3 text-blue-100 font-semibold text-sm">
                Technology strategy: INTEGRATE ONCE. DEPLOY REPEATEDLY.
              </div>
            </div>
          </div>
          <div className="mt-5 bg-amber-50 border border-amber-200 rounded-2xl p-4">
            <p className="text-slate-700 text-sm leading-relaxed">
              <span className="font-bold">Customer acquisition cost happens after the sale — not before.</span> The retailer spends nothing to acquire the traveller: each DutyCredit redemption is validated through the POS and settled only once the sale is made, so every transaction is fully traceable and attributable.
            </p>
          </div>
        </div>
      </div>
    </SlideWrapper>
  );
}