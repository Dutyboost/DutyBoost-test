import { useState, useEffect, useRef } from "react";
import { ChevronLeft, ChevronRight, ArrowRight, Cpu, BarChart3, Link2, Briefcase, Store, CheckCircle, Plane, Package } from "lucide-react";
import DutyBoostLogo from "@/components/DutyBoostLogo";
import { SlideSolution } from "@/components/shared/SlideSolution";
import { SlideTierMix as TierMixSlide } from "@/components/shared/SlideTierMix";
import SlideAcquisitionTrinidad from "@/components/retailer-pitch-trinidad/SlideAcquisitionTrinidad";
import CalBanner from "@/components/retailer-pitch-trinidad/CalBanner";
import AirportRetailerIcon from "@/components/AirportRetailerIcon";
import TravelerIcon from "@/components/TravelerIcon";
import { TEAM_MEMBERS } from "@/data/teamMembers";
import { TOTAL_MOVEMENTS, AIRPORT_COUNT, NON_PURCHASING_MOVEMENTS, CONVERSION_ROWS, AATT_LINK, ASSORTMENT_SPLIT, EUR_USD_RATE } from "@/components/retailer-pitch-trinidad/figures";

const ACCENT = "#952d8b";

const CMI_LINK = "https://www.coherentmarketinsights.com/market-insight/caribbean-duty-free-retailing-market-4934";
const M1NDSET_LINK = "https://www.gtrmag.com/blog/gtr-magazine-looks-at-the-state-of-travel-and-tourism-in-the-caribbean";
const CTO_LINK = "https://www.onecaribbean.org/caribbean-tourism-shows-resilient-growth-amid-global-headwinds-in-2025/";
const CAL_LINK = "https://www.caribbean-airlines.com/";
const CSO_LINK = "https://cso.gov.tt/subjects/travel-and-tourism/travel-statistics/";
const CAL_DF_LINK = "https://dutyfree.caribbean-airlines.com/";

const SLIDES = [
  { id: "cover", type: "cover" },
  { id: "team", type: "team" },
  { id: "problem", type: "problem" },
  { id: "solution", type: "solution" },
  { id: "market", type: "market" },
  { id: "conversion", type: "conversion" },
  { id: "acquisition", type: "acquisition" },
  { id: "model", type: "model" },
  { id: "tierMix", type: "tierMix" },
  { id: "transaction", type: "transaction" },
  { id: "integrate", type: "integrate" },
  { id: "flywheel", type: "flywheel" },
  { id: "getStarted", type: "getStarted" },
  { id: "thankYou", type: "thankYou" },
];

const SLIDE_LABELS = {
  cover: "Cover",
  team: "Our Team",
  problem: "The Facts",
  solution: "The Solution",
  market: "Trinidad & Tobago Market",
  conversion: "Conversion Opportunity",
  acquisition: "Customer Acquisition — On Us",
  model: "Business Model",
  tierMix: "Transaction Mix — Tier Economics",
  transaction: "Transaction Economics",
  integrate: "POS Integration",
  flywheel: "Growth Flywheel",
  getStarted: "Get Started",
  thankYou: "Thank You",
};

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
      backgroundImage: "linear-gradient(rgba(149,45,139,0.5) 1px, transparent 1px), linear-gradient(90deg, rgba(149,45,139,0.5) 1px, transparent 1px)",
      backgroundSize: "40px 40px"
    }} />
  );
}

// SLIDE 1: Cover
function SlideCover() {
  return (
    <SlideWrapper>
      <div className="flex-1 flex flex-col items-center justify-center px-4 py-5 md:px-10 text-center relative">
        <GridBg />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] rounded-full opacity-10"
          style={{ background: "radial-gradient(circle, #952d8b 0%, transparent 70%)" }} />
        <div className="relative z-10 w-full max-w-5xl flex flex-col items-center gap-4">
          <div className="bg-white rounded-2xl px-6 py-3 shadow-2xl border border-slate-200">
            <DutyBoostLogo height={44} linkTo="/retailer-showcase" />
          </div>

          <CalBanner />

          <div>
            <h1 className="text-2xl md:text-4xl font-heading font-bold text-[#0a0f1e] leading-tight mb-3">
              Incremental Revenue From Travellers<br />
              <span style={{ color: ACCENT }}>Who Otherwise Wouldn't Buy</span>
            </h1>
            <p className="text-base md:text-xl text-slate-500 max-w-3xl leading-relaxed">
              A Presentation for Trinidad &amp; Tobago Airport Retailers — Piarco International Airport &amp; A.N.R. Robinson International Airport, Tobago
            </p>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 sm:gap-6 w-full max-w-3xl">
            {[
              { label: "Passenger Movements a Year", value: TOTAL_MOVEMENTS },
              { label: "Airports Served", value: AIRPORT_COUNT },
              { label: "Non-Purchase", value: "73%" },
              { label: "Upfront Cost", value: "$0" },
            ].map((s) => (
              <div key={s.label} className="text-center">
                <div className="text-xl sm:text-3xl font-bold" style={{ color: ACCENT }}>{s.value}</div>
                <div className="text-xs sm:text-sm text-slate-500 mt-1">{s.label}</div>
              </div>
            ))}
          </div>

          <div className="mt-1 text-xs text-slate-500 border border-slate-300 rounded px-4 py-2">
            CONFIDENTIAL — 2026 | Chamber of Commerce: 42053181 | VAT: NL869492068B01
          </div>
        </div>
      </div>
    </SlideWrapper>
  );
}

