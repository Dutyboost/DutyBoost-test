import { useState, useEffect, useRef, Fragment } from "react";
import { Link } from "react-router-dom";
import { ChevronLeft, ChevronRight, ArrowRight, Building2, TrendingUp, DollarSign, Percent, CheckCircle, XCircle, AlertCircle, BarChart3, Layers, Plane, Store, Factory } from "lucide-react";
import DutyBoostLogo from "@/components/DutyBoostLogo";
import TravelerIcon from "@/components/TravelerIcon";
import TravelAgencyIcon from "@/components/TravelAgencyIcon";
import AirportRetailerIcon from "@/components/AirportRetailerIcon";

const ACI_NA_LINK = "https://airportscouncil.org/wp-content/uploads/2019/06/2019-ACI-NA-Concessions-Benchmarking-Summary.pdf";
const ATL_LINK = "https://www.atl.com/wp-content/uploads/2023/03/Concessions_Phase-II-Solicitations-Update_Presentation_v03132023.pdf";
const FRA_LINK = "https://b2b.frankfurt-airport.com/en/faq-b2b/faq-retail-requirements.html";
const SAC_LINK = "https://sacramento.aero/opportunities/concessions/concession-faqs";
const ACI_BLOG_LINK = "https://blog.aci.aero/airport-economics/airport-non-aeronautical-revenues-commercial-strategy/";

const SLIDES = [
  { id: "cover", type: "cover" },
  { id: "insight", type: "insight" },
  { id: "models", type: "models" },
  { id: "magExample", type: "magExample" },
  { id: "benchmarks", type: "benchmarks" },
  { id: "retailRevenue", type: "retailRevenue" },
  { id: "valueChain", type: "valueChain" },
  { id: "businessCase", type: "businessCase" },
  { id: "whyAirports", type: "whyAirports" },
  { id: "thankYou", type: "thankYou" },
];

const SLIDE_LABELS = {
  cover: "Cover",
  insight: "The Insight",
  models: "Concession Models",
  magExample: "MAG + Percentage",
  benchmarks: "Rate Benchmarks",
  retailRevenue: "Retail's Role",
  valueChain: "Value Chain",
  businessCase: "Business Case",
  whyAirports: "Why DutyBoost",
  thankYou: "Thank You",
};

