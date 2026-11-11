import { useState, useEffect, useRef } from "react";
import PitchDeckDownloadButtons from "@/components/pitch/PitchDeckDownloadButtons";
import { ChevronLeft, ChevronRight, ArrowRight, CheckCircle, BarChart3, Plug, ShieldCheck, Globe, Wallet, Gift } from "lucide-react";
import DutyBoostLogo from "@/components/DutyBoostLogo";
import PositioningLine from "@/components/shared/PositioningLine";
import { SlideSolution } from "@/components/shared/SlideSolution";
import TravelAgencyIcon from "@/components/TravelAgencyIcon";
import HotelIcon from "@/components/HotelIcon";
import CarRentalIcon from "@/components/CarRentalIcon";

const SLIDES = [
  { id: "cover", type: "cover" },
  { id: "opportunity", type: "opportunity" },
  { id: "problem", type: "problem" },
  { id: "solution", type: "solution" },
  { id: "howItWorks", type: "howItWorks" },
  { id: "economics", type: "economics" },
  { id: "scale", type: "scale" },
  { id: "benefits", type: "benefits" },
  { id: "integrate", type: "integrate" },
  { id: "getStarted", type: "getStarted" },
];

const SLIDE_LABELS = {
  cover: "Cover",
  opportunity: "The Opportunity",
  problem: "The Facts",
  solution: "The Solution",
  howItWorks: "How It Works",
  economics: "Transaction Economics",
  scale: "Revenue at Scale",
  benefits: "Strategic Benefits",
  integrate: "Integration Simplicity",
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
      backgroundImage: "linear-gradient(rgba(16,185,129,0.4) 1px, transparent 1px), linear-gradient(90deg, rgba(16,185,129,0.4) 1px, transparent 1px)",
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
          style={{ background: "radial-gradient(circle, #10b981 0%, transparent 70%)" }} />
        <div className="relative z-10 flex flex-col items-center gap-8 lg:gap-16">
          <div className="bg-white rounded-2xl px-8 py-4 shadow-2xl">
            <DutyBoostLogo height={50} linkTo="/get-started?from=agency" />
          </div>
          <div>
            <PositioningLine dark className="mb-3" />
            <h1 className="text-3xl md:text-5xl lg:text-6xl font-heading font-bold text-white leading-tight mb-4">
              Earn From Every Booking.<br />
              <span className="text-emerald-400">Never Pay. Only Earn.</span>
            </h1>
            <p className="text-xl lg:text-2xl text-slate-300 max-w-3xl leading-relaxed">
              A presentation for Travel Partners — Flights, Accommodation & Car Rental
            </p>
          </div>
          <div className="flex flex-wrap items-start justify-center gap-x-6 sm:gap-x-12 lg:gap-x-16 gap-y-4 mt-4 w-full max-w-xl lg:max-w-4xl">
            {[
              { label: "Partner Commission", value: "0.5%" },
              { label: "Cost Model", value: "You never pay" },
              { label: "Setup Fee", value: "€0" },
            ].map((s) => (
              <div key={s.label} className="flex flex-col items-center text-center">
                <div className="text-xl sm:text-3xl lg:text-5xl font-bold text-emerald-400 whitespace-nowrap">{s.value}</div>
                <div className="text-xs sm:text-sm lg:text-lg text-slate-400 mt-1 whitespace-nowrap">{s.label}</div>
              </div>
            ))}
          </div>
          <div className="mt-2 text-xs text-slate-500 border border-slate-700 rounded px-4 py-2">
            CONFIDENTIAL — 2026 | Chamber of Commerce: 42053188 | VAT: NL869492068B01
          </div>
        </div>
      </div>
    </SlideWrapper>
  );
}

