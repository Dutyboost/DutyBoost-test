import { useState } from "react";
import { ChevronLeft, ChevronRight, ArrowRight, Cpu, BarChart3, Link2 } from "lucide-react";
import DutyBoostLogo from "@/components/DutyBoostLogo";
import TravelAgencyIcon from "@/components/TravelAgencyIcon";
import HotelIcon from "@/components/HotelIcon";
import CarRentalIcon from "@/components/CarRentalIcon";
import AirportRetailerIcon from "@/components/AirportRetailerIcon";
import TravelerIcon from "@/components/TravelerIcon";

const SLIDES = [
  {
    id: "cover",
    type: "cover",
  },
  {
    id: "problem",
    type: "problem",
  },
  {
    id: "solution",
    type: "solution",
  },
  {
    id: "market",
    type: "market",
  },
  {
    id: "conversion",
    type: "conversion",
  },
  {
    id: "model",
    type: "model",
  },
  {
    id: "transaction",
    type: "transaction",
  },
  {
    id: "flywheel",
    type: "flywheel",
  },
  {
    id: "financials",
    type: "financials",
  },
  {
    id: "funding",
    type: "funding",
  },
  {
    id: "investment",
    type: "investment",
  },
];

function SlideWrapper({ children, dark = false }) {
  return (
    <div
      className={`w-full flex flex-col overflow-y-auto lg:overflow-hidden ${
        dark
          ? "bg-[#0a0f1e] text-white"
          : "bg-white text-[#0a0f1e]"
      }`}
    >
      {children}
    </div>
  );
}

function SlideCover() {
  return (
    <SlideWrapper dark>
      <div className="flex-1 flex flex-col items-center justify-center px-6 md:px-16 text-center relative">
        {/* Background grid */}
        <div className="absolute inset-0 opacity-5"
          style={{
            backgroundImage: "linear-gradient(rgba(59,130,246,0.5) 1px, transparent 1px), linear-gradient(90deg, rgba(59,130,246,0.5) 1px, transparent 1px)",
            backgroundSize: "40px 40px"
          }}
        />
        {/* Glow */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] rounded-full opacity-10"
          style={{ background: "radial-gradient(circle, #3b82f6 0%, transparent 70%)" }}
        />
        <div className="relative z-10 flex flex-col items-center gap-8">
          <div className="bg-white rounded-2xl px-8 py-4 shadow-2xl">
            <DutyBoostLogo height={50} linkTo={null} />
          </div>
          <div>
            <h1 className="text-3xl md:text-5xl font-heading font-bold text-white leading-tight mb-4">
              The Circular Commercial Revenue<br />
              <span className="text-blue-400">Infrastructure for Global Travel</span>
            </h1>
            <p className="text-xl text-slate-300 max-w-3xl leading-relaxed">
              Pre-Revenue / Pre-Seed Investment Opportunity
            </p>
          </div>
          <div className="flex gap-8 mt-4">
            {[
              { label: "Market", value: "€37.1B" },
              { label: "Seed Ask", value: "€500K" },
              { label: "Y5 Revenue", value: "€22.05M" },
            ].map((s) => (
              <div key={s.label} className="text-center">
                <div className="text-3xl font-bold text-blue-400">{s.value}</div>
                <div className="text-sm text-slate-400 mt-1">{s.label}</div>
              </div>
            ))}
          </div>
          <div className="mt-2 text-xs text-slate-500 border border-slate-700 rounded px-4 py-2">
            CONFIDENTIAL — 2026 | Chamber of Commerce: 42053181 | VAT: NL869492068B01
          </div>
        </div>
      </div>
    </SlideWrapper>
  );
}

