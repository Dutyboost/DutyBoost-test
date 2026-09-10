import DutyBoostLogo from "@/components/DutyBoostLogo";
import {
  SlideTeam, SlideSolution, SlidePosToggle, SlideTechnicalIntegration, SlideEconomics, SlideFlywheel,
} from "@/components/pos-pitch/PosPitchSlides";
import { Cpu, Store, Package, CheckCircle, Clock, ArrowRight, Plane, Users, DollarSign, MapPin, TrendingUp, Building2, Boxes, MessageSquare, Shield, Zap, Globe, ShoppingBag } from "lucide-react";

function SlideWrapper({ children }) {
  return (
    <div className="w-full flex flex-col overflow-y-auto lg:overflow-hidden bg-white text-[#0a0f1e]">
      {children}
    </div>
  );
}

function GridBg() {
  return (
    <div className="absolute inset-0 opacity-[0.04]" style={{
      backgroundImage: "linear-gradient(rgba(124,58,237,0.4) 1px, transparent 1px), linear-gradient(90deg, rgba(124,58,237,0.4) 1px, transparent 1px)",
      backgroundSize: "40px 40px"
    }} />
  );
}

const SXM_LINK = "https://www.sintmaartengov.org/news/pages/Passenger-Arrivals-and-Cruise-Arrivals-Show-Growth-in-2025.aspx";
const CMI_LINK = "https://www.coherentmarketinsights.com/market-insight/caribbean-duty-free-retailing-market-4934";
const M1NDSET_LINK = "https://www.gtrmag.com/blog/gtr-magazine-looks-at-the-state-of-travel-and-tourism-in-the-caribbean";
const ANTEK_LINK = "https://www.antek.sx";
const WAGOS_LINK = "https://wagos.com";
const DIVICO_LINK = "https://www.divico.shop";
const ILTT_LINK = "https://www.iltt-sxm.com";

// SLIDE 1: Cover — SXM + Antek
export function SlideCoverSxm() {
  return (
    <SlideWrapper>
      <div className="flex-1 flex flex-col items-center justify-center px-6 md:px-16 text-center relative">
        <GridBg />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] rounded-full opacity-10"
          style={{ background: "radial-gradient(circle, #7c3aed 0%, transparent 70%)" }} />
        <div className="relative z-10 flex flex-col items-center gap-8">
          <div className="bg-slate-50 rounded-2xl px-8 py-4 shadow-lg border border-slate-200">
            <DutyBoostLogo height={50} linkTo="/pos-partner" />
          </div>
          <div>
            <h1 className="text-3xl md:text-5xl font-heading font-bold text-[#0a0f1e] leading-tight mb-4">
              Sint Maarten POS Integration<br />
              <span className="text-violet-600">A Presentation for Antek</span>
            </h1>
            <p className="text-xl text-slate-500 max-w-3xl leading-relaxed">
              Princess Juliana International Airport (SXM) — Your Island. Your Integration. Your Revenue.
            </p>
          </div>
          <div className="grid grid-cols-3 gap-2 sm:gap-6 mt-4 w-full max-w-2xl">
            {[
              { label: "SXM Air Arrivals", value: "855,994" },
              { label: "Non-Purchasing", value: "625K" },
              { label: "Antek's Share", value: "10%" },
            ].map((s) => (
              <div key={s.label} className="text-center">
                <div className="text-xl sm:text-3xl font-bold text-violet-600">{s.value}</div>
                <div className="text-xs sm:text-sm text-slate-500 mt-1">{s.label}</div>
              </div>
            ))}
          </div>
          <div className="mt-2 text-xs text-slate-400 border border-slate-200 rounded px-4 py-2">
            CONFIDENTIAL — 2026 | Chamber of Commerce: 42053181 | VAT: NL869492068B01
          </div>
        </div>
      </div>
    </SlideWrapper>
  );
}

// SLIDE 2: Team — reused from PosPitchSlides
export { SlideTeam };

