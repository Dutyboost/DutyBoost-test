import DutyBoostLogo from "@/components/DutyBoostLogo";
import {
  SlideTeam, SlideSolution, SlidePosToggle, SlideTechnicalIntegration, SlideEconomics, SlideFlywheel,
} from "@/components/pos-pitch/PosPitchSlides";
import { Cpu, Store, Package, CheckCircle, Plane, Users, DollarSign, MapPin, TrendingUp, Shield, Zap, Globe, Building2 } from "lucide-react";

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

const WAGOS_LINK = "https://wagos.com";
const CMI_LINK = "https://www.coherentmarketinsights.com/market-insight/caribbean-duty-free-retailing-market-4934";
const M1NDSET_LINK = "https://www.gtrmag.com/blog/gtr-magazine-looks-at-the-state-of-travel-and-tourism-in-the-caribbean";
const CAL_DUTYFREE_LINK = "https://dutyfree.caribbean-airlines.com";
const GONEBANANAS_LINK = "https://gonebananastt.com";
const KIRKFREEPORT_LINK = "https://kirkfreeport.net";
const JACQUESSCOTT_LINK = "https://www.jacquesscott.com";
const SIMEXTRA_LINK = "https://www.simextragroup.com";
const CJIA_LINK = "https://cjairport-gy.com";
const GRENADA_DF_LINK = "https://gaa.gd";

