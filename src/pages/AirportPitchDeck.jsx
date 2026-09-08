import { useState, useEffect, useRef, Fragment } from "react";
import { Link } from "react-router-dom";
import { ChevronLeft, ChevronRight, ArrowRight, Building2, TrendingUp, DollarSign, Percent, CheckCircle, XCircle, BarChart3, Layers, Plane, RefreshCw, ShoppingCart, Store, Megaphone, Smartphone, MapPin, Award, Mail, Monitor } from "lucide-react";
import DutyBoostLogo from "@/components/DutyBoostLogo";
import TravelerIcon from "@/components/TravelerIcon";
import TravelAgencyIcon from "@/components/TravelAgencyIcon";
import AirportRetailerIcon from "@/components/AirportRetailerIcon";
import HotelIcon from "@/components/HotelIcon";
import CarRentalIcon from "@/components/CarRentalIcon";

const ACI_NA_LINK = "https://airportscouncil.org/wp-content/uploads/2019/06/2019-ACI-NA-Concessions-Benchmarking-Summary.pdf";
const ATL_LINK = "https://www.atl.com/wp-content/uploads/2023/03/Concessions_Phase-II-Solicitations-Update_Presentation_v03132023.pdf";
const FRA_LINK = "https://b2b.frankfurt-airport.com/en/faq-b2b/faq-retail-requirements.html";
const SAC_LINK = "https://sacramento.aero/opportunities/concessions/concession-faqs";
const ACI_BLOG_LINK = "https://blog.aci.aero/airport-economics/airport-non-aeronautical-revenues-commercial-strategy/";

const SLIDES = [
  { id: "cover", type: "cover" },
  { id: "team", type: "team" },
  { id: "problem", type: "problem" },
  { id: "solution", type: "solution" },
  { id: "concessionModel", type: "concessionModel" },
  { id: "magExample", type: "magExample" },
  { id: "benchmarks", type: "benchmarks" },
  { id: "valueChain", type: "valueChain" },
  { id: "businessCase", type: "businessCase" },
  { id: "promotion", type: "promotion" },
  { id: "flywheel", type: "flywheel" },
  { id: "getStarted", type: "getStarted" },
  { id: "thankYou", type: "thankYou" },
];