// SLIDE 2: Team
function SlideTeam() {
  return (
    <SlideWrapper>
      <div className="flex-1 flex flex-col justify-center px-5 py-6 md:px-12 md:py-6 relative">
        <GridBg />
        <div className="relative z-10">
          <div className="mb-6 text-center">
            <span className="text-sm font-semibold uppercase tracking-widest" style={{ color: ACCENT }}>Our Team</span>
            <h2 className="text-xl md:text-3xl font-heading font-bold text-[#0a0f1e] mt-2">
              The People Behind <span style={{ color: ACCENT }}>DutyBoost</span>
            </h2>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6 max-w-5xl mx-auto">
            {TEAM_MEMBERS.map((m) => (
              <div key={m.name} className="bg-white border border-slate-200 rounded-2xl p-4 md:p-5 text-center flex flex-col items-center shadow-sm">
                <div className="w-24 h-24 md:w-28 md:h-28 rounded-full overflow-hidden border-4 border-purple-100 mb-3 flex-shrink-0">
                  <img src={m.photo} alt={m.name} className="w-full h-full object-cover" loading="lazy" />
                </div>
                <a href={m.linkedin} target="_blank" rel="noopener noreferrer"
                  className="text-slate-800 font-semibold text-sm md:text-base hover:underline transition-colors leading-tight">
                  {m.name}
                </a>
                <div className="text-slate-500 text-xs md:text-sm mt-1.5 leading-tight">{m.role}</div>
              </div>
            ))}
          </div>
          <p className="mt-6 max-w-4xl mx-auto text-center text-slate-700 text-sm md:text-base leading-relaxed">
            DutyBoost brings together commercial strategy, software sales, airport retail, technology, product development, marketing, design and acquisition expertise — the capabilities to execute, launch and scale globally.
          </p>
        </div>
      </div>
    </SlideWrapper>
  );
}

