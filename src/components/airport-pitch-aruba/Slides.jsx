import { Fragment } from "react";
import {
  ChevronRight, TrendingUp, DollarSign, Percent, CheckCircle,
  XCircle, Plane, RefreshCw, Store,
} from "lucide-react";
import DutyBoostLogo from "@/components/DutyBoostLogo";
import { SlideSolution } from "@/components/shared/SlideSolution";
import TravelerIcon from "@/components/TravelerIcon";
import TravelAgencyIcon from "@/components/TravelAgencyIcon";
import AirportRetailerIcon from "@/components/AirportRetailerIcon";
import HotelIcon from "@/components/HotelIcon";
import CarRentalIcon from "@/components/CarRentalIcon";

// ── Sourced links ────────────────────────────────────────────────────────────
const AAA_SITE = "https://www.airportaruba.com";
const AAA_H1_2025 = "https://www.airportaruba.com/press-releases/strong-increase-passenger-traffic";
const AAA_SHOPPING = "https://www.airportaruba.com/shopping";
const AAA_GATEWAY = "https://www.airportaruba.com/gateway2030";
const ROUTES_YTD = "https://www.routesonline.com/airports/2361/aruba-airport-authority-nv/news/299665302/aruba-airport-reports-year-to-date-september-2025-traffic-figures/";
const AVOLTA_EXT = "https://www.avoltaworld.com/en/press_release/2026-07-23/avolta-secures-eight-year-duty-free-extension-aruba-airport-caribbean";
const CMI_CARIBBEAN = "https://www.coherentmarketinsights.com/market-insight/caribbean-duty-free-retailing-market-4934";
const M1NDSET_LINK = "https://m1nd-set.com/";
const TFWA_LINK = "https://www.tfwa.com/";

const linkCls = "text-blue-600 font-semibold underline decoration-blue-600/50 hover:decoration-blue-400 hover:text-blue-500 transition-colors";

// ── Aruba Airport data (sourced) ─────────────────────────────────────────────
const AUA_PAX = 3; // million passengers (Avolta: "more than three million")
const CONVERTING_SHARE = 0.27; // m1nd-set / TFWA benchmark
const NON_PURCHASE_SHARE = 0.73;
const ILLUSTRATIVE_BASKET = 100; // USD
const CONCESSION_RATE = 0.15; // Caribbean benchmark (illustrative)

const AUA_CONVERTERS = AUA_PAX * CONVERTING_SHARE; // ≈ 0.81M
const AUA_NON_PURCHASE = AUA_PAX * NON_PURCHASE_SHARE; // ≈ 2.19M
const AUA_UPLIFT_1PP = AUA_PAX * 1_000_000 * 0.01 * ILLUSTRATIVE_BASKET; // ≈ $3M per +1pp
const AUA_CONCESSION_1PP = AUA_UPLIFT_1PP * CONCESSION_RATE; // ≈ $450K per +1pp

const fmtM = (n) => `$${(n / 1_000_000).toFixed(1)}M`;
const fmtK = (n) => `$${Math.round(n / 1000).toLocaleString()}K`;
const fmtFull = (n) => `$${Math.round(n).toLocaleString()}`;

export function SlideWrapper({ children }) {
  return (
    <div className="w-full flex flex-col overflow-y-auto bg-white text-[#0a0f1e]">
      {children}
    </div>
  );
}

export function GridBg() {
  return (
    <div className="absolute inset-0 opacity-[0.04]" style={{
      backgroundImage: "linear-gradient(rgba(59,130,246,0.4) 1px, transparent 1px), linear-gradient(90deg, rgba(59,130,246,0.4) 1px, transparent 1px)",
      backgroundSize: "40px 40px"
    }} />
  );
}

