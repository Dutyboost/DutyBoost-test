import { Fragment } from "react";
import { Link } from "react-router-dom";
import {
  ChevronRight, Cpu, BarChart3, Link2, Briefcase, CheckCircle,
  Plane, Package, Globe, TrendingUp, Building2, DollarSign, MapPin, Zap, RefreshCw, BadgePercent,
  Search, Code2, ShieldCheck, Rocket, XCircle, Clock,
} from "lucide-react";
import DutyBoostLogo from "@/components/DutyBoostLogo";
import HotelIcon from "@/components/HotelIcon";
import CarRentalIcon from "@/components/CarRentalIcon";
import AirportRetailerIcon from "@/components/AirportRetailerIcon";
import TravelerIcon from "@/components/TravelerIcon";
import TravelAgencyIcon from "@/components/TravelAgencyIcon";
import { SlideWrapper, GridBg } from "@/components/investor/v2/Shared";
import { SlideTierMix as TierMixSlide } from "@/components/shared/SlideTierMix";

// ── Lagardère Travel Retail sources ──────────────────────────────────────────
const LAGARDERE_RESULTS = "https://www.lagardere.com/en/press-release/full-year-2025-results/";
const MOODIE_2024 = "https://moodiedavittreport.com/lagardere-travel-retail-delivers-double-digit-sales-growth-and-improved-profits-in-2024/";
const LTR_SITE = "https://www.lagardere-tr.com";
const PARADIES = "https://www.paradieslagardere.com";
const SCHIPHOL_JV = "https://news.schiphol.com/schiphol-enters-into-new-comprehensive-partnership-with-lagardere-travel-retail/";
const TODAY_DUTY_FREE = "https://moodiedavittreport.com/a-new-day-arrives-at-schiphol-with-landmark-today-duty-free-opening-with-lagardere/";
const ACI_LINK = "https://aci.aero/2026/07/15/worlds-busiest-airports-atlanta-holds-asia-climbs-strong-demand-while-asia-pacific-growth-reshape-the-rankings/";
const M1NDSET_LINK = "https://m1nd-set.com/";
const TFWA_LINK = "https://www.tfwa.com/";

const linkCls = "text-blue-600 font-semibold underline decoration-blue-600/50 hover:decoration-blue-400 hover:text-blue-500 transition-colors";

// ── LTR 2025 financials (sourced) ─────────────────────────────────────────────
// Revenue €6,133M (+5.5% reported / +4.4% LFL); EBITA €312M (+17.3%).
// Converting base = the 27% who currently buy. Non-purchase headroom (73/27 ratio).
const LTR_REVENUE_BASE = 6133; // €M (2025)
const CONVERTING_SHARE = 0.27;
const NON_PURCHASE_SHARE = 0.73;
const RETAILER_NET = 0.925;
// +1pp conversion uplift = (1 / 27) of the converting revenue base
const UPLIFT_1PP = LTR_REVENUE_BASE * (0.01 / CONVERTING_SHARE); // ≈ €227M
const headroom = LTR_REVENUE_BASE * (NON_PURCHASE_SHARE / CONVERTING_SHARE); // ≈ €16.6B

const fmtM = (n) => `€${Math.round(n)}M`;
const fmtB = (n) => `€${(n / 1000).toFixed(1)}B`;

// ── Lagardère Travel Retail — sourced benchmarks ──────────────────────────────
const ACI_BUSY = "https://aci.aero/resources/busiest-airports-in-the-world/";
const LTR_FOOTPRINT = "https://www.lagardere.com/en/press-release/lagardere-travel-retail-publishes-its-annual-industry-wide-global-report-on-travel-retail-and-dining-trends-travel-experience-voices/";
const LTR_RESULTS_2025 = "https://moodiedavittreport.com/lagardere-travel-retail-delivers-record-revenues-in-2025-with-strong-gains-in-europe-africa-and-south-america/";
const LTR_REVENUE_2025 = 6133; // €M (+5.5%)
const LTR_EBITA_2025 = 312; // €M (+17.3%)
const LTR_STORES = 5120;
const LTR_COUNTRIES = 42;
// LTR network passenger exposure (estimate). LTR does not publish a reach figure;
// derived from the industry benchmark: 2.5B passengers ÷ 350 airports ≈ 7.1M/airport.
const INDUSTRY_BENCHMARK = "https://moodiedavittreport.com/images-of-the-day-avolta-captures-the-scale-scope-and-storytelling-power-of-travel-retail/";
const BENCHMARK_PAX = 2500; // million — leading global travel retailer published reach
const BENCHMARK_AIRPORTS = 350;
const LTR_AIRPORTS = 290;
const LTR_PAX_EXPOSED_EST = Math.round((BENCHMARK_PAX * LTR_AIRPORTS) / BENCHMARK_AIRPORTS); // ≈ 2071M
const LTR_NON_PURCHASE_EST = Math.round(LTR_PAX_EXPOSED_EST * NON_PURCHASE_SHARE); // ≈ 1512M

