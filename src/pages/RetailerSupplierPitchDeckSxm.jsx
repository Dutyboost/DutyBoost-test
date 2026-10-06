import { useState, useEffect, useRef, Fragment } from "react";
import PitchDeckDownloadButtons from "@/components/pitch/PitchDeckDownloadButtons";
import { Link } from "react-router-dom";
import { ChevronLeft, ChevronRight, ArrowRight, Package, TrendingUp, RefreshCw, ShoppingCart, DollarSign, CheckCircle, BarChart3, Boxes, Store, Factory } from "lucide-react";
import DutyBoostLogo from "@/components/DutyBoostLogo";
import PositioningLine from "@/components/shared/PositioningLine";
import { SlideSolution } from "@/components/shared/SlideSolution";
import { SlideTierMix as TierMixSlide } from "@/components/shared/SlideTierMix";
import HotelIcon from "@/components/HotelIcon";
import CarRentalIcon from "@/components/CarRentalIcon";
import AirportRetailerIcon from "@/components/AirportRetailerIcon";
import TravelerIcon from "@/components/TravelerIcon";
import TravelAgencyIcon from "@/components/TravelAgencyIcon";

const CMI_LINK = "https://www.coherentmarketinsights.com/market-insight/caribbean-duty-free-retailing-market-4934";
const SXM_LINK = "https://www.sintmaartengov.org/news/pages/Passenger-Arrivals-and-Cruise-Arrivals-Show-Growth-in-2025.aspx";
const M1NDSET_LINK = "https://www.gtrmag.com/blog/gtr-magazine-looks-at-the-state-of-travel-and-tourism-in-the-caribbean";
const CTO_LINK = "https://www.onecaribbean.org/caribbean-tourism-shows-resilient-growth-amid-global-headwinds-in-2025/";
const AVOLTA_MARGIN_LINK = "https://www.avoltaworld.com/sites/default/files/2016-12/company_report.pdf";
const ETRC_LINK = "https://etrc.org/wp-content/uploads/documents/IRS-Report-Exploring-and-Testing-the-Prevailing-Business-Models-in-Travel-Retail-FINAL.pdf";

const SLIDES = [
  { id: "cover", type: "cover" },
  { id: "team", type: "team" },
  { id: "problem", type: "problem" },
  { id: "solution", type: "solution" },
  { id: "market", type: "market" },
  { id: "conversion", type: "conversion" },
  { id: "tierMix", type: "tierMix" },
  { id: "valueChain", type: "valueChain" },
  { id: "transaction", type: "transaction" },
  { id: "category", type: "category" },
  { id: "flywheel", type: "flywheel" },
  { id: "getStarted", type: "getStarted" },
  { id: "thankYou", type: "thankYou" },
];