function SlideWrapper({ children }) {
  return (
    <div className="w-full flex flex-col overflow-y-auto bg-white text-[#0a0f1e]">
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
            <DutyBoostLogo height={50} linkTo="/" />
          </div>
          <div>
            <h1 className="text-3xl md:text-5xl font-heading font-bold text-[#0a0f1e] leading-tight mb-4">
              Incremental Non-Aeronautical<br />
              <span className="text-blue-600">Revenue for Airports</span>
            </h1>
            <p className="text-xl text-slate-500 max-w-3xl leading-relaxed">
              A Presentation for Airport Authorities
            </p>
          </div>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 sm:gap-6 mt-4 w-full">
            {[
              { label: "Global Retail Share", value: "23.1%" },
              { label: "Europe Retail Share", value: "26.7%" },
              { label: "Concession Rates", value: "15–18.5%" },
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

// SLIDE 2: The Insight
function SlideInsight() {
  return (
    <SlideWrapper>
      <div className="flex-1 flex flex-col justify-center px-5 py-6 md:px-12 md:py-6 relative">
        <GridBg />
        <div className="relative z-10">
          <div className="mb-5">
            <span className="text-blue-600 text-sm font-semibold uppercase tracking-widest">The Insight</span>
            <h2 className="text-xl md:text-3xl font-heading font-bold text-[#0a0f1e] mt-2">
              Airports Don't Just Lease Space.<br />
              <span className="text-blue-600">They Participate in Retail Sales.</span>
            </h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            <div className="space-y-4">
              <div className="bg-slate-50 border border-slate-200 rounded-2xl p-6">
                <Building2 className="w-10 h-10 text-blue-600 mb-3" />
                <h3 className="text-slate-800 font-semibold text-lg mb-2">The Concession Model</h3>
                <p className="text-slate-600 text-sm leading-relaxed">
                  Airport retail space is treated as a <strong>concession</strong>, not a standard lease. The airport participates directly in the retailer's sales performance.
                </p>
              </div>
              <div className="bg-blue-600 text-white rounded-2xl p-6">
                <div className="text-sm font-semibold opacity-80 mb-2">The Core Formula</div>
                <p className="text-lg font-bold leading-snug">
                  Airport payment = the greater of the Minimum Annual Guarantee (MAG) <span className="text-blue-200">OR</span> an agreed percentage of gross sales.
                </p>
              </div>
              <div className="bg-slate-50 border border-slate-200 rounded-2xl p-5">
                <div className="text-slate-700 text-sm leading-relaxed">
                  DFW concessionaires pay a percentage of gross sales each month, subject to a predetermined MAG. LAX uses the same <strong>"greater of percentage of gross sales or MAG"</strong> structure.
                </div>
              </div>
            </div>
            <div className="flex flex-col gap-4 justify-center">
              <div className="bg-amber-50 border border-amber-200 rounded-2xl p-6">
                <h3 className="text-slate-800 font-semibold text-lg mb-3">What This Means</h3>
                <ul className="space-y-3">
                  {[
                    "When DutyBoost increases airport retail sales, the percentage-based concession revenue can increase too",
                    "Once sales push past the MAG threshold, every additional transaction creates incremental airport revenue",
                    "The airport becomes a direct beneficiary of DutyBoost's conversion uplift — not just the retailer",
                    "No subsidy required from the airport; DutyBoost grows the underlying sales base",
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
                  "DutyBoost doesn't need the airport to subsidize the incentive. It can increase the underlying retail sales on which airport concession payments are calculated."
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </SlideWrapper>
  );
}

// SLIDE 3: Concession Models
function SlideModels() {
  const models = [
    { name: "1. Fixed rent", how: "Retailer pays fixed amount for the space", benefits: false },
    { name: "2. Rent per m² / sq. ft.", how: "Fixed amount based on store size", benefits: false },
    { name: "3. Percentage of sales", how: "Airport receives X% of gross retail sales", benefits: true, note: "Yes, directly" },
    { name: "4. MAG", how: "Retailer guarantees a minimum amount annually", benefits: "partial", note: "Only after sales push rent above MAG" },
    { name: "5. MAG OR % of sales", how: "Retailer pays whichever is higher", benefits: true, note: "Yes, once % exceeds MAG" },
    { name: "6. Base rent + % of sales", how: "Fixed rent plus a concession percentage", benefits: true, note: "Yes" },
    { name: "7. Tiered % of sales", how: "Percentage changes at sales thresholds", benefits: true, note: "Yes, potentially even more" },
    { name: "8. Passenger-based guarantee", how: "Minimum payment linked to passenger volumes", benefits: "partial", note: "Indirectly" },
    { name: "9. Category-based %", how: "Different percentages for liquor, cosmetics, fashion, etc.", benefits: true, note: "Yes" },
  ];

  const BenefitIcon = ({ val }) => {
    if (val === true) return <CheckCircle className="w-5 h-5 text-green-600 mx-auto" />;
    if (val === false) return <XCircle className="w-5 h-5 text-red-400 mx-auto" />;
    return <AlertCircle className="w-5 h-5 text-amber-500 mx-auto" />;
  };

  return (
    <SlideWrapper>
      <div className="flex-1 flex flex-col justify-center px-5 py-6 md:px-12 md:py-6 relative">
        <GridBg />
        <div className="relative z-10">
          <div className="mb-4">
            <span className="text-blue-600 text-sm font-semibold uppercase tracking-widest">Concession Models</span>
            <h2 className="text-xl md:text-3xl font-heading font-bold text-[#0a0f1e] mt-2">
              Nine Airport Retail Models — <span className="text-blue-600">Which Benefit from DutyBoost?</span>
            </h2>
            <p className="text-slate-500 mt-1 text-sm">Most revenue-based concession structures create a direct alignment: when DutyBoost increases retail sales, the airport earns more.</p>
          </div>
          <div className="overflow-hidden rounded-2xl border border-slate-200">
            <table className="w-full text-sm">
              <thead>
                <tr className="bg-slate-800 text-white">
                  <th className="text-left px-4 py-2.5 font-semibold">Model</th>
                  <th className="text-left px-4 py-2.5 font-semibold">How it works</th>
                  <th className="text-center px-4 py-2.5 font-semibold whitespace-nowrap">Airport benefits when<br />DutyBoost increases sales?</th>
                </tr>
              </thead>
              <tbody>
                {models.map((m, i) => (
                  <tr key={i} className={i % 2 === 0 ? "bg-white" : "bg-slate-50"}>
                    <td className="px-4 py-2 font-semibold text-slate-800 whitespace-nowrap">{m.name}</td>
                    <td className="px-4 py-2 text-slate-600">{m.how}</td>
                    <td className="px-4 py-2">
                      <div className="flex items-center justify-center gap-2">
                        <BenefitIcon val={m.benefits} />
                        {m.note && <span className="text-xs text-slate-500">{m.note}</span>}
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <div className="mt-4 bg-blue-50 border border-blue-200 rounded-2xl p-4">
            <p className="text-blue-800 text-sm leading-relaxed">
              <strong>Key takeaway:</strong> In models 3, 5, 6, 7, and 9 — the majority of airport concession structures — DutyBoost's conversion uplift directly increases the airport's concession revenue. Even in MAG-based models, incremental sales can push revenue above the guarantee threshold.
            </p>
          </div>
        </div>
      </div>
    </SlideWrapper>
  );
}

// SLIDE 4: MAG + Percentage Worked Example
function SlideMagExample() {
  return (
    <SlideWrapper>
      <div className="flex-1 flex flex-col justify-center px-5 py-6 md:px-12 md:py-6 relative">
        <GridBg />
        <div className="relative z-10">
          <div className="mb-5">
            <span className="text-blue-600 text-sm font-semibold uppercase tracking-widest">The MAG + Percentage Model</span>
            <h2 className="text-xl md:text-3xl font-heading font-bold text-[#0a0f1e] mt-2">
              A Worked Example: <span className="text-blue-600">How DutyBoost Lifts Airport Revenue</span>
            </h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-5">
            <div className="bg-slate-50 border border-slate-200 rounded-2xl p-5 text-center">
              <div className="text-2xl font-bold text-slate-800 mb-1">€1,000,000</div>
              <div className="text-slate-500 text-sm">Annual Minimum Annual Guarantee (MAG)</div>
            </div>
            <div className="bg-slate-50 border border-slate-200 rounded-2xl p-5 text-center">
              <div className="text-2xl font-bold text-slate-800 mb-1">18%</div>
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
                <h3 className="font-bold text-slate-800">Without DutyBoost: €5M Sales</h3>
              </div>
              <div className="space-y-2 text-sm">
                <div className="flex justify-between bg-white rounded-lg px-3 py-2 border border-slate-200">
                  <span className="text-slate-600">Gross sales</span>
                  <span className="font-semibold text-slate-800">€5,000,000</span>
                </div>
                <div className="flex justify-between bg-white rounded-lg px-3 py-2 border border-slate-200">
                  <span className="text-slate-600">18% of sales</span>
                  <span className="font-semibold text-slate-800">€900,000</span>
                </div>
                <div className="flex justify-between bg-red-100 rounded-lg px-3 py-2 border border-red-300">
                  <span className="text-slate-700 font-semibold">Airport receives</span>
                  <span className="font-bold text-red-700">€1,000,000</span>
                </div>
                <div className="text-xs text-slate-500 pt-1">
                  €900K is below the MAG, so the retailer pays the guaranteed €1M.
                </div>
              </div>
            </div>
            <div className="bg-green-50 border border-green-300 rounded-2xl p-5">
              <div className="flex items-center gap-2 mb-3">
                <CheckCircle className="w-5 h-5 text-green-600" />
                <h3 className="font-bold text-slate-800">With DutyBoost: €6M Sales</h3>
              </div>
              <div className="space-y-2 text-sm">
                <div className="flex justify-between bg-white rounded-lg px-3 py-2 border border-slate-200">
                  <span className="text-slate-600">Gross sales</span>
                  <span className="font-semibold text-slate-800">€6,000,000</span>
                </div>
                <div className="flex justify-between bg-white rounded-lg px-3 py-2 border border-slate-200">
                  <span className="text-slate-600">18% of sales</span>
                  <span className="font-semibold text-slate-800">€1,080,000</span>
                </div>
                <div className="flex justify-between bg-green-100 rounded-lg px-3 py-2 border border-green-300">
                  <span className="text-slate-700 font-semibold">Airport receives</span>
                  <span className="font-bold text-green-700">€1,080,000</span>
                </div>
                <div className="text-xs text-slate-500 pt-1">
                  €1.08M exceeds the MAG, so the airport receives the higher amount.
                </div>
              </div>
            </div>
          </div>
          <div className="mt-5 bg-gradient-to-br from-blue-600 to-indigo-700 rounded-2xl p-5 text-white">
            <div className="flex items-center gap-4">
              <TrendingUp className="w-10 h-10 flex-shrink-0" />
              <div>
                <p className="font-bold text-lg leading-snug">
                  +€80,000 incremental airport revenue from €1M in additional retail sales.
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

// SLIDE 5: Concession Rate Benchmarks
function SlideBenchmarks() {
  const benchmarks = [
    {
      source: "ACI North America",
      stat: "16.6%",
      desc: "News, Duty Free, Gift & Specialty Retail averaged 16.6% of gross sales in rent (vs. 12% for F&B)",
      link: ACI_NA_LINK,
      linkText: "(ACI NA)",
    },
    {
      source: "Atlanta Airport",
      stat: "15–18.5%",
      desc: "Published retail percentage-rent ranges in a concession solicitation package",
      link: ATL_LINK,
      linkText: "(ATL)",
    },
    {
      source: "Frankfurt Airport",
      stat: "Variable %",
      desc: "Percentage of sales based on location, concept and foot traffic, combined with a minimum monthly rent — not a fixed rate per m²",
      link: FRA_LINK,
      linkText: "(FRA)",
    },
    {
      source: "Sacramento County Airports",
      stat: "Tiered %",
      desc: "Percentages can be tiered — one rate on the first revenue band, a higher rate above it",
      link: SAC_LINK,
      linkText: "(SMF)",
    },
  ];

  return (
    <SlideWrapper>
      <div className="flex-1 flex flex-col justify-center px-5 py-6 md:px-12 md:py-6 relative">
        <GridBg />
        <div className="relative z-10">
          <div className="mb-5">
            <span className="text-blue-600 text-sm font-semibold uppercase tracking-widest">Concession Rate Benchmarks</span>
            <h2 className="text-xl md:text-3xl font-heading font-bold text-[#0a0f1e] mt-2">
              The Percentages Are <span className="text-blue-600">Substantial</span>
            </h2>
            <p className="text-slate-500 mt-1 text-sm">Airport concession rates typically range from 12% to 18.5% of gross retail sales — meaning DutyBoost's conversion uplift has a direct, measurable impact on airport revenue.</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-5">
            {benchmarks.map((b, i) => (
              <div key={i} className="bg-slate-50 border border-slate-200 rounded-2xl p-5">
                <div className="flex items-start justify-between mb-2">
                  <div className="text-blue-600 font-bold text-sm">{b.source}</div>
                  <div className="text-2xl font-bold text-blue-600">{b.stat}</div>
                </div>
                <p className="text-slate-600 text-sm leading-relaxed">
                  {b.desc}{" "}
                  <a href={b.link} target="_blank" rel="noopener noreferrer"
                    className="text-blue-600 font-bold underline decoration-blue-600/50 hover:decoration-blue-400 hover:text-blue-500 transition-colors">
                    {b.linkText}
                  </a>
                </p>
              </div>
            ))}
          </div>
          <div className="bg-gradient-to-br from-blue-600 to-indigo-700 rounded-2xl p-5 text-white">
            <div className="flex items-center gap-4">
              <Percent className="w-10 h-10 flex-shrink-0" />
              <p className="font-bold text-lg leading-snug">
                At an 18% concession rate, every €1M in incremental retail sales can generate up to €180,000 in additional airport concession revenue — subject to the retailer's MAG structure.
              </p>
            </div>
          </div>
        </div>
      </div>
    </SlideWrapper>
  );
}

// SLIDE 6: Retail's Role in Airport Revenue
function SlideRetailRevenue() {
  return (
    <SlideWrapper>
      <div className="flex-1 flex flex-col justify-center px-5 py-6 md:px-12 md:py-6 relative">
        <GridBg />
        <div className="relative z-10">
          <div className="mb-5">
            <span className="text-blue-600 text-sm font-semibold uppercase tracking-widest">Retail's Role in Airport Revenue</span>
            <h2 className="text-xl md:text-3xl font-heading font-bold text-[#0a0f1e] mt-2">
              Retail Is a <span className="text-blue-600">Major Revenue Pillar</span> for Airports
            </h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-5 mb-5">
            <div className="bg-blue-50 border border-blue-200 rounded-2xl p-6 text-center">
              <div className="text-4xl md:text-5xl font-bold text-blue-600 mb-2">23.1%</div>
              <div className="text-slate-800 font-semibold mb-1">of global airport non-aeronautical revenue</div>
              <div className="text-slate-500 text-sm mt-2">
                comes from retail concessions{" "}
                <a href={ACI_BLOG_LINK} target="_blank" rel="noopener noreferrer"
                  className="text-blue-600 font-bold underline decoration-blue-600/50 hover:decoration-blue-400 hover:text-blue-500 transition-colors">
                  (ACI)
                </a>
              </div>
            </div>
            <div className="bg-indigo-50 border border-indigo-200 rounded-2xl p-6 text-center">
              <div className="text-4xl md:text-5xl font-bold text-indigo-600 mb-2">26.7%</div>
              <div className="text-slate-800 font-semibold mb-1">of European airport non-aeronautical revenue</div>
              <div className="text-slate-500 text-sm mt-2">
                comes from retail{" "}
                <a href={ACI_BLOG_LINK} target="_blank" rel="noopener noreferrer"
                  className="text-blue-600 font-bold underline decoration-blue-600/50 hover:decoration-blue-400 hover:text-blue-500 transition-colors">
                  (ACI)
                </a>
              </div>
            </div>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            <div className="bg-slate-50 border border-slate-200 rounded-2xl p-5">
              <h3 className="font-bold text-slate-800 mb-3">Why This Matters</h3>
              <div className="space-y-2.5 text-sm">
                {[
                  "Retail is nearly a quarter of all non-aeronautical airport revenue globally",
                  "In Europe, it's over a quarter — the single largest commercial category",
                  "Airports actively seek ways to grow retail performance",
                  "DutyBoost directly grows the sales base that concession revenue is calculated on",
                ].map((item, i) => (
                  <div key={i} className="flex items-start gap-2">
                    <CheckCircle className="w-4 h-4 text-blue-600 flex-shrink-0 mt-0.5" />
                    <span className="text-slate-700">{item}</span>
                  </div>
                ))}
              </div>
            </div>
            <div className="bg-gradient-to-br from-blue-600 to-indigo-700 rounded-2xl p-5 text-white">
              <h3 className="font-bold mb-3">The Strategic Alignment</h3>
              <p className="text-blue-50 text-sm leading-relaxed">
                Airports invest heavily in commercial strategy to maximise non-aeronautical revenue. DutyBoost aligns perfectly with that goal — it converts existing passenger traffic into additional retail sales, growing the very revenue stream airports already prioritise.
              </p>
              <div className="mt-3 bg-white/10 rounded-xl p-3">
                <p className="text-white font-semibold text-sm">
                  More retail sales → higher concession revenue → stronger non-aeronautical performance for the airport.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </SlideWrapper>
  );
}

// SLIDE 7: Extended Value Chain
function SlideValueChain() {
  const chain = [
    { Icon: TravelAgencyIcon, label: "Travel Partner", desc: "Distributes DutyCredit", color: "blue" },
    { Icon: TravelerIcon, label: "Traveller", desc: "Activated before arrival", color: "violet" },
    { Icon: AirportRetailerIcon, label: "Airport Retailer", desc: "Captures incremental sale", color: "green" },
    { Icon: Factory, label: "Supplier", desc: "Faster stock rotation", color: "amber" },
    { Icon: Plane, label: "Airport", desc: "Incremental concession revenue", color: "indigo" },
  ];

  return (
    <SlideWrapper>
      <div className="flex-1 flex flex-col justify-center px-5 py-6 md:px-12 md:py-6 relative">
        <GridBg />
        <div className="relative z-10">
          <div className="mb-5 text-center">
            <span className="text-blue-600 text-sm font-semibold uppercase tracking-widest">The Extended Value Chain</span>
            <h2 className="text-xl md:text-3xl font-heading font-bold text-[#0a0f1e] mt-2">
              The Airport Is a <span className="text-blue-600">Fifth Participant</span>
            </h2>
            <p className="text-slate-500 mt-2 max-w-3xl mx-auto text-sm">
              DutyBoost doesn't only create revenue for the retailer, POS partner, supplier and travel partner. When the retailer's concession is revenue-based, DutyBoost creates incremental non-aeronautical revenue for the airport itself.
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
                    <ArrowRight className="text-blue-400 w-5 h-5" />
                  </div>
                )}
              </Fragment>
            ))}
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="bg-slate-50 border border-slate-200 rounded-2xl p-5">
              <h3 className="font-bold text-slate-800 mb-3">The Full Chain Benefits</h3>
              <div className="space-y-2 text-sm">
                {[
                  { who: "Travel Partner", what: "earns ancillary revenue on every transaction" },
                  { who: "Traveller", what: "saves on airport purchases via DutyCredit" },
                  { who: "Retailer", what: "captures incremental sales from non-purchasing traffic" },
                  { who: "Supplier", what: "benefits from faster stock rotation and reorders" },
                  { who: "Airport", what: "earns incremental concession revenue above the MAG" },
                ].map((row, i) => (
                  <div key={i} className="flex items-start gap-2">
                    <CheckCircle className="w-4 h-4 text-blue-600 flex-shrink-0 mt-0.5" />
                    <span className="text-slate-700"><strong className="text-blue-700">{row.who}</strong> {row.what}</span>
                  </div>
                ))}
              </div>
            </div>
            <div className="bg-gradient-to-br from-blue-600 to-indigo-700 rounded-2xl p-5 text-white">
              <h3 className="font-bold mb-2">A Stronger Pitch</h3>
              <p className="text-blue-50 text-sm leading-relaxed mb-2">
                By including the airport in the value chain, DutyBoost's proposition extends beyond retail conversion. It becomes a tool for growing the airport's own non-aeronautical revenue base — without any capital investment or subsidy from the airport.
              </p>
              <div className="bg-white/10 rounded-xl p-3">
                <p className="text-white font-semibold text-sm">
                  Travel Partner → Traveller → Airport Retailer → Supplier → Airport
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </SlideWrapper>
  );
}

// SLIDE 8: The Business Case
function SlideBusinessCase() {
  return (
    <SlideWrapper>
      <div className="flex-1 flex flex-col justify-center px-5 py-6 md:px-12 md:py-6 relative">
        <GridBg />
        <div className="relative z-10">
          <div className="mb-5">
            <span className="text-blue-600 text-sm font-semibold uppercase tracking-widest">The Business Case</span>
            <h2 className="text-xl md:text-3xl font-heading font-bold text-[#0a0f1e] mt-2">
              €10M in Incremental Sales <span className="text-blue-600">→ €1.8M for the Airport</span>
            </h2>
            <p className="text-slate-500 mt-1 text-sm">A conservative illustrative scenario showing the potential airport concession uplift from DutyBoost-driven conversion.</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-5">
            <div className="bg-slate-50 border border-slate-200 rounded-2xl p-5 text-center">
              <DollarSign className="w-8 h-8 text-blue-600 mx-auto mb-2" />
              <div className="text-2xl font-bold text-slate-800 mb-1">€10,000,000</div>
              <div className="text-slate-500 text-sm">Incremental airport retail sales generated by DutyBoost</div>
            </div>
            <div className="bg-slate-50 border border-slate-200 rounded-2xl p-5 text-center">
              <Percent className="w-8 h-8 text-blue-600 mx-auto mb-2" />
              <div className="text-2xl font-bold text-slate-800 mb-1">18%</div>
              <div className="text-slate-500 text-sm">Applicable concession rate (benchmark range: 15–18.5%)</div>
            </div>
            <div className="bg-blue-50 border border-blue-300 rounded-2xl p-5 text-center">
              <TrendingUp className="w-8 h-8 text-blue-600 mx-auto mb-2" />
              <div className="text-2xl font-bold text-blue-600 mb-1">€1,800,000</div>
              <div className="text-slate-500 text-sm">Potential additional concession revenue for the airport</div>
            </div>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            <div className="bg-slate-50 border border-slate-200 rounded-2xl p-5">
              <h3 className="font-bold text-slate-800 mb-3">How It Works</h3>
              <div className="space-y-3 text-sm">
                <div className="bg-white rounded-lg px-3 py-2 border border-slate-200 flex justify-between">
                  <span className="text-slate-600">DutyBoost generates incremental retail sales</span>
                  <span className="font-semibold text-slate-800">€10M</span>
                </div>
                <div className="flex justify-center"><ArrowRight className="text-blue-400 w-5 h-5 rotate-90" /></div>
                <div className="bg-white rounded-lg px-3 py-2 border border-slate-200 flex justify-between">
                  <span className="text-slate-600">Concession rate applies to gross sales</span>
                  <span className="font-semibold text-slate-800">18%</span>
                </div>
                <div className="flex justify-center"><ArrowRight className="text-blue-400 w-5 h-5 rotate-90" /></div>
                <div className="bg-blue-100 rounded-lg px-3 py-2 border border-blue-300 flex justify-between">
                  <span className="text-slate-700 font-semibold">Additional airport concession revenue</span>
                  <span className="font-bold text-blue-700">€1.8M</span>
                </div>
              </div>
              <div className="text-xs text-slate-400 mt-3 leading-relaxed">
                Subject to the retailer's actual lease/MAG structure. Where the percentage calculation already exceeds the MAG, the full uplift applies. Where it doesn't, uplift applies once sales push past the MAG threshold.
              </div>
            </div>
            <div className="bg-gradient-to-br from-blue-600 to-indigo-700 rounded-2xl p-5 text-white">
              <h3 className="font-bold mb-3">Why This Is Compelling</h3>
              <div className="space-y-2.5 text-sm">
                {[
                  "No capital investment required from the airport",
                  "No operational change to existing concession agreements",
                  "Works within the airport's current concession framework",
                  "Grows the revenue base that concession payments are calculated on",
                  "Aligns with airport commercial strategy objectives",
                ].map((item, i) => (
                  <div key={i} className="flex items-start gap-2">
                    <CheckCircle className="w-4 h-4 text-blue-200 flex-shrink-0 mt-0.5" />
                    <span className="text-blue-50">{item}</span>
                  </div>
                ))}
              </div>
              <div className="mt-3 bg-white/10 rounded-xl p-3">
                <p className="text-white font-semibold text-sm">
                  DutyBoost doesn't ask the airport to subsidise the incentive — it grows the sales the airport already earns from.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </SlideWrapper>
  );
}

// SLIDE 9: Why DutyBoost for Airports
function SlideWhyAirports() {
  return (
    <SlideWrapper>
      <div className="flex-1 flex flex-col justify-center px-5 py-6 md:px-12 md:py-6 relative">
        <GridBg />
        <div className="relative z-10">
          <div className="mb-5 text-center">
            <span className="text-blue-600 text-sm font-semibold uppercase tracking-widest">Why DutyBoost for Airports</span>
            <h2 className="text-xl md:text-3xl font-heading font-bold text-[#0a0f1e] mt-2">
              Growing Non-Aeronautical Revenue <span className="text-blue-600">Without Subsidy</span>
            </h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-5">
            <div className="bg-slate-50 border border-slate-200 rounded-2xl p-5">
              <Layers className="w-8 h-8 text-blue-600 mb-3" />
              <h3 className="font-bold text-slate-800 mb-2">No Subsidy Required</h3>
              <p className="text-slate-600 text-sm leading-relaxed">
                DutyBoost doesn't need the airport to fund or subsidise the traveller incentive. The incentive is funded through the transaction itself — the airport simply benefits from the increased sales base.
              </p>
            </div>
            <div className="bg-blue-50 border border-blue-200 rounded-2xl p-5">
              <BarChart3 className="w-8 h-8 text-blue-600 mb-3" />
              <h3 className="font-bold text-slate-800 mb-2">Grows Existing Revenue</h3>
              <p className="text-slate-600 text-sm leading-relaxed">
                DutyBoost increases the underlying retail sales on which concession payments are calculated. The airport earns more from the same retailers, same space, same agreements.
              </p>
            </div>
            <div className="bg-green-50 border border-green-200 rounded-2xl p-5">
              <CheckCircle className="w-8 h-8 text-green-600 mb-3" />
              <h3 className="font-bold text-slate-800 mb-2">Works Within Current Structures</h3>
              <p className="text-slate-600 text-sm leading-relaxed">
                No changes to existing concession agreements. DutyBoost operates alongside percentage-of-sales, MAG, tiered and category-based models — growing revenue within the frameworks already in place.
              </p>
            </div>
            <div className="bg-amber-50 border border-amber-200 rounded-2xl p-5">
              <DollarSign className="w-8 h-8 text-amber-600 mb-3" />
              <h3 className="font-bold text-slate-800 mb-2">Performance-Based</h3>
              <p className="text-slate-600 text-sm leading-relaxed">
                Zero upfront cost. The airport only benefits when DutyBoost generates incremental sales — a fully aligned, performance-based model with no financial risk to the airport.
              </p>
            </div>
          </div>
          <div className="bg-gradient-to-br from-blue-600 to-indigo-700 rounded-2xl p-5 text-white">
            <div className="flex items-center gap-4">
              <Plane className="w-10 h-10 flex-shrink-0" />
              <div>
                <p className="font-bold text-lg leading-snug">
                  DutyBoost turns existing passenger traffic into incremental non-aeronautical revenue.
                </p>
                <p className="text-blue-100 text-sm mt-1">
                  No new infrastructure. No subsidy. No risk. Just more sales on which the airport already earns.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </SlideWrapper>
  );
}

// SLIDE 10: Thank You
function SlideThankYou() {
  return (
    <SlideWrapper>
      <div className="flex-1 flex flex-col justify-center px-5 py-6 md:px-12 md:py-6 relative">
        <GridBg />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] rounded-full opacity-10"
          style={{ background: "radial-gradient(circle, #3b82f6 0%, transparent 70%)" }} />
        <div className="relative z-10 flex flex-col items-center text-center">
          <div className="bg-white rounded-2xl px-8 py-4 shadow-2xl border border-slate-200 mb-6">
            <DutyBoostLogo height={48} linkTo="/" />
          </div>
          <div className="mb-4">
            <span className="text-blue-600 text-sm font-semibold uppercase tracking-widest">Thank You</span>
            <h2 className="text-2xl md:text-4xl lg:text-5xl font-heading font-bold text-[#0a0f1e] mt-2 leading-tight">
              Grow Your Airport's<br />
              <span className="text-blue-600">Non-Aeronautical Revenue.</span>
            </h2>
          </div>
          <p className="text-slate-600 text-sm md:text-base lg:text-lg max-w-3xl leading-relaxed mb-6">
            DutyBoost connects what already exists — your passengers, your retailers, and your concession agreements. By converting non-purchasing traffic into incremental retail sales, DutyBoost grows the revenue base your airport already earns from — without subsidy, without risk, and without changing a single concession contract.
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 max-w-3xl w-full mb-6">
            {[
              { Icon: TrendingUp, title: "More Retail Sales", desc: "Converting non-purchasing passengers into buyers at your airport's stores." },
              { Icon: DollarSign, title: "More Concession Revenue", desc: "Higher gross sales → higher percentage-based concession payments to the airport." },
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
              Ready to turn your passenger traffic into incremental concession revenue?
            </p>
            <p className="text-blue-50 text-sm">
              Let's discuss how DutyBoost can grow your airport's non-aeronautical revenue within your existing concession framework.
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

const SLIDE_COMPONENTS = {
  cover: SlideCover,
  insight: SlideInsight,
  models: SlideModels,
  magExample: SlideMagExample,
  benchmarks: SlideBenchmarks,
  retailRevenue: SlideRetailRevenue,
  valueChain: SlideValueChain,
  businessCase: SlideBusinessCase,
  whyAirports: SlideWhyAirports,
  thankYou: SlideThankYou,
};

export default function AirportPitchDeck() {
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
          DutyBoost — Airport Presentation 2026 <span className="text-xs opacity-50 ml-2 hidden sm:inline">CONFIDENTIAL</span>
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