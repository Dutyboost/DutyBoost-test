import { useState, useEffect, useRef, Fragment } from "react";
import { Link } from "react-router-dom";
import { ChevronLeft, ChevronRight, ArrowRight, Cpu, BarChart3, Link2, Briefcase, Store, CheckCircle, Plane, Package } from "lucide-react";
import DutyBoostLogo from "@/components/DutyBoostLogo";
import PositioningLine from "@/components/shared/PositioningLine";
import { SlideSolution } from "@/components/shared/SlideSolution";
import { SlideTierMix as TierMixSlide } from "@/components/shared/SlideTierMix";
import SlideTransactionEntryTier from "@/components/shared/SlideTransactionEntryTier";
import { EUR_USD_RATE } from "@/lib/eurUsd";
import SlideAcquisitionCost from "@/components/retailer-pitch-caribbean/SlideAcquisitionCost";
import HotelIcon from "@/components/HotelIcon";
import CarRentalIcon from "@/components/CarRentalIcon";
import AirportRetailerIcon from "@/components/AirportRetailerIcon";
import TravelerIcon from "@/components/TravelerIcon";
import TravelAgencyIcon from "@/components/TravelAgencyIcon";

const CMI_LINK = "https://www.coherentmarketinsights.com/market-insight/caribbean-duty-free-retailing-market-4934";
const SXM_LINK = "https://www.sintmaartengov.org/news/pages/Passenger-Arrivals-and-Cruise-Arrivals-Show-Growth-in-2025.aspx";
const M1NDSET_LINK = "https://www.gtrmag.com/blog/gtr-magazine-looks-at-the-state-of-travel-and-tourism-in-the-caribbean";
const CTO_LINK = "https://www.onecaribbean.org/caribbean-tourism-shows-resilient-growth-amid-global-headwinds-in-2025/";
const AVOLTA_LINK = "https://www.avoltaworld.com/sites/default/files/document/2026-05/Avolta_Q1%202026%20Presentation.pdf?utm_source=chatgpt.com";
const ACI_LINK = "https://aci.aero/2026/07/15/worlds-busiest-airports-atlanta-holds-asia-climbs-strong-demand-while-asia-pacific-growth-reshape-the-rankings/?utm_source=chatgpt.com";
const ETRC_LINK = "https://etrc.org/publications/";
const KEARNEY_LINK = "https://www.kearney.com/about/kearney-in-the-media/press/travel-retails-future-flight-path-turning-heightened-volatility-into-tomorrows-market-edge";
const ACI_RETAIL_LINK = "https://www.aci-asiapac.aero/media-centre/news/airport-travel-retail-witnesses-a-fundamental-shift-as-younger-travelers-emerge-as-the-new-big-spenders";
const MARKETUS_LINK = "https://market.us/report/global-travel-retail-market/";

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
  market: "Sint Maarten Market",
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
      backgroundImage: "linear-gradient(rgba(59,130,246,0.4) 1px, transparent 1px), linear-gradient(90deg, rgba(59,130,246,0.4) 1px, transparent 1px)",
      backgroundSize: "40px 40px"
    }} />
  );
}

// SLIDE 1: Cover
function SlideCover() {
  return (
    <SlideWrapper>
      <div className="flex-1 flex flex-col items-center justify-center px-6 md:px-16 text-center relative">
        <GridBg />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] rounded-full opacity-10"
          style={{ background: "radial-gradient(circle, #3b82f6 0%, transparent 70%)" }} />
        <div className="relative z-10 flex flex-col items-center gap-8">
          <div className="bg-white rounded-2xl px-8 py-4 shadow-2xl border border-slate-200">
            <DutyBoostLogo height={50} linkTo="/retailer-showcase" />
          </div>
          <div>
            <PositioningLine className="mb-3" />
            <h1 className="text-3xl md:text-5xl font-heading font-bold text-[#0a0f1e] leading-tight mb-4">
              Incremental Revenue From Travellers<br />
              <span className="text-blue-600">Who Otherwise Wouldn't Buy</span>
            </h1>
            <p className="text-xl text-slate-500 max-w-3xl leading-relaxed">
              A Presentation for Sint Maarten Airport Retailers — Princess Juliana International Airport (SXM)
            </p>
          </div>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 sm:gap-6 mt-4 w-full">
            {[
              { label: "Air Passenger Arrivals a Year", value: "855,994" },
              { label: "Airports Served", value: "1" },
              { label: "Non-Purchase", value: "73%" },
              { label: "Upfront Cost", value: "$0" },
            ].map((s) => (
              <div key={s.label} className="text-center">
                <div className="text-xl sm:text-3xl font-bold text-blue-600">{s.value}</div>
                <div className="text-xs sm:text-sm text-slate-500 mt-1">{s.label}</div>
              </div>
            ))}
          </div>
          <div className="mt-2 text-xs text-slate-500 border border-slate-300 rounded px-4 py-2">
            CONFIDENTIAL — 2026 | Chamber of Commerce: 42053181 | VAT: NL869492068B01
          </div>
        </div>
      </div>
    </SlideWrapper>
  );
}

