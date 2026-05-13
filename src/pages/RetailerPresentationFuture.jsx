import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { exportRetailerPptx } from "@/utils/exportRetailerPptx";
import {
  Download, TrendingUp, Store, Plane, Hotel, Car,
  CheckCircle2, ArrowRight, Users, BarChart3, Zap, Globe
} from "lucide-react";

const SLIDES_PREVIEW = [
  {
    id: "cover",
    label: "Cover",
    title: "The Future of Airport Retail",
    sub: "with DutyBoost",
    bg: "from-green-950 to-orange-950",
    accent: "text-orange-300",
    },
    {
    id: "opportunity",
    label: "The Opportunity",
    title: "Airport retail: a €40B+ market with a conversion problem",
    sub: "72% of travelers browse but don't buy · Source: TFWA",
    bg: "from-white to-blue-50",
    accent: "text-blue-700",
  },
  {
    id: "how",
    label: "How It Works",
    title: "Pre-qualified buyers. Delivered to your store.",
    sub: "4-step process · QR scan · Performance only",
    bg: "from-green-950 to-orange-950",
    accent: "text-orange-300",
  },
  {
    id: "discount-tiers",
    label: "DutyCredit Discount Layer",
    title: "What the traveler receives — how the discount works",
    sub: "4 tiers · Min. basket €70 · Auto-applied at checkout · Single use",
    bg: "from-white to-blue-50",
    accent: "text-blue-700",
  },
  {
    id: "retailer-value",
    label: "Retailer Value",
    title: "More sales. Zero upfront cost.",
    sub: "2.5% fee per completed transaction only",
    bg: "from-white to-orange-50",
    accent: "text-orange-600",
  },
  {
    id: "channel-travel",
    label: "Channel: Travel Partners & Airlines",
    title: "Travel Agencies, OTAs & Airlines",
    sub: "1.4B+ bookings/year · 4.5B passengers/year · 60–85% email open rate",
    bg: "from-white to-blue-50",
    accent: "text-blue-700",
  },
  {
    id: "channel-hotels",
    label: "Channel: Accommodations",
    title: "Accommodations — The Departure Moment",
    sub: "2B+ room nights/year globally · Underutilised check-out email",
    bg: "from-white to-green-50",
    accent: "text-green-700",
  },
  {
    id: "channel-carrental",
    label: "Channel: Car Rental",
    title: "Car Rental — Every Booking a Departure Moment",
    sub: "115M+ rentals/year in Europe · 70–85% email open rate",
    bg: "from-white to-orange-50",
    accent: "text-orange-600",
  },
  {
    id: "revenue",
    label: "Revenue Model",
    title: "What all channels mean for 1 store",
    sub: "€384,000 gross · €9,600 total fees · ROI: 40:1",
    bg: "from-green-950 to-orange-950",
    accent: "text-orange-300",
  },
  {
    id: "integration",
    label: "Integration",
    title: "Simple by design. Live in days.",
    sub: "No POS overhaul · Any device · Optional API",
    bg: "from-green-950 to-orange-950",
    accent: "text-orange-300",
  },
  {
    id: "pilot",
    label: "Pilot Plan",
    title: "Pilot: 1–3 stores. Zero risk. Real results.",
    sub: "Phase 1 → Phase 2 → Phase 3",
    bg: "from-white to-blue-50",
    accent: "text-blue-700",
  },
  {
    id: "cta",
    label: "Get Started",
    title: "Ready to turn footfall into revenue?",
    sub: "hello@dutyboost.com · www.dutyboost.com",
    bg: "from-green-950 to-orange-950",
    accent: "text-orange-300",
  },
];

const CHANNELS = [
  {
    icon: Plane,
    label: "Travel Partners & Airlines",
    color: "bg-blue-100 text-blue-700",
    stats: ["1.4B+ agency bookings/year", "4.5B airline passengers/year", "60–85% email open rate"],
    value: "Largest combined channel · Agencies, OTAs & airlines send pre-motivated travelers with DutyCredits in hand.",
  },
  {
    icon: Hotel,
    label: "Accommodations",
    color: "bg-green-100 text-green-700",
    stats: ["2B+ room nights/year globally", "45–60% departure email open rate", "High-value guests"],
    value: "Check-out triggers spend · Guest holds DutyCredit valid at departure AND arrival airport stores.",
  },
  {
    icon: Car,
    label: "Car Rental",
    color: "bg-orange-100 text-orange-700",
    stats: ["115M+ rentals in Europe", "70–85% open rate", "14–28 day booking window"],
    value: "Natural airport association · DutyCredit valid at both departure and arrival — doubles the redemption window.",
  },
];

