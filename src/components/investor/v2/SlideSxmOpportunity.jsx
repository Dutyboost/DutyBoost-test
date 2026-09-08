import { TrendingUp, DollarSign, Users, Store, ArrowRight } from "lucide-react";
import { SlideWrapper, GridBg } from "./Shared";

export default function SlideSxmOpportunity() {
  return (
    <SlideWrapper>
      <div className="flex-1 flex flex-col justify-center px-5 py-6 md:px-12 md:py-6 relative">
        <GridBg />
        <div className="relative z-10">
          <div className="mb-5">
            <span className="text-blue-600 text-sm font-semibold uppercase tracking-widest">SXM — Opportunity &amp; Potential</span>
            <h2 className="text-xl md:text-3xl font-heading font-bold text-[#0a0f1e] mt-2">
              What DutyBoost Brings <span className="text-blue-600">to Sint Maarten</span>
            </h2>
            <p className="text-slate-500 mt-1 text-sm">855,994 air arrivals — 73% (625K) never purchase. If just 1% more of the non-purchasing travellers convert through a DutyBoost-validated transaction, here is the incremental revenue.</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-5 mb-5">
            {[
              { size: "Single Store", reach: "~10% of 625K = ~62.5K travellers", conv: "+1% = ~625 txns", gross: "$62.5K", net: "$54.7K", color: "blue" },
              { size: "Multi-Store Group", reach: "~30% of 625K = ~187.5K travellers", conv: "+1% = ~1.9K txns", gross: "$187.5K", net: "$164K", color: "indigo" },
              { size: "Airport-Wide", reach: "100% of 625K travellers", conv: "+1% = ~6.3K txns", gross: "$625K", net: "$547K", color: "violet" },
            ].map((s) => (
              <div key={s.size} className={`bg-${s.color}-50 border border-${s.color}-200 rounded-2xl p-5 text-center`}>
                <div className={`text-xs font-semibold text-${s.color}-600 uppercase tracking-wide mb-1`}>{s.size}</div>
                <div className="text-slate-500 text-sm mb-3">{s.reach}</div>
                <div className={`text-2xl md:text-3xl font-bold text-${s.color}-700 mb-1`}>{s.gross}</div>
                <div className={`text-${s.color}-600 text-sm font-medium mb-2`}>incremental retail value</div>
                <div className="text-slate-600 text-xs border-t border-slate-200 pt-2">retailer net (87.5% at $100 baseline): <span className="font-semibold text-slate-800">{s.net}</span></div>
                <div className="text-slate-500 text-xs mt-1">{s.conv} @ $100 baseline basket</div>
              </div>
            ))}
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            <div className="bg-slate-800 text-white rounded-2xl p-5">
              <h3 className="font-bold mb-3">It Scales With Conversion</h3>
              <div className="space-y-2 text-sm">
                {[
                  { pp: "+0.5% conversion", mult: "½× the figures above" },
                  { pp: "+1% conversion", mult: "the figures above" },
                  { pp: "+2% conversion", mult: "2× the figures above" },
                  { pp: "+5% conversion", mult: "5× the figures above" },
                ].map((row, i) => (
                  <div key={i} className={`flex justify-between items-center py-1.5 px-3 rounded-lg ${i === 1 ? "bg-blue-800/50 font-semibold" : ""}`}>
                    <span className="text-blue-300">{row.pp}</span>
                    <span className="text-slate-300">{row.mult}</span>
                  </div>
                ))}
              </div>
            </div>
            <div className="bg-gradient-to-br from-green-50 to-emerald-50 border border-green-200 rounded-2xl p-5">
              <h3 className="font-bold text-green-900 mb-3">Why This Is Pure Upside</h3>
              <div className="space-y-2.5">
                {[
                  "Revenue comes from travellers who otherwise wouldn't have bought",
                  "No upfront cost, no marketing spend, no shelf price changes",
                  "87.5% retailer net on every qualifying transaction (at $100 baseline basket)",
                  "Travel & Corporate Partners handle activation before arrival",
                  "POS validates — settlement is transparent and per-transaction",
                ].map((item, i) => (
                  <div key={i} className="flex items-start gap-2">
                    <div className="w-5 h-5 rounded-full bg-green-100 border border-green-300 flex items-center justify-center flex-shrink-0 mt-0.5">
                      <span className="text-green-600 text-xs">✓</span>
                    </div>
                    <span className="text-slate-700 text-sm">{item}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
          <div className="mt-5 bg-gradient-to-r from-blue-600 to-indigo-700 rounded-2xl p-5 text-white">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-center">
              {[
                { Icon: Users, label: "Non-Purchasing Travellers", val: "625K" },
                { Icon: Store, label: "Retailers Engaged", val: "3+" },
                { Icon: DollarSign, label: "Airport-Wide Potential", val: "$547K+" },
                { Icon: TrendingUp, label: "At Just +1% Conversion", val: "Net-New" },
              ].map((s, i) => (
                <div key={i} className="flex flex-col items-center">
                  <s.Icon className="w-6 h-6 text-blue-200 mb-1" />
                  <div className="text-xl font-bold">{s.val}</div>
                  <div className="text-blue-200 text-xs">{s.label}</div>
                </div>
              ))}
            </div>
            <div className="mt-4 flex items-center justify-center gap-2">
              <ArrowRight className="w-5 h-5" />
              <p className="text-blue-50 text-sm font-semibold">Sint Maarten is the proving ground — the model scales to 4,000 airports globally.</p>
            </div>
          </div>
        </div>
      </div>
    </SlideWrapper>
  );
}