// SLIDE 2: The Opportunity
function SlideOpportunity() {
  return (
    <SlideWrapper dark>
      <div className="flex-1 flex flex-col justify-center px-5 py-6 md:px-12 md:py-6 relative">
        <GridBg />
        <div className="relative z-10">
          <div className="mb-5 lg:mb-10">
            <span className="text-emerald-400 text-sm font-semibold uppercase tracking-widest">The Opportunity</span>
            <h2 className="text-xl md:text-3xl lg:text-4xl font-heading font-bold text-white mt-2">
              Your Travellers Spend at Airports.<br /><span className="text-emerald-400">That Revenue Never Comes Back to You.</span>
            </h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-5 lg:gap-7 mb-5 lg:mb-8">
            {[
              { val: "9.8B", label: "Global passenger movements in 2025", sub: "ACI World — your travellers are among them" },
              { val: "€68.2B", label: "Global duty-free & travel retail sales", sub: "Generated by travellers you already book" },
              { val: "73%", label: "Of passengers never buy", sub: "27% purchase penetration benchmark — m1nd-set / TFWA" },
            ].map((s) => (
              <div key={s.label} className="bg-white/5 border border-white/10 rounded-2xl p-5 lg:p-7">
                <div className="text-3xl md:text-4xl lg:text-5xl font-bold text-emerald-400 mb-2">{s.val}</div>
                <div className="text-white font-semibold text-sm lg:text-base">{s.label}</div>
                <div className="text-slate-400 text-xs lg:text-sm mt-1">{s.sub}</div>
              </div>
            ))}
          </div>
          <div className="bg-gradient-to-br from-emerald-900/40 to-green-900/40 border border-emerald-500/30 rounded-2xl p-5 lg:p-7">
            <h3 className="text-white font-bold text-lg mb-3">The Travel Partner Position</h3>
            <p className="text-slate-300 text-sm lg:text-base leading-relaxed">
              Travel Partners capture the booking — but the traveller’s downstream airport spend has always belonged to the retailer alone. DutyBoost redirects a share of that spend back to the partner who sent the traveller, turning every booking into a new, passive, performance-based revenue stream at zero cost to the partner or its travellers.
            </p>
          </div>
        </div>
      </div>
    </SlideWrapper>
  );
}

