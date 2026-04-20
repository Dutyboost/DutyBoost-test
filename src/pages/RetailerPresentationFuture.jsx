import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { exportRetailerPptx } from "@/utils/exportRetailerPptx";
import {
  Download, TrendingUp, Store, Plane, Hotel, Car, Briefcase,
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
    id: "channel-agencies",
    label: "Channel: Travel Partners",
    title: "Travel Agencies & OTAs",
    sub: "1.4B+ bookings/year · 60–70% email open rate",
    bg: "from-white to-blue-50",
    accent: "text-blue-700",
  },
  {
    id: "channel-airlines",
    label: "Channel: Airlines",
    title: "Airlines & Inflight",
    sub: "4.5B passengers/year · Highest open-rate emails in travel",
    bg: "from-white to-sky-50",
    accent: "text-sky-700",
  },
  {
    id: "channel-hotels",
    label: "Channel: Hotels",
    title: "Hotels — The Departure Moment",
    sub: "1.7B room nights/year · Underutilised check-out email",
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
    id: "corporate",
    label: "Future: Corporate",
    title: "Corporate Travel — The B2B Multiplier",
    sub: "$1.4T corporate travel market · Recurring per-trip spend",
    bg: "from-white to-purple-50",
    accent: "text-purple-700",
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
    icon: Users,
    label: "Travel Partners",
    color: "bg-blue-100 text-blue-700",
    stats: ["1.4B+ bookings/year", "60–70% email open rate", "20% conversion target"],
    value: "Largest active channel · Agencies & OTAs send pre-motivated travelers with DutyCredits in hand.",
  },
  {
    icon: Plane,
    label: "Airlines & Inflight",
    color: "bg-sky-100 text-sky-700",
    stats: ["4.5B passengers/year", "70–85% open rate", "Inflight WiFi activation"],
    value: "Highest-volume future channel · Post-booking email + inflight reminder drive departure spend.",
  },
  {
    icon: Hotel,
    label: "Hotels",
    color: "bg-green-100 text-green-700",
    stats: ["1.7B room nights/year", "45–60% departure email open rate", "High-value guests"],
    value: "Check-out triggers spend · Guest holds DutyCredit valid at departure AND arrival airport stores.",
  },
  {
    icon: Car,
    label: "Car Rental",
    color: "bg-orange-100 text-orange-700",
    stats: ["115M+ rentals in Europe", "70–85% open rate", "14–28 day booking window"],
    value: "Natural airport association · DutyCredit valid at both departure and arrival — doubles the redemption window.",
  },
  {
    icon: Briefcase,
    label: "Corporate Travel",
    color: "bg-purple-100 text-purple-700",
    stats: ["$1.4T market (GBTA 2024)", "2–4x/month frequency", "Policy-based budgets"],
    value: "B2B multiplier · Corporate accounts = predictable, recurring per-trip spend at your store.",
  },
];

const RETAILER_BENEFITS = [
  { icon: CheckCircle2, text: "2.5% fee only on completed transactions — pure performance" },
  { icon: CheckCircle2, text: "Pre-motivated buyers arrive with DutyCredit in hand — min. basket €70" },
  { icon: CheckCircle2, text: "No POS overhaul — simple QR scan on any device" },
  { icon: CheckCircle2, text: "Real-time dashboard: scans, revenue, channel breakdown" },
  { icon: CheckCircle2, text: "Multiple income channels: agencies, airlines, hotels, car rental" },
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
            <p className="text-xs text-slate-400">Airport Retailer Presentation · 14 slides</p>
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
            A performance-based revenue layer that sends pre-motivated travelers to your store — from travel agencies, airlines, hotels, and car rental companies. You pay only when they spend.
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
          <p className="text-xs font-semibold text-slate-500 uppercase tracking-widest mb-4">Slide Overview — 14 slides</p>
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
          <p className="text-xs font-semibold text-blue-400 uppercase tracking-widest mb-4">Combined Revenue Potential · 1 Store · Conservative Model</p>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {[
              { channel: "Travel Agencies", gross: "€75,000", fee: "€1,875" },
              { channel: "Airlines", gross: "€216,000", fee: "€5,400" },
              { channel: "Hotels", gross: "€45,000", fee: "€1,125" },
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