// ── Schiphol Joint Venture (LTR / Royal Schiphol Group 70:30) ───────────────────
// Schiphol = LTR's exclusive Duty Free operator; flagship "Today Duty Free" (May 2025).
const SCHIPHOL_PAX = 68.8; // million passengers (ACI 2024/2025)
const SCHIPHOL_CONVERTERS = SCHIPHOL_PAX * CONVERTING_SHARE; // ≈ 18.6M
const SCHIPHOL_NON_PURCHASE = SCHIPHOL_PAX * NON_PURCHASE_SHARE; // ≈ 50.2M
const ILLUSTRATIVE_BASKET = 20; // € — Entry-tier minimum basket, consistent with the model (slides 8-9)
const SCHIPHOL_UPLIFT_1PP = SCHIPHOL_PAX * 0.01 * ILLUSTRATIVE_BASKET; // ≈ €13.8M per +1pp

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
              { label: "LTR Revenue 2025", value: "€6.1B" },
              { label: "Stores Worldwide", value: "5,120+" },
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
              Figures from <a href={LAGARDERE_RESULTS} target="_blank" rel="noopener noreferrer" className={linkCls}>Lagardère Full-Year 2025 results</a> and{" "}
              <a href={LTR_RESULTS_2025} target="_blank" rel="noopener noreferrer" className={linkCls}>Moodie Davitt Report (2025)</a>.
            </p>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-5">
            <div className="bg-blue-50 border border-blue-200 rounded-2xl p-5 text-center">
              <DollarSign className="w-8 h-8 text-blue-600 mx-auto mb-2" />
              <div className="text-2xl md:text-3xl font-bold text-blue-700 mb-1">€6.13B</div>
              <div className="text-slate-600 font-semibold text-sm">LTR Revenue 2025</div>
              <div className="text-slate-500 text-xs mt-1">+5.5% reported / +4.4% LFL</div>
            </div>
            <div className="bg-indigo-50 border border-indigo-200 rounded-2xl p-5 text-center">
              <Building2 className="w-8 h-8 text-indigo-600 mx-auto mb-2" />
              <div className="text-2xl md:text-3xl font-bold text-indigo-700 mb-1">5,120+</div>
              <div className="text-slate-600 font-semibold text-sm">Stores Worldwide</div>
              <div className="text-slate-500 text-xs mt-1">Across 42 countries</div>
            </div>
            <div className="bg-violet-50 border border-violet-200 rounded-2xl p-5 text-center">
              <Plane className="w-8 h-8 text-violet-600 mx-auto mb-2" />
              <div className="text-2xl md:text-3xl font-bold text-violet-700 mb-1">290+</div>
              <div className="text-slate-600 font-semibold text-sm">Airports</div>
              <div className="text-slate-500 text-xs mt-1"> incl. 92 in North America</div>
            </div>
            <div className="bg-green-50 border border-green-200 rounded-2xl p-5 text-center">
              <TrendingUp className="w-8 h-8 text-green-600 mx-auto mb-2" />
              <div className="text-2xl md:text-3xl font-bold text-green-700 mb-1">€312M</div>
              <div className="text-slate-600 font-semibold text-sm">EBITA 2025</div>
              <div className="text-slate-500 text-xs mt-1">+17.3% vs 2024</div>
            </div>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            <div className="bg-slate-50 border border-slate-200 rounded-2xl p-6">
              <h3 className="font-bold text-slate-700 mb-3">Regional Momentum (2025, like-for-like)</h3>
              <div className="space-y-2 text-sm">
                {[
                  { reg: "France", val: "+3%", note: "Extime Duty Free Paris JV with Groupe ADP" },
                  { reg: "EMEA (ex-France)", val: "+7%", note: "UK, Italy, Romania, Spain" },
                  { reg: "Americas", val: "+3%", note: "Paradies Lagardère; South America +28%" },
                ].map((r) => (
                  <div key={r.reg} className="flex items-center gap-3 py-1.5 px-3 rounded-lg bg-white border border-slate-100">
                    <span className="text-blue-700 font-semibold w-40">{r.reg}</span>
                    <span className="text-green-600 font-bold w-12">{r.val}</span>
                    <span className="text-slate-500 text-xs flex-1">{r.note}</span>
                  </div>
                ))}
              </div>
              <div className="text-slate-400 text-xs mt-3">Source: <a href={LTR_RESULTS_2025} target="_blank" rel="noopener noreferrer" className={linkCls}>Moodie Davitt Report (2025)</a></div>
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

