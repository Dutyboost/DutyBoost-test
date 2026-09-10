import { Plane, Users, DollarSign, MapPin, TrendingUp } from "lucide-react";
import { SlideWrapper, GridBg } from "./Shared";

const SXM_LINK = "https://www.sintmaartengov.org/news/pages/Passenger-Arrivals-and-Cruise-Arrivals-Show-Growth-in-2025.aspx";
const CMI_LINK = "https://www.coherentmarketinsights.com/market-insight/caribbean-duty-free-retailing-market-4934";
const M1NDSET_LINK = "https://www.gtrmag.com/blog/gtr-magazine-looks-at-the-state-of-travel-and-tourism-in-the-caribbean";

export default function SlideSxmMarket() {
  return (
    <SlideWrapper>
      <div className="flex-1 flex flex-col justify-center px-5 py-6 md:px-12 md:py-6 relative">
        <GridBg />
        <div className="relative z-10">
          <div className="mb-5">
            <span className="text-blue-600 text-sm font-semibold uppercase tracking-widest">Sint Maarten — Market Focus</span>
            <h2 className="text-xl md:text-3xl font-heading font-bold text-[#0a0f1e] mt-2">
              Princess Juliana International Airport <span className="text-blue-600">(SXM)</span>
            </h2>
            <p className="text-slate-500 mt-1 text-sm">Narrowing the global opportunity to a concrete market — a single airport with established retail, clear passenger flows, and active stakeholder conversations.</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-5">
            <div className="bg-blue-50 border border-blue-200 rounded-2xl p-5 text-center">
              <Plane className="w-8 h-8 text-blue-600 mx-auto mb-2" />
              <div className="text-2xl md:text-3xl font-bold text-blue-700 mb-1">855,994</div>
              <div className="text-slate-600 font-semibold text-sm">Air Arrivals (2025)</div>
              <div className="text-slate-500 text-xs mt-1">
                <a href={SXM_LINK} target="_blank" rel="noopener noreferrer" className="text-blue-600 font-semibold underline decoration-blue-600/50 hover:decoration-blue-400 hover:text-blue-500 transition-colors">(SXM Gov)</a> — 53.9% N. America | 25.8% EU
              </div>
            </div>
            <div className="bg-red-50 border border-red-200 rounded-2xl p-5 text-center">
              <Users className="w-8 h-8 text-red-600 mx-auto mb-2" />
              <div className="text-2xl md:text-3xl font-bold text-red-700 mb-1">625K</div>
              <div className="text-slate-600 font-semibold text-sm">Non-Purchasing Travellers</div>
              <div className="text-slate-500 text-xs mt-1">73% of arrivals — the conversion headroom</div>
            </div>
            <div className="bg-violet-50 border border-violet-200 rounded-2xl p-5 text-center">
              <DollarSign className="w-8 h-8 text-violet-600 mx-auto mb-2" />
              <div className="text-2xl md:text-3xl font-bold text-violet-700 mb-1">$67M</div>
              <div className="text-slate-600 font-semibold text-sm">SXM DF&amp;TR Market</div>
              <div className="text-slate-500 text-xs mt-1">2.45% of $2.72B Caribbean market</div>
            </div>
            <div className="bg-green-50 border border-green-200 rounded-2xl p-5 text-center">
              <TrendingUp className="w-8 h-8 text-green-600 mx-auto mb-2" />
              <div className="text-2xl md:text-3xl font-bold text-green-700 mb-1">21.7%</div>
              <div className="text-slate-600 font-semibold text-sm">Caribbean CAGR</div>
              <div className="text-slate-500 text-xs mt-1">
                <a href={CMI_LINK} target="_blank" rel="noopener noreferrer" className="text-blue-600 font-semibold underline decoration-blue-600/50 hover:decoration-blue-400 hover:text-blue-500 transition-colors">(CMI)</a> 2026–2033
              </div>
            </div>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            <div className="bg-slate-50 border border-slate-200 rounded-2xl p-6">
              <h3 className="font-bold text-slate-700 mb-4">SXM DF&amp;TR Categories (2026 est.)</h3>
              <div className="space-y-2">
                {[
                  { cat: "Fragrances & Cosmetics", val: "$23M", pct: 90 },
                  { cat: "Wines & Spirits", val: "$15M", pct: 59 },
                  { cat: "Fashion & Accessories", val: "$11M", pct: 43 },
                  { cat: "Tobacco", val: "$7M", pct: 27 },
                ].map((row) => (
                  <div key={row.cat} className="flex items-center gap-3">
                    <div className="w-32 text-sm text-slate-600">{row.cat}</div>
                    <div className="flex-1 bg-slate-200 rounded-full h-2">
                      <div className="bg-blue-600 h-2 rounded-full" style={{ width: `${row.pct}%` }} />
                    </div>
                    <div className="w-16 text-sm font-semibold text-slate-700 text-right">{row.val}</div>
                  </div>
                ))}
              </div>
              <div className="text-slate-400 text-xs mt-3">SXM category values estimated from CMI market share, proportional to SXM's 2.45% share of the Caribbean market</div>
            </div>
            <div className="bg-gradient-to-br from-blue-600 to-indigo-700 rounded-2xl p-6 text-white">
              <h3 className="font-bold text-lg mb-3">Why Sint Maarten, Now</h3>
              <div className="space-y-3">
                {[
                  { icon: MapPin, text: "Single-airport market — focused deployment, measurable impact" },
                  { icon: Users, text: "625K non-purchasing travellers — clear conversion headroom" },
                  { icon: Plane, text: "Diverse source markets: North America (53.9%) + EU (25.8%)" },
                  { icon: TrendingUp, text: "21.7% Caribbean CAGR — a growing regional market" },
                  { icon: DollarSign, text: "$67M existing market — no creation needed, just activation" },
                ].map((item, i) => (
                  <div key={i} className="flex items-start gap-3">
                    <item.icon className="w-5 h-5 text-blue-200 flex-shrink-0 mt-0.5" />
                    <span className="text-blue-50 text-sm">{item.text}</span>
                  </div>
                ))}
              </div>
              <div className="mt-4 bg-white rounded-xl p-3">
                <p className="text-slate-700 text-sm font-semibold">
                  <a href={M1NDSET_LINK} target="_blank" rel="noopener noreferrer" className="text-blue-600 underline decoration-blue-600/50 hover:decoration-blue-400 hover:text-blue-500 transition-colors">m1nd-set</a> Caribbean benchmark: 73% non-purchase rate confirms the activation opportunity.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </SlideWrapper>
  );
}