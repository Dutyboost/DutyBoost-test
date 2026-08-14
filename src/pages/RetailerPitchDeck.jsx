import { useState, useEffect, useRef, Fragment } from "react";
import { ChevronLeft, ChevronRight, ArrowRight, Cpu, Store, TrendingUp, CheckCircle, BarChart3 } from "lucide-react";
import DutyBoostLogo from "@/components/DutyBoostLogo";
import TravelAgencyIcon from "@/components/TravelAgencyIcon";
import AirportRetailerIcon from "@/components/AirportRetailerIcon";
import TravelerIcon from "@/components/TravelerIcon";

const SLIDES = [
  { id: "cover", type: "cover" },
  { id: "problem", type: "problem" },
  { id: "solution", type: "solution" },
  { id: "howItWorks", type: "howItWorks" },
  { id: "economics", type: "economics" },
  { id: "tiers", type: "tiers" },
  { id: "incremental", type: "incremental" },
  { id: "integrate", type: "integrate" },
  { id: "scale", type: "scale" },
  { id: "getStarted", type: "getStarted" },
];

const SLIDE_LABELS = {
  cover: "Cover",
  problem: "The Problem",
  solution: "The Solution",
  howItWorks: "How It Works",
  economics: "Transaction Economics",
  tiers: "DutyCredit Tiers",
  incremental: "The Incremental Logic",
  integrate: "POS Integration",
  scale: "Incremental Revenue",
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
      backgroundImage: "linear-gradient(rgba(59,130,246,0.4) 1px, transparent 1px), linear-gradient(90deg, rgba(59,130,246,0.4) 1px, transparent 1px)",
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
          style={{ background: "radial-gradient(circle, #3b82f6 0%, transparent 70%)" }} />
        <div className="relative z-10 flex flex-col items-center gap-8">
          <div className="bg-white rounded-2xl px-8 py-4 shadow-2xl">
            <DutyBoostLogo height={50} linkTo={null} />
          </div>
          <div>
            <h1 className="text-3xl md:text-5xl font-heading font-bold text-white leading-tight mb-4">
              Drive Incremental Sales.<br />
              <span className="text-blue-400">Pay Only on Performance.</span>
            </h1>
            <p className="text-xl text-slate-300 max-w-3xl leading-relaxed">
              A presentation for Airport Duty-Free & Travel Retail Operators
            </p>
          </div>
          <div className="grid grid-cols-3 gap-2 sm:gap-8 mt-4 w-full max-w-xl">
            {[
              { label: "Retailer Net", value: "€87.50" },
              { label: "Cost Model", value: "Performance" },
              { label: "Setup Fee", value: "€0" },
            ].map((s) => (
              <div key={s.label} className="text-center">
                <div className="text-xl sm:text-3xl font-bold text-blue-400">{s.value}</div>
                <div className="text-xs sm:text-sm text-slate-400 mt-1">{s.label}</div>
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

// SLIDE 2: The Problem
function SlideProblem() {
  return (
    <SlideWrapper dark>
      <div className="flex-1 flex flex-col justify-center px-5 py-6 md:px-12 md:py-6 relative">
        <GridBg />
        <div className="relative z-10">
          <div className="mb-5">
            <span className="text-blue-400 text-sm font-semibold uppercase tracking-widest">The Problem</span>
            <h2 className="text-xl md:text-3xl font-heading font-bold text-white mt-2">
              90–95% of Passengers Never Make<br /><span className="text-blue-400">a Duty-Free Purchase</span>
            </h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-4">
              <div className="bg-white/5 border border-white/10 rounded-2xl p-5">
                <div className="text-3xl md:text-4xl font-bold text-blue-400 mb-1">9.8B</div>
                <div className="text-white font-semibold">Global passenger movements in 2025</div>
                <div className="text-slate-400 text-sm mt-1">ACI World — enormous audience already in transit</div>
              </div>
              <div className="bg-white/5 border border-white/10 rounded-2xl p-5">
                <div className="text-3xl md:text-4xl font-bold text-orange-400 mb-1">5–10%</div>
                <div className="text-white font-semibold">Global duty-free store conversion rate</div>
                <div className="text-slate-400 text-sm mt-1">Only 5–10% of travelers buy (Kearney / TFWA)</div>
              </div>
              <div className="bg-red-900/30 border border-red-500/30 rounded-2xl p-5">
                <div className="text-3xl md:text-4xl font-bold text-red-400 mb-1">~8.8B</div>
                <div className="text-white font-semibold">Non-purchasing passengers annually</div>
                <div className="text-slate-400 text-sm mt-1">90–95% of 9.8B global passenger movements</div>
              </div>
            </div>
            <div className="flex flex-col gap-4 justify-center">
              <div className="bg-white/5 border border-white/10 rounded-2xl p-6">
                <h3 className="text-white font-semibold text-lg mb-4">Why Traditional Retail Activation Fails</h3>
                <ul className="space-y-3">
                  {[
                    "Activation begins only after traveller clears security",
                    "Retailers compete via location, display and impulse only",
                    "No pre-arrival reason for a non-intending buyer to visit",

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
                  "Only 5–10% of travelers buy in airport duty-free stores. The structural weakness is timing — by the time the traveller reaches the store, the commercial opportunity has already narrowed." (Kearney / TFWA)
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </SlideWrapper>
  );
}

// SLIDE 3: The Solution
function SlideSolution() {
  return (
    <SlideWrapper dark>
      <div className="flex-1 flex flex-col justify-center px-5 py-6 md:px-12 md:py-6 relative">
        <GridBg />
        <div className="relative z-10">
          <div className="mb-5">
            <span className="text-blue-400 text-sm font-semibold uppercase tracking-widest">The Solution</span>
            <h2 className="text-xl md:text-3xl font-heading font-bold text-white mt-2">
              Activate the Traveller<br /><span className="text-blue-400">Before They Reach Your Store</span>
            </h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-5">
            <div className="space-y-4">
              <div className="bg-white/5 border border-white/10 rounded-2xl p-5">
                <h3 className="text-white font-bold text-base mb-3">What DutyBoost Does</h3>
                <div className="space-y-3">
                  {[
                    { from: "Retailers wait for passengers", to: "Passengers arrive with purchase intent" },
                    { from: "Impulse-driven shopping", to: "Pre-activated economic incentive" },
                    { from: "No pre-arrival connection", to: "DutyCredit distributed via Travel Partner" },
                    { from: "Zero conversion from 90–95%", to: "Incremental sales from non-buyers" },
                  ].map((row, i) => (
                    <div key={i} className="grid grid-cols-[1fr,auto,1fr] gap-2 items-center text-xs">
                      <span className="text-red-300 bg-red-900/30 rounded px-2 py-1 text-center">{row.from}</span>
                      <ArrowRight size={12} className="text-blue-400 flex-shrink-0" />
                      <span className="text-green-300 bg-green-900/30 rounded px-2 py-1 text-center">{row.to}</span>
                    </div>
                  ))}
                </div>
              </div>
              <div className="bg-gradient-to-br from-blue-900/50 to-indigo-900/50 border border-blue-500/30 rounded-2xl p-5">
                <div className="grid grid-cols-3 gap-4 text-center">
                  {[
                    { val: "€1–€60", label: "Traveller DutyCredit value" },
                    { val: "2.5%", label: "Total platform fee" },
                    { val: "€0", label: "Setup or licence cost" },
                  ].map((s) => (
                    <div key={s.label}>
                      <div className="text-lg md:text-xl font-bold text-blue-300 whitespace-nowrap">{s.val}</div>
                      <div className="text-slate-400 text-xs mt-1">{s.label}</div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
            <div className="bg-white/5 border border-white/10 rounded-2xl p-5">
              <h3 className="text-white font-bold text-base mb-4">The DutyBoost Journey</h3>
              <div className="flex flex-col gap-2">
                {[
                  { n: "1", step: "Traveller books flight / hotel / car", color: "bg-blue-600" },
                  { n: "2", step: "Travel Partner distributes DutyCredit", color: "bg-blue-600" },
                  { n: "3", step: "Traveller activates the benefit", color: "bg-indigo-600" },
                  { n: "4", step: "Arrives at airport with purchase intent", color: "bg-indigo-600" },
                  { n: "5", step: "Visits your participating store", color: "bg-violet-600" },
                  { n: "6", step: "POS validates transaction", color: "bg-violet-600" },
                  { n: "7", step: "DutyCredit applied — performance fee only", color: "bg-green-600" },
                  { n: "8", step: "Transaction validated & reported", color: "bg-green-600" },
                ].map((s) => (
                  <div key={s.n} className="flex items-center gap-3">
                    <div className={`w-6 h-6 rounded-full ${s.color} flex items-center justify-center text-white text-xs font-bold flex-shrink-0`}>{s.n}</div>
                    <span className="text-slate-300 text-sm">{s.step}</span>
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

// SLIDE 4: How It Works for the Retailer
function SlideHowItWorks() {
  return (
    <SlideWrapper>
      <div className="flex-1 flex flex-col justify-center px-5 py-6 md:px-12 md:py-6">
        <div className="mb-5">
          <span className="text-blue-600 text-sm font-semibold uppercase tracking-widest">For the Retailer</span>
          <h2 className="text-xl md:text-3xl font-heading font-bold text-[#0a0f1e] mt-2">
            Simple to Join. <span className="text-blue-600">Zero Upfront Cost.</span>
          </h2>
          <p className="text-slate-500 mt-1 text-sm">No subscription. No setup fee. No inventory risk. You pay only when a qualifying transaction is validated.</p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-5 mb-6">
          {[
            {
              icon: <Cpu className="w-8 h-8 text-blue-600" />,
              title: "Integrate Once",
              desc: "DutyBoost connects to your existing Enterprise POS. No replacement of existing systems.",
              color: "blue",
            },
            {
              icon: <TravelerIcon className="w-8 h-8 text-violet-600" />,
              title: "Receive Pre-Activated Travellers",
              desc: "Travellers arrive at your store already motivated by a financial incentive from their Travel Partner.",
              color: "violet",
            },
            {
              icon: <BarChart3 className="w-8 h-8 text-green-600" />,
              title: "Pay on Performance",
              desc: "A 2.5% platform fee is applied only on the original qualifying retail value of validated transactions.",
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
            <h3 className="font-bold mb-3">What DutyBoost Is NOT</h3>
            <div className="space-y-2 text-sm">
              {[
                ["❌", "A loyalty programme collecting abstract points"],
                ["❌", "A coupon or voucher-code platform"],
                ["❌", "An advertising product requiring upfront spend"],
                ["❌", "A POS replacement or technology disruption"],
                ["❌", "A subscription service with monthly fees"],
              ].map(([icon, text], i) => (
                <div key={i} className="flex items-start gap-2">
                  <span>{icon}</span>
                  <span className="text-slate-300">{text}</span>
                </div>
              ))}
            </div>
          </div>
          <div className="bg-green-50 border border-green-200 rounded-2xl p-5">
            <h3 className="font-bold text-green-900 mb-3">What DutyBoost IS</h3>
            <div className="space-y-2 text-sm">
              {[
                ["✅", "Performance-based commercial infrastructure"],
                ["✅", "Pre-airport traveller activation before arrival"],
                ["✅", "A direct spend-linked financial incentive"],
                ["✅", "Transaction-level POS validation & attribution"],
                ["✅", "Multi-party revenue sharing from one transaction"],
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

// SLIDE 5: Transaction Economics
function SlideEconomics() {
  return (
    <SlideWrapper dark>
      <div className="flex-1 flex flex-col justify-center px-5 py-6 md:px-12 md:py-6 relative">
        <GridBg />
        <div className="relative z-10">
          <div className="mb-5">
            <span className="text-blue-400 text-sm font-semibold uppercase tracking-widest">Transaction Economics</span>
            <h2 className="text-xl md:text-3xl font-heading font-bold text-white mt-2">
              €100 Qualifying Retail Value — <span className="text-blue-400">How It Splits</span>
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
                    { label: "Total platform fee (2.5%)", val: "€2.50", style: "text-slate-400" },
                    { label: "— Travel Partner share", val: "€0.50", style: "text-slate-400 ml-3" },
                    { label: "— POS Partner share", val: "€0.25", style: "text-slate-400 ml-3" },
                    { label: "— DutyBoost share", val: "€1.75", style: "text-slate-400 ml-3" },
                  ].map((row, i) => (
                    <div key={i} className={`flex justify-between items-center py-1 border-b border-white/5 ${i === 0 ? "pb-2 mb-1" : ""}`}>
                      <span className={`text-sm ${row.style.includes("ml") ? "text-slate-500 pl-4" : "text-slate-300"}`}>{row.label}</span>
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
                <div className="text-slate-400 text-xs uppercase tracking-wide mb-2">Value distribution on €100</div>
                <div className="flex h-5 rounded-full overflow-hidden gap-px">
                  <div className="bg-green-500" style={{ width: "87.5%" }} title="Retailer 87.5%" />
                  <div className="bg-orange-400" style={{ width: "10%" }} title="Traveller 10%" />
                  <div className="bg-blue-500" style={{ width: "1.75%" }} />
                  <div className="bg-yellow-400" style={{ width: "0.5%" }} />
                  <div className="bg-purple-400" style={{ width: "0.25%" }} />
                </div>
                <div className="flex gap-3 mt-2 flex-wrap text-xs">
                  {[
                    { color: "bg-green-500", label: "Retailer 87.5%" },
                    { color: "bg-orange-400", label: "Traveller 10%" },
                    { color: "bg-blue-500", label: "DutyBoost 1.75%" },
                    { color: "bg-yellow-400", label: "Travel Partner 0.5%" },
                    { color: "bg-purple-400", label: "POS 0.25%" },
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
              <div className="bg-gradient-to-br from-green-900/50 to-emerald-900/50 border border-green-500/30 rounded-2xl p-6">
                <h3 className="text-white font-bold text-lg mb-3">The Core Question</h3>
                <p className="text-green-200 text-base leading-relaxed font-semibold">
                  "Is earning €87.50 from an incremental €100 retail sale — without upfront customer acquisition cost — more valuable than earning €0 from a traveller who otherwise would not have converted?"
                </p>
                <p className="text-green-400 font-bold text-lg mt-3">Yes. Every time.</p>
              </div>
              <div className="bg-white/5 border border-white/10 rounded-2xl p-5">
                <h3 className="text-white font-semibold mb-3">Your total economic cost per €100 transaction</h3>
                <div className="space-y-2 text-sm">
                  {[
                    { item: "Traveller DutyCredit incentive", val: "€10.00", sub: "10% of original value" },
                    { item: "DutyBoost platform fee", val: "€2.50", sub: "2.5% of original value" },
                    { item: "Total cost to retailer", val: "€12.50", sub: "12.5% of original value", highlight: true },
                  ].map((row, i) => (
                    <div key={i} className={`flex justify-between items-center p-2 rounded-lg ${row.highlight ? "bg-blue-900/50 border border-blue-500/30" : ""}`}>
                      <div>
                        <div className={`${row.highlight ? "text-blue-200 font-bold" : "text-slate-300"}`}>{row.item}</div>
                        <div className="text-slate-500 text-xs">{row.sub}</div>
                      </div>
                      <span className={`font-bold ${row.highlight ? "text-blue-300 text-lg" : "text-slate-300"}`}>{row.val}</span>
                    </div>
                  ))}
                </div>
                <p className="text-slate-400 text-xs mt-3">Only applied when a qualifying transaction is validated. Zero cost on non-converting travellers.</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </SlideWrapper>
  );
}

// SLIDE 6: DutyCredit Tiers
function SlideTiers() {
  return (
    <SlideWrapper>
      <div className="flex-1 flex flex-col justify-center px-5 py-6 md:px-12 md:py-6">
        <div className="mb-5">
          <span className="text-blue-600 text-sm font-semibold uppercase tracking-widest">DutyCredit Structure</span>
          <h2 className="text-xl md:text-3xl font-heading font-bold text-[#0a0f1e] mt-2">
            Incentive Grows With <span className="text-blue-600">Basket Value</span>
          </h2>
          <p className="text-slate-500 mt-1 text-sm">The DutyCredit is not a flat discount. It rewards higher-spend travellers more — increasing both the incentive to purchase and the transaction value to the retailer.</p>
        </div>
        <div className="bg-slate-800 text-white rounded-2xl p-4 sm:p-6 mb-5">
          <div className="grid grid-cols-4 gap-2 text-xs text-slate-400 mb-2 px-2">
            <span>Tier</span><span>Basket Range</span><span>Discount</span><span className="text-right">Traveller Saves</span>
          </div>
          <div className="space-y-1.5">
            {[
              { tier: "Entry", range: "€20–€49", disc: "5%–7.5%", save: "€1.00–€3.19", highlight: false },
              { tier: "Boarding", range: "€50–€99", disc: "7.5%–10%", save: "€3.75–€9.41", highlight: false },
              { tier: "Standard", range: "€100–€149", disc: "10%–12.5%", save: "€10.00–€18.25", highlight: true },
              { tier: "Plus", range: "€150–€199", disc: "12.5%–15%", save: "€18.75–€29.04", highlight: false },
              { tier: "Lounge", range: "€200–€249", disc: "15%–17.5%", save: "€30.00–€42.75", highlight: false },
              { tier: "Premium", range: "€250–€299", disc: "17.5%–20%", save: "€43.75–€57.00", highlight: false },
              { tier: "VIP", range: "€300+", disc: "20% capped", save: "Up to €60", highlight: false },
            ].map((row, i) => (
              <div key={i} className={`grid grid-cols-4 gap-2 py-2 px-2 rounded-lg text-sm ${row.highlight ? "bg-blue-800/60" : "hover:bg-white/5"}`}>
                <span className={`font-semibold ${row.highlight ? "text-blue-200" : "text-blue-400"}`}>{row.tier}</span>
                <span className="text-slate-300">{row.range}</span>
                <span className="text-yellow-300">{row.disc}</span>
                <span className="text-green-300 font-semibold text-right">{row.save}</span>
              </div>
            ))}
          </div>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {[
            {
              title: "Higher Baskets",
              body: "The tiered structure encourages travellers to spend more to reach the next incentive level — increasing your average transaction value.",
              color: "blue",
            },
            {
              title: "Priority Categories",
              body: "Fragrances & cosmetics, wines & spirits, fashion & accessories, watches & jewellery, electronics, gifts and souvenirs — where incentives create meaningful perceived savings.",
              color: "indigo",
            },
            {
              title: "Maximum Cap",
              body: "The DutyCredit is capped at €60 per transaction regardless of basket size, protecting retailer economics on very high-value purchases.",
              color: "violet",
            },
          ].map((card, i) => (
            <div key={i} className={`bg-${card.color}-50 border border-${card.color}-200 rounded-xl p-4`}>
              <div className={`font-bold text-${card.color}-800 mb-2`}>{card.title}</div>
              <div className={`text-${card.color}-700 text-sm leading-relaxed`}>{card.body}</div>
            </div>
          ))}
        </div>
      </div>
    </SlideWrapper>
  );
}

// SLIDE 7: The Incremental Logic
function SlideIncremental() {
  return (
    <SlideWrapper>
      <div className="flex-1 flex flex-col justify-center px-5 py-6 md:px-12 md:py-6">
        <div className="mb-5">
          <span className="text-blue-600 text-sm font-semibold uppercase tracking-widest">The Retailer Proposition</span>
          <h2 className="text-xl md:text-3xl font-heading font-bold text-[#0a0f1e] mt-2">
            Incremental Revenue Is <span className="text-blue-600">The Only Revenue That Matters</span>
          </h2>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-5">
          <div className="bg-red-50 border border-red-200 rounded-2xl p-6 flex flex-col justify-center">
            <div className="text-5xl font-bold text-red-600 mb-2">€0</div>
            <div className="text-slate-700 font-semibold">Revenue from a traveller who does not convert</div>
            <div className="text-slate-500 text-sm mt-1">90–95% of global passengers — the current reality</div>
          </div>
          <div className="bg-green-50 border border-green-200 rounded-2xl p-6 flex flex-col justify-center">
            <div className="text-5xl font-bold text-green-600 mb-2">€87.50</div>
            <div className="text-slate-700 font-semibold">Retailer net before normal costs</div>
            <div className="text-slate-500 text-sm mt-1">From an incremental €100 DutyBoost transaction</div>
          </div>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          <div className="bg-blue-50 border border-blue-200 rounded-2xl p-5">
            <h3 className="font-bold text-blue-900 mb-3">At 1 Million €100 Incremental Transactions</h3>
            <div className="space-y-2">
              {[
                { party: "Travellers receive", val: "€10M in DutyCredit value" },
                { party: "Retailer net (before costs)", val: "€87.5M" },
                { party: "Travel Partners earn", val: "€500,000 ancillary revenue" },
                { party: "POS Partners earn", val: "€250,000 transaction revenue" },
                { party: "DutyBoost earns", val: "€1.75M infrastructure revenue" },
              ].map((row, i) => (
                <div key={i} className="flex justify-between items-center text-sm py-1 border-b border-blue-100 last:border-0">
                  <span className="text-blue-800">{row.party}</span>
                  <span className="font-bold text-blue-900">{row.val}</span>
                </div>
              ))}
            </div>
          </div>
          <div className="flex flex-col gap-4">
            <div className="bg-amber-50 border border-amber-200 rounded-2xl p-4">
              <h3 className="font-bold text-amber-900 mb-2">The Strategic Test for Retailers</h3>
              <p className="text-amber-800 text-sm leading-relaxed">
                The most important metric is not total discount cost — it is <strong>incremental gross profit created per €1 of DutyCredit value delivered</strong>. DutyBoost must be generating transactions that would not otherwise have occurred.
              </p>
            </div>
            <div className="bg-slate-800 text-white rounded-2xl p-4">
              <h3 className="text-white font-bold mb-2 text-sm">Conversion Sensitivity at Scale ( Example: 180M travellers)</h3>
              <div className="space-y-1">
                {[
                  { pp: "+0.5 pp", txns: "900K", retail: "€90M", ret: "€78.75M" },
                  { pp: "+1 pp", txns: "1.8M", retail: "€180M", ret: "€157.5M" },
                  { pp: "+2 pp", txns: "3.6M", retail: "€360M", ret: "€315M" },
                ].map((row, i) => (
                  <div key={i} className={`grid grid-cols-4 gap-1 text-xs py-1.5 px-2 rounded-lg ${i === 1 ? "bg-blue-800/50 font-semibold" : ""}`}>
                    <span className="text-blue-400">{row.pp}</span>
                    <span className="text-slate-300">{row.txns}</span>
                    <span className="text-slate-300">{row.retail}</span>
                    <span className="text-green-300 text-right">{row.ret} net</span>
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

// SLIDE 8: POS Integration Strategy
function SlideIntegrate() {
  return (
    <SlideWrapper dark>
      <div className="flex-1 flex flex-col justify-center px-5 py-6 md:px-12 md:py-6 relative">
        <GridBg />
        <div className="relative z-10">
          <div className="mb-5">
            <span className="text-blue-400 text-sm font-semibold uppercase tracking-widest">Technology Strategy</span>
            <h2 className="text-xl md:text-3xl font-heading font-bold text-white mt-2">
              Integrate Once.<br /><span className="text-blue-400">Deploy Repeatedly.</span>
            </h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-4">
              <div className="bg-white/5 border border-white/10 rounded-2xl p-5">
                <h3 className="text-white font-bold mb-4">DutyBoost Works With Your Existing POS</h3>
                <div className="space-y-3">
                  {[
                    { icon: <CheckCircle className="w-4 h-4 text-green-400" />, text: "Your POS remains the operational system of record" },
                    { icon: <CheckCircle className="w-4 h-4 text-green-400" />, text: "DutyBoost adds a lightweight validation layer" },
                    { icon: <CheckCircle className="w-4 h-4 text-green-400" />, text: "No replacement of ERP, payment or inventory systems" },
                    { icon: <CheckCircle className="w-4 h-4 text-green-400" />, text: "One integration enables multiple stores, airports, markets" },
                    { icon: <CheckCircle className="w-4 h-4 text-green-400" />, text: "Reusable integration means lower marginal onboarding cost" },
                  ].map((item, i) => (
                    <div key={i} className="flex items-start gap-3">
                      <div className="flex-shrink-0 mt-0.5">{item.icon}</div>
                      <span className="text-slate-300 text-sm">{item.text}</span>
                    </div>
                  ))}
                </div>
              </div>
              <div className="bg-blue-900/30 border border-blue-500/30 rounded-2xl p-4">
                <h3 className="text-blue-300 font-bold mb-2 text-sm">What DutyBoost Adds</h3>
                <div className="flex flex-wrap gap-2">
                  {[
                    "DutyCredit lifecycle management",
                    "Secure POS authentication",
                    "Transaction validation",
                    "Discount-rule resolution",
                    "Transaction attribution",
                    "Fee calculation",
                    "Revenue allocation",
                    "Refund handling",
                    "Reconciliation & reporting",
                    "Audit trails",
                  ].map((tag) => (
                    <span key={tag} className="text-xs bg-blue-900/50 border border-blue-500/30 text-blue-200 rounded-full px-2 py-0.5">{tag}</span>
                  ))}
                </div>
              </div>
            </div>
            <div className="flex flex-col gap-4">
              <div className="bg-gradient-to-br from-indigo-900/60 to-blue-900/60 border border-indigo-500/30 rounded-2xl p-5">
                <h3 className="text-white font-bold text-xl mb-2">INTEGRATE ONCE</h3>
                <p className="text-indigo-200 text-sm leading-relaxed mb-3">
                  One production-ready integration with an Enterprise POS Provider can enable DutyBoost across multiple retailers, stores, airports and geographic markets.
                </p>
                <div className="grid grid-cols-3 gap-3 text-center">
                  {[
                    { val: "1 POS", label: "integration" },
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
      </div>
    </SlideWrapper>
  );
}

// SLIDE 9: Incremental Revenue Opportunity
function SlideScale() {
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
            { size: "Compact Airport", pax: "2M passengers/yr", conv: "+1% = 20K txns", net: "€1.75M", color: "blue" },
            { size: "Regional Airport", pax: "10M passengers/yr", conv: "+1% = 100K txns", net: "€8.75M", color: "indigo" },
            { size: "Major Hub", pax: "30M passengers/yr", conv: "+1% = 300K txns", net: "€26.25M", color: "violet" },
          ].map((s) => (
            <div key={s.size} className={`bg-${s.color}-50 border border-${s.color}-200 rounded-2xl p-5 text-center`}>
              <div className={`text-xs font-semibold text-${s.color}-600 uppercase tracking-wide mb-1`}>{s.size}</div>
              <div className="text-slate-500 text-sm mb-3">{s.pax}</div>
              <div className={`text-2xl md:text-3xl font-bold text-${s.color}-700 mb-1`}>{s.net}</div>
              <div className={`text-${s.color}-600 text-sm font-medium mb-2`}>incremental retailer net</div>
              <div className="text-slate-500 text-xs border-t border-slate-200 pt-2">{s.conv} @ €100 avg value</div>
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
          style={{ background: "radial-gradient(circle, #3b82f6 0%, transparent 70%)" }} />
        <div className="relative z-10 text-center">
          <div className="mb-6">
            <span className="text-blue-400 text-sm font-semibold uppercase tracking-widest">Value Realized Quickly</span>
            <h2 className="text-xl md:text-4xl font-heading font-bold text-white mt-3 leading-tight">
              Fast to Launch.<br />
              <span className="text-blue-400">Faster to Incremental Revenue.</span>
            </h2>
          </div>
          <p className="text-slate-300 text-base md:text-lg max-w-3xl mx-auto leading-relaxed mb-6">
            DutyBoost is designed to deliver measurable added value to your stores in a very short time — no lengthy rollout, no upfront investment, no operational disruption.
          </p>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 max-w-3xl mx-auto mb-6">
            {[
              { title: "Weeks, Not Months", desc: "A lightweight POS validation layer — no replacement of your existing systems, pricing or merchandising." },
              { title: "Incremental Sales From Day One", desc: "Once live, pre-activated travellers arrive at your store already motivated by a financial incentive. The first validated transactions can follow within days." },
              { title: "Revenue From the 90%+ Who Never Buy", desc: "DutyBoost targets the non-converting majority — turning non-intending passengers into incremental basket value." },
              { title: "Higher Average Baskets", desc: "The tiered DutyCredit structure rewards higher spend, encouraging travellers to reach the next incentive level." },
            ].map((card, i) => (
              <div key={i} className="bg-white/5 border border-white/10 rounded-2xl p-5 text-left">
                <div className="text-blue-300 font-bold mb-2">{card.title}</div>
                <div className="text-slate-400 text-sm leading-relaxed">{card.desc}</div>
              </div>
            ))}
          </div>
          <p className="text-blue-400 text-lg font-bold">
            No setup fee. No subscription. No risk. Only incremental revenue — connected.
          </p>
        </div>
      </div>
    </SlideWrapper>
  );
}

const SLIDE_COMPONENTS = {
  cover: SlideCover,
  problem: SlideProblem,
  solution: SlideSolution,
  howItWorks: SlideHowItWorks,
  economics: SlideEconomics,
  tiers: SlideTiers,
  incremental: SlideIncremental,
  integrate: SlideIntegrate,
  scale: SlideScale,
  getStarted: SlideGetStarted,
};

export default function RetailerPitchDeck() {
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
          DutyBoost — Airport Retailer Presentation 2026 <span className="text-xs opacity-50 ml-2 hidden sm:inline">CONFIDENTIAL</span>
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
                i === current ? "bg-blue-600 text-white" : "bg-white/10 text-slate-400 hover:bg-white/20 hover:text-white"
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
      <div className="mt-1.5 text-slate-500 text-sm">{SLIDE_LABELS[slide.type]}</div>
    </div>
  );
}