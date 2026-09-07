import { useState, useEffect, useRef, Fragment } from "react";
import { Link } from "react-router-dom";
import { ChevronLeft, ChevronRight, ArrowRight, Cpu, BarChart3, Link2, Briefcase, Store, CheckCircle } from "lucide-react";
import DutyBoostLogo from "@/components/DutyBoostLogo";
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

const SLIDES = [
  { id: "cover", type: "cover" },
  { id: "team", type: "team" },
  { id: "problem", type: "problem" },
  { id: "solution", type: "solution" },
  { id: "market", type: "market" },
  { id: "conversion", type: "conversion" },
  { id: "model", type: "model" },
  { id: "transaction", type: "transaction" },
  { id: "incremental", type: "incremental" },
  { id: "integrate", type: "integrate" },
  { id: "flywheel", type: "flywheel" },
  { id: "getStarted", type: "getStarted" },
];

const SLIDE_LABELS = {
  cover: "Cover",
  team: "Our Team",
  problem: "The Problem",
  solution: "The Solution",
  market: "Sint Maarten Market",
  conversion: "Conversion Opportunity",
  model: "Business Model",
  transaction: "Transaction Economics",
  incremental: "Incremental Revenue",
  integrate: "POS Integration",
  flywheel: "Growth Flywheel",
  getStarted: "Get Started",
};

