import { Fragment } from "react";
import { Link } from "react-router-dom";
import DutyBoostLogo from "@/components/DutyBoostLogo";
import { SlideSolution } from "@/components/shared/SlideSolution";
export { SlideSolution };
import { ChevronRight, ToggleRight, Plug, Shield, Zap, Cpu, CheckCircle, ShieldCheck, RefreshCw, Lock, Globe, TrendingUp, Building2, Users, Euro, Briefcase, BarChart3, Link2, Plane, Package } from "lucide-react";
import HotelIcon from "@/components/HotelIcon";
import CarRentalIcon from "@/components/CarRentalIcon";
import AirportRetailerIcon from "@/components/AirportRetailerIcon";
import TravelerIcon from "@/components/TravelerIcon";
import TravelAgencyIcon from "@/components/TravelAgencyIcon";

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

const ACI_LINK = "https://aci.aero/2026/07/15/worlds-busiest-airports-atlanta-holds-asia-climbs-strong-demand-while-asia-pacific-growth-reshape-the-rankings/?utm_source=chatgpt.com";
const M1NDSET_LINK = "https://m1nd-set.com/";
const TFWA_LINK = "https://www.tfwa.com/";

// Pricing model per display currency — Entry-tier minimum basket, 5% traveller discount,
// 92.5% retailer net, 2.5% platform fee (10% of it to the POS provider).
const MODEL = {
  "$": {
    label: "23", basket: "23.00", saving: "1.15", pays: "21.85", fee: "0.58", boostFee: "0.52",
    partner: "0.12", pos: "0.06", boost: "0.40", retailer: "21.28",
    m1: "1.15M", m2: "115,000", m3: "57,500", m4: "402,500", m5: "21.28M",
    tiers: [
      { tier: "Entry", range: "$23-$56", disc: "5%-7.5%", save: "$1.14-$3.64" },
      { tier: "Boarding", range: "$57-$113", disc: "7.5%-10%", save: "$4.28-$10.73" },
      { tier: "Standard", range: "$114-$170", disc: "10%-12.5%", save: "$11.40-$20.81" },
      { tier: "Plus", range: "$171-$227", disc: "12.5%-15%", save: "$21.38-$33.11" },
      { tier: "Lounge", range: "$228-$284", disc: "15%-17.5%", save: "$34.20-$48.74" },
      { tier: "Premium", range: "$285-$341", disc: "17.5%-20%", save: "$49.88-$64.98" },
      { tier: "VIP", range: "$342+", disc: "20% capped", save: "Up to $68" },
    ],
  },
  "€": {
    label: "20", basket: "20.00", saving: "1.00", pays: "19.00", fee: "0.50", boostFee: "0.45",
    partner: "0.10", pos: "0.05", boost: "0.35", retailer: "18.50",
    m1: "1M", m2: "100,000", m3: "50,000", m4: "350,000", m5: "18.5M",
    tiers: [
      { tier: "Entry", range: "€20-€49", disc: "5%-7.5%", save: "€1.00-€3.19" },
      { tier: "Boarding", range: "€50-€99", disc: "7.5%-10%", save: "€3.75-€9.41" },
      { tier: "Standard", range: "€100-€149", disc: "10%-12.5%", save: "€10.00-€18.25" },
      { tier: "Plus", range: "€150-€199", disc: "12.5%-15%", save: "€18.75-€29.04" },
      { tier: "Lounge", range: "€200-€249", disc: "15%-17.5%", save: "€30.00-€42.75" },
      { tier: "Premium", range: "€250-€299", disc: "17.5%-20%", save: "€43.75-€57.00" },
      { tier: "VIP", range: "€300+", disc: "20% capped", save: "Up to €60" },
    ],
  },
};
const model = (currency) => MODEL[currency] || MODEL["$"];

