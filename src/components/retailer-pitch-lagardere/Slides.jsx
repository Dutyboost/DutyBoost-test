import { Fragment } from "react";
import { Link } from "react-router-dom";
import {
  ChevronRight, Cpu, BarChart3, Link2, Briefcase, CheckCircle,
  Plane, Package, Globe, TrendingUp, Building2, DollarSign, MapPin, Zap,
} from "lucide-react";
import DutyBoostLogo from "@/components/DutyBoostLogo";
import HotelIcon from "@/components/HotelIcon";
import CarRentalIcon from "@/components/CarRentalIcon";
import AirportRetailerIcon from "@/components/AirportRetailerIcon";
import TravelerIcon from "@/components/TravelerIcon";
import TravelAgencyIcon from "@/components/TravelAgencyIcon";
import { SlideWrapper, GridBg } from "@/components/investor/v2/Shared";

// ── Lagardère Travel Retail sources ──────────────────────────────────────────
const LAGARDERE_RESULTS = "https://www.lagardere.com/en/press-release/full-year-2024-results/";
const MOODIE_2024 = "https://moodiedavittreport.com/lagardere-travel-retail-delivers-double-digit-sales-growth-and-improved-profits-in-2024/";
const LTR_SITE = "https://www.lagardere-tr.com";
const PARADIES = "https://www.paradieslagardere.com";
const SCHIPHOL_JV = "https://news.schiphol.com/schiphol-enters-into-new-comprehensive-partnership-with-lagardere-travel-retail/";
const TODAY_DUTY_FREE = "https://moodiedavittreport.com/a-new-day-arrives-at-schiphol-with-landmark-today-duty-free-opening-with-lagardere/";
const ACI_LINK = "https://aci.aero/2026/07/15/worlds-busiest-airports-atlanta-holds-asia-climbs-strong-demand-while-asia-pacific-growth-reshape-the-rankings/";
const M1NDSET_LINK = "https://m1nd-set.com/";
const TFWA_LINK = "https://www.tfwa.com/";

const linkCls = "text-blue-600 font-semibold underline decoration-blue-600/50 hover:decoration-blue-400 hover:text-blue-500 transition-colors";

// ── LTR 2024 financials (sourced) ─────────────────────────────────────────────
// Revenue €5,812M (+15.8% reported / +12.5% LFL); Recurring EBIT €305M (+24.5%).
// Converting base = the 27% who currently buy. Non-purchase headroom (73/27 ratio).
const LTR_REVENUE_2024 = 5812; // €M
const CONVERTING_SHARE = 0.27;
const NON_PURCHASE_SHARE = 0.73;
const RETAILER_NET = 0.875;
// +1pp conversion uplift = (1 / 27) of the converting revenue base
const UPLIFT_1PP = LTR_REVENUE_2024 * (0.01 / CONVERTING_SHARE); // ≈ €215M
const headroom = LTR_REVENUE_2024 * (NON_PURCHASE_SHARE / CONVERTING_SHARE); // ≈ €15.7B

const fmtM = (n) => `€${Math.round(n)}M`;
const fmtB = (n) => `€${(n / 1000).toFixed(1)}B`;