const RETAILER_BENEFITS = [
  { icon: CheckCircle2, text: "2.5% fee only on completed transactions — pure performance" },
  { icon: CheckCircle2, text: "Pre-motivated buyers arrive with DutyCredit in hand — min. basket €70" },
  { icon: CheckCircle2, text: "No POS overhaul — simple QR scan on any device" },
  { icon: CheckCircle2, text: "Real-time dashboard: scans, revenue, channel breakdown" },
  { icon: CheckCircle2, text: "Multiple income channels: travel partners, airlines, accommodations, car rental" },
  { icon: CheckCircle2, text: "Start with 1–3 stores — scale with no lock-in" },
];

export default function RetailerPresentationFuture() {
  const [downloading, setDownloading] = useState(false);

  const handleDownload = async () => {
    setDownloading(true);
    try {
      await exportRetailerPptx();
    } finally {
      setDownloading(false);
    }
  };

  return (
    <div className="min-h-screen bg-slate-900 text-white">

      {/* Header */}
      <div className="sticky top-0 z-50 bg-slate-900/95 backdrop-blur border-b border-slate-700 px-6 py-3 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <img
            src="https://media.base44.com/images/public/69c97dcd1c1950fa88424690/9a64855b0_ChatGPT_Image_Mar_30__2026__03_06_29_PM-removebg-preview.png"
            alt="DutyBoost"
            className="h-8 brightness-0 invert"
          />
          <div>
            <p className="text-sm font-semibold text-white leading-none">The Future of Airport Retail</p>
            <p className="text-xs text-slate-400">Airport Retailer Presentation · 12 slides</p>
          </div>
        </div>
        <div className="flex items-center gap-2">
          <a href="/retailer-calculator" target="_blank" rel="noopener noreferrer">
            <Button variant="outline" className="border-slate-600 text-slate-300 hover:bg-slate-700 hover:text-white gap-2">
              <BarChart3 className="w-4 h-4" />
              ROI Calculator
            </Button>
          </a>
          <Button
            onClick={handleDownload}
            disabled={downloading}
            className="bg-blue-600 hover:bg-blue-700 text-white gap-2"
          >
            <Download className="w-4 h-4" />
            {downloading ? "Generating..." : "Download PPTX"}
          </Button>
        </div>
      </div>

      <div className="max-w-6xl mx-auto px-6 py-10 space-y-12">

        {/* Hero */}
        <div className="text-center space-y-4">
          <Badge className="bg-blue-500/20 text-blue-300 border-blue-500/30 text-xs tracking-widest uppercase">
            Airport Retailer Presentation
          </Badge>
          <h1 className="text-4xl md:text-5xl font-bold text-white">The Future of Airport Retail</h1>
          <p className="text-xl text-orange-300 italic">with DutyBoost</p>
          <p className="text-slate-400 max-w-2xl mx-auto text-sm leading-relaxed">
            A performance-based revenue layer that sends pre-motivated travelers to your store — from travel agencies, airlines, accommodations, and car rental companies. You pay only when they spend.
          </p>
          <Button
            onClick={handleDownload}
            disabled={downloading}
            size="lg"
            className="bg-blue-600 hover:bg-blue-700 text-white gap-2 mt-4"
          >
            <Download className="w-5 h-5" />
            {downloading ? "Generating PPTX..." : "Download Full Presentation (.pptx)"}
          </Button>
        </div>

        {/* Slide Index */}
        <div>
          <p className="text-xs font-semibold text-slate-500 uppercase tracking-widest mb-4">Slide Overview — 12 slides</p>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3">
            {SLIDES_PREVIEW.map((slide, i) => (
              <div
                key={slide.id}
                className="bg-slate-800 border border-slate-700 rounded-xl p-4 hover:border-blue-500 transition-colors"
              >
                <div className="flex items-center gap-2 mb-2">
                  <span className="w-6 h-6 rounded-full bg-blue-500/20 text-blue-300 text-xs font-bold flex items-center justify-center shrink-0">{i + 1}</span>
                  <span className="text-xs text-blue-300 font-medium">{slide.label}</span>
                </div>
                <p className="text-xs text-white font-medium leading-snug">{slide.title}</p>
                <p className="text-xs text-slate-400 mt-1 leading-snug">{slide.sub}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Revenue Channels */}
        <div>
          <p className="text-xs font-semibold text-slate-500 uppercase tracking-widest mb-4">Revenue Channels Covered</p>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
            {CHANNELS.map(({ icon: Icon, label, color, stats, value }) => (
              <div key={label} className="bg-slate-800 border border-slate-700 rounded-2xl p-5 space-y-3">
                <div className="flex items-center gap-3">
                  <div className={`w-8 h-8 rounded-lg flex items-center justify-center ${color}`}>
                    <Icon className="w-4 h-4" />
                  </div>
                  <span className="font-semibold text-white text-sm">{label}</span>
                </div>
                <div className="flex flex-wrap gap-1.5">
                  {stats.map(s => (
                    <span key={s} className="text-xs bg-slate-700 text-slate-300 px-2 py-0.5 rounded-full">{s}</span>
                  ))}
                </div>
                <p className="text-xs text-slate-400 leading-relaxed">{value}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Retailer Partner Flow */}
        <div>
          <p className="text-xs font-semibold text-slate-500 uppercase tracking-widest mb-2">The Retailer Partner Flow — End to End</p>
          <p className="text-slate-400 text-sm mb-8 max-w-2xl">From the moment you sign up to receiving your monthly report — here is exactly what happens, step by step, and what you see in the app at each moment.</p>

          {/* Phase 1: Onboarding */}
          <div className="mb-10">
            <div className="flex items-center gap-3 mb-5">
              <div className="w-8 h-8 rounded-full bg-blue-600 flex items-center justify-center text-sm font-bold shrink-0">A</div>
              <div>
                <p className="font-bold text-white text-base">Phase A — You Sign Up & Get Activated</p>
                <p className="text-xs text-slate-400">Takes 5 minutes. No hardware purchase. No POS overhaul.</p>
              </div>
            </div>
            <div className="grid md:grid-cols-3 gap-4">
              {/* Step A1 */}
              <div className="bg-slate-800 border border-blue-800 rounded-2xl overflow-hidden">
                <div className="bg-blue-900/50 px-4 py-2 flex items-center gap-2 border-b border-blue-800">
                  <span className="text-xs font-bold text-blue-300 bg-blue-800 px-2 py-0.5 rounded-full">Step 1</span>
                  <span className="text-xs text-blue-200 font-medium">Register your store</span>
                </div>
                <div className="p-4 space-y-3">
                  <div className="bg-slate-900 rounded-xl p-3 space-y-2 border border-slate-700">
                    <p className="text-xs text-slate-400 uppercase tracking-wider font-semibold">Registration Form</p>
                    {["Store name", "Airport location", "Store category", "Contact email"].map(f => (
                      <div key={f} className="flex items-center gap-2">
                        <div className="h-6 flex-1 bg-slate-700 rounded border border-slate-600 px-2 flex items-center">
                          <span className="text-xs text-slate-500">{f}</span>
                        </div>
                      </div>
                    ))}
                    <button className="w-full bg-blue-600 text-white rounded-lg py-1.5 text-xs font-bold mt-1">Submit Application →</button>
                  </div>
                  <p className="text-xs text-slate-500 leading-relaxed">Fill in your store details at <span className="text-blue-400">dutyboost.com/get-started</span>. DutyBoost reviews and activates your account within 1 business day.</p>
                </div>
              </div>
              {/* Step A2 */}
              <div className="bg-slate-800 border border-blue-800 rounded-2xl overflow-hidden">
                <div className="bg-blue-900/50 px-4 py-2 flex items-center gap-2 border-b border-blue-800">
                  <span className="text-xs font-bold text-blue-300 bg-blue-800 px-2 py-0.5 rounded-full">Step 2</span>
                  <span className="text-xs text-blue-200 font-medium">Welcome email & login</span>
                </div>
                <div className="p-4 space-y-3">
                  <div className="bg-slate-900 rounded-xl border border-slate-700 overflow-hidden">
                    <div className="bg-slate-800 px-3 py-1.5 border-b border-slate-700 flex items-center gap-2">
                      <div className="w-3 h-3 rounded-full bg-blue-500"/>
                      <span className="text-xs text-slate-300 font-medium">Welcome to DutyBoost</span>
                    </div>
                    <div className="p-3 space-y-2">
                      <p className="text-xs text-slate-400">Hi Relay Store,</p>
                      <p className="text-xs text-slate-300 leading-relaxed">Your store is now <span className="text-green-400 font-semibold">live on DutyBoost</span>. Travelers visiting AMS with a DutyCredit can now redeem at your checkout.</p>
                      <div className="bg-blue-600 rounded-lg py-2 text-center">
                        <span className="text-xs font-bold text-white">→ Open Your Dashboard</span>
                      </div>
                      <div className="border-t border-slate-700 pt-2 space-y-1">
                        <p className="text-xs text-slate-500">Your scan URL: <span className="text-blue-400">app.dutyboost.com/scan</span></p>
                        <p className="text-xs text-slate-500">Works on any phone or tablet.</p>
                      </div>
                    </div>
                  </div>
                  <p className="text-xs text-slate-500 leading-relaxed">You receive login credentials and your personal scan link. Open it on any device with a camera — no app install needed.</p>
                </div>
              </div>
              {/* Step A3 */}
              <div className="bg-slate-800 border border-blue-800 rounded-2xl overflow-hidden">
                <div className="bg-blue-900/50 px-4 py-2 flex items-center gap-2 border-b border-blue-800">
                  <span className="text-xs font-bold text-blue-300 bg-blue-800 px-2 py-0.5 rounded-full">Step 3</span>
                  <span className="text-xs text-blue-200 font-medium">Your dashboard is ready</span>
                </div>
                <div className="p-4 space-y-2">
                  <div className="bg-slate-900 rounded-xl border border-slate-700 p-3 space-y-2">
                    <div className="flex items-center justify-between mb-1">
                      <p className="text-xs font-bold text-white">Relay Store · AMS T3</p>
                      <span className="text-xs bg-green-500/20 text-green-400 border border-green-500/30 px-2 py-0.5 rounded-full">ACTIVE</span>
                    </div>
                    <div className="grid grid-cols-2 gap-1.5">
                      {[
                        { l: "Today's Revenue", v: "€0", c: "text-green-400" },
                        { l: "Scans Today", v: "0", c: "text-blue-300" },
                        { l: "This Month", v: "€0", c: "text-purple-300" },
                        { l: "Avg. Basket", v: "—", c: "text-orange-300" },
                      ].map(({ l, v, c }) => (
                        <div key={l} className="bg-slate-800 rounded-lg p-2 border border-slate-700">
                          <p className="text-[10px] text-slate-500">{l}</p>
                          <p className={`text-sm font-bold ${c}`}>{v}</p>
                        </div>
                      ))}
                    </div>
                    <div className="bg-blue-500/10 border border-blue-500/20 rounded-lg p-2 text-center">
                      <p className="text-xs text-blue-300">Waiting for first DutyCredit redemption...</p>
                    </div>
                  </div>
                  <p className="text-xs text-slate-500 leading-relaxed">Your dashboard starts at zero and fills up as travelers redeem DutyCredits at your store. Everything is tracked automatically.</p>
                </div>
              </div>
            </div>
          </div>

          {/* Connector arrow */}
          <div className="flex items-center justify-center gap-3 mb-10">
            <div className="flex-1 h-px bg-gradient-to-r from-transparent via-slate-600 to-transparent"/>
            <div className="flex items-center gap-2 bg-slate-800 border border-slate-600 rounded-full px-4 py-1.5">
              <ArrowRight className="w-4 h-4 text-orange-400"/>
              <span className="text-xs text-slate-300 font-medium">A traveler with a DutyCredit arrives at your store</span>
              <ArrowRight className="w-4 h-4 text-orange-400"/>
            </div>
            <div className="flex-1 h-px bg-gradient-to-r from-transparent via-slate-600 to-transparent"/>
          </div>

          {/* Phase 2: At checkout */}
          <div className="mb-10">
            <div className="flex items-center gap-3 mb-5">
              <div className="w-8 h-8 rounded-full bg-orange-600 flex items-center justify-center text-sm font-bold shrink-0">B</div>
              <div>
                <p className="font-bold text-white text-base">Phase B — At Checkout: Scan & Validate</p>
                <p className="text-xs text-slate-400">The traveler shows their QR code. Your staff scans it. Takes under 10 seconds.</p>
              </div>
            </div>
            <div className="grid md:grid-cols-3 gap-4">
              {/* Traveler side */}
              <div className="bg-slate-800 border border-orange-800 rounded-2xl overflow-hidden">
                <div className="bg-orange-900/40 px-4 py-2 flex items-center gap-2 border-b border-orange-800">
                  <span className="text-xs font-bold text-orange-300 bg-orange-900 px-2 py-0.5 rounded-full">Traveler</span>
                  <span className="text-xs text-orange-200 font-medium">Shows QR code on phone</span>
                </div>
                <div className="p-4">
                  <div className="bg-gradient-to-b from-slate-900 to-slate-800 rounded-xl border border-slate-600 p-3 space-y-2">
                    <div className="flex items-center gap-2 border-b border-slate-700 pb-2">
                      <div className="w-6 h-6 rounded-full bg-blue-600 flex items-center justify-center text-xs font-bold">J</div>
                      <div>
                        <p className="text-xs font-semibold text-white">J. Martens</p>
                        <p className="text-[10px] text-slate-400">AMS → BCN · Departs today</p>
                      </div>
                    </div>
                    <p className="text-[10px] text-slate-400 text-center uppercase tracking-widest">Your DutyCredit</p>
                    <div className="bg-blue-900/60 border border-blue-600 rounded-xl p-3 text-center">
                      <p className="text-xs text-blue-300 mb-1">🔵 Priority DutyCredit</p>
                      <p className="text-2xl font-bold text-white">€25</p>
                      <p className="text-xs text-slate-300">off your purchase · min. €100</p>
                    </div>
                    {/* QR code mock */}
                    <div className="flex justify-center py-1">
                      <div className="grid grid-cols-7 gap-0.5">
                        {Array.from({ length: 49 }).map((_, i) => (
                          <div key={i} className={`w-3 h-3 rounded-sm ${[0,1,2,7,14,8,15,22,6,13,20,27,34,41,48,47,46,40,33,26,24,25,32].includes(i) ? "bg-blue-300" : "bg-slate-700"}`}/>
                        ))}
                      </div>
                    </div>
                    <p className="text-[10px] text-center text-green-400">✓ Valid today · Single use</p>
                  </div>
                  <p className="text-xs text-slate-500 mt-3 leading-relaxed">The traveler received this DutyCredit by email from their travel agency, airline, hotel or car rental company before departure.</p>
                </div>
              </div>

              {/* Scan screen */}
              <div className="bg-slate-800 border border-orange-800 rounded-2xl overflow-hidden">
                <div className="bg-orange-900/40 px-4 py-2 flex items-center gap-2 border-b border-orange-800">
                  <span className="text-xs font-bold text-orange-300 bg-orange-900 px-2 py-0.5 rounded-full">Retailer Staff</span>
                  <span className="text-xs text-orange-200 font-medium">Opens scan screen</span>
                </div>
                <div className="p-4 space-y-3">
                  <div className="bg-slate-900 border border-slate-700 rounded-xl p-3 text-center space-y-2">
                    <p className="text-xs text-slate-400 uppercase tracking-wider font-semibold">Scan QR Code</p>
                    <div className="border-2 border-dashed border-orange-500/50 rounded-xl h-24 flex items-center justify-center bg-orange-500/5 relative">
                      <div className="w-12 h-12 border-2 border-orange-400 rounded-lg animate-pulse opacity-60"/>
                      <div className="absolute top-2 left-2 w-4 h-4 border-t-2 border-l-2 border-orange-400 rounded-tl"/>
                      <div className="absolute top-2 right-2 w-4 h-4 border-t-2 border-r-2 border-orange-400 rounded-tr"/>
                      <div className="absolute bottom-2 left-2 w-4 h-4 border-b-2 border-l-2 border-orange-400 rounded-bl"/>
                      <div className="absolute bottom-2 right-2 w-4 h-4 border-b-2 border-r-2 border-orange-400 rounded-br"/>
                    </div>
                    <p className="text-xs text-slate-400">Point camera at traveler's phone</p>
                  </div>
                  <div className="text-center text-slate-500 text-xs">— or enter code manually —</div>
                  <div className="flex gap-2">
                    <div className="flex-1 bg-slate-700 border border-slate-600 rounded-lg px-3 py-2 text-xs text-slate-400">DB-XXXXXX</div>
                    <button className="bg-orange-600 text-white rounded-lg px-3 py-2 text-xs font-bold">Go</button>
                  </div>
                  <p className="text-xs text-slate-500 leading-relaxed">Available on <strong className="text-slate-300">any device</strong> — phone, tablet, desktop. No app installation. Open in browser at checkout.</p>
                </div>
              </div>

              {/* Voucher details appear */}
              <div className="bg-slate-800 border border-orange-800 rounded-2xl overflow-hidden">
                <div className="bg-orange-900/40 px-4 py-2 flex items-center gap-2 border-b border-orange-800">
                  <span className="text-xs font-bold text-orange-300 bg-orange-900 px-2 py-0.5 rounded-full">Retailer Staff</span>
                  <span className="text-xs text-orange-200 font-medium">Voucher details appear instantly</span>
                </div>
                <div className="p-4 space-y-3">
                  <div className="bg-blue-950 border border-blue-700 rounded-xl p-3 space-y-2">
                    <div className="flex justify-between items-center border-b border-blue-800 pb-2">
                      <p className="text-xs text-blue-300 font-semibold">🔵 Priority DutyCredit</p>
                      <span className="text-xs bg-green-500 text-white px-2 py-0.5 rounded-full font-bold">VALID</span>
                    </div>
                    <div className="grid grid-cols-2 gap-2 text-xs">
                      <div><p className="text-slate-500">Traveler</p><p className="text-white font-semibold">J. Martens</p></div>
                      <div><p className="text-slate-500">Flight</p><p className="text-white font-semibold">AMS → BCN</p></div>
                      <div><p className="text-slate-500">Discount</p><p className="text-green-400 font-bold text-base">€25 off</p></div>
                      <div><p className="text-slate-500">Min. spend</p><p className="text-white font-semibold">€100</p></div>
                    </div>
                    <div className="bg-blue-900/50 rounded-lg p-2 text-center">
                      <p className="text-xs text-slate-300">Current basket: <span className="text-white font-bold">€148</span> <span className="text-green-400">✓ qualifies</span></p>
                    </div>
                  </div>
                  <div className="grid grid-cols-2 gap-2">
                    <button className="bg-red-900/50 border border-red-700 text-red-300 rounded-xl py-2.5 text-xs font-bold">✕ Decline</button>
                    <button className="bg-green-600 hover:bg-green-700 text-white rounded-xl py-2.5 text-xs font-bold">✓ Redeem</button>
                  </div>
                  <p className="text-xs text-slate-500 leading-relaxed">Staff sees traveler name, flight, discount amount, and whether the basket qualifies. One tap to confirm.</p>
                </div>
              </div>
            </div>
          </div>

          {/* Connector arrow */}
          <div className="flex items-center justify-center gap-3 mb-10">
            <div className="flex-1 h-px bg-gradient-to-r from-transparent via-slate-600 to-transparent"/>
            <div className="flex items-center gap-2 bg-slate-800 border border-slate-600 rounded-full px-4 py-1.5">
              <CheckCircle2 className="w-4 h-4 text-green-400"/>
              <span className="text-xs text-slate-300 font-medium">Redemption confirmed — transaction logged automatically</span>
              <CheckCircle2 className="w-4 h-4 text-green-400"/>
            </div>
            <div className="flex-1 h-px bg-gradient-to-r from-transparent via-slate-600 to-transparent"/>
          </div>

          {/* Phase 3: After redemption */}
          <div>
            <div className="flex items-center gap-3 mb-5">
              <div className="w-8 h-8 rounded-full bg-green-600 flex items-center justify-center text-sm font-bold shrink-0">C</div>
              <div>
                <p className="font-bold text-white text-base">Phase C — After Redemption: Track, Report & Get Invoiced</p>
                <p className="text-xs text-slate-400">Everything is logged in real time. Monthly invoice. No manual admin.</p>
              </div>
            </div>
            <div className="grid md:grid-cols-3 gap-4">
              {/* Confirmation */}
              <div className="bg-slate-800 border border-green-800 rounded-2xl overflow-hidden">
                <div className="bg-green-900/40 px-4 py-2 flex items-center gap-2 border-b border-green-800">
                  <span className="text-xs font-bold text-green-300 bg-green-900 px-2 py-0.5 rounded-full">Instant</span>
                  <span className="text-xs text-green-200 font-medium">Transaction confirmed</span>
                </div>
                <div className="p-4 space-y-3">
                  <div className="flex flex-col items-center py-2">
                    <div className="w-12 h-12 rounded-full bg-green-500/20 border-2 border-green-500 flex items-center justify-center mb-2">
                      <CheckCircle2 className="w-6 h-6 text-green-400"/>
                    </div>
                    <p className="text-sm font-bold text-white">Redemption Successful</p>
                    <p className="text-xs text-slate-400">DutyCredit has been marked used</p>
                  </div>
                  <div className="bg-slate-900 rounded-xl border border-slate-700 p-3 space-y-1.5 text-xs">
                    {[
                      { l: "Basket Total", v: "€148.00", c: "text-white" },
                      { l: "DutyCredit Applied", v: "− €25.00", c: "text-green-400" },
                      { l: "Traveler Paid", v: "€123.00", c: "text-white font-bold" },
                      { l: "DutyBoost Fee (2.5%)", v: "€3.70", c: "text-red-300" },
                      { l: "Your Net Revenue", v: "€144.30", c: "text-blue-300 font-bold" },
                    ].map(({ l, v, c }, i) => (
                      <div key={l} className={`flex justify-between ${i >= 2 ? "border-t border-slate-700 pt-1.5" : ""}`}>
                        <span className="text-slate-400">{l}</span>
                        <span className={c}>{v}</span>
                      </div>
                    ))}
                  </div>
                  <p className="text-xs text-slate-500 leading-relaxed">The transaction is logged with full breakdown. The DutyCredit is permanently deactivated — it cannot be reused.</p>
                </div>
              </div>

              {/* Live Dashboard */}
              <div className="bg-slate-800 border border-green-800 rounded-2xl overflow-hidden">
                <div className="bg-green-900/40 px-4 py-2 flex items-center gap-2 border-b border-green-800">
                  <span className="text-xs font-bold text-green-300 bg-green-900 px-2 py-0.5 rounded-full">Real-time</span>
                  <span className="text-xs text-green-200 font-medium">Dashboard updates live</span>
                </div>
                <div className="p-4 space-y-2">
                  <div className="bg-slate-900 rounded-xl border border-slate-700 p-3 space-y-2">
                    <div className="flex items-center justify-between">
                      <p className="text-xs font-bold text-white">Relay Store · AMS T3</p>
                      <span className="text-[10px] text-slate-400">Updated just now</span>
                    </div>
                    <div className="grid grid-cols-2 gap-1.5">
                      {[
                        { l: "Today's Revenue", v: "€1,388", c: "text-green-400" },
                        { l: "Scans Today", v: "9", c: "text-blue-300" },
                        { l: "This Month", v: "€18,598", c: "text-purple-300" },
                        { l: "Avg. Basket", v: "€154", c: "text-orange-300" },
                      ].map(({ l, v, c }) => (
                        <div key={l} className="bg-slate-800 rounded-lg p-2 border border-slate-700">
                          <p className="text-[10px] text-slate-500">{l}</p>
                          <p className={`text-sm font-bold ${c}`}>{v}</p>
                        </div>
                      ))}
                    </div>
                    <div className="bg-slate-800 rounded-lg border border-slate-700 p-2">
                      <p className="text-[10px] text-slate-400 mb-1.5">Recent Transactions</p>
                      {[
                        { t: "J. Martens — €144.30", ch: "Agency", ago: "just now" },
                        { t: "S. Bakker — €187.50", ch: "Airline", ago: "2h ago" },
                        { t: "M. Chen — €95.20", ch: "Hotel", ago: "3h ago" },
                      ].map(({ t, ch, ago }) => (
                        <div key={t} className="flex justify-between items-center py-1 border-b border-slate-700/50 last:border-0">
                          <span className="text-xs text-white">{t}</span>
                          <div className="text-right">
                            <span className="text-[10px] text-blue-400 block">{ch}</span>
                            <span className="text-[10px] text-slate-500">{ago}</span>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                  <p className="text-xs text-slate-500 leading-relaxed">All transactions appear on your dashboard instantly. Filter by day, channel, or store. Export any time.</p>
                </div>
              </div>

              {/* Monthly invoice */}
              <div className="bg-slate-800 border border-green-800 rounded-2xl overflow-hidden">
                <div className="bg-green-900/40 px-4 py-2 flex items-center gap-2 border-b border-green-800">
                  <span className="text-xs font-bold text-green-300 bg-green-900 px-2 py-0.5 rounded-full">Monthly</span>
                  <span className="text-xs text-green-200 font-medium">Invoice from DutyBoost</span>
                </div>
                <div className="p-4 space-y-3">
                  <div className="bg-slate-900 rounded-xl border border-slate-700 overflow-hidden">
                    <div className="bg-slate-800 px-3 py-2 border-b border-slate-700">
                      <p className="text-xs font-bold text-white">DutyBoost · Monthly Invoice</p>
                      <p className="text-[10px] text-slate-400">May 2026 · Relay Store AMS T3</p>
                    </div>
                    <div className="p-3 space-y-2 text-xs">
                      {[
                        { l: "Total DutyCredits redeemed", v: "127" },
                        { l: "Total transaction volume", v: "€19,050" },
                        { l: "Platform fee (2.5%)", v: "€476.25" },
                      ].map(({ l, v }) => (
                        <div key={l} className="flex justify-between">
                          <span className="text-slate-400">{l}</span>
                          <span className="text-white font-medium">{v}</span>
                        </div>
                      ))}
                      <div className="border-t border-slate-700 pt-2 flex justify-between font-bold">
                        <span className="text-white">Amount Due</span>
                        <span className="text-red-300">€476.25</span>
                      </div>
                      <div className="bg-green-900/40 border border-green-700 rounded-lg p-2 text-center">
                        <p className="text-xs text-green-300">You earned €19,050 in extra revenue</p>
                        <p className="text-xs text-green-400 font-bold">ROI this month: 40:1</p>
                      </div>
                    </div>
                  </div>
                  <p className="text-xs text-slate-500 leading-relaxed">One invoice per month. Pay only on completed transactions. No subscriptions, no setup fees, no surprises.</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Retailer Benefits */}
        <div className="bg-slate-800 border border-slate-700 rounded-2xl p-6">
          <p className="text-xs font-semibold text-slate-500 uppercase tracking-widest mb-4">What Retailers Get</p>
          <div className="grid md:grid-cols-2 gap-3">
            {RETAILER_BENEFITS.map(({ icon: Icon, text }) => (
              <div key={text} className="flex items-start gap-3">
                <Icon className="w-4 h-4 text-blue-400 mt-0.5 shrink-0" />
                <p className="text-sm text-slate-300">{text}</p>
              </div>
            ))}
          </div>
        </div>

        {/* DutyCredit Tiers Preview */}
        <div className="bg-white/5 border border-white/10 rounded-2xl p-6">
          <p className="text-xs font-semibold text-slate-400 uppercase tracking-widest mb-4">DutyCredit Discount Tiers (Slide 4)</p>
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
              <tr className="bg-blue-800 text-white">
                <th className="text-left px-3 py-2 rounded-tl-lg">Tier</th>
                <th className="px-3 py-2">Spend Range</th>
                <th className="px-3 py-2">Saving Range</th>
                <th className="text-left px-3 py-2 rounded-tr-lg">What it means</th>
              </tr>
              </thead>
              <tbody className="divide-y divide-white/10">
              {[
                { name: "🟡 Boarding DutyCredit", range: "€70 – €99",   saving: "€5 – €10",  note: "Extra sale you wouldn't have had" },
                { name: "🔵 Priority DutyCredit",  range: "€100 – €199", saving: "€15 – €30", note: "Most common tier — strong incentive" },
                { name: "🟢 Lounge DutyCredit",    range: "€200 – €299", saving: "€35 – €45", note: "Premium traveler — larger basket" },
                { name: "🟣 VIP DutyCredit",       range: "€300+",       saving: "€60",       note: "Top-tier — maximum store revenue" },
              ].map(({ name, range, saving, note }) => (
                <tr key={name} className="bg-white/5 hover:bg-white/10 transition-colors">
                  <td className="px-3 py-2.5 font-medium text-white">{name}</td>
                  <td className="px-3 py-2.5 text-center text-slate-300">{range}</td>
                  <td className="px-3 py-2.5 text-center text-blue-300 font-bold">{saving}</td>
                  <td className="px-3 py-2.5 text-slate-400">{note}</td>
                </tr>
              ))}
              </tbody>
            </table>
          </div>
          <p className="text-xs text-orange-300 mt-3 text-center font-medium">⚠ Minimum basket €70 · Single use · Valid from departure day through arrival day · Applied automatically at checkout</p>
        </div>

        {/* Revenue Summary */}
        <div className="bg-gradient-to-r from-blue-900 to-slate-900 border border-blue-700 rounded-2xl p-6">
          <p className="text-xs font-semibold text-blue-400 uppercase tracking-widest mb-4">Combined Revenue Potential · 1 Store · Conservative Model · 3 Channels</p>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {[
              { channel: "Travel Partners & Airlines", gross: "€291,000", fee: "€7,275" },
              { channel: "Accommodations", gross: "€45,000", fee: "€1,125" },
              { channel: "Car Rental", gross: "€48,000", fee: "€1,200" },
            ].map(({ channel, gross, fee }) => (
              <div key={channel} className="text-center bg-slate-800/50 rounded-xl p-3">
                <p className="text-xs text-slate-400 mb-1">{channel}</p>
                <p className="text-lg font-bold text-green-400">{gross}</p>
                <p className="text-xs text-red-300">fee: {fee}</p>
              </div>
            ))}
          </div>
          <div className="mt-4 pt-4 border-t border-blue-800 flex flex-col md:flex-row justify-between items-center gap-2">
            <div className="text-center">
              <p className="text-xs text-slate-400">Total Gross Revenue</p>
              <p className="text-2xl font-bold text-white">€384,000</p>
            </div>
            <div className="text-center">
              <p className="text-xs text-slate-400">Total DutyBoost Fees</p>
              <p className="text-2xl font-bold text-red-300">€9,600</p>
            </div>
            <div className="text-center">
              <p className="text-xs text-slate-400">ROI</p>
              <p className="text-2xl font-bold text-blue-300">40:1</p>
            </div>
          </div>
        </div>

        {/* CTA */}
        <div className="text-center space-y-4 pb-8">
          <p className="text-slate-400 text-sm">Ready to get started? Download the full presentation.</p>
          <Button
            onClick={handleDownload}
            disabled={downloading}
            size="lg"
            className="bg-blue-600 hover:bg-blue-700 text-white gap-2"
          >
            <Download className="w-5 h-5" />
            {downloading ? "Generating..." : "Download PPTX — The Future of Airport Retail"}
          </Button>
          <p className="text-xs text-slate-600">hello@dutyboost.com · www.dutyboost.com</p>
        </div>

      </div>
    </div>
  );
}