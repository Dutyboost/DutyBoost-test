import { useState, useEffect, useRef } from "react";
import { ChevronLeft, ChevronRight, ArrowRight, Cpu, Store, TrendingUp, CheckCircle, BarChart3, Plug, Layers, ShieldCheck, Globe } from "lucide-react";
import DutyBoostLogo from "@/components/DutyBoostLogo";

const SLIDES = [
  { id: "cover", type: "cover" },
  { id: "opportunity", type: "opportunity" },
  { id: "problem", type: "problem" },
  { id: "solution", type: "solution" },
  { id: "howItWorks", type: "howItWorks" },
  { id: "economics", type: "economics" },
  { id: "scale", type: "scale" },
  { id: "benefits", type: "benefits" },
  { id: "integrate", type: "integrate" },
  { id: "getStarted", type: "getStarted" },
];

const SLIDE_LABELS = {
  cover: "Cover",
  opportunity: "The Opportunity",
  problem: "The Problem",
  solution: "The Solution",
  howItWorks: "How It Works",
  economics: "Transaction Economics",
  scale: "Revenue at Scale",
  benefits: "Strategic Benefits",
  integrate: "Integration Simplicity",
  getStarted: "Value Realized Quickly",
};

function SlideWrapper({ children, dark = false }) {
  return (
    <div className={`w-full flex flex-col overflow-y-auto lg:overflow-hidden ${dark ? "bg-[#0a0f1e] text-white" : "bg-white text-[#0a0f1e]"}`}>
      {children}
    </div>
  );
}

function GridBg() {
  return (
    <div className="absolute inset-0 opacity-5" style={{
      backgroundImage: "linear-gradient(rgba(124,58,237,0.4) 1px, transparent 1px), linear-gradient(90deg, rgba(124,58,237,0.4) 1px, transparent 1px)",
      backgroundSize: "40px 40px"
    }} />
  );
}

