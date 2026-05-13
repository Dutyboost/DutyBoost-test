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

        {/* App Illustrations */}
        <div>
          <p className="text-xs font-semibold text-slate-500 uppercase tracking-widest mb-2">App Experience — What Retailers Actually See</p>
          <p className="text-slate-400 text-sm mb-6">A quick look at the three key moments in the DutyBoost retail flow.</p>
          <div className="grid md:grid-cols-3 gap-6">

            {/* Screen 1: Retailer Dashboard */}
            <div className="flex flex-col gap-3">
              <p className="text-xs font-semibold text-blue-300 uppercase tracking-widest text-center">① Retailer Dashboard</p>
              <div className="bg-slate-800 rounded-2xl border border-slate-700 overflow-hidden shadow-2xl">
                {/* Fake browser bar */}
                <div className="bg-slate-900 px-3 py-2 flex items-center gap-2 border-b border-slate-700">
                  <div className="flex gap-1"><div className="w-2.5 h-2.5 rounded-full bg-red-500/60"/><div className="w-2.5 h-2.5 rounded-full bg-yellow-500/60"/><div className="w-2.5 h-2.5 rounded-full bg-green-500/60"/></div>
                  <div className="flex-1 bg-slate-700 rounded text-xs text-slate-400 px-2 py-0.5 text-center">app.dutyboost.com/retailer-dashboard</div>
                </div>
                <div className="p-4 space-y-3">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-xs text-slate-400">Good morning,</p>
                      <p className="text-sm font-bold text-white">Relay Store — AMS T3</p>
                    </div>
                    <div className="w-8 h-8 rounded-full bg-blue-600 flex items-center justify-center text-xs font-bold">R</div>
                  </div>
                  <div className="grid grid-cols-2 gap-2">
                    {[
                      { label: "Today's Revenue", val: "€1,240", color: "text-green-400" },
                      { label: "Vouchers Scanned", val: "8", color: "text-blue-300" },
                      { label: "Avg. Basket", val: "€155", color: "text-orange-300" },
                      { label: "This Month", val: "€18,450", color: "text-purple-300" },
                    ].map(({ label, val, color }) => (
                      <div key={label} className="bg-slate-700/60 rounded-lg p-2.5">
                        <p className="text-xs text-slate-400 leading-tight">{label}</p>
                        <p className={`text-base font-bold ${color}`}>{val}</p>
                      </div>
                    ))}
                  </div>
                  <div className="bg-slate-700/40 rounded-lg p-2.5">
                    <p className="text-xs text-slate-400 mb-2">Top Channels Today</p>
                    {[
                      { ch: "Travel Partners", pct: 58, color: "bg-blue-500" },
                      { ch: "Accommodations", pct: 26, color: "bg-green-500" },
                      { ch: "Car Rental", pct: 16, color: "bg-orange-400" },
                    ].map(({ ch, pct, color }) => (
                      <div key={ch} className="flex items-center gap-2 mb-1.5">
                        <span className="text-xs text-slate-300 w-28 shrink-0">{ch}</span>
                        <div className="flex-1 bg-slate-600 rounded-full h-1.5">
                          <div className={`${color} h-1.5 rounded-full`} style={{ width: `${pct}%` }} />
                        </div>
                        <span className="text-xs text-slate-400">{pct}%</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
              <p className="text-xs text-slate-500 text-center leading-relaxed">Real-time performance overview — revenue, scans, and channel breakdown at a glance.</p>
            </div>

            {/* Screen 2: QR Scan */}
            <div className="flex flex-col gap-3">
              <p className="text-xs font-semibold text-orange-300 uppercase tracking-widest text-center">② Scan Voucher at Checkout</p>
              <div className="bg-slate-800 rounded-2xl border border-slate-700 overflow-hidden shadow-2xl">
                <div className="bg-slate-900 px-3 py-2 flex items-center gap-2 border-b border-slate-700">
                  <div className="flex gap-1"><div className="w-2.5 h-2.5 rounded-full bg-red-500/60"/><div className="w-2.5 h-2.5 rounded-full bg-yellow-500/60"/><div className="w-2.5 h-2.5 rounded-full bg-green-500/60"/></div>
                  <div className="flex-1 bg-slate-700 rounded text-xs text-slate-400 px-2 py-0.5 text-center">app.dutyboost.com/scan</div>
                </div>
                <div className="p-4 space-y-3">
                  <p className="text-xs text-slate-400 text-center font-medium uppercase tracking-wider">Scan Traveler's QR Code</p>
                  {/* Fake QR area */}
                  <div className="border-2 border-dashed border-blue-500/50 rounded-xl h-28 flex flex-col items-center justify-center bg-blue-500/5 relative">
                    <div className="grid grid-cols-5 gap-0.5 opacity-40">
                      {Array.from({ length: 25 }).map((_, i) => (
                        <div key={i} className={`w-3 h-3 rounded-sm ${[0,1,5,10,15,20,24,23,19,14,6,12].includes(i) ? "bg-blue-400" : "bg-slate-600"}`} />
                      ))}
                    </div>
                    <div className="absolute inset-0 flex items-center justify-center">
                      <div className="w-10 h-10 border-2 border-blue-400 rounded-lg animate-pulse" />
                    </div>
                  </div>
                  {/* Voucher preview card */}
                  <div className="bg-gradient-to-r from-blue-800 to-blue-900 border border-blue-600 rounded-xl p-3">
                    <div className="flex justify-between items-start">
                      <div>
                        <p className="text-xs text-blue-300">🔵 Priority DutyCredit</p>
                        <p className="text-lg font-bold text-white mt-0.5">€25 discount</p>
                        <p className="text-xs text-slate-300">Min. basket: €100</p>
                      </div>
                      <div className="text-right">
                        <p className="text-xs text-slate-400">Traveler</p>
                        <p className="text-sm font-semibold text-white">J. Martens</p>
                        <p className="text-xs text-slate-400">AMS → BCN</p>
                      </div>
                    </div>
                    <div className="mt-2 pt-2 border-t border-blue-700 flex justify-between items-center">
                      <span className="text-xs text-green-300">✓ Valid · Expires today</span>
                      <span className="text-xs bg-green-500 text-white px-2 py-0.5 rounded-full font-bold">ACTIVE</span>
                    </div>
                  </div>
                  <div className="grid grid-cols-2 gap-2">
                    <button className="bg-red-600/30 border border-red-600 text-red-300 rounded-lg py-2 text-xs font-semibold">✕ Decline</button>
                    <button className="bg-green-600 text-white rounded-lg py-2 text-xs font-semibold">✓ Redeem</button>
                  </div>
                </div>
              </div>
              <p className="text-xs text-slate-500 text-center leading-relaxed">Staff scans the traveler's QR code — voucher details appear instantly. One tap to redeem.</p>
            </div>

            {/* Screen 3: Confirmation */}
            <div className="flex flex-col gap-3">
              <p className="text-xs font-semibold text-green-300 uppercase tracking-widest text-center">③ Confirmation & Receipt</p>
              <div className="bg-slate-800 rounded-2xl border border-slate-700 overflow-hidden shadow-2xl">
                <div className="bg-slate-900 px-3 py-2 flex items-center gap-2 border-b border-slate-700">
                  <div className="flex gap-1"><div className="w-2.5 h-2.5 rounded-full bg-red-500/60"/><div className="w-2.5 h-2.5 rounded-full bg-yellow-500/60"/><div className="w-2.5 h-2.5 rounded-full bg-green-500/60"/></div>
                  <div className="flex-1 bg-slate-700 rounded text-xs text-slate-400 px-2 py-0.5 text-center">app.dutyboost.com/scan</div>
                </div>
                <div className="p-4 space-y-3">
                  {/* Success state */}
                  <div className="flex flex-col items-center py-2">
                    <div className="w-14 h-14 rounded-full bg-green-500/20 border-2 border-green-500 flex items-center justify-center mb-2">
                      <CheckCircle2 className="w-7 h-7 text-green-400" />
                    </div>
                    <p className="text-sm font-bold text-white">Redemption Successful</p>
                    <p className="text-xs text-slate-400">DutyCredit applied</p>
                  </div>
                  <div className="bg-slate-700/50 rounded-xl p-3 space-y-2 text-xs">
                    {[
                      { label: "Basket Total", val: "€148.00", bold: false },
                      { label: "DutyCredit Applied", val: "− €25.00", color: "text-green-400" },
                      { label: "Traveler Paid", val: "€123.00", bold: true },
                      { label: "DutyBoost Fee (2.5%)", val: "€3.70", color: "text-red-300" },
                      { label: "Your Net Revenue", val: "€144.30", color: "text-blue-300", bold: true },
                    ].map(({ label, val, bold, color }) => (
                      <div key={label} className={`flex justify-between ${bold ? "border-t border-slate-600 pt-2 font-semibold" : ""}`}>
                        <span className="text-slate-400">{label}</span>
                        <span className={color ?? "text-white"}>{val}</span>
                      </div>
                    ))}
                  </div>
                  <div className="bg-blue-500/10 border border-blue-500/30 rounded-lg p-2.5 text-center">
                    <p className="text-xs text-blue-300">📊 Added to your dashboard instantly</p>
                  </div>
                </div>
              </div>
              <p className="text-xs text-slate-500 text-center leading-relaxed">Full transaction breakdown — traveler pays discounted price, your net revenue shown immediately.</p>
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