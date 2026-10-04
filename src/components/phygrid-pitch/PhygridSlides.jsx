import DutyBoostLogo from "@/components/DutyBoostLogo";
import PositioningLine from "@/components/shared/PositioningLine";
import { SlideWrapper, GridBg, Glow, SlideHeader, PhygridMark, CYAN } from "@/components/phygrid-pitch/Shared";
import {
  Plug, ToggleRight, Cpu, CheckCircle2, Zap, ShieldCheck, Plane, Briefcase,
  TrendingUp, Euro, BarChart3, ArrowRight, Store, Users, Globe, Rocket,
} from "lucide-react";

// The €20 Entry-tier example: 5% traveller saving, 2.5% platform fee,
// of which 10% goes to the POS provider.
const M = {
  basket: "20.00",
  saving: "1.00",
  pays: "19.00",
  fee: "0.50",
  pos: "0.05",
  boost: "0.45",
  retailer: "18.50",
};

const card = "bg-white/[0.04] border border-white/10 rounded-2xl";
const kicker = "text-[#00E5FF] text-sm font-semibold uppercase tracking-widest";

// SLIDE 1 — Cover
export function SlideCover() {
  return (
    <SlideWrapper>
      <div className="flex-1 flex flex-col items-center justify-center px-6 md:px-16 text-center relative">
        <GridBg />
        <Glow className="top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[640px] h-[640px]" />
        <div className="relative z-10 flex flex-col items-center gap-7 w-full">
          <div className="bg-white rounded-2xl px-6 py-3 shadow-2xl border border-white/20">
            <DutyBoostLogo height={40} linkTo={null} />
          </div>

          <PhygridMark className="text-3xl md:text-4xl" />

          <div>
            <PositioningLine className="mb-3" dark />
            <h1 className="text-3xl md:text-5xl font-heading font-bold text-white leading-tight mb-4">
              One Integration.<br />
              <span className="text-[#00E5FF]">Recurring Revenue. Zero Risk.</span>
            </h1>
            <p className="text-lg md:text-xl text-slate-400 max-w-3xl leading-relaxed mx-auto">
              Turning Phygrid's POS connectivity into a transactional revenue stream.
            </p>
          </div>

          <div className="grid grid-cols-3 gap-3 sm:gap-8 mt-2 w-full max-w-2xl">
            {[
              { label: "Countries with live deployments", value: "50+" },
              { label: "Data points per month", value: "1.5B+" },
              { label: "Purchases driven per month", value: "35M+" },
            ].map((s) => (
              <div key={s.label} className="text-center">
                <div className="text-xl sm:text-3xl font-bold text-[#00E5FF]">{s.value}</div>
                <div className="text-xs sm:text-sm text-slate-400 mt-1 leading-snug">{s.label}</div>
              </div>
            ))}
          </div>

          <div className="mt-1 text-xs text-slate-500 border border-white/10 rounded px-4 py-2">
            PREPARED FOR PHYGRID — 9 OCTOBER 2026 | CONFIDENTIAL
          </div>
        </div>
      </div>
    </SlideWrapper>
  );
}