const SLIDE_LABELS = {
  cover: "Cover",
  team: "Our Team",
  problem: "The Facts",
  solution: "The Solution",
  market: "Sint Maarten Market",
  conversion: "Conversion Opportunity",
  tierMix: "Transaction Mix — Tier Economics",
  valueChain: "Supplier Value Chain",
  transaction: "Transaction Economics",
  category: "Category Impact",
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
            <PositioningLine className="mb-3" />
            <h1 className="text-3xl md:text-5xl font-heading font-bold text-[#0a0f1e] leading-tight mb-4">
              Incremental Sales Through<br />
              <span className="text-blue-600">Airport Retail Activation</span>
            </h1>
            <p className="text-xl text-slate-500 max-w-3xl leading-relaxed">
              A Presentation for Sint Maarten Retail Suppliers
            </p>
          </div>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 sm:gap-6 mt-4 w-full">
            {[
              { label: "Sint Maarten", value: "855,994" },
              { label: "Non-Purchase", value: "73%" },
              { label: "Market Growth", value: "21.7%" },
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
      linkedin: "https://www.linkedin.com/in/jaquelin-b-46b21486/",
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
      name: "Raël Martis Ozuna",
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
            DutyBoost brings together commercial strategy, software sales, airport retail, technology, product development, marketing, design and acquisition expertise — the capabilities to execute, launch and scale globally.
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
            <span className="text-blue-600 text-sm font-semibold uppercase tracking-widest">The Facts</span>
            <h2 className="text-xl md:text-3xl font-heading font-bold text-[#0a0f1e] mt-2">
              73% of Passengers Don't Buy.<br /><span className="text-blue-600">Your Products Sit on the Shelf.</span>
            </h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8">
            <div className="space-y-5">
              <div className="bg-slate-50 border border-slate-200 rounded-2xl p-6">
                <div className="text-3xl md:text-5xl font-bold text-blue-600 mb-2">35M</div>
                <div className="text-slate-800 font-semibold">Caribbean stayover arrivals in 2025</div>
                <div className="text-slate-500 text-sm mt-1">+2.5% vs 2024 | +16.7% vs 2019{" "}
                  <a href={CTO_LINK} target="_blank" rel="noopener noreferrer"
                    className="text-blue-600 font-bold underline decoration-blue-600/50 hover:decoration-blue-400 hover:text-blue-500 transition-colors">(CTO)</a>
                </div>
              </div>
              <div className="bg-slate-50 border border-slate-200 rounded-2xl p-6">
                <div className="text-3xl md:text-5xl font-bold text-blue-600 mb-2">855,994</div>
                <div className="text-slate-800 font-semibold">Sint Maarten air passenger arrivals in 2025</div>
                <div className="text-slate-500 text-sm mt-1">53.9% from North America | 25.8% from EU{" "}
                  <a href={SXM_LINK} target="_blank" rel="noopener noreferrer"
                    className="text-blue-600 font-bold underline decoration-blue-600/50 hover:decoration-blue-400 hover:text-blue-500 transition-colors">(SXM Gov)</a>
                </div>
              </div>
              <div className="bg-red-50 border border-red-200 rounded-2xl p-6">
                <div className="text-3xl md:text-5xl font-bold text-red-600 mb-2">73%</div>
                <a href={M1NDSET_LINK} target="_blank" rel="noopener noreferrer"
                  className="text-blue-600 font-semibold underline decoration-blue-600/50 hover:decoration-blue-400 hover:text-blue-500 transition-colors">
                  Caribbean non-purchase rate (m1nd-set)
                </a>
                <div className="text-slate-500 text-sm mt-1">27% purchase rate | 73% non-purchase across Caribbean</div>
              </div>
            </div>
            <div className="flex flex-col gap-4 justify-center">
              <div className="bg-slate-50 border border-slate-200 rounded-2xl p-6">
                <h3 className="text-slate-800 font-semibold text-lg mb-4">What 73% Non-Purchase Means for Suppliers</h3>
                <ul className="space-y-3">
                  {[
                    "Passenger footfall exists, but most travellers never enter the store",
                    "Stock turns slowly — products sit through peak and off-peak cycles",
                    "Slower rotation means less frequent reordering from retailers",
                    "Suppliers miss volume that the passenger traffic could support",
                    "Shelf space is occupied by products that aren't moving",
                    "Brand exposure at the airport doesn't translate into sell-through",
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
                  "The traffic is already there. The conversion isn't. That gap is exactly where supplier volume is being lost."
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </SlideWrapper>
  );
}

// SLIDE 4: Solution — imported from @/components/shared/SlideSolution

// SLIDE 5: Caribbean Market
function SlideMarket() {
  return (
    <SlideWrapper>
      <div className="flex-1 flex flex-col justify-center px-12 py-6">
        <div className="mb-5">
          <span className="text-blue-600 text-sm font-semibold uppercase tracking-widest">Sint Maarten Market Opportunity</span>
          <h2 className="text-xl md:text-3xl font-heading font-bold text-[#0a0f1e] mt-2">
            855K Air Arrivals. $67M Local Market. <span className="text-blue-600">$2.72B Regional Market</span>
          </h2>
          <p className="text-slate-500 mt-2">DutyBoost doesn't need to create the market. It connects what already exists.</p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-5 mb-6">
          {[
            { label: "Sint Maarten Air Arrivals", value: "855,994", sub: "53.9% North America | 25.8% EU (SXM Gov, 2025)", color: "blue", subLink: SXM_LINK },
            { label: "Caribbean DF&TR Market", value: "$2.72B", sub: "21.7% CAGR 2026-2033 (CMI)", color: "indigo", subLink: CMI_LINK },
            { label: "Sint Maarten DF&TR Share", value: "$67M", sub: "2.45% of Caribbean market (est.)", color: "violet", subLink: CMI_LINK },
          ].map((m) => (
            <div key={m.label} className={`bg-${m.color}-50 border border-${m.color}-200 rounded-2xl p-6 text-center`}>
              <div className={`text-xl md:text-3xl font-bold text-${m.color}-700 mb-2`}>{m.value}</div>
              <div className="font-semibold text-slate-700 mb-1 text-sm">{m.label}</div>
              <div className="text-slate-500 text-xs">
                {m.subLink ? (
                  <a href={m.subLink} target="_blank" rel="noopener noreferrer"
                    className="text-blue-600 font-semibold underline decoration-blue-600/50 hover:decoration-blue-400 hover:text-blue-500 transition-colors">
                    {m.sub}
                  </a>
                ) : m.sub}
              </div>
            </div>
          ))}
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          <div className="bg-slate-50 border border-slate-200 rounded-2xl p-6">
            <h3 className="font-bold text-slate-700 mb-4">Sint Maarten DF&TR Categories (2026 est.)</h3>
            <div className="space-y-2">
              {[
                { cat: "Fragrances & Cosmetics", val: "$23M", pct: 90 },
                { cat: "Wines & Spirits", val: "$15M", pct: 59 },
                { cat: "Fashion & Accessories", val: "$11M", pct: 43 },
                { cat: "Tobacco", val: "$7M", pct: 27 },
              ].map((row) => (
                <div key={row.cat} className="flex items-center gap-3">
                  <div className="w-32 text-sm text-slate-600">{row.cat}</div>
                  <div className="flex-1 bg-slate-200 rounded-full h-2">
                    <div className="bg-blue-600 h-2 rounded-full" style={{ width: `${row.pct}%` }} />
                  </div>
                  <div className="w-16 text-sm font-semibold text-slate-700 text-right">{row.val}</div>
                </div>
              ))}
            </div>
            <div className="text-slate-400 text-xs mt-3">Sint Maarten category values estimated from CMI market share data, proportional to Sint Maarten's air arrival share of the Caribbean market (855,994 / 35M ≈ 2.45% of $2.72B ≈ $67M total)</div>
          </div>
          <div className="bg-amber-50 border border-amber-200 rounded-2xl p-6">
            <h3 className="font-bold text-slate-700 mb-3">For a Supplier, the Opportunity Is Sell-Through:</h3>
            <div className="space-y-2">
              {[
                "855,994 passengers already pass through Sint Maarten",
                "Your products are already stocked on airport shelves",
                "Retailers are already your customers",
                "73% of passengers currently walk past your products",
                "Converting even 1% more = thousands of additional units sold",
              ].map((item, i) => (
                <div key={i} className="flex items-center gap-2">
                  <div className="w-5 h-5 rounded-full bg-green-100 border border-green-300 flex items-center justify-center flex-shrink-0">
                    <span className="text-green-600 text-xs">✓</span>
                  </div>
                  <span className="text-slate-600 text-sm">{item}</span>
                </div>
              ))}
            </div>
            <div className="mt-4 bg-green-100 border border-green-300 rounded-xl p-3">
              <p className="text-green-800 text-sm font-semibold">DutyBoost's role: Convert non-purchasing traffic into sell-through — so your stock rotates faster.</p>
            </div>
          </div>
        </div>
      </div>
    </SlideWrapper>
  );
}

// SLIDE 6: Conversion Opportunity
function SlideConversion() {
  return (
    <SlideWrapper>
      <div className="flex-1 flex flex-col justify-center px-12 py-6">
        <div className="mb-6">
          <span className="text-blue-600 text-sm font-semibold uppercase tracking-widest">Conversion Opportunity</span>
          <h2 className="text-xl md:text-3xl font-heading font-bold text-[#0a0f1e] mt-2">
            Small Conversion Gains = <span className="text-blue-600">More Units Sold at Scale</span>
          </h2>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-5">
          <div>
            <div className="bg-red-50 border border-red-200 rounded-2xl p-5 mb-4">
              <div className="flex items-center gap-4">
                <div>
                  <div className="text-3xl md:text-5xl font-bold text-red-600">73%</div>
                  <div className="text-slate-600 font-semibold text-sm mt-1">Non-purchase rate (m1nd-set Caribbean)</div>
                  <div className="text-slate-400 text-xs mt-1">= 625K unreached Sint Maarten travellers</div>
                </div>
                <div className="flex-1 text-right">
                  <div className="text-3xl md:text-5xl font-bold text-green-600">27%</div>
                  <div className="text-slate-600 font-semibold text-sm mt-1">Currently converting</div>
                </div>
              </div>
              <div className="mt-3 pt-3 border-t border-red-200/60">
                <a href={M1NDSET_LINK} target="_blank" rel="noopener noreferrer"
                  className="text-blue-600 font-semibold underline decoration-blue-600/50 hover:decoration-blue-400 hover:text-blue-500 transition-colors">
                  m1nd-set Caribbean purchase rate benchmark
                </a>
              </div>
            </div>
            <div className="bg-blue-50 border border-blue-200 rounded-2xl p-4 sm:p-5">
              <h3 className="font-bold text-blue-800 mb-3">Incremental Sell-Through Potential (625K non-purchasers):</h3>
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 text-xs text-slate-400 mb-1 px-2">
                <span>Conversion</span><span>Transactions</span><span>Retail Value</span><span className="sm:text-right">Supplier Reorder*</span>
              </div>
              <div className="space-y-1.5">
                {[
                  { conv: "+0.01 pp", txns: "63", retail: "$1.4K", sup: "$0.7K" },
                  { conv: "+0.5 pp", txns: "3.1K", retail: "$71.9K", sup: "$36K" },
                  { conv: "+1 pp", txns: "6.3K", retail: "$144K", sup: "$72K" },
                  { conv: "+2 pp", txns: "12.5K", retail: "$288K", sup: "$144K" },
                  { conv: "+5 pp", txns: "31.3K", retail: "$719K", sup: "$360K" },
                ].map((row, i) => (
                  <div key={i} className={`grid grid-cols-2 sm:grid-cols-4 gap-x-2 gap-y-0.5 text-sm py-1.5 px-2 rounded-lg ${i === 2 ? "bg-blue-200/50 font-semibold" : ""}`}>
                    <span className="text-blue-700">{row.conv}</span>
                    <span className="text-slate-600">{row.txns} txns</span>
                    <span className="text-slate-600">{row.retail}</span>
                    <span className="text-green-700 font-semibold sm:text-right">{row.sup}</span>
                  </div>
                ))}
              </div>
              <p className="text-slate-400 text-[10px] mt-2 leading-snug">Based on Sint Maarten's 625K non-purchasing travellers, the $23 Entry-tier minimum basket used as the example, and the supplier reorder value at ±50% of retail price.</p>
              <div className="text-slate-400 text-xs mt-2 leading-relaxed">*Supplier reorder ≈ 50% of retail price, based on duty-free operator gross margins of ±49–55% <a href={AVOLTA_MARGIN_LINK} target="_blank" rel="noopener noreferrer" className="text-blue-600 font-semibold underline decoration-blue-600/50 hover:decoration-blue-400 hover:text-blue-500 transition-colors">(Avolta ±49%)</a> <a href={ETRC_LINK} target="_blank" rel="noopener noreferrer" className="text-blue-600 font-semibold underline decoration-blue-600/50 hover:decoration-blue-400 hover:text-blue-500 transition-colors">(ETRC)</a>.</div>
            </div>
          </div>
          <div className="flex flex-col gap-4">
            <div className="bg-slate-800 text-white rounded-2xl p-6 flex-1 flex flex-col">
              <h3 className="font-bold text-white text-lg mb-4">The DutyBoost Proposition for Suppliers</h3>
              <div className="flex-1 flex flex-col justify-center gap-3">
                {[
                  { from: "Products sit on shelves", to: "Products move faster" },
                  { from: "Slow stock rotation", to: "Accelerated sell-through" },
                  { from: "Infrequent reordering", to: "More frequent orders" },
                  { from: "73% walk past your brands", to: "Pre-activated travellers seek them out" },
                ].map((row, i) => (
                  <div key={i} className="grid grid-cols-[1fr,auto,1fr] gap-2 items-stretch text-sm">
                    <span className="text-red-300 bg-red-900/30 rounded-lg px-3 py-2.5 text-center flex items-center justify-center leading-snug">{row.from}</span>
                    <ArrowRight size={16} className="text-blue-400 flex-shrink-0 self-center" />
                    <span className="text-green-300 bg-green-900/30 rounded-lg px-3 py-2.5 text-center flex items-center justify-center leading-snug">{row.to}</span>
                  </div>
                ))}
              </div>
            </div>
            <div className="bg-gradient-to-br from-blue-600 to-indigo-700 rounded-2xl p-5 text-white">
              <div className="text-sm font-semibold opacity-80 mb-1">The Core Question</div>
              <p className="text-lg font-bold leading-snug">
                "Would you rather have your products sit through another slow rotation cycle — or have thousands of pre-activated travellers walking into the store looking to buy?"
              </p>
              <p className="text-sm mt-2 opacity-80">The choice is simple.</p>
            </div>
          </div>
        </div>
      </div>
    </SlideWrapper>
  );
}

// SLIDE 7: The Supplier Value Chain
function SlideValueChain() {
  const steps = [
    { Icon: TravelerIcon, title: "More Passengers Converted", desc: "Pre-activated travellers arrive with purchase intent instead of walking past", color: "blue" },
    { Icon: Package, title: "More Products Sold", desc: "Converting travellers buy from your stocked categories", color: "indigo" },
    { Icon: RefreshCw, title: "Faster Stock Rotation", desc: "Shelves turn quicker — products move, not sit", color: "violet" },
    { Icon: ShoppingCart, title: "More Orders", desc: "Retailers reorder from suppliers to replenish", color: "purple" },
    { Icon: DollarSign, title: "More Revenue", desc: "Incremental supplier volume from existing shelf space", color: "green" },
  ];

  return (
    <SlideWrapper>
      <div className="flex-1 flex flex-col justify-center px-5 py-6 md:px-12 md:py-6 relative">
        <GridBg />
        <div className="relative z-10">
          <div className="mb-4 text-center">
            <span className="text-blue-600 text-sm font-semibold uppercase tracking-widest">The Supplier Value Chain</span>
            <h2 className="text-xl md:text-3xl font-heading font-bold text-[#0a0f1e] mt-2">
              How DutyBoost Creates <span className="text-blue-600">Incremental Supplier Revenue</span>
            </h2>
            <p className="text-slate-500 mt-2 max-w-3xl mx-auto">The same conversion shift that helps retailers also flows directly up the supply chain — every additional traveller converted means more units sold, faster rotation, and more orders.</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-5 gap-3 mb-4">
            {steps.map((step, i, arr) => (
              <Fragment key={i}>
                <div className={`bg-${step.color}-50 border border-${step.color}-200 rounded-2xl p-4 text-center flex flex-col items-center`}>
                  <div className={`w-10 h-10 rounded-full bg-${step.color}-600 text-white flex items-center justify-center mb-2`}>
                    <step.Icon className="w-5 h-5" />
                  </div>
                  <div className="text-xs font-bold text-blue-600 mb-1">STEP {i + 1}</div>
                  <div className={`text-${step.color}-700 font-bold text-sm mb-1 leading-tight`}>{step.title}</div>
                  <div className="text-slate-600 text-xs leading-relaxed">{step.desc}</div>
                </div>
                {i < arr.length - 1 && (
                  <div className="hidden md:flex items-center justify-center">
                    <ArrowRight className="text-blue-400 w-6 h-6" />
                  </div>
                )}
              </Fragment>
            ))}
          </div>
          <div className="md:hidden flex flex-col items-center gap-1 mb-4">
            {steps.slice(0, -1).map((_, i) => (
              <ArrowRight key={i} className="text-blue-400 w-5 h-5 rotate-90" />
            ))}
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="bg-slate-50 border border-slate-200 rounded-2xl p-4">
              <h3 className="font-bold text-slate-700 mb-2">What This Means in Practice</h3>
              <div className="space-y-2 text-sm">
                {[
                  "Your products are already on airport shelves — no new listing required",
                  "Every converted non-purchaser is an incremental unit sold you wouldn't have captured",
                  "Faster rotation means retailers reorder sooner and more often",
                  "Incremental volume flows through your existing distribution — no new logistics",
                  "Brand exposure at the airport finally converts into actual sell-through",
                ].map((item, i) => (
                  <div key={i} className="flex items-start gap-2">
                    <CheckCircle className="w-4 h-4 text-blue-600 flex-shrink-0 mt-0.5" />
                    <span className="text-slate-700">{item}</span>
                  </div>
                ))}
              </div>
            </div>
            <div className="bg-gradient-to-br from-blue-600 to-indigo-700 rounded-2xl p-4 text-white">
              <h3 className="font-bold mb-2">The Compounding Effect</h3>
              <p className="text-blue-50 text-sm leading-relaxed mb-2">
                Each step reinforces the next. More conversion today means more orders tomorrow — and more orders mean more shelf space allocated to your brands, which means even more exposure to the next wave of pre-activated travellers.
              </p>
              <div className="bg-white/10 rounded-xl p-3">
                <p className="text-white font-semibold text-sm">
                  More passengers converted → more products sold → faster stock rotation → more orders → more revenue for you.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </SlideWrapper>
  );
}

// SLIDE 8: Transaction Economics
function SlideTransaction() {
  return (
    <SlideWrapper>
      <div className="flex-1 flex flex-col justify-center px-5 py-6 md:px-12 md:py-6 relative">
        <GridBg />
        <div className="relative z-10">
          <div className="mb-6">
            <span className="text-blue-600 text-sm font-semibold uppercase tracking-widest">One Transaction — The Full Chain Benefits</span>
            <h2 className="text-xl md:text-3xl font-heading font-bold text-[#0a0f1e] mt-2">
              $23 Entry-Tier Qualifying Sale Example
            </h2>
          </div>
          <div className="grid grid-cols-2 sm:grid-cols-5 gap-3 mb-6">
            {[
              { party: "Traveller", Icon: TravelerIcon, value: "$1.15", sub: "DutyCredit saving (5%)", color: "green", bg: "bg-green-50", border: "border-green-200" },
              { party: "Airport Retailer", Icon: AirportRetailerIcon, value: "$21.28", sub: "Net before normal costs (92.5%)", color: "blue", bg: "bg-blue-50", border: "border-blue-200" },
              { party: "Travel & Corporate Partner", Icon: TravelAgencyIcon, value: "$0.12", sub: "Ancillary revenue (0.5%)", color: "yellow", bg: "bg-yellow-50", border: "border-yellow-200" },
              { party: "POS Partner", Icon: BarChart3, value: "$0.06", sub: "Transaction revenue (0.25%)", color: "purple", bg: "bg-purple-50", border: "border-purple-200" },
              { party: "DutyBoost", Icon: Boxes, value: "$0.40", sub: "Platform revenue (1.75%)", color: "orange", bg: "bg-orange-50", border: "border-orange-200" },
            ].map((p) => (
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
              <div className="text-slate-500 text-xs uppercase tracking-wide mb-2">Total = $23.00</div>
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
              <h3 className="font-bold mb-3">Where the Supplier Fits</h3>
              <p className="text-blue-50 text-sm leading-relaxed">
                The retailer keeps 92.5% of every qualifying sale — and that $21.28 is what flows back up the supply chain as reorder value. Faster sell-through means retailers replenish your products sooner, ordering more volume to keep pace with conversion. Your revenue grows without any change to your pricing, distribution or logistics.
              </p>
              <div className="mt-3 text-blue-100 font-semibold text-sm">
                The retailer's 92.5% is your reorder signal.
              </div>
            </div>
          </div>
        </div>
      </div>
    </SlideWrapper>
  );
}

// SLIDE 9: Category Impact
function SlideCategory() {
  return (
    <SlideWrapper>
      <div className="flex-1 flex flex-col justify-center px-5 py-6 md:px-12 md:py-6">
        <div className="mb-5">
          <span className="text-blue-600 text-sm font-semibold uppercase tracking-widest">Category Impact</span>
          <h2 className="text-xl md:text-3xl font-heading font-bold text-[#0a0f1e] mt-2">
            Incremental Volume <span className="text-blue-600">by Product Category</span>
          </h2>
          <p className="text-slate-500 mt-1 text-sm">At a +1% conversion uplift across the 625K non-purchasing Sint Maarten travellers (±6.3K incremental transactions at the $23 Entry-tier basket), here is the estimated incremental sell-through by category.</p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5 mb-5">
          {[
            { cat: "Fragrances & Cosmetics", share: "34%", incRetail: "$49K", incUnits: "±480 units", color: "blue", note: "Highest category share — strongest incremental volume" },
            { cat: "Wines & Spirits", share: "22%", incRetail: "$32K", incUnits: "±310 units", color: "indigo", note: "Premium bottles drive high basket value" },
            { cat: "Fashion & Accessories", share: "16%", incRetail: "$23K", incUnits: "±230 units", color: "violet", note: "Pre-activation lifts considered purchases" },
            { cat: "Tobacco", share: "10%", incRetail: "$14K", incUnits: "±140 units", color: "purple", note: "Steady demand, fast rotation" },
          ].map((c) => (
            <div key={c.cat} className={`bg-${c.color}-50 border border-${c.color}-200 rounded-2xl p-5`}>
              <div className="flex items-center justify-between mb-3">
                <div className={`text-${c.color}-700 font-bold`}>{c.cat}</div>
                <div className={`text-${c.color}-600 text-sm font-semibold`}>{c.share} of $67M market</div>
              </div>
              <div className="grid grid-cols-2 gap-3 mb-3">
                <div className="bg-white border border-slate-200 rounded-xl p-3 text-center">
                  <div className={`text-xl font-bold text-${c.color}-600`}>{c.incRetail}</div>
                  <div className="text-slate-500 text-xs mt-1">incremental retail value</div>
                </div>
                <div className="bg-white border border-slate-200 rounded-xl p-3 text-center">
                  <div className={`text-xl font-bold text-${c.color}-600`}>{c.incUnits}</div>
                  <div className="text-slate-500 text-xs mt-1">est. units sold (at +1%)</div>
                </div>
              </div>
              <div className="text-slate-600 text-xs leading-relaxed">{c.note}</div>
            </div>
          ))}
        </div>
        <div className="bg-gradient-to-br from-blue-600 to-indigo-700 rounded-2xl p-5 text-white">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-5 items-center">
            <div>
              <h3 className="font-bold mb-2">It Scales With Conversion</h3>
              <p className="text-blue-50 text-sm leading-relaxed">
                These figures assume just +1% conversion. At +2%, volumes double. At +5%, they quintuple. The shelf space, the listings and the logistics already exist — DutyBoost simply converts the traffic that's already walking past.
              </p>
            </div>
            <div className="grid grid-cols-3 gap-3 text-center">
              {[
                { pp: "+1%", mult: "1× volume" },
                { pp: "+2%", mult: "2× volume" },
                { pp: "+5%", mult: "5× volume" },
              ].map((row, i) => (
                <div key={i} className={`rounded-xl p-3 ${i === 0 ? "bg-white/20" : "bg-white/10"}`}>
                  <div className="text-white font-bold text-lg">{row.pp}</div>
                  <div className="text-blue-100 text-xs mt-1">{row.mult}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </SlideWrapper>
  );
}

// SLIDE 10: Growth Flywheel
function SlideFlywheel() {
  const steps = [
    "More Travellers Converted",
    "More Products Sold",
    "Faster Stock Rotation",
    "More Retailer Orders",
    "More Supplier Volume",
    "More Shelf Space Allocated",
    "Greater Brand Exposure",
    "More Validated Transactions",
    "Stronger Commercial Evidence",
    "More Partner Adoption",
    "More Travellers Reached",
    "Stronger Conversion",
  ];

  return (
    <SlideWrapper>
      <div className="flex-1 flex flex-col justify-center px-5 py-6 md:px-12 md:py-6 relative">
        <GridBg />
        <div className="relative z-10">
          <div className="mb-6">
            <span className="text-blue-600 text-sm font-semibold uppercase tracking-widest">The Growth Flywheel</span>
            <h2 className="text-xl md:text-3xl font-heading font-bold text-[#0a0f1e] mt-2">
              A Self-Reinforcing <span className="text-blue-600">Sell-Through Engine</span>
            </h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8 items-center">
            <div className="relative flex items-center justify-center" style={{ height: "340px" }}>
              <div className="absolute inset-0 rounded-full border-2 border-blue-200" />
              <div className="bg-blue-600 border-2 border-blue-700 rounded-full w-28 h-28 flex flex-col items-center justify-center text-center z-10">
                <div className="text-white text-xs font-bold leading-tight px-2">Supplier Growth Flywheel</div>
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
                <h3 className="text-slate-800 font-bold mb-3">Why Suppliers Win as the Flywheel Turns</h3>
                <div className="space-y-2.5 text-sm">
                  {[
                    { Icon: TrendingUp, party: "More conversion", effect: "→ More units sold from existing stock" },
                    { Icon: RefreshCw, party: "Faster rotation", effect: "→ Retailers reorder sooner and more often" },
                    { Icon: ShoppingCart, party: "More orders", effect: "→ Incremental supplier volume at no extra cost" },
                    { Icon: Store, party: "More shelf space", effect: "→ Retailers allocate space to brands that sell" },
                    { Icon: Package, party: "More exposure", effect: "→ Greater brand presence to the next wave" },
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
                  "Every converted traveller today creates more orders tomorrow."
                </p>
                <p className="text-blue-100 text-sm mt-2">The flywheel turns stock into revenue — and revenue into growth.</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </SlideWrapper>
  );
}

// SLIDE 11: How the Partnership Works
function SlideGetStarted() {
  return (
    <SlideWrapper>
      <div className="flex-1 flex flex-col justify-center px-5 py-6 md:px-12 md:py-6 relative">
        <GridBg />
        <div className="relative z-10">
          <div className="mb-5 text-center">
            <span className="text-blue-600 text-sm font-semibold uppercase tracking-widest">How the Partnership Works</span>
            <h2 className="text-xl md:text-3xl font-heading font-bold text-[#0a0f1e] mt-2">
              A Lightweight Collaboration.<br /><span className="text-blue-600">No Logistics, No Cost, No Risk.</span>
            </h2>
            <p className="text-slate-500 mt-2 max-w-3xl mx-auto text-sm">DutyBoost does the activation. Suppliers do what they already do — supply great products. Here's how we work together.</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-5 mb-5">
            <div className="bg-slate-50 border border-slate-200 rounded-2xl p-5">
              <h3 className="font-bold text-slate-800 mb-3">What DutyBoost Handles</h3>
              <div className="space-y-2.5 text-sm">
                {[
                  { Icon: TravelerIcon, text: "Pre-activating travellers through Travel & Corporate Partners before arrival" },
                  { Icon: DollarSign, text: "DutyCredit distribution and traveller incentive mechanics" },
                  { Icon: BarChart3, text: "POS validation of qualifying transactions" },
                  { Icon: RefreshCw, text: "Conversion data and sell-through reporting per category" },
                ].map((row, i) => (
                  <div key={i} className="flex items-start gap-2">
                    <row.Icon className="w-4 h-4 text-blue-600 flex-shrink-0 mt-0.5" />
                    <span className="text-slate-700">{row.text}</span>
                  </div>
                ))}
              </div>
            </div>
            <div className="bg-blue-50 border border-blue-200 rounded-2xl p-5">
              <h3 className="font-bold text-blue-900 mb-3">What We Ask of Suppliers</h3>
              <div className="space-y-2.5 text-sm">
                {[
                  { Icon: Store, text: "Advocate DutyBoost activation with your retail customers" },
                  { Icon: Package, text: "Share category priorities so we align DutyCredit tiers with your product mix" },
                  { Icon: TrendingUp, text: "Highlight hero SKUs travellers should seek out" },
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
                { step: "1", title: "Introductory Call", desc: "A 30-minute conversation to understand your categories, retail customers and goals." },
                { step: "2", title: "Category Review", desc: "We align DutyCredit tiers and hero SKUs with your product mix and shelf presence." },
                { step: "3", title: "Retailer Introduction", desc: "We introduce DutyBoost to your retail customers and support their POS activation." },
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
              Partner With DutyBoost.<br />
              <span className="text-blue-600">Grow Your Incremental Volume.</span>
            </h2>
          </div>
          <p className="text-slate-600 text-sm md:text-base lg:text-lg max-w-3xl leading-relaxed mb-6">
            DutyBoost connects what already exists — your products on airport shelves, your retail customers, and 625K travellers who currently walk straight to the gate. By converting non-purchasing traffic into buyers, we turn slow shelf rotation into faster sell-through and more orders for you.
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 max-w-3xl w-full mb-6">
            {[
              { Icon: Package, title: "Products Already Stocked", desc: "DutyBoost works with the inventory already on airport shelves — no new listing required." },
              { Icon: TrendingUp, title: "More Sell-Through", desc: "Pre-activated travellers buy your categories — incremental volume from existing traffic." },
              { Icon: DollarSign, title: "More Orders, More Revenue", desc: "Faster rotation means retailers reorder sooner, growing your volume at no cost." },
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
              Ready to turn a percentage of the 625K non-purchasing travellers into incremental supplier volume?
            </p>
            <p className="text-blue-50 text-sm">
              Performance-based. Zero upfront cost. More passengers converted → more products sold → faster stock rotation → more orders → more revenue for you.
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

function SlideTierMix() {
  return <TierMixSlide currency="$" />;
}

const SLIDE_COMPONENTS = {
  cover: SlideCover,
  team: SlideTeam,
  problem: SlideProblem,
  solution: SlideSolution,
  market: SlideMarket,
  conversion: SlideConversion,
  tierMix: SlideTierMix,
  valueChain: SlideValueChain,
  transaction: SlideTransaction,
  category: SlideCategory,
  flywheel: SlideFlywheel,
  getStarted: SlideGetStarted,
  thankYou: SlideThankYou,
};

export default function RetailerSupplierPitchDeckSxm() {
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
          DutyBoost — Sint Maarten Retail Supplier Presentation 2026 <span className="text-xs opacity-50 ml-2 hidden sm:inline">CONFIDENTIAL</span>
        </div>
        <div className="flex items-center gap-3">
          <PitchDeckDownloadButtons
            slides={SLIDES}
            components={SLIDE_COMPONENTS}
            filename="DutyBoost-Sint-Maarten-Supplier-Presentation"
          />
          <div className="text-slate-400 text-sm">{current + 1} / {SLIDES.length}</div>
        </div>
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