// SLIDE 3: The Problem
function SlideProblem() {
  return (
    <SlideWrapper>
      <div className="flex-1 flex flex-col justify-center px-5 py-6 md:px-12 md:py-6">
        <div className="mb-5">
          <span className="text-emerald-600 text-sm font-semibold uppercase tracking-widest">The Facts</span>
          <h2 className="text-xl md:text-3xl font-heading font-bold text-[#0a0f1e] mt-2">
            You Book the Trip. <span className="text-emerald-600">The Airport Keeps the Upside.</span>
          </h2>
          <p className="text-slate-500 mt-1 text-sm">Travel partners own the relationship at the moment of booking — then lose the traveller to the airport retail economy they helped create.</p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5 mb-5">
          <div className="bg-red-50 border border-red-200 rounded-2xl p-5">
            <h3 className="font-bold text-red-900 mb-3">What Travel Partners Lose Today</h3>
            <ul className="space-y-2.5 text-sm">
              {[
                "Travellers you book spend at airport shops — you earn nothing",
                "Loyalty programmes are costly to run and rarely drive real spend",
                "Discount perks are generic and rarely tied to actual purchases",
                "Your booking margin is under pressure — new revenue is scarce",
                "You have no presence in the traveller’s airport journey",
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
                { t: "Broken revenue link", d: "The booking triggers the journey — but airport spend never flows back upstream." },
                { t: "Weak loyalty ROI", d: "Points and miles cost money to issue and rarely convert to measurable purchase behaviour." },
                { t: "No airport presence", d: "Between booking and boarding, the partner disappears from the traveller’s journey." },
                { t: "Margin pressure", d: "Booking margins compress with no adjacent revenue line to offset them." },
              ].map((row, i) => (
                <li key={i} className="flex items-start gap-3">
                  <div className="w-7 h-7 rounded-full bg-emerald-100 text-emerald-700 flex items-center justify-center text-xs font-bold flex-shrink-0">{i + 1}</div>
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
            The opportunity is not another loyalty scheme — it is to <span className="text-emerald-300 font-semibold">redirect a share of your travellers’ real airport spend back to you</span>, by giving them a genuine discount that activates only at the point of purchase.
          </p>
        </div>
      </div>
    </SlideWrapper>
  );
}

// SLIDE 4: The Solution — imported from @/components/shared/SlideSolution

// SLIDE 5: How It Works for the Travel Partner
function SlideHowItWorks() {
  return (
    <SlideWrapper>
      <div className="flex-1 flex flex-col justify-center px-5 py-6 md:px-12 md:py-6">
        <div className="mb-5">
          <span className="text-emerald-600 text-sm font-semibold uppercase tracking-widest">For the Travel Partner</span>
          <h2 className="text-xl md:text-3xl font-heading font-bold text-[#0a0f1e] mt-2">
            One Snippet. <span className="text-emerald-600">A New Passive Income Stream.</span>
          </h2>
          <p className="text-slate-500 mt-1 text-sm">No subscription. No setup fee. No cost to your travellers. You earn a 20% share of DutyBoost’s 2.5% fee — 0.5% of every validated airport basket — paid monthly.</p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-5 mb-6">
          {[
            {
              icon: <Plug className="w-8 h-8 text-emerald-600" />,
              title: "Issue DutyCredits",
              desc: "Add a lightweight snippet to your booking flow. Each booking issues a DutyCredit the traveller can use at participating airport retailers.",
              cardCls: "bg-emerald-50 border-emerald-200",
              titleCls: "text-emerald-900",
              bodyCls: "text-emerald-800",
            },
            {
              icon: <Gift className="w-8 h-8 text-orange-600" />,
              title: "Give a Genuine Discount",
              desc: "Your traveller receives a real, spend-linked airport discount — funded by the retailer, never by you.",
              cardCls: "bg-orange-50 border-orange-200",
              titleCls: "text-orange-900",
              bodyCls: "text-orange-800",
            },
            {
              icon: <Wallet className="w-8 h-8 text-green-600" />,
              title: "Earn on Redemption",
              desc: "When your traveller redeems, you earn 0.5% of the basket (max €5/tx). DutyBoost pays you monthly — out of its own fee.",
              cardCls: "bg-green-50 border-green-200",
              titleCls: "text-green-900",
              bodyCls: "text-green-800",
            },
          ].map((card, i) => (
            <div key={i} className={`${card.cardCls} border rounded-2xl p-5`}>
              <div className="mb-3">{card.icon}</div>
              <div className={`font-bold ${card.titleCls} mb-2`}>{card.title}</div>
              <div className={`${card.bodyCls} text-sm leading-relaxed`}>{card.desc}</div>
            </div>
          ))}
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          <div className="bg-slate-800 text-white rounded-2xl p-5">
            <h3 className="font-bold mb-3">What DutyBoost Is NOT for the Travel Partner</h3>
            <div className="space-y-2 text-sm">
              {[
                ["❌", "A loyalty programme you must build and fund"],
                ["❌", "A points or miles scheme with liability"],
                ["❌", "A paid partnership or sponsorship deal"],
                ["❌", "A discount you fund out of your margin"],
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
            <h3 className="font-bold text-green-900 mb-3">What DutyBoost IS for the Travel Partner</h3>
            <div className="space-y-2 text-sm">
              {[
                ["✅", "A new passive income stream from existing bookings"],
                ["✅", "A genuine, retailer-funded traveller discount"],
                ["✅", "A loyalty booster at zero cost to you"],
                ["✅", "Attributed, transparent monthly payouts"],
                ["✅", "One snippet across flights, hotels and car rental"],
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
function SlideEconomics() {
  return (
    <SlideWrapper dark>
      <div className="flex-1 flex flex-col justify-center px-5 py-6 md:px-12 md:py-6 relative">
        <GridBg />
        <div className="relative z-10">
          <div className="mb-5">
            <span className="text-emerald-400 text-sm font-semibold uppercase tracking-widest">Transaction Economics</span>
            <h2 className="text-xl md:text-3xl font-heading font-bold text-white mt-2">
              €20 Entry-Tier Airport Basket — <span className="text-emerald-400">Where Your Commission Comes From</span>
            </h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <div className="bg-white/5 border border-white/10 rounded-2xl p-5 mb-4">
                <div className="space-y-2">
                  {[
                    { label: "Original qualifying retail value", val: "€20.00", style: "text-white font-bold text-lg" },
                    { label: "Traveller DutyCredit saving (5%)", val: "€1.00", style: "text-orange-300" },
                    { label: "Traveller actually pays", val: "€19.00", style: "text-blue-300" },
                    { label: "DutyBoost platform fee (2.5%)", val: "€0.50", style: "text-slate-400" },
                    { label: "  → Travel Partner commission (20% of fee)", val: "€0.10", style: "text-emerald-300" },
                  ].map((row, i) => (
                    <div key={i} className={`flex justify-between items-center py-1 border-b border-white/5 ${i === 0 ? "pb-2 mb-1" : ""}`}>
                      <span className={`text-sm ${row.label.startsWith("  ") ? "pl-4 text-slate-500" : "text-slate-300"}`}>{row.label.trim()}</span>
                      <span className={`text-sm font-semibold ${row.style}`}>{row.val}</span>
                    </div>
                  ))}
                  <div className="flex justify-between items-center py-2 mt-1 bg-green-900/40 rounded-xl px-3">
                    <span className="text-green-300 font-bold text-sm">Airport Retailer net before normal costs</span>
                    <span className="text-green-300 font-bold text-xl">€18.50</span>
                  </div>
                </div>
              </div>
              <div className="bg-white/5 border border-white/10 rounded-2xl p-4">
                <div className="text-slate-400 text-xs uppercase tracking-wide mb-2">Platform fee distribution on €0.50</div>
                <div className="flex h-5 rounded-full overflow-hidden gap-px">
                  <div className="bg-emerald-500" style={{ width: "20%" }} title="Travel Partner 20%" />
                  <div className="bg-blue-500" style={{ width: "80%" }} title="DutyBoost 80%" />
                </div>
                <div className="flex gap-3 mt-2 flex-wrap text-xs">
                  {[
                    { color: "bg-emerald-500", label: "Travel Partner 20% (€0.10)" },
                    { color: "bg-blue-500", label: "DutyBoost 80% (€0.40)" },
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
              <div className="bg-gradient-to-br from-emerald-900/50 to-green-900/50 border border-emerald-500/30 rounded-2xl p-6">
                <h3 className="text-white font-bold text-lg mb-3">The Core Question</h3>
                <p className="text-emerald-200 text-base leading-relaxed font-semibold">
                  “Is earning €0.10 on every €20 your travellers spend at airports — with zero cost, zero effort and zero liability — a meaningful new revenue line from bookings you already make?”
                </p>
                <p className="text-emerald-400 font-bold text-lg mt-3">Yes — and it grows with your volume.</p>
              </div>
              <div className="bg-white/5 border border-white/10 rounded-2xl p-5">
                <h3 className="text-white font-semibold mb-3">Why the economics work for you</h3>
                <div className="space-y-2 text-sm">
                  {[
                    { item: "You already make the booking", val: "€0 marginal cost", sub: "Issuing a DutyCredit is one snippet call" },
                    { item: "Discount is retailer-funded", val: "€0 to your travellers", sub: "No discount liability on your books" },
                    { item: "Capped at €5 per transaction", val: "Predictable payout", sub: "Higher baskets still earn, up to the cap" },
                  ].map((row, i) => (
                    <div key={i} className="flex justify-between items-center p-2 rounded-lg">
                      <div>
                        <div className="text-slate-300">{row.item}</div>
                        <div className="text-slate-500 text-xs">{row.sub}</div>
                      </div>
                      <span className="font-bold text-emerald-300">{row.val}</span>
                    </div>
                  ))}
                </div>
                <p className="text-slate-400 text-xs mt-3">Paid monthly by DutyBoost — out of its own fee. Never a cost to you or your travellers.</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </SlideWrapper>
  );
}

// SLIDE 7: Revenue at Scale
function SlideScale() {
  return (
    <SlideWrapper>
      <div className="flex-1 flex flex-col justify-center px-5 py-6 md:px-12 md:py-6">
        <div className="mb-5">
          <span className="text-emerald-600 text-sm font-semibold uppercase tracking-widest">Your Passive Revenue</span>
          <h2 className="text-xl md:text-3xl font-heading font-bold text-[#0a0f1e] mt-2">
            What DutyBoost Brings <span className="text-emerald-600">to Your Bookings</span>
          </h2>
          <p className="text-slate-500 mt-1 text-sm">Estimated annual travel-partner commission (0.5% of basket, max €5/tx) at a 20% redemption rate, using a blended €60 average airport basket.</p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-5 mb-5">
          {[
            { size: "Boutique Partner", stores: "1,000 bookings/mo", conv: "20% redemption", net: "€720", cardCls: "bg-emerald-50 border-emerald-200", titleCls: "text-emerald-600", valueCls: "text-emerald-700", subCls: "text-emerald-600" },
            { size: "Regional Partner", stores: "10,000 bookings/mo", conv: "20% redemption", net: "€7,200", cardCls: "bg-green-50 border-green-200", titleCls: "text-green-600", valueCls: "text-green-700", subCls: "text-green-600" },
            { size: "Enterprise Partner", stores: "100,000 bookings/mo", conv: "20% redemption", net: "€72,000", cardCls: "bg-teal-50 border-teal-200", titleCls: "text-teal-600", valueCls: "text-teal-700", subCls: "text-teal-600" },
          ].map((s) => (
            <div key={s.size} className={`${s.cardCls} border rounded-2xl p-5 text-center`}>
              <div className={`text-xs font-semibold ${s.titleCls} uppercase tracking-wide mb-1`}>{s.size}</div>
              <div className="text-slate-500 text-sm mb-3">{s.stores}</div>
              <div className={`text-2xl md:text-3xl font-bold ${s.valueCls} mb-1`}>{s.net}</div>
              <div className={`${s.subCls} text-sm font-medium mb-2`}>annual partner commission</div>
              <div className="text-slate-500 text-xs border-t border-slate-200 pt-2">{s.conv} @ €60 blended basket</div>
            </div>
          ))}
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          <div className="bg-slate-800 text-white rounded-2xl p-5">
            <h3 className="font-bold mb-3">It Scales With Redemption Rate</h3>
            <div className="space-y-2 text-sm">
              {[
                { pp: "10% redemption", mult: "½× the figures above" },
                { pp: "20% redemption", mult: "the figures above" },
                { pp: "30% redemption", mult: "1.5× the figures above" },
                { pp: "40% redemption", mult: "2× the figures above" },
              ].map((row, i) => (
                <div key={i} className={`flex justify-between items-center py-1.5 px-3 rounded-lg ${i === 1 ? "bg-emerald-800/50 font-semibold" : ""}`}>
                  <span className="text-emerald-300">{row.pp}</span>
                  <span className="text-slate-300">{row.mult}</span>
                </div>
              ))}
            </div>
          </div>
          <div className="bg-gradient-to-br from-emerald-50 to-green-50 border border-emerald-200 rounded-2xl p-5">
            <h3 className="font-bold text-emerald-900 mb-3">Why This Is Pure Upside</h3>
            <ul className="space-y-2 text-sm">
              {[
                "100% passive — earned from bookings you already make",
                "Zero cost — no setup fee, no subscription, no discount liability",
                "No change to your booking flow, pricing or brand",
                "Attributed & paid monthly, transparently per redemption",
              ].map((item, i) => (
                <li key={i} className="flex items-start gap-2">
                  <CheckCircle className="w-4 h-4 text-emerald-600 flex-shrink-0 mt-0.5" />
                  <span className="text-emerald-800">{item}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </SlideWrapper>
  );
}

// SLIDE 8: Strategic Benefits
function SlideBenefits() {
  return (
    <SlideWrapper dark>
      <div className="flex-1 flex flex-col justify-center px-5 py-6 md:px-12 md:py-6 relative">
        <GridBg />
        <div className="relative z-10">
          <div className="mb-5 lg:mb-8">
            <span className="text-emerald-400 text-sm font-semibold uppercase tracking-widest">Strategic Benefits</span>
            <h2 className="text-xl md:text-3xl lg:text-4xl font-heading font-bold text-white mt-2">
              More Than Commission —<br /><span className="text-emerald-400">A Loyalty & Revenue Engine</span>
            </h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 lg:gap-6">
            {[
              { icon: <Wallet className="w-7 h-7 text-emerald-400" />, title: "New Passive Income", desc: "A commission on every validated redemption — revenue from bookings you already make, with no extra work." },
              { icon: <Gift className="w-7 h-7 text-orange-400" />, title: "Stronger Loyalty", desc: "Give travellers a genuine, retailer-funded airport discount — a tangible perk that reinforces your brand." },
              { icon: <ShieldCheck className="w-7 h-7 text-green-400" />, title: "Zero Cost, Zero Risk", desc: "No setup fee, no subscription, no discount liability. You always earn and never pay." },
              { icon: <Globe className="w-7 h-7 text-blue-400" />, title: "Own the Pre-Airport Moment", desc: "Re-enter the traveller’s journey between booking and boarding — the moment that drives airport spend." },
              { icon: <Plug className="w-7 h-7 text-emerald-400" />, title: "One Snippet, All Verticals", desc: "A single integration works across flights, accommodation and car rental — one revenue line from every booking type." },
              { icon: <BarChart3 className="w-7 h-7 text-green-400" />, title: "Transparent Monthly Payouts", desc: "Every redemption is attributed and reported — clean, predictable monthly commission from DutyBoost." },
            ].map((card, i) => (
              <div key={i} className="bg-white/5 border border-white/10 rounded-2xl p-5">
                <div className="mb-3">{card.icon}</div>
                <div className="text-white font-bold mb-2">{card.title}</div>
                <div className="text-slate-400 text-sm leading-relaxed">{card.desc}</div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </SlideWrapper>
  );
}

// SLIDE 9: Integration Simplicity
function SlideIntegrate() {
  return (
    <SlideWrapper dark>
      <div className="flex-1 flex flex-col justify-center px-5 py-6 md:px-12 md:py-6 relative">
        <GridBg />
        <div className="relative z-10">
          <div className="mb-5 lg:mb-10">
            <span className="text-emerald-400 text-sm font-semibold uppercase tracking-widest">Integration Simplicity</span>
            <h2 className="text-xl md:text-3xl lg:text-4xl font-heading font-bold text-white mt-2">
              One Lightweight Snippet.<br /><span className="text-emerald-400">Every Booking Activated.</span>
            </h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 lg:gap-8 items-center">
            <div className="bg-white/5 border border-white/10 rounded-2xl p-5 lg:p-7">
              <h3 className="text-white font-bold lg:text-lg mb-4">DutyBoost Sits Beside Your Booking Flow — Not Against It</h3>
              <div className="space-y-3">
                {[
                  { icon: <CheckCircle className="w-4 h-4 text-green-400" />, text: "Your booking system remains the system of record" },
                  { icon: <CheckCircle className="w-4 h-4 text-green-400" />, text: "DutyBoost adds a single snippet to issue DutyCredits" },
                  { icon: <CheckCircle className="w-4 h-4 text-green-400" />, text: "No replacement of booking, payment or CRM systems" },
                  { icon: <CheckCircle className="w-4 h-4 text-green-400" />, text: "One snippet works across flights, hotels and car rental" },
                  { icon: <CheckCircle className="w-4 h-4 text-green-400" />, text: "Reusable across markets — lower marginal onboarding cost" },
                ].map((item, i) => (
                  <div key={i} className="flex items-start gap-3">
                    <div className="flex-shrink-0 mt-0.5">{item.icon}</div>
                    <span className="text-slate-300 text-sm">{item.text}</span>
                  </div>
                ))}
              </div>
            </div>
            <div className="bg-gradient-to-br from-emerald-900/60 to-green-900/60 border border-emerald-500/30 rounded-2xl p-5 lg:p-7">
              <h3 className="text-white font-bold text-xl lg:text-2xl mb-2">ONE SNIPPET</h3>
              <p className="text-emerald-200 text-sm lg:text-base leading-relaxed mb-3 lg:mb-5">
                A single, lightweight snippet in your booking flow issues a DutyCredit to every traveller — turning every booking type into a passive, redemption-linked commission stream.
              </p>
              <div className="grid grid-cols-3 gap-3 text-center">
                {[
                  { icon: <TravelAgencyIcon className="w-7 h-7 text-emerald-300 mx-auto" />, label: "Flights" },
                  { icon: <HotelIcon className="w-7 h-7 text-emerald-300 mx-auto" />, label: "Hotels" },
                  { icon: <CarRentalIcon className="w-7 h-7 text-emerald-300 mx-auto" />, label: "Car Rental" },
                ].map((s) => (
                  <div key={s.label} className="bg-white/5 rounded-xl p-3">
                    <div className="flex justify-center">{s.icon}</div>
                    <div className="text-slate-400 text-xs mt-2">{s.label}</div>
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

// SLIDE 10: Value Realized Quickly
function SlideGetStarted() {
  return (
    <SlideWrapper dark>
      <div className="flex-1 flex flex-col justify-center px-5 py-6 md:px-12 md:py-6 relative">
        <GridBg />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] rounded-full opacity-10"
          style={{ background: "radial-gradient(circle, #10b981 0%, transparent 70%)" }} />
        <div className="relative z-10 text-center">
          <div className="flex justify-center mb-4 lg:mb-6">
            <div className="bg-white rounded-2xl px-6 py-3 shadow-xl">
              <DutyBoostLogo height={40} linkTo="/get-started?from=agency" />
            </div>
          </div>
          <div className="mb-4 lg:mb-6">
            <span className="text-emerald-400 text-sm font-semibold uppercase tracking-widest">Value Realized Quickly</span>
            <h2 className="text-xl md:text-4xl lg:text-4xl font-heading font-bold text-white mt-2 leading-tight">
              Fast to Launch.<br />
              <span className="text-emerald-400">Faster to Passive Income.</span>
            </h2>
          </div>
          <p className="text-slate-300 text-sm md:text-base lg:text-lg max-w-3xl mx-auto leading-relaxed mb-4 lg:mb-6">
            DutyBoost is designed to deliver measurable added value to your booking flow in a very short time — no lengthy rollout, no upfront investment, no operational disruption.
          </p>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3 lg:gap-4 max-w-3xl lg:max-w-4xl mx-auto mb-4 lg:mb-6">
            {[
              { title: "Weeks, Not Months", desc: "A single lightweight snippet — no replacement of your booking system, pricing or brand." },
              { title: "Commission From Day One", desc: "Once live, every redemption by your travellers earns your 20% share — paid monthly by DutyBoost." },
              { title: "Revenue From the 90%+ Who Never Buy", desc: "DutyBoost activates non-intending passengers — turning your travellers into incremental airport spenders." },
              { title: "A Stronger Loyalty Story", desc: "Give a genuine, retailer-funded discount — a tangible perk that reinforces every booking you make." },
            ].map((card, i) => (
              <div key={i} className="bg-white/5 border border-white/10 rounded-2xl p-4 lg:p-5 text-left">
                <div className="text-emerald-300 font-bold lg:text-base mb-1.5">{card.title}</div>
                <div className="text-slate-400 text-xs lg:text-sm leading-relaxed">{card.desc}</div>
              </div>
            ))}
          </div>
          <div className="flex flex-col items-center gap-1.5">
            <p className="text-emerald-400 text-base lg:text-xl font-bold">
              No setup fee. No subscription. No risk. Only passive income — connected.
            </p>
            <p className="text-slate-300 text-sm lg:text-base font-semibold">
              Always performance-based — earn a 20% share of the DutyBoost Platform Fee on every validated redemption.
            </p>
          </div>
        </div>
      </div>
    </SlideWrapper>
  );
}

const SLIDE_COMPONENTS = {
  cover: SlideCover,
  opportunity: SlideOpportunity,
  problem: SlideProblem,
  solution: SlideSolution,
  howItWorks: SlideHowItWorks,
  economics: SlideEconomics,
  scale: SlideScale,
  benefits: SlideBenefits,
  integrate: SlideIntegrate,
  getStarted: SlideGetStarted,
};

export default function TravelPartnerPitchDeck() {
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
          DutyBoost — Travel Partner Presentation 2026 <span className="text-xs opacity-50 ml-2 hidden sm:inline">CONFIDENTIAL</span>
        </div>
        <div className="flex items-center gap-3">
          <PitchDeckDownloadButtons
            slides={SLIDES}
            components={SLIDE_COMPONENTS}
            filename="DutyBoost-Travel-Partner-Presentation"
          />
          <div className="text-slate-400 text-sm">{current + 1} / {SLIDES.length}</div>
        </div>
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
                i === current ? "bg-emerald-600 text-white" : "bg-white/10 text-slate-400 hover:bg-white/20 hover:text-white"
              }`}
            >
              {i + 1}
            </button>
          ))}
        </div>
        <button
          onClick={next}
          disabled={current === SLIDES.length - 1}
          className="flex items-center gap-2 px-6 py-3.5 rounded-xl bg-emerald-600 text-white hover:bg-emerald-700 disabled:opacity-30 disabled:cursor-not-allowed transition-colors text-base font-semibold cursor-pointer select-none"
        >
          Next <ChevronRight size={18} />
        </button>
      </div>
      <div className="mt-1.5 text-slate-500 text-sm">{SLIDE_LABELS[slide.type]}</div>
    </div>
  );
}