// SLIDE 1: Cover
export function SlideCover({ currency = "€" }) {
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
              One Integration.<br />
              <span className="text-violet-600">Recurring Revenue. Zero Risk.</span>
            </h1>
            <p className="text-xl text-slate-500 max-w-3xl leading-relaxed">
              A presentation for Point-of-Sale Providers serving Airport &amp; Travel Retail
            </p>
          </div>
          <div className="grid grid-cols-3 gap-2 sm:gap-6 mt-4 w-full max-w-2xl">
            {[
              { label: "Airport DF&TR Market", value: "€37.1B" },
              { label: "Global Passengers", value: "9.8B" },
              { label: "Non-Purchasing", value: "73%" },
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

// SLIDE: Team
export function SlideTeam({ currency = "€" }) {
  const members = [
    {
      name: "Jaquelin Beliad Perez",
      role: "Co-Founder / Airport Retail & Brand Specialist",
      linkedin: "https://www.linkedin.com/in/maria-jaquelin-m-46b21486/",
      photo: "https://media.base44.com/images/public/69c97dcd1c1950fa88424690/abc1d9aaf_JaquelinBeliadPerez.jpeg",
    },
    {
      name: "Ariunzaya Zorigt",
      role: "Marketing Director",
      linkedin: "https://www.linkedin.com/in/aria-zorigt/",
      photo: "https://media.base44.com/images/public/69c97dcd1c1950fa88424690/9ae3deb4b_AriunzayaZorigt.jpeg",
    },
    {
      name: "Fares Ben Halima",
      role: "Technical Director",
      linkedin: "https://www.linkedin.com/in/fares-ben-halima-36b948158/",
      photo: "https://media.base44.com/images/public/69c97dcd1c1950fa88424690/38fa892f5_FaresBenHalima.jpeg",
    },
    {
      name: "Raël Martis Ozuna",
      role: "Co-Founder / Chief Commercial Officer",
      linkedin: "https://www.linkedin.com/in/israel-martis-ozuna/",
      photo: "https://media.base44.com/images/public/69c97dcd1c1950fa88424690/58e6f7004_FotoRaelMartis.jpeg",
    },
  ];

  return (
    <SlideWrapper>
      <div className="flex-1 flex flex-col justify-center px-5 py-6 md:px-12 md:py-6 relative">
        <GridBg />
        <div className="relative z-10">
          <div className="mb-6 text-center">
            <span className="text-violet-600 text-sm font-semibold uppercase tracking-widest">Our Team</span>
            <h2 className="text-xl md:text-3xl font-heading font-bold text-[#0a0f1e] mt-2">
              The People Behind <span className="text-violet-600">DutyBoost</span>
            </h2>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6 max-w-5xl mx-auto">
            {members.map((m) => (
              <div key={m.name} className="bg-white border border-slate-200 rounded-2xl p-4 md:p-5 text-center flex flex-col items-center shadow-sm">
                <div className="w-24 h-24 md:w-28 md:h-28 rounded-full overflow-hidden border-4 border-violet-100 mb-3 flex-shrink-0">
                  <img
                    src={m.photo}
                    alt={m.name}
                    className="w-full h-full object-cover"
                    loading="lazy"
                  />
                </div>
                <a
                  href={m.linkedin}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-slate-800 font-semibold text-sm md:text-base hover:text-violet-600 hover:underline transition-colors leading-tight"
                >
                  {m.name}
                </a>
                <div className="text-slate-500 text-xs md:text-sm mt-1.5 leading-tight">{m.role}</div>
              </div>
            ))}
          </div>
          <p className="mt-6 max-w-4xl mx-auto text-center text-slate-700 text-sm md:text-base leading-relaxed">
            DutyBoost brings together commercial strategy, software sales, airport retail, technology, product development, marketing, design and acquisition expertise. This combination gives us the knowledge to understand the market, build the right technology, drive adoption and bring DutyBoost successfully to market — with the capabilities to execute, launch and scale globally.
          </p>
        </div>
      </div>
    </SlideWrapper>
  );
}

// SLIDE 2: Global Market / Opportunity
export function SlideOpportunity({ currency = "€" }) {
  return (
    <SlideWrapper>
      <div className="flex-1 flex flex-col justify-center px-5 py-6 md:px-12 md:py-6 relative">
        <GridBg />
        <div className="relative z-10">
          <div className="mb-5">
            <span className="text-violet-600 text-sm font-semibold uppercase tracking-widest">Global Market</span>
            <h2 className="text-xl md:text-3xl font-heading font-bold text-[#0a0f1e] mt-2">
              The Addressable Market <span className="text-violet-600">Already Exists</span>
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
              <div className="text-slate-600 font-semibold text-sm">Global Conversion Rate</div>
              <div className="text-slate-500 text-xs mt-1">
                <a href={M1NDSET_LINK} target="_blank" rel="noopener noreferrer" className="text-blue-600 font-semibold underline decoration-blue-600/50 hover:decoration-blue-400 hover:text-blue-500 transition-colors">(m1nd-set)</a> — industry benchmark
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
              <div className="text-slate-400 text-xs mt-4">
                Source:{' '}
                <a href={TFWA_LINK} target="_blank" rel="noopener noreferrer" className="text-blue-400 font-semibold underline decoration-blue-400/50 hover:decoration-blue-300 hover:text-blue-300 transition-colors">
                  (TFWA 2025 Handbook)
                </a>
              </div>
            </div>
            <div className="bg-amber-50 border border-amber-200 rounded-2xl p-6">
              <h3 className="font-bold text-slate-700 mb-3">The POS Provider Position</h3>
              <div className="space-y-3">
                {[
                  { icon: Users, text: "9.8B global passengers in 2025", src: "ACI World" },
                  { icon: TrendingUp, text: "Only 27% convert — 73% walk past stores", src: "m1nd-set / TFWA" },
                  { icon: Building2, text: "45,000 retail stores across 2,800 airports", src: "ACI / DFWC" },
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
                <p className="text-green-800 text-sm font-semibold">POS providers already sit at the transaction layer — the exact point where incremental conversion is validated.</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </SlideWrapper>
  );
}

// SLIDE 3: The Facts
export function SlideFacts({ currency = "€" }) {
  return (
    <SlideWrapper>
      <div className="flex-1 flex flex-col justify-center px-5 py-6 md:px-12 md:py-6 relative">
        <GridBg />
        <div className="relative z-10">
          <div className="mb-5">
            <span className="text-violet-600 text-sm font-semibold uppercase tracking-widest">The Facts</span>
            <h2 className="text-xl md:text-3xl font-heading font-bold text-[#0a0f1e] mt-2">
              73% of Airport Passengers<br /><span className="text-violet-600">Never Make a Purchase</span>
            </h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8">
            <div className="space-y-5">
              <div className="bg-slate-50 border border-slate-200 rounded-2xl p-6">
                <div className="text-3xl md:text-5xl font-bold text-violet-600 mb-2">9.8B</div>
                <div className="text-slate-800 font-semibold">Global passengers in 2025</div>
                <div className="text-slate-500 text-sm mt-1">+3.6% vs 2024 | +7.3% vs 2019 <a href={ACI_LINK} target="_blank" rel="noopener noreferrer" className="text-blue-600 font-bold underline decoration-blue-600/50 hover:decoration-blue-400 hover:text-blue-500 transition-colors">(ACI World)</a></div>
              </div>
              <div className="bg-slate-50 border border-slate-200 rounded-2xl p-6">
                <div className="text-3xl md:text-5xl font-bold text-orange-600 mb-2">27%</div>
                <a href={M1NDSET_LINK} target="_blank" rel="noopener noreferrer" className="text-blue-600 font-semibold underline decoration-blue-600/50 hover:decoration-blue-400 hover:text-blue-500 transition-colors">
                  Global conversion benchmark
                </a>
                <div className="text-slate-500 text-sm mt-1">Industry penetration rate (m1nd-set / TFWA)</div>
              </div>
              <div className="bg-red-50 border border-red-200 rounded-2xl p-6">
                <div className="text-3xl md:text-5xl font-bold text-red-600 mb-2">7.15B</div>
                <div className="text-slate-800 font-semibold">Non-purchasing passengers</div>
                <div className="text-slate-500 text-sm mt-1">73% of 9.8B global passengers</div>
              </div>
            </div>
            <div className="flex flex-col gap-4 justify-center">
              <div className="bg-slate-50 border border-slate-200 rounded-2xl p-6">
                <h3 className="text-slate-800 font-semibold text-lg mb-4">Traditional Airport Retail Failure Points</h3>
                <ul className="space-y-3">
                  {[
                    "Activation starts only after the traveller clears security",
                    "Retailers compete for attention through impulse purchasing",
                    "Travel & Corporate Partners hold the early relationship — but get zero retail participation",
                    "No financial reason for a non-intending buyer to enter a store",
                    "73% of passengers walk straight to the gate",
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
                  "Large passenger flows do not automatically become retail customers. The 73% represents conversion headroom — not a permanent ceiling."
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </SlideWrapper>
  );
}

// SLIDE 4: The Solution
// SlideSolution — imported from @/components/shared/SlideSolution

// SLIDE 5: Non-Invasive POS Toggle
export function SlidePosToggle({ currency = "€" }) {
  return (
    <SlideWrapper>
      <div className="flex-1 flex flex-col justify-center px-5 py-6 md:px-12 md:py-6 relative">
        <GridBg />
        <div className="relative z-10">
          <div className="mb-5">
            <span className="text-violet-600 text-sm font-semibold uppercase tracking-widest">Technical Approach</span>
            <h2 className="text-xl md:text-3xl font-heading font-bold text-[#0a0f1e] mt-2">
              Non-Invasive. <span className="text-violet-600">Toggle-Only. POS-Level.</span>
            </h2>
            <p className="text-slate-500 mt-2 text-sm">DutyBoost enters at the POS layer as an opt-in feature — no new hardware, no POS overhaul, no disruption to existing operations.</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-5">
            <div className="bg-slate-50 border border-slate-200 rounded-2xl p-6">
              <div className="flex items-center gap-3 mb-4">
                <ToggleRight className="w-8 h-8 text-violet-600" />
                <h3 className="font-bold text-slate-800 text-lg">How the Toggle Works</h3>
              </div>
              <div className="space-y-3">
                {[
                  { step: "1", title: "POS Provider integrates once", desc: "A single API call adds DutyBoost as a feature to the POS platform" },
                  { step: "2", title: "Each retailer toggles on", desc: "Participating retailers activate DutyBoost with a toggle — no code changes per store" },
                  { step: "3", title: "Toggle off anytime", desc: "If a retailer opts out, the toggle simply switches off — zero residual impact" },
                  { step: "4", title: "No hardware, no downtime", desc: "Works with existing POS infrastructure — no new terminals, no new network" },
                ].map((s) => (
                  <div key={s.step} className="flex items-start gap-3">
                    <div className="w-7 h-7 rounded-full bg-violet-600 flex items-center justify-center text-white text-xs font-bold flex-shrink-0 mt-0.5">{s.step}</div>
                    <div>
                      <div className="text-slate-800 font-semibold text-sm">{s.title}</div>
                      <div className="text-slate-500 text-xs">{s.desc}</div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
            <div className="flex flex-col gap-4">
              <div className="bg-violet-50 border border-violet-200 rounded-2xl p-5">
                <div className="flex items-center gap-2 mb-3">
                  <Shield className="w-5 h-5 text-violet-600" />
                  <h3 className="font-bold text-violet-900">Why It's Non-Invasive</h3>
                </div>
                <div className="space-y-2">
                  {[
                    "No changes to shelf prices or existing sales flow",
                    "No new hardware, terminals, or network infrastructure",
                    "No POS system overhaul — existing system stays intact",
                    "No impact on non-DutyBoost transactions",
                    "No data migration or retailer-side development",
                  ].map((item, i) => (
                    <div key={i} className="flex items-start gap-2">
                      <CheckCircle className="w-4 h-4 text-violet-600 flex-shrink-0 mt-0.5" />
                      <span className="text-slate-700 text-sm">{item}</span>
                    </div>
                  ))}
                </div>
              </div>
              <div className="bg-gradient-to-br from-violet-600 to-indigo-700 rounded-2xl p-5 text-white">
                <div className="flex items-center gap-2 mb-2">
                  <Zap className="w-5 h-5" />
                  <h3 className="font-bold">Integrate Once. Deploy Repeatedly.</h3>
                </div>
                <p className="text-violet-50 text-sm leading-relaxed">
                  A single Enterprise POS integration enables DutyBoost across multiple retailers, stores, airports and geographic markets — fundamentally better scaling economics than per-retailer integrations.
                </p>
                <div className="mt-3 flex items-center gap-2 text-violet-100 text-sm font-semibold">
                  <Cpu className="w-4 h-4" />
                  <Plug className="w-4 h-4" />
                  <span>1 API call → unlimited retailer activation</span>
                </div>
              </div>
            </div>
          </div>
          <div className="bg-amber-50 border border-amber-300 rounded-2xl p-4">
            <p className="text-slate-700 text-sm font-medium">
              <span className="font-bold">Design principle:</span> DutyBoost is an activation layer, not a replacement layer. It sits alongside existing POS operations and can be toggled on or off without affecting any existing functionality.
            </p>
          </div>
        </div>
      </div>
    </SlideWrapper>
  );
}

// SLIDE 6: Technical POS Integration
export function SlideTechnicalIntegration({ currency = "€" }) {
  const m = model(currency);
  const request = `POST /v1/dutycredits/redeem
Secure partner authentication

{
  "dutycredit_token": "••••••",
  "transaction_reference": "••••••",
  "store_id": "••••••",
  "basket_amount": ${m.basket},
  "currency": "${currency === "€" ? "EUR" : "USD"}"
}`;

  const response = `HTTP/1.1 200 OK

{
  "status": "approved",
  "discount_amount": ${m.saving},
  "amount_due": ${m.pays},
  "pos_commission": ${m.pos},
  "currency": "${currency === "€" ? "EUR" : "USD"}"
}`;

  const features = [
    {
      icon: <ShieldCheck className="w-5 h-5 text-violet-300" />,
      title: "Secure authentication",
      desc: "Partner-specific access and encrypted HTTPS communication",
    },
    {
      icon: <RefreshCw className="w-5 h-5 text-violet-300" />,
      title: "Duplicate protection",
      desc: "Idempotent processing prevents accidental double redemption",
    },
    {
      icon: <Lock className="w-5 h-5 text-violet-300" />,
      title: "No PCI (Payment Card Industry) burden",
      desc: "DutyBoost never touches card data — it sits beside the payment flow",
    },
  ];

  return (
    <SlideWrapper>
      <div className="flex-1 flex flex-col justify-center px-5 py-6 md:px-12 md:py-6 relative">
        <GridBg />
        <div className="relative z-10">
          <div className="mb-4">
            <span className="text-violet-600 text-sm font-semibold uppercase tracking-widest">Technical POS Integration</span>
            <h2 className="text-xl md:text-3xl font-heading font-bold text-[#0a0f1e] mt-2">
              The Integration, <span className="text-violet-600">In One Call</span>
            </h2>
            <p className="text-slate-500 mt-1.5 text-sm max-w-4xl">
              Validate. Discount. Earn. One Request. One Response. — A single HTTPS call at checkout. DutyBoost validates the DutyCredit, returns the discount to apply, and credits the commission per participant — all attributed and logged automatically.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 items-stretch">
            <div className="flex flex-col">
              <div className="flex items-center gap-2 mb-1.5">
                <div className="w-5 h-5 rounded-full bg-violet-600 flex items-center justify-center text-white text-[10px] font-bold">1</div>
                <span className="text-violet-700 font-semibold text-sm">POS sends the transaction essentials</span>
              </div>
              <div className="bg-slate-950/80 border border-white/10 rounded-2xl overflow-hidden flex flex-col">
                <div className="flex items-center gap-2 px-4 py-2 border-b border-white/10 bg-white/5">
                  <div className="flex gap-1.5">
                    <div className="w-2.5 h-2.5 rounded-full bg-red-400/70" />
                    <div className="w-2.5 h-2.5 rounded-full bg-yellow-400/70" />
                    <div className="w-2.5 h-2.5 rounded-full bg-green-400/70" />
                  </div>
                  <span className="text-slate-400 text-xs font-mono ml-1">illustrative request</span>
                </div>
                <pre className="p-3 text-[10px] md:text-[11px] lg:text-xs leading-relaxed text-slate-200 overflow-x-auto font-mono whitespace-pre">{request}</pre>
              </div>
            </div>

            <div className="flex flex-col">
              <div className="flex items-center gap-2 mb-1.5">
                <div className="w-5 h-5 rounded-full bg-green-600 flex items-center justify-center text-white text-[10px] font-bold">2</div>
                <span className="text-green-700 font-semibold text-sm">DutyBoost returns the checkout result</span>
              </div>
              <div className="bg-slate-950/80 border border-white/10 rounded-2xl overflow-hidden flex flex-col">
                <div className="flex items-center gap-2 px-4 py-2 border-b border-white/10 bg-white/5">
                  <div className="flex gap-1.5">
                    <div className="w-2.5 h-2.5 rounded-full bg-red-400/70" />
                    <div className="w-2.5 h-2.5 rounded-full bg-yellow-400/70" />
                    <div className="w-2.5 h-2.5 rounded-full bg-green-400/70" />
                  </div>
                  <span className="text-slate-400 text-xs font-mono ml-1">illustrative response</span>
                </div>
                <pre className="p-3 text-[10px] md:text-[11px] lg:text-xs leading-relaxed text-slate-200 overflow-x-auto font-mono whitespace-pre">{response}</pre>
              </div>
            </div>
          </div>

          <div className="mt-4 grid grid-cols-1 md:grid-cols-3 gap-3">
            {features.map((f) => (
              <div key={f.title} className="bg-slate-50 border border-slate-200 rounded-xl p-4 flex items-start gap-3">
                <div className="flex-shrink-0 mt-0.5">{f.icon}</div>
                <div>
                  <div className="text-slate-900 font-semibold text-sm">{f.title}</div>
                  <div className="text-slate-600 text-xs mt-0.5 leading-relaxed">{f.desc}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </SlideWrapper>
  );
}

// SLIDE 7: One Transaction — Five Beneficiaries
export function SlideEcosystem({ currency = "€" }) {
  const m = model(currency);
  const parties = [
    { party: "Traveller", Icon: TravelerIcon, value: `${currency}${m.saving}`, sub: `DutyCredit saving (5%)`, color: "green", bg: "bg-green-50", border: "border-green-200" },
    { party: "Airport Retailer", Icon: AirportRetailerIcon, value: `${currency}${m.retailer}`, sub: "Net before normal costs (92.5%)", color: "blue", bg: "bg-blue-50", border: "border-blue-200" },
    { party: "Travel & Corporate Partner", Icon: Briefcase, value: `${currency}${m.partner}`, sub: "Ancillary revenue (0.5%)", color: "yellow", bg: "bg-yellow-50", border: "border-yellow-200" },
    { party: "POS Partner", Icon: Cpu, value: `${currency}${m.pos}`, sub: "Transaction revenue (0.25%)", color: "purple", bg: "bg-purple-50", border: "border-purple-200" },
    { party: "DutyBoost", Icon: BarChart3, value: `${currency}${m.boost}`, sub: "Infrastructure revenue (1.75%)", color: "orange", bg: "bg-orange-50", border: "border-orange-200" },
  ];
  return (
    <SlideWrapper>
      <div className="flex-1 flex flex-col justify-center px-5 py-6 md:px-12 md:py-6 relative">
        <GridBg />
        <div className="relative z-10">
          <div className="mb-6">
            <span className="text-violet-600 text-sm font-semibold uppercase tracking-widest">One Transaction — Five Beneficiaries</span>
            <h2 className="text-xl md:text-3xl font-heading font-bold text-[#0a0f1e] mt-2">
              {currency}{m.label} Entry-Tier Qualifying Sale Example
            </h2>
          </div>
          <div className="grid grid-cols-2 sm:grid-cols-5 gap-3 mb-6">
            {parties.map((pt) => (
              <div key={pt.party} className={`${pt.bg} border ${pt.border} rounded-2xl p-4 text-center`}>
                <pt.Icon className={`w-9 h-9 mx-auto mb-2 text-${pt.color}-600`} />
                <div className="text-slate-800 font-semibold text-xs sm:text-sm whitespace-nowrap mb-2">{pt.party}</div>
                <div className={`text-2xl font-bold text-${pt.color}-600 mb-1`}>{pt.value}</div>
                <div className="text-slate-500 text-xs leading-snug">{pt.sub}</div>
              </div>
            ))}
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            <div className="bg-slate-50 border border-slate-200 rounded-2xl p-5">
              <div className="text-slate-500 text-xs uppercase tracking-wide mb-2">Total = {currency}{m.basket}</div>
              <div className="flex h-6 rounded-full overflow-hidden gap-px">
                <div className="bg-green-500" style={{ width: "5%" }} title="Traveller 5%" />
                <div className="bg-blue-500" style={{ width: "92.5%" }} title="Retailer 92.5%" />
                <div className="bg-yellow-500" style={{ width: "0.5%" }} />
                <div className="bg-purple-500" style={{ width: "0.25%" }} />
                <div className="bg-orange-500" style={{ width: "1.75%" }} />
              </div>
              <div className="flex gap-3 mt-2 text-xs flex-wrap">
                {[
                  { color: "bg-green-500", label: "Traveller 5%" },
                  { color: "bg-blue-500", label: "Retailer 92.5%" },
                  { color: "bg-yellow-500", label: "Travel & Corporate Partner 0.5%" },
                  { color: "bg-purple-500", label: "POS 0.25%" },
                  { color: "bg-orange-500", label: "DutyBoost 1.75%" },
                ].map((l) => (
                  <div key={l.label} className="flex items-center gap-1.5">
                    <div className={`w-3 h-3 rounded-sm ${l.color}`} />
                    <span className="text-slate-600">{l.label}</span>
                  </div>
                ))}
              </div>
            </div>
            <div className="bg-gradient-to-br from-violet-600 to-indigo-700 rounded-2xl p-5 text-white">
              <h3 className="font-bold mb-3">The POS Provider Position</h3>
              <p className="text-violet-50 text-sm leading-relaxed">
                The POS provider already processes the transaction. DutyBoost turns that existing infrastructure into a new revenue stream — earning a 0.25% commission on every validated DutyCredit basket, with zero upfront cost and no operational risk.
              </p>
              <div className="mt-3 text-violet-100 font-semibold text-sm">
                You validate. You earn. No change to your core.
              </div>
            </div>
          </div>
        </div>
      </div>
    </SlideWrapper>
  );
}

// SLIDE 8: Business Model
export function SlideModel({ currency = "€" }) {
  const m = model(currency);
  return (
    <SlideWrapper>
      <div className="flex-1 flex flex-col justify-center px-5 py-6 md:px-12 md:py-6 relative">
        <GridBg />
        <div className="relative z-10">
          <div className="mb-5">
            <span className="text-violet-600 text-sm font-semibold uppercase tracking-widest">Business Model</span>
            <h2 className="text-xl md:text-3xl font-heading font-bold text-[#0a0f1e] mt-2">
              Performance-Based. <span className="text-violet-600">Zero Upfront Cost.</span>
            </h2>
            <p className="text-slate-500 mt-1 text-sm">Revenue is created only when a qualifying transaction is validated through Enterprise POS.</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <div className="bg-slate-800 text-white rounded-2xl p-4 sm:p-6 mb-4">
                <h3 className="font-bold text-white text-lg mb-3 sm:mb-4">The DutyCredit Tier Structure</h3>
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 text-xs text-slate-500 mb-1 px-2">
                  <span>Tier</span><span>Basket</span><span>Discount</span><span className="sm:text-right">Traveller Saves</span>
                </div>
                <div className="space-y-1">
                  {m.tiers.map((row, i) => (
                    <div key={i} className={`grid grid-cols-2 sm:grid-cols-4 gap-x-2 gap-y-0.5 py-1.5 px-2 rounded-lg text-xs ${i === 0 ? "bg-violet-700/80" : "hover:bg-white/5"}`}>
                      <span className="text-violet-300 font-semibold">{row.tier}</span>
                      <span className="text-slate-300">{row.range}</span>
                      <span className="text-yellow-300">{row.disc}</span>
                      <span className="text-green-300 font-semibold sm:text-right">{row.save}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
            <div className="flex flex-col gap-4">
              <div className="bg-violet-50 border border-violet-200 rounded-2xl p-5">
                <h3 className="font-bold text-violet-900 mb-3">Platform Fee Allocation (2.5% of Original Retail Value)</h3>
                <div className="space-y-2">
                  {[
                    { party: "Travel & Corporate Partner", share: "20% of fee", pct: "0.50%", val: `${currency}0.50`, color: "blue", bg: "bg-blue-200" },
                    { party: "Enterprise POS Partner", share: "10% of fee", pct: "0.25%", val: `${currency}0.25`, color: "indigo", bg: "bg-indigo-200" },
                    { party: "DutyBoost", share: "70% of fee", pct: "1.75%", val: `${currency}1.75`, color: "violet", bg: "bg-violet-200" },
                  ].map((row) => (
                    <div key={row.party} className="flex items-center gap-3">
                      <div className={`w-2 h-8 rounded-full ${row.bg}`} />
                      <div className="flex-1">
                        <div className="text-sm font-semibold text-slate-700">{row.party}</div>
                        <div className="text-xs text-slate-500">{row.share} = {row.pct} of retail value</div>
                      </div>
                      <div className={`text-lg font-bold text-${row.color}-700`}>{row.val}</div>
                    </div>
                  ))}
                </div>
              </div>
              <div className="bg-green-50 border border-green-200 rounded-2xl p-4 sm:p-5">
                <h3 className="font-bold text-green-900 mb-2">At 1 Million {currency}{m.label} Transactions:</h3>
                <div className="grid grid-cols-1 gap-1.5 text-sm">
                  {[
                    { party: "Travellers", val: `${currency}${m.m1} in savings` },
                    { party: "Travel & Corporate Partners", val: `${currency}${m.m2} ancillary revenue` },
                    { party: "POS Partners", val: `${currency}${m.m3} transaction revenue` },
                    { party: "DutyBoost", val: `${currency}${m.m4} infrastructure revenue` },
                    { party: "Retailers", val: `${currency}${m.m5} net before costs` },
                  ].map((row) => (
                    <div key={row.party} className="flex flex-col">
                      <span className="text-slate-600">{row.party}</span>
                      <span className="font-semibold text-green-700">{row.val}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </SlideWrapper>
  );
}

// SLIDE 9: Transaction Economics
export function SlideEconomics({ currency = "€" }) {
  const m = model(currency);
  return (
    <SlideWrapper>
      <div className="flex-1 flex flex-col justify-center px-5 py-6 md:px-12 md:py-6 relative">
        <GridBg />
        <div className="relative z-10">
          <div className="mb-5">
            <span className="text-violet-600 text-sm font-semibold uppercase tracking-widest">Transaction Economics</span>
            <h2 className="text-xl md:text-3xl font-heading font-bold text-[#0a0f1e] mt-2">
              {currency}{m.label} Entry-Tier Validated Basket — <span className="text-violet-600">Your 0.25% Share</span>
            </h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <div className="bg-slate-50 border border-slate-200 rounded-2xl p-5 mb-4">
                <div className="space-y-2">
                  {[
                    { label: "Original qualifying retail value", val: `${currency}${m.basket}`, style: "text-slate-900 font-bold text-lg" },
                    { label: "Traveller DutyCredit saving (5%)", val: `${currency}${m.saving}`, style: "text-orange-600" },
                    { label: "Traveller actually pays", val: `${currency}${m.pays}`, style: "text-blue-600" },
                    { label: "DutyBoost platform fee (2.5%)", val: `${currency}${m.fee}`, style: "text-slate-500" },
                    { label: "  → POS provider share (10% of fee)", val: `${currency}${m.pos}`, style: "text-violet-600" },
                  ].map((row, i) => (
                    <div key={i} className={`flex justify-between items-center py-1 border-b border-slate-100 ${i === 0 ? "pb-2 mb-1" : ""}`}>
                      <span className={`text-sm ${row.label.startsWith("  ") ? "pl-4 text-slate-500" : "text-slate-700"}`}>{row.label.trim()}</span>
                      <span className={`text-sm font-semibold ${row.style}`}>{row.val}</span>
                    </div>
                  ))}
                  <div className="flex justify-between items-center py-2 mt-1 bg-green-50 border border-green-200 rounded-xl px-3">
                    <span className="text-green-700 font-bold text-sm">Airport Retailer net before normal costs</span>
                    <span className="text-green-700 font-bold text-xl">{currency}{m.retailer}</span>
                  </div>
                </div>
              </div>
              <div className="bg-slate-50 border border-slate-200 rounded-2xl p-4">
                <div className="text-slate-500 text-xs uppercase tracking-wide mb-2">Platform fee distribution on {currency}{m.fee}</div>
                <div className="flex h-5 rounded-full overflow-hidden gap-px">
                  <div className="bg-violet-500" style={{ width: "10%" }} title="POS Provider 10%" />
                  <div className="bg-blue-500" style={{ width: "90%" }} title="DutyBoost 90%" />
                </div>
                <div className="flex gap-3 mt-2 flex-wrap text-xs">
                  {[
                    { color: "bg-violet-500", label: `POS Provider 10% (${currency}${m.pos})` },
                    { color: "bg-blue-500", label: `DutyBoost 90% (${currency}${m.boostFee})` },
                  ].map((l) => (
                    <div key={l.label} className="flex items-center gap-1">
                      <div className={`w-3 h-3 rounded-sm ${l.color}`} />
                      <span className="text-slate-500">{l.label}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
            <div className="flex flex-col gap-4">
              <div className="bg-gradient-to-br from-violet-50 to-indigo-50 border border-violet-200 rounded-2xl p-6">
                <h3 className="text-slate-900 font-bold text-lg mb-3">The Core Question</h3>
                <p className="text-violet-800 text-base leading-relaxed font-semibold">
                  "Is earning 10% on every validated DutyCredit basket — with zero upfront cost and no operational risk — a meaningful new revenue line for a POS provider already processing those transactions?"
                </p>
                <p className="text-violet-600 font-bold text-lg mt-3">Yes — and it scales with your footprint.</p>
              </div>
              <div className="bg-slate-50 border border-slate-200 rounded-2xl p-5">
                <h3 className="text-slate-900 font-semibold mb-3">Why the economics work for the POS provider</h3>
                <div className="space-y-2 text-sm">
                  {[
                    { item: "You already process the transaction", val: `${currency}0 marginal cost`, sub: "Validation is a lightweight API call" },
                    { item: "You earn on incremental sales", val: "Pure upside", sub: "From travellers who otherwise would not buy" },
                    { item: "Performance-based only", val: `${currency}0 on non-converters`, sub: "No fixed cost, no risk" },
                  ].map((row, i) => (
                    <div key={i} className="flex justify-between items-center p-2 rounded-lg">
                      <div>
                        <div className="text-slate-700">{row.item}</div>
                        <div className="text-slate-500 text-xs">{row.sub}</div>
                      </div>
                      <span className="font-bold text-violet-600">{row.val}</span>
                    </div>
                  ))}
                </div>
                <p className="text-slate-500 text-xs mt-3">The {currency}{m.label} Entry-tier basket is illustrative — your 0.25% commission applies to every validated DutyCredit redemption, whatever its size. And no matter where that DutyCredit originated — distributed by a Travel or Corporate Partner, or generated by the traveller directly through the DutyBoost platform — the POS provider is the one stakeholder that always earns, because every redemption is validated through the transaction you already process. Paid only on validated DutyBoost transactions; no cost on ordinary transactions or non-converting travellers.</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </SlideWrapper>
  );
}

// SLIDE 10: Revenue at Scale
export function SlideScale({ currency = "€" }) {
  return (
    <SlideWrapper>
      <div className="flex-1 flex flex-col justify-center px-5 py-6 md:px-12 md:py-6 relative">
        <GridBg />
        <div className="relative z-10">
          <div className="mb-5">
            <span className="text-violet-600 text-sm font-semibold uppercase tracking-widest">Your Recurring Revenue</span>
            <h2 className="text-xl md:text-3xl font-heading font-bold text-[#0a0f1e] mt-2">
              What DutyBoost Brings <span className="text-violet-600">to Your Store Network</span>
            </h2>
            <p className="text-slate-500 mt-1 text-sm">Estimated annual POS-provider commission (0.25% of every validated basket) at an 80% DutyCredit redemption rate — blended across corporate, travel-partner and direct-app sources — assuming 3,000 DutyCredits issued per store per year and a {currency}60 average basket.</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-5 mb-5">
            {[
              { size: "Boutique POS", stores: "50 stores", conv: "80% redemption", net: `${currency}18,000`, color: "violet" },
              { size: "Regional POS", stores: "500 stores", conv: "80% redemption", net: `${currency}180,000`, color: "indigo" },
              { size: "Enterprise POS", stores: "2,000 stores", conv: "80% redemption", net: `${currency}720,000`, color: "blue" },
            ].map((s) => (
              <div key={s.size} className={`bg-${s.color}-50 border border-${s.color}-200 rounded-2xl p-5 text-center`}>
                <div className={`text-xs font-semibold text-${s.color}-600 uppercase tracking-wide mb-1`}>{s.size}</div>
                <div className="text-slate-500 text-sm mb-3">{s.stores}</div>
                <div className={`text-2xl md:text-3xl font-bold text-${s.color}-700 mb-1`}>{s.net}</div>
                <div className={`text-${s.color}-600 text-sm font-medium mb-2`}>annual POS commission</div>
                <div className="text-slate-500 text-xs border-t border-slate-200 pt-2">{s.conv} · 3,000 credits/store @ {currency}60</div>
              </div>
            ))}
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            <div className="bg-slate-800 text-white rounded-2xl p-5">
              <h3 className="font-bold mb-3">DutyCredit Redemption Sensitivity</h3>
              <div className="space-y-2 text-sm">
                {[
                  { pp: "100% redemption", mult: "1.25× the figures above" },
                  { pp: "80% redemption", mult: "the figures above" },
                  { pp: "60% redemption", mult: "0.75× the figures above" },
                  { pp: "40% redemption", mult: "0.5× the figures above" },
                ].map((row, i) => (
                  <div key={i} className={`flex justify-between items-center py-1.5 px-3 rounded-lg ${i === 1 ? "bg-violet-700/60 font-semibold" : ""}`}>
                    <span className="text-violet-300">{row.pp}</span>
                    <span className="text-slate-300">{row.mult}</span>
                  </div>
                ))}
              </div>
            </div>
            <div className="bg-gradient-to-br from-violet-50 to-indigo-50 border border-violet-200 rounded-2xl p-5">
              <h3 className="font-bold text-violet-900 mb-3">Why This Is Pure Upside</h3>
              <ul className="space-y-2 text-sm">
                {[
                  "100% incremental — earned on sales that otherwise would not happen",
                  "Zero upfront cost — no setup fee, no subscription, no licence",
                  "No change to your POS core, payments or merchant contracts",
                  "Attributed & reported transparently per transaction",
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

// SLIDE 11: Growth Flywheel
export function SlideFlywheel({ currency = "€" }) {
  const steps = [
    "More Travel & Corporate Partners",
    "More Travellers Reached",
    "More DutyCredits Distributed",
    "More Self-Generated DutyCredits",
    "More Traveller Incentives",
    "More Pre-Airport Activation",
    "More Participating Retail Visits",
    "More Retail Conversion",
    "More Validated Transactions",
    "More Airport Concession Revenue",
    "More Wholesale Sell-Through",
    "More Retailer Revenue",
    "More Travel & Corporate Partner Revenue",
    "More DutyBoost Revenue",
    "More Evidence of Commercial Value",
    "Stronger Partner Adoption",
    "Greater Network Scale",
  ];

  return (
    <SlideWrapper>
      <div className="flex-1 flex flex-col justify-center px-5 py-6 md:px-12 md:py-6 relative">
        <GridBg />
        <div className="relative z-10">
          <div className="mb-6">
            <span className="text-violet-600 text-sm font-semibold uppercase tracking-widest">The Growth Flywheel</span>
            <h2 className="text-xl md:text-3xl font-heading font-bold text-[#0a0f1e] mt-2">
              A Self-Reinforcing <span className="text-violet-600">Circular Ecosystem</span>
            </h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8 items-center">
            <div className="relative flex items-center justify-center" style={{ height: "340px" }}>
              <div className="absolute inset-0 rounded-full border-2 border-violet-200" />
              <div className="bg-violet-600 border-2 border-violet-700 rounded-full w-28 h-28 flex flex-col items-center justify-center text-center z-10">
                <div className="text-white text-xs font-bold leading-tight px-2">Circular Revenue Infrastructure</div>
              </div>
              {steps.slice(0, 11).map((step, i) => {
                               const angle = (i / 11) * 360 - 90;
                const rad = (angle * Math.PI) / 180;
                const r = 145;
                const x = 50 + (r / 3.4) * Math.cos(rad);
                const y = 50 + (r / 3.4) * Math.sin(rad);
                return (
                  <div
                    key={i}
                    className="absolute bg-violet-50 border border-violet-200 rounded-lg px-2 py-1 text-center"
                    style={{
                      left: `${x}%`,
                      top: `${y}%`,
                      transform: "translate(-50%, -50%)",
                      maxWidth: "90px",
                    }}
                  >
                    <div className="text-violet-700 text-xs font-semibold leading-tight">{step}</div>
                  </div>
                );
              })}
              <div className="absolute inset-0 rounded-full border-2 border-dashed border-violet-300 animate-spin" style={{ animationDuration: "30s" }} />
            </div>
            <div className="space-y-4">
              <div className="bg-slate-50 border border-slate-200 rounded-2xl p-5">
                <h3 className="text-slate-800 font-bold mb-3">Network Effects by Participant</h3>
                <div className="space-y-2.5 text-sm">
                  {[
                    { Icon: Briefcase, party: "More Travel & Corporate Partners", effect: "→ More travellers reached before airport arrival" },
                    { Icon: TravelerIcon, party: "More Self-Generated DutyCredits", effect: "→ Travellers activate directly — no partner required" },
                    { Icon: AirportRetailerIcon, party: "More Retailers", effect: "→ More DutyCredit redemption opportunities" },
                    { Icon: Cpu, party: "More POS Integrations", effect: "→ More deployment capacity" },
                    { Icon: BarChart3, party: "More Transactions", effect: "→ Stronger commercial evidence" },
                    { Icon: Link2, party: "Stronger Evidence", effect: "→ Easier future partner acquisition" },
                    { Icon: Plane, party: "More Airports", effect: "→ Higher non-aeronautical concession revenue" },
                    { Icon: Package, party: "More Wholesale Suppliers", effect: "→ Faster stock rotation and reorder volume" },
                  ].map((row) => (
                    <div key={row.party} className="flex items-start gap-2">
                      <row.Icon className="w-4 h-4 text-violet-600 mt-0.5 flex-shrink-0" />
                      <div>
                        <span className="text-violet-700 font-semibold">{row.party} </span>
                        <span className="text-slate-600">{row.effect}</span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
              <div className="bg-gradient-to-br from-violet-600 to-indigo-700 rounded-2xl p-5 text-white">
                <p className="font-bold text-lg leading-snug">
                  "A positive flywheel that creates growth for every stakeholder."
                </p>
                <p className="text-violet-100 text-sm mt-2">Each new partner makes the platform more valuable for every existing partner — including your POS network.</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </SlideWrapper>
  );
}

// SLIDE 12: Closing
export function SlideClosing({ currency = "€" }) {
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
              Converting the 73%<br />
              <span className="text-violet-600">Who Never Buy</span>
            </h1>
            <p className="text-lg md:text-xl text-slate-500 max-w-3xl leading-relaxed">
              A proven, performance-based revenue layer — built on infrastructure that already exists.
            </p>
          </div>
          <div className="grid grid-cols-3 gap-2 sm:gap-6 mt-4 w-full max-w-2xl">
            {[
              { label: "Airports with Retail", value: "2,800" },
              { label: "Non-Purchasing Travellers", value: "7.15B" },
              { label: "POS Commission", value: "0.25%" },
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
              Always performance-based — earn a 10% share of the DutyBoost Platform Fee on every validated sale.
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
  { id: "opportunity", type: "opportunity" },
  { id: "facts", type: "facts" },
  { id: "solution", type: "solution" },
  { id: "posToggle", type: "posToggle" },
  { id: "technicalIntegration", type: "technicalIntegration" },
  { id: "ecosystem", type: "ecosystem" },
  { id: "model", type: "model" },
  { id: "economics", type: "economics" },
  { id: "scale", type: "scale" },
  { id: "flywheel", type: "flywheel" },
  { id: "closing", type: "closing" },
];

export const SLIDE_LABELS = {
  cover: "Cover",
  team: "Our Team",
  opportunity: "Global Market",
  facts: "The Facts",
  solution: "The Solution",
  posToggle: "Non-Invasive POS Toggle",
  technicalIntegration: "Technical POS Integration",
  ecosystem: "One Transaction — Five Beneficiaries",
  model: "Business Model",
  economics: "Transaction Economics",
  scale: "Revenue at Scale",
  flywheel: "Growth Flywheel",
  closing: "Thank You",
};

export function getSlideComponent(type, currency) {
  const map = {
    cover: () => <SlideCover currency={currency} />,
    team: () => <SlideTeam currency={currency} />,
    opportunity: () => <SlideOpportunity currency={currency} />,
    facts: () => <SlideFacts currency={currency} />,
    solution: () => <SlideSolution />,
    posToggle: () => <SlidePosToggle currency={currency} />,
    technicalIntegration: () => <SlideTechnicalIntegration currency={currency} />,
    ecosystem: () => <SlideEcosystem currency={currency} />,
    model: () => <SlideModel currency={currency} />,
    economics: () => <SlideEconomics currency={currency} />,
    scale: () => <SlideScale currency={currency} />,
    flywheel: () => <SlideFlywheel currency={currency} />,
    closing: () => <SlideClosing currency={currency} />,
  };
  return map[type] || map.cover;
}