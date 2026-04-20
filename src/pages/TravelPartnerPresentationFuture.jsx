import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { exportTravelPartnerPptx } from "@/utils/exportTravelPartnerPptx";
import {
  Download, TrendingUp, Users, Briefcase, Globe, Heart, Zap, Lock,
  CheckCircle2, ArrowRight, BarChart3
} from "lucide-react";

const SLIDES_PREVIEW = [
  {
    id: "cover",
    label: "Cover",
    title: "Partner with DutyBoost",
    sub: "Add value to your customers. Earn commission.",
    bg: "from-purple-950 to-orange-950",
    accent: "text-orange-300",
  },
  {
    id: "opportunity",
    label: "The Opportunity",
    title: "72% of travelers browse but don't buy at airports",
    sub: "€40B+ market · Low conversion problem",
    bg: "from-white to-blue-50",
    accent: "text-blue-700",
  },
  {
    id: "value-prop",
    label: "Your Value Prop",
    title: "DutyCredit: A loyalty tool that drives spending",
    sub: "Exclusive traveler benefit · Immediate ROI · No cost to you",
    bg: "from-purple-950 to-orange-950",
    accent: "text-orange-300",
  },
  {
    id: "how-works",
    label: "How It Works",
    title: "4-step process for agencies & OTAs",
    sub: "Issue → Distribute → Redeem → Earn",
    bg: "from-white to-blue-50",
    accent: "text-blue-700",
  },
  {
    id: "dutycredit-tiers",
    label: "DutyCredit Tiers",
    title: "What your customers receive",
    sub: "4 tiers · €70+ basket · Automatic discount",
    bg: "from-white to-blue-50",
    accent: "text-blue-700",
  },
  {
    id: "partner-benefits",
    label: "Why Partner?",
    title: "Your competitive advantage",
    sub: "Increase loyalty · Improve margins · Build stickiness",
    bg: "from-white to-purple-50",
    accent: "text-purple-700",
  },
  {
    id: "revenue-model",
    label: "Revenue Model",
    title: "How you earn commission",
    sub: "0.5% of gross DutyCredit value · Monthly payouts",
    bg: "from-white to-green-50",
    accent: "text-green-700",
  },
  {
    id: "scaling-potential",
    label: "Scaling Potential",
    title: "From one program to multiple channels",
    sub: "Airlines · Hotels · Car rental · Corporate",
    bg: "from-white to-blue-50",
    accent: "text-blue-700",
  },
  {
    id: "integration",
    label: "Integration",
    title: "Seamless with your booking system",
    sub: "API + Email + White-label option",
    bg: "from-purple-950 to-orange-950",
    accent: "text-orange-300",
  },
  {
    id: "case-study",
    label: "Case Study Metrics",
    title: "Example: mid-size OTA",
    sub: "100k annual bookings · 20% participation",
    bg: "from-white to-blue-50",
    accent: "text-blue-700",
  },
  {
    id: "rollout-phases",
    label: "Launch Plan",
    title: "Phase 1 → Phase 2 → Phase 3",
    sub: "Pilot · Full roll-out · Scale & optimize",
    bg: "from-white to-blue-50",
    accent: "text-blue-700",
  },
  {
    id: "support",
    label: "Our Support",
    title: "You're never alone",
    sub: "Dedicated partner success · Real-time analytics · Marketing support",
    bg: "from-white to-green-50",
    accent: "text-green-700",
  },
  {
    id: "cta",
    label: "Get Started",
    title: "Ready to unlock new revenue?",
    sub: "hello@dutyboost.com · www.dutyboost.com",
    bg: "from-purple-950 to-orange-950",
    accent: "text-orange-300",
  },
];

const PARTNER_BENEFITS = [
  { icon: CheckCircle2, text: "Differentiate your platform — exclusive loyalty tool for your customers" },
  { icon: CheckCircle2, text: "Improve customer retention — better UX = higher lifetime value" },
  { icon: CheckCircle2, text: "Earn recurring commission — 0.5% of gross DutyCredit spend, monthly" },
  { icon: CheckCircle2, text: "Zero operational cost — we handle all retailer relationships & payment processing" },
  { icon: CheckCircle2, text: "Build trust with travelers — deliver real value at airports, your key moment" },
  { icon: CheckCircle2, text: "Scale horizontally — white-label option available for premium partners" },
];

