import { ArrowRight, Cpu, TrendingUp, CheckCircle, BarChart3, Plug, Layers, ShieldCheck, Globe, RefreshCw, Lock } from "lucide-react";
import DutyBoostLogo from "@/components/DutyBoostLogo";
import SlideApiExample from "@/components/pos-pitch/SlideApiExample";

function SlideWrapper({ children }) {
  return (
    <div className="w-full flex flex-col overflow-y-auto lg:overflow-hidden bg-white text-[#0a0f1e]">
      {children}
    </div>
  );
}

function GridBg() {
  return (
    <div className="absolute inset-0 opacity-[0.03]" style={{
      backgroundImage: "linear-gradient(rgba(124,58,237,0.4) 1px, transparent 1px), linear-gradient(90deg, rgba(124,58,237,0.4) 1px, transparent 1px)",
      backgroundSize: "40px 40px"
    }} />
  );
}

// SLIDE 1: Cover
export function SlideCover({ currency = "€" }) {
  return (
    <SlideWrapper>
      <div className="flex-1 flex flex-col items-center justify-center px-6 md:px-16 text-center relative">
        <GridBg />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] rounded-full opacity-[0.04]"
          style={{ background: "radial-gradient(circle, #7c3aed 0%, transparent 70%)" }} />
        <div className="relative z-10 flex flex-col items-center gap-8 lg:gap-16">
          <div className="bg-slate-50 rounded-2xl px-8 py-4 shadow-lg border border-slate-200">
            <DutyBoostLogo height={50} linkTo="/pos-partner" />
          </div>
          <div>
            <h1 className="text-3xl md:text-5xl lg:text-6xl font-heading font-bold text-[#0a0f1e] leading-tight mb-4">
              One Integration.<br />
              <span className="text-violet-600">Recurring Revenue. Zero Risk.</span>
            </h1>
            <p className="text-xl lg:text-2xl text-slate-500 max-w-3xl leading-relaxed">
              A presentation for Point-of-Sale Providers serving Airport & Travel Retail
            </p>
          </div>
          <div className="flex flex-wrap items-start justify-center gap-x-6 sm:gap-x-12 lg:gap-x-16 gap-y-4 mt-4 w-full max-w-xl lg:max-w-4xl">
            {[
              { label: "POS Commission", value: "0.25%" },
              { label: "Cost Model", value: "Performance" },
              { label: "Setup Fee", value: `${currency}0` },
            ].map((s) => (
              <div key={s.label} className="flex flex-col items-center text-center">
                <div className="text-xl sm:text-3xl lg:text-5xl font-bold text-violet-600 whitespace-nowrap">{s.value}</div>
                <div className="text-xs sm:text-sm lg:text-lg text-slate-500 mt-1 whitespace-nowrap">{s.label}</div>
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

// SLIDE 2: The Opportunity
export function SlideOpportunity() {
  return (
    <SlideWrapper>
      <div className="flex-1 flex flex-col justify-center px-5 py-6 md:px-12 md:py-6 relative">
        <GridBg />
        <div className="relative z-10">
          <div className="mb-5 lg:mb-10">
            <span className="text-violet-600 text-sm font-semibold uppercase tracking-widest">The Opportunity</span>
            <h2 className="text-xl md:text-3xl lg:text-4xl font-heading font-bold text-[#0a0f1e] mt-2">
              9.8B Passengers. 73% Never Buy.<br /><span className="text-violet-600">Your Retailers Want Incremental Sales.</span>
            </h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-5 lg:gap-7 mb-5 lg:mb-8">
            {[
              { val: "9.8B", label: "Global passenger movements in 2025", sub: "ACI World — audience already in transit" },
              { val: "27%", label: "Global conversion rate", sub: "Only 27% of travellers buy (m1nd-set / TFWA)" },
              { val: "7.15B", label: "Non-purchasing passengers annually", sub: "Untapped incremental revenue pool" },
            ].map((s) => (
              <div key={s.label} className="bg-slate-50 border border-slate-200 rounded-2xl p-5 lg:p-7">
                <div className="text-3xl md:text-4xl lg:text-5xl font-bold text-violet-600 mb-2">{s.val}</div>
                <div className="text-slate-900 font-semibold text-sm lg:text-base">{s.label}</div>
                <div className="text-slate-500 text-xs lg:text-sm mt-1">{s.sub}</div>
              </div>
            ))}
          </div>
          <div className="bg-gradient-to-br from-violet-50 to-indigo-50 border border-violet-200 rounded-2xl p-5 lg:p-7">
            <h3 className="text-slate-900 font-bold text-lg mb-3">The POS Provider Position</h3>
            <p className="text-slate-600 text-sm lg:text-base leading-relaxed">
              POS providers already sit at the transaction layer of travel retail — the exact point where incremental conversion is validated and attributed. By enabling DutyBoost, a POS provider turns its existing infrastructure into a new, recurring, performance-based revenue stream while delivering measurable incremental sales to every retailer it serves.
            </p>
          </div>
        </div>
      </div>
    </SlideWrapper>
  );
}

// SLIDE 3: The Problem
export function SlideProblem() {
  return (
    <SlideWrapper>
      <div className="flex-1 flex flex-col justify-center px-5 py-6 md:px-12 md:py-6">
        <div className="mb-5">
          <span className="text-violet-600 text-sm font-semibold uppercase tracking-widest">The Facts</span>
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
export function SlideSolution({ currency = "€" }) {
  return (
    <SlideWrapper>
      <div className="flex-1 flex flex-col justify-center px-5 py-6 md:px-12 md:py-6 relative">
        <GridBg />
        <div className="relative z-10">
          <div className="mb-5 lg:mb-10">
            <span className="text-violet-600 text-sm font-semibold uppercase tracking-widest">The Solution</span>
            <h2 className="text-xl md:text-3xl lg:text-4xl font-heading font-bold text-[#0a0f1e] mt-2">
              Become the Activation Layer<br /><span className="text-violet-600">for Travel Retail</span>
            </h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 lg:gap-8">
            <div className="space-y-4">
              <div className="bg-slate-50 border border-slate-200 rounded-2xl p-5 lg:p-7">
                <h3 className="text-slate-900 font-bold text-base lg:text-lg mb-3">What DutyBoost Does for the POS Provider</h3>
                <div className="space-y-3">
                  {[
                    { from: "POS earns only processing fees", to: "POS earns a share of every validated sale" },
                    { from: "Commoditized transaction utility", to: "Incremental-revenue enabler" },
                    { from: "Retailers negotiate on price", to: "Retailers gain measurable new sales" },
                    { from: "Feature parity with competitors", to: "A defensible commercial differentiator" },
                  ].map((row, i) => (
                    <div key={i} className="grid grid-cols-[1fr,auto,1fr] gap-2 items-center text-xs">
                      <span className="text-red-700 bg-red-100 rounded px-2 py-1 text-center">{row.from}</span>
                      <ArrowRight size={12} className="text-violet-500 flex-shrink-0" />
                      <span className="text-green-700 bg-green-100 rounded px-2 py-1 text-center">{row.to}</span>
                    </div>
                  ))}
                </div>
              </div>
              <div className="bg-gradient-to-br from-violet-50 to-indigo-50 border border-violet-200 rounded-2xl p-5 lg:p-7">
                <div className="grid grid-cols-3 gap-4 lg:gap-6 text-center">
                  {[
                    { val: "0.25%", label: "POS commission per sale" },
                    { val: "10%", label: "Share of platform fee" },
                    { val: `${currency}0`, label: "Setup or licence cost" },
                  ].map((s) => (
                    <div key={s.label}>
                      <div className="text-lg md:text-xl lg:text-2xl font-bold text-violet-600 whitespace-nowrap">{s.val}</div>
                      <div className="text-slate-500 text-xs lg:text-sm mt-1">{s.label}</div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
            <div className="bg-slate-50 border border-slate-200 rounded-2xl p-5 lg:p-7">
              <h3 className="text-slate-900 font-bold text-base lg:text-lg mb-4">The DutyBoost Flow at the POS</h3>
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
                    <span className="text-slate-700 text-sm lg:text-base">{s.step}</span>
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
export function SlideHowItWorks() {
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
export function SlideEconomics({ currency = "€" }) {
  return (
    <SlideWrapper>
      <div className="flex-1 flex flex-col justify-center px-5 py-6 md:px-12 md:py-6 relative">
        <GridBg />
        <div className="relative z-10">
          <div className="mb-5">
            <span className="text-violet-600 text-sm font-semibold uppercase tracking-widest">Transaction Economics</span>
            <h2 className="text-xl md:text-3xl font-heading font-bold text-[#0a0f1e] mt-2">
              {currency}100 Validated Basket — <span className="text-violet-600">Example of Your 0.25% Share</span>
            </h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <div className="bg-slate-50 border border-slate-200 rounded-2xl p-5 mb-4">
                <div className="space-y-2">
                  {[
                    { label: "Original qualifying retail value", val: `${currency}100.00`, style: "text-slate-900 font-bold text-lg" },
                    { label: "Traveller DutyCredit saving", val: `${currency}10.00`, style: "text-orange-600" },
                    { label: "Traveller actually pays", val: `${currency}90.00`, style: "text-blue-600" },
                    { label: "DutyBoost platform fee (2.5%)", val: `${currency}2.50`, style: "text-slate-500" },
                    { label: "  → POS provider share (10% of fee)", val: `${currency}0.25`, style: "text-violet-600" },
                  ].map((row, i) => (
                    <div key={i} className={`flex justify-between items-center py-1 border-b border-slate-100 ${i === 0 ? "pb-2 mb-1" : ""}`}>
                      <span className={`text-sm ${row.label.startsWith("  ") ? "pl-4 text-slate-500" : "text-slate-700"}`}>{row.label.trim()}</span>
                      <span className={`text-sm font-semibold ${row.style}`}>{row.val}</span>
                    </div>
                  ))}
                  <div className="flex justify-between items-center py-2 mt-1 bg-green-50 border border-green-200 rounded-xl px-3">
                    <span className="text-green-700 font-bold text-sm">Airport Retailer net before normal costs</span>
                    <span className="text-green-700 font-bold text-xl">{currency}87.50</span>
                  </div>
                </div>
              </div>
              <div className="bg-slate-50 border border-slate-200 rounded-2xl p-4">
                <div className="text-slate-500 text-xs uppercase tracking-wide mb-2">Platform fee distribution on {currency}2.50</div>
                <div className="flex h-5 rounded-full overflow-hidden gap-px">
                  <div className="bg-violet-500" style={{ width: "10%" }} title="POS Provider 10%" />
                  <div className="bg-blue-500" style={{ width: "90%" }} title="DutyBoost 90%" />
                </div>
                <div className="flex gap-3 mt-2 flex-wrap text-xs">
                  {[
                    { color: "bg-violet-500", label: `POS Provider 10% (${currency}0.25)` },
                    { color: "bg-blue-500", label: `DutyBoost 90% (${currency}2.25)` },
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
                  “Is earning 10% on every validated DutyCredit basket — with zero upfront cost and no operational risk — a meaningful new revenue line for a POS provider already processing those transactions?”
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
                <p className="text-slate-500 text-xs mt-3">The {currency}100 basket is illustrative — your 0.25% commission applies to every validated DutyCredit redemption, whatever its size. Paid only on validated DutyBoost transactions; no cost on ordinary transactions or non-converting travellers.</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </SlideWrapper>
  );
}

// SLIDE 7: DutyCredit Tiers
export function SlideTiers({ currency = "€" }) {
  const rows = [
    { tier: "Entry", range: `${currency}20–${currency}49`, disc: "5%–7.5%", pos: `${currency}0.05–${currency}0.12`, highlight: false },
    { tier: "Boarding", range: `${currency}50–${currency}99`, disc: "7.5%–10%", pos: `${currency}0.13–${currency}0.25`, highlight: false },
    { tier: "Standard", range: `${currency}100–${currency}149`, disc: "10%–12.5%", pos: `${currency}0.25–${currency}0.37`, highlight: true },
    { tier: "Plus", range: `${currency}150–${currency}199`, disc: "12.5%–15%", pos: `${currency}0.38–${currency}0.50`, highlight: false },
    { tier: "Lounge", range: `${currency}200–${currency}249`, disc: "15%–17.5%", pos: `${currency}0.50–${currency}0.62`, highlight: false },
    { tier: "Premium", range: `${currency}250–${currency}299`, disc: "17.5%–20%", pos: `${currency}0.63–${currency}0.75`, highlight: false },
    { tier: "VIP", range: `${currency}300+`, disc: "20% capped", pos: "0.25% of basket", highlight: false },
  ];
  return (
    <SlideWrapper>
      <div className="flex-1 flex flex-col justify-center px-5 py-6 md:px-12 md:py-6">
        <div className="mb-5">
          <span className="text-violet-600 text-sm font-semibold uppercase tracking-widest">DutyCredit Structure</span>
          <h2 className="text-xl md:text-3xl font-heading font-bold text-[#0a0f1e] mt-2">
            You Earn on Every Validated Basket — <span className="text-violet-600">From {currency}20 Upwards</span>
          </h2>
          <p className="text-slate-500 mt-1 text-sm">The DutyCredit discount is tiered, but your 0.25% commission applies to every validated redemption, whatever the basket size. There is no minimum threshold for you to earn.</p>
        </div>
        <div className="bg-slate-800 text-white rounded-2xl p-4 sm:p-6 mb-5">
          <div className="grid grid-cols-4 gap-2 text-xs text-slate-400 mb-2 px-2">
            <span>Tier</span><span>Basket Range</span><span>Traveller Discount</span><span className="text-right">POS Commission</span>
          </div>
          <div className="space-y-1.5">
            {rows.map((row, i) => (
              <div key={i} className={`grid grid-cols-4 gap-2 py-2 px-2 rounded-lg text-sm ${row.highlight ? "bg-violet-700/80" : "hover:bg-white/5"}`}>
                <span className={`font-semibold ${row.highlight ? "text-violet-200" : "text-violet-400"}`}>{row.tier}</span>
                <span className="text-slate-300">{row.range}</span>
                <span className="text-yellow-300">{row.disc}</span>
                <span className="text-green-300 font-semibold text-right">{row.pos}</span>
              </div>
            ))}
          </div>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {[
            { title: `Savings Start at ${currency}20`, desc: `Even a small airport basket triggers your commission — there is no ${currency}100 threshold for the POS provider to earn.`, cardCls: "bg-violet-50 border-violet-200", titleCls: "text-violet-800", bodyCls: "text-violet-700" },
            { title: "Higher Baskets, Higher Commission", desc: `The tiered discount encourages travellers to spend more — and your 0.25% commission scales with every ${currency === "€" ? "euro" : "dollar"} of the basket.`, cardCls: "bg-indigo-50 border-indigo-200", titleCls: "text-indigo-800", bodyCls: "text-indigo-700" },
            { title: "You Earn on Every Redemption", desc: `Whether a ${currency}20 snack basket or a ${currency}300 luxury purchase, every validated DutyCredit redemption pays your 0.25% commission.`, cardCls: "bg-green-50 border-green-200", titleCls: "text-green-800", bodyCls: "text-green-700" },
          ].map((card, i) => (
            <div key={i} className={`${card.cardCls} border rounded-xl p-4`}>
              <div className={`font-bold ${card.titleCls} mb-2`}>{card.title}</div>
              <div className={`${card.bodyCls} text-sm leading-relaxed`}>{card.desc}</div>
            </div>
          ))}
        </div>
      </div>
    </SlideWrapper>
  );
}

// SLIDE 8: Revenue at Scale
export function SlideScale({ currency = "€" }) {
  return (
    <SlideWrapper>
      <div className="flex-1 flex flex-col justify-center px-5 py-6 md:px-12 md:py-6">
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
            <h3 className="font-bold mb-3">DutyCredit Redemption Sensitivity — Targeted Travellers Redeem</h3>
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
    </SlideWrapper>
  );
}

// SLIDE 9: Strategic Benefits
export function SlideBenefits() {
  return (
    <SlideWrapper>
      <div className="flex-1 flex flex-col justify-center px-5 py-6 md:px-12 md:py-6 relative">
        <GridBg />
        <div className="relative z-10">
          <div className="mb-5 lg:mb-8">
            <span className="text-violet-600 text-sm font-semibold uppercase tracking-widest">Strategic Benefits</span>
            <h2 className="text-xl md:text-3xl lg:text-4xl font-heading font-bold text-[#0a0f1e] mt-2">
              More Than Revenue —<br /><span className="text-violet-600">A Defensible Competitive Position</span>
            </h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 lg:gap-6">
            {[
              { icon: <TrendingUp className="w-7 h-7 text-violet-600" />, title: "New Recurring Revenue", desc: "A performance-based commission on every validated sale across your entire network — a revenue line that grows with your footprint." },
              { icon: <ShieldCheck className="w-7 h-7 text-green-600" />, title: "Renewal & Retention", desc: "Retailers gaining measurable incremental sales have a concrete reason to stay on your POS — making renewals about value, not price." },
              { icon: <Globe className="w-7 h-7 text-blue-600" />, title: "Differentiation", desc: "A commercial capability most competitors cannot match — turn transaction processing into an incremental-revenue platform." },
              { icon: <Plug className="w-7 h-7 text-indigo-600" />, title: "Reusable Integration", desc: "One integration enables DutyBoost across all stores, airports and markets you serve — low marginal onboarding cost per retailer." },
              { icon: <Layers className="w-7 h-7 text-violet-600" />, title: "Strengthened Proposition", desc: "Offer retailers a pre-arrival activation engine, not just checkout — making your POS the gateway to incremental conversion." },
              { icon: <BarChart3 className="w-7 h-7 text-green-600" />, title: "Transparent Attribution", desc: "Every validated transaction is reported per store, per airport, per period — clean data for commercial conversations." },
            ].map((card, i) => (
              <div key={i} className="bg-slate-50 border border-slate-200 rounded-2xl p-5">
                <div className="mb-3">{card.icon}</div>
                <div className="text-slate-900 font-bold mb-2">{card.title}</div>
                <div className="text-slate-600 text-sm leading-relaxed">{card.desc}</div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </SlideWrapper>
  );
}

// SLIDE 10: The Integration, In One Call (shared SlideApiExample)
export function SlideIntegrate({ currency = "€" }) {
  return <SlideApiExample currency={currency} />;
}

// SLIDE 11: Value Realized Quickly
export function SlideGetStarted() {
  return (
    <SlideWrapper>
      <div className="flex-1 flex flex-col justify-center px-5 py-6 md:px-12 md:py-6 relative">
        <GridBg />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] rounded-full opacity-[0.04]"
          style={{ background: "radial-gradient(circle, #7c3aed 0%, transparent 70%)" }} />
        <div className="relative z-10 text-center">
          <div className="flex justify-center mb-4 lg:mb-6">
            <div className="bg-slate-50 rounded-2xl px-6 py-3 shadow-lg border border-slate-200">
              <DutyBoostLogo height={40} linkTo="/pos-partner" />
            </div>
          </div>
          <div className="mb-4 lg:mb-6">
            <span className="text-violet-600 text-sm font-semibold uppercase tracking-widest">Value Realized Quickly</span>
            <h2 className="text-xl md:text-4xl lg:text-4xl font-heading font-bold text-[#0a0f1e] mt-2 leading-tight">
              Fast to Launch.<br />
              <span className="text-violet-600">Faster to Recurring Revenue.</span>
            </h2>
          </div>
          <p className="text-slate-500 text-sm md:text-base lg:text-lg max-w-3xl mx-auto leading-relaxed mb-4 lg:mb-6">
            DutyBoost is designed to deliver measurable added value to your POS network in a very short time — no lengthy rollout, no upfront investment, no operational disruption.
          </p>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3 lg:gap-4 max-w-3xl lg:max-w-4xl mx-auto mb-4 lg:mb-6">
            {[
              { title: "Weeks, Not Months", desc: "A single lightweight validation call — no replacement of your POS core, payments or merchant contracts." },
              { title: "Commission From Day One", desc: "Once live, every DutyBoost-validated transaction earns your 10% share of the platform fee — recurring and attributed." },
              { title: "Revenue From the 73% Who Never Buy", desc: "DutyBoost targets the non-converting majority — turning non-intending passengers into incremental, validated basket value." },
              { title: "A Stronger Renewal Story", desc: "Retailers gaining measurable incremental sales renew on value, not price — a defensible competitive position." },
            ].map((card, i) => (
              <div key={i} className="bg-slate-50 border border-slate-200 rounded-2xl p-4 lg:p-5 text-left">
                <div className="text-violet-700 font-bold lg:text-base mb-1.5">{card.title}</div>
                <div className="text-slate-600 text-xs lg:text-sm leading-relaxed">{card.desc}</div>
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
        </div>
      </div>
    </SlideWrapper>
  );
}

export const SLIDES = [
  { id: "cover", type: "cover" },
  { id: "opportunity", type: "opportunity" },
  { id: "problem", type: "problem" },
  { id: "solution", type: "solution" },
  { id: "howItWorks", type: "howItWorks" },
  { id: "economics", type: "economics" },
  { id: "tiers", type: "tiers" },
  { id: "scale", type: "scale" },
  { id: "benefits", type: "benefits" },
  { id: "integrate", type: "integrate" },
  { id: "getStarted", type: "getStarted" },
];

export const SLIDE_LABELS = {
  cover: "Cover",
  opportunity: "The Opportunity",
  problem: "The Facts",
  solution: "The Solution",
  howItWorks: "How It Works",
  economics: "Transaction Economics",
  tiers: "DutyCredit Tiers",
  scale: "Revenue at Scale",
  benefits: "Strategic Benefits",
  integrate: "The Integration, In One Call",
  getStarted: "Value Realized Quickly",
};

export function getSlideComponent(type, currency) {
  const map = {
    cover: () => <SlideCover currency={currency} />,
    opportunity: () => <SlideOpportunity />,
    problem: () => <SlideProblem />,
    solution: () => <SlideSolution currency={currency} />,
    howItWorks: () => <SlideHowItWorks />,
    economics: () => <SlideEconomics currency={currency} />,
    tiers: () => <SlideTiers currency={currency} />,
    scale: () => <SlideScale currency={currency} />,
    benefits: () => <SlideBenefits />,
    integrate: () => <SlideIntegrate currency={currency} />,
    getStarted: () => <SlideGetStarted />,
  };
  return map[type] || map.cover;
}