// SLIDE 1: Cover — Aruba
export function SlideCover() {
  return (
    <SlideWrapper>
      <div className="flex-1 flex flex-col items-center justify-center px-6 md:px-16 text-center relative">
        <GridBg />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] rounded-full opacity-10"
          style={{ background: "radial-gradient(circle, #3b82f6 0%, transparent 70%)" }} />
        <div className="relative z-10 flex flex-col items-center gap-8">
          <div className="bg-white rounded-2xl px-8 py-4 shadow-2xl border border-slate-200">
            <DutyBoostLogo height={50} linkTo="/airport-showcase" />
          </div>
          <div>
            <h1 className="text-3xl md:text-5xl font-heading font-bold text-[#0a0f1e] leading-tight mb-4">
              Incremental Non-Aeronautical<br />
              <span className="text-blue-600">Revenue for Aruba Airport</span>
            </h1>
            <p className="text-xl text-slate-500 max-w-3xl leading-relaxed">
              A Presentation for Aruba Airport Authority N.V.
            </p>
          </div>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 sm:gap-6 mt-4 w-full">
            {[
              { label: "Annual Passengers", value: "3M+" },
              { label: "Non-Purchasing", value: "~73%" },
              { label: "Duty-Free Operator", value: "Avolta" },
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
    { name: "Raël Martis", role: "Co-Founder / Chief Commercial Officer", linkedin: "https://www.linkedin.com/in/israel-martis-ozuna/", photo: "https://media.base44.com/images/public/69c97dcd1c1950fa88424690/58e6f7004_FotoRaelMartis.jpeg" },
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

// SLIDE 3: The Facts — Aruba Airport
export function SlideProblem() {
  return (
    <SlideWrapper>
      <div className="flex-1 flex flex-col justify-center px-5 py-6 md:px-12 md:py-6 relative">
        <GridBg />
        <div className="relative z-10">
          <div className="mb-5">
            <span className="text-blue-600 text-sm font-semibold uppercase tracking-widest">The Facts — Queen Beatrix International Airport</span>
            <h2 className="text-xl md:text-3xl font-heading font-bold text-[#0a0f1e] mt-2">
              3M+ Passengers. <span className="text-blue-600">~73% Never Buy.</span>
            </h2>
            <p className="text-slate-500 mt-1 text-sm">
              Passenger data from{" "}
              <a href={AAA_H1_2025} target="_blank" rel="noopener noreferrer" className={linkCls}>Aruba Airport Authority</a> and{" "}
              <a href={ROUTES_YTD} target="_blank" rel="noopener noreferrer" className={linkCls}>Routes Online (2025)</a>. Conversion benchmark:{" "}
              <a href={M1NDSET_LINK} target="_blank" rel="noopener noreferrer" className={linkCls}>m1nd-set</a> /{" "}
              <a href={TFWA_LINK} target="_blank" rel="noopener noreferrer" className={linkCls}>TFWA</a>.
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-5 mb-5">
            <div className="bg-slate-50 border border-slate-200 rounded-2xl p-6">
              <div className="text-3xl md:text-4xl font-bold text-blue-600 mb-2">3M+</div>
              <div className="text-slate-800 font-semibold">Annual passengers at AUA</div>
              <div className="text-slate-500 text-sm mt-1">+6% projected full-year 2025 growth{" "}
                <a href={AAA_H1_2025} target="_blank" rel="noopener noreferrer" className={linkCls}>(AAA)</a>
              </div>
            </div>
            <div className="bg-slate-50 border border-slate-200 rounded-2xl p-6">
              <div className="text-3xl md:text-4xl font-bold text-orange-600 mb-2">27%</div>
              <div className="text-slate-800 font-semibold">Penetration rate</div>
              <div className="text-slate-500 text-sm mt-1">Share who convert to a purchase{" "}
                <a href={M1NDSET_LINK} target="_blank" rel="noopener noreferrer" className={linkCls}>(m1nd-set / TFWA)</a>
              </div>
            </div>
            <div className="bg-red-50 border border-red-200 rounded-2xl p-6">
              <div className="text-3xl md:text-4xl font-bold text-red-600 mb-2">~{AUA_NON_PURCHASE.toFixed(2)}M</div>
              <div className="text-slate-800 font-semibold">Non-purchasing passengers</div>
              <div className="text-slate-500 text-sm mt-1">73% of AUA's 3M+ annual traffic</div>
            </div>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            <div className="bg-slate-50 border border-slate-200 rounded-2xl p-5">
              <h3 className="text-slate-800 font-semibold text-sm mb-3">Aruba Airport at a Glance</h3>
              <div className="space-y-2 text-sm">
                {[
                  { label: "Airport", val: "Queen Beatrix Int'l (AUA), Oranjestad" },
                  { label: "Airlines", val: "25 carriers, 45 non-stop routes" },
                  { label: "Destinations", val: "30+ across 4 continents" },
                  { label: "U.S. share", val: "70–76% of total passengers" },
                  { label: "Load factor", val: "85–87% (2025)" },
                  { label: "U.S. Pre-Clearance", val: "Yes — only one in the Caribbean" },
                ].map((r) => (
                  <div key={r.label} className="flex items-center gap-3 py-1.5 px-3 rounded-lg bg-white border border-slate-100">
                    <span className="text-slate-500 w-32 flex-shrink-0">{r.label}</span>
                    <span className="text-slate-800 font-semibold">{r.val}</span>
                  </div>
                ))}
              </div>
              <div className="text-slate-400 text-xs mt-3">
                Source: <a href={AAA_SITE} target="_blank" rel="noopener noreferrer" className={linkCls}>airportaruba.com</a>
              </div>
            </div>
            <div className="flex flex-col gap-4">
              <div className="bg-slate-50 border border-slate-200 rounded-2xl p-5">
                <h3 className="text-slate-800 font-semibold text-sm mb-3">The Conversion Gap at AUA</h3>
                <ul className="space-y-2">
                  {[
                    "Activation starts only after the traveller clears security",
                    "No financial reason for a non-intending buyer to enter a store",
                    "Travel & Corporate Partners hold the early relationship — but get zero retail participation",
                    "~73% of AUA's passengers walk straight to the gate",
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
                  "3M+ passengers pass through AUA each year. The infrastructure, the retailers, and the concession framework are all in place. The missing piece is conversion."
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </SlideWrapper>
  );
}

// SLIDE 4: The Solution — imported from @/components/shared/SlideSolution

// SLIDE 5: The Concession Model
export function SlideConcessionModel() {
  return (
    <SlideWrapper>
      <div className="flex-1 flex flex-col justify-center px-5 py-6 md:px-12 md:py-6 relative">
        <GridBg />
        <div className="relative z-10">
          <div className="mb-5">
            <span className="text-blue-600 text-sm font-semibold uppercase tracking-widest">The Concession Model</span>
            <h2 className="text-xl md:text-3xl font-heading font-bold text-[#0a0f1e] mt-2">
              Aruba Airport Participates <span className="text-blue-600">Directly in Retail Sales</span>
            </h2>
            <p className="text-slate-500 mt-1 text-sm">Airport retail space is a concession, not a standard lease. The most common structure means the airport earns based on how much retailers sell.</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            <div className="space-y-4">
              <div className="bg-blue-600 text-white rounded-2xl p-6">
                <div className="text-sm font-semibold opacity-80 mb-2">The Core Formula</div>
                <p className="text-lg font-bold leading-snug">
                  Airport payment = the greater of the Minimum Annual Guarantee (MAG) <span className="text-blue-200">OR</span> an agreed percentage of gross sales.
                </p>
              </div>
              <div className="bg-slate-50 border border-slate-200 rounded-2xl p-5">
                <h3 className="font-bold text-slate-800 mb-2">How It Works in Practice</h3>
                <div className="space-y-2.5 text-sm">
                  {[
                    "Concessionaires pay a percentage of gross sales each month, subject to a predetermined MAG",
                    "Common structure: the greater of percentage of gross sales or MAG",
                    "Caribbean airports: percentage of sales based on location, concept and foot traffic, plus a minimum monthly rent",
                    "Tiered percentages — one rate on the first revenue band, a higher rate above it",
                  ].map((item, i) => (
                    <div key={i} className="flex items-start gap-2">
                      <CheckCircle className="w-4 h-4 text-blue-600 flex-shrink-0 mt-0.5" />
                      <span className="text-slate-700">{item}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
            <div className="flex flex-col gap-4 justify-center">
              <div className="bg-amber-50 border border-amber-200 rounded-2xl p-6">
                <h3 className="text-slate-800 font-semibold text-lg mb-3">Why This Matters for DutyBoost at AUA</h3>
                <ul className="space-y-3">
                  {[
                    "Most concession models are revenue-based — the airport earns a percentage of gross sales",
                    "When DutyBoost increases retail sales, the percentage-based concession revenue increases too",
                    "Once sales push past the MAG, every additional transaction creates incremental airport revenue",
                    "The airport becomes a direct beneficiary of conversion uplift — not just the retailer",
                    "No subsidy required; DutyBoost grows the underlying sales base the airport already earns from",
                  ].map((item, i) => (
                    <li key={i} className="flex items-start gap-3">
                      <CheckCircle className="w-5 h-5 text-blue-600 flex-shrink-0 mt-0.5" />
                      <span className="text-slate-600 text-sm">{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
              <div className="bg-gradient-to-br from-blue-600 to-indigo-700 rounded-2xl p-5 text-white">
                <p className="font-bold text-base leading-snug">
                  "DutyBoost doesn't need the airport to subsidise the incentive. It increases the underlying retail sales on which concession payments are calculated."
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </SlideWrapper>
  );
}

// SLIDE 6: MAG + Percentage Worked Example — Aruba
export function SlideMagExample() {
  return (
    <SlideWrapper>
      <div className="flex-1 flex flex-col justify-center px-5 py-6 md:px-12 md:py-6 relative">
        <GridBg />
        <div className="relative z-10">
          <div className="mb-5">
            <span className="text-blue-600 text-sm font-semibold uppercase tracking-widest">The MAG + Percentage Model</span>
            <h2 className="text-xl md:text-3xl font-heading font-bold text-[#0a0f1e] mt-2">
              A Worked Example: <span className="text-blue-600">How DutyBoost Lifts AUA Revenue</span>
            </h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-5">
            <div className="bg-slate-50 border border-slate-200 rounded-2xl p-5 text-center">
              <div className="text-2xl font-bold text-slate-800 mb-1">$1,000,000</div>
              <div className="text-slate-500 text-sm">Annual Minimum Annual Guarantee (MAG)</div>
            </div>
            <div className="bg-slate-50 border border-slate-200 rounded-2xl p-5 text-center">
              <div className="text-2xl font-bold text-slate-800 mb-1">15%</div>
              <div className="text-slate-500 text-sm">Concession percentage of gross sales</div>
            </div>
            <div className="bg-blue-50 border border-blue-200 rounded-2xl p-5 text-center">
              <div className="text-2xl font-bold text-blue-600 mb-1">Greater of</div>
              <div className="text-slate-500 text-sm">MAG OR % of sales — whichever is higher</div>
            </div>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            <div className="bg-red-50 border border-red-200 rounded-2xl p-5">
              <div className="flex items-center gap-2 mb-3">
                <XCircle className="w-5 h-5 text-red-500" />
                <h3 className="font-bold text-slate-800">Without DutyBoost: $5M Sales</h3>
              </div>
              <div className="space-y-2 text-sm">
                <div className="flex justify-between bg-white rounded-lg px-3 py-2 border border-slate-200">
                  <span className="text-slate-600">Gross sales</span>
                  <span className="font-semibold text-slate-800">$5,000,000</span>
                </div>
                <div className="flex justify-between bg-white rounded-lg px-3 py-2 border border-slate-200">
                  <span className="text-slate-600">15% of sales</span>
                  <span className="font-semibold text-slate-800">$750,000</span>
                </div>
                <div className="flex justify-between bg-red-100 rounded-lg px-3 py-2 border border-red-300">
                  <span className="text-slate-700 font-semibold">Airport receives</span>
                  <span className="font-bold text-red-700">$1,000,000</span>
                </div>
                <div className="text-xs text-slate-500 pt-1">
                  $750K is below the MAG, so the retailer pays the guaranteed $1M.
                </div>
              </div>
            </div>
            <div className="bg-green-50 border border-green-300 rounded-2xl p-5">
              <div className="flex items-center gap-2 mb-3">
                <CheckCircle className="w-5 h-5 text-green-600" />
                <h3 className="font-bold text-slate-800">With DutyBoost: $6M Sales</h3>
              </div>
              <div className="space-y-2 text-sm">
                <div className="flex justify-between bg-white rounded-lg px-3 py-2 border border-slate-200">
                  <span className="text-slate-600">Gross sales</span>
                  <span className="font-semibold text-slate-800">$6,000,000</span>
                </div>
                <div className="flex justify-between bg-white rounded-lg px-3 py-2 border border-slate-200">
                  <span className="text-slate-600">15% of sales</span>
                  <span className="font-semibold text-slate-800">$900,000</span>
                </div>
                <div className="flex justify-between bg-green-100 rounded-lg px-3 py-2 border border-green-300">
                  <span className="text-slate-700 font-semibold">Airport receives</span>
                  <span className="font-bold text-green-700">$1,000,000</span>
                </div>
                <div className="text-xs text-slate-500 pt-1">
                  $900K is still below the MAG — but the gap is closing. One more +1pp of conversion and the percentage exceeds the guarantee.
                </div>
              </div>
            </div>
          </div>
          <div className="mt-5 bg-gradient-to-br from-blue-600 to-indigo-700 rounded-2xl p-5 text-white">
            <div className="flex items-center gap-4">
              <TrendingUp className="w-10 h-10 flex-shrink-0" />
              <div>
                <p className="font-bold text-lg leading-snug">
                  At $7M in sales, 15% = $1.05M — the airport earns above the MAG for the first time. Every dollar of incremental retail sales thereafter flows directly to AUA.
                </p>
                <p className="text-blue-100 text-sm mt-1">
                  Once the percentage calculation exceeds the MAG, every additional retail transaction creates incremental revenue for both the retailer and the airport.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </SlideWrapper>
  );
}

// SLIDE 7: The Aruba Opportunity — conversion uplift scenarios
export function SlideArubaOpportunity() {
  const scenarios = [
    { pp: "+0.1pp", retail: AUA_UPLIFT_1PP * 0.1, concession: AUA_CONCESSION_1PP * 0.1 },
    { pp: "+0.5pp", retail: AUA_UPLIFT_1PP * 0.5, concession: AUA_CONCESSION_1PP * 0.5 },
    { pp: "+1pp", retail: AUA_UPLIFT_1PP, concession: AUA_CONCESSION_1PP },
    { pp: "+2pp", retail: AUA_UPLIFT_1PP * 2, concession: AUA_CONCESSION_1PP * 2 },
    { pp: "+5pp", retail: AUA_UPLIFT_1PP * 5, concession: AUA_CONCESSION_1PP * 5 },
  ];
  return (
    <SlideWrapper>
      <div className="flex-1 flex flex-col justify-center px-5 py-6 md:px-12 md:py-6 relative">
        <GridBg />
        <div className="relative z-10">
          <div className="mb-5">
            <span className="text-blue-600 text-sm font-semibold uppercase tracking-widest">The Aruba Opportunity</span>
            <h2 className="text-xl md:text-3xl font-heading font-bold text-[#0a0f1e] mt-2">
              Small Conversion Gains = <span className="text-blue-600">Real Revenue at AUA</span>
            </h2>
            <p className="text-slate-500 mt-1 text-sm">
              Based on AUA's 3M+ passengers. Each +1pp ≈ 30,000 new purchasing travellers — value shown at the model's $100 illustrative qualifying basket, airport concession at 15%.
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-5 gap-3 mb-5">
            {scenarios.map((s, i) => (
              <div key={s.pp} className={`bg-blue-50 border border-blue-200 rounded-2xl p-4 text-center ${i === 2 ? "ring-2 ring-blue-500" : ""}`}>
                <div className="text-xs font-semibold text-blue-600 uppercase tracking-wide mb-2">{s.pp} conversion</div>
                <div className="text-slate-400 text-xs mb-1">incremental retail value</div>
                <div className="text-lg font-bold text-slate-700 mb-3">{fmtM(s.retail)}</div>
                <div className="text-2xl md:text-3xl font-bold text-blue-700 mb-1">{fmtK(s.concession)}</div>
                <div className="text-blue-600 text-xs font-medium">airport concession (15%)</div>
              </div>
            ))}
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            <div className="bg-slate-50 border border-slate-200 rounded-2xl p-5">
              <h3 className="font-bold text-[#0a0f1e] mb-3">Why This Is Pure Upside for AUA</h3>
              <ul className="space-y-2 text-sm">
                {[
                  "100% incremental — from AUA travellers who otherwise wouldn't buy",
                  "Zero upfront cost — pay only on validated, attributed sales",
                  "No change to existing POS, pricing or merchandising",
                  "Attributed & reported transparently per transaction",
                  "Scales instantly across all participating retailers at AUA",
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
              <div className="text-slate-400 text-xs mt-3">Passengers: <a href={AAA_SITE} target="_blank" rel="noopener noreferrer" className={linkCls}>airportaruba.com</a>. Conversion maths grounded in AUA's passenger base and the 73/27 ratio (m1nd-set / TFWA). $ value illustrative, at the model's $100 qualifying basket.</div>
            </div>
          </div>
        </div>
      </div>
    </SlideWrapper>
  );
}

// SLIDE 8: Extended Value Chain
export function SlideValueChain() {
  const chain = [
    { Icon: TravelAgencyIcon, label: "Travel Partner", desc: "Distributes DutyCredit", color: "blue" },
    { Icon: TravelerIcon, label: "Traveller", desc: "Activated before arrival", color: "violet" },
    { Icon: AirportRetailerIcon, label: "Airport Retailer", desc: "Captures incremental sale", color: "green" },
    { Icon: Store, label: "Supplier", desc: "Faster stock rotation", color: "amber" },
    { Icon: Plane, label: "Aruba Airport", desc: "Incremental concession revenue", color: "indigo" },
  ];
  return (
    <SlideWrapper>
      <div className="flex-1 flex flex-col justify-center px-5 py-6 md:px-12 md:py-6 relative">
        <GridBg />
        <div className="relative z-10">
          <div className="mb-5 text-center">
            <span className="text-blue-600 text-sm font-semibold uppercase tracking-widest">The Extended Value Chain</span>
            <h2 className="text-xl md:text-3xl font-heading font-bold text-[#0a0f1e] mt-2">
              AUA Is a <span className="text-blue-600">Fifth Participant</span>
            </h2>
            <p className="text-slate-500 mt-2 max-w-3xl mx-auto text-sm">
              DutyBoost doesn't only create revenue for the retailer, POS partner, supplier and travel partner. When the retailer's concession is revenue-based, DutyBoost creates incremental non-aeronautical revenue for Aruba Airport itself.
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-5 gap-2 mb-5 items-stretch">
            {chain.map((node, i, arr) => (
              <Fragment key={i}>
                <div className={`bg-${node.color}-50 border border-${node.color}-200 rounded-2xl p-4 text-center flex flex-col items-center`}>
                  <div className={`w-10 h-10 rounded-full bg-${node.color}-600 text-white flex items-center justify-center mb-2`}>
                    <node.Icon className="w-5 h-5" />
                  </div>
                  <div className={`text-${node.color}-700 font-bold text-sm mb-1`}>{node.label}</div>
                  <div className="text-slate-600 text-xs leading-relaxed">{node.desc}</div>
                </div>
                {i < arr.length - 1 && (
                  <div className="hidden md:flex items-center justify-center">
                    <ChevronRight className="text-blue-400 w-5 h-5" />
                  </div>
                )}
              </Fragment>
            ))}
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="bg-slate-50 border border-slate-200 rounded-2xl p-5">
              <h3 className="font-bold text-slate-800 mb-3">The Full Chain Benefits at AUA</h3>
              <div className="space-y-2 text-sm">
                {[
                  { who: "Travel Partner", what: "earns ancillary revenue on every transaction" },
                  { who: "Traveller", what: "saves on airport purchases via DutyCredit" },
                  { who: "Retailer", what: "captures incremental sales from non-purchasing traffic" },
                  { who: "Supplier", what: "benefits from faster stock rotation and reorders" },
                  { who: "Aruba Airport", what: "earns incremental concession revenue above the MAG" },
                ].map((row, i) => (
                  <div key={i} className="flex items-start gap-2">
                    <CheckCircle className="w-4 h-4 text-blue-600 flex-shrink-0 mt-0.5" />
                    <span className="text-slate-700"><strong className="text-blue-700">{row.who}</strong> {row.what}</span>
                  </div>
                ))}
              </div>
            </div>
            <div className="bg-gradient-to-br from-blue-600 to-indigo-700 rounded-2xl p-5 text-white">
              <h3 className="font-bold mb-2">A Stronger Pitch for AUA</h3>
              <p className="text-blue-50 text-sm leading-relaxed mb-2">
                By including the airport in the value chain, DutyBoost's proposition extends beyond retail conversion. It becomes a tool for growing AUA's own non-aeronautical revenue base — without any capital investment or subsidy from the airport.
              </p>
              <div className="bg-white/10 rounded-xl p-3">
                <p className="text-white font-semibold text-sm">
                  Travel Partner → Traveller → Airport Retailer → Supplier → Aruba Airport
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </SlideWrapper>
  );
}

// SLIDE 9: Business Case — Aruba
export function SlideBusinessCase() {
  return (
    <SlideWrapper>
      <div className="flex-1 flex flex-col justify-center px-5 py-6 md:px-12 md:py-6 relative">
        <GridBg />
        <div className="relative z-10">
          <div className="mb-5">
            <span className="text-blue-600 text-sm font-semibold uppercase tracking-widest">The Business Case</span>
            <h2 className="text-xl md:text-3xl font-heading font-bold text-[#0a0f1e] mt-2">
              $3M in Incremental Sales <span className="text-blue-600">→ $450K for AUA</span>
            </h2>
            <p className="text-slate-500 mt-1 text-sm">An illustrative scenario showing the potential airport concession uplift from a single +1pp of conversion at Aruba Airport.</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-5">
            <div className="bg-slate-50 border border-slate-200 rounded-2xl p-5 text-center">
              <DollarSign className="w-8 h-8 text-blue-600 mx-auto mb-2" />
              <div className="text-2xl font-bold text-slate-800 mb-1">{fmtFull(AUA_UPLIFT_1PP)}</div>
              <div className="text-slate-500 text-sm">Incremental retail sales from +1pp conversion at AUA</div>
            </div>
            <div className="bg-slate-50 border border-slate-200 rounded-2xl p-5 text-center">
              <Percent className="w-8 h-8 text-blue-600 mx-auto mb-2" />
              <div className="text-2xl font-bold text-slate-800 mb-1">15%</div>
              <div className="text-slate-500 text-sm">Illustrative concession rate on gross sales</div>
            </div>
            <div className="bg-blue-50 border border-blue-300 rounded-2xl p-5 text-center">
              <TrendingUp className="w-8 h-8 text-blue-600 mx-auto mb-2" />
              <div className="text-2xl font-bold text-blue-600 mb-1">{fmtFull(AUA_CONCESSION_1PP)}</div>
              <div className="text-slate-500 text-sm">Potential additional concession revenue for AUA</div>
            </div>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            <div className="bg-slate-50 border border-slate-200 rounded-2xl p-5">
              <h3 className="font-bold text-slate-800 mb-3">How It Works</h3>
              <div className="space-y-3 text-sm">
                <div className="bg-white rounded-lg px-3 py-2 border border-slate-200 flex justify-between">
                  <span className="text-slate-600">DutyBoost activates +1pp of AUA's 3M passengers</span>
                  <span className="font-semibold text-slate-800">~30K new buyers</span>
                </div>
                <div className="flex justify-center"><ChevronRight className="text-blue-400 w-5 h-5 rotate-90" /></div>
                <div className="bg-white rounded-lg px-3 py-2 border border-slate-200 flex justify-between">
                  <span className="text-slate-600">At $100 illustrative basket</span>
                  <span className="font-semibold text-slate-800">$3M sales</span>
                </div>
                <div className="flex justify-center"><ChevronRight className="text-blue-400 w-5 h-5 rotate-90" /></div>
                <div className="bg-blue-100 rounded-lg px-3 py-2 border border-blue-300 flex justify-between">
                  <span className="text-slate-700 font-semibold">AUA concession at 15%</span>
                  <span className="font-bold text-blue-700">{fmtFull(AUA_CONCESSION_1PP)}</span>
                </div>
              </div>
              <div className="text-xs text-slate-400 mt-3 leading-relaxed">
                Subject to the retailer's actual lease/MAG structure. Where the percentage calculation already exceeds the MAG, the full uplift applies. Where it doesn't, uplift applies once sales push past the MAG threshold.
              </div>
            </div>
            <div className="bg-gradient-to-br from-blue-600 to-indigo-700 rounded-2xl p-5 text-white">
              <h3 className="font-bold mb-3">Why This Is Compelling for AUA</h3>
              <div className="space-y-2.5 text-sm">
                {[
                  "No capital investment required from the airport",
                  "No operational change to existing concession agreements",
                  "Works within AUA's current concession framework",
                  "Grows the revenue base that concession payments are calculated on",
                  "Aligns with Gateway 2030's expanded retail & dining vision",
                ].map((item, i) => (
                  <div key={i} className="flex items-start gap-2">
                    <CheckCircle className="w-4 h-4 text-blue-200 flex-shrink-0 mt-0.5" />
                    <span className="text-blue-50">{item}</span>
                  </div>
                ))}
              </div>
              <div className="mt-3 bg-white/10 rounded-xl p-3">
                <p className="text-white font-semibold text-sm">
                  DutyBoost doesn't ask AUA to subsidise the incentive — it grows the sales the airport already earns from.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </SlideWrapper>
  );
}

// SLIDE 10: The Cost of Waiting
export function SlidePromotion() {
  return (
    <SlideWrapper>
      <div className="flex-1 flex flex-col justify-center px-5 py-6 md:px-12 md:py-6 relative">
        <GridBg />
        <div className="relative z-10">
          <div className="mb-5">
            <span className="text-blue-600 text-sm font-semibold uppercase tracking-widest">The Cost of Waiting</span>
            <h2 className="text-xl md:text-3xl font-heading font-bold text-[#0a0f1e] mt-2">
              Every Departure Without DutyBoost <span className="text-blue-600">Is Revenue Left on the Table</span>
            </h2>
            <p className="text-slate-500 mt-1 text-sm">3M+ passengers already pass through AUA each year. Avolta already operates the duty-free stores. The concession framework is already in place. The only question is how many of those passengers actually buy — and that conversion gap is costing AUA real money every single day.</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-5">
            <div className="bg-red-50 border border-red-200 rounded-2xl p-5 text-center">
              <div className="text-3xl md:text-4xl font-bold text-red-600 mb-2">$0</div>
              <div className="text-slate-800 font-semibold text-sm">Upfront cost to the airport</div>
              <div className="text-slate-500 text-xs mt-1">Performance-based — the airport only earns more</div>
            </div>
            <div className="bg-blue-50 border border-blue-200 rounded-2xl p-5 text-center">
              <div className="text-3xl md:text-4xl font-bold text-blue-600 mb-2">15%</div>
              <div className="text-slate-800 font-semibold text-sm">Concession rate on every incremental sale</div>
              <div className="text-slate-500 text-xs mt-1">Every converted traveller grows AUA revenue</div>
            </div>
            <div className="bg-green-50 border border-green-200 rounded-2xl p-5 text-center">
              <div className="text-3xl md:text-4xl font-bold text-green-600 mb-2">~2.19M</div>
              <div className="text-slate-800 font-semibold text-sm">Non-purchasing passengers annually</div>
              <div className="text-slate-500 text-xs mt-1">73% of AUA's 3M+ traffic — pure headroom</div>
            </div>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="bg-slate-50 border border-slate-200 rounded-2xl p-5">
              <h3 className="font-bold text-slate-800 mb-3">What Happens If AUA Waits</h3>
              <div className="space-y-2.5 text-sm">
                {[
                  "Passengers keep walking past stores — gross sales stay flat",
                  "Concession revenue stagnates while passenger traffic grows 6%+ per year",
                  "Retailers remain below MAG — no incremental revenue for anyone",
                  "Competing Caribbean airports that adopt conversion tools capture the narrative",
                  "The conversion gap widens with every additional departure",
                  "Gateway 2030's expanded retail capacity goes underutilised",
                ].map((item, i) => (
                  <div key={i} className="flex items-start gap-2">
                    <XCircle className="w-4 h-4 text-red-500 flex-shrink-0 mt-0.5" />
                    <span className="text-slate-700">{item}</span>
                  </div>
                ))}
              </div>
            </div>
            <div className="bg-gradient-to-br from-blue-600 to-indigo-700 rounded-2xl p-5 text-white">
              <h3 className="font-bold mb-3">What Happens When AUA Acts Now</h3>
              <div className="space-y-2.5 text-sm">
                {[
                  "Pre-activated travellers arrive ready to buy — sales lift immediately",
                  "Retailers push past MAG — concession revenue shifts to the higher percentage tier",
                  "Every incremental transaction flows directly to AUA's revenue",
                  "AUA leads the Caribbean in conversion innovation — not follows it",
                  "Gateway 2030's new retail spaces open with a proven conversion engine already in place",
                  "Non-aeronautical revenue grows without subsidy, capital spend, or operational change",
                ].map((item, i) => (
                  <div key={i} className="flex items-start gap-2">
                    <CheckCircle className="w-4 h-4 text-blue-200 flex-shrink-0 mt-0.5" />
                    <span className="text-blue-50">{item}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
          <div className="mt-5 bg-slate-800 rounded-2xl p-5 text-center">
            <p className="text-white font-bold text-base md:text-lg leading-snug">
              The passengers, the retailers, the concession framework — everything is already in place at AUA.{" "}
              <span className="text-blue-400">The only missing piece is conversion. The airport that moves first captures it.</span>
            </p>
          </div>
        </div>
      </div>
    </SlideWrapper>
  );
}

// SLIDE 11: Growth Flywheel
export function SlideFlywheel() {
  const steps = [
    "More Travellers Converted",
    "More Retail Sales",
    "Higher Concession Revenue",
    "Stronger Non-Aero Performance",
    "More Commercial Investment",
    "Better Retail Experience",
    "Higher Conversion Rates",
    "More Passenger Spend",
    "Increased MAG Coverage",
    "Stronger Airport Economics",
    "More Retailer Participation",
    "More Travellers Reached",
  ];
  return (
    <SlideWrapper>
      <div className="flex-1 flex flex-col justify-center px-5 py-6 md:px-12 md:py-6 relative">
        <GridBg />
        <div className="relative z-10">
          <div className="mb-6">
            <span className="text-blue-600 text-sm font-semibold uppercase tracking-widest">The Growth Flywheel</span>
            <h2 className="text-xl md:text-3xl font-heading font-bold text-[#0a0f1e] mt-2">
              A Self-Reinforcing <span className="text-blue-600">Revenue Engine for AUA</span>
            </h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8 items-center">
            <div className="relative flex items-center justify-center" style={{ height: "340px" }}>
              <div className="absolute inset-0 rounded-full border-2 border-blue-200" />
              <div className="bg-blue-600 border-2 border-blue-700 rounded-full w-28 h-28 flex flex-col items-center justify-center text-center z-10">
                <div className="text-white text-xs font-bold leading-tight px-2">AUA Revenue Flywheel</div>
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
                <h3 className="text-slate-800 font-bold mb-3">Why AUA Wins as the Flywheel Turns</h3>
                <div className="space-y-2.5 text-sm">
                  {[
                    { Icon: TrendingUp, party: "More conversion", effect: "→ Higher gross retail sales" },
                    { Icon: DollarSign, party: "Higher sales", effect: "→ More percentage-based concession revenue" },
                    { Icon: RefreshCw, party: "Past the MAG", effect: "→ Every transaction adds incremental revenue" },
                    { Icon: ChevronRight, party: "Stronger non-aero", effect: "→ Better commercial performance metrics" },
                    { Icon: Store, party: "More retailer success", effect: "→ Greater participation and shelf investment" },
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
                  "Every converted traveller today creates more concession revenue tomorrow."
                </p>
                <p className="text-blue-100 text-sm mt-2">The flywheel turns AUA's passenger traffic into non-aeronautical revenue — and revenue into growth.</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </SlideWrapper>
  );
}

// SLIDE 12: Partnership Model
export function SlideGetStarted() {
  return (
    <SlideWrapper>
      <div className="flex-1 flex flex-col justify-center px-5 py-6 md:px-12 md:py-6 relative">
        <GridBg />
        <div className="relative z-10">
          <div className="mb-5 text-center">
            <span className="text-blue-600 text-sm font-semibold uppercase tracking-widest">How the Partnership Works</span>
            <h2 className="text-xl md:text-3xl font-heading font-bold text-[#0a0f1e] mt-2">
              No Subsidy. No Risk.<br /><span className="text-blue-600">Just More Revenue.</span>
            </h2>
            <p className="text-slate-500 mt-2 max-w-3xl mx-auto text-sm">DutyBoost does the activation. AUA benefits from increased retail sales within its existing concession framework. Here's how we work together.</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-5 mb-5">
            <div className="bg-slate-50 border border-slate-200 rounded-2xl p-5">
              <h3 className="font-bold text-slate-800 mb-3">What DutyBoost Handles</h3>
              <div className="space-y-2.5 text-sm">
                {[
                  { Icon: TravelerIcon, text: "Pre-activating travellers through the DutyBoost Platform, Travel & Corporate Partners before arrival" },
                  { Icon: DollarSign, text: "DutyCredit distribution and traveller incentive mechanics" },
                  { Icon: ChevronRight, text: "POS validation of qualifying transactions" },
                  { Icon: RefreshCw, text: "Conversion data and sell-through reporting per retailer and category" },
                ].map((row, i) => (
                  <div key={i} className="flex items-start gap-2">
                    <row.Icon className="w-4 h-4 text-blue-600 flex-shrink-0 mt-0.5" />
                    <span className="text-slate-700">{row.text}</span>
                  </div>
                ))}
              </div>
            </div>
            <div className="bg-blue-50 border border-blue-200 rounded-2xl p-5">
              <h3 className="font-bold text-blue-900 mb-3">What We Ask of AUA</h3>
              <div className="space-y-2.5 text-sm">
                {[
                  { Icon: Plane, text: "Identify retailers with revenue-based concessions (MAG + % structures)" },
                  { Icon: Store, text: "Introduce DutyBoost to concession retailers at AUA" },
                  { Icon: TrendingUp, text: "Share retail category priorities so we align DutyCredit tiers" },
                  { Icon: CheckCircle, text: "That's it — no contracts, no fees, no operational change" },
                ].map((row, i) => (
                  <div key={i} className="flex items-start gap-2">
                    <row.Icon className="w-4 h-4 text-blue-600 flex-shrink-0 mt-0.5" />
                    <span className="text-slate-700">{row.text}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
          <div className="bg-slate-800 text-white rounded-2xl p-5">
            <h3 className="font-bold mb-4 text-center">Three Simple Next Steps</h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {[
                { step: "1", title: "Introductory Call", desc: "A 30-minute conversation to understand AUA's concession structure and commercial priorities." },
                { step: "2", title: "Retailer Mapping", desc: "We identify which retailers at AUA have revenue-based concessions where DutyBoost creates direct airport uplift." },
                { step: "3", title: "Retailer Introduction", desc: "We introduce DutyBoost to AUA's concession retailers — including Avolta — and support their POS activation." },
              ].map((row) => (
                <div key={row.step} className="bg-white/5 rounded-xl p-4 border border-white/10">
                  <div className="w-8 h-8 rounded-full bg-blue-600 flex items-center justify-center text-white font-bold text-sm mb-3">{row.step}</div>
                  <div className="text-white font-bold text-sm mb-1.5">{row.title}</div>
                  <div className="text-slate-300 text-xs leading-relaxed">{row.desc}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </SlideWrapper>
  );
}

// SLIDE 13: Thank You
export function SlideThankYou() {
  return (
    <SlideWrapper>
      <div className="flex-1 flex flex-col items-center justify-center px-5 py-6 md:px-12 md:py-6 relative">
        <GridBg />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] rounded-full opacity-10"
          style={{ background: "radial-gradient(circle, #3b82f6 0%, transparent 70%)" }} />
        <div className="relative z-10 flex flex-col items-center text-center">
          <div className="bg-white rounded-2xl px-8 py-4 shadow-2xl border border-slate-200 mb-6">
            <DutyBoostLogo height={48} linkTo="/airport-showcase" />
          </div>
          <div className="mb-4">
            <span className="text-blue-600 text-sm font-semibold uppercase tracking-widest">Thank You</span>
            <h2 className="text-2xl md:text-4xl lg:text-5xl font-heading font-bold text-[#0a0f1e] mt-2 leading-tight">
              Grow AUA's<br />
              <span className="text-blue-600">Non-Aeronautical Revenue.</span>
            </h2>
          </div>
          <p className="text-slate-600 text-sm md:text-base lg:text-lg max-w-3xl leading-relaxed mb-6">
            DutyBoost connects what already exists — AUA's 3M+ passengers, Avolta's duty-free stores, and the concession framework. By converting non-purchasing traffic into incremental retail sales, DutyBoost grows the revenue base AUA already earns from — without subsidy, without risk, and without changing a single concession contract.
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 max-w-3xl w-full mb-6">
            {[
              { Icon: TrendingUp, title: "More Retail Sales", desc: "Converting non-purchasing passengers into buyers at AUA's stores." },
              { Icon: DollarSign, title: "More Concession Revenue", desc: "Higher gross sales → higher percentage-based concession payments to AUA." },
              { Icon: CheckCircle, title: "Zero Cost, Zero Risk", desc: "Performance-based model with no subsidy, no infrastructure, no contract changes." },
            ].map((card, i) => (
              <div key={i} className="bg-slate-50 border border-slate-200 rounded-2xl p-5 text-left">
                <card.Icon className="w-8 h-8 text-blue-600 mb-2" />
                <div className="text-blue-700 font-bold text-sm mb-1.5">{card.title}</div>
                <div className="text-slate-600 text-xs leading-relaxed">{card.desc}</div>
              </div>
            ))}
          </div>
          <div className="bg-gradient-to-br from-blue-600 to-indigo-700 rounded-2xl p-5 text-white max-w-2xl">
            <p className="font-bold text-base lg:text-lg leading-snug mb-2">
              Ready to turn AUA's 3M+ passengers into incremental concession revenue?
            </p>
            <p className="text-blue-50 text-sm">
              Let's discuss how DutyBoost can grow Aruba Airport's non-aeronautical revenue within your existing concession framework.
            </p>
          </div>
          <div className="mt-6 text-slate-500 text-xs">
            CONFIDENTIAL — 2026 | Chamber of Commerce: 42053181 | VAT: NL869492068B01
          </div>
        </div>
      </div>
    </SlideWrapper>
  );
}

export const SLIDES = [
  { id: "cover", Component: SlideCover, label: "Cover" },
  { id: "team", Component: SlideTeam, label: "Our Team" },
  { id: "problem", Component: SlideProblem, label: "The Facts" },
  { id: "solution", Component: SlideSolution, label: "The Solution" },
  { id: "concessionModel", Component: SlideConcessionModel, label: "Concession Model" },
  { id: "magExample", Component: SlideMagExample, label: "MAG + Percentage" },
  { id: "arubaOpportunity", Component: SlideArubaOpportunity, label: "AUA Opportunity" },
  { id: "valueChain", Component: SlideValueChain, label: "Value Chain" },
  { id: "businessCase", Component: SlideBusinessCase, label: "Business Case" },
  { id: "promotion", Component: SlidePromotion, label: "The Cost of Waiting" },
  { id: "flywheel", Component: SlideFlywheel, label: "Growth Flywheel" },
  { id: "getStarted", Component: SlideGetStarted, label: "Partnership Model" },
  { id: "thankYou", Component: SlideThankYou, label: "Thank You" },
];