// SLIDE 1: Cover — Lagardère
export function SlideCoverLagardere() {
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
              A Presentation for Lagardère Travel Retail
            </p>
          </div>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 sm:gap-6 mt-4 w-full">
            {[
              { label: "LTR Revenue 2024", value: "€5.8B" },
              { label: "Stores Worldwide", value: "4,800+" },
              { label: "Airports", value: "290+" },
              { label: "Upfront Cost", value: "€0" },
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

// SLIDE 3: Lagardère at a Glance — LTR's own data, fully sourced
export function SlideLagardereAtAGlance() {
  return (
    <SlideWrapper>
      <div className="flex-1 flex flex-col justify-center px-5 py-6 md:px-12 md:py-6 relative">
        <GridBg />
        <div className="relative z-10">
          <div className="mb-5">
            <span className="text-blue-600 text-sm font-semibold uppercase tracking-widest">Lagardère Travel Retail — At a Glance</span>
            <h2 className="text-xl md:text-3xl font-heading font-bold text-[#0a0f1e] mt-2">
              A Global Retail Network <span className="text-blue-600">in Full Growth</span>
            </h2>
            <p className="text-slate-500 mt-1 text-sm">
              Figures from <a href={LAGARDERE_RESULTS} target="_blank" rel="noopener noreferrer" className={linkCls}>Lagardère Full-Year 2024 results</a> and{" "}
              <a href={LTR_SITE} target="_blank" rel="noopener noreferrer" className={linkCls}>lagardere-tr.com</a>.
            </p>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-5">
            <div className="bg-blue-50 border border-blue-200 rounded-2xl p-5 text-center">
              <DollarSign className="w-8 h-8 text-blue-600 mx-auto mb-2" />
              <div className="text-2xl md:text-3xl font-bold text-blue-700 mb-1">€5.8B</div>
              <div className="text-slate-600 font-semibold text-sm">LTR Revenue 2024</div>
              <div className="text-slate-500 text-xs mt-1">+15.8% reported / +12.5% LFL</div>
            </div>
            <div className="bg-indigo-50 border border-indigo-200 rounded-2xl p-5 text-center">
              <Building2 className="w-8 h-8 text-indigo-600 mx-auto mb-2" />
              <div className="text-2xl md:text-3xl font-bold text-indigo-700 mb-1">4,800+</div>
              <div className="text-slate-600 font-semibold text-sm">Stores Worldwide</div>
              <div className="text-slate-500 text-xs mt-1">Across 61 countries</div>
            </div>
            <div className="bg-violet-50 border border-violet-200 rounded-2xl p-5 text-center">
              <Plane className="w-8 h-8 text-violet-600 mx-auto mb-2" />
              <div className="text-2xl md:text-3xl font-bold text-violet-700 mb-1">290+</div>
              <div className="text-slate-600 font-semibold text-sm">Airports</div>
              <div className="text-slate-500 text-xs mt-1"> incl. 92 in North America</div>
            </div>
            <div className="bg-green-50 border border-green-200 rounded-2xl p-5 text-center">
              <TrendingUp className="w-8 h-8 text-green-600 mx-auto mb-2" />
              <div className="text-2xl md:text-3xl font-bold text-green-700 mb-1">€305M</div>
              <div className="text-slate-600 font-semibold text-sm">Recurring EBIT 2024</div>
              <div className="text-slate-500 text-xs mt-1">+24.5% vs 2023</div>
            </div>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            <div className="bg-slate-50 border border-slate-200 rounded-2xl p-6">
              <h3 className="font-bold text-slate-700 mb-3">Regional Momentum (2024, like-for-like)</h3>
              <div className="space-y-2 text-sm">
                {[
                  { reg: "France", val: "+15%", note: "Extime Duty Free Paris JV with Groupe ADP" },
                  { reg: "EMEA (ex-France)", val: "+20%", note: "Italy, Romania, UK ferries, Spain" },
                  { reg: "Americas", val: "+6%", note: "Paradies Lagardère — 92 airports, 700+ stores" },
                ].map((r) => (
                  <div key={r.reg} className="flex items-center gap-3 py-1.5 px-3 rounded-lg bg-white border border-slate-100">
                    <span className="text-blue-700 font-semibold w-40">{r.reg}</span>
                    <span className="text-green-600 font-bold w-12">{r.val}</span>
                    <span className="text-slate-500 text-xs flex-1">{r.note}</span>
                  </div>
                ))}
              </div>
              <div className="text-slate-400 text-xs mt-3">Source: <a href={MOODIE_2024} target="_blank" rel="noopener noreferrer" className={linkCls}>Moodie Davitt Report</a></div>
            </div>
            <div className="bg-gradient-to-br from-blue-600 to-indigo-700 rounded-2xl p-6 text-white">
              <div className="flex items-center gap-2 mb-3">
                <MapPin className="w-5 h-5" />
                <h3 className="font-bold">Flagship: Amsterdam Schiphol</h3>
              </div>
              <p className="text-blue-50 text-sm leading-relaxed">
                LTR is Schiphol's exclusive Duty Free operator under a 70/30 JV with Royal Schiphol Group — operating 20+ duty-free stores behind security and the flagship <em>Today Duty Free</em> concept, the airport's largest shop.
              </p>
              <div className="mt-3 grid grid-cols-3 gap-3 text-center">
                {[
                  { val: "70/30", label: "JV (LTR/Schiphol)" },
                  { val: "20+", label: "Duty-Free Stores" },
                  { val: "May 2025", label: "Operational" },
                ].map((s) => (
                  <div key={s.label} className="bg-white/10 rounded-lg p-2">
                    <div className="text-sm font-bold">{s.val}</div>
                    <div className="text-blue-200 text-xs">{s.label}</div>
                  </div>
                ))}
              </div>
              <div className="text-blue-100 text-xs mt-3">
                <a href={SCHIPHOL_JV} target="_blank" rel="noopener noreferrer" className="underline decoration-white/40 hover:decoration-white">Schiphol announcement</a>{" · "}
                <a href={TODAY_DUTY_FREE} target="_blank" rel="noopener noreferrer" className="underline decoration-white/40 hover:decoration-white">Today Duty Free opening</a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </SlideWrapper>
  );
}

// SLIDE 4: The Facts — Avolta-free. 73% non-purchase from m1nd-set / TFWA / ACI.
export function SlideFacts() {
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
                <div className="text-3xl md:text-5xl font-bold text-blue-600 mb-2">9.8B</div>
                <div className="text-slate-800 font-semibold">Global passengers in 2025</div>
                <div className="text-slate-500 text-sm mt-1">+3.6% vs 2024{" "}
                  <a href={ACI_LINK} target="_blank" rel="noopener noreferrer" className={linkCls}>(ACI World)</a>
                </div>
              </div>
              <div className="bg-slate-50 border border-slate-200 rounded-2xl p-6">
                <div className="text-3xl md:text-5xl font-bold text-orange-600 mb-2">27%</div>
                <a href={M1NDSET_LINK} target="_blank" rel="noopener noreferrer" className={linkCls}>Global conversion benchmark</a>
                <div className="text-slate-500 text-sm mt-1">Industry penetration rate (m1nd-set / TFWA)</div>
              </div>
              <div className="bg-red-50 border border-red-200 rounded-2xl p-6">
                <div className="text-3xl md:text-5xl font-bold text-red-600 mb-2">7.15B</div>
                <div className="text-slate-800 font-semibold">Non-purchasing passengers</div>
                <div className="text-slate-500 text-sm mt-1">73% of 9.8B global passengers</div>
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

// SLIDE 5: The Solution
export function SlideSolution() {
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
          <div className="grid grid-cols-2 md:grid-cols-5 gap-5 mb-6">
            <div className="bg-violet-600 border border-violet-700 rounded-2xl p-5 text-center text-white">
              <Zap className="w-10 h-10 mx-auto mb-3 text-white" />
              <Link to="/eligibility-showcase" target="_blank" rel="noopener noreferrer" className="font-semibold mb-1 inline-flex items-center gap-1 underline decoration-white/40 hover:decoration-white">
                DutyBoost Platform
              </Link>
              <div className="text-violet-100 text-sm">Travellers generate their own DutyCredits directly — no partner required</div>
            </div>
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
          <div className="hidden lg:flex items-stretch gap-2 mb-6">
            {[
              "Partners distribute DutyCredit",
              "Traveller activates benefit",
              "Arrives with purchase intent",
              "Visits participating retailer",
              "Spends €100 → Saves €10",
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
                <div className="text-2xl font-bold text-blue-600 h-9 flex items-center justify-center whitespace-nowrap">€1 – €60</div>
                <div className="text-slate-500 text-sm mt-2">DutyCredit direct traveller value</div>
              </div>
              <div className="flex flex-col items-center">
                <div className="text-2xl font-bold text-blue-600 h-9 flex items-center justify-center whitespace-nowrap">Performance-Based</div>
                <div className="text-slate-500 text-sm mt-2">Zero upfront cost to any partner</div>
              </div>
              <div className="flex flex-col items-center">
                <div className="text-2xl font-bold text-blue-600 h-9 flex items-center justify-center whitespace-nowrap">Participants</div>
                <div className="text-slate-500 text-sm mt-2">All benefit from one transaction</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </SlideWrapper>
  );
}

// SLIDE 6: The Lagardère Opportunity — LTR-only uplift math, no Avolta.
export function SlideLagardereOpportunity() {
  return (
    <SlideWrapper>
      <div className="flex-1 flex flex-col justify-center px-5 py-6 md:px-12 md:py-6 relative">
        <GridBg />
        <div className="relative z-10">
          <div className="mb-5">
            <span className="text-blue-600 text-sm font-semibold uppercase tracking-widest">The Lagardère Opportunity</span>
            <h2 className="text-xl md:text-3xl font-heading font-bold text-[#0a0f1e] mt-2">
              Small Conversion Gains = <span className="text-blue-600">Enormous Value at LTR Scale</span>
            </h2>
            <p className="text-slate-500 mt-1 text-sm">
              LTR's €5.8B 2024 revenue comes from the ~27% of passengers who buy. The other 73% is untapped headroom — DutyBoost activates them before arrival.
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-5">
            <div className="bg-red-50 border border-red-200 rounded-2xl p-6">
              <div className="flex items-center gap-4">
                <div>
                  <div className="text-3xl md:text-5xl font-bold text-red-600">73%</div>
                  <div className="text-slate-600 font-semibold text-sm mt-1">Non-purchasing headroom</div>
                  <div className="text-slate-400 text-xs mt-1">m1nd-set / TFWA global benchmark</div>
                </div>
                <div className="flex-1 text-right">
                  <div className="text-3xl md:text-5xl font-bold text-green-600">€{headroom.toFixed(0)}M</div>
                  <div className="text-slate-600 font-semibold text-sm mt-1">Implied untapped basket value</div>
                  <div className="text-slate-400 text-xs mt-1">at LTR's current spend mix</div>
                </div>
              </div>
              <div className="mt-3 pt-3 border-t border-red-200/60 text-slate-500 text-xs">
                Headroom derived from LTR's €5,812M converting revenue scaled by the 73/27 non-purchase ratio.{" "}
                <a href={MOODIE_2024} target="_blank" rel="noopener noreferrer" className={linkCls}>LTR 2024 revenue</a>
              </div>
            </div>
            <div className="bg-blue-50 border border-blue-200 rounded-2xl p-6">
              <h3 className="font-bold text-blue-800 mb-2">Each +1pp of Conversion</h3>
              <div className="text-3xl md:text-4xl font-bold text-blue-700">{fmtM(UPLIFT_1PP)}</div>
              <div className="text-slate-600 text-sm mt-1">incremental retail value across LTR's network</div>
              <div className="text-green-600 font-bold text-xl mt-3">{fmtM(UPLIFT_1PP * RETAILER_NET)}</div>
              <div className="text-slate-600 text-sm">retailer net (87.5%) before normal costs</div>
              <div className="text-slate-400 text-xs mt-3">1pp = 1% of total passengers converting at LTR's current average basket.</div>
            </div>
          </div>
          <div className="bg-gradient-to-br from-blue-600 to-indigo-700 rounded-2xl p-5 text-white">
            <div className="text-sm font-semibold opacity-80 mb-1">The Core Question</div>
            <p className="text-lg font-bold leading-snug">
              "Is earning €87.50 from an incremental €100 retail sale — without any upfront acquisition cost — more valuable than earning €0 from a traveller who otherwise wouldn't have converted?"
            </p>
            <p className="text-sm mt-2 opacity-80">Yes. Every time. And LTR's 4,800+ stores make the scale extraordinary.</p>
          </div>
        </div>
      </div>
    </SlideWrapper>
  );
}

// SLIDE 7: Lagardère Network — key airports + LTR store counts
export function SlideLagardereNetwork() {
  const airports = [
    { code: "AMS", name: "Amsterdam Schiphol", country: "Netherlands", stores: 55, note: "Exclusive Duty Free · Today Duty Free flagship", pax: "68.8M" },
    { code: "ATL", name: "Hartsfield-Jackson Atlanta", country: "United States", stores: 50, note: "Paradies Lagardère HQ airport", pax: "104.6M" },
    { code: "CDG", name: "Paris Charles de Gaulle", country: "France", stores: 38, note: "Extime Duty Free Paris JV", pax: "67.6M" },
    { code: "MAD", name: "Madrid-Barajas", country: "Spain", stores: 35, note: "AENA partnership", pax: "60.2M" },
    { code: "LAX", name: "Los Angeles International", country: "United States", stores: 35, note: "Paradies Lagardère", pax: "75.9M" },
    { code: "FRA", name: "Frankfurt Airport", country: "Germany", stores: 30, note: "Major German hub", pax: "59.4M" },
    { code: "BCN", name: "Barcelona-El Prat", country: "Spain", stores: 28, note: "AENA network", pax: "52.6M" },
    { code: "SIN", name: "Singapore Changi", country: "Singapore", stores: 22, note: "Asia-Pacific flagship", pax: "58.9M" },
  ];
  return (
    <SlideWrapper>
      <div className="flex-1 flex flex-col justify-center px-5 py-6 md:px-12 md:py-6 relative">
        <GridBg />
        <div className="relative z-10">
          <div className="mb-5">
            <span className="text-blue-600 text-sm font-semibold uppercase tracking-widest">Lagardère Network — Flagship Airports</span>
            <h2 className="text-xl md:text-3xl font-heading font-bold text-[#0a0f1e] mt-2">
              290+ Airports. <span className="text-blue-600">4,800+ Stores.</span> 61 Countries.
            </h2>
            <p className="text-slate-500 mt-1 text-sm">
              A selection of LTR's flagship airports and store counts. Full footprint:{" "}
              <a href={LTR_SITE} target="_blank" rel="noopener noreferrer" className={linkCls}>lagardere-tr.com</a>{" · "}
              <a href={PARADIES} target="_blank" rel="noopener noreferrer" className={linkCls}>paradieslagardere.com</a>
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-5">
            {airports.map((a) => (
              <div key={a.code} className="bg-blue-50 border border-blue-200 rounded-2xl p-4 flex flex-col">
                <div className="flex items-center justify-between mb-2">
                  <div className="text-2xl font-bold text-blue-700">{a.code}</div>
                  <Plane className="w-5 h-5 text-blue-400" />
                </div>
                <div className="text-slate-800 font-semibold text-sm leading-tight mb-1">{a.name}</div>
                <div className="text-slate-500 text-xs mb-1">{a.country} · {a.pax} pax</div>
                <div className="text-blue-600 text-xs font-medium mb-2">{a.stores} LTR stores</div>
                <div className="text-slate-400 text-xs leading-snug">{a.note}</div>
              </div>
            ))}
          </div>
          <div className="bg-gradient-to-br from-blue-600 to-indigo-700 rounded-2xl p-5 text-white">
            <div className="flex items-center gap-2 mb-2">
              <Globe className="w-5 h-5" />
              <h3 className="font-bold">A Single POS Activation Reaches Them All</h3>
            </div>
            <p className="text-blue-50 text-sm leading-relaxed">
              From Schiphol to Atlanta, CDG to Changi — LTR's stores already run on enterprise POS infrastructure. DutyBoost flows through that existing layer, one toggle at a time.
            </p>
            <div className="mt-3 grid grid-cols-2 md:grid-cols-4 gap-3 text-center">
              {[
                { val: "290+", label: "Airports" },
                { val: "4,800+", label: "Stores" },
                { val: "61", label: "Countries" },
                { val: "33,000+", label: "Employees" },
              ].map((s, i) => (
                <div key={i} className="bg-white/10 rounded-lg p-2">
                  <div className="text-xl font-bold">{s.val}</div>
                  <div className="text-blue-200 text-xs">{s.label}</div>
                </div>
              ))}
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
                  { tier: "Entry", range: "€20–€49", disc: "5%–7.5%", save: "€1.00–€3.19" },
                  { tier: "Boarding", range: "€50–€99", disc: "7.5%–10%", save: "€3.75–€9.41" },
                  { tier: "Standard", range: "€100–€149", disc: "10%–12.5%", save: "€10.00–€18.25" },
                  { tier: "Plus", range: "€150–€199", disc: "12.5%–15%", save: "€18.75–€29.04" },
                  { tier: "Lounge", range: "€200–€249", disc: "15%–17.5%", save: "€30.00–€42.75" },
                  { tier: "Premium", range: "€250–€299", disc: "17.5%–20%", save: "€43.75–€57.00" },
                  { tier: "VIP", range: "€300+", disc: "20% capped", save: "Up to €60" },
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
                    { party: "Travel & Corporate Partner", share: "20% of fee", pct: "0.50%", val: "€0.50", color: "blue", bg: "bg-blue-200" },
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
                <div className="grid grid-cols-1 gap-1.5 text-sm">
                  {[
                    { party: "Retailers", val: "€87.5M net before costs" },
                    { party: "Travellers", val: "€10M in savings" },
                    { party: "Travel & Corporate Partners", val: "€500,000 ancillary revenue" },
                    { party: "POS Partners", val: "€250,000 transaction revenue" },
                    { party: "DutyBoost", val: "€1.75M infrastructure revenue" },
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
    { party: "Traveller", Icon: TravelerIcon, value: "€10.00", sub: "DutyCredit saving (10%)", color: "green", bg: "bg-green-50", border: "border-green-200" },
    { party: "Airport Retailer", Icon: AirportRetailerIcon, value: "€87.50", sub: "Net before normal costs (87.5%)", color: "blue", bg: "bg-blue-50", border: "border-blue-200" },
    { party: "Travel & Corporate Partner", Icon: Briefcase, value: "€0.50", sub: "Ancillary revenue (0.5%)", color: "yellow", bg: "bg-yellow-50", border: "border-yellow-200" },
    { party: "POS Partner", Icon: Cpu, value: "€0.25", sub: "Transaction revenue (0.25%)", color: "purple", bg: "bg-purple-50", border: "border-purple-200" },
    { party: "DutyBoost", Icon: BarChart3, value: "€1.75", sub: "Infrastructure revenue (1.75%)", color: "orange", bg: "bg-orange-50", border: "border-orange-200" },
  ];
  return (
    <SlideWrapper>
      <div className="flex-1 flex flex-col justify-center px-5 py-6 md:px-12 md:py-6 relative">
        <GridBg />
        <div className="relative z-10">
          <div className="mb-6">
            <span className="text-blue-600 text-sm font-semibold uppercase tracking-widest">One Transaction — Five Beneficiaries</span>
            <h2 className="text-xl md:text-3xl font-heading font-bold text-[#0a0f1e] mt-2">€100 Original Qualifying Retail Value</h2>
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
              <div className="text-slate-500 text-xs uppercase tracking-wide mb-2">Total = €100.00</div>
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
                A single Enterprise POS integration can enable DutyBoost across multiple retailers, stores, airports and geographic markets — fundamentally better scaling economics than per-retailer integrations.
              </p>
              <div className="mt-3 text-blue-100 font-semibold text-sm">Technology strategy: INTEGRATE ONCE. DEPLOY REPEATEDLY.</div>
            </div>
          </div>
        </div>
      </div>
    </SlideWrapper>
  );
}

// SLIDE 10: Lagardère Revenue Potential — scenario table across the LTR network
export function SlideLagardereRevenue() {
  const scenarios = [
    { pp: "+0.5pp", retail: UPLIFT_1PP * 0.5, net: UPLIFT_1PP * 0.5 * RETAILER_NET },
    { pp: "+1pp", retail: UPLIFT_1PP, net: UPLIFT_1PP * RETAILER_NET },
    { pp: "+2pp", retail: UPLIFT_1PP * 2, net: UPLIFT_1PP * 2 * RETAILER_NET },
    { pp: "+5pp", retail: UPLIFT_1PP * 5, net: UPLIFT_1PP * 5 * RETAILER_NET },
  ];
  return (
    <SlideWrapper>
      <div className="flex-1 flex flex-col justify-center px-5 py-6 md:px-12 md:py-6 relative">
        <GridBg />
        <div className="relative z-10">
          <div className="mb-5">
            <span className="text-blue-600 text-sm font-semibold uppercase tracking-widest">Lagardère Revenue Potential</span>
            <h2 className="text-xl md:text-3xl font-heading font-bold text-[#0a0f1e] mt-2">
              Incremental Retail Value <span className="text-blue-600">Across LTR's Network</span>
            </h2>
            <p className="text-slate-500 mt-1 text-sm">
              Based on LTR's €5,812M 2024 converting revenue. Each +1pp of conversion unlocks ~{fmtM(UPLIFT_1PP)} of incremental retail value — retailer net shown at 87.5%.
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-5">
            {scenarios.map((s, i) => (
              <div key={s.pp} className={`bg-blue-50 border border-blue-200 rounded-2xl p-5 text-center ${i === 1 ? "ring-2 ring-blue-500" : ""}`}>
                <div className="text-xs font-semibold text-blue-600 uppercase tracking-wide mb-2">{s.pp} conversion</div>
                <div className="text-slate-400 text-xs mb-1">incremental retail value</div>
                <div className="text-lg font-bold text-slate-700 mb-3">{fmtB(s.retail)}</div>
                <div className="text-2xl md:text-3xl font-bold text-blue-700 mb-1">{fmtB(s.net)}</div>
                <div className="text-blue-600 text-xs font-medium">retailer net (87.5%)</div>
              </div>
            ))}
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            <div className="bg-slate-800 text-white rounded-2xl p-5">
              <h3 className="font-bold mb-3">Why This Is Pure Upside for Lagardère</h3>
              <ul className="space-y-2 text-sm">
                {[
                  "100% incremental — from travellers who otherwise wouldn't buy",
                  "Zero upfront cost — pay only the 2.5% fee on validated sales",
                  "No change to existing POS, pricing or merchandising",
                  "Attributed & reported transparently per transaction",
                  "Scales instantly across 4,800+ stores in 61 countries",
                ].map((item, i) => (
                  <li key={i} className="flex items-start gap-2">
                    <CheckCircle className="w-4 h-4 text-green-400 flex-shrink-0 mt-0.5" />
                    <span className="text-slate-300">{item}</span>
                  </li>
                ))}
              </ul>
            </div>
            <div className="bg-gradient-to-br from-blue-50 to-indigo-50 border border-blue-200 rounded-2xl p-5">
              <h3 className="font-bold text-blue-900 mb-3">The Headroom Behind These Numbers</h3>
              <div className="space-y-3 text-sm">
                <div className="flex justify-between items-center py-1.5 px-3 rounded-lg bg-white border border-slate-100">
                  <span className="text-slate-600">LTR 2024 converting revenue (≈27% who buy)</span>
                  <span className="font-bold text-blue-700">€5.8B</span>
                </div>
                <div className="flex justify-between items-center py-1.5 px-3 rounded-lg bg-red-50 border border-red-100">
                  <span className="text-slate-600">Implied non-purchase headroom (73%)</span>
                  <span className="font-bold text-red-600">{fmtB(headroom)}</span>
                </div>
                <div className="flex justify-between items-center py-1.5 px-3 rounded-lg bg-blue-100 border border-blue-200 font-semibold">
                  <span className="text-slate-700">Each +1pp of conversion unlocks</span>
                  <span className="font-bold text-blue-700">{fmtM(UPLIFT_1PP)}</span>
                </div>
              </div>
              <div className="text-slate-400 text-xs mt-3">Conversion maths grounded solely in LTR's reported revenue and the global 73/27 non-purchase ratio (m1nd-set / TFWA).</div>
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
                  "DutyBoost appears as a new feature in your existing POS dashboard",
                  "You flip the switch — no separate integration required from the retailer",
                  "No replacement of ERP, payment or inventory systems",
                  "Once switched on, all connected stores can redeem DutyCredits",
                  "Works across all stores, airports and markets on the same POS",
                  "Switch it off anytime — no lock-in, no commitments",
                ].map((item, i) => (
                  <div key={i} className="flex items-start gap-3">
                    <CheckCircle className="w-4 h-4 text-green-400 flex-shrink-0 mt-0.5" />
                    <span className="text-slate-300 text-sm">{item}</span>
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

// SLIDE 12: Growth Flywheel
export function SlideFlywheel() {
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
                <p className="text-blue-100 text-sm mt-2">Each new partner makes the platform more valuable for every existing partner.</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </SlideWrapper>
  );
}

// SLIDE 13: Closing — Lagardère
export function SlideClosingLagardere() {
  return (
    <SlideWrapper dark>
      <div className="flex-1 flex flex-col items-center justify-center px-6 md:px-16 text-center relative">
        <GridBg />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] rounded-full opacity-10"
          style={{ background: "radial-gradient(circle, #3b82f6 0%, transparent 70%)" }} />
        <div className="relative z-10 flex flex-col items-center gap-8">
          <div className="bg-white rounded-2xl px-8 py-4 shadow-2xl border border-slate-200">
            <DutyBoostLogo height={50} linkTo="/retailer-showcase" />
          </div>
          <div>
            <h1 className="text-3xl md:text-5xl font-heading font-bold text-white leading-tight mb-4">
              Converting the 73%<br />
              <span className="text-blue-400">Who Never Buy — Across LTR's Network</span>
            </h1>
            <p className="text-lg md:text-xl text-slate-300 max-w-3xl leading-relaxed">
              A proven, performance-based revenue layer — built on infrastructure LTR already operates.
            </p>
          </div>
          <div className="grid grid-cols-3 gap-2 sm:gap-6 mt-4 w-full max-w-2xl">
            {[
              { label: "LTR Stores", value: "4,800+" },
              { label: "Airports", value: "290+" },
              { label: "Upfront Cost", value: "€0" },
            ].map((s) => (
              <div key={s.label} className="text-center">
                <div className="text-base sm:text-2xl font-bold text-blue-400">{s.value}</div>
                <div className="text-xs sm:text-sm text-slate-400 mt-1">{s.label}</div>
              </div>
            ))}
          </div>
          <h2 className="text-4xl md:text-6xl font-heading font-bold text-blue-400 tracking-tight">THANK YOU</h2>
          <div className="mt-2 text-xs text-slate-400 border border-white/10 rounded px-4 py-2">
            CONFIDENTIAL — 2026 | Chamber of Commerce: 42053181 | VAT: NL869492068B01
          </div>
        </div>
      </div>
    </SlideWrapper>
  );
}