// SLIDE 4: The Facts — Lagardère-specific traffic, not global. Sources: ACI World + m1nd-set / TFWA.
export function SlideFacts() {
  return (
    <SlideWrapper>
      <div className="flex-1 flex flex-col justify-center px-5 py-6 md:px-12 md:py-6 relative">
        <GridBg />
        <div className="relative z-10">
          <div className="mb-5">
            <span className="text-blue-600 text-sm font-semibold uppercase tracking-widest">The Facts — Lagardère Network</span>
            <h2 className="text-xl md:text-3xl font-heading font-bold text-[#0a0f1e] mt-2">
              73% of Passengers at LTR Airports<br /><span className="text-blue-600">Never Make a Purchase</span>
            </h2>
            <p className="text-slate-500 mt-1 text-sm">
              Lagardère Travel Retail footprint and conversion benchmarks.{" "}
              Penetration: <a href={M1NDSET_LINK} target="_blank" rel="noopener noreferrer" className={linkCls}>m1nd-set</a> /{" "}
              <a href={TFWA_LINK} target="_blank" rel="noopener noreferrer" className={linkCls}>TFWA</a>.
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-5 mb-5">
            <div className="bg-slate-50 border border-slate-200 rounded-2xl p-6">
              <div className="text-3xl md:text-4xl font-bold text-blue-600 mb-2">~{(LTR_PAX_EXPOSED_EST / 1000).toFixed(1)}B</div>
              <div className="text-slate-800 font-semibold">Passengers exposed to LTR network (2025, est.)</div>
              <div className="text-slate-500 text-sm mt-1">290+ airport network (est.)</div>
            </div>
            <div className="bg-slate-50 border border-slate-200 rounded-2xl p-6">
              <div className="text-3xl md:text-4xl font-bold text-orange-600 mb-2">27%</div>
              <div className="text-slate-800 font-semibold">Penetration rate</div>
              <div className="text-slate-500 text-sm mt-1">Share who convert to a purchase{" "}
                <a href={M1NDSET_LINK} target="_blank" rel="noopener noreferrer" className={linkCls}>(m1nd-set / TFWA)</a>
              </div>
            </div>
            <div className="bg-red-50 border border-red-200 rounded-2xl p-6">
              <div className="text-3xl md:text-4xl font-bold text-red-600 mb-2">~{(LTR_NON_PURCHASE_EST / 1000).toFixed(1)}B</div>
              <div className="text-slate-800 font-semibold">Non-purchasing passengers</div>
              <div className="text-slate-500 text-sm mt-1">73% of LTR network traffic (est.)</div>
            </div>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            <div className="bg-slate-50 border border-slate-200 rounded-2xl p-5">
              <h3 className="text-slate-800 font-semibold text-sm mb-3">How LTR network exposure is estimated</h3>
              <div className="space-y-2 text-sm text-slate-600">
                <div className="flex items-start gap-2">
                  <span className="text-slate-400 w-5 flex-shrink-0">1.</span>
                  <span>The leading global travel retailer reports <span className="font-semibold text-slate-800">2.5B passengers</span> exposed across <span className="font-semibold">350+ airports</span></span>
                </div>
                <div className="flex items-start gap-2">
                  <span className="text-slate-400 w-5 flex-shrink-0">2.</span>
                  <span>Implied ratio ≈ <span className="font-semibold text-slate-800">7.1M passengers / airport</span></span>
                </div>
                <div className="flex items-start gap-2">
                  <span className="text-slate-400 w-5 flex-shrink-0">3.</span>
                  <span>LTR's <span className="font-semibold text-slate-800">290+ airports</span> × 7.1M ≈ <span className="font-bold text-blue-700">~{(LTR_PAX_EXPOSED_EST / 1000).toFixed(1)}B exposed</span></span>
                </div>
              </div>
              <div className="text-slate-400 text-xs mt-3">
                Source: <a href={LTR_FOOTPRINT} target="_blank" rel="noopener noreferrer" className={linkCls}>LTR footprint (lagardere.com)</a>.{" "}
                LTR does not publish a network passenger-reach figure; estimate derived from industry benchmarks.
              </div>
            </div>
            <div className="flex flex-col gap-4">
              <div className="bg-slate-50 border border-slate-200 rounded-2xl p-5">
                <h3 className="text-slate-800 font-semibold text-sm mb-3">Traditional Airport Retail Failure Points</h3>
                <ul className="space-y-2">
                  {[
                    "Activation starts only after the traveller clears security",
                    "No financial reason for a non-intending buyer to enter a store",
                    "Travel & Corporate Partners hold the early relationship — but get zero retail participation",
                    "73% of LTR-exposed passengers walk straight to the gate",
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
              Activate the Traveller <span className="text-blue-600">Days, Weeks</span><br /><span className="text-blue-600">or even Months</span> Before Airport Arrival
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
              "Spends €20 → Saves €1.00",
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
          <div className="bg-gradient-to-r from-blue-50 to-indigo-50 border border-blue-200 rounded-2xl p-6 mb-4">
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
          <div className="bg-amber-50 border border-amber-200 rounded-2xl p-4">
            <div className="flex items-start gap-3">
              <RefreshCw className="w-5 h-5 text-amber-600 flex-shrink-0 mt-0.5" />
              <p className="text-slate-700 text-sm leading-relaxed">
                <span className="font-bold">Single-use, infinitely renewable.</span> A DutyCredit can't be reused — but travellers can get one from a Travel or Corporate Partner and generate as many more as they need for other participating stores. One DutyCredit for cosmetics, another for electronics, another at the giftshop for a souvenir. Same traveller, different stores, everyone wins.
              </p>
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
            <span className="text-blue-600 text-sm font-semibold uppercase tracking-widest">The Schiphol Opportunity</span>
            <h2 className="text-xl md:text-3xl font-heading font-bold text-[#0a0f1e] mt-2">
              Small Conversion Gains = <span className="text-blue-600">Enormous Value at Schiphol</span>
            </h2>
            <p className="text-slate-500 mt-1 text-sm">
              Schiphol's ~68.8M passengers flow through LTR's exclusive Duty Free JV. ~73% never purchase — DutyBoost activates them before arrival.
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-5">
            <div className="bg-red-50 border border-red-200 rounded-2xl p-6">
              <div className="flex items-center gap-4">
                <div>
                  <div className="text-3xl md:text-5xl font-bold text-red-600">~{SCHIPHOL_NON_PURCHASE.toFixed(1)}M</div>
                  <div className="text-slate-600 font-semibold text-sm mt-1">Non-purchasing passengers</div>
                  <div className="text-slate-400 text-xs mt-1">73% of Schiphol's 68.8M pax</div>
                </div>
                <div className="flex-1 text-right">
                  <div className="text-3xl md:text-5xl font-bold text-green-600">~{SCHIPHOL_CONVERTERS.toFixed(1)}M</div>
                  <div className="text-slate-600 font-semibold text-sm mt-1">Today's converting base</div>
                  <div className="text-slate-400 text-xs mt-1">the ~27% who currently buy</div>
                </div>
              </div>
              <div className="mt-3 pt-3 border-t border-red-200/60 text-slate-500 text-xs">
                Schiphol passengers: <a href={ACI_BUSY} target="_blank" rel="noopener noreferrer" className={linkCls}>ACI World</a>. 73/27 ratio:{" "}
                <a href={M1NDSET_LINK} target="_blank" rel="noopener noreferrer" className={linkCls}>m1nd-set</a> /{" "}
                <a href={TFWA_LINK} target="_blank" rel="noopener noreferrer" className={linkCls}>TFWA</a>.
              </div>
            </div>
            <div className="bg-blue-50 border border-blue-200 rounded-2xl p-6">
              <h3 className="font-bold text-blue-800 mb-2">Each +1pp of Conversion</h3>
              <div className="text-3xl md:text-4xl font-bold text-blue-700">~{(SCHIPHOL_PAX * 0.01 * 1000).toFixed(0)}K</div>
              <div className="text-slate-600 text-sm mt-1">additional purchasing travellers at Schiphol</div>
              <div className="text-green-600 font-bold text-xl mt-3">{fmtM(SCHIPHOL_UPLIFT_1PP)}</div>
              <div className="text-slate-600 text-sm">incremental retail value (illustrative, €20 Entry-tier basket)</div>
              <div className="text-slate-400 text-xs mt-3">1pp = 1% of Schiphol's 68.8M passengers converting at the model's qualifying basket.</div>
            </div>
          </div>
          <div className="bg-gradient-to-br from-blue-600 to-indigo-700 rounded-2xl p-5 text-white">
            <div className="text-sm font-semibold opacity-80 mb-1">The Core Question</div>
            <p className="text-lg font-bold leading-snug">
              "Is earning €18.50 from an incremental €20 retail sale — without any upfront acquisition cost — more valuable than earning €0 from a Schiphol traveller who otherwise wouldn't have converted?"
            </p>
            <p className="text-sm mt-2 opacity-80">Yes. Every time. And Schiphol's 20+ duty-free stores make the scale extraordinary.</p>
          </div>
        </div>
      </div>
    </SlideWrapper>
  );
}

// SLIDE 7: Lagardère Network — key airports + LTR store counts
export function SlideLagardereNetwork() {
  return (
    <SlideWrapper>
      <div className="flex-1 flex flex-col justify-center px-5 py-6 md:px-12 md:py-6 relative">
        <GridBg />
        <div className="relative z-10">
          <div className="mb-5">
            <span className="text-blue-600 text-sm font-semibold uppercase tracking-widest">Amsterdam Schiphol — Lagardère's Flagship</span>
            <h2 className="text-xl md:text-3xl font-heading font-bold text-[#0a0f1e] mt-2">
              Lagardère Operates Schiphol's <span className="text-blue-600">Entire Duty Free Layer</span>
            </h2>
            <p className="text-slate-500 mt-1 text-sm">
              Schiphol is where the value story begins. Sources:{" "}
              <a href={LTR_SITE} target="_blank" rel="noopener noreferrer" className={linkCls}>lagardere-tr.com</a>{" · "}
              <a href={TODAY_DUTY_FREE} target="_blank" rel="noopener noreferrer" className={linkCls}>Today Duty Free opening</a>.
            </p>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-5">
            {[
              { val: "Exclusive", label: "Duty Free Operator", note: "Lagardère at Schiphol" },
              { val: "20+", label: "Duty-Free Stores", note: "Behind security" },
              { val: "68.8M", label: "Annual Passengers", note: "ACI 2024/2025" },
              { val: "May 2025", label: "Today Duty Free", note: "Schiphol's largest shop" },
            ].map((s) => (
              <div key={s.label} className="bg-blue-50 border border-blue-200 rounded-2xl p-5 text-center">
                <div className="text-2xl md:text-3xl font-bold text-blue-700">{s.val}</div>
                <div className="text-slate-600 font-semibold text-sm mt-1">{s.label}</div>
                <div className="text-slate-400 text-xs mt-1">{s.note}</div>
              </div>
            ))}
          </div>
          <div className="bg-gradient-to-br from-blue-600 to-indigo-700 rounded-2xl p-5 text-white">
            <div className="flex items-center gap-2 mb-2">
              <MapPin className="w-5 h-5" />
              <h3 className="font-bold">One Operator. One Activation Point. Immediate Reach.</h3>
            </div>
            <p className="text-blue-50 text-sm leading-relaxed">
              Lagardère already operates Schiphol's duty-free layer — including the flagship <em>Today Duty Free</em>. DutyBoost flows through that existing POS infrastructure: a single activation reaches every participating store behind security, with zero upfront cost to Lagardère.
            </p>
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
                <h3 className="font-bold text-green-900 mb-2">At 1 Million €20 Transactions:</h3>
                <div className="grid grid-cols-1 gap-1.5 text-sm">
                  {[
                    { party: "Retailers", val: "€18.5M net before costs" },
                    { party: "Travellers", val: "€1M in savings" },
                    { party: "Travel & Corporate Partners", val: "€100,000 ancillary revenue" },
                    { party: "POS Partners", val: "€50,000 transaction revenue" },
                    { party: "DutyBoost", val: "€350,000 infrastructure revenue" },
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

// SLIDE 8b: Transaction Mix — Tier Economics
export function SlideTierMix() {
  return <TierMixSlide currency="€" />;
}

// SLIDE 9: Transaction Economics — Five Beneficiaries
export function SlideTransaction() {
  const parties = [
    { party: "Traveller", Icon: TravelerIcon, value: "€1.00", sub: "DutyCredit saving (5%)", color: "green", bg: "bg-green-50", border: "border-green-200" },
    { party: "Airport Retailer", Icon: AirportRetailerIcon, value: "€18.50", sub: "Net before normal costs (92.5%)", color: "blue", bg: "bg-blue-50", border: "border-blue-200" },
    { party: "Travel & Corporate Partner", Icon: Briefcase, value: "€0.10", sub: "Ancillary revenue (0.5%)", color: "yellow", bg: "bg-yellow-50", border: "border-yellow-200" },
    { party: "POS Partner", Icon: Cpu, value: "€0.05", sub: "Transaction revenue (0.25%)", color: "purple", bg: "bg-purple-50", border: "border-purple-200" },
    { party: "DutyBoost", Icon: BarChart3, value: "€0.35", sub: "Infrastructure revenue (1.75%)", color: "orange", bg: "bg-orange-50", border: "border-orange-200" },
  ];
  return (
    <SlideWrapper>
      <div className="flex-1 flex flex-col justify-center px-5 py-6 md:px-12 md:py-6 relative">
        <GridBg />
        <div className="relative z-10">
          <div className="mb-6">
            <span className="text-blue-600 text-sm font-semibold uppercase tracking-widest">One Transaction — Five Beneficiaries</span>
            <h2 className="text-xl md:text-3xl font-heading font-bold text-[#0a0f1e] mt-2">€20 Entry-Tier Qualifying Sale Example</h2>
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
              <div className="text-slate-500 text-xs uppercase tracking-wide mb-2">Total = €20.00</div>
              <div className="flex h-6 rounded-full overflow-hidden gap-px">
                <div className="bg-green-500" style={{ width: "5%" }} title="Traveller 5%" />
                <div className="bg-blue-500" style={{ width: "92.5%" }} title="Retailer 92.5%" />
                <div className="bg-yellow-500" style={{ width: "0.5%" }} />
                <div className="bg-purple-500" style={{ width: "0.25%" }} />
                <div className="bg-orange-500" style={{ width: "1.75%" }} />
              </div>
              <div className="flex gap-3 mt-2 text-xs flex-wrap">
                {[
                  { color: "bg-green-500", label: "Traveller 5%" },
                  { color: "bg-blue-500", label: "Retailer 92.5%" },
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

// SLIDE 10: Lagardère Revenue Potential — scenario table across the LTR network
export function SlideLagardereRevenue() {
  const scenarios = [
    { pp: "+0.1pp", retail: SCHIPHOL_UPLIFT_1PP * 0.1, net: SCHIPHOL_UPLIFT_1PP * 0.1 * RETAILER_NET },
    { pp: "+0.5pp", retail: SCHIPHOL_UPLIFT_1PP * 0.5, net: SCHIPHOL_UPLIFT_1PP * 0.5 * RETAILER_NET },
    { pp: "+1pp", retail: SCHIPHOL_UPLIFT_1PP, net: SCHIPHOL_UPLIFT_1PP * RETAILER_NET },
    { pp: "+2pp", retail: SCHIPHOL_UPLIFT_1PP * 2, net: SCHIPHOL_UPLIFT_1PP * 2 * RETAILER_NET },
    { pp: "+5pp", retail: SCHIPHOL_UPLIFT_1PP * 5, net: SCHIPHOL_UPLIFT_1PP * 5 * RETAILER_NET },
  ];
  return (
    <SlideWrapper>
      <div className="flex-1 flex flex-col justify-center px-5 py-6 md:px-12 md:py-6 relative">
        <GridBg />
        <div className="relative z-10">
          <div className="mb-5">
            <span className="text-blue-600 text-sm font-semibold uppercase tracking-widest">Schiphol Revenue Potential</span>
            <h2 className="text-xl md:text-3xl font-heading font-bold text-[#0a0f1e] mt-2">
              Incremental Retail Value <span className="text-blue-600">at Schiphol</span>
            </h2>
            <p className="text-slate-500 mt-1 text-sm">
              Based on Schiphol's ~68.8M passengers. Each +1pp ≈ ~688K new purchasing travellers — value shown at the model's €20 Entry-tier illustrative basket, retailer net at 92.5%.
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-5 gap-3 mb-5">
            {scenarios.map((s, i) => (
              <div key={s.pp} className={`bg-blue-50 border border-blue-200 rounded-2xl p-4 text-center ${i === 2 ? "ring-2 ring-blue-500" : ""}`}>
                <div className="text-xs font-semibold text-blue-600 uppercase tracking-wide mb-2">{s.pp} conversion</div>
                <div className="text-slate-400 text-xs mb-1">incremental retail value</div>
                <div className="text-lg font-bold text-slate-700 mb-3">{fmtM(s.retail)}</div>
                <div className="text-2xl md:text-3xl font-bold text-blue-700 mb-1">{fmtM(s.net)}</div>
                <div className="text-blue-600 text-xs font-medium">retailer net (92.5%)</div>
              </div>
            ))}
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            <div className="bg-slate-50 border border-slate-200 rounded-2xl p-5">
              <h3 className="font-bold text-[#0a0f1e] mb-3">Why This Is Pure Upside for Lagardère</h3>
              <ul className="space-y-2 text-sm">
                {[
                  "100% incremental — from Schiphol travellers who otherwise wouldn't buy",
                  "Zero upfront cost — pay only the 2.5% fee on validated sales and 10% traveller discount",
                  "No change to existing POS, pricing or merchandising",
                  "Attributed & reported transparently per transaction",
                  "Scales instantly across Schiphol's 20+ duty-free stores behind security",
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
                  <span className="text-slate-600">Schiphol converting base (~27% of 68.8M)</span>
                  <span className="font-bold text-blue-700">~{SCHIPHOL_CONVERTERS.toFixed(1)}M</span>
                </div>
                <div className="flex justify-between items-center py-1.5 px-3 rounded-lg bg-red-50 border border-red-100">
                  <span className="text-slate-600">Non-purchasing headroom (73%)</span>
                  <span className="font-bold text-red-600">~{SCHIPHOL_NON_PURCHASE.toFixed(1)}M</span>
                </div>
                <div className="flex justify-between items-center py-1.5 px-3 rounded-lg bg-blue-100 border border-blue-200 font-semibold">
                  <span className="text-slate-700">Each +1pp brings ~688K new converters</span>
                  <span className="font-bold text-blue-700">{fmtM(SCHIPHOL_UPLIFT_1PP)}</span>
                </div>
              </div>
              <div className="text-slate-400 text-xs mt-3">Passengers: ACI World. Conversion maths grounded in Schiphol's passenger base and the 73/27 ratio (m1nd-set / TFWA). € value illustrative, at the model's €20 Entry-tier basket.</div>
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
                  "Works across all stores, airports and markets on the same POS",
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
                DutyBoost is enabled by your POS provider as an activation feature — the same system you already use for checkout, inventory and payments. No separate integration required from the retailer.
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

// SLIDE 11b: Integration Effort — what the POS provider actually does
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
        "Confirm supported POS versions and Schiphol store footprint",
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
        "Flip the switch — all Schiphol duty-free stores go live instantly",
        "Zero downtime; no store-level reconfiguration required",
        "Rolls out to additional airports/markets on the same POS with no rework",
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
              What Lagardère's POS Provider <span className="text-blue-600">Actually Needs to Do</span>
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
                The entire integration is a single API call — one request with the validated transaction, one response with the discount and settlement. One engineering stream builds it once, then every connected Schiphol store is live.
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
              <span className="text-blue-600">Who Never Buy — at Schiphol</span>
            </h1>
            <p className="text-lg md:text-xl text-slate-500 max-w-3xl leading-relaxed">
              A proven, performance-based revenue layer — activated through Lagardère's existing POS infrastructure at Schiphol.
            </p>
          </div>
          <div className="grid grid-cols-3 gap-2 sm:gap-6 mt-4 w-full max-w-2xl">
            {[
              { label: "Duty-Free Stores", value: "20+" },
              { label: "Schiphol Passengers", value: "68.8M" },
              { label: "Upfront Cost", value: "€0" },
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