const SLIDE_LABELS = {
  cover: "Cover",
  team: "Our Team",
  problem: "The Problem",
  solution: "The Solution",
  concessionModel: "Concession Model",
  magExample: "MAG + Percentage",
  benchmarks: "Rate Benchmarks",
  valueChain: "Value Chain",
  businessCase: "Business Case",
  promotion: "The Cost of Waiting",
  flywheel: "Growth Flywheel",
  getStarted: "Partnership Model",
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

// SLIDE 2: Team
function SlideTeam() {
  const members = [
    {
      name: "Jaquelin Beliad Perez",
      role: "Co-Founder / Airport Retail & Brand Specialist",
      linkedin: "https://www.linkedin.com/in/maria-jaquelin-m-46b21486/",
      photo: "https://media.base44.com/images/public/69c97dcd1c1950fa88424690/abc1d9aaf_JaquelinBeliadPerez.jpeg",
    },
    {
      name: "Ariunzaya Zorigt",
      role: "Marketing Director",
      linkedin: "https://www.linkedin.com/in/aria-zorigt/",
      photo: "https://media.base44.com/images/public/69c97dcd1c1950fa88424690/9ae3deb4b_AriunzayaZorigt.jpeg",
    },
    {
      name: "Fares Ben Halima",
      role: "Technical Director",
      linkedin: "https://www.linkedin.com/in/fares-ben-halima-36b948158/",
      photo: "https://media.base44.com/images/public/69c97dcd1c1950fa88424690/38fa892f5_FaresBenHalima.jpeg",
    },
    {
      name: "Raël Martis",
      role: "Co-Founder / Chief Commercial Officer",
      linkedin: "https://www.linkedin.com/in/israel-martis-ozuna/",
      photo: "https://media.base44.com/images/public/69c97dcd1c1950fa88424690/58e6f7004_FotoRaelMartis.jpeg",
    },
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
            DutyBoost combines airport retail expertise with technology, marketing and commercial strategy — built by a team that understands how airport concessions work and how non-aeronautical revenue depends on retail conversion. We know the challenge: passengers walk past stores, sales stagnate, and concession revenue doesn't grow as fast as it could. We built DutyBoost to convert non-purchasing travellers into buyers — growing the retail sales base that airport concession revenue is calculated on.
          </p>
        </div>
      </div>
    </SlideWrapper>
  );
}

// SLIDE 3: Problem
function SlideProblem() {
  return (
    <SlideWrapper>
      <div className="flex-1 flex flex-col justify-center px-5 py-6 md:px-12 md:py-6 relative">
        <GridBg />
        <div className="relative z-10">
          <div className="mb-5">
            <span className="text-blue-600 text-sm font-semibold uppercase tracking-widest">The Problem</span>
            <h2 className="text-xl md:text-3xl font-heading font-bold text-[#0a0f1e] mt-2">
              Passengers Walk Past Stores.<br /><span className="text-blue-600">Airport Revenue Stagnates.</span>
            </h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8">
            <div className="space-y-5">
              <div className="bg-slate-50 border border-slate-200 rounded-2xl p-6">
                <div className="text-3xl md:text-5xl font-bold text-blue-600 mb-2">23.1%</div>
                <div className="text-slate-800 font-semibold">of global airport non-aeronautical revenue comes from retail</div>
                <div className="text-slate-500 text-sm mt-1">26.7% in Europe — the single largest commercial category{" "}
                  <a href={ACI_BLOG_LINK} target="_blank" rel="noopener noreferrer"
                    className="text-blue-600 font-bold underline decoration-blue-600/50 hover:decoration-blue-400 hover:text-blue-500 transition-colors">(ACI)</a>
                </div>
              </div>
              <div className="bg-slate-50 border border-slate-200 rounded-2xl p-6">
                <div className="text-3xl md:text-5xl font-bold text-blue-600 mb-2">15–18.5%</div>
                <div className="text-slate-800 font-semibold">typical concession rate on gross retail sales</div>
                <div className="text-slate-500 text-sm mt-1">Industry benchmarks: 15–18.5% typical range; ACI NA average: 16.6%{" "}
                  <a href={ACI_NA_LINK} target="_blank" rel="noopener noreferrer"
                    className="text-blue-600 font-bold underline decoration-blue-600/50 hover:decoration-blue-400 hover:text-blue-500 transition-colors">(ACI NA)</a>
                </div>
              </div>
              <div className="bg-red-50 border border-red-200 rounded-2xl p-6">
                <div className="text-3xl md:text-5xl font-bold text-red-600 mb-2">The Gap</div>
                <div className="text-slate-800 font-semibold">A significant share of passengers leave without purchasing</div>
                <div className="text-slate-500 text-sm mt-1">Passenger traffic exists, but conversion doesn't — retail revenue is left on the table</div>
              </div>
            </div>
            <div className="flex flex-col gap-4 justify-center">
              <div className="bg-slate-50 border border-slate-200 rounded-2xl p-6">
                <h3 className="text-slate-800 font-semibold text-lg mb-4">What This Means for Airports</h3>
                <ul className="space-y-3">
                  {[
                    "Retail is a major revenue pillar — but it depends on passengers actually buying",
                    "When passengers walk past stores, gross sales stay flat and concession revenue stagnates",
                    "Under a MAG structure, there's no growth until sales push past the guarantee threshold",
                    "Airports need more than footfall — they need conversion",
                    "Non-aeronautical revenue growth is a strategic priority, but the conversion gap limits it",
                    "The revenue base isn't growing as fast as passenger traffic could support",
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
                  "The passengers are already there. The concession framework is already in place. The missing piece is conversion — turning footfall into retail sales."
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </SlideWrapper>
  );
}

// SLIDE 4: Solution
function SlideSolution() {
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
          <div className="grid grid-cols-2 md:grid-cols-4 gap-5 mb-6">
            {[
              { Icon: TravelAgencyIcon, color: "text-blue-600", title: "Flight Booking", desc: "DutyCredit distributed with airline confirmation" },
              { Icon: HotelIcon, color: "text-violet-600", title: "Hotel / OTA", desc: "DutyCredit distributed with booking confirmation" },
              { Icon: CarRentalIcon, color: "text-green-600", title: "Car Rental", desc: "DutyCredit distributed with rental confirmation" },
              { Icon: Plane, color: "text-amber-600", title: "Corporate Travel", desc: "DutyCredit embedded in T&E and corporate booking flows" },
            ].map((step, i) => (
              <div key={i} className="bg-slate-50 border border-slate-200 rounded-2xl p-5 text-center">
                <step.Icon className={`w-10 h-10 mx-auto mb-3 ${step.color}`} />
                <div className="text-slate-800 font-semibold mb-1">{step.title}</div>
                <div className="text-slate-500 text-sm">{step.desc}</div>
              </div>
            ))}
          </div>
          <div className="flex flex-col gap-2 mb-6 lg:hidden">
            {[
              "Partners distribute DutyCredit",
              "Traveller activates benefit",
              "Arrives with purchase intent",
              "Visits participating retailer",
              "Spends €100 → Saves €10",
              "POS validates transaction",
              "Retail sales increase → airport earns more",
            ].map((step, i) => (
              <div key={i} className="flex items-center gap-3">
                <div className="w-7 h-7 rounded-full bg-blue-600 flex items-center justify-center text-white text-xs font-bold flex-shrink-0">{i + 1}</div>
                <div className="flex-1 bg-blue-50 border border-blue-200 rounded-xl px-3 py-2">
                  <span className="text-slate-800 text-sm leading-tight">{step}</span>
                </div>
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
              "Retail sales increase → airport earns more",
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
                <div className="text-2xl md:text-xl lg:text-2xl xl:text-3xl font-bold text-blue-600 h-9 md:h-8 lg:h-10 flex items-center justify-center leading-tight whitespace-nowrap">€1 – €60</div>
                <div className="text-slate-500 text-sm mt-2">DutyCredit direct traveller value</div>
              </div>
              <div className="flex flex-col items-center">
                <div className="text-2xl md:text-xl lg:text-2xl xl:text-3xl font-bold text-blue-600 h-9 md:h-8 lg:h-10 flex items-center justify-center leading-tight whitespace-nowrap">Performance-Based</div>
                <div className="text-slate-500 text-sm mt-2">Zero upfront cost to the airport</div>
              </div>
              <div className="flex flex-col items-center">
                <div className="text-2xl md:text-xl lg:text-2xl xl:text-3xl font-bold text-blue-600 h-9 md:h-8 lg:h-10 flex items-center justify-center leading-tight whitespace-nowrap">Participants</div>
                <div className="text-slate-500 text-sm mt-2">All benefit from one transaction</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </SlideWrapper>
  );
}

// SLIDE 5: The Concession Model
function SlideConcessionModel() {
  return (
    <SlideWrapper>
      <div className="flex-1 flex flex-col justify-center px-5 py-6 md:px-12 md:py-6 relative">
        <GridBg />
        <div className="relative z-10">
          <div className="mb-5">
            <span className="text-blue-600 text-sm font-semibold uppercase tracking-widest">The Concession Model</span>
            <h2 className="text-xl md:text-3xl font-heading font-bold text-[#0a0f1e] mt-2">
              Airports Participate <span className="text-blue-600">Directly in Retail Sales</span>
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
                    "Many airports: concessionaires pay a percentage of gross sales each month, subject to a predetermined MAG",
                    "Common structure: the greater of percentage of gross sales or MAG",
                    "European hubs: percentage of sales based on location, concept and foot traffic, plus a minimum monthly rent",
                    "Regional airports: tiered percentages — one rate on the first band, a higher rate above it",
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
                <h3 className="text-slate-800 font-semibold text-lg mb-3">Why This Matters for DutyBoost</h3>
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
                  "DutyBoost doesn't need the airport to subsidize the incentive. It increases the underlying retail sales on which concession payments are calculated."
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </SlideWrapper>
  );
}

// SLIDE 6: MAG + Percentage Worked Example
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

// SLIDE 7: Concession Rate Benchmarks
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
      source: "Major Hub Airports",
      stat: "15–18.5%",
      desc: "Published retail percentage-rent ranges in concession solicitation packages",
      link: ATL_LINK,
      linkText: "(Source)",
    },
    {
      source: "European Hub Airports",
      stat: "Variable %",
      desc: "Percentage of sales based on location, concept and foot traffic, combined with a minimum monthly rent",
      link: FRA_LINK,
      linkText: "(Source)",
    },
    {
      source: "Regional Airports",
      stat: "Tiered %",
      desc: "Percentages can be tiered — one rate on the first revenue band, a higher rate above it",
      link: SAC_LINK,
      linkText: "(Source)",
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

// SLIDE 8: Extended Value Chain
function SlideValueChain() {
  const chain = [
    { Icon: TravelAgencyIcon, label: "Travel Partner", desc: "Distributes DutyCredit", color: "blue" },
    { Icon: TravelerIcon, label: "Traveller", desc: "Activated before arrival", color: "violet" },
    { Icon: AirportRetailerIcon, label: "Airport Retailer", desc: "Captures incremental sale", color: "green" },
    { Icon: Store, label: "Supplier", desc: "Faster stock rotation", color: "amber" },
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

// SLIDE 9: Business Case
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

// SLIDE 10: The Cost of Waiting
function SlidePromotion() {
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
            <p className="text-slate-500 mt-1 text-sm">Passenger traffic is already passing through the terminal. Retailers are already stocked. The concession framework is already in place. The only question is how many of those passengers actually buy — and that conversion gap is costing the airport real money every single day.</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-5">
            <div className="bg-red-50 border border-red-200 rounded-2xl p-5 text-center">
              <div className="text-3xl md:text-4xl font-bold text-red-600 mb-2">€0</div>
              <div className="text-slate-800 font-semibold text-sm">Upfront cost to the airport</div>
              <div className="text-slate-500 text-xs mt-1">Performance-based — the airport only earns more</div>
            </div>
            <div className="bg-blue-50 border border-blue-200 rounded-2xl p-5 text-center">
              <div className="text-3xl md:text-4xl font-bold text-blue-600 mb-2">15–18.5%</div>
              <div className="text-slate-800 font-semibold text-sm">Concession rate on every incremental sale</div>
              <div className="text-slate-500 text-xs mt-1">Every converted traveller grows airport revenue</div>
            </div>
            <div className="bg-green-50 border border-green-200 rounded-2xl p-5 text-center">
              <div className="text-3xl md:text-4xl font-bold text-green-600 mb-2">Compounding</div>
              <div className="text-slate-800 font-semibold text-sm">Sales growth feeds the flywheel</div>
              <div className="text-slate-500 text-xs mt-1">Today's conversion becomes tomorrow's concession uplift</div>
            </div>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="bg-slate-50 border border-slate-200 rounded-2xl p-5">
              <h3 className="font-bold text-slate-800 mb-3">What Happens If the Airport Waits</h3>
              <div className="space-y-2.5 text-sm">
                {[
                  "Passengers keep walking past stores — gross sales stay flat",
                  "Concession revenue stagnates while passenger traffic keeps growing",
                  "Retailers remain below MAG — no incremental revenue for anyone",
                  "Competing airports that adopt conversion tools capture the narrative",
                  "The conversion gap widens with every additional departure",
                  "Non-aeronautical revenue targets slip further out of reach",
                ].map((item, i) => (
                  <div key={i} className="flex items-start gap-2">
                    <XCircle className="w-4 h-4 text-red-500 flex-shrink-0 mt-0.5" />
                    <span className="text-slate-700">{item}</span>
                  </div>
                ))}
              </div>
            </div>
            <div className="bg-gradient-to-br from-blue-600 to-indigo-700 rounded-2xl p-5 text-white">
              <h3 className="font-bold mb-3">What Happens When the Airport Acts Now</h3>
              <div className="space-y-2.5 text-sm">
                {[
                  "Pre-activated travellers arrive ready to buy — sales lift immediately",
                  "Retailers push past MAG — concession revenue shifts to the higher percentage tier",
                  "Every incremental transaction flows directly to the airport's revenue",
                  "The airport leads the market in conversion innovation — not follows it",
                  "Non-aeronautical revenue grows without subsidy, capital spend, or operational change",
                  "The commercial case strengthens with every validated transaction",
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
              The passengers, the retailers, the concession framework — everything is already in place.{" "}
              <span className="text-blue-400">The only missing piece is conversion. The airport that moves first captures it.</span>
            </p>
          </div>
        </div>
      </div>
    </SlideWrapper>
  );
}

// SLIDE 11: Growth Flywheel
function SlideFlywheel() {
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
              A Self-Reinforcing <span className="text-blue-600">Revenue Engine</span>
            </h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8 items-center">
            <div className="relative flex items-center justify-center" style={{ height: "340px" }}>
              <div className="absolute inset-0 rounded-full border-2 border-blue-200" />
              <div className="bg-blue-600 border-2 border-blue-700 rounded-full w-28 h-28 flex flex-col items-center justify-center text-center z-10">
                <div className="text-white text-xs font-bold leading-tight px-2">Airport Revenue Flywheel</div>
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
                <h3 className="text-slate-800 font-bold mb-3">Why Airports Win as the Flywheel Turns</h3>
                <div className="space-y-2.5 text-sm">
                  {[
                    { Icon: TrendingUp, party: "More conversion", effect: "→ Higher gross retail sales" },
                    { Icon: DollarSign, party: "Higher sales", effect: "→ More percentage-based concession revenue" },
                    { Icon: RefreshCw, party: "Past the MAG", effect: "→ Every transaction adds incremental revenue" },
                    { Icon: BarChart3, party: "Stronger non-aero", effect: "→ Better commercial performance metrics" },
                    { Icon: ShoppingCart, party: "More retailer success", effect: "→ Greater participation and shelf investment" },
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
                <p className="text-blue-100 text-sm mt-2">The flywheel turns passenger traffic into non-aeronautical revenue — and revenue into growth.</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </SlideWrapper>
  );
}

// SLIDE 11: Partnership Model
function SlideGetStarted() {
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
            <p className="text-slate-500 mt-2 max-w-3xl mx-auto text-sm">DutyBoost does the activation. The airport benefits from increased retail sales within its existing concession framework. Here's how we work together.</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-5 mb-5">
            <div className="bg-slate-50 border border-slate-200 rounded-2xl p-5">
              <h3 className="font-bold text-slate-800 mb-3">What DutyBoost Handles</h3>
              <div className="space-y-2.5 text-sm">
                {[
                  { Icon: TravelerIcon, text: "Pre-activating travellers through Travel & Corporate Partners before arrival" },
                  { Icon: DollarSign, text: "DutyCredit distribution and traveller incentive mechanics" },
                  { Icon: BarChart3, text: "POS validation of qualifying transactions" },
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
              <h3 className="font-bold text-blue-900 mb-3">What We Ask of the Airport</h3>
              <div className="space-y-2.5 text-sm">
                {[
                  { Icon: Building2, text: "Identify retailers with revenue-based concessions (MAG + % structures)" },
                  { Icon: Store, text: "Introduce DutyBoost to concession retailers at the airport" },
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
                { step: "1", title: "Introductory Call", desc: "A 30-minute conversation to understand your airport's concession structure and commercial priorities." },
                { step: "2", title: "Retailer Mapping", desc: "We identify which retailers have revenue-based concessions where DutyBoost creates direct airport uplift." },
                { step: "3", title: "Retailer Introduction", desc: "We introduce DutyBoost to your concession retailers and support their POS activation." },
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

// SLIDE 12: Thank You
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
  team: SlideTeam,
  problem: SlideProblem,
  solution: SlideSolution,
  concessionModel: SlideConcessionModel,
  magExample: SlideMagExample,
  benchmarks: SlideBenchmarks,
  valueChain: SlideValueChain,
  businessCase: SlideBusinessCase,
  promotion: SlidePromotion,
  flywheel: SlideFlywheel,
  getStarted: SlideGetStarted,
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