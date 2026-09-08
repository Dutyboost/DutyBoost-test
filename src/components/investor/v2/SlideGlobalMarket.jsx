import { Globe, TrendingUp, Building2, Euro, Users } from "lucide-react";
import { SlideWrapper, GridBg } from "./Shared";

const ACI_LINK = "https://aci.aero/2026/07/15/worlds-busiest-airports-atlanta-holds-asia-climbs-strong-demand-while-asia-pacific-growth-reshape-the-rankings/?utm_source=chatgpt.com";
const M1NDSET_LINK = "https://m1nd-set.com/";
const TFWA_LINK = "https://www.tfwa.com/";

export default function SlideGlobalMarket() {
  return (
    <SlideWrapper>
      <div className="flex-1 flex flex-col justify-center px-5 py-6 md:px-12 md:py-6 relative">
        <GridBg />
        <div className="relative z-10">
          <div className="mb-5">
            <span className="text-blue-600 text-sm font-semibold uppercase tracking-widest">Global Market</span>
            <h2 className="text-xl md:text-3xl font-heading font-bold text-[#0a0f1e] mt-2">
              The Addressable Market <span className="text-blue-600">Already Exists</span>
            </h2>
            <p className="text-slate-500 mt-2 text-sm">DutyBoost connects value within an established global market — no new infrastructure required.</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-5">
            <div className="bg-blue-50 border border-blue-200 rounded-2xl p-5 text-center">
              <Globe className="w-8 h-8 text-blue-600 mx-auto mb-2" />
              <div className="text-2xl md:text-3xl font-bold text-blue-700 mb-1">€37.1B</div>
              <div className="text-slate-600 font-semibold text-sm">Airport DF&amp;TR Market</div>
              <div className="text-slate-500 text-xs mt-1">
                <a href={TFWA_LINK} target="_blank" rel="noopener noreferrer" className="text-blue-600 font-semibold underline decoration-blue-600/50 hover:decoration-blue-400 hover:text-blue-500 transition-colors">(TFWA 2025)</a> — 56.6% of €65.5B worldwide
              </div>
            </div>
            <div className="bg-green-50 border border-green-200 rounded-2xl p-5 text-center">
              <TrendingUp className="w-8 h-8 text-green-600 mx-auto mb-2" />
              <div className="text-2xl md:text-3xl font-bold text-green-700 mb-1">27%</div>
              <div className="text-slate-600 font-semibold text-sm">Global Penetration Rate</div>
              <div className="text-slate-500 text-xs mt-1">
                <a href={M1NDSET_LINK} target="_blank" rel="noopener noreferrer" className="text-blue-600 font-semibold underline decoration-blue-600/50 hover:decoration-blue-400 hover:text-blue-500 transition-colors">(m1nd-set)</a> — industry conversion benchmark
              </div>
            </div>
            <div className="bg-red-50 border border-red-200 rounded-2xl p-5 text-center">
              <Users className="w-8 h-8 text-red-600 mx-auto mb-2" />
              <div className="text-2xl md:text-3xl font-bold text-red-700 mb-1">73%</div>
              <div className="text-slate-600 font-semibold text-sm">Non-Purchasing Travellers</div>
              <div className="text-slate-500 text-xs mt-1">
                <a href={M1NDSET_LINK} target="_blank" rel="noopener noreferrer" className="text-blue-600 font-semibold underline decoration-blue-600/50 hover:decoration-blue-400 hover:text-blue-500 transition-colors">(m1nd-set)</a> — 7.15B unreached passengers
              </div>
            </div>
            <div className="bg-violet-50 border border-violet-200 rounded-2xl p-5 text-center">
              <Building2 className="w-8 h-8 text-violet-600 mx-auto mb-2" />
              <div className="text-2xl md:text-3xl font-bold text-violet-700 mb-1">4,000</div>
              <div className="text-slate-600 font-semibold text-sm">Commercial Airports</div>
              <div className="text-slate-500 text-xs mt-1">
                <a href={ACI_LINK} target="_blank" rel="noopener noreferrer" className="text-blue-600 font-semibold underline decoration-blue-600/50 hover:decoration-blue-400 hover:text-blue-500 transition-colors">(ACI World)</a> — 2,800 with duty-free
              </div>
            </div>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            <div className="bg-slate-800 text-white rounded-2xl p-6">
              <h3 className="font-bold text-lg mb-4">Global Revenue Generated in 2025</h3>
              <div className="text-slate-400 text-xs mb-3">
                Source:{' '}
                <a href={TFWA_LINK} target="_blank" rel="noopener noreferrer" className="text-blue-400 font-semibold underline decoration-blue-400/50 hover:decoration-blue-300 hover:text-blue-300 transition-colors">
                  (TFWA 2025 Handbook)
                </a>{' '}
                — worldwide €65.5B splits by channel: airport €37.1B (56.6%) + other channels €28.4B (43.4%)
              </div>
              <div className="space-y-4">
                {[
                  { label: "Worldwide DF&TR Industry", val: "€65.5B", pct: "100%", color: "bg-blue-500" },
                  { label: "Airport DF&TR Channel", val: "€37.1B", pct: "56.6%", color: "bg-indigo-500" },
                  { label: "Other Channels (Downtown, Cruise, Border, Inflight)", val: "€28.4B", pct: "43.4%", color: "bg-violet-500" },
                ].map((row) => (
                  <div key={row.label} className="space-y-1">
                    <div className="flex justify-between text-sm">
                      <span className="text-slate-300">{row.label}</span>
                      <span className="text-white font-bold">{row.val}</span>
                    </div>
                    <div className="bg-white/10 rounded-full h-2">
                      <div className={`${row.color} h-2 rounded-full`} style={{ width: row.pct === "100%" ? "100%" : row.pct }} />
                    </div>
                  </div>
                ))}
              </div>
            </div>
            <div className="bg-amber-50 border border-amber-200 rounded-2xl p-6">
              <h3 className="font-bold text-slate-700 mb-3">The Headroom</h3>
              <div className="space-y-3">
                {[
                  { icon: Users, text: "9.8B global passengers in 2025", src: "ACI World" },
                  { icon: TrendingUp, text: "Only 27% convert — 73% walk past stores", src: "m1nd-set / TFWA" },
                  { icon: Building2, text: "45,000 retail stores across 2,800 airports with retail", src: "ACI / DFWC" },
                  { icon: Euro, text: "€37.1B already generated — without pre-activation", src: "TFWA 2025" },
                ].map((item, i) => (
                  <div key={i} className="flex items-start gap-3">
                    <div className="w-8 h-8 rounded-full bg-amber-100 border border-amber-300 flex items-center justify-center flex-shrink-0">
                      <item.icon className="w-4 h-4 text-amber-600" />
                    </div>
                    <div>
                      <div className="text-slate-700 text-sm font-medium">{item.text}</div>
                      <div className="text-slate-400 text-xs">{item.src}</div>
                    </div>
                  </div>
                ))}
              </div>
              <div className="mt-4 bg-green-100 border border-green-300 rounded-xl p-3">
                <p className="text-green-800 text-sm font-semibold">DutyBoost's role: pre-activate the 73% who currently don't buy.</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </SlideWrapper>
  );
}