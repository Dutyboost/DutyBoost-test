import {
  Cpu, BarChart3, Link2, Briefcase, CheckCircle,
  Plane, Package, Globe, TrendingUp, Building2, DollarSign, MapPin, BadgePercent,
  Search, Code2, ShieldCheck, Rocket, XCircle, Clock, Store,
} from "lucide-react";
import DutyBoostLogo from "@/components/DutyBoostLogo";
import AirportRetailerIcon from "@/components/AirportRetailerIcon";
import TravelerIcon from "@/components/TravelerIcon";
import { SlideWrapper, GridBg } from "@/components/investor/v2/Shared";
import { SlideSolution } from "@/components/shared/SlideSolution";

// ── Avolta sources ───────────────────────────────────────────────────────────
const AVOLTA_FY2025 = "https://www.avoltaworld.com/en/press_release/2026-03-11/avolta-reports-strong-2025-advancing-sales-profits-and-cash-generation";
const AVOLTA_H1_2025 = "https://www.avoltaworld.com/en/press_release/2025-07-31/avolta-reports-another-solid-set-results-first-half-2025";
const AVOLTA_Q1_2026 = "https://www.avoltaworld.com/sites/default/files/document/2026-05/Avolta_Q1%202026%20Presentation.pdf?utm_source=chatgpt.com";
const AVOLTA_SITE = "https://www.avoltaworld.com";
const AVOLTA_EXT_ARUBA = "https://www.avoltaworld.com/en/press_release/2026-07-23/avolta-secures-eight-year-duty-free-extension-aruba-airport-caribbean";
const AAA_SITE = "https://www.airportaruba.com";
const AAA_GATEWAY = "https://www.airportaruba.com/gateway2030";
const M1NDSET_LINK = "https://m1nd-set.com/";
const TFWA_LINK = "https://www.tfwa.com/";

const linkCls = "text-blue-600 font-semibold underline decoration-blue-600/50 hover:decoration-blue-400 hover:text-blue-500 transition-colors";

// ── Avolta FY2025 financials (sourced, converted CHF→USD at 1.225) ───────────
// IFRS revenue $16,820m (+1.9%); CORE turnover $16,807m (+5.9% CER);
// CORE EBITDA $1,622m (9.7% margin); Operating profit $1,351m (+18.1%).
const AVOLTA_TURNOVER_IFRS = 16820; // USDm
const AVOLTA_TURNOVER_CORE = 16807; // USDm
const AVOLTA_EBITDA = 1622; // USDm
const AVOLTA_OP_PROFIT = 1351; // USDm
const AVOLTA_OUTLETS = 5100;
const AVOLTA_LOCATIONS = 1000;
const AVOLTA_COUNTRIES = 70;
const AVOLTA_AIRPORTS = 350;
const AVOLTA_PAX_REACH = 2500; // million — Avolta published passenger reach

const CONVERTING_SHARE = 0.27;
const NON_PURCHASE_SHARE = 0.73;
const RETAILER_NET = 0.875;

// Global uplift: +1pp conversion across Avolta network
const GLOBAL_PAX = AVOLTA_PAX_REACH; // 2,500M
const GLOBAL_NON_PURCHASE = Math.round(GLOBAL_PAX * NON_PURCHASE_SHARE); // ≈ 1,825M
const GLOBAL_UPLIFT_1PP_B = GLOBAL_PAX * 0.01 * 100 / 1000; // ≈ $2.5B per +1pp (at $100 basket)

// ── Aruba data (sourced) ─────────────────────────────────────────────────────
// Avolta: "more than three million" passengers; 8-year duty free extension (Jul 2026).
const AUA_PAX = 3; // million passengers
const AUA_CONVERTERS = AUA_PAX * CONVERTING_SHARE; // ≈ 0.81M
const AUA_NON_PURCHASE = AUA_PAX * NON_PURCHASE_SHARE; // ≈ 2.19M
const AUA_REVENUE_EST = 30; // ~$30M, Avolta AUA retail revenue estimate
const ILLUSTRATIVE_BASKET = 100; // USD
const AUA_UPLIFT_1PP = AUA_PAX * 1_000_000 * 0.01 * ILLUSTRATIVE_BASKET; // ≈ $3M per +1pp

const AUA_STORES = [
  "Aruba Duty Free – Liquor & Tobacco",
  "Aruba Duty Free – Perfume & Cosmetics",
  "Aruba Duty Free – Fashion & Accessories",
  "Sound & Vision",
  "Infinity & Co.",
];

const fmtUSDm = (n) => `$${Math.round(n).toLocaleString()}m`;
const fmtUSDb = (n) => `$${n.toFixed(1)}B`;
const fmtM = (n) => `$${(Math.round(n / 100000) / 10).toFixed(1).replace(/\.0$/, '')}M`;
const fmtK = (n) => `$${Math.round(n / 1000).toLocaleString()}K`;
const fmtRevenue = (n) => n >= 1_000_000 ? fmtM(n) : fmtK(n);