// SLIDE 3: SXM Market — violet themed
export function SlideSxmMarket() {
  return (
    <SlideWrapper>
      <div className="flex-1 flex flex-col justify-center px-5 py-6 md:px-12 md:py-6 relative">
        <GridBg />
        <div className="relative z-10">
          <div className="mb-5">
            <span className="text-violet-600 text-sm font-semibold uppercase tracking-widest">Sint Maarten — Market Focus</span>
            <h2 className="text-xl md:text-3xl font-heading font-bold text-[#0a0f1e] mt-2">
              Princess Juliana International Airport <span className="text-violet-600">(SXM)</span>
            </h2>
            <p className="text-slate-500 mt-1 text-sm">A concrete first market — a single airport with established retail, clear passenger flows, and active stakeholder conversations.</p>
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
                      <div className="bg-violet-600 h-2 rounded-full" style={{ width: `${row.pct}%` }} />
                    </div>
                    <div className="w-16 text-sm font-semibold text-slate-700 text-right">{row.val}</div>
                  </div>
                ))}
              </div>
              <div className="text-slate-400 text-xs mt-3">SXM category values estimated from CMI market share, proportional to SXM's 2.45% share of the Caribbean market</div>
            </div>
            <div className="bg-gradient-to-br from-violet-600 to-indigo-700 rounded-2xl p-6 text-white">
              <h3 className="font-bold text-lg mb-3">Why Sint Maarten First?</h3>
              <div className="space-y-3">
                {[
                  { icon: MapPin, text: "Single-airport market — focused deployment, measurable impact" },
                  { icon: Users, text: "625K non-purchasing travellers — clear conversion headroom" },
                  { icon: Plane, text: "Diverse source markets: North America (53.9%) + EU (25.8%)" },
                  { icon: TrendingUp, text: "21.7% Caribbean CAGR — a growing regional market" },
                  { icon: DollarSign, text: "$67M existing market — no creation needed, just activation" },
                ].map((item, i) => (
                  <div key={i} className="flex items-start gap-3">
                    <item.icon className="w-5 h-5 text-violet-200 flex-shrink-0 mt-0.5" />
                    <span className="text-violet-50 text-sm">{item.text}</span>
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

// SLIDE 4: The Facts — SXM context
export function SlideFactsSxm() {
  return (
    <SlideWrapper>
      <div className="flex-1 flex flex-col justify-center px-5 py-6 md:px-12 md:py-6 relative">
        <GridBg />
        <div className="relative z-10">
          <div className="mb-5">
            <span className="text-violet-600 text-sm font-semibold uppercase tracking-widest">The Facts at SXM</span>
            <h2 className="text-xl md:text-3xl font-heading font-bold text-[#0a0f1e] mt-2">
              625,000 SXM Passengers<br /><span className="text-violet-600">Never Make a Purchase</span>
            </h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8">
            <div className="space-y-5">
              <div className="bg-slate-50 border border-slate-200 rounded-2xl p-6">
                <div className="text-3xl md:text-5xl font-bold text-violet-600 mb-2">855,994</div>
                <div className="text-slate-800 font-semibold">SXM air arrivals in 2025</div>
                <div className="text-slate-500 text-sm mt-1">53.9% North America | 25.8% EU <a href={SXM_LINK} target="_blank" rel="noopener noreferrer" className="text-blue-600 font-bold underline decoration-blue-600/50 hover:decoration-blue-400 hover:text-blue-500 transition-colors">(SXM Gov)</a></div>
              </div>
              <div className="bg-slate-50 border border-slate-200 rounded-2xl p-6">
                <div className="text-3xl md:text-5xl font-bold text-orange-600 mb-2">27%</div>
                <a href={M1NDSET_LINK} target="_blank" rel="noopener noreferrer" className="text-blue-600 font-semibold underline decoration-blue-600/50 hover:decoration-blue-400 hover:text-blue-500 transition-colors">
                  Caribbean conversion benchmark
                </a>
                <div className="text-slate-500 text-sm mt-1">m1nd-set / TFWA industry penetration rate</div>
              </div>
              <div className="bg-red-50 border border-red-200 rounded-2xl p-6">
                <div className="text-3xl md:text-5xl font-bold text-red-600 mb-2">625K</div>
                <div className="text-slate-800 font-semibold">Non-purchasing SXM passengers</div>
                <div className="text-slate-500 text-sm mt-1">73% of 855,994 arrivals</div>
              </div>
            </div>
            <div className="flex flex-col gap-4 justify-center">
              <div className="bg-slate-50 border border-slate-200 rounded-2xl p-6">
                <h3 className="text-slate-800 font-semibold text-lg mb-4">What This Means at SXM</h3>
                <ul className="space-y-3">
                  {[
                    "625,000 travellers walk through SXM stores without buying every year",
                    "SXM generates $67M in duty-free & travel retail — without pre-activation",
                    "No financial reason for a non-intending buyer to enter a store",
                    "Activation starts only after security — too late to influence purchase intent",
                    "73% of SXM passengers walk straight to the gate",
                  ].map((item, i) => (
                    <li key={i} className="flex items-start gap-3">
                      <div className="w-1.5 h-1.5 rounded-full bg-red-500 mt-2 flex-shrink-0" />
                      <span className="text-slate-600 text-sm">{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
              <div className="bg-violet-50 border border-violet-200 rounded-2xl p-5">
                <p className="text-violet-700 text-sm leading-relaxed italic">
                  "At SXM, 625,000 non-purchasing travellers represent conversion headroom — not a permanent ceiling. DutyBoost activates them before they arrive."
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </SlideWrapper>
  );
}

// SLIDE 5-7: Solution, POS Toggle, Technical Integration — reused
export { SlideSolution, SlidePosToggle, SlideTechnicalIntegration };

// SLIDE 8: Antek's Opportunity
export function SlideAntekOpportunity() {
  return (
    <SlideWrapper>
      <div className="flex-1 flex flex-col justify-center px-5 py-6 md:px-12 md:py-6 relative">
        <GridBg />
        <div className="relative z-10">
          <div className="mb-5">
            <span className="text-violet-600 text-sm font-semibold uppercase tracking-widest">Antek's Opportunity</span>
            <h2 className="text-xl md:text-3xl font-heading font-bold text-[#0a0f1e] mt-2">
              The Integration Partner <span className="text-violet-600">for Sint Maarten</span>
            </h2>
            <p className="text-slate-500 mt-1 text-sm">
              <a href={ANTEK_LINK} target="_blank" rel="noopener noreferrer" className="text-blue-600 font-semibold underline decoration-blue-600/50 hover:decoration-blue-400 hover:text-blue-500 transition-colors">Antek</a> is the NCR CounterPoint system integrator and support partner for Sint Maarten and neighboring islands — the single technical entry point for DutyBoost across the SXM retailer base.
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="bg-slate-50 border border-slate-200 rounded-2xl p-6">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-12 h-12 rounded-full bg-violet-600 text-white flex items-center justify-center">
                  <Cpu className="w-6 h-6" />
                </div>
                <div>
                  <h3 className="font-bold text-slate-800 text-lg">
                    <a href={ANTEK_LINK} target="_blank" rel="noopener noreferrer" className="text-blue-600 underline decoration-blue-600/50 hover:decoration-blue-400 hover:text-blue-500 transition-colors">Antek</a>
                  </h3>
                  <div className="text-slate-500 text-xs">NCR CounterPoint System Integrator & Support Partner — Sint Maarten</div>
                </div>
              </div>
              <ul className="space-y-2.5">
                {[
                  "Sint Maarten's NCR CounterPoint system integrator and support partner for 25+ years",
                  "Services Sint Maarten (SXM) and neighboring Caribbean islands (Anguilla, St. Barthélemy, Saba, Statia)",
                  "Reviewed the non-invasive, performance-based model",
                  "Confirmed technical feasibility of DutyCredit validation at NCR CounterPoint checkout",
                  "The single integration point — once enabled, every Antek-supported retailer can toggle DutyBoost on",
                ].map((pt, i) => (
                  <li key={i} className="flex items-start gap-2">
                    <CheckCircle className="w-4 h-4 text-violet-600 flex-shrink-0 mt-0.5" />
                    <span className="text-slate-600 text-sm">{pt}</span>
                  </li>
                ))}
              </ul>
            </div>
            <div className="flex flex-col gap-4">
              <div className="bg-violet-50 border border-violet-200 rounded-2xl p-5">
                <h3 className="font-bold text-violet-900 mb-3">What Antek Earns</h3>
                <div className="space-y-2.5 text-sm">
                  {[
                    { metric: "Commission rate", val: "10% of the 2.5% platform fee = 0.25% of every validated basket" },
                    { metric: "Per $100 basket", val: "$0.25 — on transactions Antek already processes" },
                    { metric: "Upfront cost", val: "$0 — no setup fee, no subscription, no licence" },
                    { metric: "On non-converters", val: "$0 — purely performance-based, zero risk" },
                    { metric: "Territory", val: "SXM + Anguilla, St. Barthélemy, Saba, Statia" },
                  ].map((row) => (
                    <div key={row.metric} className="flex items-start gap-2">
                      <CheckCircle className="w-4 h-4 text-violet-600 flex-shrink-0 mt-0.5" />
                      <div>
                        <span className="text-slate-700 font-semibold">{row.metric}: </span>
                        <span className="text-slate-600">{row.val}</span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
              <div className="bg-gradient-to-br from-violet-600 to-indigo-700 rounded-2xl p-5 text-white">
                <div className="flex items-center gap-2 mb-2">
                  <Zap className="w-5 h-5" />
                  <h3 className="font-bold">Why Antek Is Essential</h3>
                </div>
                <p className="text-violet-50 text-sm leading-relaxed">
                  Antek already supports the NCR CounterPoint infrastructure across SXM and neighboring islands. DutyBoost turns that existing relationship into a new, recurring revenue stream — Antek is the gatekeeper who enables every retailer on their supported islands to activate DutyBoost.
                </p>
                <div className="mt-3 text-violet-100 font-semibold text-sm">
                  You integrate once. Every retailer you serve can toggle on. You earn on every validated sale.
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </SlideWrapper>
  );
}

// SLIDE 9: SXM Ecosystem — the full island network
export function SlideSxmEcosystem() {
  return (
    <SlideWrapper>
      <div className="flex-1 flex flex-col justify-center px-5 py-6 md:px-12 md:py-6 relative">
        <GridBg />
        <div className="relative z-10">
          <div className="mb-5">
            <span className="text-violet-600 text-sm font-semibold uppercase tracking-widest">The SXM Ecosystem — Already in Motion</span>
            <h2 className="text-xl md:text-3xl font-heading font-bold text-[#0a0f1e] mt-2">
              Every Stakeholder <span className="text-violet-600">Already Engaged</span>
            </h2>
            <p className="text-slate-500 mt-1 text-sm">DutyBoost is not starting from zero at SXM — active conversations are underway across the entire retail ecosystem that Antek supports.</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-5">
            {/* Antek */}
            <div className="bg-violet-50 border border-violet-200 rounded-2xl p-5">
              <div className="flex items-center justify-between mb-3">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-violet-600 text-white flex items-center justify-center">
                    <Cpu className="w-5 h-5" />
                  </div>
                  <div>
                    <h3 className="font-bold text-slate-800 text-sm">
                      <a href={ANTEK_LINK} target="_blank" rel="noopener noreferrer" className="text-blue-600 underline decoration-blue-600/50 hover:decoration-blue-400 hover:text-blue-500 transition-colors">Antek</a>
                    </h3>
                    <div className="text-slate-500 text-xs">POS System Integrator — SXM</div>
                  </div>
                </div>
                <span className="text-xs font-semibold px-2.5 py-1 rounded-full border bg-green-100 text-green-700 border-green-300">Active</span>
              </div>
              <p className="text-slate-600 text-xs">NCR CounterPoint integrator for 25+ years. Serves SXM, Anguilla, St. Barth, Saba, Statia. Technical feasibility confirmed.</p>
            </div>
            {/* Wagos */}
            <div className="bg-indigo-50 border border-indigo-200 rounded-2xl p-5">
              <div className="flex items-center justify-between mb-3">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-indigo-600 text-white flex items-center justify-center">
                    <Cpu className="w-5 h-5" />
                  </div>
                  <div>
                    <h3 className="font-bold text-slate-800 text-sm">
                      <a href={WAGOS_LINK} target="_blank" rel="noopener noreferrer" className="text-blue-600 underline decoration-blue-600/50 hover:decoration-blue-400 hover:text-blue-500 transition-colors">Wagos</a>
                    </h3>
                    <div className="text-slate-500 text-xs">POS Integrator — Trinidad & Tobago</div>
                  </div>
                </div>
                <span className="text-xs font-semibold px-2.5 py-1 rounded-full border bg-green-100 text-green-700 border-green-300">Active</span>
              </div>
              <p className="text-slate-600 text-xs">NCR CounterPoint partner serving T&T, Grenada, Cayman Islands, Guyana, and St. Martin. Toggle integration discussed.</p>
            </div>
            {/* Dutch Delight */}
            <div className="bg-blue-50 border border-blue-200 rounded-2xl p-5">
              <div className="flex items-center justify-between mb-3">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-blue-600 text-white flex items-center justify-center">
                    <Store className="w-5 h-5" />
                  </div>
                  <div>
                    <h3 className="font-bold text-slate-800 text-sm">Dutch Delight</h3>
                    <div className="text-slate-500 text-xs">Airport Retailer — SXM</div>
                  </div>
                </div>
                <span className="text-xs font-semibold px-2.5 py-1 rounded-full border bg-green-100 text-green-700 border-green-300">Active</span>
              </div>
              <p className="text-slate-600 text-xs">Pilot-ready retailer. Reviewed performance-based model, 87.5% retailer net confirmed. Toggle-on approach agreed.</p>
            </div>
            {/* Divico */}
            <div className="bg-green-50 border border-green-200 rounded-2xl p-5">
              <div className="flex items-center justify-between mb-3">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-green-600 text-white flex items-center justify-center">
                    <Package className="w-5 h-5" />
                  </div>
                  <div>
                    <h3 className="font-bold text-slate-800 text-sm">
                      <a href={DIVICO_LINK} target="_blank" rel="noopener noreferrer" className="text-blue-600 underline decoration-blue-600/50 hover:decoration-blue-400 hover:text-blue-500 transition-colors">Divico</a>
                    </h3>
                    <div className="text-slate-500 text-xs">Wholesale Distribution — SXM</div>
                  </div>
                </div>
                <span className="text-xs font-semibold px-2.5 py-1 rounded-full border bg-green-100 text-green-700 border-green-300">Active</span>
              </div>
              <p className="text-slate-600 text-xs">Wholesale distributor supplying SXM airport retailers. Faster stock rotation through DutyBoost-driven sell-through discussed.</p>
            </div>
            {/* ILTT */}
            <div className="bg-amber-50 border border-amber-200 rounded-2xl p-5">
              <div className="flex items-center justify-between mb-3">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-amber-600 text-white flex items-center justify-center">
                    <Package className="w-5 h-5" />
                  </div>
                  <div>
                    <h3 className="font-bold text-slate-800 text-sm">
                      <a href={ILTT_LINK} target="_blank" rel="noopener noreferrer" className="text-blue-600 underline decoration-blue-600/50 hover:decoration-blue-400 hover:text-blue-500 transition-colors">ILTT</a>
                    </h3>
                    <div className="text-slate-500 text-xs">Duty-Free Wholesale & Retail — SXM</div>
                  </div>
                </div>
                <span className="text-xs font-semibold px-2.5 py-1 rounded-full border bg-green-100 text-green-700 border-green-300">Active</span>
              </div>
              <p className="text-slate-600 text-xs">Operates Princess Promenade duty-free stores. JV with Penha Group — 6 retail outlets. Dual benefit as wholesaler & retailer.</p>
            </div>
            {/* Antek's role */}
            <div className="bg-gradient-to-br from-violet-600 to-indigo-700 rounded-2xl p-5 text-white flex flex-col justify-center">
              <div className="flex items-center gap-2 mb-2">
                <Shield className="w-5 h-5" />
                <h3 className="font-bold">Antek Connects Them All</h3>
              </div>
              <p className="text-violet-50 text-sm leading-relaxed">
                Retailers, wholesalers, and duty-free operators at SXM all run on NCR CounterPoint. Antek is the integrator that links them — and DutyBoost flows through that existing infrastructure.
              </p>
            </div>
          </div>
          <div className="bg-amber-50 border border-amber-300 rounded-2xl p-4">
            <p className="text-slate-700 text-sm font-medium">
              <span className="font-bold">The network is ready:</span> Antek as the integrator, Dutch Delight as the pilot retailer, Divico & ILTT as wholesale advocates — the full SXM retail chain is engaged and waiting for activation.
            </p>
          </div>
        </div>
      </div>
    </SlideWrapper>
  );
}

// SLIDE 10: Transaction Economics — reused
export { SlideEconomics };

// SLIDE 11: Antek's Revenue Potential at SXM
export function SlideAntekRevenue() {
  return (
    <SlideWrapper>
      <div className="flex-1 flex flex-col justify-center px-5 py-6 md:px-12 md:py-6 relative">
        <GridBg />
        <div className="relative z-10">
          <div className="mb-5">
            <span className="text-violet-600 text-sm font-semibold uppercase tracking-widest">Antek's Revenue Potential</span>
            <h2 className="text-xl md:text-3xl font-heading font-bold text-[#0a0f1e] mt-2">
              What Antek Earns <span className="text-violet-600">at SXM</span>
            </h2>
            <p className="text-slate-500 mt-1 text-sm">
              Antek earns 0.25% of every validated DutyCredit basket across all Antek-supported retailers at SXM. At 855,994 annual arrivals and 625K non-purchasing travellers, here is the airport-wide commission potential at a $100 average basket — across multiple conversion scenarios.
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-5">
            {[
              { conv: "+0.5% conversion", txns: "3,125", gross: "$312,500", antek: "$781", color: "violet" },
              { conv: "+1% conversion", txns: "6,250", gross: "$625,000", antek: "$1,563", color: "indigo" },
              { conv: "+2% conversion", txns: "12,500", gross: "$1,250,000", antek: "$3,125", color: "blue" },
              { conv: "+5% conversion", txns: "31,250", gross: "$3,125,000", antek: "$7,813", color: "purple" },
            ].map((s) => (
              <div key={s.conv} className={`bg-${s.color}-50 border border-${s.color}-200 rounded-2xl p-5 text-center`}>
                <div className={`text-xs font-semibold text-${s.color}-600 uppercase tracking-wide mb-2`}>{s.conv}</div>
                <div className="text-slate-500 text-xs mb-2">{s.txns} validated txns/year</div>
                <div className="text-slate-400 text-xs mb-1">Airport retail value</div>
                <div className="text-lg font-bold text-slate-700 mb-3">{s.gross}</div>
                <div className={`text-2xl md:text-3xl font-bold text-${s.color}-700 mb-1`}>{s.antek}</div>
                <div className={`text-${s.color}-600 text-xs font-medium`}>Antek annual commission</div>
              </div>
            ))}
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            <div className="bg-slate-800 text-white rounded-2xl p-5">
              <h3 className="font-bold mb-3">Scaling Beyond SXM</h3>
              <p className="text-slate-300 text-sm mb-4">Antek also serves Anguilla, St. Barthélemy, Saba, and Statia — each with its own airport retail base. The same integration covers all of them.</p>
              <div className="space-y-2 text-sm">
                {[
                  { islands: "SXM only", factor: "1.0× the figures above" },
                  { islands: "SXM + 1 neighboring island", factor: "~1.2× estimated" },
                  { islands: "SXM + 2-3 neighboring islands", factor: "~1.4× estimated" },
                  { islands: "Full Antek territory (5 islands)", factor: "~1.5× estimated" },
                ].map((row, i) => (
                  <div key={i} className={`flex justify-between items-center py-1.5 px-3 rounded-lg ${i === 0 ? "bg-violet-700/60 font-semibold" : ""}`}>
                    <span className="text-violet-300">{row.islands}</span>
                    <span className="text-slate-300">{row.factor}</span>
                  </div>
                ))}
              </div>
              <div className="text-slate-400 text-xs mt-3">Neighboring island estimates are indicative — actual figures depend on passenger volumes and retailer participation per island.</div>
            </div>
            <div className="bg-gradient-to-br from-violet-50 to-indigo-50 border border-violet-200 rounded-2xl p-5">
              <h3 className="font-bold text-violet-900 mb-3">Why This Is Pure Upside for Antek</h3>
              <ul className="space-y-2 text-sm">
                {[
                  "You already process these transactions — zero marginal cost",
                  "A lightweight API call, not a system replacement",
                  "Earns on incremental sales from travellers who otherwise wouldn't buy",
                  "Zero cost on non-converting travellers — no fixed overhead",
                  "Strengthens relationships with every retailer you support",
                  "Positions Antek as the innovation leader in Caribbean POS",
                ].map((item, i) => (
                  <li key={i} className="flex items-start gap-2">
                    <CheckCircle className="w-4 h-4 text-violet-600 flex-shrink-0 mt-0.5" />
                    <span className="text-violet-800">{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </div>
    </SlideWrapper>
  );
}

// SLIDE 12: Growth Flywheel — reused
export { SlideFlywheel };

// SLIDE 13: Closing — SXM + Antek
export function SlideClosingSxm() {
  return (
    <SlideWrapper>
      <div className="flex-1 flex flex-col items-center justify-center px-6 md:px-16 text-center relative">
        <GridBg />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] rounded-full opacity-10"
          style={{ background: "radial-gradient(circle, #7c3aed 0%, transparent 70%)" }} />
        <div className="relative z-10 flex flex-col items-center gap-8">
          <div className="bg-slate-50 rounded-2xl px-8 py-4 shadow-lg border border-slate-200">
            <DutyBoostLogo height={50} linkTo="/pos-partner" />
          </div>
          <div>
            <h1 className="text-3xl md:text-5xl font-heading font-bold text-[#0a0f1e] leading-tight mb-4">
              Converting the 625K<br />
              <span className="text-violet-600">Who Never Buy at SXM</span>
            </h1>
            <p className="text-lg md:text-xl text-slate-500 max-w-3xl leading-relaxed">
              Antek integrates once. Every retailer you serve can toggle on. You earn on every validated sale.
            </p>
          </div>
          <div className="grid grid-cols-3 gap-2 sm:gap-6 mt-4 w-full max-w-2xl">
            {[
              { label: "SXM Non-Purchasing", value: "625K" },
              { label: "Antek's Share", value: "10%" },
              { label: "Islands Served", value: "5" },
            ].map((s) => (
              <div key={s.label} className="text-center">
                <div className="text-base sm:text-2xl font-bold text-violet-600">{s.value}</div>
                <div className="text-xs sm:text-sm text-slate-500 mt-1">{s.label}</div>
              </div>
            ))}
          </div>
          <div className="flex flex-col items-center gap-1.5">
            <p className="text-violet-600 text-base lg:text-xl font-bold">
              No setup fee. No subscription. No risk. Only incremental revenue — connected.
            </p>
            <p className="text-slate-600 text-sm lg:text-base font-semibold">
              SXM is the proving ground. Antek is the integration partner. The Caribbean is the scale.
            </p>
          </div>
          <div className="mt-2 text-xs text-slate-400 border border-slate-200 rounded px-4 py-2">
            CONFIDENTIAL — 2026 | Chamber of Commerce: 42053181 | VAT: NL869492068B01
          </div>
        </div>
      </div>
    </SlideWrapper>
  );
}

export const SLIDES = [
  { id: "cover", type: "cover" },
  { id: "team", type: "team" },
  { id: "sxmMarket", type: "sxmMarket" },
  { id: "facts", type: "facts" },
  { id: "solution", type: "solution" },
  { id: "posToggle", type: "posToggle" },
  { id: "technicalIntegration", type: "technicalIntegration" },
  { id: "antekOpportunity", type: "antekOpportunity" },
  { id: "sxmEcosystem", type: "sxmEcosystem" },
  { id: "economics", type: "economics" },
  { id: "antekRevenue", type: "antekRevenue" },
  { id: "flywheel", type: "flywheel" },
  { id: "closing", type: "closing" },
];

export const SLIDE_LABELS = {
  cover: "Cover — SXM for Antek",
  team: "Our Team",
  sxmMarket: "SXM Market",
  facts: "The Facts at SXM",
  solution: "The Solution",
  posToggle: "Non-Invasive POS Toggle",
  technicalIntegration: "Technical POS Integration",
  antekOpportunity: "Antek's Opportunity",
  sxmEcosystem: "The SXM Ecosystem",
  economics: "Transaction Economics",
  antekRevenue: "Antek's Revenue Potential",
  flywheel: "Growth Flywheel",
  closing: "Thank You — SXM",
};

export function getSlideComponent(type) {
  const map = {
    cover: () => <SlideCoverSxm />,
    team: () => <SlideTeam />,
    sxmMarket: () => <SlideSxmMarket />,
    facts: () => <SlideFactsSxm />,
    solution: () => <SlideSolution />,
    posToggle: () => <SlidePosToggle />,
    technicalIntegration: () => <SlideTechnicalIntegration />,
    antekOpportunity: () => <SlideAntekOpportunity />,
    sxmEcosystem: () => <SlideSxmEcosystem />,
    economics: () => <SlideEconomics />,
    antekRevenue: () => <SlideAntekRevenue />,
    flywheel: () => <SlideFlywheel />,
    closing: () => <SlideClosingSxm />,
  };
  return map[type] || map.cover;
}