// SLIDE 2 — The commercial opportunity
export function SlideOpportunity() {
  const sources = [
    { Icon: Plane, title: "Travel Partners", desc: "Airlines, OTAs, hotels and car rental companies distribute DutyCredits with their booking confirmations." },
    { Icon: Briefcase, title: "Corporate Travel", desc: "DutyCredits embedded in corporate travel and expense programmes, redeemed by business travellers." },
    { Icon: Users, title: "Direct Travellers", desc: "Travellers generate their own DutyCredits on the DutyBoost platform ahead of departure." },
  ];

  return (
    <SlideWrapper>
      <div className="flex-1 flex flex-col justify-center px-5 py-6 md:px-12 md:py-6 relative">
        <GridBg />
        <Glow className="top-0 left-0 w-[420px] h-[420px]" />
        <div className="relative z-10">
          <SlideHeader
            eyebrow="The Commercial Opportunity"
            title={<>Every DutyCredit Redeemed Through Phygrid <span className="text-[#00E5FF]">Is a Commission Earned</span></>}
            subtitle="DutyBoost creates a new, recurring revenue line for Phygrid — earned on transactions Phygrid already processes, with no up-front cost and no operational risk."
          />

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-5">
            {sources.map((s) => (
              <div key={s.title} className={`${card} p-5`}>
                <div className="w-10 h-10 rounded-xl bg-[#00E5FF]/10 border border-[#00E5FF]/30 flex items-center justify-center mb-3">
                  <s.Icon className="w-5 h-5 text-[#00E5FF]" />
                </div>
                <div className="text-white font-semibold text-sm md:text-base">{s.title}</div>
                <div className="text-slate-400 text-xs md:text-sm mt-1 leading-relaxed">{s.desc}</div>
              </div>
            ))}
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {[
              { value: "€37.1B", label: "Airport duty-free & travel retail market" },
              { value: "73%", label: "Of airport passengers currently leave without purchasing" },
              { value: "10%", label: "Of every DutyBoost platform fee earned by Phygrid" },
            ].map((s) => (
              <div key={s.label} className={`${card} p-5 text-center`}>
                <div className="text-2xl font-bold text-[#00E5FF]">{s.value}</div>
                <div className="text-slate-400 text-xs mt-1 leading-snug">{s.label}</div>
              </div>
            ))}
          </div>

          <div className="mt-5 rounded-2xl p-5 bg-gradient-to-r from-[#00E5FF]/15 to-transparent border border-[#00E5FF]/30 flex items-start gap-3">
            <TrendingUp className="w-5 h-5 text-[#00E5FF] flex-shrink-0 mt-0.5" />
            <p className="text-slate-200 text-sm md:text-base leading-relaxed">
              <span className="font-bold text-white">Whichever source the DutyCredit comes from, the redemption is validated at the POS</span> — making Phygrid the participant that earns on every one.
            </p>
          </div>
        </div>
      </div>
    </SlideWrapper>
  );
}

// SLIDE 3 — Why this fits Phygrid
export function SlideFit() {
  const points = [
    { Icon: Plug, title: "You already sit at the transaction layer", desc: "Phygrid connects in-store devices to POS and enterprise systems — the exact point where an incremental sale is validated." },
    { Icon: Users, title: "Travellers arrive with intent", desc: "DutyBoost activates airport shoppers before they reach the terminal, so more of them walk into participating stores ready to buy." },
    { Icon: Cpu, title: "Validation is a single call", desc: "One HTTPS request confirms the DutyCredit and returns the discount. Nothing in your platform's core changes." },
    { Icon: Euro, title: "You earn on every validated basket", desc: "10% of the DutyBoost platform fee is shared with the POS provider — recurring, performance-based, uncapped." },
  ];

  return (
    <SlideWrapper>
      <div className="flex-1 flex flex-col justify-center px-5 py-6 md:px-12 md:py-6 relative">
        <GridBg />
        <div className="relative z-10">
          <SlideHeader
            eyebrow="The Fit"
            title={<>Phygrid Is Already <span className="text-[#00E5FF]">The Intelligent Layer</span></>}
            subtitle="DutyBoost does not ask Phygrid to build anything new. It adds a revenue stream to connectivity that already exists — inside the retail environments Phygrid already serves."
          />

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-5">
            {points.map((p) => (
              <div key={p.title} className={`${card} p-5 flex items-start gap-4`}>
                <div className="w-10 h-10 rounded-xl bg-[#00E5FF]/10 border border-[#00E5FF]/30 flex items-center justify-center flex-shrink-0">
                  <p.Icon className="w-5 h-5 text-[#00E5FF]" />
                </div>
                <div>
                  <div className="text-white font-semibold text-sm md:text-base">{p.title}</div>
                  <div className="text-slate-400 text-xs md:text-sm mt-1 leading-relaxed">{p.desc}</div>
                </div>
              </div>
            ))}
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className={`${card} p-5 text-center`}>
              <Globe className="w-7 h-7 text-[#00E5FF] mx-auto mb-2" />
              <div className="text-2xl font-bold text-white">€37.1B</div>
              <div className="text-slate-400 text-xs mt-1">Airport duty-free &amp; travel retail market</div>
            </div>
            <div className={`${card} p-5 text-center`}>
              <TrendingUp className="w-7 h-7 text-[#00E5FF] mx-auto mb-2" />
              <div className="text-2xl font-bold text-white">73%</div>
              <div className="text-slate-400 text-xs mt-1">Of airport passengers never make a purchase</div>
            </div>
            <div className={`${card} p-5 text-center`}>
              <BarChart3 className="w-7 h-7 text-[#00E5FF] mx-auto mb-2" />
              <div className="text-2xl font-bold text-white">0 up-front</div>
              <div className="text-slate-400 text-xs mt-1">Cost to Phygrid — no fee, licence or subscription</div>
            </div>
          </div>
        </div>
      </div>
    </SlideWrapper>
  );
}