// SLIDE 1: Cover — Wagos
export function SlideCoverWagos() {
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
              Caribbean POS Integration<br />
              <span className="text-violet-600">A Presentation for Wagos</span>
            </h1>
            <p className="text-xl text-slate-500 max-w-3xl leading-relaxed">
              Four Islands. Four Airports. One Integration Partner — Your Network. Your Revenue.
            </p>
          </div>
          <div className="grid grid-cols-3 gap-2 sm:gap-6 mt-4 w-full max-w-2xl">
            {[
              { label: "Caribbean DF Market", value: "$2.72B" },
              { label: "Network Passengers", value: "4M+" },
              { label: "Wagos's Share", value: "10%" },
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

// SLIDE 2: Team — reused
export { SlideTeam };

// SLIDE 3: Caribbean Market — Wagos territory
export function SlideCaribbeanMarket() {
  return (
    <SlideWrapper>
      <div className="flex-1 flex flex-col justify-center px-5 py-6 md:px-12 md:py-6 relative">
        <GridBg />
        <div className="relative z-10">
          <div className="mb-5">
            <span className="text-violet-600 text-sm font-semibold uppercase tracking-widest">Caribbean Market — Wagos Territory</span>
            <h2 className="text-xl md:text-3xl font-heading font-bold text-[#0a0f1e] mt-2">
              A <span className="text-violet-600">$2.72B</span> Regional Duty-Free Market
            </h2>
            <p className="text-slate-500 mt-1 text-sm">Wagos serves airport retailers across Trinidad &amp; Tobago, Grenada, the Cayman Islands, and Guyana — a multi-island network with combined passenger volumes exceeding 4 million annually.</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-5">
            <div className="bg-violet-50 border border-violet-200 rounded-2xl p-5 text-center">
              <DollarSign className="w-8 h-8 text-violet-600 mx-auto mb-2" />
              <div className="text-2xl md:text-3xl font-bold text-violet-700 mb-1">$2.72B</div>
              <div className="text-slate-600 font-semibold text-sm">Caribbean DF Market</div>
              <div className="text-slate-500 text-xs mt-1">
                <a href={CMI_LINK} target="_blank" rel="noopener noreferrer" className="text-blue-600 font-semibold underline decoration-blue-600/50 hover:decoration-blue-400 hover:text-blue-500 transition-colors">(CMI)</a> 2026 est.
              </div>
            </div>
            <div className="bg-green-50 border border-green-200 rounded-2xl p-5 text-center">
              <TrendingUp className="w-8 h-8 text-green-600 mx-auto mb-2" />
              <div className="text-2xl md:text-3xl font-bold text-green-700 mb-1">21.7%</div>
              <div className="text-slate-600 font-semibold text-sm">Caribbean CAGR</div>
              <div className="text-slate-500 text-xs mt-1">2026–2033 forecast</div>
            </div>
            <div className="bg-blue-50 border border-blue-200 rounded-2xl p-5 text-center">
              <Plane className="w-8 h-8 text-blue-600 mx-auto mb-2" />
              <div className="text-2xl md:text-3xl font-bold text-blue-700 mb-1">4M+</div>
              <div className="text-slate-600 font-semibold text-sm">Network Passengers</div>
              <div className="text-slate-500 text-xs mt-1">Across 4 Wagos-served airports</div>
            </div>
            <div className="bg-red-50 border border-red-200 rounded-2xl p-5 text-center">
              <Users className="w-8 h-8 text-red-600 mx-auto mb-2" />
              <div className="text-2xl md:text-3xl font-bold text-red-700 mb-1">2.9M</div>
              <div className="text-slate-600 font-semibold text-sm">Non-Purchasing Travellers</div>
              <div className="text-slate-500 text-xs mt-1">73% of network passengers</div>
            </div>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            <div className="bg-slate-50 border border-slate-200 rounded-2xl p-6">
              <h3 className="font-bold text-slate-700 mb-4">Caribbean DF Market Growth (2026–2033)</h3>
              <div className="space-y-2">
                {[
                  { year: "2026", val: "$2.72B", pct: 25 },
                  { year: "2028", val: "$4.0B", pct: 37 },
                  { year: "2030", val: "$6.0B", pct: 56 },
                  { year: "2033", val: "$10.72B", pct: 100 },
                ].map((row) => (
                  <div key={row.year} className="flex items-center gap-3">
                    <div className="w-12 text-sm text-slate-600">{row.year}</div>
                    <div className="flex-1 bg-slate-200 rounded-full h-2">
                      <div className="bg-violet-600 h-2 rounded-full" style={{ width: `${row.pct}%` }} />
                    </div>
                    <div className="w-20 text-sm font-semibold text-slate-700 text-right">{row.val}</div>
                  </div>
                ))}
              </div>
              <div className="text-slate-400 text-xs mt-3">
                Source: <a href={CMI_LINK} target="_blank" rel="noopener noreferrer" className="text-blue-600 font-semibold underline decoration-blue-600/50 hover:decoration-blue-400 hover:text-blue-500 transition-colors">Coherent Market Insights</a> — Caribbean Duty Free Retailing Market
              </div>
            </div>
            <div className="bg-gradient-to-br from-violet-600 to-indigo-700 rounded-2xl p-6 text-white">
              <h3 className="font-bold text-lg mb-3">Why the Wagos Network?</h3>
              <div className="space-y-3">
                {[
                  { icon: MapPin, text: "Multi-island territory — 4 airports across 4 Caribbean nations" },
                  { icon: Plane, text: "4M+ annual passengers across POS, GCM, GEO, GND" },
                  { icon: Users, text: "2.9M non-purchasing travellers — the conversion headroom" },
                  { icon: TrendingUp, text: "21.7% Caribbean CAGR — the fastest-growing DF region globally" },
                  { icon: DollarSign, text: "$2.72B existing market — activation, not creation" },
                ].map((item, i) => (
                  <div key={i} className="flex items-start gap-3">
                    <item.icon className="w-5 h-5 text-violet-200 flex-shrink-0 mt-0.5" />
                    <span className="text-violet-50 text-sm">{item.text}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </SlideWrapper>
  );
}

// SLIDE 4: The Facts — network context
export function SlideFactsWagos() {
  return (
    <SlideWrapper>
      <div className="flex-1 flex flex-col justify-center px-5 py-6 md:px-12 md:py-6 relative">
        <GridBg />
        <div className="relative z-10">
          <div className="mb-5">
            <span className="text-violet-600 text-sm font-semibold uppercase tracking-widest">The Facts Across the Network</span>
            <h2 className="text-xl md:text-3xl font-heading font-bold text-[#0a0f1e] mt-2">
              2.9 Million Caribbean Passengers<br /><span className="text-violet-600">Never Make a Purchase</span>
            </h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8">
            <div className="space-y-5">
              <div className="bg-slate-50 border border-slate-200 rounded-2xl p-6">
                <div className="text-3xl md:text-5xl font-bold text-violet-600 mb-2">4M+</div>
                <div className="text-slate-800 font-semibold">Annual passengers across Wagos-served airports</div>
                <div className="text-slate-500 text-sm mt-1">POS (Trinidad) · GCM (Cayman) · GEO (Guyana) · GND (Grenada)</div>
              </div>
              <div className="bg-slate-50 border border-slate-200 rounded-2xl p-6">
                <div className="text-3xl md:text-5xl font-bold text-orange-600 mb-2">27%</div>
                <a href={M1NDSET_LINK} target="_blank" rel="noopener noreferrer" className="text-blue-600 font-semibold underline decoration-blue-600/50 hover:decoration-blue-400 hover:text-blue-500 transition-colors">
                  Caribbean conversion benchmark
                </a>
                <div className="text-slate-500 text-sm mt-1">m1nd-set / TFWA industry penetration rate</div>
              </div>
              <div className="bg-red-50 border border-red-200 rounded-2xl p-6">
                <div className="text-3xl md:text-5xl font-bold text-red-600 mb-2">2.9M</div>
                <div className="text-slate-800 font-semibold">Non-purchasing travellers across the network</div>
                <div className="text-slate-500 text-sm mt-1">73% of 4M+ annual passengers</div>
              </div>
            </div>
            <div className="flex flex-col gap-4 justify-center">
              <div className="bg-slate-50 border border-slate-200 rounded-2xl p-6">
                <h3 className="text-slate-800 font-semibold text-lg mb-4">What This Means for Wagos</h3>
                <ul className="space-y-3">
                  {[
                    "2.9M travellers walk through Wagos-served airport stores without buying every year",
                    "The Caribbean generates $2.72B in duty-free — without pre-activation",
                    "No financial reason for a non-intending buyer to enter a store",
                    "Activation starts only after security — too late to influence purchase intent",
                    "73% of network passengers walk straight to the gate",
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
                  "Across the Wagos network, 2.9 million non-purchasing travellers represent conversion headroom — not a permanent ceiling. DutyBoost activates them before they arrive."
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

// SLIDE 8: Wagos's Opportunity
export function SlideWagosOpportunity() {
  return (
    <SlideWrapper>
      <div className="flex-1 flex flex-col justify-center px-5 py-6 md:px-12 md:py-6 relative">
        <GridBg />
        <div className="relative z-10">
          <div className="mb-5">
            <span className="text-violet-600 text-sm font-semibold uppercase tracking-widest">Wagos's Opportunity</span>
            <h2 className="text-xl md:text-3xl font-heading font-bold text-[#0a0f1e] mt-2">
              The Integration Partner <span className="text-violet-600">for the Caribbean</span>
            </h2>
            <p className="text-slate-500 mt-1 text-sm">
              <a href={WAGOS_LINK} target="_blank" rel="noopener noreferrer" className="text-blue-600 font-semibold underline decoration-blue-600/50 hover:decoration-blue-400 hover:text-blue-500 transition-colors">Wagos</a> is the NCR CounterPoint integrator and support partner serving airport retailers across Trinidad &amp; Tobago, Grenada, the Cayman Islands, Guyana — the single technical entry point for DutyBoost across a multi-island retailer base.
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
                    <a href={WAGOS_LINK} target="_blank" rel="noopener noreferrer" className="text-blue-600 underline decoration-blue-600/50 hover:decoration-blue-400 hover:text-blue-500 transition-colors">Wagos Ltd</a>
                  </h3>
                  <div className="text-slate-500 text-xs">NCR CounterPoint Integrator & Support Partner — Trinidad & Tobago</div>
                </div>
              </div>
              <ul className="space-y-2.5">
                {[
                  "Trinidad & Tobago-based NCR CounterPoint business partner — the integrator and support partner, not the POS provider",
                  "Serves airport retailers across Trinidad & Tobago, Grenada, the Cayman Islands, and Guyana",
                  "Confirmed client: Caribbean Airlines Duty Free at Piarco International Airport (POS)",
                  "Reviewed DutyBoost as a toggle feature within existing NCR CounterPoint workflows",
                  "Wagos-supported retailers can opt-in per store via toggle activation — no code changes per store",
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
                <h3 className="font-bold text-violet-900 mb-3">What Wagos Earns</h3>
                <div className="space-y-2.5 text-sm">
                  {[
                    { metric: "Commission rate", val: "10% of the 2.5% platform fee = 0.25% of every validated basket" },
                    { metric: "Per $100 basket", val: "$0.25 — on transactions Wagos already processes" },
                    { metric: "Upfront cost", val: "$0 — no setup fee, no subscription, no licence" },
                    { metric: "On non-converters", val: "$0 — purely performance-based, zero risk" },
                    { metric: "Territory", val: "Trinidad & Tobago, Grenada, Cayman Islands, Guyana" },
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
                  <h3 className="font-bold">Why Wagos Is Essential</h3>
                </div>
                <p className="text-violet-50 text-sm leading-relaxed">
                  Wagos already supports the NCR CounterPoint infrastructure across five Caribbean territories. DutyBoost turns that existing relationship into a new, recurring revenue stream — Wagos is the gatekeeper who enables every airport retailer on their supported islands to activate DutyBoost.
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

// SLIDE 9: Wagos Airport Network — the key differentiator
export function SlideWagosNetwork() {
  const airports = [
    {
      island: "Trinidad & Tobago",
      airport: "Piarco International Airport",
      code: "POS",
      passengers: "~1.9M intl.",
      retailers: [
        { name: "Caribbean Airlines Duty Free", url: CAL_DUTYFREE_LINK, note: "Confirmed Wagos client" },
        { name: "Dufry Duty Free", url: null, note: null },
        { name: "King's Duty Free", url: null, note: null },
        { name: "Gone Bananas Duty Free", url: GONEBANANAS_LINK, note: null },
        { name: "T.WEE Duty Free (ANSA McAL)", url: null, note: null },
      ],
      color: "violet",
    },
    {
      island: "Cayman Islands",
      airport: "Owen Roberts International Airport",
      code: "GCM",
      passengers: "~1.4M movements",
      retailers: [
        { name: "Kirk Freeport", url: KIRKFREEPORT_LINK, note: "Premier DF retailer" },
        { name: "Jacques Scott Duty Free", url: JACQUESSCOTT_LINK, note: "Liquor & spirits" },
        { name: "Tortuga Duty-Free Liquors", url: null, note: null },
      ],
      color: "blue",
    },
    {
      island: "Guyana",
      airport: "Cheddi Jagan International Airport",
      code: "GEO",
      passengers: "~973K (2025)",
      retailers: [
        { name: "Simextra Duty Free", url: SIMEXTRA_LINK, note: "Arrival & Departure" },
        { name: "T.WEE Duty Free", url: null, note: null },
        { name: "Banks DIH", url: null, note: null },
        { name: "El Dorado", url: null, note: null },
      ],
      color: "green",
    },
    {
      island: "Grenada",
      airport: "Maurice Bishop International Airport",
      code: "GND",
      passengers: "~500K est.",
      retailers: [
        { name: "Grenada Duty Free", url: GRENADA_DF_LINK, note: null },
        { name: "Rouge Duty-Free", url: null, note: null },
        { name: "Duty Free Caribbean", url: null, note: null },
      ],
      color: "amber",
    },
  ];

  return (
    <SlideWrapper>
      <div className="flex-1 flex flex-col justify-center px-5 py-6 md:px-12 md:py-6 relative">
        <GridBg />
        <div className="relative z-10">
          <div className="mb-5">
            <span className="text-violet-600 text-sm font-semibold uppercase tracking-widest">Wagos Airport Retail Network</span>
            <h2 className="text-xl md:text-3xl font-heading font-bold text-[#0a0f1e] mt-2">
              Four Airports. <span className="text-violet-600">Fifteen+ Airport Retailers.</span>
            </h2>
            <p className="text-slate-500 mt-1 text-sm">Every airport retailer listed below runs on or is supported by NCR CounterPoint — the infrastructure Wagos already manages.</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-5">
            {airports.map((apt) => (
              <div key={apt.code} className={`bg-${apt.color}-50 border border-${apt.color}-200 rounded-2xl p-4 flex flex-col`}>
                <div className="flex items-center justify-between mb-2">
                  <div className={`text-2xl font-bold text-${apt.color}-700`}>{apt.code}</div>
                  <Plane className={`w-5 h-5 text-${apt.color}-400`} />
                </div>
                <div className="text-slate-800 font-semibold text-sm leading-tight mb-1">{apt.airport}</div>
                <div className="text-slate-500 text-xs mb-1">{apt.island}</div>
                <div className={`text-${apt.color}-600 text-xs font-medium mb-3`}>{apt.passengers}</div>
                <div className="text-slate-400 text-xs uppercase tracking-wide font-semibold mb-2">Airport Retailers</div>
                <div className="space-y-1.5 flex-1">
                  {apt.retailers.map((r, i) => (
                    <div key={i} className="text-xs">
                      {r.url ? (
                        <a href={r.url} target="_blank" rel="noopener noreferrer" className="text-blue-600 font-semibold underline decoration-blue-600/50 hover:decoration-blue-400 hover:text-blue-500 transition-colors">
                          {r.name}
                        </a>
                      ) : (
                        <span className="text-slate-700 font-medium">{r.name}</span>
                      )}
                      {r.note && <span className="text-slate-400"> — {r.note}</span>}
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
          <div className="bg-gradient-to-br from-violet-600 to-indigo-700 rounded-2xl p-5 text-white">
            <div className="flex items-center gap-2 mb-2">
              <Shield className="w-5 h-5" />
              <h3 className="font-bold">Wagos Connects Them All</h3>
            </div>
            <p className="text-violet-50 text-sm leading-relaxed">
              From Piarco to Owen Roberts, Cheddi Jagan to Maurice Bishop — airport retailers across the Caribbean run on NCR CounterPoint infrastructure that Wagos already supports. DutyBoost flows through that existing network.
            </p>
            <div className="mt-3 grid grid-cols-2 md:grid-cols-4 gap-3 text-center">
              {[
                { val: "4", label: "Airports" },
                { val: "15+", label: "Airport Retailers" },
                { val: "4M+", label: "Annual Passengers" },
                { val: "5", label: "Island Territories" },
              ].map((s, i) => (
                <div key={i} className="bg-white/10 rounded-lg p-2">
                  <div className="text-xl font-bold">{s.val}</div>
                  <div className="text-violet-200 text-xs">{s.label}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </SlideWrapper>
  );
}

// SLIDE 10: Transaction Economics — reused
export { SlideEconomics };

// SLIDE 11: Wagos Revenue Potential
export function SlideWagosRevenue() {
  return (
    <SlideWrapper>
      <div className="flex-1 flex flex-col justify-center px-5 py-6 md:px-12 md:py-6 relative">
        <GridBg />
        <div className="relative z-10">
          <div className="mb-5">
            <span className="text-violet-600 text-sm font-semibold uppercase tracking-widest">Wagos Revenue Potential</span>
            <h2 className="text-xl md:text-3xl font-heading font-bold text-[#0a0f1e] mt-2">
              What Wagos Earns <span className="text-violet-600">Across the Network</span>
            </h2>
            <p className="text-slate-500 mt-1 text-sm">
              Wagos earns 0.25% of every validated DutyCredit basket across all Wagos-supported airport retailers. With 4M+ annual passengers and 2.9M non-purchasing travellers across four airports, here is the network-wide commission potential at a $100 average basket.
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-5">
            {[
              { conv: "+0.5% conversion", txns: "14,500", gross: "$1.45M", wagos: "$3,625", color: "violet" },
              { conv: "+1% conversion", txns: "29,000", gross: "$2.9M", wagos: "$7,250", color: "indigo" },
              { conv: "+2% conversion", txns: "58,000", gross: "$5.8M", wagos: "$14,500", color: "blue" },
              { conv: "+5% conversion", txns: "145,000", gross: "$14.5M", wagos: "$36,250", color: "purple" },
            ].map((s) => (
              <div key={s.conv} className={`bg-${s.color}-50 border border-${s.color}-200 rounded-2xl p-5 text-center`}>
                <div className={`text-xs font-semibold text-${s.color}-600 uppercase tracking-wide mb-2`}>{s.conv}</div>
                <div className="text-slate-500 text-xs mb-2">{s.txns} validated txns/year</div>
                <div className="text-slate-400 text-xs mb-1">Network retail value</div>
                <div className="text-lg font-bold text-slate-700 mb-3">{s.gross}</div>
                <div className={`text-2xl md:text-3xl font-bold text-${s.color}-700 mb-1`}>{s.wagos}</div>
                <div className={`text-${s.color}-600 text-xs font-medium`}>Wagos annual commission</div>
              </div>
            ))}
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            <div className="bg-slate-800 text-white rounded-2xl p-5">
              <h3 className="font-bold mb-3">Per-Airport Breakdown at +1% Conversion</h3>
              <div className="space-y-2 text-sm">
                {[
                  { apt: "POS — Piarco (Trinidad)", non: "1.9M", txns: "13,770", wagos: "$3,443" },
                  { apt: "GCM — Owen Roberts (Cayman)", non: "518K", txns: "3,627", wagos: "$907" },
                  { apt: "GEO — Cheddi Jagan (Guyana)", non: "710K", txns: "5,170", wagos: "$1,293" },
                  { apt: "GND — Maurice Bishop (Grenada)", non: "365K", txns: "2,555", wagos: "$639" },
                ].map((row, i) => (
                  <div key={i} className="flex justify-between items-center py-1.5 px-3 rounded-lg bg-white/5">
                    <div>
                      <span className="text-violet-300 font-semibold text-xs">{row.apt}</span>
                      <div className="text-slate-500 text-xs">{row.non} non-purchasing → {row.txns} txns</div>
                    </div>
                    <span className="font-bold text-green-400 text-sm">{row.wagos}</span>
                  </div>
                ))}
                <div className="flex justify-between items-center py-2 px-3 rounded-lg bg-violet-700/60 font-semibold mt-2">
                  <span className="text-white text-sm">Network Total</span>
                  <span className="text-green-400 text-sm font-bold">$7,250/year</span>
                </div>
              </div>
              <div className="text-slate-400 text-xs mt-3">Based on 73% non-purchase rate, $100 average basket, 0.25% commission.</div>
            </div>
            <div className="bg-gradient-to-br from-violet-50 to-indigo-50 border border-violet-200 rounded-2xl p-5">
              <h3 className="font-bold text-violet-900 mb-3">Why This Is Pure Upside for Wagos</h3>
              <ul className="space-y-2 text-sm">
                {[
                  "You already process these transactions — zero marginal cost",
                  "A lightweight API call, not a system replacement",
                  "Multi-island territory means one integration covers four airports",
                  "Earns on incremental sales from travellers who otherwise wouldn't buy",
                  "Zero cost on non-converting travellers — no fixed overhead",
                  "Strengthens relationships with every airport retailer you support",
                  "Positions Wagos as the innovation leader in Caribbean airport POS",
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

// SLIDE 13: Closing — Wagos
export function SlideClosingWagos() {
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
              Converting the 2.9M<br />
              <span className="text-violet-600">Who Never Buy in the Caribbean</span>
            </h1>
            <p className="text-lg md:text-xl text-slate-500 max-w-3xl leading-relaxed">
              Wagos integrates once. Every airport retailer you serve can toggle on. You earn on every validated sale.
            </p>
          </div>
          <div className="grid grid-cols-3 gap-2 sm:gap-6 mt-4 w-full max-w-2xl">
            {[
              { label: "Network Passengers", value: "4M+" },
              { label: "Wagos's Share", value: "10%" },
              { label: "Airports Covered", value: "4" },
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
              Four Caribbean airports. One integration. The entire region is the growth market.
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
  { id: "market", type: "market" },
  { id: "facts", type: "facts" },
  { id: "solution", type: "solution" },
  { id: "posToggle", type: "posToggle" },
  { id: "technicalIntegration", type: "technicalIntegration" },
  { id: "wagosOpportunity", type: "wagosOpportunity" },
  { id: "network", type: "network" },
  { id: "economics", type: "economics" },
  { id: "wagosRevenue", type: "wagosRevenue" },
  { id: "flywheel", type: "flywheel" },
  { id: "closing", type: "closing" },
];

export const SLIDE_LABELS = {
  cover: "Cover — Caribbean for Wagos",
  team: "Our Team",
  market: "Caribbean Market",
  facts: "The Facts Across the Network",
  solution: "The Solution",
  posToggle: "Non-Invasive POS Toggle",
  technicalIntegration: "Technical POS Integration",
  wagosOpportunity: "Wagos's Opportunity",
  network: "Wagos Airport Retail Network",
  economics: "Transaction Economics",
  wagosRevenue: "Wagos Revenue Potential",
  flywheel: "Growth Flywheel",
  closing: "Thank You — Wagos",
};

export function getSlideComponent(type) {
  const map = {
    cover: () => <SlideCoverWagos />,
    team: () => <SlideTeam />,
    market: () => <SlideCaribbeanMarket />,
    facts: () => <SlideFactsWagos />,
    solution: () => <SlideSolution />,
    posToggle: () => <SlidePosToggle />,
    technicalIntegration: () => <SlideTechnicalIntegration />,
    wagosOpportunity: () => <SlideWagosOpportunity />,
    network: () => <SlideWagosNetwork />,
    economics: () => <SlideEconomics />,
    wagosRevenue: () => <SlideWagosRevenue />,
    flywheel: () => <SlideFlywheel />,
    closing: () => <SlideClosingWagos />,
  };
  return map[type] || map.cover;
}