export default function TravelPartnerPresentationFuture() {
  const [downloading, setDownloading] = useState(false);

  const handleDownload = async () => {
    setDownloading(true);
    try {
      await exportTravelPartnerPptx();
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
            <p className="text-sm font-semibold text-white leading-none">Travel Partner Presentation</p>
            <p className="text-xs text-slate-400">Partnership Program · 13 slides</p>
          </div>
        </div>
        <Button
          onClick={handleDownload}
          disabled={downloading}
          className="bg-blue-600 hover:bg-blue-700 text-white gap-2"
        >
          <Download className="w-4 h-4" />
          {downloading ? "Generating..." : "Download PPTX"}
        </Button>
      </div>

      <div className="max-w-6xl mx-auto px-6 py-10 space-y-12">

        {/* Hero */}
        <div className="text-center space-y-4">
          <Badge className="bg-purple-500/20 text-purple-300 border-purple-500/30 text-xs tracking-widest uppercase">
            Travel Partner Program
          </Badge>
          <h1 className="text-4xl md:text-5xl font-bold text-white">Partner with DutyBoost</h1>
          <p className="text-xl text-orange-300 italic">Add value to your customers. Earn commission.</p>
          <p className="text-slate-400 max-w-2xl mx-auto text-sm leading-relaxed">
            A white-label loyalty program that gives your customers exclusive airport retail discounts — and generates recurring commission for your business. Zero cost. Zero risk.
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
          <p className="text-xs font-semibold text-slate-500 uppercase tracking-widest mb-4">Slide Overview — 13 slides</p>
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

        {/* Partner Benefits */}
        <div className="bg-slate-800 border border-slate-700 rounded-2xl p-6">
          <p className="text-xs font-semibold text-slate-500 uppercase tracking-widest mb-4">Why Travel Partners Choose DutyBoost</p>
          <div className="grid md:grid-cols-2 gap-3">
            {PARTNER_BENEFITS.map(({ icon: Icon, text }) => (
              <div key={text} className="flex items-start gap-3">
                <Icon className="w-4 h-4 text-purple-400 mt-0.5 shrink-0" />
                <p className="text-sm text-slate-300">{text}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Revenue Model */}
        <div className="bg-gradient-to-r from-green-900 to-slate-900 border border-green-700 rounded-2xl p-6">
          <p className="text-xs font-semibold text-green-400 uppercase tracking-widest mb-4">Commission Model — Example OTA</p>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
            {[
              { label: "Bookings Issued", value: "100,000/year" },
              { label: "Participation Rate", value: "20%" },
              { label: "Avg DutyCredit Value", value: "€35" },
            ].map(({ label, value }) => (
              <div key={label} className="text-center bg-slate-800/50 rounded-xl p-4">
                <p className="text-xs text-slate-400 mb-1">{label}</p>
                <p className="text-2xl font-bold text-green-400">{value}</p>
              </div>
            ))}
          </div>
          <div className="border-t border-green-800 pt-6">
            <p className="text-sm text-slate-400 mb-4">Annual Commission Calculation:</p>
            <div className="space-y-2 text-sm font-mono">
              <div className="flex justify-between">
                <span>100,000 bookings × 20% participation</span>
                <span className="text-green-400">= 20,000 DutyCredits</span>
              </div>
              <div className="flex justify-between">
                <span>20,000 × €35 avg value</span>
                <span className="text-green-400">= €700,000 gross spend</span>
              </div>
              <div className="flex justify-between font-bold text-lg pt-2 border-t border-green-800">
                <span>€700,000 × 0.5% commission</span>
                <span className="text-green-300">= €3,500/year</span>
              </div>
            </div>
          </div>
        </div>

        {/* DutyCredit Tiers */}
        <div className="bg-white/5 border border-white/10 rounded-2xl p-6">
          <p className="text-xs font-semibold text-slate-400 uppercase tracking-widest mb-4">What Your Customers Receive</p>
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
              <tr className="bg-blue-800 text-white">
                <th className="text-left px-3 py-2 rounded-tl-lg">Tier</th>
                <th className="px-3 py-2">Spend Range</th>
                <th className="px-3 py-2">Customer Saving</th>
                <th className="text-left px-3 py-2 rounded-tr-lg">Customer Value</th>
              </tr>
              </thead>
              <tbody className="divide-y divide-white/10">
              {[
                { name: "🟡 Boarding", range: "€70–€99", saving: "€5–€10", value: "Budget-conscious travel" },
                { name: "🔵 Priority", range: "€100–€199", saving: "€15–€30", value: "Most popular tier" },
                { name: "🟢 Lounge", range: "€200–€299", saving: "€35–€45", value: "Premium experience" },
                { name: "🟣 VIP", range: "€300+", saving: "€60", value: "Top-tier traveler" },
              ].map(({ name, range, saving, value }) => (
                <tr key={name} className="bg-white/5 hover:bg-white/10 transition-colors">
                  <td className="px-3 py-2.5 font-medium text-white">{name}</td>
                  <td className="px-3 py-2.5 text-center text-slate-300">{range}</td>
                  <td className="px-3 py-2.5 text-center text-blue-300 font-bold">{saving}</td>
                  <td className="px-3 py-2.5 text-slate-400">{value}</td>
                </tr>
              ))}
              </tbody>
            </table>
          </div>
          <p className="text-xs text-orange-300 mt-3 text-center font-medium">⚠ Minimum basket €70 · Single use · Valid from departure through arrival · Applied automatically at checkout</p>
        </div>

        {/* ROI Comparison */}
        <div className="bg-slate-800 border border-slate-700 rounded-2xl p-6">
          <p className="text-xs font-semibold text-slate-500 uppercase tracking-widest mb-4">Scale Scenarios</p>
          <div className="grid md:grid-cols-3 gap-4">
            {[
              { scenario: "Small Agency", bookings: "10k/yr", participation: "15%", commission: "€262/year" },
              { scenario: "Mid-size OTA", bookings: "100k/yr", participation: "20%", commission: "€3,500/year" },
              { scenario: "Large Travel Org", bookings: "500k/yr", participation: "25%", commission: "€21,875/year" },
            ].map(({ scenario, bookings, participation, commission }) => (
              <div key={scenario} className="bg-slate-700/50 rounded-xl p-4 space-y-2">
                <p className="font-semibold text-white text-sm">{scenario}</p>
                <p className="text-xs text-slate-400">Annual bookings: {bookings}</p>
                <p className="text-xs text-slate-400">Participation: {participation}</p>
                <p className="text-lg font-bold text-green-400">{commission}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Integration Options */}
        <div className="bg-slate-800 border border-slate-700 rounded-2xl p-6">
          <p className="text-xs font-semibold text-slate-500 uppercase tracking-widest mb-4">Integration Options</p>
          <div className="grid md:grid-cols-3 gap-4">
            {[
              { title: "Email Distribution", desc: "Send DutyCredit QR codes via transactional email. No code required." },
              { title: "API Integration", desc: "Programmatic issuance. Real-time tracking. Full webhook support." },
              { title: "White Label", desc: "Custom branding. Separate commission model. Premium partners only." },
            ].map(({ title, desc }) => (
              <div key={title} className="bg-slate-700/50 rounded-xl p-4 space-y-2">
                <p className="font-semibold text-white">{title}</p>
                <p className="text-sm text-slate-400">{desc}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Success Stories */}
        <div className="bg-white/5 border border-white/10 rounded-2xl p-6">
          <p className="text-xs font-semibold text-slate-400 uppercase tracking-widest mb-4">Partner Testimonial</p>
          <div className="space-y-3">
            <div className="bg-slate-800 rounded-xl p-4">
              <p className="text-sm text-slate-300 leading-relaxed">
                "DutyCredit became our fastest-growing loyalty lever. Our customers loved the exclusive airport discount, and we didn't have to build anything. Now we earn passive commission from every booking."
              </p>
              <p className="text-xs text-slate-400 mt-2">— Maria Santos, Head of Partnerships · TravelCo OTA</p>
            </div>
          </div>
        </div>

        {/* CTA */}
        <div className="text-center space-y-4 pb-8">
          <p className="text-slate-400 text-sm">Ready to unlock new revenue for your business?</p>
          <Button
            onClick={handleDownload}
            disabled={downloading}
            size="lg"
            className="bg-blue-600 hover:bg-blue-700 text-white gap-2"
          >
            <Download className="w-5 h-5" />
            {downloading ? "Generating..." : "Download PPTX — Travel Partner Program"}
          </Button>
          <p className="text-xs text-slate-600">hello@dutyboost.com · www.dutyboost.com</p>
        </div>

      </div>
    </div>
  );
}