// SLIDE 3: Problem
function SlideProblem() {
  return (
    <SlideWrapper>
      <div className="flex-1 flex flex-col justify-center px-5 py-6 md:px-12 md:py-6 relative">
        <GridBg />
        <div className="relative z-10">
          <div className="mb-5">
            <span className="text-sm font-semibold uppercase tracking-widest" style={{ color: ACCENT }}>The Facts</span>
            <h2 className="text-xl md:text-3xl font-heading font-bold text-[#0a0f1e] mt-2">
              73% of Airport Passengers<br /><span style={{ color: ACCENT }}>Never Make a Purchase</span>
            </h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8">
            <div className="space-y-5">
              <div className="bg-slate-50 border border-slate-200 rounded-2xl p-6">
                <div className="text-3xl md:text-5xl font-bold mb-2" style={{ color: ACCENT }}>35M</div>
                <div className="text-slate-800 font-semibold">Caribbean stayover arrivals in 2025</div>
                <div className="text-slate-500 text-sm mt-1">+2.5% vs 2024 | +16.7% vs 2019{" "}
                  <a href={CTO_LINK} target="_blank" rel="noopener noreferrer"
                    className="font-bold underline decoration-current/50" style={{ color: ACCENT }}>(CTO)</a>
                </div>
              </div>
              <div className="bg-slate-50 border border-slate-200 rounded-2xl p-6">
                <div className="text-3xl md:text-5xl font-bold mb-2" style={{ color: ACCENT }}>{TOTAL_MOVEMENTS}</div>
                <div className="text-slate-800 font-semibold">Passenger movements a year across Trinidad &amp; Tobago's two airports</div>
                <div className="text-slate-500 text-sm mt-1">Piarco International Airport and A.N.R. Robinson International Airport, Tobago — arrivals and departures combined{" "}
                  <a href={AATT_LINK} target="_blank" rel="noopener noreferrer"
                    className="font-bold underline decoration-current/50" style={{ color: ACCENT }}>(AATT)</a>
                </div>
              </div>
              <div className="bg-red-50 border border-red-200 rounded-2xl p-6">
                <div className="text-3xl md:text-5xl font-bold text-red-600 mb-2">73%</div>
                <a href={M1NDSET_LINK} target="_blank" rel="noopener noreferrer"
                  className="font-semibold underline decoration-current/50" style={{ color: ACCENT }}>
                  Caribbean non-purchase rate (m1nd-set)
                </a>
                <div className="text-slate-500 text-sm mt-1">27% purchase rate | 73% non-purchase across the Caribbean — {NON_PURCHASING_MOVEMENTS} passenger movements at Piarco and Tobago alone</div>
              </div>
            </div>
            <div className="flex flex-col gap-4 justify-center">
              <div className="bg-slate-50 border border-slate-200 rounded-2xl p-6">
                <h3 className="text-slate-800 font-semibold text-lg mb-4">Traditional Airport Retail Failure Points</h3>
                <ul className="space-y-3">
                  {[
                    "Activation starts only after the traveller clears security at Piarco or Tobago",
                    "Retailers compete for attention through impulse purchasing",
                    "No financial reason for a non-intending buyer to enter a store",
                    "Travel & Corporate Partners hold the early relationship — but get zero retail participation",
                    "73% of passengers walk straight to the gate",
                  ].map((item, i) => (
                    <li key={i} className="flex items-start gap-3">
                      <div className="w-1.5 h-1.5 rounded-full bg-red-500 mt-2 flex-shrink-0" />
                      <span className="text-slate-600 text-sm">{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
              <div className="bg-purple-50 border border-purple-200 rounded-2xl p-5">
                <p className="text-purple-700 text-sm leading-relaxed italic">
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

// SLIDE 5: Trinidad & Tobago Market
function SlideMarket() {
  return (
    <SlideWrapper>
      <div className="flex-1 flex flex-col justify-center px-5 py-6 md:px-12 md:py-6">
        <div className="mb-5">
          <span className="text-sm font-semibold uppercase tracking-widest" style={{ color: ACCENT }}>Trinidad &amp; Tobago Market Opportunity</span>
          <h2 className="text-xl md:text-3xl font-heading font-bold text-[#0a0f1e] mt-2">
            3M Passenger Movements. 2 Airports. <span style={{ color: ACCENT }}>$29M Local Market of $2.72B Regional</span>
          </h2>
          <p className="text-slate-500 mt-2">DutyBoost doesn't need to create the market. It connects what already exists.</p>
        </div>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3 md:gap-4 mb-2">
          {[
            { label: "Passenger Movements a Year", value: TOTAL_MOVEMENTS, sub: "Piarco & A.N.R. Robinson combined (AATT)", color: "#952d8b", link: AATT_LINK },
            { label: "Airports Served", value: AIRPORT_COUNT, sub: "Piarco International & A.N.R. Robinson, Tobago", color: "#3b82f6", link: AATT_LINK },
            { label: "Caribbean DF&TR Market", value: "$2.72B", sub: "21.7% CAGR 2026-2033 (CMI)", color: "#6d28d9", link: CMI_LINK },
            { label: "Trinidad & Tobago DF&TR Share", value: "$29M", sub: "1.07% of Caribbean market (est.)", color: "#16a34a", link: CMI_LINK },
          ].map((m) => (
            <div key={m.label} className="bg-slate-50 border border-slate-200 rounded-2xl p-4 md:p-6 text-center">
              <div className="text-xl md:text-3xl font-bold mb-2" style={{ color: m.color }}>{m.value}</div>
              <div className="font-semibold text-slate-700 mb-1 text-xs md:text-sm">{m.label}</div>
              <div className="text-slate-500 text-xs">
                <a href={m.link} target="_blank" rel="noopener noreferrer"
                  className="font-semibold underline decoration-current/50" style={{ color: ACCENT }}>
                  {m.sub}
                </a>
              </div>
            </div>
          ))}
        </div>
        <p className="text-slate-400 text-[11px] mb-5 leading-snug">
          Trinidad &amp; Tobago category values estimated from CMI market data, proportional to Trinidad &amp; Tobago's stopover arrival share of the Caribbean market (373,027 / 35M ≈ 1.07% of $2.72B ≈ $29M total) —{" "}
          <a href={CSO_LINK} target="_blank" rel="noopener noreferrer" className="font-semibold underline decoration-current/50" style={{ color: ACCENT }}>CSO Trinidad &amp; Tobago</a>
          {" "}|{" "}
          <a href={CMI_LINK} target="_blank" rel="noopener noreferrer" className="font-semibold underline decoration-current/50" style={{ color: ACCENT }}>CMI</a>
        </p>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          <div className="bg-slate-50 border border-slate-200 rounded-2xl p-6">
            <h3 className="font-bold text-slate-700 mb-1">Caribbean Airlines Duty Free — Combined Assortment Revenue</h3>
            <p className="text-slate-500 text-xs mb-4">Piarco International Airport &amp; A.N.R. Robinson International Airport, Tobago combined — the same four categories carried at both airports.</p>
            <div className="space-y-3">
              {ASSORTMENT_SPLIT.map((row) => (
                <div key={row.cat}>
                  <div className="flex items-center justify-between mb-1">
                    <div className="text-slate-700 text-sm font-semibold">{row.cat}</div>
                    <div className="text-slate-700 text-sm font-semibold">
                      {row.value} <span className="text-slate-400 font-normal">({row.share})</span>
                    </div>
                  </div>
                  <div className="w-full bg-slate-200 rounded-full h-2">
                    <div className="h-2 rounded-full" style={{ width: `${row.pct}%`, background: ACCENT }} />
                  </div>
                  <div className="text-slate-500 text-xs mt-1">{row.note}</div>
                </div>
              ))}
            </div>
            <div className="text-slate-400 text-xs mt-3">
              Category split estimated from CMI Caribbean category shares applied to the combined Trinidad &amp; Tobago market of $29M. Categories and brands as listed on{" "}
              <a href={CAL_DF_LINK} target="_blank" rel="noopener noreferrer" className="font-semibold underline decoration-current/50" style={{ color: ACCENT }}>
                dutyfree.caribbean-airlines.com
              </a>
              {" "}— pre-order online, pay online, collect in-store at Piarco or Tobago. Balance is tobacco, fashion and other categories.
            </div>
          </div>
          <div className="bg-amber-50 border border-amber-200 rounded-2xl p-6">
            <h3 className="font-bold text-slate-700 mb-3">DutyBoost doesn't need to create:</h3>
            <div className="space-y-2">
              {[
                "Piarco International Airport and A.N.R. Robinson International Airport — both already operate",
                "Passenger traffic — ~3M passenger movements a year across Piarco and A.N.R. Robinson",
                "Airport Retailers — Caribbean Airlines Duty Free already operates stores at both airports",
                "Travel & Corporate Partners — they already communicate with travellers",
                "Enterprise POS — already processes transactions",
              ].map((item, i) => (
                <div key={i} className="flex items-center gap-2">
                  <div className="w-5 h-5 rounded-full bg-green-100 border border-green-300 flex items-center justify-center flex-shrink-0">
                    <span className="text-green-600 text-xs">✓</span>
                  </div>
                  <span className="text-slate-600 text-sm">{item}</span>
                </div>
              ))}
            </div>
            <div className="mt-4 bg-green-100 border border-green-300 rounded-xl p-3">
              <p className="text-green-800 text-sm font-semibold">DutyBoost's role: Connect the value between existing participants.</p>
            </div>
          </div>
        </div>
      </div>
    </SlideWrapper>
  );
}

// SLIDE 6: Conversion Opportunity
function SlideConversion() {
  return (
    <SlideWrapper>
      <div className="flex-1 flex flex-col justify-center px-5 py-6 md:px-12 md:py-6">
        <div className="mb-6">
          <span className="text-sm font-semibold uppercase tracking-widest" style={{ color: ACCENT }}>Conversion Opportunity</span>
          <h2 className="text-xl md:text-3xl font-heading font-bold text-[#0a0f1e] mt-2">
            Small Conversion Gains = <span style={{ color: ACCENT }}>Enormous Value at Scale</span>
          </h2>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-5">
          <div>
            <div className="bg-red-50 border border-red-200 rounded-2xl p-5 mb-4">
              <div className="flex items-center gap-4">
                <div>
                  <div className="text-3xl md:text-5xl font-bold text-red-600">73%</div>
                  <div className="text-slate-600 font-semibold text-sm mt-1">Non-purchase rate (m1nd-set Caribbean)</div>
                  <div className="text-slate-400 text-xs mt-1">= {NON_PURCHASING_MOVEMENTS} unreached passenger movements at Piarco and A.N.R. Robinson</div>
                </div>
                <div className="flex-1 text-right">
                  <div className="text-3xl md:text-5xl font-bold text-green-600">27%</div>
                  <div className="text-slate-600 font-semibold text-sm mt-1">Currently converting</div>
                </div>
              </div>
              <div className="mt-3 pt-3 border-t border-red-200/60">
                <a href={M1NDSET_LINK} target="_blank" rel="noopener noreferrer"
                  className="font-semibold underline decoration-current/50" style={{ color: ACCENT }}>
                  m1nd-set Caribbean purchase rate benchmark
                </a>
              </div>
            </div>
            <div className="bg-purple-50 border border-purple-200 rounded-2xl p-4 sm:p-5">
              <h3 className="font-bold text-purple-800 mb-3">Non-Purchasing Traveller Incremental Potential ({NON_PURCHASING_MOVEMENTS}):</h3>
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 text-xs text-slate-400 mb-1 px-2">
                <span>Conversion</span><span>Transactions</span><span>Retail Value</span><span className="sm:text-right">Retailer Net</span>
              </div>
              <div className="space-y-1.5">
                {CONVERSION_ROWS.map((row, i) => (
                  <div key={i} className={`grid grid-cols-2 sm:grid-cols-4 gap-x-2 gap-y-0.5 text-sm py-1.5 px-2 rounded-lg ${i === 2 ? "bg-purple-200/50 font-semibold" : ""}`}>
                    <span className="text-purple-700">{row.conv}</span>
                    <span className="text-slate-600">{row.txns} txns</span>
                    <span className="text-slate-600">{row.retail}</span>
                    <span className="text-green-700 font-semibold sm:text-right">{row.ret}</span>
                  </div>
                ))}
              </div>
              <p className="text-slate-400 text-[10px] mt-2 leading-snug">Based on ~3M passenger movements a year across Piarco and A.N.R. Robinson, 73% non-purchase, an illustrative $100 basket used as the example, and the retailer's 87.5% net share.</p>
            </div>
          </div>
          <div className="flex flex-col gap-4">
            <div className="bg-slate-800 text-white rounded-2xl p-6 flex-1 flex flex-col">
              <h3 className="font-bold text-white text-lg mb-4">The DutyBoost Proposition for Retailers</h3>
              <div className="flex-1 flex flex-col justify-center gap-3">
                {[
                  { from: "Retailers wait for passengers", to: "Passengers arrive with purchase intent" },
                  { from: "Impulse-driven shopping", to: "Pre-activated economic incentive" },
                  { from: "No reason to enter the store", to: "DutyCredit gives a reason to visit" },
                  { from: "73% walk straight to the gate", to: "Pre-activated travellers detour to your store" },
                ].map((row, i) => (
                  <div key={i} className="grid grid-cols-[1fr,auto,1fr] gap-2 items-stretch text-sm">
                    <span className="text-red-300 bg-red-900/30 rounded-lg px-3 py-2.5 text-center flex items-center justify-center leading-snug">{row.from}</span>
                    <ArrowRight size={16} className="text-purple-300 flex-shrink-0 self-center" />
                    <span className="text-green-300 bg-green-900/30 rounded-lg px-3 py-2.5 text-center flex items-center justify-center leading-snug">{row.to}</span>
                  </div>
                ))}
              </div>
            </div>
            <div className="rounded-2xl p-5 text-white" style={{ background: "linear-gradient(135deg, #952d8b 0%, #6b1f66 100%)" }}>
              <div className="text-sm font-semibold opacity-80 mb-1">The Core Question</div>
              <p className="text-lg font-bold leading-snug">
                "Is earning $87.50 from an incremental $100 retail sale — without any upfront acquisition cost — more valuable than earning $0 from a traveller who otherwise wouldn't have converted?"
              </p>
              <p className="text-sm mt-2 opacity-80">Yes. Every time.</p>
            </div>
          </div>
        </div>
      </div>
    </SlideWrapper>
  );
}

// SLIDE 7: Business Model
function SlideModel() {
  return (
    <SlideWrapper>
      <div className="flex-1 flex flex-col justify-center px-5 py-6 md:px-12 md:py-6">
        <div className="mb-6">
          <span className="text-sm font-semibold uppercase tracking-widest" style={{ color: ACCENT }}>Business Model</span>
          <h2 className="text-xl md:text-3xl font-heading font-bold text-[#0a0f1e] mt-2">
            Performance-Based. <span style={{ color: ACCENT }}>Zero Upfront Cost.</span>
          </h2>
          <p className="text-slate-500 mt-1">Revenue is created only when a qualifying transaction is validated through the Enterprise POS of the Retailer.</p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <div className="bg-slate-800 text-white rounded-2xl p-4 sm:p-6 mb-4">
              <h3 className="font-bold text-white text-lg mb-3 sm:mb-4">The DutyCredit Tier Structure</h3>
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 text-xs text-slate-500 mb-1 px-2">
                <span>Tier</span><span>Basket</span><span>Discount</span><span className="sm:text-right">Traveller Saves</span>
              </div>
              <div className="space-y-1">
                {[
                  { tier: "Entry", range: "$23–$56", disc: "5%–7.5%", save: "$1.14–$3.64" },
                  { tier: "Boarding", range: "$57–$113", disc: "7.5%–10%", save: "$4.28–$10.73" },
                  { tier: "Standard", range: "$114–$170", disc: "10%–12.5%", save: "$11.40–$20.81" },
                  { tier: "Plus", range: "$171–$227", disc: "12.5%–15%", save: "$21.38–$33.11" },
                  { tier: "Lounge", range: "$228–$284", disc: "15%–17.5%", save: "$34.20–$48.74" },
                  { tier: "Premium", range: "$285–$341", disc: "17.5%–20%", save: "$49.88–$64.98" },
                  { tier: "VIP", range: "$342+", disc: "20% capped", save: "Up to $68" },
                ].map((row, i) => (
                  <div key={i} className={`grid grid-cols-2 sm:grid-cols-4 gap-x-2 gap-y-0.5 py-1.5 px-2 rounded-lg text-xs ${i === 2 ? "bg-purple-800/60" : "hover:bg-white/5"}`}>
                    <span className="text-purple-300 font-semibold">{row.tier}</span>
                    <span className="text-slate-300">{row.range}</span>
                    <span className="text-yellow-300">{row.disc}</span>
                    <span className="text-green-300 font-semibold sm:text-right">{row.save}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
          <div className="flex flex-col gap-4">
            <div className="bg-purple-50 border border-purple-200 rounded-2xl p-5">
              <h3 className="font-bold text-purple-900 mb-3">The 2.5% Platform Fee — Your Only Cost</h3>
              <p className="text-slate-600 text-sm leading-relaxed mb-3">
                A single fee on DutyBoost-validated transactions only — never on your existing sales.
              </p>
              <div className="space-y-2 text-sm">
                {[
                  "Funds POS, Travel, Corporate Partner commission & platform infrastructure",
                  "Applied only when a DutyCredit redemption is validated through your POS",
                  "No impact on your shelf prices or non-DutyBoost sales",
                  "Settled transparently — attributed and reported per transaction",
                ].map((item, i) => (
                  <div key={i} className="flex items-start gap-2">
                    <CheckCircle className="w-4 h-4 flex-shrink-0 mt-0.5" style={{ color: ACCENT }} />
                    <span className="text-slate-700">{item}</span>
                  </div>
                ))}
              </div>
            </div>
            <div className="bg-green-50 border border-green-200 rounded-2xl p-4 sm:p-5">
              <h3 className="font-bold text-green-900 mb-3">The Retailer Economics</h3>
              <div className="space-y-2.5 text-sm">
                {[
                  { metric: "Retailer keeps", val: "87.5% of every qualifying sale" },
                  { metric: "Upfront cost", val: "$0 — no setup, subscription or integration fees" },
                  { metric: "Customer acquisition", val: "Handled by Travel & Corporate Partners before arrival" },
                  { metric: "Marketing spend", val: "Not required — travellers arrive pre-activated" },
                  { metric: "Pricing impact", val: "None — your shelf prices stay unchanged" },
                  { metric: "Payment terms", val: "Performance-based — only on validated transactions" },
                ].map((row) => (
                  <div key={row.metric} className="flex items-start gap-2">
                    <CheckCircle className="w-4 h-4 text-green-600 flex-shrink-0 mt-0.5" />
                    <div>
                      <span className="text-slate-700 font-semibold">{row.metric}: </span>
                      <span className="text-slate-600">{row.val}</span>
                    </div>
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

// SLIDE 8: Transaction Mix — Why the Tiers Work
function SlideTierMix() {
  return (
    <TierMixSlide
      currency="$"
      rate={EUR_USD_RATE}
      dense
      purchaseNote="27% Caribbean purchase rate (≈51% global average) — the conversion headroom the programme targets"
    />
  );
}

// SLIDE 9: Transaction Economics
function SlideTransaction() {
  return (
    <SlideWrapper>
      <div className="flex-1 flex flex-col justify-center px-5 py-6 md:px-12 md:py-6 relative">
        <GridBg />
        <div className="relative z-10">
          <div className="mb-6">
            <span className="text-sm font-semibold uppercase tracking-widest" style={{ color: ACCENT }}>One Transaction — Three Beneficiaries</span>
            <h2 className="text-xl md:text-3xl font-heading font-bold text-[#0a0f1e] mt-2">
              $114 Qualifying Retail Value Example
            </h2>
          </div>
          <div className="grid grid-cols-3 gap-3 mb-6">
            {[
              { party: "Traveller", Icon: TravelerIcon, value: "$11.40", sub: "DutyCredit saving (10%)", bg: "bg-green-50", border: "border-green-200", text: "text-green-600" },
              { party: "Airport Retailer", Icon: AirportRetailerIcon, value: "$99.75", sub: "Net before normal costs (87.5%)", bg: "bg-purple-50", border: "border-purple-200", text: "text-purple-600" },
              { party: "DutyBoost", Icon: BarChart3, value: "$2.85", sub: "Platform fee (2.5%)", bg: "bg-orange-50", border: "border-orange-200", text: "text-orange-600" },
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
              <div className="text-slate-500 text-xs uppercase tracking-wide mb-2">Total = $114.00</div>
              <div className="flex h-6 rounded-full overflow-hidden gap-px">
                <div className="bg-green-500" style={{ width: "10%" }} />
                <div className="bg-purple-500" style={{ width: "87.5%" }} />
                <div className="bg-orange-500" style={{ width: "2.5%" }} />
              </div>
              <div className="flex gap-3 mt-2 text-xs flex-wrap">
                {[
                  { color: "bg-green-500", label: "Traveller 10%" },
                  { color: "bg-purple-500", label: "Retailer 87.5%" },
                  { color: "bg-orange-500", label: "DutyBoost 2.5%" },
                ].map((l) => (
                  <div key={l.label} className="flex items-center gap-1.5">
                    <div className={`w-3 h-3 rounded-sm ${l.color}`} />
                    <span className="text-slate-600">{l.label}</span>
                  </div>
                ))}
              </div>
            </div>
            <div className="rounded-2xl p-5 text-white" style={{ background: "linear-gradient(135deg, #952d8b 0%, #6b1f66 100%)" }}>
              <h3 className="font-bold mb-3">Integrate Once. Deploy Repeatedly.</h3>
              <p className="text-purple-50 text-sm leading-relaxed">
                A single Enterprise POS integration can enable DutyBoost across multiple retailers, stores, airports and geographic markets — creating fundamentally better scaling economics than building individual integrations per retailer.
              </p>
              <div className="mt-3 text-purple-100 font-semibold text-sm">
                Technology strategy: INTEGRATE ONCE. DEPLOY REPEATEDLY.
              </div>
            </div>
          </div>
        </div>
      </div>
    </SlideWrapper>
  );
}

// SLIDE 11: POS Integration
function SlideIntegrate() {
  return (
    <SlideWrapper>
      <div className="flex-1 flex flex-col justify-center px-5 py-6 md:px-12 md:py-6 relative">
        <GridBg />
        <div className="relative z-10">
          <div className="mb-5 lg:mb-10">
            <span className="text-sm font-semibold uppercase tracking-widest" style={{ color: ACCENT }}>Technology Strategy</span>
            <h2 className="text-xl md:text-3xl lg:text-4xl font-heading font-bold text-[#0a0f1e] mt-2">
              A POS Provider Feature.<br /><span style={{ color: ACCENT }}>Activate, Not Implement.</span>
            </h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 lg:gap-8 items-center">
            <div className="bg-slate-50 border border-slate-200 rounded-2xl p-5 lg:p-7">
              <h3 className="text-[#0a0f1e] font-bold lg:text-lg mb-4">DutyBoost Appears in Your POS Dashboard</h3>
              <div className="space-y-3">
                {[
                  "DutyBoost appears as a new feature in your existing POS dashboard",
                  "You flip the switch — no separate integration required from the retailer",
                  "No replacement of ERP, payment or inventory systems",
                  "Once switched on, all connected stores can redeem DutyCredits",
                  "Works across all stores, airports and markets on the same POS",
                  "Switch it off anytime — no lock-in, no commitments",
                ].map((text, i) => (
                  <div key={i} className="flex items-start gap-3">
                    <CheckCircle className="w-4 h-4 text-green-600 flex-shrink-0 mt-0.5" />
                    <span className="text-slate-600 text-sm">{text}</span>
                  </div>
                ))}
              </div>
            </div>
            <div className="rounded-2xl p-5 lg:p-7" style={{ background: "linear-gradient(135deg, #952d8b 0%, #6b1f66 100%)" }}>
              <h3 className="text-white font-bold text-xl lg:text-2xl mb-2">ACTIVATED THROUGH YOUR POS</h3>
              <p className="text-purple-50 text-sm lg:text-base leading-relaxed mb-3 lg:mb-5">
                DutyBoost is enabled by your POS provider as an activation feature — the same system Caribbean Airlines Duty Free already uses for checkout at Piarco and at Tobago. No separate integration required from the retailer.
              </p>
              <div className="grid grid-cols-3 gap-3 text-center">
                {[
                  { val: "1 POS", label: "activation" },
                  { val: "Multiple", label: "retailers" },
                  { val: "Global", label: "deployment" },
                ].map((s) => (
                  <div key={s.label} className="bg-white/10 rounded-xl p-3">
                    <div className="text-purple-100 font-bold">{s.val}</div>
                    <div className="text-purple-50/70 text-xs mt-1">{s.label}</div>
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

// SLIDE 12: Growth Flywheel
function SlideFlywheel() {
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
            <span className="text-sm font-semibold uppercase tracking-widest" style={{ color: ACCENT }}>The Growth Flywheel</span>
            <h2 className="text-xl md:text-3xl font-heading font-bold text-[#0a0f1e] mt-2">
              A Self-Reinforcing <span style={{ color: ACCENT }}>Circular Ecosystem</span>
            </h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8 items-center">
            <div className="relative flex items-center justify-center" style={{ height: "340px" }}>
              <div className="absolute inset-0 rounded-full border-2 border-purple-200" />
              <div className="border-2 border-purple-700 rounded-full w-28 h-28 flex flex-col items-center justify-center text-center z-10" style={{ background: ACCENT }}>
                <div className="text-white text-xs font-bold leading-tight px-2">Circular Revenue Infrastructure</div>
              </div>
              {steps.slice(0, 11).map((step, i) => {
                const angle = (i / 11) * 360 - 90;
                const rad = (angle * Math.PI) / 180;
                const r = 145;
                const x = 50 + (r / 3.4) * Math.cos(rad);
                const y = 50 + (r / 3.4) * Math.sin(rad);
                return (
                  <div key={i} className="absolute bg-purple-50 border border-purple-200 rounded-lg px-2 py-1 text-center"
                    style={{ left: `${x}%`, top: `${y}%`, transform: "translate(-50%, -50%)", maxWidth: "90px" }}>
                    <div className="text-purple-700 text-xs font-semibold leading-tight">{step}</div>
                  </div>
                );
              })}
              <div className="absolute inset-0 rounded-full border-2 border-dashed border-purple-300 animate-spin" style={{ animationDuration: "30s" }} />
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
                      <row.Icon className="w-4 h-4 mt-0.5 flex-shrink-0" style={{ color: ACCENT }} />
                      <div>
                        <span className="text-purple-700 font-semibold">{row.party} </span>
                        <span className="text-slate-600">{row.effect}</span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
              <div className="rounded-2xl p-5 text-white" style={{ background: "linear-gradient(135deg, #952d8b 0%, #6b1f66 100%)" }}>
                <p className="font-bold text-lg leading-snug">
                  "A positive flywheel that creates growth for every stakeholder."
                </p>
                <p className="text-purple-100 text-sm mt-2">Each new partner makes the platform more valuable for every existing partner.</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </SlideWrapper>
  );
}

// SLIDE 13: Get Started
function SlideGetStarted() {
  const cards = [
    { title: "A New Feature in Your POS", desc: "DutyBoost appears as a toggle in your existing POS dashboard. No development, no integration, no project plan." },
    { title: "Earning From Day One", desc: "Once switched on, pre-activated travellers can redeem DutyCredits at your store immediately." },
    { title: "Switch Off Anytime", desc: "Don't like the results? Flip it off. No lock-in, no cancellation fees, no commitments." },
    { title: "Zero Operational Change", desc: "No new hardware, no new software, no staff training. Your checkout flow stays the same." },
  ];

  return (
    <SlideWrapper>
      <div className="flex-1 flex flex-col justify-center px-5 py-5 md:px-12 md:py-5 relative">
        <GridBg />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] rounded-full opacity-10"
          style={{ background: "radial-gradient(circle, #952d8b 0%, transparent 70%)" }} />
        <div className="relative z-10 text-center">
          <div className="flex justify-center mb-3">
            <div className="bg-white rounded-2xl px-6 py-2 shadow-xl border border-slate-200">
              <DutyBoostLogo height={42} linkTo="/retailer-showcase" />
            </div>
          </div>
          <div className="mb-3">
            <span className="text-xs font-semibold uppercase tracking-widest" style={{ color: ACCENT }}>Value Realized Quickly</span>
            <h2 className="text-xl md:text-3xl font-heading font-bold text-[#0a0f1e] mt-1.5 leading-tight">
              Switch It On.<br />
              <span style={{ color: ACCENT }}>Start Earning. Switch Off Anytime.</span>
            </h2>
          </div>
          <p className="text-slate-600 text-base max-w-3xl mx-auto leading-relaxed mb-4">
            DutyBoost appears as a new feature in your existing POS dashboard — not a project to implement. No integration, no rollout, no operational change. You flip the switch and incremental revenue starts flowing at both Piarco and Tobago.
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 max-w-5xl mx-auto mb-4">
            {cards.map((card) => (
              <div key={card.title} className="bg-slate-50 border border-slate-200 rounded-2xl p-4 text-left">
                <div className="text-purple-700 font-bold text-sm mb-1">{card.title}</div>
                <div className="text-slate-600 text-xs leading-snug">{card.desc}</div>
              </div>
            ))}
          </div>
          <div className="flex flex-col items-center gap-1.5">
            <p className="text-base md:text-lg font-bold" style={{ color: ACCENT }}>
              No setup fee. No subscription. No implementation. Flip the switch — earn. Flip it off — stop.
            </p>
            <p className="text-slate-700 text-sm md:text-base font-semibold">
              Always performance-based — you pay only the 2.5% platform fee on validated sales.
            </p>
          </div>
        </div>
      </div>
    </SlideWrapper>
  );
}

// SLIDE 14: Thank You
function SlideThankYou() {
  const cards = [
    { Icon: Store, title: "Activate in Your POS", desc: "Flip the DutyBoost switch in your existing POS dashboard — no integration required." },
    { Icon: CheckCircle, title: "Earn From Day One", desc: "Pre-activated travellers redeem DutyCredits at your store immediately." },
    { Icon: ArrowRight, title: "Switch Off Anytime", desc: "No lock-in, no commitments — you stay in control, always." },
  ];

  return (
    <SlideWrapper>
      <div className="flex-1 flex flex-col justify-center px-5 py-4 md:px-12 md:py-4 relative">
        <GridBg />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] rounded-full opacity-10"
          style={{ background: "radial-gradient(circle, #952d8b 0%, transparent 70%)" }} />
        <div className="relative z-10 flex flex-col items-center text-center">
          <div className="bg-white rounded-2xl px-5 py-2 shadow-2xl border border-slate-200 mb-3">
            <DutyBoostLogo height={38} linkTo="/retailer-showcase" />
          </div>

          <CalBanner subtitle="Caribbean Airlines Duty Free — Piarco International Airport & A.N.R. Robinson International Airport, Tobago" className="max-w-4xl mb-3" />

          <div className="mb-2.5">
            <span className="text-xs font-semibold uppercase tracking-widest" style={{ color: ACCENT }}>Thank You</span>
            <h2 className="text-xl md:text-2xl font-heading font-bold text-[#0a0f1e] mt-1 leading-tight">
              Join DutyBoost.{" "}
              <span style={{ color: ACCENT }}>Start Earning Incremental Revenue.</span>
            </h2>
          </div>
          <p className="text-slate-600 text-sm max-w-3xl leading-snug mb-3">
            DutyBoost connects what already exists — Caribbean Airlines Duty Free at Piarco and Tobago, your POS, and {NON_PURCHASING_MOVEMENTS} passenger movements a year across the two airports whose travellers currently walk straight to the gate. With zero upfront cost and a single POS activation, you can start capturing revenue from non-purchasing travellers today.
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-2.5 max-w-3xl w-full mb-3">
            {cards.map((card) => (
              <div key={card.title} className="bg-slate-50 border border-slate-200 rounded-2xl p-3 text-left">
                <card.Icon className="w-6 h-6 mb-1" style={{ color: ACCENT }} />
                <div className="text-purple-700 font-bold text-sm mb-0.5">{card.title}</div>
                <div className="text-slate-600 text-xs leading-snug">{card.desc}</div>
              </div>
            ))}
          </div>
          <div className="rounded-2xl px-5 py-3 text-white max-w-2xl" style={{ background: "linear-gradient(135deg, #952d8b 0%, #6b1f66 100%)" }}>
            <p className="font-bold text-sm md:text-base leading-snug mb-0.5">
              Ready to turn {NON_PURCHASING_MOVEMENTS} non-purchasing passenger movements into incremental sales?
            </p>
            <p className="text-purple-50 text-xs">
              Performance-based. Zero upfront cost. You pay only the 2.5% platform fee on validated sales.
            </p>
          </div>
          <div className="mt-3 text-slate-500 text-[10px]">
            CONFIDENTIAL — 2026 | Chamber of Commerce: 42053181 | VAT: NL869492068B01
          </div>
        </div>
      </div>
    </SlideWrapper>
  );
}

const SlideSolutionUsd = () => <SlideSolution currency="$" />;

const SLIDE_COMPONENTS = {
  cover: SlideCover,
  team: SlideTeam,
  problem: SlideProblem,
  solution: SlideSolutionUsd,
  market: SlideMarket,
  conversion: SlideConversion,
  acquisition: SlideAcquisitionTrinidad,
  model: SlideModel,
  tierMix: SlideTierMix,
  transaction: SlideTransaction,
  integrate: SlideIntegrate,
  flywheel: SlideFlywheel,
  getStarted: SlideGetStarted,
  thankYou: SlideThankYou,
};

export default function RetailerPitchDeckTrinidad() {
  const [current, setCurrent] = useState(0);
  const slideAreaRef = useRef(null);

  const prev = () => setCurrent((c) => Math.max(0, c - 1));
  const next = () => setCurrent((c) => Math.min(SLIDES.length - 1, c + 1));

  useEffect(() => {
    if (slideAreaRef.current) {
      slideAreaRef.current.scrollIntoView({ block: "start", behavior: "auto" });
    } else {
      window.scrollTo({ top: 0, behavior: "auto" });
    }
  }, [current]);

  const slide = SLIDES[current];
  const SlideComp = SLIDE_COMPONENTS[slide.type];

  return (
    <div className="min-h-screen bg-[#0f0710] flex flex-col items-center justify-start lg:justify-center p-2 py-1.5 overflow-x-hidden">
      <div className="w-full max-w-[1400px] flex items-center justify-between mb-1.5">
        <div className="text-white text-sm font-semibold opacity-60">
          DutyBoost — Trinidad &amp; Tobago Airport Retailer Presentation 2026 <span className="text-xs opacity-50 ml-2 hidden sm:inline">CONFIDENTIAL</span>
        </div>
        <div className="text-slate-400 text-sm">{current + 1} / {SLIDES.length}</div>
      </div>

      <div ref={slideAreaRef} className="w-full max-w-[1400px] flex rounded-2xl overflow-hidden shadow-2xl border border-white/10 min-h-[60vh] lg:h-[calc(100vh-128px)]">
        <SlideComp />
      </div>

      <div className="w-full max-w-[1400px] flex flex-wrap items-center justify-between gap-2 mt-2">
        <button onClick={prev} disabled={current === 0}
          className="flex items-center gap-2 px-5 py-2.5 rounded-xl bg-white/10 text-white hover:bg-white/20 disabled:opacity-30 disabled:cursor-not-allowed transition-colors text-sm font-semibold cursor-pointer select-none">
          <ChevronLeft size={18} /> Previous
        </button>
        <div className="flex gap-1.5 flex-wrap justify-center max-w-lg">
          {SLIDES.map((s, i) => (
            <button key={s.id} onClick={() => setCurrent(i)} title={SLIDE_LABELS[s.type]}
              className={`text-xs px-3 py-1 rounded-lg transition-all font-medium ${i === current ? "text-white" : "bg-white/10 text-slate-400 hover:bg-white/20 hover:text-white"}`}
              style={i === current ? { background: ACCENT } : undefined}>
              {i + 1}
            </button>
          ))}
        </div>
        <button onClick={next} disabled={current === SLIDES.length - 1}
          className="flex items-center gap-2 px-5 py-2.5 rounded-xl text-white disabled:opacity-30 disabled:cursor-not-allowed transition-colors text-sm font-semibold cursor-pointer select-none"
          style={{ background: ACCENT }}>
          Next <ChevronRight size={18} />
        </button>
      </div>
      <div className="mt-1 text-slate-500 text-xs">{SLIDE_LABELS[slide.type]}</div>
    </div>
  );
}