function SlideProblem() {
  return (
    <SlideWrapper dark>
      <div className="flex-1 flex flex-col justify-center px-5 py-6 md:px-12 md:py-6 relative">
        <div className="absolute inset-0 opacity-5"
          style={{
            backgroundImage: "linear-gradient(rgba(59,130,246,0.4) 1px, transparent 1px), linear-gradient(90deg, rgba(59,130,246,0.4) 1px, transparent 1px)",
            backgroundSize: "40px 40px"
          }}
        />
        <div className="relative z-10">
          <div className="mb-5">
            <span className="text-blue-400 text-sm font-semibold uppercase tracking-widest">The Problem</span>
            <h2 className="text-xl md:text-3xl font-heading font-bold text-white mt-2">
              73% of Airport Passengers<br /><span className="text-blue-400">Never Make a Purchase</span>
            </h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8">
            <div className="space-y-5">
              <div className="bg-white/5 border border-white/10 rounded-2xl p-6">
                <div className="text-3xl md:text-5xl font-bold text-blue-400 mb-2">9.8B</div>
                <div className="text-white font-semibold">Global passenger movements in 2025</div>
                <div className="text-slate-400 text-sm mt-1">+3.6% vs 2024 | +7.3% vs 2019 (ACI World)</div>
              </div>
              <div className="bg-white/5 border border-white/10 rounded-2xl p-6">
                <div className="text-3xl md:text-5xl font-bold text-orange-400 mb-2">27%</div>
                <div className="text-white font-semibold">Avolta penetration benchmark</div>
                <div className="text-slate-400 text-sm mt-1">682M tickets from 2.5B passenger exposure</div>
              </div>
              <div className="bg-red-900/30 border border-red-500/30 rounded-2xl p-6">
                <div className="text-3xl md:text-5xl font-bold text-red-400 mb-2">1.82B</div>
                <div className="text-white font-semibold">Non-purchasing passenger exposures</div>
                <div className="text-slate-400 text-sm mt-1">Within Avolta's benchmark alone</div>
              </div>
            </div>
            <div className="flex flex-col gap-4">
              <div className="bg-white/5 border border-white/10 rounded-2xl p-6 flex-1">
                <h3 className="text-white font-semibold text-lg mb-4">Traditional Airport Retail Failure Points</h3>
                <ul className="space-y-3">
                  {[
                    "Activation starts only after the traveller clears security",
                    "Retailers compete for attention through impulse purchasing",
                    "Travel Partners hold the early relationship — but get zero retail participation",
                    "No financial reason for a non-intending buyer to enter a store",
                    "73% of passengers walk straight to the gate",
                  ].map((item, i) => (
                    <li key={i} className="flex items-start gap-3">
                      <div className="w-1.5 h-1.5 rounded-full bg-red-400 mt-2 flex-shrink-0" />
                      <span className="text-slate-300 text-sm">{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
              <div className="bg-blue-900/30 border border-blue-500/30 rounded-2xl p-5">
                <p className="text-blue-200 text-sm leading-relaxed italic">
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

function SlideSolution() {
  return (
    <SlideWrapper dark>
      <div className="flex-1 flex flex-col justify-center px-5 py-6 md:px-12 md:py-6 relative">
        <div className="absolute inset-0 opacity-5"
          style={{
            backgroundImage: "linear-gradient(rgba(59,130,246,0.4) 1px, transparent 1px), linear-gradient(90deg, rgba(59,130,246,0.4) 1px, transparent 1px)",
            backgroundSize: "40px 40px"
          }}
        />
        <div className="relative z-10">
          <div className="mb-5">
            <span className="text-blue-400 text-sm font-semibold uppercase tracking-widest">The Solution</span>
            <h2 className="text-xl md:text-3xl font-heading font-bold text-white mt-2">
              Activate the Traveller<br /><span className="text-blue-400">Before Airport Arrival</span>
            </h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-5 mb-6">
            {[
              { Icon: TravelAgencyIcon, color: "text-blue-400", title: "Flight Booking", desc: "DutyCredit introduced via airline confirmation" },
              { Icon: HotelIcon, color: "text-violet-400", title: "Hotel / OTA", desc: "DutyCredit distributed with booking confirmation" },
              { Icon: CarRentalIcon, color: "text-green-400", title: "Car Rental", desc: "DutyCredit delivered with rental confirmation" },
            ].map((step, i) => (
              <div key={i} className="bg-white/5 border border-white/10 rounded-2xl p-5 text-center">
                <step.Icon className={`w-10 h-10 mx-auto mb-3 ${step.color}`} />
                <div className="text-white font-semibold mb-1">{step.title}</div>
                <div className="text-slate-400 text-sm">{step.desc}</div>
              </div>
            ))}
          </div>
          <div className="flex flex-wrap items-center gap-3 mb-6">
            {[
              "Travel Partner distributes DutyCredit",
              "Traveller activates benefit",
              "Arrives with purchase intent",
              "Visits participating retailer",
              "Spends €100 → Saves €10",
              "POS validates transaction",
              "All 5 parties earn",
            ].map((step, i, arr) => (
              <div key={i} className="flex items-center gap-3 flex-shrink-0">
                <div className="bg-blue-900/50 border border-blue-500/40 rounded-xl px-4 py-2.5 text-center min-w-[110px]">
                  <div className="text-blue-400 text-xs font-semibold">Step {i + 1}</div>
                  <div className="text-white text-xs mt-0.5 leading-snug">{step}</div>
                </div>
                {i < arr.length - 1 && <ChevronRight className="text-blue-500 flex-shrink-0" size={16} />}
              </div>
            ))}
          </div>
          <div className="bg-gradient-to-r from-blue-900/50 to-indigo-900/50 border border-blue-500/30 rounded-2xl p-6">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-center">
              <div>
                <div className="text-3xl font-bold text-blue-300">€1 – €60</div>
                <div className="text-slate-300 text-sm mt-1">DutyCredit direct traveller value</div>
              </div>
              <div>
                <div className="text-3xl font-bold text-blue-300">Performance-Based</div>
                <div className="text-slate-300 text-sm mt-1">Zero upfront cost to any partner</div>
              </div>
              <div>
                <div className="text-3xl font-bold text-blue-300">5 Participants</div>
                <div className="text-slate-300 text-sm mt-1">All benefit from one transaction</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </SlideWrapper>
  );
}

function SlideMarket() {
  return (
    <SlideWrapper>
      <div className="flex-1 flex flex-col justify-center px-12 py-6">
        <div className="mb-5">
          <span className="text-blue-600 text-sm font-semibold uppercase tracking-widest">Market Opportunity</span>
          <h2 className="text-xl md:text-3xl font-heading font-bold text-[#0a0f1e] mt-2">
            A €37.1 Billion Market — <span className="text-blue-600">Already Exists</span>
          </h2>
          <p className="text-slate-500 mt-2">DutyBoost doesn't need to create the market. It connects what already exists.</p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-5 mb-6">
          {[
            { label: "Worldwide DF&TR Industry", value: "€65.5B", sub: "TFWA 2025 reference (€1 = US$1.13)", color: "blue" },
            { label: "Airport DF&TR Market", value: "€37.1B", sub: "56.6% airport-channel share (DutyBoost estimate)", color: "indigo" },
            { label: "European Airport DF&TR", value: "€10.13B", sub: "+5.5% value growth | +5.8% passenger growth (ETRC)", color: "violet" },
          ].map((m) => (
            <div key={m.label} className={`bg-${m.color}-50 border border-${m.color}-200 rounded-2xl p-6 text-center`}>
              <div className={`text-xl md:text-3xl font-bold text-${m.color}-700 mb-2`}>{m.value}</div>
              <div className="font-semibold text-slate-700 mb-1 text-sm">{m.label}</div>
              <div className="text-slate-500 text-xs">{m.sub}</div>
            </div>
          ))}
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          <div className="bg-slate-50 border border-slate-200 rounded-2xl p-6">
            <h3 className="font-bold text-slate-700 mb-4">Major DF&TR Categories (H1 2025)</h3>
            <div className="space-y-2">
              {[
                { cat: "Fragrances & Cosmetics", val: "€5.74B", pct: 90 },
                { cat: "Wines & Spirits", val: "€3.27B", pct: 51 },
                { cat: "Fashion & Accessories", val: "€2.49B", pct: 39 },
                { cat: "Tobacco", val: "€2.11B", pct: 33 },
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
          </div>
          <div className="bg-amber-50 border border-amber-200 rounded-2xl p-6">
            <h3 className="font-bold text-slate-700 mb-3">DutyBoost doesn't need to create:</h3>
            <div className="space-y-2">
              {[
                "Airports — they already exist",
                "Passenger traffic — 9.8B annual movements",
                "Airport Retailers — they already operate stores",
                "Travel Partners — they already communicate with travellers",
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
                  <div className="text-slate-600 font-semibold text-sm mt-1">Non-ticket exposure (Avolta benchmark)</div>
                  <div className="text-slate-400 text-xs mt-1">= 1.82 billion unreached travellers</div>
                </div>
                <div className="flex-1 text-right">
                  <div className="text-3xl md:text-5xl font-bold text-green-600">27%</div>
                  <div className="text-slate-600 font-semibold text-sm mt-1">Currently converting</div>
                </div>
              </div>
            </div>
            <div className="bg-blue-50 border border-blue-200 rounded-2xl p-5">
              <h3 className="font-bold text-blue-800 mb-3">At 180M travellers reached (Year 5):</h3>
              <div className="space-y-2">
                {[
                  { conv: "+0.5 pp", txns: "900K", retail: "€90M", db: "€1.575M" },
                  { conv: "+1 pp", txns: "1.8M", retail: "€180M", db: "€3.15M" },
                  { conv: "+2 pp", txns: "3.6M", retail: "€360M", db: "€6.30M" },
                  { conv: "+5 pp", txns: "9.0M", retail: "€900M", db: "€15.75M" },
                ].map((row, i) => (
                  <div key={i} className={`grid grid-cols-4 gap-2 text-sm py-1.5 px-2 rounded-lg ${i === 1 ? "bg-blue-200/50 font-semibold" : ""}`}>
                    <span className="text-blue-700">{row.conv}</span>
                    <span className="text-slate-600">{row.txns} txns</span>
                    <span className="text-slate-600">{row.retail}</span>
                    <span className="text-green-700 font-semibold">{row.db}</span>
                  </div>
                ))}
              </div>
              <div className="grid grid-cols-4 gap-2 text-xs text-slate-400 mt-1 px-2">
                <span>Conversion</span><span>Transactions</span><span>Retail Value</span><span>DB Revenue</span>
              </div>
            </div>
          </div>
          <div className="flex flex-col gap-4">
            <div className="bg-slate-800 text-white rounded-2xl p-6 flex-1">
              <h3 className="font-bold text-white mb-4">The DutyBoost Proposition</h3>
              <div className="space-y-4">
                {[
                  { from: "Retailers wait for passengers", to: "Passengers arrive with purchase intent" },
                  { from: "Impulse-driven shopping", to: "Pre-activated economic incentive" },
                  { from: "Travel Partners earn nothing from retail", to: "Travel Partners earn ancillary revenue" },
                  { from: "POS is cost centre only", to: "POS participates in shared revenue" },
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
              <div className="text-sm font-semibold opacity-80 mb-1">The Core Insight</div>
              <p className="text-lg font-bold leading-snug">
                "Is earning €87.50 from an incremental €100 retail sale — without any upfront acquisition cost — more valuable than earning €0 from a traveller who otherwise wouldn't have converted?"
              </p>
              <p className="text-sm mt-2 opacity-80">Yes. Every time.</p>
            </div>
          </div>
        </div>
      </div>
    </SlideWrapper>
  );
}

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
            <div className="bg-slate-800 text-white rounded-2xl p-6 mb-4">
              <h3 className="font-bold text-white text-lg mb-4">The DutyCredit Tier Structure</h3>
              <div className="space-y-1.5 text-sm">
                {[
                  { tier: "Entry", range: "€20–€49", disc: "5%–7.5%", save: "€1.00–€3.19" },
                  { tier: "Boarding", range: "€50–€99", disc: "7.5%–10%", save: "€3.75–€9.41" },
                  { tier: "Standard", range: "€100–€149", disc: "10%–12.5%", save: "€10.00–€18.25" },
                  { tier: "Plus", range: "€150–€199", disc: "12.5%–15%", save: "€18.75–€29.04" },
                  { tier: "Lounge", range: "€200–€249", disc: "15%–17.5%", save: "€30.00–€42.75" },
                  { tier: "Premium", range: "€250–€299", disc: "17.5%–20%", save: "€43.75–€57.00" },
                  { tier: "VIP", range: "€300+", disc: "20% capped", save: "Up to €60" },
                ].map((row, i) => (
                  <div key={i} className={`grid grid-cols-4 gap-2 py-1.5 px-2 rounded-lg text-xs ${i === 2 ? "bg-blue-800/60" : "hover:bg-white/5"}`}>
                    <span className="text-blue-300 font-semibold">{row.tier}</span>
                    <span className="text-slate-300">{row.range}</span>
                    <span className="text-yellow-300">{row.disc}</span>
                    <span className="text-green-300 font-semibold">{row.save}</span>
                  </div>
                ))}
                <div className="grid grid-cols-4 gap-2 text-xs text-slate-500 mt-1 px-2">
                  <span>Tier</span><span>Basket</span><span>Discount</span><span>Traveller Saves</span>
                </div>
              </div>
            </div>
          </div>
          <div className="flex flex-col gap-4">
            <div className="bg-blue-50 border border-blue-200 rounded-2xl p-5">
              <h3 className="font-bold text-blue-900 mb-3">Platform Fee Allocation (2.5% of Original Retail Value)</h3>
              <div className="space-y-2">
                {[
                  { party: "Travel Partner", share: "20% of fee", pct: "0.50%", val: "€0.50", color: "blue", bg: "bg-blue-200" },
                  { party: "Enterprise POS Partner", share: "10% of fee", pct: "0.25%", val: "€0.25", color: "indigo", bg: "bg-indigo-200" },
                  { party: "DutyBoost", share: "70% of fee", pct: "1.75%", val: "€1.75", color: "violet", bg: "bg-violet-200" },
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
            <div className="bg-green-50 border border-green-200 rounded-2xl p-5">
              <h3 className="font-bold text-green-900 mb-2">At 1 Million €100 Transactions:</h3>
              <div className="space-y-1.5 text-sm">
                {[
                  { party: "Travellers", val: "€10M in savings" },
                  { party: "Travel Partners", val: "€500,000 ancillary revenue" },
                  { party: "POS Partners", val: "€250,000 transaction revenue" },
                  { party: "DutyBoost", val: "€1.75M infrastructure revenue" },
                  { party: "Retailers", val: "€87.5M net before costs" },
                ].map((row) => (
                  <div key={row.party} className="flex justify-between">
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

function SlideTransaction() {
  return (
    <SlideWrapper dark>
      <div className="flex-1 flex flex-col justify-center px-5 py-6 md:px-12 md:py-6 relative">
        <div className="absolute inset-0 opacity-5"
          style={{
            backgroundImage: "linear-gradient(rgba(59,130,246,0.4) 1px, transparent 1px), linear-gradient(90deg, rgba(59,130,246,0.4) 1px, transparent 1px)",
            backgroundSize: "40px 40px"
          }}
        />
        <div className="relative z-10">
          <div className="mb-6">
            <span className="text-blue-400 text-sm font-semibold uppercase tracking-widest">One Transaction — Five Beneficiaries</span>
            <h2 className="text-xl md:text-3xl font-heading font-bold text-white mt-2">
              €100 Original Qualifying Retail Value
            </h2>
          </div>
          <div className="grid grid-cols-2 sm:grid-cols-5 gap-3 mb-6">
            {[
              { party: "Traveller", Icon: TravelerIcon, value: "€10.00", sub: "DutyCredit saving (10%)", color: "green", bg: "bg-green-900/30", border: "border-green-500/30" },
              { party: "Airport Retailer", Icon: AirportRetailerIcon, value: "€87.50", sub: "Net before normal costs (87.5%)", color: "blue", bg: "bg-blue-900/30", border: "border-blue-500/30" },
              { party: "Travel Partner", Icon: TravelAgencyIcon, value: "€0.50", sub: "Ancillary revenue (0.5%)", color: "yellow", bg: "bg-yellow-900/30", border: "border-yellow-500/30" },
              { party: "POS Partner", Icon: Cpu, value: "€0.25", sub: "Transaction revenue (0.25%)", color: "purple", bg: "bg-purple-900/30", border: "border-purple-500/30" },
              { party: "DutyBoost", Icon: BarChart3, value: "€1.75", sub: "Infrastructure revenue (1.75%)", color: "orange", bg: "bg-orange-900/30", border: "border-orange-500/30" },
            ].map((p) => (
              <div key={p.party} className={`${p.bg} border ${p.border} rounded-2xl p-4 text-center`}>
                <p.Icon className={`w-9 h-9 mx-auto mb-2 text-${p.color}-400`} />
                <div className="text-white font-semibold text-sm mb-2">{p.party}</div>
                <div className={`text-2xl font-bold text-${p.color}-400 mb-1`}>{p.value}</div>
                <div className="text-slate-400 text-xs leading-snug">{p.sub}</div>
              </div>
            ))}
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            <div className="bg-white/5 border border-white/10 rounded-2xl p-5">
              <div className="text-slate-400 text-xs uppercase tracking-wide mb-2">Total = €100.00</div>
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
                  { color: "bg-yellow-500", label: "Travel Partner 0.5%" },
                  { color: "bg-purple-500", label: "POS 0.25%" },
                  { color: "bg-orange-500", label: "DutyBoost 1.75%" },
                ].map((l) => (
                  <div key={l.label} className="flex items-center gap-1.5">
                    <div className={`w-3 h-3 rounded-sm ${l.color}`} />
                    <span className="text-slate-400">{l.label}</span>
                  </div>
                ))}
              </div>
            </div>
            <div className="bg-gradient-to-br from-blue-900/60 to-indigo-900/60 border border-blue-500/30 rounded-2xl p-5">
              <h3 className="text-white font-bold mb-3">Integrate Once. Deploy Repeatedly.</h3>
              <p className="text-slate-300 text-sm leading-relaxed">
                A single Enterprise POS integration can enable DutyBoost across multiple retailers, stores, airports and geographic markets — creating fundamentally better scaling economics than building individual integrations per retailer.
              </p>
              <div className="mt-3 text-blue-300 font-semibold text-sm">
                Technology strategy: INTEGRATE ONCE. DEPLOY REPEATEDLY.
              </div>
            </div>
          </div>
        </div>
      </div>
    </SlideWrapper>
  );
}

function SlideFlywheel() {
  const steps = [
    "More Travel Partners",
    "More Travellers Reached",
    "More DutyCredits Distributed",
    "More Traveller Incentives",
    "More Pre-Airport Activation",
    "More Participating Retail Visits",
    "More Retail Conversion",
    "More Validated Transactions",
    "More Retailer Revenue",
    "More Travel Partner Revenue",
    "More DutyBoost Revenue",
    "More Evidence of Commercial Value",
    "Stronger Partner Adoption",
    "Greater Network Scale",
  ];

  return (
    <SlideWrapper dark>
      <div className="flex-1 flex flex-col justify-center px-5 py-6 md:px-12 md:py-6 relative">
        <div className="absolute inset-0 opacity-5"
          style={{
            backgroundImage: "linear-gradient(rgba(59,130,246,0.4) 1px, transparent 1px), linear-gradient(90deg, rgba(59,130,246,0.4) 1px, transparent 1px)",
            backgroundSize: "40px 40px"
          }}
        />
        <div className="relative z-10">
          <div className="mb-6">
            <span className="text-blue-400 text-sm font-semibold uppercase tracking-widest">The Growth Flywheel</span>
            <h2 className="text-xl md:text-3xl font-heading font-bold text-white mt-2">
              A Self-Reinforcing <span className="text-blue-400">Circular Ecosystem</span>
            </h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8 items-center">
            <div className="relative flex items-center justify-center" style={{ height: "340px" }}>
              {/* Outer ring */}
              <div className="absolute inset-0 rounded-full border-2 border-blue-500/20" />
              {/* Center */}
              <div className="bg-blue-900/60 border-2 border-blue-500/50 rounded-full w-28 h-28 flex flex-col items-center justify-center text-center z-10">
                <div className="text-white text-xs font-bold leading-tight px-2">Circular Revenue Infrastructure</div>
              </div>
              {/* Steps around circle */}
              {steps.slice(0, 8).map((step, i) => {
                const angle = (i / 8) * 360 - 90;
                const rad = (angle * Math.PI) / 180;
                const r = 145;
                const x = 50 + (r / 3.4) * Math.cos(rad);
                const y = 50 + (r / 3.4) * Math.sin(rad);
                return (
                  <div
                    key={i}
                    className="absolute bg-blue-900/60 border border-blue-500/40 rounded-lg px-2 py-1 text-center"
                    style={{
                      left: `${x}%`,
                      top: `${y}%`,
                      transform: "translate(-50%, -50%)",
                      maxWidth: "90px",
                    }}
                  >
                    <div className="text-blue-300 text-xs font-semibold leading-tight">{step}</div>
                  </div>
                );
              })}
              {/* Arrows */}
              <div className="absolute inset-0 rounded-full border-2 border-dashed border-blue-500/30 animate-spin" style={{ animationDuration: "30s" }} />
            </div>
            <div className="space-y-4">
              <div className="bg-white/5 border border-white/10 rounded-2xl p-5">
                <h3 className="text-white font-bold mb-3">Network Effects by Participant</h3>
                <div className="space-y-2.5 text-sm">
                  {[
                    { Icon: TravelAgencyIcon, party: "More Travel Partners", effect: "→ More travellers reached before airport arrival" },
                    { Icon: AirportRetailerIcon, party: "More Retailers", effect: "→ More DutyCredit redemption opportunities" },
                    { Icon: Cpu, party: "More POS Integrations", effect: "→ More deployment capacity" },
                    { Icon: BarChart3, party: "More Transactions", effect: "→ Stronger commercial evidence" },
                    { Icon: Link2, party: "Stronger Evidence", effect: "→ Easier future partner acquisition" },
                  ].map((row) => (
                    <div key={row.party} className="flex items-start gap-2">
                      <row.Icon className="w-4 h-4 text-blue-400 mt-0.5 flex-shrink-0" />
                      <div>
                        <span className="text-blue-300 font-semibold">{row.party} </span>
                        <span className="text-slate-400">{row.effect}</span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
              <div className="bg-gradient-to-br from-blue-900/60 to-indigo-900/60 border border-blue-500/30 rounded-2xl p-5">
                <p className="text-blue-200 font-bold text-lg leading-snug">
                  "A positive flywheel that creates growth for every stakeholder."
                </p>
                <p className="text-slate-400 text-sm mt-2">Each new partner makes the platform more valuable for every existing partner.</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </SlideWrapper>
  );
}

function SlideFinancials() {
  return (
    <SlideWrapper>
      <div className="flex-1 flex flex-col justify-center px-12 py-6">
        <div className="mb-6">
          <span className="text-blue-600 text-sm font-semibold uppercase tracking-widest">Financial Projections</span>
          <h2 className="text-xl md:text-3xl font-heading font-bold text-[#0a0f1e] mt-2">
            Five-Year Base Case — <span className="text-blue-600">Positive EBITDA in Year 3</span>
          </h2>
        </div>
        <div className="overflow-x-auto mb-5">
          <table className="w-full text-sm border-collapse">
            <thead>
              <tr className="bg-slate-800 text-white">
                <th className="text-left px-4 py-3 rounded-tl-xl font-semibold">Metric</th>
                {["Year 1", "Year 2", "Year 3", "Year 4", "Year 5"].map((y, i) => (
                  <th key={y} className={`text-right px-4 py-3 font-semibold ${i === 4 ? "rounded-tr-xl" : ""} ${i === 2 ? "bg-blue-700" : ""}`}>{y}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {[
                { label: "Travellers Reached", vals: ["1M", "8M", "30M", "80M", "180M"], highlight: false },
                { label: "Validated Transactions", vals: ["30K", "320K", "1.5M", "4.8M", "12.6M"], highlight: false },
                { label: "Original Retail Value", vals: ["€3.0M", "€32M", "€150M", "€480M", "€1.26B"], highlight: false },
                { label: "Traveller Savings", vals: ["€300K", "€3.2M", "€15M", "€48M", "€126M"], highlight: false },
                { label: "DutyBoost Revenue", vals: ["€52.5K", "€560K", "€2.625M", "€8.4M", "€22.05M"], highlight: true },
                { label: "Operating Expenses", vals: ["€320K", "€570K", "€1.20M", "€2.80M", "€5.50M"], highlight: false },
                { label: "EBITDA", vals: ["-€269.9K", "-€32.4K", "€1.335M", "€5.36M", "€16.046M"], highlight: true },
                { label: "EBITDA Margin", vals: ["—", "—", "50.9%", "63.8%", "72.8%"], highlight: false },
              ].map((row, i) => (
                <tr key={row.label} className={`border-b border-slate-100 ${row.highlight ? "bg-blue-50" : i % 2 === 0 ? "bg-slate-50" : "bg-white"}`}>
                  <td className="px-4 py-2.5 text-slate-700 font-medium">{row.label}</td>
                  {row.vals.map((v, j) => (
                    <td key={j} className={`px-4 py-2.5 text-right ${row.highlight ? "font-bold text-blue-700" : "text-slate-600"} ${j === 2 ? "bg-blue-100" : ""}`}>{v}</td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="bg-green-50 border border-green-200 rounded-xl p-4 text-center">
            <div className="text-2xl font-bold text-green-700">~710K</div>
            <div className="text-sm text-green-600 font-semibold">Annual Break-Even Transactions</div>
            <div className="text-xs text-slate-500 mt-1">Year 3 forecast: 1.5M (2x break-even)</div>
          </div>
          <div className="bg-blue-50 border border-blue-200 rounded-xl p-4 text-center">
            <div className="text-2xl font-bold text-blue-700">€33.69M</div>
            <div className="text-sm text-blue-600 font-semibold">5-Year Cumulative Revenue</div>
            <div className="text-xs text-slate-500 mt-1">19.25M validated transactions</div>
          </div>
          <div className="bg-violet-50 border border-violet-200 rounded-xl p-4 text-center">
            <div className="text-2xl font-bold text-violet-700">72.8%</div>
            <div className="text-sm text-violet-600 font-semibold">Year 5 EBITDA Margin</div>
            <div className="text-xs text-slate-500 mt-1">Infrastructure platform economics</div>
          </div>
        </div>
      </div>
    </SlideWrapper>
  );
}

function SlideFunding() {
  return (
    <SlideWrapper>
      <div className="flex-1 flex flex-col justify-center px-12 py-6">
        <div className="mb-6">
          <span className="text-blue-600 text-sm font-semibold uppercase tracking-widest">Funding & Use of Capital</span>
          <h2 className="text-xl md:text-3xl font-heading font-bold text-[#0a0f1e] mt-2">
            €500,000 Seed Round — <span className="text-blue-600">From Development to Live Deployment</span>
          </h2>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <div className="bg-slate-800 text-white rounded-2xl p-6 mb-4">
              <h3 className="font-bold mb-4">Use of Funds</h3>
              <div className="space-y-3">
                {[
                  { label: "Platform & Product Development", amount: "€150,000", pct: 30, color: "bg-blue-500" },
                  { label: "Enterprise POS Integrations", amount: "€100,000", pct: 20, color: "bg-indigo-500" },
                  { label: "Commercial Partnerships & Rollout", amount: "€90,000", pct: 18, color: "bg-violet-500" },
                  { label: "Legal, Privacy, Cybersecurity & IP", amount: "€55,000", pct: 11, color: "bg-purple-500" },
                  { label: "Traveller Activation & Campaigns", amount: "€45,000", pct: 9, color: "bg-pink-500" },
                  { label: "Operations, Finance & Settlement", amount: "€30,000", pct: 6, color: "bg-rose-500" },
                  { label: "Working Capital & Contingency", amount: "€30,000", pct: 6, color: "bg-red-500" },
                ].map((item) => (
                  <div key={item.label} className="space-y-1">
                    <div className="flex justify-between text-sm">
                      <span className="text-slate-300">{item.label}</span>
                      <span className="text-white font-semibold">{item.amount}</span>
                    </div>
                    <div className="bg-white/10 rounded-full h-1.5">
                      <div className={`${item.color} h-1.5 rounded-full`} style={{ width: `${item.pct * 3}%` }} />
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
          <div className="flex flex-col gap-4">
            <div className="bg-blue-50 border border-blue-200 rounded-2xl p-5">
              <h3 className="font-bold text-blue-900 mb-3">Priority Milestones with This Capital</h3>
              <div className="space-y-2.5">
                {[
                  { n: "1", label: "Production-ready MVP", desc: "Stable DutyCredit issuance, validation & reporting" },
                  { n: "2", label: "First Enterprise POS Integration", desc: "Reusable pathway to multiple retailers" },
                  { n: "3", label: "First Airport Retailer Pilot", desc: "Live qualifying DutyBoost transactions" },
                  { n: "4", label: "First Travel Partner Launch", desc: "Real travellers receiving DutyCredits" },
                  { n: "5", label: "First Validated Redemption", desc: "End-to-end commercial workflow proven" },
                  { n: "6", label: "First Settlement Cycle", desc: "Multi-party allocation & reconciliation" },
                ].map((m) => (
                  <div key={m.n} className="flex items-start gap-3">
                    <div className="w-6 h-6 rounded-full bg-blue-600 flex items-center justify-center text-white text-xs font-bold flex-shrink-0 mt-0.5">{m.n}</div>
                    <div>
                      <div className="text-sm font-semibold text-blue-900">{m.label}</div>
                      <div className="text-xs text-slate-500">{m.desc}</div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
            <div className="bg-amber-50 border border-amber-300 rounded-2xl p-4">
              <p className="text-amber-800 text-sm font-semibold">
                Capital is intended to finance measurable proof rather than premature organisational expansion. Milestone-based recruitment only.
              </p>
            </div>
          </div>
        </div>
      </div>
    </SlideWrapper>
  );
}

function SlideInvestment() {
  return (
    <SlideWrapper dark>
      <div className="flex-1 flex flex-col justify-center px-5 py-6 md:px-12 md:py-6 relative">
        <div className="absolute inset-0 opacity-5"
          style={{
            backgroundImage: "linear-gradient(rgba(59,130,246,0.4) 1px, transparent 1px), linear-gradient(90deg, rgba(59,130,246,0.4) 1px, transparent 1px)",
            backgroundSize: "40px 40px"
          }}
        />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[700px] rounded-full opacity-5"
          style={{ background: "radial-gradient(circle, #3b82f6 0%, transparent 70%)" }}
        />
        <div className="relative z-10">
          <div className="mb-6">
            <span className="text-blue-400 text-sm font-semibold uppercase tracking-widest">Investment Case</span>
            <h2 className="text-xl md:text-3xl font-heading font-bold text-white mt-2">
              Four Layers. <span className="text-blue-400">One Opportunity.</span>
            </h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-5 mb-6">
            {[
              {
                n: "1",
                layer: "Existing Market",
                headline: "+/- €37.1 Billion",
                body: "Estimated global Airport Duty-Free & Travel Retail market — already established, already generating revenue.",
                color: "blue",
              },
              {
                n: "2",
                layer: "Conversion Headroom",
                headline: "73% Non-Ticket Exposure",
                body: "Avolta's 2025 benchmark: 2.5B passenger exposure with only 27% penetration. 1.82B non-purchasing travellers represent untapped headroom.",
                color: "indigo",
              },
              {
                n: "3",
                layer: "Traveller Incentive",
                headline: "€1 – €60 Direct Value",
                body: "DutyBoost provides measurable, direct financial value to the traveller — not abstract loyalty points. A compelling economic reason to engage.",
                color: "violet",
              },
              {
                n: "4",
                layer: "Pre-Airport Activation",
                headline: "Upstream Influence",
                body: "Travellers reached via airlines, OTAs, hotels, car rentals — before they arrive at the airport. The commercial journey starts earlier.",
                color: "purple",
              },
            ].map((l) => (
              <div key={l.n} className={`bg-${l.color}-900/30 border border-${l.color}-500/30 rounded-2xl p-5`}>
                <div className="flex items-start gap-3">
                  <div className={`w-8 h-8 rounded-full bg-${l.color}-600 flex items-center justify-center text-white text-sm font-bold flex-shrink-0`}>{l.n}</div>
                  <div>
                    <div className={`text-${l.color}-400 text-xs uppercase tracking-wide mb-0.5`}>Layer {l.n} — {l.layer}</div>
                    <div className="text-white font-bold text-lg mb-1">{l.headline}</div>
                    <div className="text-slate-400 text-sm leading-relaxed">{l.body}</div>
                  </div>
                </div>
              </div>
            ))}
          </div>
          <div className="bg-gradient-to-r from-blue-900/60 via-indigo-900/60 to-violet-900/60 border border-blue-500/30 rounded-2xl p-6">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-3 text-center mb-4">
              {[
                { label: "Seed Ask", val: "€500K" },
                { label: "Break-Even (Year 3)", val: "710K txns" },
                { label: "Year 5 Revenue", val: "€22.05M" },
                { label: "Year 5 EBITDA", val: "€16.05M" },
              ].map((s) => (
                <div key={s.label}>
                  <div className="text-2xl font-bold text-blue-300">{s.val}</div>
                  <div className="text-slate-400 text-xs mt-1">{s.label}</div>
                </div>
              ))}
            </div>
            <div className="text-center">
              <p className="text-white text-xl font-bold">
                The traveller already travels. The retailer already sells. The POS already processes. The Travel Partner already communicates.
              </p>
              <p className="text-blue-400 text-2xl font-bold mt-2">DutyBoost connects the value.</p>
            </div>
          </div>
        </div>
      </div>
    </SlideWrapper>
  );
}

const SLIDE_COMPONENTS = {
  cover: SlideCover,
  problem: SlideProblem,
  solution: SlideSolution,
  market: SlideMarket,
  conversion: SlideConversion,
  model: SlideModel,
  transaction: SlideTransaction,
  flywheel: SlideFlywheel,
  financials: SlideFinancials,
  funding: SlideFunding,
  investment: SlideInvestment,
};

const SLIDE_LABELS = {
  cover: "Cover",
  problem: "The Problem",
  solution: "The Solution",
  market: "Market Opportunity",
  conversion: "Conversion Opportunity",
  model: "Business Model",
  transaction: "Transaction Economics",
  flywheel: "Growth Flywheel",
  financials: "Financials",
  funding: "Funding Ask",
  investment: "Investment Case",
};

export default function InvestorPitchDeck() {
  const [current, setCurrent] = useState(0);

  const prev = () => setCurrent((c) => Math.max(0, c - 1));
  const next = () => setCurrent((c) => Math.min(SLIDES.length - 1, c + 1));

  const slide = SLIDES[current];
  const SlideComp = SLIDE_COMPONENTS[slide.type];

  return (
    <div className="min-h-screen bg-[#050a14] flex flex-col items-center justify-start lg:justify-center p-3 py-2">
      {/* Header nav */}
      <div className="w-full max-w-[1400px] flex items-center justify-between mb-2">
        <div className="text-white text-sm font-semibold opacity-60">
          DutyBoost — Investor Pitch Deck 2026 <span className="text-xs opacity-50 ml-2 hidden sm:inline">CONFIDENTIAL</span>
        </div>
        <div className="text-slate-400 text-sm">
          {current + 1} / {SLIDES.length}
        </div>
      </div>

      {/* Slide area */}
      <div className="w-full max-w-[1400px] flex rounded-2xl overflow-hidden shadow-2xl border border-white/10 min-h-[58vh] lg:h-[calc(100vh-150px)]">
        <SlideComp />
      </div>

      {/* Controls */}
      <div className="w-full max-w-[1400px] flex flex-wrap items-center justify-between gap-3 mt-3">
        <button
          onClick={prev}
          disabled={current === 0}
          className="flex items-center gap-2 px-6 py-3.5 rounded-xl bg-white/10 text-white hover:bg-white/20 disabled:opacity-30 disabled:cursor-not-allowed transition-colors text-base font-semibold cursor-pointer select-none"
        >
          <ChevronLeft size={18} /> Previous
        </button>

        {/* Slide thumbnails */}
        <div className="flex gap-1.5 flex-wrap justify-center max-w-lg">
          {SLIDES.map((s, i) => (
            <button
              key={s.id}
              onClick={() => setCurrent(i)}
              title={SLIDE_LABELS[s.type]}
              className={`text-xs px-3 py-1 rounded-lg transition-all font-medium ${
                i === current
                  ? "bg-blue-600 text-white"
                  : "bg-white/10 text-slate-400 hover:bg-white/20 hover:text-white"
              }`}
            >
              {i + 1}
            </button>
          ))}
        </div>

        <button
          onClick={next}
          disabled={current === SLIDES.length - 1}
          className="flex items-center gap-2 px-6 py-3.5 rounded-xl bg-blue-600 text-white hover:bg-blue-700 disabled:opacity-30 disabled:cursor-not-allowed transition-colors text-base font-semibold cursor-pointer select-none"
        >
          Next <ChevronRight size={18} />
        </button>
      </div>

      {/* Slide label */}
      <div className="mt-1.5 text-slate-500 text-sm">
        {SLIDE_LABELS[slide.type]}
      </div>
    </div>
  );
}