// SLIDE 2: Team
function SlideTeam() {
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
            <span className="text-blue-600 text-sm font-semibold uppercase tracking-widest">Our Team</span>
            <h2 className="text-xl md:text-3xl font-heading font-bold text-[#0a0f1e] mt-2">
              The People Behind <span className="text-blue-600">DutyBoost</span>
            </h2>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6 max-w-5xl mx-auto">
            {members.map((m) => (
              <div key={m.name} className="bg-white border border-slate-200 rounded-2xl p-4 md:p-5 text-center flex flex-col items-center shadow-sm">
                <div className="w-24 h-24 md:w-28 md:h-28 rounded-full overflow-hidden border-4 border-blue-100 mb-3 flex-shrink-0">
                  <img src={m.photo} alt={m.name} className="w-full h-full object-cover" loading="lazy" />
                </div>
                <a href={m.linkedin} target="_blank" rel="noopener noreferrer"
                  className="text-slate-800 font-semibold text-sm md:text-base hover:text-blue-600 hover:underline transition-colors leading-tight">
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
            <span className="text-blue-600 text-sm font-semibold uppercase tracking-widest">The Facts</span>
            <h2 className="text-xl md:text-3xl font-heading font-bold text-[#0a0f1e] mt-2">
              73% of Airport Passengers<br /><span className="text-blue-600">Never Make a Purchase</span>
            </h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8">
            <div className="space-y-5">
              <div className="bg-slate-50 border border-slate-200 rounded-2xl p-6">
                <div className="text-3xl md:text-5xl font-bold text-blue-600 mb-2">35M</div>
                <div className="text-slate-800 font-semibold">Caribbean stayover arrivals in 2025</div>
                <div className="text-slate-500 text-sm mt-1">+2.5% vs 2024 | +16.7% vs 2019{" "}
                  <a href={CTO_LINK} target="_blank" rel="noopener noreferrer"
                    className="text-blue-600 font-bold underline decoration-blue-600/50 hover:decoration-blue-400 hover:text-blue-500 transition-colors">(CTO)</a>
                </div>
              </div>
              <div className="bg-slate-50 border border-slate-200 rounded-2xl p-6">
                <div className="text-3xl md:text-5xl font-bold text-blue-600 mb-2">855,994</div>
                <div className="text-slate-800 font-semibold">Sint Maarten air passenger arrivals in 2025</div>
                <div className="text-slate-500 text-sm mt-1">53.9% from the USA | 25.8% from the EU — share of all air passengers{" "}
                  <a href={SXM_LINK} target="_blank" rel="noopener noreferrer"
                    className="text-blue-600 font-bold underline decoration-blue-600/50 hover:decoration-blue-400 hover:text-blue-500 transition-colors">(SXM Gov)</a>
                </div>
              </div>
              <div className="bg-red-50 border border-red-200 rounded-2xl p-6">
                <div className="text-3xl md:text-5xl font-bold text-red-600 mb-2">73%</div>
                <a href={M1NDSET_LINK} target="_blank" rel="noopener noreferrer"
                  className="text-blue-600 font-semibold underline decoration-blue-600/50 hover:decoration-blue-400 hover:text-blue-500 transition-colors">
                  Caribbean non-purchase rate (m1nd-set)
                </a>
                <div className="text-slate-500 text-sm mt-1">27% purchase rate | 73% non-purchase across Caribbean</div>
              </div>
            </div>
            <div className="flex flex-col gap-4 justify-center">
              <div className="bg-slate-50 border border-slate-200 rounded-2xl p-6">
                <h3 className="text-slate-800 font-semibold text-lg mb-4">Traditional Airport Retail Challenges</h3>
                <ul className="space-y-3">
                  {[
                    "Activation starts only after the traveller clears security",
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
              <div className="bg-blue-50 border border-blue-200 rounded-2xl p-5">
                <p className="text-blue-700 text-sm leading-relaxed italic">
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

// SLIDE 4: Solution — imported from @/components/shared/SlideSolution

// SLIDE 5: Sint Maarten Market
function SlideMarket() {
  return (
    <SlideWrapper>
      <div className="flex-1 flex flex-col justify-center px-5 py-6 md:px-12 md:py-6">
        <div className="mb-5">
          <span className="text-sm font-semibold uppercase tracking-widest text-blue-600">Sint Maarten Market Opportunity</span>
          <h2 className="text-xl md:text-3xl font-heading font-bold text-[#0a0f1e] mt-2">
            856K Air Arrivals. 1 Airport. <span className="text-blue-600">$67M Local Market of $2.72B Regional</span>
          </h2>
          <p className="text-slate-500 mt-2">DutyBoost doesn't need to create the market. It connects what already exists.</p>
        </div>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3 md:gap-4 mb-2">
          {[
            { label: "Air Passenger Arrivals a Year", value: "855,994", sub: "Princess Juliana International Airport (SXM), 2025", color: "#2563eb", link: SXM_LINK },
            { label: "Airports Served", value: "1", sub: "Princess Juliana International Airport, Sint Maarten", color: "#3b82f6", link: SXM_LINK },
            { label: "Caribbean DF&TR Market", value: "$2.72B", sub: "21.7% CAGR 2026-2033 (CMI)", color: "#4f46e5", link: CMI_LINK },
            { label: "Sint Maarten DF&TR Share", value: "$67M", sub: "2.45% of Caribbean market (est.)", color: "#16a34a", link: CMI_LINK },
          ].map((m) => (
            <div key={m.label} className="bg-slate-50 border border-slate-200 rounded-2xl p-4 md:p-6 text-center">
              <div className="text-xl md:text-3xl font-bold mb-2" style={{ color: m.color }}>{m.value}</div>
              <div className="font-semibold text-slate-700 mb-1 text-xs md:text-sm">{m.label}</div>
              <div className="text-slate-500 text-xs">
                <a href={m.link} target="_blank" rel="noopener noreferrer"
                  className="text-blue-600 font-semibold underline decoration-blue-600/50 hover:decoration-blue-400 hover:text-blue-500 transition-colors">
                  {m.sub}
                </a>
              </div>
            </div>
          ))}
        </div>
        <p className="text-slate-400 text-[11px] mb-5 leading-snug">
          Sint Maarten category values estimated from CMI Caribbean market data, proportional to Sint Maarten's air arrival share of the Caribbean market (855,994 / 35M ≈ 2.45% of $2.72B ≈ $67M total) —{" "}
          <a href={SXM_LINK} target="_blank" rel="noopener noreferrer" className="text-blue-600 font-semibold underline decoration-blue-600/50 hover:decoration-blue-400 hover:text-blue-500 transition-colors">SXM Gov</a>
          {" "}|{" "}
          <a href={CMI_LINK} target="_blank" rel="noopener noreferrer" className="text-blue-600 font-semibold underline decoration-blue-600/50 hover:decoration-blue-400 hover:text-blue-500 transition-colors">CMI</a>
        </p>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          <div className="bg-slate-50 border border-slate-200 rounded-2xl p-6">
            <h3 className="font-bold text-slate-700 mb-1">Sint Maarten DF&TR — Category Assortment Revenue</h3>
            <p className="text-slate-500 text-xs mb-4">Princess Juliana International Airport (SXM) — the categories carried at the airport, applied to the $67M Sint Maarten DF&TR market.</p>
            <div className="space-y-3">
              {[
                { cat: "Fragrances & Cosmetics", value: "$23M", share: "34%", pct: 100, note: "Skincare, fragrance and cosmetics" },
                { cat: "Wines & Spirits", value: "$15M", share: "22%", pct: 65, note: "Premium spirits and liqueurs" },
                { cat: "Fashion & Accessories", value: "$11M", share: "16%", pct: 48, note: "Fashion, watches and accessories" },
                { cat: "Tobacco", value: "$7M", share: "10%", pct: 30, note: "Tobacco and confectionery" },
              ].map((row) => (
                <div key={row.cat}>
                  <div className="flex items-center justify-between mb-1">
                    <div className="text-slate-700 text-sm font-semibold">{row.cat}</div>
                    <div className="text-slate-700 text-sm font-semibold">
                      {row.value} <span className="text-slate-400 font-normal">({row.share})</span>
                    </div>
                  </div>
                  <div className="w-full bg-slate-200 rounded-full h-2">
                    <div className="h-2 rounded-full bg-blue-600" style={{ width: `${row.pct}%` }} />
                  </div>
                  <div className="text-slate-500 text-xs mt-1">{row.note}</div>
                </div>
              ))}
            </div>
            <div className="text-slate-400 text-xs mt-3">
              Category split estimated from CMI Caribbean category shares applied to the Sint Maarten market of $67M. Balance is other categories outside this assortment.
            </div>
          </div>
          <div className="bg-amber-50 border border-amber-200 rounded-2xl p-6">
            <h3 className="font-bold text-slate-700 mb-3">DutyBoost doesn't need to create:</h3>
            <div className="space-y-2">
              {[
                "Princess Juliana International Airport — it already operates",
                "Passenger traffic — 855,994 air arrivals in 2025",
                "Airport Retailers — they already operate stores",
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
      <div className="flex-1 flex flex-col justify-center px-12 py-6">
        <div className="mb-6">
          <span className="text-blue-600 text-sm font-semibold uppercase tracking-widest">Conversion Opportunity</span>
          <h2 className="text-xl md:text-3xl font-heading font-bold text-[#0a0f1e] mt-2">
            Small Conversion Gains = <span className="text-blue-600">Enormous Value at Scale</span>
          </h2>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-5">
          <div>
            <div className="bg-red-50 border border-red-200 rounded-2xl p-5 mb-4">
              <div className="flex items-center gap-4">
                <div>
                  <div className="text-3xl md:text-5xl font-bold text-red-600">73%</div>
                  <div className="text-slate-600 font-semibold text-sm mt-1">Non-purchase rate (m1nd-set Caribbean)</div>
                  <div className="text-slate-400 text-xs mt-1">= 625K unreached Sint Maarten travellers</div>
                </div>
                <div className="flex-1 text-right">
                  <div className="text-3xl md:text-5xl font-bold text-green-600">27%</div>
                  <div className="text-slate-600 font-semibold text-sm mt-1">Currently converting</div>
                </div>
              </div>
              <div className="mt-3 pt-3 border-t border-red-200/60">
                <a href={M1NDSET_LINK} target="_blank" rel="noopener noreferrer"
                  className="text-blue-600 font-semibold underline decoration-blue-600/50 hover:decoration-blue-400 hover:text-blue-500 transition-colors">
                  m1nd-set Caribbean purchase rate benchmark
                </a>
              </div>
            </div>
            <div className="bg-blue-50 border border-blue-200 rounded-2xl p-4 sm:p-5">
              <h3 className="font-bold text-blue-800 mb-3">Non-Purchasing Traveller Incremental Potential (625K):</h3>
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 text-xs text-slate-400 mb-1 px-2">
                <span>Conversion</span><span>Transactions</span><span>Retail Value</span><span className="sm:text-right">Retailer Net</span>
              </div>
              <div className="space-y-1.5">
                {[
                  { conv: "+0.01 pp", txns: "63", retail: "$1.4K", ret: "$1.3K" },
                  { conv: "+0.1 pp", txns: "625", retail: "$14.4K", ret: "$13.3K" },
                  { conv: "+0.5 pp", txns: "3.1K", retail: "$71.9K", ret: "$66.5K" },
                  { conv: "+1 pp", txns: "6.3K", retail: "$144K", ret: "$133K" },
                  { conv: "+2 pp", txns: "12.5K", retail: "$288K", ret: "$266K" },
                  { conv: "+5 pp", txns: "31.3K", retail: "$719K", ret: "$665K" },
                ].map((row, i) => (
                  <div key={i} className={`grid grid-cols-2 sm:grid-cols-4 gap-x-2 gap-y-0.5 text-sm py-1.5 px-2 rounded-lg ${i === 3 ? "bg-blue-200/50 font-semibold" : ""}`}>
                    <span className="text-blue-700">{row.conv}</span>
                    <span className="text-slate-600">{row.txns} txns</span>
                    <span className="text-slate-600">{row.retail}</span>
                    <span className="text-green-700 font-semibold sm:text-right">{row.ret}</span>
                  </div>
                ))}
              </div>
              <p className="text-slate-400 text-[10px] mt-2 leading-snug">Based on Sint Maarten's 625K non-purchasing air arrivals, 73% non-purchase, the $23 Entry-tier minimum basket used as the example, and the retailer's 92.5% net share (5% traveller discount at the Entry tier).</p>
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
                    <ArrowRight size={16} className="text-blue-400 flex-shrink-0 self-center" />
                    <span className="text-green-300 bg-green-900/30 rounded-lg px-3 py-2.5 text-center flex items-center justify-center leading-snug">{row.to}</span>
                  </div>
                ))}
              </div>
            </div>
            <div className="bg-gradient-to-br from-blue-600 to-indigo-700 rounded-2xl p-5 text-white">
              <div className="text-sm font-semibold opacity-80 mb-1">The Core Question</div>
              <p className="text-lg font-bold leading-snug">
                "Is earning $21.28 from an incremental $23 retail sale — without any upfront acquisition cost — more valuable than earning $0 from a traveller who otherwise wouldn't have converted?"
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
      <div className="flex-1 flex flex-col justify-center px-12 py-6">
        <div className="mb-6">
          <span className="text-blue-600 text-sm font-semibold uppercase tracking-widest">Business Model</span>
          <h2 className="text-xl md:text-3xl font-heading font-bold text-[#0a0f1e] mt-2">
            Performance-Based. <span className="text-blue-600">Zero Upfront Cost.</span>
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
                  <div key={i} className={`grid grid-cols-2 sm:grid-cols-4 gap-x-2 gap-y-0.5 py-1.5 px-2 rounded-lg text-xs ${i === 0 ? "bg-blue-800/60" : "hover:bg-white/5"}`}>
                    <span className="text-blue-300 font-semibold">{row.tier}</span>
                    <span className="text-slate-300">{row.range}</span>
                    <span className="text-yellow-300">{row.disc}</span>
                    <span className="text-green-300 font-semibold sm:text-right">{row.save}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
          <div className="flex flex-col gap-4">
            <div className="bg-blue-50 border border-blue-200 rounded-2xl p-5">
              <h3 className="font-bold text-blue-900 mb-3">The 2.5% Platform Fee — Your Only Cost</h3>
              <p className="text-slate-600 text-sm leading-relaxed mb-3">
                A single 2.5% fee on DutyBoost-validated transactions only — never on your existing sales.
              </p>
              <div className="space-y-2 text-sm">
                {[
                  "DutyBoost's sole revenue — the platform fee on each validated transaction",
                  "Applied only when a DutyCredit redemption is validated through your POS",
                  "No impact on your shelf prices or non-DutyBoost sales",
                  "Settled transparently — attributed and reported per transaction",
                ].map((item, i) => (
                  <div key={i} className="flex items-start gap-2">
                    <CheckCircle className="w-4 h-4 text-blue-600 flex-shrink-0 mt-0.5" />
                    <span className="text-slate-700">{item}</span>
                  </div>
                ))}
              </div>
            </div>
            <div className="bg-green-50 border border-green-200 rounded-2xl p-4 sm:p-5">
              <h3 className="font-bold text-green-900 mb-3">The Retailer Economics</h3>
              <div className="space-y-2.5 text-sm">
                {[
                  { metric: "Retailer keeps", val: "92.5% of every qualifying sale (Entry tier)" },
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

// SLIDE 10: Transaction Economics
function SlideTransaction() {
  return <SlideTransactionEntryTier />;
}

// SLIDE 11: POS Integration (Retailer-Specific)
function SlideIntegrate() {
  return (
    <SlideWrapper>
      <div className="flex-1 flex flex-col justify-center px-5 py-6 md:px-12 md:py-6 relative">
        <GridBg />
        <div className="relative z-10">
          <div className="mb-5 lg:mb-10">
            <span className="text-blue-600 text-sm font-semibold uppercase tracking-widest">Technology Strategy</span>
            <h2 className="text-xl md:text-3xl lg:text-4xl font-heading font-bold text-[#0a0f1e] mt-2">
              A POS Provider Feature.<br /><span className="text-blue-600">Activate, Not Implement.</span>
            </h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 lg:gap-8 items-center">
            <div className="bg-slate-50 border border-slate-200 rounded-2xl p-5 lg:p-7">
              <h3 className="text-[#0a0f1e] font-bold lg:text-lg mb-4">DutyBoost Appears in Your POS Dashboard</h3>
              <div className="space-y-3">
                {[
                  { icon: <CheckCircle className="w-4 h-4 text-green-600" />, text: "DutyBoost appears as a new feature in your existing POS dashboard" },
                  { icon: <CheckCircle className="w-4 h-4 text-green-600" />, text: "You flip the switch — no separate integration required from the retailer" },
                  { icon: <CheckCircle className="w-4 h-4 text-green-600" />, text: "No replacement of ERP, payment or inventory systems" },
                  { icon: <CheckCircle className="w-4 h-4 text-green-600" />, text: "Once switched on, all connected stores can redeem DutyCredits" },
                  { icon: <CheckCircle className="w-4 h-4 text-green-600" />, text: "Works across all stores, airports and markets on the same POS" },
                  { icon: <CheckCircle className="w-4 h-4 text-green-600" />, text: "Switch it off anytime — no lock-in, no commitments" },
                ].map((item, i) => (
                  <div key={i} className="flex items-start gap-3">
                    <div className="flex-shrink-0 mt-0.5">{item.icon}</div>
                    <span className="text-slate-600 text-sm">{item.text}</span>
                  </div>
                ))}
              </div>
            </div>
            <div className="bg-gradient-to-br from-blue-600 to-indigo-700 border border-indigo-500/30 rounded-2xl p-5 lg:p-7">
              <h3 className="text-white font-bold text-xl lg:text-2xl mb-2">ACTIVATED THROUGH YOUR POS</h3>
              <p className="text-blue-50 text-sm lg:text-base leading-relaxed mb-3 lg:mb-5">
                DutyBoost is enabled by your POS provider as an activation feature — the same system you already use for checkout, inventory and payments. No separate integration required from the retailer.
              </p>
              <div className="grid grid-cols-3 gap-3 text-center">
                {[
                  { val: "1 POS", label: "activation" },
                  { val: "Multiple", label: "retailers" },
                  { val: "Global", label: "deployment" },
                ].map((s) => (
                  <div key={s.label} className="bg-white/10 rounded-xl p-3">
                    <div className="text-blue-100 font-bold">{s.val}</div>
                    <div className="text-blue-50/70 text-xs mt-1">{s.label}</div>
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
            <span className="text-blue-600 text-sm font-semibold uppercase tracking-widest">The Growth Flywheel</span>
            <h2 className="text-xl md:text-3xl font-heading font-bold text-[#0a0f1e] mt-2">
              A Self-Reinforcing <span className="text-blue-600">Circular Ecosystem</span>
            </h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8 items-center">
            <div className="relative flex items-center justify-center" style={{ height: "340px" }}>
              <div className="absolute inset-0 rounded-full border-2 border-blue-200" />
              <div className="bg-blue-600 border-2 border-blue-700 rounded-full w-28 h-28 flex flex-col items-center justify-center text-center z-10">
                <div className="text-white text-xs font-bold leading-tight px-2">Performance-Based Customer Acquisition Infrastructure</div>
              </div>
              {steps.slice(0, 11).map((step, i) => {
                const angle = (i / 11) * 360 - 90;
                const rad = (angle * Math.PI) / 180;
                const r = 145;
                const x = 50 + (r / 3.4) * Math.cos(rad);
                const y = 50 + (r / 3.4) * Math.sin(rad);
                return (
                  <div key={i} className="absolute bg-blue-50 border border-blue-200 rounded-lg px-2 py-1 text-center"
                    style={{ left: `${x}%`, top: `${y}%`, transform: "translate(-50%, -50%)", maxWidth: "90px" }}>
                    <div className="text-blue-700 text-xs font-semibold leading-tight">{step}</div>
                  </div>
                );
              })}
              <div className="absolute inset-0 rounded-full border-2 border-dashed border-blue-300 animate-spin" style={{ animationDuration: "30s" }} />
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
                      <row.Icon className="w-4 h-4 text-blue-600 mt-0.5 flex-shrink-0" />
                      <div>
                        <span className="text-blue-700 font-semibold">{row.party} </span>
                        <span className="text-slate-600">{row.effect}</span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
              <div className="bg-gradient-to-br from-blue-600 to-indigo-700 rounded-2xl p-5 text-white">
                <p className="font-bold text-lg leading-snug">
                  "A positive flywheel that creates growth for every stakeholder."
                </p>
                <p className="text-blue-100 text-sm mt-2">Each new partner makes the platform more valuable for every existing partner.</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </SlideWrapper>
  );
}

// SLIDE 13: Get Started (Retailer-Specific)
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
          style={{ background: "radial-gradient(circle, #3b82f6 0%, transparent 70%)" }} />
        <div className="relative z-10 text-center">
          <div className="flex justify-center mb-3">
            <div className="bg-white rounded-2xl px-6 py-2 shadow-xl border border-slate-200">
              <DutyBoostLogo height={42} linkTo="/retailer-showcase" />
            </div>
          </div>
          <div className="mb-3">
            <span className="text-blue-600 text-xs font-semibold uppercase tracking-widest">Value Realized Quickly</span>
            <h2 className="text-xl md:text-3xl font-heading font-bold text-[#0a0f1e] mt-1.5 leading-tight">
              Switch It On.<br />
              <span className="text-blue-600">Start Earning. Switch Off Anytime.</span>
            </h2>
          </div>
          <p className="text-slate-600 text-base max-w-3xl mx-auto leading-relaxed mb-4">
            DutyBoost appears as a new feature in your existing POS dashboard — not a project to implement. No integration, no rollout, no operational change. You flip the switch and incremental revenue starts flowing.
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 max-w-5xl mx-auto mb-4">
            {cards.map((card) => (
              <div key={card.title} className="bg-slate-50 border border-slate-200 rounded-2xl p-4 text-left">
                <div className="text-blue-700 font-bold text-sm mb-1">{card.title}</div>
                <div className="text-slate-600 text-xs leading-snug">{card.desc}</div>
              </div>
            ))}
          </div>
          <div className="flex flex-col items-center gap-1.5">
            <p className="text-blue-600 text-base md:text-lg font-bold">
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

// SLIDE 14: Thank You / Join DutyBoost
function SlideThankYou() {
  const cards = [
    { Icon: Store, title: "Activate in Your POS", desc: "Flip the DutyBoost switch in your existing POS dashboard — no integration required." },
    { Icon: CheckCircle, title: "Earn From Day One", desc: "Pre-activated travellers redeem DutyCredits at your store immediately." },
    { Icon: ArrowRight, title: "Switch Off Anytime", desc: "No lock-in, no commitments — you stay in control, always." },
  ];

  return (
    <SlideWrapper>
      <div className="flex-1 flex flex-col justify-center px-5 py-5 md:px-12 md:py-5 relative">
        <GridBg />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] rounded-full opacity-10"
          style={{ background: "radial-gradient(circle, #3b82f6 0%, transparent 70%)" }} />
        <div className="relative z-10 flex flex-col items-center text-center">
          <div className="bg-white rounded-2xl px-6 py-2.5 shadow-2xl border border-slate-200 mb-4">
            <DutyBoostLogo height={46} linkTo="/retailer-showcase" />
          </div>
          <div className="mb-3">
            <span className="text-blue-600 text-xs font-semibold uppercase tracking-widest">Thank You</span>
            <h2 className="text-2xl md:text-3xl font-heading font-bold text-[#0a0f1e] mt-1.5 leading-tight">
              Join DutyBoost.<br />
              <span className="text-blue-600">Start Earning Incremental Revenue.</span>
            </h2>
          </div>
          <p className="text-slate-600 text-base max-w-3xl leading-relaxed mb-4">
            DutyBoost connects what already exists — your stores, your POS, and 625K travellers who currently walk straight to the gate. With zero upfront cost and a single POS activation, you can start capturing revenue from non-purchasing travellers today.
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 max-w-3xl w-full mb-4">
            {cards.map((card) => (
              <div key={card.title} className="bg-slate-50 border border-slate-200 rounded-2xl p-4 text-left">
                <card.Icon className="w-7 h-7 text-blue-600 mb-1.5" />
                <div className="text-blue-700 font-bold text-sm mb-1">{card.title}</div>
                <div className="text-slate-600 text-xs leading-snug">{card.desc}</div>
              </div>
            ))}
          </div>
          <div className="bg-gradient-to-br from-blue-600 to-indigo-700 rounded-2xl p-5 text-white max-w-2xl">
            <p className="font-bold text-base md:text-lg leading-snug mb-1">
              Ready to turn 625K non-purchasing travellers into incremental sales?
            </p>
            <p className="text-blue-50 text-sm">
              Performance-based. Zero upfront cost. You pay only the 2.5% platform fee on validated sales.
            </p>
          </div>
          <Link
            to="/retailer-confirmation"
            className="mt-5 inline-flex items-center gap-2 rounded-full px-7 py-3.5 text-white font-semibold text-sm md:text-base shadow-lg bg-gradient-to-br from-blue-600 to-indigo-700 hover:opacity-90 transition-opacity"
          >
            Confirm your POS Integration Interest
            <ArrowRight className="w-4 h-4" />
          </Link>
          <div className="mt-4 text-slate-500 text-[10px]">
            CONFIDENTIAL — 2026 | Chamber of Commerce: 42053181 | VAT: NL869492068B01
          </div>
        </div>
      </div>
    </SlideWrapper>
  );
}

const SLIDE_COMPONENTS = {
  cover: SlideCover,
  team: SlideTeam,
  problem: SlideProblem,
  solution: SlideSolution,
  market: SlideMarket,
  conversion: SlideConversion,
  acquisition: SlideAcquisitionCost,
  model: SlideModel,
  tierMix: SlideTierMix,
  transaction: SlideTransaction,
  integrate: SlideIntegrate,
  flywheel: SlideFlywheel,
  getStarted: SlideGetStarted,
  thankYou: SlideThankYou,
};

export default function RetailerPitchDeckCaribbean() {
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
    <div className="min-h-screen bg-[#050a14] flex flex-col items-center justify-start lg:justify-center p-3 py-2 overflow-x-hidden">
      <div className="w-full max-w-[1400px] flex items-center justify-between mb-2">
        <div className="text-white text-sm font-semibold opacity-60">
          DutyBoost — Sint Maarten Airport Retailer Presentation 2026 <span className="text-xs opacity-50 ml-2 hidden sm:inline">CONFIDENTIAL</span>
        </div>
        <div className="text-slate-400 text-sm">{current + 1} / {SLIDES.length}</div>
      </div>

      <div ref={slideAreaRef} className="w-full max-w-[1400px] flex rounded-2xl overflow-hidden shadow-2xl border border-white/10 min-h-[58vh] lg:h-[calc(100vh-150px)]">
        <SlideComp />
      </div>

      <div className="w-full max-w-[1400px] flex flex-wrap items-center justify-between gap-3 mt-3">
        <button onClick={prev} disabled={current === 0}
          className="flex items-center gap-2 px-6 py-3.5 rounded-xl bg-white/10 text-white hover:bg-white/20 disabled:opacity-30 disabled:cursor-not-allowed transition-colors text-base font-semibold cursor-pointer select-none">
          <ChevronLeft size={18} /> Previous
        </button>
        <div className="flex gap-1.5 flex-wrap justify-center max-w-lg">
          {SLIDES.map((s, i) => (
            <button key={s.id} onClick={() => setCurrent(i)} title={SLIDE_LABELS[s.type]}
              className={`text-xs px-3 py-1 rounded-lg transition-all font-medium ${i === current ? "bg-blue-600 text-white" : "bg-white/10 text-slate-400 hover:bg-white/20 hover:text-white"}`}>
              {i + 1}
            </button>
          ))}
        </div>
        <button onClick={next} disabled={current === SLIDES.length - 1}
          className="flex items-center gap-2 px-6 py-3.5 rounded-xl bg-blue-600 text-white hover:bg-blue-700 disabled:opacity-30 disabled:cursor-not-allowed transition-colors text-base font-semibold cursor-pointer select-none">
          Next <ChevronRight size={18} />
        </button>
      </div>
      <div className="mt-1.5 text-slate-500 text-sm">{SLIDE_LABELS[slide.type]}</div>
    </div>
  );
}