function SlideWrapper({ children, dark = false }) {
  return (
    <div className={`w-full flex flex-col overflow-y-auto ${dark ? "bg-[#0a0f1e] text-white" : "bg-white text-[#0a0f1e]"}`}>
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
            <h1 className="text-3xl md:text-5xl font-heading font-bold text-[#0a0f1e] leading-tight mb-4">
              Incremental Revenue From Travellers<br />
              <span className="text-blue-600">Who Otherwise Wouldn't Buy</span>
            </h1>
            <p className="text-xl text-slate-500 max-w-3xl leading-relaxed">
              A Presentation for Sint Maarten Airport Retailers
            </p>
          </div>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 sm:gap-6 mt-4 w-full">
            {[
              { label: "Sint Maarten", value: "855,994" },
              { label: "Non-Purchase", value: "73%" },
              { label: "Market Growth", value: "21.7%" },
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
      name: "Raël Martis",
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
            DutyBoost combines airport retail expertise with technology, marketing and commercial strategy — built by a team that understands how airport stores operate. We know the challenges of converting passengers into buyers, and we built DutyBoost to help retailers like you capture revenue from travellers who otherwise walk straight to the gate. Our role is simple: bring more pre-activated shoppers to your stores and help you turn foot traffic into sales.
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
            <span className="text-blue-600 text-sm font-semibold uppercase tracking-widest">The Problem</span>
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
                <div className="text-slate-500 text-sm mt-1">53.9% from North America | 25.8% from EU{" "}
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
                <h3 className="text-slate-800 font-semibold text-lg mb-4">Traditional Airport Retail Failure Points</h3>
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

// SLIDE 4: Solution
function SlideSolution() {
  return (
    <SlideWrapper>
      <div className="flex-1 flex flex-col justify-center px-5 py-6 md:px-12 md:py-6 relative">
        <GridBg />
        <div className="relative z-10">
          <div className="mb-5">
            <span className="text-blue-600 text-sm font-semibold uppercase tracking-widest">The Solution</span>
            <h2 className="text-xl md:text-3xl font-heading font-bold text-[#0a0f1e] mt-2">
              Activate the Traveller<br /><span className="text-blue-600">Before Airport Arrival</span>
            </h2>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-5 mb-6">
            {[
              { Icon: TravelAgencyIcon, color: "text-blue-600", title: "Flight Booking", desc: "DutyCredit distributed with airline confirmation" },
              { Icon: HotelIcon, color: "text-violet-600", title: "Hotel / OTA", desc: "DutyCredit distributed with booking confirmation" },
              { Icon: CarRentalIcon, color: "text-green-600", title: "Car Rental", desc: "DutyCredit distributed with rental confirmation" },
              { Icon: Briefcase, color: "text-amber-600", title: "Corporate Travel", desc: "DutyCredit embedded in T&E and corporate booking flows" },
            ].map((step, i) => (
              <div key={i} className="bg-slate-50 border border-slate-200 rounded-2xl p-5 text-center">
                <step.Icon className={`w-10 h-10 mx-auto mb-3 ${step.color}`} />
                <div className="text-slate-800 font-semibold mb-1">{step.title}</div>
                <div className="text-slate-500 text-sm">{step.desc}</div>
              </div>
            ))}
          </div>
          <div className="flex flex-col gap-2 mb-6 lg:hidden">
            {[
              "Partners distribute DutyCredit",
              "Traveller activates benefit",
              "Arrives with purchase intent",
              "Visits participating retailer",
              "Spends $100 → Saves $10",
              "POS validates transaction",
              "All participants earn",
            ].map((step, i) => (
              <div key={i} className="flex items-center gap-3">
                <div className="w-7 h-7 rounded-full bg-blue-600 flex items-center justify-center text-white text-xs font-bold flex-shrink-0">{i + 1}</div>
                <div className="flex-1 bg-blue-50 border border-blue-200 rounded-xl px-3 py-2">
                  <span className="text-slate-800 text-sm leading-tight">{step}</span>
                </div>
              </div>
            ))}
          </div>
          <div className="hidden lg:flex items-stretch gap-2 mb-6">
            {[
              "Partners distribute DutyCredit",
              "Traveller activates benefit",
              "Arrives with purchase intent",
              "Visits participating retailer",
              "Spends $100 → Saves $10",
              "POS validates transaction",
              "All participants earn",
            ].map((step, i, arr) => (
              <Fragment key={i}>
                <div className="flex-1 min-w-0 bg-blue-50 border border-blue-200 rounded-xl px-3 py-2.5 text-center flex flex-col justify-start">
                  <div className="text-blue-600 text-xs font-semibold leading-none h-3.5 flex items-center justify-center">Step {i + 1}</div>
                  <div className="text-slate-800 text-xs mt-1 leading-tight">{step}</div>
                </div>
                {i < arr.length - 1 && <ChevronRight className="text-blue-500 flex-shrink-0 self-center w-4 h-4" />}
              </Fragment>
            ))}
          </div>
          <div className="bg-gradient-to-r from-blue-50 to-indigo-50 border border-blue-200 rounded-2xl p-6">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-6 text-center items-start">
              <div className="flex flex-col items-center">
                <div className="text-2xl md:text-xl lg:text-2xl xl:text-3xl font-bold text-blue-600 h-9 md:h-8 lg:h-10 flex items-center justify-center leading-tight whitespace-nowrap">$1 – $60</div>
                <div className="text-slate-500 text-sm mt-2">DutyCredit direct traveller value</div>
              </div>
              <div className="flex flex-col items-center">
                <div className="text-2xl md:text-xl lg:text-2xl xl:text-3xl font-bold text-blue-600 h-9 md:h-8 lg:h-10 flex items-center justify-center leading-tight whitespace-nowrap">Performance-Based</div>
                <div className="text-slate-500 text-sm mt-2">Zero upfront cost to any partner</div>
              </div>
              <div className="flex flex-col items-center">
                <div className="text-2xl md:text-xl lg:text-2xl xl:text-3xl font-bold text-blue-600 h-9 md:h-8 lg:h-10 flex items-center justify-center leading-tight whitespace-nowrap">Participants</div>
                <div className="text-slate-500 text-sm mt-2">All benefit from one transaction</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </SlideWrapper>
  );
}

// SLIDE 5: Caribbean Market
function SlideMarket() {
  return (
    <SlideWrapper>
      <div className="flex-1 flex flex-col justify-center px-12 py-6">
        <div className="mb-5">
          <span className="text-blue-600 text-sm font-semibold uppercase tracking-widest">Sint Maarten Market Opportunity</span>
          <h2 className="text-xl md:text-3xl font-heading font-bold text-[#0a0f1e] mt-2">
            855K Air Arrivals. $67M Local Market. <span className="text-blue-600">$2.72B Regional Market</span>
          </h2>
          <p className="text-slate-500 mt-2">DutyBoost doesn't need to create the market. It connects what already exists.</p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-5 mb-6">
          {[
            { label: "Sint Maarten Air Arrivals", value: "855,994", sub: "53.9% North America | 25.8% EU (SXM Gov, 2025)", color: "blue", subLink: SXM_LINK },
            { label: "Caribbean DF&TR Market", value: "$2.72B", sub: "21.7% CAGR 2026-2033 (CMI)", color: "indigo", subLink: CMI_LINK },
            { label: "Sint Maarten DF&TR Share", value: "$67M", sub: "2.45% of Caribbean market (est.)", color: "violet", subLink: CMI_LINK },
          ].map((m) => (
            <div key={m.label} className={`bg-${m.color}-50 border border-${m.color}-200 rounded-2xl p-6 text-center`}>
              <div className={`text-xl md:text-3xl font-bold text-${m.color}-700 mb-2`}>{m.value}</div>
              <div className="font-semibold text-slate-700 mb-1 text-sm">{m.label}</div>
              <div className="text-slate-500 text-xs">
                {m.subLink ? (
                  <a href={m.subLink} target="_blank" rel="noopener noreferrer"
                    className="text-blue-600 font-semibold underline decoration-blue-600/50 hover:decoration-blue-400 hover:text-blue-500 transition-colors">
                    {m.sub}
                  </a>
                ) : m.sub}
              </div>
            </div>
          ))}
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          <div className="bg-slate-50 border border-slate-200 rounded-2xl p-6">
            <h3 className="font-bold text-slate-700 mb-4">Sint Maarten DF&TR Categories (2026 est.)</h3>
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
            <div className="text-slate-400 text-xs mt-3">Sint Maarten category values estimated from CMI market share data, proportional to Sint Maarten's air arrival share of the Caribbean market (855,994 / 35M ≈ 2.45% of $2.72B ≈ $67M total)</div>
          </div>
          <div className="bg-amber-50 border border-amber-200 rounded-2xl p-6">
            <h3 className="font-bold text-slate-700 mb-3">DutyBoost doesn't need to create:</h3>
            <div className="space-y-2">
              {[
                "Sint Maarten airport — it already exists",
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
              <h3 className="font-bold text-blue-800 mb-3">Of the 625K unreached Sint Maarten travellers:</h3>
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 text-xs text-slate-400 mb-1 px-2">
                <span>Conversion</span><span>Transactions</span><span>Retail Value</span><span className="sm:text-right">Retailer Net</span>
              </div>
              <div className="space-y-1.5">
                {[
                  { conv: "+0.5 pp", txns: "3.1K", retail: "$313K", ret: "$273K" },
                  { conv: "+1 pp", txns: "6.3K", retail: "$625K", ret: "$547K" },
                  { conv: "+2 pp", txns: "12.5K", retail: "$1.25M", ret: "$1.09M" },
                  { conv: "+5 pp", txns: "31.3K", retail: "$3.13M", ret: "$2.73M" },
                ].map((row, i) => (
                  <div key={i} className={`grid grid-cols-2 sm:grid-cols-4 gap-x-2 gap-y-0.5 text-sm py-1.5 px-2 rounded-lg ${i === 1 ? "bg-blue-200/50 font-semibold" : ""}`}>
                    <span className="text-blue-700">{row.conv}</span>
                    <span className="text-slate-600">{row.txns} txns</span>
                    <span className="text-slate-600">{row.retail}</span>
                    <span className="text-green-700 font-semibold sm:text-right">{row.ret}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
          <div className="flex flex-col gap-4">
            <div className="bg-slate-800 text-white rounded-2xl p-6 flex-1">
              <h3 className="font-bold text-white mb-4">The DutyBoost Proposition for Retailers</h3>
              <div className="space-y-4">
                {[
                  { from: "Retailers wait for passengers", to: "Passengers arrive with purchase intent" },
                  { from: "Impulse-driven shopping", to: "Pre-activated economic incentive" },
                  { from: "No reason to enter the store", to: "DutyCredit gives a reason to visit" },
                  { from: "73% walk straight to the gate", to: "Pre-activated travellers detour to your store" },
                ].map((row, i) => (
                  <div key={i} className="grid grid-cols-[1fr,auto,1fr] gap-2 items-center text-xs">
                    <span className="text-red-300 bg-red-900/30 rounded px-2 py-1 text-center">{row.from}</span>
                    <ArrowRight size={14} className="text-blue-400 flex-shrink-0" />
                    <span className="text-green-300 bg-green-900/30 rounded px-2 py-1 text-center">{row.to}</span>
                  </div>
                ))}
              </div>
            </div>
            <div className="bg-gradient-to-br from-blue-600 to-indigo-700 rounded-2xl p-5 text-white">
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
      <div className="flex-1 flex flex-col justify-center px-12 py-6">
        <div className="mb-6">
          <span className="text-blue-600 text-sm font-semibold uppercase tracking-widest">Business Model</span>
          <h2 className="text-xl md:text-3xl font-heading font-bold text-[#0a0f1e] mt-2">
            Performance-Based. <span className="text-blue-600">Zero Upfront Cost.</span>
          </h2>
          <p className="text-slate-500 mt-1">Revenue is created only when a qualifying transaction is validated through Enterprise POS.</p>
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
                  { tier: "Entry", range: "$20–$49", disc: "5%–7.5%", save: "$1.00–$3.19" },
                  { tier: "Boarding", range: "$50–$99", disc: "7.5%–10%", save: "$3.75–$9.41" },
                  { tier: "Standard", range: "$100–$149", disc: "10%–12.5%", save: "$10.00–$18.25" },
                  { tier: "Plus", range: "$150–$199", disc: "12.5%–15%", save: "$18.75–$29.04" },
                  { tier: "Lounge", range: "$200–$249", disc: "15%–17.5%", save: "$30.00–$42.75" },
                  { tier: "Premium", range: "$250–$299", disc: "17.5%–20%", save: "$43.75–$57.00" },
                  { tier: "VIP", range: "$300+", disc: "20% capped", save: "Up to $60" },
                ].map((row, i) => (
                  <div key={i} className={`grid grid-cols-2 sm:grid-cols-4 gap-x-2 gap-y-0.5 py-1.5 px-2 rounded-lg text-xs ${i === 2 ? "bg-blue-800/60" : "hover:bg-white/5"}`}>
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
              <h3 className="font-bold text-blue-900 mb-3">Platform Fee Allocation (2.5% of Original Retail Value)</h3>
              <div className="space-y-2">
                {[
                  { party: "Travel & Corporate Partner", share: "20% of fee", pct: "0.50%", val: "$0.50", color: "blue", bg: "bg-blue-200" },
                  { party: "Enterprise POS Partner", share: "10% of fee", pct: "0.25%", val: "$0.25", color: "indigo", bg: "bg-indigo-200" },
                  { party: "DutyBoost", share: "70% of fee", pct: "1.75%", val: "$1.75", color: "violet", bg: "bg-violet-200" },
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
              <h3 className="font-bold text-green-900 mb-2">At 1 Million $100 Transactions:</h3>
              <div className="grid grid-cols-1 gap-1.5 text-sm">
                {[
                  { party: "Travellers", val: "$10M in savings" },
                  { party: "Travel & Corporate Partners", val: "$500,000 ancillary revenue" },
                  { party: "POS Partners", val: "$250,000 transaction revenue" },
                  { party: "DutyBoost", val: "$1.75M infrastructure revenue" },
                  { party: "Retailers", val: "$87.5M net before costs" },
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
    </SlideWrapper>
  );
}

// SLIDE 8: Transaction Economics
function SlideTransaction() {
  return (
    <SlideWrapper>
      <div className="flex-1 flex flex-col justify-center px-5 py-6 md:px-12 md:py-6 relative">
        <GridBg />
        <div className="relative z-10">
          <div className="mb-6">
            <span className="text-blue-600 text-sm font-semibold uppercase tracking-widest">One Transaction — Five Beneficiaries</span>
            <h2 className="text-xl md:text-3xl font-heading font-bold text-[#0a0f1e] mt-2">
              $100 Original Qualifying Retail Value
            </h2>
          </div>
          <div className="grid grid-cols-2 sm:grid-cols-5 gap-3 mb-6">
            {[
              { party: "Traveller", Icon: TravelerIcon, value: "$10.00", sub: "DutyCredit saving (10%)", color: "green", bg: "bg-green-50", border: "border-green-200" },
              { party: "Airport Retailer", Icon: AirportRetailerIcon, value: "$87.50", sub: "Net before normal costs (87.5%)", color: "blue", bg: "bg-blue-50", border: "border-blue-200" },
              { party: "Travel & Corporate Partner", Icon: Briefcase, value: "$0.50", sub: "Ancillary revenue (0.5%)", color: "yellow", bg: "bg-yellow-50", border: "border-yellow-200" },
              { party: "POS Partner", Icon: Cpu, value: "$0.25", sub: "Transaction revenue (0.25%)", color: "purple", bg: "bg-purple-50", border: "border-purple-200" },
              { party: "DutyBoost", Icon: BarChart3, value: "$1.75", sub: "Infrastructure revenue (1.75%)", color: "orange", bg: "bg-orange-50", border: "border-orange-200" },
            ].map((p) => (
              <div key={p.party} className={`${p.bg} border ${p.border} rounded-2xl p-4 text-center`}>
                <p.Icon className={`w-9 h-9 mx-auto mb-2 text-${p.color}-600`} />
                <div className="text-slate-800 font-semibold text-xs sm:text-sm whitespace-nowrap mb-2">{p.party}</div>
                <div className={`text-2xl font-bold text-${p.color}-600 mb-1`}>{p.value}</div>
                <div className="text-slate-500 text-xs leading-snug">{p.sub}</div>
              </div>
            ))}
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            <div className="bg-slate-50 border border-slate-200 rounded-2xl p-5">
              <div className="text-slate-500 text-xs uppercase tracking-wide mb-2">Total = $100.00</div>
              <div className="flex h-6 rounded-full overflow-hidden gap-px">
                <div className="bg-green-500" style={{ width: "10%" }} title="Traveller 10%" />
                <div className="bg-blue-500" style={{ width: "87.5%" }} title="Retailer 87.5%" />
                <div className="bg-yellow-500" style={{ width: "0.5%" }} />
                <div className="bg-purple-500" style={{ width: "0.25%" }} />
                <div className="bg-orange-500" style={{ width: "1.75%" }} />
              </div>
              <div className="flex gap-3 mt-2 text-xs flex-wrap">
                {[
                  { color: "bg-green-500", label: "Traveller 10%" },
                  { color: "bg-blue-500", label: "Retailer 87.5%" },
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
            <div className="bg-gradient-to-br from-blue-600 to-indigo-700 rounded-2xl p-5 text-white">
              <h3 className="font-bold mb-3">Integrate Once. Deploy Repeatedly.</h3>
              <p className="text-blue-50 text-sm leading-relaxed">
                A single Enterprise POS integration can enable DutyBoost across multiple retailers, stores, airports and geographic markets — creating fundamentally better scaling economics than building individual integrations per retailer.
              </p>
              <div className="mt-3 text-blue-100 font-semibold text-sm">
                Technology strategy: INTEGRATE ONCE. DEPLOY REPEATEDLY.
              </div>
            </div>
          </div>
        </div>
      </div>
    </SlideWrapper>
  );
}

// SLIDE 9: Incremental Revenue (Retailer-Specific)
function SlideIncremental() {
  return (
    <SlideWrapper>
      <div className="flex-1 flex flex-col justify-center px-5 py-6 md:px-12 md:py-6">
        <div className="mb-5">
          <span className="text-blue-600 text-sm font-semibold uppercase tracking-widest">Your Incremental Revenue</span>
          <h2 className="text-xl md:text-3xl font-heading font-bold text-[#0a0f1e] mt-2">
            What DutyBoost Can Bring <span className="text-blue-600">to Your Stores</span>
          </h2>
          <p className="text-slate-500 mt-1 text-sm">If just 1% more of your non-purchasing passengers convert through a DutyBoost-validated transaction — incremental revenue from travellers who otherwise would not have bought.</p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-5 mb-5">
          {[
            { size: "Single Airport", pax: "1M passengers/yr", conv: "+1% = 10K txns", net: "$525K", color: "blue" },
            { size: "Multi-Airport Group", pax: "10M passengers/yr", conv: "+1% = 100K txns", net: "$5.25M", color: "indigo" },
            { size: "Major Network", pax: "50M+ passengers/yr", conv: "+1% = 500K txns", net: "$26.25M", color: "violet" },
          ].map((s) => (
            <div key={s.size} className={`bg-${s.color}-50 border border-${s.color}-200 rounded-2xl p-5 text-center`}>
              <div className={`text-xs font-semibold text-${s.color}-600 uppercase tracking-wide mb-1`}>{s.size}</div>
              <div className="text-slate-500 text-sm mb-3">{s.pax}</div>
              <div className={`text-2xl md:text-3xl font-bold text-${s.color}-700 mb-1`}>{s.net}</div>
              <div className={`text-${s.color}-600 text-sm font-medium mb-2`}>incremental retailer net</div>
              <div className="text-slate-500 text-xs border-t border-slate-200 pt-2">{s.conv} @ $60 avg value</div>
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
            <ul className="space-y-2 text-sm">
              {[
                "100% incremental — from the 90–95% who currently never buy",
                "Zero upfront cost — pay only the 2.5% fee on validated sales",
                "No change to your existing POS, pricing or merchandising",
                "Attributed & reported transparently per transaction",
              ].map((item, i) => (
                <li key={i} className="flex items-start gap-2">
                  <CheckCircle className="w-4 h-4 text-green-600 flex-shrink-0 mt-0.5" />
                  <span className="text-green-800">{item}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
        <div className="bg-gradient-to-r from-blue-50 to-indigo-50 border border-blue-200 rounded-2xl p-4 lg:p-5 mt-5 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <Store className="w-6 h-6 text-blue-600 flex-shrink-0" />
            <div>
              <div className="font-bold text-blue-900 text-sm lg:text-base">See It in Practice — Avolta Demo Dashboard</div>
              <div className="text-blue-700 text-xs lg:text-sm">Explore a live simulation of DutyBoost transactions, redemptions and incremental revenue at an Avolta duty-free store.</div>
            </div>
          </div>
          <Link to="/demo/retailer-avolta" className="flex items-center gap-2 px-5 py-3 bg-blue-600 text-white rounded-xl font-semibold hover:bg-blue-700 transition-colors whitespace-nowrap text-sm">
            View Avolta Report <ArrowRight size={16} />
          </Link>
        </div>
      </div>
    </SlideWrapper>
  );
}

// SLIDE 10: POS Integration (Retailer-Specific)
function SlideIntegrate() {
  return (
    <SlideWrapper dark>
      <div className="flex-1 flex flex-col justify-center px-5 py-6 md:px-12 md:py-6 relative">
        <GridBg />
        <div className="relative z-10">
          <div className="mb-5 lg:mb-10">
            <span className="text-blue-400 text-sm font-semibold uppercase tracking-widest">Technology Strategy</span>
            <h2 className="text-xl md:text-3xl lg:text-4xl font-heading font-bold text-white mt-2">
              A POS Provider Feature.<br /><span className="text-blue-400">Activated, Not Integrated.</span>
            </h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 lg:gap-8 items-center">
            <div className="bg-white/5 border border-white/10 rounded-2xl p-5 lg:p-7">
              <h3 className="text-white font-bold lg:text-lg mb-4">DutyBoost Appears in Your POS Dashboard</h3>
              <div className="space-y-3">
                {[
                  { icon: <CheckCircle className="w-4 h-4 text-green-400" />, text: "DutyBoost appears as a new feature in your existing POS dashboard" },
                  { icon: <CheckCircle className="w-4 h-4 text-green-400" />, text: "You flip the switch — no separate integration required from the retailer" },
                  { icon: <CheckCircle className="w-4 h-4 text-green-400" />, text: "No replacement of ERP, payment or inventory systems" },
                  { icon: <CheckCircle className="w-4 h-4 text-green-400" />, text: "Once switched on, all connected stores can redeem DutyCredits" },
                  { icon: <CheckCircle className="w-4 h-4 text-green-400" />, text: "Works across all stores, airports and markets on the same POS" },
                  { icon: <CheckCircle className="w-4 h-4 text-green-400" />, text: "Switch it off anytime — no lock-in, no commitments" },
                ].map((item, i) => (
                  <div key={i} className="flex items-start gap-3">
                    <div className="flex-shrink-0 mt-0.5">{item.icon}</div>
                    <span className="text-slate-300 text-sm">{item.text}</span>
                  </div>
                ))}
              </div>
            </div>
            <div className="bg-gradient-to-br from-indigo-900/60 to-blue-900/60 border border-indigo-500/30 rounded-2xl p-5 lg:p-7">
              <h3 className="text-white font-bold text-xl lg:text-2xl mb-2">ACTIVATED THROUGH YOUR POS</h3>
              <p className="text-indigo-200 text-sm lg:text-base leading-relaxed mb-3 lg:mb-5">
                DutyBoost is enabled by your POS provider as an activation feature — the same system you already use for checkout, inventory and payments. No separate integration required from the retailer.
              </p>
              <div className="grid grid-cols-3 gap-3 text-center">
                {[
                  { val: "1 POS", label: "activation" },
                  { val: "Multiple", label: "retailers" },
                  { val: "Global", label: "deployment" },
                ].map((s) => (
                  <div key={s.label} className="bg-white/5 rounded-xl p-3">
                    <div className="text-blue-300 font-bold">{s.val}</div>
                    <div className="text-slate-400 text-xs mt-1">{s.label}</div>
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

// SLIDE 11: Growth Flywheel
function SlideFlywheel() {
  const steps = [
    "More Travel & Corporate Partners",
    "More Travellers Reached",
    "More DutyCredits Distributed",
    "More Traveller Incentives",
    "More Pre-Airport Activation",
    "More Participating Retail Visits",
    "More Retail Conversion",
    "More Validated Transactions",
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
                <div className="text-white text-xs font-bold leading-tight px-2">Circular Revenue Infrastructure</div>
              </div>
              {steps.slice(0, 8).map((step, i) => {
                const angle = (i / 8) * 360 - 90;
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
                    { Icon: AirportRetailerIcon, party: "More Retailers", effect: "→ More DutyCredit redemption opportunities" },
                    { Icon: Cpu, party: "More POS Integrations", effect: "→ More deployment capacity" },
                    { Icon: BarChart3, party: "More Transactions", effect: "→ Stronger commercial evidence" },
                    { Icon: Link2, party: "Stronger Evidence", effect: "→ Easier future partner acquisition" },
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

// SLIDE 12: Get Started (Retailer-Specific)
function SlideGetStarted() {
  return (
    <SlideWrapper dark>
      <div className="flex-1 flex flex-col justify-center px-5 py-6 md:px-12 md:py-6 relative">
        <GridBg />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] rounded-full opacity-10"
          style={{ background: "radial-gradient(circle, #3b82f6 0%, transparent 70%)" }} />
        <div className="relative z-10 text-center">
          <div className="flex justify-center mb-4 lg:mb-6">
            <div className="bg-white rounded-2xl px-6 py-3 shadow-xl">
              <DutyBoostLogo height={40} linkTo="/retailer-showcase" />
            </div>
          </div>
          <div className="mb-4 lg:mb-6">
            <span className="text-blue-400 text-sm font-semibold uppercase tracking-widest">Value Realized Quickly</span>
            <h2 className="text-xl md:text-4xl lg:text-4xl font-heading font-bold text-white mt-2 leading-tight">
              Switch It On.<br />
              <span className="text-blue-400">Start Earning. Switch Off Anytime.</span>
            </h2>
          </div>
          <p className="text-slate-300 text-sm md:text-base lg:text-lg max-w-3xl mx-auto leading-relaxed mb-4 lg:mb-6">
            DutyBoost appears as a new feature in your existing POS dashboard — not a project to implement. No integration, no rollout, no operational change. You flip the switch and incremental revenue starts flowing.
          </p>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3 lg:gap-4 max-w-3xl lg:max-w-4xl mx-auto mb-4 lg:mb-6">
            {[
              { title: "A New Feature in Your POS", desc: "DutyBoost appears as a toggle in your existing POS dashboard. No development, no integration, no project plan — just flip the switch." },
              { title: "Earning From Day One", desc: "Once switched on, pre-activated travellers can redeem DutyCredits at your store immediately. No waiting period." },
              { title: "Switch Off Anytime", desc: "Don't like the results? Flip it off. No lock-in, no cancellation fees, no commitments. You stay in control." },
              { title: "Zero Operational Change", desc: "No new hardware, no new software, no staff training. Your checkout flow stays exactly the same." },
            ].map((card, i) => (
              <div key={i} className="bg-white/5 border border-white/10 rounded-2xl p-4 lg:p-5 text-left">
                <div className="text-blue-300 font-bold lg:text-base mb-1.5">{card.title}</div>
                <div className="text-slate-400 text-xs lg:text-sm leading-relaxed">{card.desc}</div>
              </div>
            ))}
          </div>
          <div className="flex flex-col items-center gap-3">
            <p className="text-blue-400 text-base lg:text-xl font-bold">
              No setup fee. No subscription. No implementation. Flip the switch — earn. Flip it off — stop.
            </p>
            <p className="text-slate-300 text-sm lg:text-base font-semibold">
              Always performance-based — you pay only the 2.5% platform fee on validated sales.
            </p>
            <Link to="/demo/retailer-avolta" className="flex items-center gap-2 px-6 py-3 bg-blue-600 text-white rounded-xl font-semibold hover:bg-blue-700 transition-colors text-sm mt-2">
              <Store size={16} /> See It in Practice — Avolta Demo <ArrowRight size={16} />
            </Link>
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
  model: SlideModel,
  transaction: SlideTransaction,
  incremental: SlideIncremental,
  integrate: SlideIntegrate,
  flywheel: SlideFlywheel,
  getStarted: SlideGetStarted,
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