// SLIDE 3 — Integration simplicity
export function SlideSimplicity() {
  const steps = [
    { step: "1", title: "One endpoint", desc: "Phygrid adds a single DutyBoost API call to its existing POS integration — one HTTPS request at checkout." },
    { step: "2", title: "Retailers toggle on", desc: "Each participating retailer activates DutyBoost from a toggle. No per-store development, no code changes." },
    { step: "3", title: "No hardware, no downtime", desc: "Works with the terminals, networks and POS stack already in place. Nothing is replaced or migrated." },
    { step: "4", title: "Toggle off anytime", desc: "If a retailer opts out, the feature simply switches off — zero residual impact on their operation." },
  ];

  const nots = [
    "Not a POS replacement — it sits alongside your existing stack",
    "No PCI burden — DutyBoost never touches card data",
    "No data migration and no retailer-side development",
    "No impact on ordinary, non-DutyBoost transactions",
  ];

  return (
    <SlideWrapper>
      <div className="flex-1 flex flex-col justify-center px-5 py-6 md:px-12 md:py-6 relative">
        <GridBg />
        <div className="relative z-10">
          <SlideHeader
            eyebrow="Integration Simplicity"
            title={<>Non-Invasive. <span className="text-[#00E5FF]">Toggle-Only. One Call.</span></>}
            subtitle="DutyBoost enters at the POS layer as an opt-in feature. Integrate once, then deploy across every retailer, store and airport Phygrid serves — without touching the core platform."
          />

          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            <div className={`${card} p-5 md:p-6`}>
              <div className="flex items-center gap-3 mb-4">
                <ToggleRight className="w-7 h-7 text-[#00E5FF]" />
                <h3 className="font-bold text-white text-base md:text-lg">How It Works</h3>
              </div>
              <div className="space-y-4">
                {steps.map((s) => (
                  <div key={s.step} className="flex items-start gap-3">
                    <div className="w-7 h-7 rounded-full bg-[#00E5FF] flex items-center justify-center text-[#0a0b0d] text-xs font-bold flex-shrink-0 mt-0.5">
                      {s.step}
                    </div>
                    <div>
                      <div className="text-white font-semibold text-sm">{s.title}</div>
                      <div className="text-slate-400 text-xs mt-0.5 leading-relaxed">{s.desc}</div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="flex flex-col gap-4">
              <div className={`${card} p-5`}>
                <div className="flex items-center gap-2 mb-3">
                  <ShieldCheck className="w-5 h-5 text-[#00E5FF]" />
                  <h3 className="font-bold text-white">Why It's Non-Invasive</h3>
                </div>
                <div className="space-y-2">
                  {nots.map((n) => (
                    <div key={n} className="flex items-start gap-2">
                      <CheckCircle2 className="w-4 h-4 text-[#00E5FF] flex-shrink-0 mt-0.5" />
                      <span className="text-slate-300 text-sm">{n}</span>
                    </div>
                  ))}
                </div>
              </div>

              <div className="rounded-2xl p-5 bg-gradient-to-br from-[#00E5FF] to-cyan-500 text-[#0a0b0d]">
                <div className="flex items-center gap-2 mb-2">
                  <Zap className="w-5 h-5" />
                  <h3 className="font-bold">Integrate Once. Deploy Repeatedly.</h3>
                </div>
                <p className="text-[#0a0b0d]/80 text-sm leading-relaxed">
                  A single integration enables DutyBoost across every retailer in Phygrid's estate — fundamentally better scaling economics than per-retailer work.
                </p>
                <div className="mt-3 flex items-center gap-2 text-[#0a0b0d] text-sm font-semibold">
                  <Plug className="w-4 h-4" />
                  <span>1 API call → unlimited retailer activation</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </SlideWrapper>
  );
}

// SLIDE 4 — Commercial value: the 10% share
export function SlideCommercialValue() {
  return (
    <SlideWrapper>
      <div className="flex-1 flex flex-col justify-center px-5 py-6 md:px-12 md:py-6 relative">
        <GridBg />
        <Glow className="top-0 right-0 w-[420px] h-[420px]" />
        <div className="relative z-10">
          <SlideHeader
            eyebrow="Commercial Value"
            title={<>Phygrid Earns <span className="text-[#00E5FF]">10% of Every Platform Fee</span></>}
            subtitle="DutyBoost charges a 2.5% platform fee on each validated DutyCredit basket — and shares 10% of that fee with the POS provider that validates the transaction. No setup fee, no licence, no subscription: revenue only when a sale actually happens."
          />

          <div className="grid grid-cols-1 md:grid-cols-2 gap-5 items-stretch">
            <div className={`${card} p-6`}>
              <h3 className="font-bold text-white mb-5">Where the 2.5% Platform Fee Goes</h3>
              <div className="space-y-4">
                {[
                  { party: "DutyBoost", share: "90% of the fee", pct: "2.25% of retail value", val: "€0.45", strong: false },
                  { party: "Phygrid (POS Provider)", share: "10% of the fee", pct: "0.25% of retail value", val: "€0.05", strong: true },
                ].map((row) => (
                  <div
                    key={row.party}
                    className={`flex items-center gap-4 rounded-xl p-4 ${
                      row.strong ? "bg-[#00E5FF]/10 border border-[#00E5FF]/40" : "bg-white/[0.03] border border-white/10"
                    }`}
                  >
                    <div className={`w-1.5 h-12 rounded-full ${row.strong ? "bg-[#00E5FF]" : "bg-slate-600"}`} />
                    <div className="flex-1">
                      <div className={`font-semibold text-sm ${row.strong ? "text-[#00E5FF]" : "text-white"}`}>{row.party}</div>
                      <div className="text-slate-400 text-xs mt-0.5">{row.share} = {row.pct}</div>
                    </div>
                    <div className={`text-2xl font-bold ${row.strong ? "text-[#00E5FF]" : "text-slate-300"}`}>{row.val}</div>
                  </div>
                ))}
              </div>

              <div className="mt-5">
                <div className="text-slate-500 text-xs uppercase tracking-wide mb-2">Platform fee distribution on €{M.fee}</div>
                <div className="flex h-5 rounded-full overflow-hidden gap-px">
                  <div className="bg-[#00E5FF]" style={{ width: "10%" }} />
                  <div className="bg-slate-600" style={{ width: "90%" }} />
                </div>
                <div className="flex gap-4 mt-2 flex-wrap text-xs">
                  <div className="flex items-center gap-1.5">
                    <div className="w-3 h-3 rounded-sm bg-[#00E5FF]" />
                    <span className="text-slate-400">Phygrid 10% (€{M.pos})</span>
                  </div>
                  <div className="flex items-center gap-1.5">
                    <div className="w-3 h-3 rounded-sm bg-slate-600" />
                    <span className="text-slate-400">DutyBoost 90% (€{M.boost})</span>
                  </div>
                </div>
              </div>
            </div>

            <div className="flex flex-col gap-4">
              <div className="rounded-2xl p-6 bg-gradient-to-br from-[#00E5FF]/15 to-transparent border border-[#00E5FF]/30">
                <h3 className="text-white font-bold text-lg mb-3">The Core Question</h3>
                <p className="text-slate-200 text-base leading-relaxed font-semibold">
                  "Is earning 10% on every validated DutyCredit basket — with zero up-front cost and no operational risk — a meaningful new revenue line for a platform already processing those transactions?"
                </p>
                <p className="text-[#00E5FF] font-bold text-lg mt-3">Yes — and it scales with Phygrid's footprint.</p>
              </div>

              <div className={`${card} p-5`}>
                <h3 className="text-white font-semibold mb-3">Why the economics work for Phygrid</h3>
                <div className="space-y-2">
                  {[
                    { item: "You already process the transaction", val: "€0 marginal cost" },
                    { item: "You earn on incremental sales", val: "Pure upside" },
                    { item: "Performance-based only", val: "€0 on non-converters" },
                    { item: "Reported per transaction", val: "Full transparency" },
                  ].map((row) => (
                    <div key={row.item} className="flex justify-between items-center py-2 border-b border-white/5 last:border-0">
                      <span className="text-slate-300 text-sm">{row.item}</span>
                      <span className="font-bold text-[#00E5FF] text-sm whitespace-nowrap ml-3">{row.val}</span>
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

// SLIDE 6 — Transaction economics
export function SlideEconomics() {
  const rows = [
    { label: "Original qualifying retail value", val: `€${M.basket}`, style: "text-white font-bold text-base" },
    { label: "Traveller DutyCredit saving (5%)", val: `€${M.saving}`, style: "text-amber-400" },
    { label: "Traveller actually pays", val: `€${M.pays}`, style: "text-slate-200" },
    { label: "DutyBoost platform fee (2.5%)", val: `€${M.fee}`, style: "text-slate-400" },
    { label: "→ Phygrid share (10% of fee)", val: `€${M.pos}`, style: "text-[#00E5FF]" },
  ];

  return (
    <SlideWrapper>
      <div className="flex-1 flex flex-col justify-center px-5 py-6 md:px-12 md:py-6 relative">
        <GridBg />
        <div className="relative z-10">
          <SlideHeader
            eyebrow="Transaction Economics"
            title={<>€{M.basket} Entry-Tier Basket — <span className="text-[#00E5FF]">Phygrid's Share</span></>}
          />

          <div className="grid grid-cols-1 md:grid-cols-2 gap-5 items-stretch">
            <div className={`${card} p-5`}>
              <div className="space-y-1">
                {rows.map((r, i) => (
                  <div key={r.label} className={`flex justify-between items-center py-2 ${i < rows.length - 1 ? "border-b border-white/5" : ""}`}>
                    <span className={`text-sm ${r.label.startsWith("→") ? "pl-3 text-slate-400" : "text-slate-300"}`}>{r.label}</span>
                    <span className={`text-sm font-semibold ${r.style}`}>{r.val}</span>
                  </div>
                ))}
                <div className="flex justify-between items-center py-2.5 mt-2 bg-white/5 border border-white/10 rounded-xl px-4">
                  <span className="text-slate-200 font-bold text-sm">Airport retailer net before normal costs</span>
                  <span className="text-white font-bold text-xl">€{M.retailer}</span>
                </div>
              </div>
            </div>

            <div className="flex flex-col gap-4">
              <div className={`${card} p-5`}>
                <h3 className="text-white font-semibold mb-3">One Transaction — Everyone Gains</h3>
                <div className="space-y-3">
                  {[
                    { party: "Traveller", val: `saves €${M.saving}`, color: "text-amber-400" },
                    { party: "Airport retailer", val: `nets €${M.retailer}`, color: "text-slate-200" },
                    { party: "Phygrid", val: `earns €${M.pos}`, color: "text-[#00E5FF]" },
                    { party: "DutyBoost", val: `earns €${M.boost}`, color: "text-slate-400" },
                  ].map((r) => (
                    <div key={r.party} className="flex items-center justify-between">
                      <span className="text-slate-300 text-sm">{r.party}</span>
                      <span className={`font-bold text-sm ${r.color}`}>{r.val}</span>
                    </div>
                  ))}
                </div>
              </div>

              <div className={`${card} p-5`}>
                <p className="text-slate-400 text-xs leading-relaxed">
                  The €{M.basket} Entry-tier basket is illustrative — Phygrid's 0.25% commission applies to every validated DutyCredit redemption, whatever its size. And wherever that DutyCredit originated — distributed by a travel or corporate partner, or generated directly by the traveller — the POS provider is the one participant that always earns, because every redemption is validated through the transaction you already process.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </SlideWrapper>
  );
}

// SLIDE 7 — Revenue at scale
export function SlideScale() {
  const tiers = [
    { size: "Pilot", stores: "50 stores", net: "€18,000" },
    { size: "Regional", stores: "500 stores", net: "€180,000" },
    { size: "Enterprise", stores: "2,000 stores", net: "€720,000" },
  ];

  return (
    <SlideWrapper>
      <div className="flex-1 flex flex-col justify-center px-5 py-6 md:px-12 md:py-6 relative">
        <GridBg />
        <div className="relative z-10">
          <SlideHeader
            eyebrow="Revenue at Scale"
            title={<>What DutyBoost Brings <span className="text-[#00E5FF]">to Phygrid's Store Network</span></>}
            subtitle="Estimated annual POS-provider commission (0.25% of every validated basket) at an 80% DutyCredit redemption rate, blended across corporate, travel-partner and direct sources — assuming 3,000 DutyCredits issued per store per year and a €60 average basket."
          />

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-5">
            {tiers.map((t) => (
              <div key={t.size} className={`${card} p-5 text-center`}>
                <div className="text-xs font-semibold text-[#00E5FF] uppercase tracking-widest mb-1">{t.size}</div>
                <div className="text-slate-400 text-sm mb-3">{t.stores}</div>
                <div className="text-2xl md:text-3xl font-bold text-white mb-1">{t.net}</div>
                <div className="text-[#00E5FF] text-sm font-medium mb-2">annual Phygrid commission</div>
                <div className="text-slate-500 text-xs border-t border-white/10 pt-2">80% redemption · 3,000 credits/store @ €60</div>
              </div>
            ))}
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className={`${card} p-5`}>
              <h3 className="text-white font-bold mb-3">Redemption Sensitivity</h3>
              <div className="space-y-1.5 text-sm">
                {[
                  { pp: "100% redemption", mult: "1.25× the figures above" },
                  { pp: "80% redemption", mult: "the figures above" },
                  { pp: "60% redemption", mult: "0.75× the figures above" },
                  { pp: "40% redemption", mult: "0.5× the figures above" },
                ].map((row, i) => (
                  <div key={row.pp} className={`flex justify-between items-center py-2 px-3 rounded-lg ${i === 1 ? "bg-[#00E5FF]/10 border border-[#00E5FF]/30 font-semibold" : ""}`}>
                    <span className={i === 1 ? "text-[#00E5FF]" : "text-slate-400"}>{row.pp}</span>
                    <span className="text-slate-300">{row.mult}</span>
                  </div>
                ))}
              </div>
            </div>

            <div className={`${card} p-5`}>
              <h3 className="text-white font-bold mb-3">Why This Is Pure Upside</h3>
              <ul className="space-y-2">
                {[
                  "100% incremental — earned on sales that otherwise would not happen",
                  "Zero up-front cost — no setup fee, no subscription, no licence",
                  "No change to Phygrid's core, payments or merchant contracts",
                  "Attributed and reported transparently per transaction",
                ].map((item) => (
                  <li key={item} className="flex items-start gap-2">
                    <CheckCircle2 className="w-4 h-4 text-[#00E5FF] flex-shrink-0 mt-0.5" />
                    <span className="text-slate-300 text-sm">{item}</span>
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

// SLIDE 8 — Next steps
export function SlideNextSteps() {
  const steps = [
    { step: "01", title: "Technical discovery", desc: "A 45-minute session with Phygrid's engineering team to map the checkout flow and confirm the integration point." },
    { step: "02", title: "Sandbox access", desc: "DutyBoost provides test credentials and documentation so Phygrid can validate the call in a non-production environment." },
    { step: "03", title: "Pilot with one retail group", desc: "Go live with a single participating retailer to measure validation volume, basket lift and commission flow." },
    { step: "04", title: "Commercial agreement", desc: "Formalise the 10% platform-fee share and scale the toggle across Phygrid's retail estate." },
  ];

  return (
    <SlideWrapper>
      <div className="flex-1 flex flex-col justify-center px-5 py-6 md:px-12 md:py-6 relative">
        <GridBg />
        <div className="relative z-10">
          <SlideHeader
            eyebrow="Next Steps"
            title={<>From Meeting <span className="text-[#00E5FF]">to Live Transaction</span></>}
            subtitle="A low-risk path with no commitment until a pilot proves the numbers inside Phygrid's own environment."
          />

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-5">
            {steps.map((s) => (
              <div key={s.step} className={`${card} p-5 flex flex-col`}>
                <div className="text-3xl font-heading font-bold text-[#00E5FF]/40 mb-3">{s.step}</div>
                <div className="text-white font-semibold text-sm mb-2">{s.title}</div>
                <div className="text-slate-400 text-xs leading-relaxed">{s.desc}</div>
              </div>
            ))}
          </div>

          <div className="rounded-2xl p-5 bg-gradient-to-r from-[#00E5FF]/15 to-transparent border border-[#00E5FF]/30 flex items-start gap-4">
            <Rocket className="w-6 h-6 text-[#00E5FF] flex-shrink-0 mt-0.5" />
            <p className="text-slate-200 text-sm md:text-base leading-relaxed">
              <span className="font-bold text-white">Nothing is committed before step 3.</span> Steps 1 and 2 require no commercial agreement — they simply establish that the integration works inside Phygrid's stack.
            </p>
          </div>
        </div>
      </div>
    </SlideWrapper>
  );
}

// SLIDE 9 — Closing
export function SlideClosing() {
  return (
    <SlideWrapper>
      <div className="flex-1 flex flex-col items-center justify-center px-6 md:px-16 text-center relative">
        <GridBg />
        <Glow className="top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[640px] h-[640px]" />
        <div className="relative z-10 flex flex-col items-center gap-7 w-full">
          <div className="bg-white rounded-2xl px-6 py-3 shadow-2xl border border-white/20">
            <DutyBoostLogo height={38} linkTo={null} />
          </div>

          <PhygridMark className="text-2xl md:text-3xl" />

          <div>
            <h1 className="text-3xl md:text-5xl font-heading font-bold text-white leading-tight mb-4">
              Your POS Layer,<br />
              <span className="text-[#00E5FF]">Now a New Ancillary Revenue Stream</span>
            </h1>
            <p className="text-lg md:text-xl text-slate-400 max-w-3xl leading-relaxed mx-auto">
              One integration. A performance-based income line that grows with every retailer Phygrid connects.
            </p>
          </div>

          <div className="grid grid-cols-3 gap-3 sm:gap-8 w-full max-w-2xl">
            {[
              { label: "Integration effort", value: "1 API call" },
              { label: "Up-front cost", value: "€0" },
              { label: "Platform-fee share", value: "10%" },
            ].map((s) => (
              <div key={s.label} className="text-center">
                <div className="text-lg sm:text-2xl font-bold text-[#00E5FF]">{s.value}</div>
                <div className="text-xs sm:text-sm text-slate-400 mt-1 leading-snug">{s.label}</div>
              </div>
            ))}
          </div>

          <div className="flex flex-col items-center gap-1.5">
            <p className="text-[#00E5FF] text-base lg:text-xl font-bold">
              No setup fee. No subscription. No risk. Only incremental revenue.
            </p>
            <p className="text-slate-300 text-sm lg:text-base font-semibold flex items-center gap-2">
              <Store className="w-4 h-4 text-[#00E5FF]" />
              Always performance-based — 10% of the DutyBoost platform fee on every validated sale.
              <ArrowRight className="w-4 h-4 text-[#00E5FF]" />
            </p>
          </div>

          <div className="mt-1 text-xs text-slate-500 border border-white/10 rounded px-4 py-2">
            CONFIDENTIAL — 2026 | Chamber of Commerce: 42053181 | VAT: NL869492068B01
          </div>
        </div>
      </div>
    </SlideWrapper>
  );
}

export const SLIDES = [
  { id: "cover", type: "cover" },
  { id: "opportunity", type: "opportunity" },
  { id: "commercialValue", type: "commercialValue" },
  { id: "economics", type: "economics" },
  { id: "scale", type: "scale" },
  { id: "fit", type: "fit" },
  { id: "simplicity", type: "simplicity" },
  { id: "nextSteps", type: "nextSteps" },
  { id: "closing", type: "closing" },
];

export const SLIDE_LABELS = {
  cover: "Cover",
  opportunity: "The Opportunity",
  commercialValue: "Commercial Value",
  economics: "Transaction Economics",
  scale: "Revenue at Scale",
  fit: "The Fit",
  simplicity: "Integration",
  nextSteps: "Next Steps",
  closing: "Thank You",
};

export function getSlideComponent(type) {
  const map = {
    cover: () => <SlideCover />,
    opportunity: () => <SlideOpportunity />,
    fit: () => <SlideFit />,
    simplicity: () => <SlideSimplicity />,
    commercialValue: () => <SlideCommercialValue />,
    economics: () => <SlideEconomics />,
    scale: () => <SlideScale />,
    nextSteps: () => <SlideNextSteps />,
    closing: () => <SlideClosing />,
  };
  return map[type] || map.cover;
}