// SLIDE 1: Cover — Avolta
export function SlideCoverAvolta() {
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
              A Presentation for Avolta — From Global Network to Aruba
            </p>
          </div>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 sm:gap-6 mt-4 w-full">
            {[
              { label: "Global Revenue 2025", value: "$16.82B" },
              { label: "AUA Revenue (est.)", value: "~$30M" },
              { label: "AUA Passengers", value: "3M+" },
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
export function SlideTeam() {
  const members = [
    { name: "Jaquelin Beliad Perez", role: "Co-Founder / Airport Retail & Brand Specialist", linkedin: "https://www.linkedin.com/in/maria-jaquelin-m-46b21486/", photo: "https://media.base44.com/images/public/69c97dcd1c1950fa88424690/abc1d9aaf_JaquelinBeliadPerez.jpeg" },
    { name: "Ariunzaya Zorigt", role: "Marketing Director", linkedin: "https://www.linkedin.com/in/aria-zorigt/", photo: "https://media.base44.com/images/public/69c97dcd1c1950fa88424690/9ae3deb4b_AriunzayaZorigt.jpeg" },
    { name: "Fares Ben Halima", role: "Technical Director", linkedin: "https://www.linkedin.com/in/fares-ben-halima-36b948158/", photo: "https://media.base44.com/images/public/69c97dcd1c1950fa88424690/38fa892f5_FaresBenHalima.jpeg" },
    { name: "Raël Martis Ozuna", role: "Co-Founder / Chief Commercial Officer", linkedin: "https://www.linkedin.com/in/israel-martis-ozuna/", photo: "https://media.base44.com/images/public/69c97dcd1c1950fa88424690/58e6f7004_FotoRaelMartis.jpeg" },
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

// SLIDE 3: Avolta at a Glance — global scale
export function SlideAvoltaAtAGlance() {
  return (
    <SlideWrapper>
      <div className="flex-1 flex flex-col justify-center px-5 py-6 md:px-12 md:py-6 relative">
        <GridBg />
        <div className="relative z-10">
          <div className="mb-5">
            <span className="text-blue-600 text-sm font-semibold uppercase tracking-widest">Avolta — At a Glance</span>
            <h2 className="text-xl md:text-3xl font-heading font-bold text-[#0a0f1e] mt-2">
              The World's Largest <span className="text-blue-600">Airport Retailer</span>
            </h2>
            <p className="text-slate-500 mt-1 text-sm">
              Figures from <a href={AVOLTA_FY2025} target="_blank" rel="noopener noreferrer" className={linkCls}>Avolta FY 2025 results</a> and{" "}
              <a href={AVOLTA_SITE} target="_blank" rel="noopener noreferrer" className={linkCls}>avoltaworld.com</a>.
            </p>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-5">
            <div className="bg-blue-50 border border-blue-200 rounded-2xl p-5 text-center">
              <DollarSign className="w-8 h-8 text-blue-600 mx-auto mb-2" />
              <div className="text-2xl md:text-3xl font-bold text-blue-700 mb-1">$16.82B</div>
              <div className="text-slate-600 font-semibold text-sm">Revenue 2025</div>
              <div className="text-slate-500 text-xs mt-1">+1.9% reported</div>
            </div>
            <div className="bg-indigo-50 border border-indigo-200 rounded-2xl p-5 text-center">
              <Building2 className="w-8 h-8 text-indigo-600 mx-auto mb-2" />
              <div className="text-2xl md:text-3xl font-bold text-indigo-700 mb-1">5,100+</div>
              <div className="text-slate-600 font-semibold text-sm">Outlets Worldwide</div>
              <div className="text-slate-500 text-xs mt-1">Across 70+ countries</div>
            </div>
            <div className="bg-violet-50 border border-violet-200 rounded-2xl p-5 text-center">
              <Plane className="w-8 h-8 text-violet-600 mx-auto mb-2" />
              <div className="text-2xl md:text-3xl font-bold text-violet-700 mb-1">~2.5B</div>
              <div className="text-slate-600 font-semibold text-sm">Passenger Reach</div>
              <div className="text-slate-500 text-xs mt-1">Across 350+ airports</div>
            </div>
            <div className="bg-green-50 border border-green-200 rounded-2xl p-5 text-center">
              <TrendingUp className="w-8 h-8 text-green-600 mx-auto mb-2" />
              <div className="text-2xl md:text-3xl font-bold text-green-700 mb-1">$1,622m</div>
              <div className="text-slate-600 font-semibold text-sm">CORE EBITDA 2025</div>
              <div className="text-slate-500 text-xs mt-1">9.7% margin (+0.3pp)</div>
            </div>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            <div className="bg-slate-50 border border-slate-200 rounded-2xl p-6">
              <h3 className="font-bold text-slate-700 mb-3">Regional Momentum (H1 2025, organic)</h3>
              <div className="space-y-2 text-sm">
                {[
                  { reg: "Europe, MEA", val: "+9.2%", note: "Largest region; strong EMEA recovery" },
                  { reg: "Latin America", val: "+8.1%", note: "Brazil, Mexico, Caribbean growth" },
                  { reg: "Asia Pacific", val: "+5.1%", note: "Expanding footprint" },
                  { reg: "North America", val: "−0.2%", note: "Hudson; stabilising" },
                ].map((r) => (
                  <div key={r.reg} className="flex items-center gap-3 py-1.5 px-3 rounded-lg bg-white border border-slate-100">
                    <span className="text-blue-700 font-semibold w-40">{r.reg}</span>
                    <span className="text-green-600 font-bold w-12">{r.val}</span>
                    <span className="text-slate-500 text-xs flex-1">{r.note}</span>
                  </div>
                ))}
              </div>
              <div className="text-slate-400 text-xs mt-3">Source: <a href={AVOLTA_H1_2025} target="_blank" rel="noopener noreferrer" className={linkCls}>Avolta H1 2025 results</a></div>
            </div>
            <div className="bg-gradient-to-br from-blue-600 to-indigo-700 rounded-2xl p-6 text-white">
              <div className="flex items-center gap-2 mb-3">
                <Globe className="w-5 h-5" />
                <h3 className="font-bold">A Global Portfolio of Leading Brands</h3>
              </div>
              <p className="text-blue-50 text-sm leading-relaxed mb-3">
                Avolta operates through World Duty Free, Dufry, Hudson, Hellenic Duty Free, Nuance and RegStaer — the most comprehensive airport retail network in the world.
              </p>
              <div className="mt-3 grid grid-cols-3 gap-3 text-center">
                {[
                  { val: "1,000+", label: "Locations" },
                  { val: "70+", label: "Countries" },
                  { val: "350+", label: "Airports" },
                ].map((s) => (
                  <div key={s.label} className="bg-white/10 rounded-lg p-2">
                    <div className="text-sm font-bold">{s.val}</div>
                    <div className="text-blue-200 text-xs">{s.label}</div>
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

// SLIDE 4: The Facts — global non-purchase problem
export function SlideFacts() {
  return (
    <SlideWrapper>
      <div className="flex-1 flex flex-col justify-center px-5 py-6 md:px-12 md:py-6 relative">
        <GridBg />
        <div className="relative z-10">
          <div className="mb-5">
            <span className="text-blue-600 text-sm font-semibold uppercase tracking-widest">The Facts — Avolta Network</span>
            <h2 className="text-xl md:text-3xl font-heading font-bold text-[#0a0f1e] mt-2">
              73% of Passengers at Avolta Airports<br /><span className="text-blue-600">Never Make a Purchase</span>
            </h2>
            <p className="text-slate-500 mt-1 text-sm">
              Avolta's ~2.5B passenger reach and industry conversion benchmarks.{" "}
              Penetration: <a href={M1NDSET_LINK} target="_blank" rel="noopener noreferrer" className={linkCls}>m1nd-set</a> /{" "}
              <a href={TFWA_LINK} target="_blank" rel="noopener noreferrer" className={linkCls}>TFWA</a>.
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-5 mb-5">
            <div className="bg-slate-50 border border-slate-200 rounded-2xl p-6">
              <div className="text-3xl md:text-4xl font-bold text-blue-600 mb-2">~2.5B</div>
              <div className="text-slate-800 font-semibold">Passengers exposed to Avolta network</div>
              <div className="text-slate-500 text-sm mt-1">350+ airports worldwide</div>
            </div>
            <div className="bg-slate-50 border border-slate-200 rounded-2xl p-6">
              <div className="text-3xl md:text-4xl font-bold text-orange-600 mb-2">27%</div>
              <div className="text-slate-800 font-semibold">Penetration rate</div>
              <div className="text-slate-500 text-sm mt-1">Share who convert to a purchase{" "}
                <a href={M1NDSET_LINK} target="_blank" rel="noopener noreferrer" className={linkCls}>(m1nd-set / TFWA)</a>
              </div>
            </div>
            <div className="bg-red-50 border border-red-200 rounded-2xl p-6">
              <div className="text-3xl md:text-4xl font-bold text-red-600 mb-2">~1.83B</div>
              <div className="text-slate-800 font-semibold">Non-purchasing passengers</div>
              <div className="text-slate-500 text-sm mt-1">73% of Avolta network traffic</div>
            </div>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            <div className="bg-slate-50 border border-slate-200 rounded-2xl p-5">
              <h3 className="text-slate-800 font-semibold text-sm mb-3">Traditional Airport Retail Failure Points</h3>
              <ul className="space-y-2">
                {[
                  "Activation starts only after the traveller clears security",
                  "No financial reason for a non-intending buyer to enter a store",
                  "Travel & Corporate Partners hold the early relationship — but get zero retail participation",
                  "73% of Avolta-exposed passengers walk straight to the gate",
                ].map((item, i) => (
                  <li key={i} className="flex items-start gap-3">
                    <div className="w-1.5 h-1.5 rounded-full bg-red-500 mt-2 flex-shrink-0" />
                    <span className="text-slate-600 text-sm">{item}</span>
                  </li>
                ))}
              </ul>
            </div>
            <div className="flex flex-col gap-4">
              <div className="bg-blue-50 border border-blue-200 rounded-2xl p-5">
                <p className="text-blue-700 text-sm leading-relaxed italic">
                  "Large passenger flows do not automatically become retail customers. The 73% represents conversion headroom — not a permanent ceiling."
                </p>
              </div>
              <div className="bg-gradient-to-br from-blue-600 to-indigo-700 rounded-2xl p-5 text-white">
                <p className="font-bold text-sm leading-snug">
                  1.83 billion non-purchasing passengers across Avolta's network — the largest untapped revenue pool in travel retail.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </SlideWrapper>
  );
}

// SLIDE 5: The Solution — shared component
export { SlideSolution };

// SLIDE 6: The Global Opportunity — Avolta network uplift math
export function SlideGlobalOpportunity() {
  return (
    <SlideWrapper>
      <div className="flex-1 flex flex-col justify-center px-5 py-6 md:px-12 md:py-6 relative">
        <GridBg />
        <div className="relative z-10">
          <div className="mb-5">
            <span className="text-blue-600 text-sm font-semibold uppercase tracking-widest">The Global Opportunity</span>
            <h2 className="text-xl md:text-3xl font-heading font-bold text-[#0a0f1e] mt-2">
              Small Conversion Gains = <span className="text-blue-600">Enormous Value Across Avolta's Network</span>
            </h2>
            <p className="text-slate-500 mt-1 text-sm">
              Avolta's ~2.5B passengers represent the largest conversion headroom in travel retail. ~73% never purchase — DutyBoost activates them before arrival.
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-5">
            <div className="bg-red-50 border border-red-200 rounded-2xl p-6">
              <div className="flex items-center gap-4">
                <div>
                  <div className="text-3xl md:text-5xl font-bold text-red-600">~1.83B</div>
                  <div className="text-slate-600 font-semibold text-sm mt-1">Non-purchasing passengers</div>
                  <div className="text-slate-400 text-xs mt-1">73% of Avolta's ~2.5B reach</div>
                </div>
                <div className="flex-1 text-right">
                  <div className="text-3xl md:text-5xl font-bold text-green-600">~675M</div>
                  <div className="text-slate-600 font-semibold text-sm mt-1">Today's converting base</div>
                  <div className="text-slate-400 text-xs mt-1">the ~27% who currently buy</div>
                </div>
              </div>
              <div className="mt-3 pt-3 border-t border-red-200/60 text-slate-500 text-xs">
                Passenger reach: <a href={AVOLTA_Q1_2026} target="_blank" rel="noopener noreferrer" className={linkCls}>Avolta Q1 2026 Presentation</a> (see slide 7). 73/27 ratio:{" "}
                <a href={M1NDSET_LINK} target="_blank" rel="noopener noreferrer" className={linkCls}>m1nd-set</a> /{" "}
                <a href={TFWA_LINK} target="_blank" rel="noopener noreferrer" className={linkCls}>TFWA</a>.
              </div>
            </div>
            <div className="bg-blue-50 border border-blue-200 rounded-2xl p-6">
              <h3 className="font-bold text-blue-800 mb-2">Each +1pp of Conversion</h3>
              <div className="text-3xl md:text-4xl font-bold text-blue-700">~25M</div>
              <div className="text-slate-600 text-sm mt-1">additional purchasing travellers across the network</div>
              <div className="text-green-600 font-bold text-xl mt-3">{fmtUSDb(GLOBAL_UPLIFT_1PP_B)}</div>
              <div className="text-slate-600 text-sm">incremental retail value (illustrative, $100 basket)</div>
              <div className="text-slate-400 text-xs mt-3">1pp = 1% of Avolta's ~2.5B passengers converting at the model's qualifying basket.</div>
            </div>
          </div>
          <div className="bg-gradient-to-br from-blue-600 to-indigo-700 rounded-2xl p-5 text-white">
            <div className="text-sm font-semibold opacity-80 mb-1">The Core Question</div>
            <p className="text-lg font-bold leading-snug">
              "Is earning 87.5% from an incremental qualifying retail sale — without any upfront acquisition cost — more valuable than earning nothing from a passenger who otherwise wouldn't have converted?"
            </p>
            <p className="text-sm mt-2 opacity-80">Yes. Every time. And Avolta's 5,100+ outlets make the scale extraordinary.</p>
          </div>
        </div>
      </div>
    </SlideWrapper>
  );
}

// SLIDE 7: Narrowing to Aruba — Avolta's AUA operations
export function SlideArubaFocus() {
  return (
    <SlideWrapper>
      <div className="flex-1 flex flex-col justify-center px-5 py-6 md:px-12 md:py-6 relative">
        <GridBg />
        <div className="relative z-10">
          <div className="mb-5">
            <span className="text-blue-600 text-sm font-semibold uppercase tracking-widest">From Global to Aruba</span>
            <h2 className="text-xl md:text-3xl font-heading font-bold text-[#0a0f1e] mt-2">
              Avolta's Caribbean Flagship: <span className="text-blue-600">Queen Beatrix International Airport</span>
            </h2>
            <p className="text-slate-500 mt-1 text-sm">
              In July 2026, Avolta secured an <a href={AVOLTA_EXT_ARUBA} target="_blank" rel="noopener noreferrer" className={linkCls}>eight-year duty free extension at AUA</a> — confirming its long-term commitment to the Caribbean.
            </p>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-5">
            {[
              { val: "3M+", label: "Annual Passengers", note: "Aruba Airport Authority 2025" },
              { val: "~$30M", label: "Est. Revenue 2025", note: "Avolta AUA retail revenue" },
              { val: "5", label: "Avolta Retail Stores", note: "At AUA (all retail)" },
              { val: "~73%", label: "Non-Purchasing", note: "Conversion headroom" },
            ].map((s) => (
              <div key={s.label} className="bg-blue-50 border border-blue-200 rounded-2xl p-5 text-center">
                <div className="text-2xl md:text-3xl font-bold text-blue-700">{s.val}</div>
                <div className="text-slate-600 font-semibold text-sm mt-1">{s.label}</div>
                <div className="text-slate-400 text-xs mt-1">{s.note}</div>
              </div>
            ))}
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            <div className="bg-slate-50 border border-slate-200 rounded-2xl p-5">
              <div className="flex items-center gap-2 mb-3">
                <Store className="w-5 h-5 text-blue-600" />
                <h3 className="font-bold text-slate-800">Avolta's Retail Stores at AUA</h3>
              </div>
              <div className="space-y-2">
                {AUA_STORES.map((store, i) => (
                  <div key={i} className="flex items-center gap-3 py-1.5 px-3 rounded-lg bg-white border border-slate-100">
                    <div className="w-6 h-6 rounded-full bg-blue-100 flex items-center justify-center text-blue-700 text-xs font-bold flex-shrink-0">{i + 1}</div>
                    <span className="text-slate-700 text-sm font-medium">{store}</span>
                  </div>
                ))}
              </div>
            </div>
            <div className="bg-gradient-to-br from-blue-600 to-indigo-700 rounded-2xl p-5 text-white">
              <div className="flex items-center gap-2 mb-2">
                <MapPin className="w-5 h-5" />
                <h3 className="font-bold">A Proven Long-Term Partnership</h3>
              </div>
              <p className="text-blue-50 text-sm leading-relaxed">
                Avolta's eight-year extension at Aruba Airport confirms confidence in the Caribbean market. DutyBoost amplifies that investment by converting the 73% of non-purchasing passengers into incremental retail sales — across every Avolta store at AUA.
              </p>
              <div className="mt-3 bg-white/10 rounded-xl p-3">
                <p className="text-white font-semibold text-sm">
                  The passengers, the stores, and the concession are already in place. The only missing piece is conversion.
                </p>
              </div>
              <div className="text-blue-100 text-xs mt-3">
                <a href={AVOLTA_EXT_ARUBA} target="_blank" rel="noopener noreferrer" className="underline decoration-white/40 hover:decoration-white">Avolta AUA extension announcement</a>
                {" · "}<a href={AAA_SITE} target="_blank" rel="noopener noreferrer" className="underline decoration-white/40 hover:decoration-white">airportaruba.com</a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </SlideWrapper>
  );
}

// SLIDE 8: Business Model
export function SlideModel() {
  return (
    <SlideWrapper>
      <div className="flex-1 flex flex-col justify-center px-5 py-6 md:px-12 md:py-6 relative">
        <GridBg />
        <div className="relative z-10">
          <div className="mb-5">
            <span className="text-blue-600 text-sm font-semibold uppercase tracking-widest">Business Model</span>
            <h2 className="text-xl md:text-3xl font-heading font-bold text-[#0a0f1e] mt-2">
              Performance-Based. <span className="text-blue-600">Zero Upfront Cost.</span>
            </h2>
            <p className="text-slate-500 mt-1 text-sm">Revenue is created only when a qualifying transaction is validated through Enterprise POS.</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="bg-slate-800 text-white rounded-2xl p-4 sm:p-6">
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
              <div className="bg-green-50 border border-green-200 rounded-2xl p-5">
                <h3 className="font-bold text-green-900 mb-2">At 100,000 $100 Transactions:</h3>
                <div className="grid grid-cols-1 gap-1.5 text-sm">
                  {[
                    { party: "Retailers", val: "$8.75M net before costs" },
                    { party: "Travellers", val: "$1M in savings" },
                    { party: "Travel & Corporate Partners", val: "$50,000 ancillary revenue" },
                    { party: "POS Partners", val: "$25,000 transaction revenue" },
                    { party: "DutyBoost", val: "$175,000 infrastructure revenue" },
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

// SLIDE 9: Transaction Economics — Five Beneficiaries
export function SlideTransaction() {
  const parties = [
    { party: "Traveller", Icon: TravelerIcon, value: "$10.00", sub: "DutyCredit saving (10%)", color: "green", bg: "bg-green-50", border: "border-green-200" },
    { party: "Airport Retailer", Icon: AirportRetailerIcon, value: "$87.50", sub: "Net before normal costs (87.5%)", color: "blue", bg: "bg-blue-50", border: "border-blue-200" },
    { party: "Travel & Corporate Partner", Icon: Briefcase, value: "$0.50", sub: "Ancillary revenue (0.5%)", color: "yellow", bg: "bg-yellow-50", border: "border-yellow-200" },
    { party: "POS Partner", Icon: Cpu, value: "$0.25", sub: "Transaction revenue (0.25%)", color: "purple", bg: "bg-purple-50", border: "border-purple-200" },
    { party: "DutyBoost", Icon: BarChart3, value: "$1.75", sub: "Infrastructure revenue (1.75%)", color: "orange", bg: "bg-orange-50", border: "border-orange-200" },
  ];
  return (
    <SlideWrapper>
      <div className="flex-1 flex flex-col justify-center px-5 py-6 md:px-12 md:py-6 relative">
        <GridBg />
        <div className="relative z-10">
          <div className="mb-6">
            <span className="text-blue-600 text-sm font-semibold uppercase tracking-widest">One Transaction — Five Beneficiaries</span>
            <h2 className="text-xl md:text-3xl font-heading font-bold text-[#0a0f1e] mt-2">$100 Original Qualifying Retail Value Example</h2>
          </div>
          <div className="grid grid-cols-2 sm:grid-cols-5 gap-3 mb-6">
            {parties.map((p) => (
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
              <div className="flex items-center gap-2 mb-2">
                <BadgePercent className="w-5 h-5" />
                <h3 className="font-bold">Performance-Based — 2.5% Platform Fee</h3>
              </div>
              <p className="text-blue-50 text-sm leading-relaxed">
                The entire model is performance-based. DutyBoost charges a 2.5% platform fee, paid <em>only</em> on attributed DutyBoost/DutyCredit-generated revenue — never on organic sales. This fee is shared with the transaction participants, and all customer-acquisition cost is already covered inside that 2.5%.
              </p>
              <div className="mt-3 text-blue-100 font-semibold text-sm">Zero upfront cost · Zero risk · Pay only on incremental, attributed revenue.</div>
            </div>
          </div>
        </div>
      </div>
    </SlideWrapper>
  );
}

// SLIDE 10: Aruba Revenue Potential — scenario table for AUA
export function SlideArubaRevenue() {
  const scenarios = [
    { pp: "+0.1pp", retail: AUA_UPLIFT_1PP * 0.1, net: AUA_UPLIFT_1PP * 0.1 * RETAILER_NET },
    { pp: "+0.5pp", retail: AUA_UPLIFT_1PP * 0.5, net: AUA_UPLIFT_1PP * 0.5 * RETAILER_NET },
    { pp: "+1pp", retail: AUA_UPLIFT_1PP, net: AUA_UPLIFT_1PP * RETAILER_NET },
    { pp: "+2pp", retail: AUA_UPLIFT_1PP * 2, net: AUA_UPLIFT_1PP * 2 * RETAILER_NET },
    { pp: "+5pp", retail: AUA_UPLIFT_1PP * 5, net: AUA_UPLIFT_1PP * 5 * RETAILER_NET },
  ];
  return (
    <SlideWrapper>
      <div className="flex-1 flex flex-col justify-center px-5 py-6 md:px-12 md:py-6 relative">
        <GridBg />
        <div className="relative z-10">
          <div className="mb-5">
            <span className="text-blue-600 text-sm font-semibold uppercase tracking-widest">Aruba Revenue Potential</span>
            <h2 className="text-xl md:text-3xl font-heading font-bold text-[#0a0f1e] mt-2">
              Incremental Retail Value <span className="text-blue-600">at AUA</span>
            </h2>
            <p className="text-slate-500 mt-1 text-sm">
              Based on AUA's ~3M passengers. Each +1pp ≈ ~30K new purchasing travellers — value shown at the model's $100 illustrative qualifying basket, retailer net at 87.5%.
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-5 gap-3 mb-5">
            {scenarios.map((s, i) => (
              <div key={s.pp} className={`bg-blue-50 border border-blue-200 rounded-2xl p-4 text-center ${i === 2 ? "ring-2 ring-blue-500" : ""}`}>
                <div className="text-xs font-semibold text-blue-600 uppercase tracking-wide mb-2">{s.pp} conversion</div>
                <div className="text-slate-400 text-xs mb-1">incremental retail value</div>
                <div className="text-lg font-bold text-slate-700 mb-3">{fmtRevenue(s.retail)}</div>
                <div className="text-2xl md:text-3xl font-bold text-blue-700 mb-1">{fmtRevenue(s.net)}</div>
                <div className="text-blue-600 text-xs font-medium">retailer net (87.5%)</div>
              </div>
            ))}
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            <div className="bg-slate-50 border border-slate-200 rounded-2xl p-5">
              <h3 className="font-bold text-[#0a0f1e] mb-3">Why This Is Pure Upside for Avolta</h3>
              <ul className="space-y-2 text-sm">
                {[
                  "100% incremental — from AUA travellers who otherwise wouldn't buy",
                  "Zero upfront cost — pay only the 2.5% fee on validated sales and 10% traveller discount",
                  "No change to existing POS, pricing or merchandising",
                  "Attributed & reported transparently per transaction",
                  "Scales instantly across all 5 Avolta retail stores at AUA",
                ].map((item, i) => (
                  <li key={i} className="flex items-start gap-2">
                    <CheckCircle className="w-4 h-4 text-green-500 flex-shrink-0 mt-0.5" />
                    <span className="text-slate-700">{item}</span>
                  </li>
                ))}
              </ul>
            </div>
            <div className="bg-gradient-to-br from-blue-50 to-indigo-50 border border-blue-200 rounded-2xl p-5">
              <h3 className="font-bold text-blue-900 mb-3">The Headroom Behind These Numbers</h3>
              <div className="space-y-3 text-sm">
                <div className="flex justify-between items-center py-1.5 px-3 rounded-lg bg-white border border-slate-100">
                  <span className="text-slate-600">AUA converting base (~27% of 3M)</span>
                  <span className="font-bold text-blue-700">~{AUA_CONVERTERS.toFixed(2)}M</span>
                </div>
                <div className="flex justify-between items-center py-1.5 px-3 rounded-lg bg-red-50 border border-red-100">
                  <span className="text-slate-600">Non-purchasing headroom (73%)</span>
                  <span className="font-bold text-red-600">~{AUA_NON_PURCHASE.toFixed(2)}M</span>
                </div>
                <div className="flex justify-between items-center py-1.5 px-3 rounded-lg bg-blue-100 border border-blue-200 font-semibold">
                  <span className="text-slate-700">Each +1pp brings ~30K new converters</span>
                  <span className="font-bold text-blue-700">{fmtM(AUA_UPLIFT_1PP)}</span>
                </div>
              </div>
              <div className="text-slate-400 text-xs mt-3">Passengers: <a href={AAA_SITE} target="_blank" rel="noopener noreferrer" className={linkCls}>Aruba Airport Authority</a>. Conversion maths grounded in AUA's passenger base and the 73/27 ratio (m1nd-set / TFWA). $ value illustrative, at the model's $100 qualifying basket.</div>
            </div>
          </div>
        </div>
      </div>
    </SlideWrapper>
  );
}

// SLIDE 11: POS Activation (retailer-specific)
export function SlideIntegrate() {
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
                  "DutyBoost appears as a new feature in your existing POS dashboard",
                  "You flip the switch — no separate integration required from the retailer",
                  "No replacement of ERP, payment or inventory systems",
                  "Once switched on, all connected stores can redeem DutyCredits",
                  "Works across all Avolta stores, airports and markets on the same POS",
                  "Switch it off anytime — no lock-in, no commitments",
                ].map((item, i) => (
                  <div key={i} className="flex items-start gap-3">
                    <CheckCircle className="w-4 h-4 text-green-500 flex-shrink-0 mt-0.5" />
                    <span className="text-slate-700 text-sm">{item}</span>
                  </div>
                ))}
              </div>
            </div>
            <div className="bg-gradient-to-br from-blue-600 to-indigo-700 border border-blue-700 rounded-2xl p-5 lg:p-7">
              <h3 className="text-white font-bold text-xl lg:text-2xl mb-2">ACTIVATED THROUGH YOUR POS</h3>
              <p className="text-blue-50 text-sm lg:text-base leading-relaxed mb-3 lg:mb-5">
                DutyBoost is enabled by your POS provider as an activation feature — the same system Avolta already uses for checkout, inventory and payments. No separate integration required from the retailer.
              </p>
              <div className="grid grid-cols-3 gap-3 text-center">
                {[
                  { val: "1 POS", label: "activation" },
                  { val: "Multiple", label: "retailers" },
                  { val: "Global", label: "deployment" },
                ].map((s) => (
                  <div key={s.label} className="bg-white/10 rounded-xl p-3">
                    <div className="text-white font-bold">{s.val}</div>
                    <div className="text-blue-100 text-xs mt-1">{s.label}</div>
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

// SLIDE 11b: Integration Effort — what Avolta & the POS provider actually do
export function SlideIntegrationEffort() {
  const phases = [
    {
      n: "01",
      title: "Discovery & Scope",
      effort: "~2 days",
      Icon: Search,
      points: [
        "Identify the transaction-validation touchpoint in the existing checkout flow",
        "Agree on the single API request/response contract",
        "Confirm supported POS versions and AUA store footprint",
      ],
    },
    {
      n: "02",
      title: "Build & Connect",
      effort: "~3–5 days",
      Icon: Code2,
      points: [
        "One API call — send the validated transaction, receive the discount/settlement back",
        "Add a DutyBoost toggle + redemption screen to the POS dashboard",
        "No changes to payment, ERP, inventory or pricing systems",
      ],
    },
    {
      n: "03",
      title: "Test & Certify",
      effort: "~2 days",
      Icon: ShieldCheck,
      points: [
        "Sandbox validation against DutyBoost's test DutyCredits",
        "Edge-case handling: partial refunds, voids, multi-item baskets",
        "Joint sign-off before production activation",
      ],
    },
    {
      n: "04",
      title: "Activate & Scale",
      effort: "Same day",
      Icon: Rocket,
      points: [
        "Flip the switch — all Avolta retail stores at AUA go live instantly",
        "Zero downtime; no store-level reconfiguration required",
        "Rolls out to additional airports and markets on the same POS with no rework",
      ],
    },
  ];
  return (
    <SlideWrapper>
      <div className="flex-1 flex flex-col justify-center px-5 py-6 md:px-12 md:py-6 relative">
        <GridBg />
        <div className="relative z-10">
          <div className="mb-5">
            <span className="text-blue-600 text-sm font-semibold uppercase tracking-widest">Integration Effort</span>
            <h2 className="text-xl md:text-3xl font-heading font-bold text-[#0a0f1e] mt-2">
              What Avolta & the POS Provider <span className="text-blue-600">Actually Need to Do</span>
            </h2>
            <p className="text-slate-500 mt-1 text-sm">
              A single API call — one request, one response. Not a platform migration. No replacement of existing checkout, payment or inventory systems.
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-5">
            {phases.map((p) => (
              <div key={p.n} className="bg-slate-50 border border-slate-200 rounded-2xl p-5 flex flex-col">
                <div className="flex items-center justify-between mb-3">
                  <span className="text-2xl font-bold text-blue-200">{p.n}</span>
                  <p.Icon className="w-6 h-6 text-blue-600" />
                </div>
                <div className="text-slate-800 font-bold mb-1">{p.title}</div>
                <div className="text-blue-600 text-xs font-semibold mb-3">{p.effort}</div>
                <ul className="space-y-2 flex-1">
                  {p.points.map((pt, i) => (
                    <li key={i} className="flex items-start gap-2">
                      <div className="w-1.5 h-1.5 rounded-full bg-blue-500 mt-1.5 flex-shrink-0" />
                      <span className="text-slate-600 text-xs leading-snug">{pt}</span>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            <div className="bg-slate-50 border border-slate-200 rounded-2xl p-5">
              <h3 className="font-bold text-slate-800 mb-3">What This Does <span className="text-red-500">Not</span> Require</h3>
              <ul className="space-y-2">
                {[
                  "No replacement of POS, payment terminals or ERP",
                  "No changes to pricing, merchandising or inventory logic",
                  "No store-level hardware or staff retraining",
                  "No data migration or system downtime",
                  "No lock-in — can be switched off anytime",
                ].map((item, i) => (
                  <li key={i} className="flex items-start gap-2">
                    <XCircle className="w-4 h-4 text-red-500 flex-shrink-0 mt-0.5" />
                    <span className="text-slate-600 text-sm">{item}</span>
                  </li>
                ))}
              </ul>
            </div>
            <div className="bg-gradient-to-br from-blue-600 to-indigo-700 rounded-2xl p-5 text-white">
              <div className="flex items-center gap-2 mb-2">
                <Clock className="w-5 h-5" />
                <h3 className="font-bold">Total Effort: ~1–2 Weeks, One API Call</h3>
              </div>
              <p className="text-blue-50 text-sm leading-relaxed">
                The entire integration is a single API call — one request with the validated transaction, one response with the discount and settlement. One engineering stream builds it once, then every connected Avolta store at AUA is live.
              </p>
              <div className="grid grid-cols-3 gap-3 mt-4 text-center">
                {[
                  { val: "1", label: "API Call" },
                  { val: "1", label: "Toggle" },
                  { val: "0", label: "System Replacements" },
                ].map((s) => (
                  <div key={s.label} className="bg-white/10 rounded-xl p-3">
                    <div className="text-white font-bold text-lg">{s.val}</div>
                    <div className="text-blue-100 text-xs mt-1">{s.label}</div>
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
export function SlideFlywheel() {
  const steps = [
    "More Travel & Corporate Partners",
    "More Travellers Reached",
    "More DutyCredits Distributed",
    "Traveller Self-Generated DutyCredit",
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
                <div className="text-white text-xs font-bold leading-tight px-2">Circular Revenue Infrastructure</div>
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
                <p className="font-bold text-lg leading-snug">"A positive flywheel that creates growth for every stakeholder."</p>
                <p className="text-blue-100 text-sm mt-2">Each new partner makes the platform more valuable for every existing partner — starting at AUA and scaling across Avolta's global network.</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </SlideWrapper>
  );
}

// SLIDE 13: Closing — Avolta / Aruba
export function SlideClosingAvolta() {
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
              Converting the 73%<br />
              <span className="text-blue-600">Who Never Buy — From Aruba to the World</span>
            </h1>
            <p className="text-lg md:text-xl text-slate-500 max-w-3xl leading-relaxed">
              A proven, performance-based revenue layer — activated through Avolta's existing POS infrastructure, starting at AUA and scaling across the global network.
            </p>
          </div>
          <div className="grid grid-cols-3 gap-2 sm:gap-6 mt-4 w-full max-w-2xl">
            {[
              { label: "AUA Passengers", value: "3M+" },
              { label: "Avolta Stores at AUA", value: "5" },
              { label: "Upfront Cost", value: "$0" },
            ].map((s) => (
              <div key={s.label} className="text-center">
                <div className="text-base sm:text-2xl font-bold text-blue-600">{s.value}</div>
                <div className="text-xs sm:text-sm text-slate-500 mt-1">{s.label}</div>
              </div>
            ))}
          </div>
          <h2 className="text-4xl md:text-6xl font-heading font-bold text-blue-600 tracking-tight">THANK YOU</h2>
          <div className="mt-2 text-xs text-slate-500 border border-slate-300 rounded px-4 py-2">
            CONFIDENTIAL — 2026 | Chamber of Commerce: 42053181 | VAT: NL869492068B01
          </div>
        </div>
      </div>
    </SlideWrapper>
  );
}