// SLIDE 1: Cover
function SlideCover() {
  return (
    <SlideWrapper dark>
      <div className="flex-1 flex flex-col items-center justify-center px-6 md:px-16 text-center relative">
        <GridBg />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] rounded-full opacity-10"
          style={{ background: "radial-gradient(circle, #7c3aed 0%, transparent 70%)" }} />
        <div className="relative z-10 flex flex-col items-center gap-8 lg:gap-16">
          <div className="bg-white rounded-2xl px-8 py-4 shadow-2xl">
            <DutyBoostLogo height={50} linkTo="/pos-partner" />
          </div>
          <div>
            <h1 className="text-3xl md:text-5xl lg:text-6xl font-heading font-bold text-white leading-tight mb-4">
              One Integration.<br />
              <span className="text-violet-400">Recurring Revenue. Zero Risk.</span>
            </h1>
            <p className="text-xl lg:text-2xl text-slate-300 max-w-3xl leading-relaxed">
              A presentation for Point-of-Sale Providers serving Airport & Travel Retail
            </p>
          </div>
          <div className="flex flex-wrap items-start justify-center gap-x-6 sm:gap-x-12 lg:gap-x-16 gap-y-4 mt-4 w-full max-w-xl lg:max-w-4xl">
            {[
              { label: "POS Commission", value: "0.25%" },
              { label: "Cost Model", value: "Performance" },
              { label: "Setup Fee", value: "€0" },
            ].map((s) => (
              <div key={s.label} className="flex flex-col items-center text-center">
                <div className="text-xl sm:text-3xl lg:text-5xl font-bold text-violet-400 whitespace-nowrap">{s.value}</div>
                <div className="text-xs sm:text-sm lg:text-lg text-slate-400 mt-1 whitespace-nowrap">{s.label}</div>
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

// SLIDE 2: The Opportunity
function SlideOpportunity() {
  return (
    <SlideWrapper dark>
      <div className="flex-1 flex flex-col justify-center px-5 py-6 md:px-12 md:py-6 relative">
        <GridBg />
        <div className="relative z-10">
          <div className="mb-5 lg:mb-10">
            <span className="text-violet-400 text-sm font-semibold uppercase tracking-widest">The Opportunity</span>
            <h2 className="text-xl md:text-3xl lg:text-4xl font-heading font-bold text-white mt-2">
              9.8B Passengers. 90–95% Never Buy.<br /><span className="text-violet-400">Your Retailers Want Incremental Sales.</span>
            </h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-5 lg:gap-7 mb-5 lg:mb-8">
            {[
              { val: "9.8B", label: "Global passenger movements in 2025", sub: "ACI World — audience already in transit" },
              { val: "5–10%", label: "Global duty-free conversion rate", sub: "Only 5–10% of travellers buy (Kearney / TFWA)" },
              { val: "~8.8B", label: "Non-purchasing passengers annually", sub: "Untapped incremental revenue pool" },
            ].map((s) => (
              <div key={s.label} className="bg-white/5 border border-white/10 rounded-2xl p-5 lg:p-7">
                <div className="text-3xl md:text-4xl lg:text-5xl font-bold text-violet-400 mb-2">{s.val}</div>
                <div className="text-white font-semibold text-sm lg:text-base">{s.label}</div>
                <div className="text-slate-400 text-xs lg:text-sm mt-1">{s.sub}</div>
              </div>
            ))}
          </div>
          <div className="bg-gradient-to-br from-violet-900/40 to-indigo-900/40 border border-violet-500/30 rounded-2xl p-5 lg:p-7">
            <h3 className="text-white font-bold text-lg mb-3">The POS Provider Position</h3>
            <p className="text-slate-300 text-sm lg:text-base leading-relaxed">
              POS providers already sit at the transaction layer of travel retail — the exact point where incremental conversion is validated and attributed. By enabling DutyBoost, a POS provider turns its existing infrastructure into a new, recurring, performance-based revenue stream while delivering measurable incremental sales to every retailer it serves.
            </p>
          </div>
        </div>
      </div>
    </SlideWrapper>
  );
}

// SLIDE 3: The Problem
function SlideProblem() {
  return (
    <SlideWrapper>
      <div className="flex-1 flex flex-col justify-center px-5 py-6 md:px-12 md:py-6">
        <div className="mb-5">
          <span className="text-violet-600 text-sm font-semibold uppercase tracking-widest">The Problem</span>
          <h2 className="text-xl md:text-3xl font-heading font-bold text-[#0a0f1e] mt-2">
            POS Providers Are <span className="text-violet-600">Commoditized & Under Pressure</span>
          </h2>
          <p className="text-slate-500 mt-1 text-sm">Transaction processing is increasingly seen as a utility. Retailers want more than uptime — they want commercial outcomes.</p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5 mb-5">
          <div className="bg-red-50 border border-red-200 rounded-2xl p-5">
            <h3 className="font-bold text-red-900 mb-3">What POS Providers Hear Today</h3>
            <ul className="space-y-2.5 text-sm">
              {[
                "“Processing is a commodity — what else can you do for us?”",
                "“We need more footfall conversion, not just faster checkout.”",
                "“Your competitors offer loyalty modules. What do you offer?”",
                "“Margins are tight — we can’t justify paying more for POS.”",
                "“Show us incremental revenue, not just transaction speed.”",
              ].map((item, i) => (
                <li key={i} className="flex items-start gap-2">
                  <div className="w-1.5 h-1.5 rounded-full bg-red-500 mt-2 flex-shrink-0" />
                  <span className="text-red-800">{item}</span>
                </li>
              ))}
            </ul>
          </div>
          <div className="bg-slate-50 border border-slate-200 rounded-2xl p-5">
            <h3 className="font-bold text-slate-900 mb-3">The Structural Gap</h3>
            <ul className="space-y-3 text-sm">
              {[
                { t: "Price competition", d: "Retailers benchmark POS providers on cost per transaction alone." },
                { t: "No commercial upside", d: "Processing fees flow one way — the POS provider earns nothing from the sale growing." },
                { t: "Weak differentiation", d: "Feature parity across providers makes switching feel low-risk to retailers." },
                { t: "Churn pressure", d: "Without measurable added value, contract renewals become negotiations on price." },
              ].map((row, i) => (
                <li key={i} className="flex items-start gap-3">
                  <div className="w-7 h-7 rounded-full bg-violet-100 text-violet-700 flex items-center justify-center text-xs font-bold flex-shrink-0">{i + 1}</div>
                  <div>
                    <div className="font-semibold text-slate-900">{row.t}</div>
                    <div className="text-slate-600 text-xs">{row.d}</div>
                  </div>
                </li>
              ))}
            </ul>
          </div>
        </div>
        <div className="bg-slate-800 text-white rounded-2xl p-5">
          <p className="text-slate-200 text-sm leading-relaxed">
            The opportunity is not to build another loyalty feature — it is to <span className="text-violet-300 font-semibold">connect the POS layer to a pre-arrival activation engine</span> that creates incremental sales the POS provider can validate, attribute and earn from.
          </p>
        </div>
      </div>
    </SlideWrapper>
  );
}

// SLIDE 4: The Solution
function SlideSolution() {
  return (
    <SlideWrapper dark>
      <div className="flex-1 flex flex-col justify-center px-5 py-6 md:px-12 md:py-6 relative">
        <GridBg />
        <div className="relative z-10">
          <div className="mb-5 lg:mb-10">
            <span className="text-violet-400 text-sm font-semibold uppercase tracking-widest">The Solution</span>
            <h2 className="text-xl md:text-3xl lg:text-4xl font-heading font-bold text-white mt-2">
              Become the Activation Layer<br /><span className="text-violet-400">for Travel Retail</span>
            </h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 lg:gap-8">
            <div className="space-y-4">
              <div className="bg-white/5 border border-white/10 rounded-2xl p-5 lg:p-7">
                <h3 className="text-white font-bold text-base lg:text-lg mb-3">What DutyBoost Does for the POS Provider</h3>
                <div className="space-y-3">
                  {[
                    { from: "POS earns only processing fees", to: "POS earns a share of every validated sale" },
                    { from: "Commoditized transaction utility", to: "Incremental-revenue enabler" },
                    { from: "Retailers negotiate on price", to: "Retailers gain measurable new sales" },
                    { from: "Feature parity with competitors", to: "A defensible commercial differentiator" },
                  ].map((row, i) => (
                    <div key={i} className="grid grid-cols-[1fr,auto,1fr] gap-2 items-center text-xs">
                      <span className="text-red-300 bg-red-900/30 rounded px-2 py-1 text-center">{row.from}</span>
                      <ArrowRight size={12} className="text-violet-400 flex-shrink-0" />
                      <span className="text-green-300 bg-green-900/30 rounded px-2 py-1 text-center">{row.to}</span>
                    </div>
                  ))}
                </div>
              </div>
              <div className="bg-gradient-to-br from-violet-900/50 to-indigo-900/50 border border-violet-500/30 rounded-2xl p-5 lg:p-7">
                <div className="grid grid-cols-3 gap-4 lg:gap-6 text-center">
                  {[
                    { val: "0.25%", label: "POS commission per sale" },
                    { val: "10%", label: "Share of platform fee" },
                    { val: "€0", label: "Setup or licence cost" },
                  ].map((s) => (
                    <div key={s.label}>
                      <div className="text-lg md:text-xl lg:text-2xl font-bold text-violet-300 whitespace-nowrap">{s.val}</div>
                      <div className="text-slate-400 text-xs lg:text-sm mt-1">{s.label}</div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
            <div className="bg-white/5 border border-white/10 rounded-2xl p-5 lg:p-7">
              <h3 className="text-white font-bold text-base lg:text-lg mb-4">The DutyBoost Flow at the POS</h3>
              <div className="flex flex-col gap-2 lg:gap-3">
                {[
                  { n: "1", step: "Traveller receives DutyCredit from a Travel Partner", color: "bg-violet-600" },
                  { n: "2", step: "Traveller arrives at a retailer store", color: "bg-violet-600" },
                  { n: "3", step: "Retailer rings up the basket on your POS", color: "bg-indigo-600" },
                  { n: "4", step: "POS validates the DutyCredit token", color: "bg-indigo-600" },
                  { n: "5", step: "Discount applied — transaction completed", color: "bg-blue-600" },
                  { n: "6", step: "DutyBoost attributes & reports the sale", color: "bg-blue-600" },
                  { n: "7", step: "2.5% platform fee split — POS earns 10%", color: "bg-green-600" },
                  { n: "8", step: "Recurring, performance-based revenue", color: "bg-green-600" },
                ].map((s) => (
                  <div key={s.n} className="flex items-center gap-3">
                    <div className={`w-6 h-6 lg:w-8 lg:h-8 rounded-full ${s.color} flex items-center justify-center text-white text-xs font-bold flex-shrink-0`}>{s.n}</div>
                    <span className="text-slate-300 text-sm lg:text-base">{s.step}</span>
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

// SLIDE 5: How It Works for the POS Provider
function SlideHowItWorks() {
  return (
    <SlideWrapper>
      <div className="flex-1 flex flex-col justify-center px-5 py-6 md:px-12 md:py-6">
        <div className="mb-5">
          <span className="text-violet-600 text-sm font-semibold uppercase tracking-widest">For the POS Provider</span>
          <h2 className="text-xl md:text-3xl font-heading font-bold text-[#0a0f1e] mt-2">
            Integrate Once. <span className="text-violet-600">Earn on Every Validated Sale.</span>
          </h2>
          <p className="text-slate-500 mt-1 text-sm">No subscription. No setup fee. No risk. You earn a 10% share of the 2.5% platform fee on every DutyBoost-validated transaction across your entire store network.</p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-5 mb-6">
          {[
            {
              icon: <Plug className="w-8 h-8 text-violet-600" />,
              title: "Integrate Once",
              desc: "Add a lightweight DutyBoost validation call to your existing POS workflow. No replacement of payment, inventory or ERP systems.",
              color: "violet",
            },
            {
              icon: <Cpu className="w-8 h-8 text-indigo-600" />,
              title: "Validate at the Point of Sale",
              desc: "Your POS confirms the DutyCredit token and applies the discount — you become the trusted validation layer for every sale.",
              color: "indigo",
            },
            {
              icon: <BarChart3 className="w-8 h-8 text-green-600" />,
              title: "Earn on Performance",
              desc: "A 10% share of the 2.5% platform fee is paid to you on every validated transaction — recurring, attributed and transparent.",
              color: "green",
            },
          ].map((card, i) => (
            <div key={i} className={`bg-${card.color}-50 border border-${card.color}-200 rounded-2xl p-5`}>
              <div className="mb-3">{card.icon}</div>
              <div className={`font-bold text-${card.color}-900 mb-2`}>{card.title}</div>
              <div className={`text-${card.color}-800 text-sm leading-relaxed`}>{card.desc}</div>
            </div>
          ))}
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          <div className="bg-slate-800 text-white rounded-2xl p-5">
            <h3 className="font-bold mb-3">What DutyBoost Is NOT for the POS Provider</h3>
            <div className="space-y-2 text-sm">
              {[
                ["❌", "A POS replacement or competing payment rail"],
                ["❌", "A loyalty programme you must build and maintain"],
                ["❌", "A coupon or voucher-code engine to operate"],
                ["❌", "An advertising product requiring upfront spend"],
                ["❌", "A subscription with monthly fees"],
              ].map(([icon, text], i) => (
                <div key={i} className="flex items-start gap-2">
                  <span>{icon}</span>
                  <span className="text-slate-300">{text}</span>
                </div>
              ))}
            </div>
          </div>
          <div className="bg-green-50 border border-green-200 rounded-2xl p-5">
            <h3 className="font-bold text-green-900 mb-3">What DutyBoost IS for the POS Provider</h3>
            <div className="space-y-2 text-sm">
              {[
                ["✅", "A performance-based revenue share on validated sales"],
                ["✅", "A pre-arrival activation engine for your retailers"],
                ["✅", "A defensible differentiator in contract renewals"],
                ["✅", "Transaction-level validation & transparent reporting"],
                ["✅", "A reusable integration across all markets you serve"],
              ].map(([icon, text], i) => (
                <div key={i} className="flex items-start gap-2">
                  <span>{icon}</span>
                  <span className="text-green-800">{text}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </SlideWrapper>
  );
}

// SLIDE 6: Transaction Economics
function SlideEconomics() {
  return (
    <SlideWrapper dark>
      <div className="flex-1 flex flex-col justify-center px-5 py-6 md:px-12 md:py-6 relative">
        <GridBg />
        <div className="relative z-10">
          <div className="mb-5">
            <span className="text-violet-400 text-sm font-semibold uppercase tracking-widest">Transaction Economics</span>
            <h2 className="text-xl md:text-3xl font-heading font-bold text-white mt-2">
              €100 Validated Sale — <span className="text-violet-400">Where the POS Share Comes From</span>
            </h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <div className="bg-white/5 border border-white/10 rounded-2xl p-5 mb-4">
                <div className="space-y-2">
                  {[
                    { label: "Original qualifying retail value", val: "€100.00", style: "text-white font-bold text-lg" },
                    { label: "Traveller DutyCredit saving", val: "€10.00", style: "text-orange-300" },
                    { label: "Traveller actually pays", val: "€90.00", style: "text-blue-300" },
                    { label: "DutyBoost platform fee (2.5%)", val: "€2.50", style: "text-slate-400" },
                    { label: "  → POS provider share (10% of fee)", val: "€0.25", style: "text-violet-300" },
                  ].map((row, i) => (
                    <div key={i} className={`flex justify-between items-center py-1 border-b border-white/5 ${i === 0 ? "pb-2 mb-1" : ""}`}>
                      <span className={`text-sm ${row.label.startsWith("  ") ? "pl-4 text-slate-500" : "text-slate-300"}`}>{row.label.trim()}</span>
                      <span className={`text-sm font-semibold ${row.style}`}>{row.val}</span>
                    </div>
                  ))}
                  <div className="flex justify-between items-center py-2 mt-1 bg-green-900/40 rounded-xl px-3">
                    <span className="text-green-300 font-bold text-sm">Airport Retailer net before normal costs</span>
                    <span className="text-green-300 font-bold text-xl">€87.50</span>
                  </div>
                </div>
              </div>
              <div className="bg-white/5 border border-white/10 rounded-2xl p-4">
                <div className="text-slate-400 text-xs uppercase tracking-wide mb-2">Platform fee distribution on €2.50</div>
                <div className="flex h-5 rounded-full overflow-hidden gap-px">
                  <div className="bg-violet-500" style={{ width: "10%" }} title="POS Provider 10%" />
                  <div className="bg-blue-500" style={{ width: "90%" }} title="DutyBoost 90%" />
                </div>
                <div className="flex gap-3 mt-2 flex-wrap text-xs">
                  {[
                    { color: "bg-violet-500", label: "POS Provider 10% (€0.25)" },
                    { color: "bg-blue-500", label: "DutyBoost 90% (€2.25)" },
                  ].map((l) => (
                    <div key={l.label} className="flex items-center gap-1">
                      <div className={`w-3 h-3 rounded-sm ${l.color}`} />
                      <span className="text-slate-400">{l.label}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
            <div className="flex flex-col gap-4">
              <div className="bg-gradient-to-br from-violet-900/50 to-indigo-900/50 border border-violet-500/30 rounded-2xl p-6">
                <h3 className="text-white font-bold text-lg mb-3">The Core Question</h3>
                <p className="text-violet-200 text-base leading-relaxed font-semibold">
                  “Is earning €0.25 on every €100 of incremental, validated retail volume — with zero upfront cost and no operational risk — a meaningful new revenue line for a POS provider already processing those transactions?”
                </p>
                <p className="text-violet-400 font-bold text-lg mt-3">Yes — and it scales with your footprint.</p>
              </div>
              <div className="bg-white/5 border border-white/10 rounded-2xl p-5">
                <h3 className="text-white font-semibold mb-3">Why the economics work for the POS provider</h3>
                <div className="space-y-2 text-sm">
                  {[
                    { item: "You already process the transaction", val: "€0 marginal cost", sub: "Validation is a lightweight API call" },
                    { item: "You earn on incremental sales", val: "Pure upside", sub: "From travellers who otherwise would not buy" },
                    { item: "Performance-based only", val: "€0 on non-converters", sub: "No fixed cost, no risk" },
                  ].map((row, i) => (
                    <div key={i} className="flex justify-between items-center p-2 rounded-lg">
                      <div>
                        <div className="text-slate-300">{row.item}</div>
                        <div className="text-slate-500 text-xs">{row.sub}</div>
                      </div>
                      <span className="font-bold text-violet-300">{row.val}</span>
                    </div>
                  ))}
                </div>
                <p className="text-slate-400 text-xs mt-3">Paid only on validated DutyBoost transactions. No cost on ordinary transactions or non-converting travellers.</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </SlideWrapper>
  );
}

// SLIDE 7: Revenue at Scale
function SlideScale() {
  return (
    <SlideWrapper>
      <div className="flex-1 flex flex-col justify-center px-5 py-6 md:px-12 md:py-6">
        <div className="mb-5">
          <span className="text-violet-600 text-sm font-semibold uppercase tracking-widest">Your Recurring Revenue</span>
          <h2 className="text-xl md:text-3xl font-heading font-bold text-[#0a0f1e] mt-2">
            What DutyBoost Brings <span className="text-violet-600">to Your Store Network</span>
          </h2>
          <p className="text-slate-500 mt-1 text-sm">Estimated annual POS-provider commission (10% of the 2.5% platform fee) at a 1% redemption rate, assuming €7.5M average annual sales per store.</p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-5 mb-5">
          {[
            { size: "Boutique POS", stores: "50 stores", conv: "1% redemption", net: "€9,375", color: "violet" },
            { size: "Regional POS", stores: "500 stores", conv: "1% redemption", net: "€93,750", color: "indigo" },
            { size: "Enterprise POS", stores: "2,000 stores", conv: "1% redemption", net: "€375,000", color: "blue" },
          ].map((s) => (
            <div key={s.size} className={`bg-${s.color}-50 border border-${s.color}-200 rounded-2xl p-5 text-center`}>
              <div className={`text-xs font-semibold text-${s.color}-600 uppercase tracking-wide mb-1`}>{s.size}</div>
              <div className="text-slate-500 text-sm mb-3">{s.stores}</div>
              <div className={`text-2xl md:text-3xl font-bold text-${s.color}-700 mb-1`}>{s.net}</div>
              <div className={`text-${s.color}-600 text-sm font-medium mb-2`}>annual POS commission</div>
              <div className="text-slate-500 text-xs border-t border-slate-200 pt-2">{s.conv} @ €7.5M avg sales/store</div>
            </div>
          ))}
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          <div className="bg-slate-800 text-white rounded-2xl p-5">
            <h3 className="font-bold mb-3">It Scales With Redemption Rate</h3>
            <div className="space-y-2 text-sm">
              {[
                { pp: "0.5% redemption", mult: "½× the figures above" },
                { pp: "1% redemption", mult: "the figures above" },
                { pp: "2% redemption", mult: "2× the figures above" },
                { pp: "5% redemption", mult: "5× the figures above" },
              ].map((row, i) => (
                <div key={i} className={`flex justify-between items-center py-1.5 px-3 rounded-lg ${i === 1 ? "bg-violet-800/50 font-semibold" : ""}`}>
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
    </SlideWrapper>
  );
}

// SLIDE 8: Strategic Benefits
function SlideBenefits() {
  return (
    <SlideWrapper dark>
      <div className="flex-1 flex flex-col justify-center px-5 py-6 md:px-12 md:py-6 relative">
        <GridBg />
        <div className="relative z-10">
          <div className="mb-5 lg:mb-8">
            <span className="text-violet-400 text-sm font-semibold uppercase tracking-widest">Strategic Benefits</span>
            <h2 className="text-xl md:text-3xl lg:text-4xl font-heading font-bold text-white mt-2">
              More Than Revenue —<br /><span className="text-violet-400">A Defensible Competitive Position</span>
            </h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 lg:gap-6">
            {[
              { icon: <TrendingUp className="w-7 h-7 text-violet-400" />, title: "New Recurring Revenue", desc: "A performance-based commission on every validated sale across your entire network — a revenue line that grows with your footprint." },
              { icon: <ShieldCheck className="w-7 h-7 text-green-400" />, title: "Renewal & Retention", desc: "Retailers gaining measurable incremental sales have a concrete reason to stay on your POS — making renewals about value, not price." },
              { icon: <Globe className="w-7 h-7 text-blue-400" />, title: "Differentiation", desc: "A commercial capability most competitors cannot match — turn transaction processing into an incremental-revenue platform." },
              { icon: <Plug className="w-7 h-7 text-indigo-400" />, title: "Reusable Integration", desc: "One integration enables DutyBoost across all stores, airports and markets you serve — low marginal onboarding cost per retailer." },
              { icon: <Layers className="w-7 h-7 text-violet-400" />, title: "Strengthened Proposition", desc: "Offer retailers a pre-arrival activation engine, not just checkout — making your POS the gateway to incremental conversion." },
              { icon: <BarChart3 className="w-7 h-7 text-green-400" />, title: "Transparent Attribution", desc: "Every validated transaction is reported per store, per airport, per period — clean data for commercial conversations." },
            ].map((card, i) => (
              <div key={i} className="bg-white/5 border border-white/10 rounded-2xl p-5">
                <div className="mb-3">{card.icon}</div>
                <div className="text-white font-bold mb-2">{card.title}</div>
                <div className="text-slate-400 text-sm leading-relaxed">{card.desc}</div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </SlideWrapper>
  );
}

// SLIDE 9: Integration Simplicity
function SlideIntegrate() {
  return (
    <SlideWrapper dark>
      <div className="flex-1 flex flex-col justify-center px-5 py-6 md:px-12 md:py-6 relative">
        <GridBg />
        <div className="relative z-10">
          <div className="mb-5 lg:mb-10">
            <span className="text-violet-400 text-sm font-semibold uppercase tracking-widest">Integration Simplicity</span>
            <h2 className="text-xl md:text-3xl lg:text-4xl font-heading font-bold text-white mt-2">
              One Lightweight Layer.<br /><span className="text-violet-400">Deploy Across Your Network.</span>
            </h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 lg:gap-8 items-center">
            <div className="bg-white/5 border border-white/10 rounded-2xl p-5 lg:p-7">
              <h3 className="text-white font-bold lg:text-lg mb-4">DutyBoost Sits Beside Your POS — Not Against It</h3>
              <div className="space-y-3">
                {[
                  { icon: <CheckCircle className="w-4 h-4 text-green-400" />, text: "Your POS remains the system of record for payments & inventory" },
                  { icon: <CheckCircle className="w-4 h-4 text-green-400" />, text: "DutyBoost adds a single validation call at checkout" },
                  { icon: <CheckCircle className="w-4 h-4 text-green-400" />, text: "No replacement of payment rails or merchant contracts" },
                  { icon: <CheckCircle className="w-4 h-4 text-green-400" />, text: "One integration rolls out to every retailer, store and airport" },
                  { icon: <CheckCircle className="w-4 h-4 text-green-400" />, text: "Reusable across markets — lower marginal onboarding cost" },
                ].map((item, i) => (
                  <div key={i} className="flex items-start gap-3">
                    <div className="flex-shrink-0 mt-0.5">{item.icon}</div>
                    <span className="text-slate-300 text-sm">{item.text}</span>
                  </div>
                ))}
              </div>
            </div>
            <div className="bg-gradient-to-br from-violet-900/60 to-indigo-900/60 border border-violet-500/30 rounded-2xl p-5 lg:p-7">
              <h3 className="text-white font-bold text-xl lg:text-2xl mb-2">INTEGRATE ONCE</h3>
              <p className="text-violet-200 text-sm lg:text-base leading-relaxed mb-3 lg:mb-5">
                A single, lightweight integration enables DutyBoost validation across your entire POS estate — turning one engineering effort into a recurring, network-wide revenue stream.
              </p>
              <div className="grid grid-cols-3 gap-3 text-center">
                {[
                  { val: "1 Call", label: "at checkout" },
                  { val: "All Stores", label: "enabled" },
                  { val: "Global", label: "deployment" },
                ].map((s) => (
                  <div key={s.label} className="bg-white/5 rounded-xl p-3">
                    <div className="text-violet-300 font-bold">{s.val}</div>
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

// SLIDE 10: Value Realized Quickly
function SlideGetStarted() {
  return (
    <SlideWrapper dark>
      <div className="flex-1 flex flex-col justify-center px-5 py-6 md:px-12 md:py-6 relative">
        <GridBg />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] rounded-full opacity-10"
          style={{ background: "radial-gradient(circle, #7c3aed 0%, transparent 70%)" }} />
        <div className="relative z-10 text-center">
          <div className="flex justify-center mb-4 lg:mb-6">
            <div className="bg-white rounded-2xl px-6 py-3 shadow-xl">
              <DutyBoostLogo height={40} linkTo="/pos-partner" />
            </div>
          </div>
          <div className="mb-4 lg:mb-6">
            <span className="text-violet-400 text-sm font-semibold uppercase tracking-widest">Value Realized Quickly</span>
            <h2 className="text-xl md:text-4xl lg:text-4xl font-heading font-bold text-white mt-2 leading-tight">
              Fast to Launch.<br />
              <span className="text-violet-400">Faster to Recurring Revenue.</span>
            </h2>
          </div>
          <p className="text-slate-300 text-sm md:text-base lg:text-lg max-w-3xl mx-auto leading-relaxed mb-4 lg:mb-6">
            DutyBoost is designed to deliver measurable added value to your POS network in a very short time — no lengthy rollout, no upfront investment, no operational disruption.
          </p>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3 lg:gap-4 max-w-3xl lg:max-w-4xl mx-auto mb-4 lg:mb-6">
            {[
              { title: "Weeks, Not Months", desc: "A single lightweight validation call — no replacement of your POS core, payments or merchant contracts." },
              { title: "Commission From Day One", desc: "Once live, every DutyBoost-validated transaction earns your 10% share of the platform fee — recurring and attributed." },
              { title: "Revenue From the 90%+ Who Never Buy", desc: "DutyBoost targets the non-converting majority — turning non-intending passengers into incremental, validated basket value." },
              { title: "A Stronger Renewal Story", desc: "Retailers gaining measurable incremental sales renew on value, not price — a defensible competitive position." },
            ].map((card, i) => (
              <div key={i} className="bg-white/5 border border-white/10 rounded-2xl p-4 lg:p-5 text-left">
                <div className="text-violet-300 font-bold lg:text-base mb-1.5">{card.title}</div>
                <div className="text-slate-400 text-xs lg:text-sm leading-relaxed">{card.desc}</div>
              </div>
            ))}
          </div>
          <div className="flex flex-col items-center gap-1.5">
            <p className="text-violet-400 text-base lg:text-xl font-bold">
              No setup fee. No subscription. No risk. Only incremental revenue — connected.
            </p>
            <p className="text-slate-300 text-sm lg:text-base font-semibold">
              Always performance-based — earn a 10% share of the DutyBoost Platform Fee on every validated sale.
            </p>
          </div>
        </div>
      </div>
    </SlideWrapper>
  );
}

const SLIDE_COMPONENTS = {
  cover: SlideCover,
  opportunity: SlideOpportunity,
  problem: SlideProblem,
  solution: SlideSolution,
  howItWorks: SlideHowItWorks,
  economics: SlideEconomics,
  scale: SlideScale,
  benefits: SlideBenefits,
  integrate: SlideIntegrate,
  getStarted: SlideGetStarted,
};

export default function PosProviderPitchDeck() {
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
      {/* Header */}
      <div className="w-full max-w-[1400px] flex items-center justify-between mb-2">
        <div className="text-white text-sm font-semibold opacity-60">
          DutyBoost — POS Provider Presentation 2026 <span className="text-xs opacity-50 ml-2 hidden sm:inline">CONFIDENTIAL</span>
        </div>
        <div className="text-slate-400 text-sm">{current + 1} / {SLIDES.length}</div>
      </div>

      {/* Slide */}
      <div ref={slideAreaRef} className="w-full max-w-[1400px] flex rounded-2xl overflow-hidden shadow-2xl border border-white/10 min-h-[58vh] lg:h-[calc(100vh-150px)]">
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
        <div className="flex gap-1.5 flex-wrap justify-center max-w-lg">
          {SLIDES.map((s, i) => (
            <button
              key={s.id}
              onClick={() => setCurrent(i)}
              title={SLIDE_LABELS[s.type]}
              className={`text-xs px-3 py-1 rounded-lg transition-all font-medium ${
                i === current ? "bg-violet-600 text-white" : "bg-white/10 text-slate-400 hover:bg-white/20 hover:text-white"
              }`}
            >
              {i + 1}
            </button>
          ))}
        </div>
        <button
          onClick={next}
          disabled={current === SLIDES.length - 1}
          className="flex items-center gap-2 px-6 py-3.5 rounded-xl bg-violet-600 text-white hover:bg-violet-700 disabled:opacity-30 disabled:cursor-not-allowed transition-colors text-base font-semibold cursor-pointer select-none"
        >
          Next <ChevronRight size={18} />
        </button>
      </div>
      <div className="mt-1.5 text-slate-500 text-sm">{SLIDE_LABELS[slide.type]}</div>
    </div>
  );
}