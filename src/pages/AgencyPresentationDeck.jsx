import { useState } from "react";
import {
  ChevronLeft, ChevronRight, Building2, Gift, TrendingUp, BarChart3,
  Zap, CheckCircle2, ArrowRight, Users, Store, Plane, Euro, QrCode,
  UserPlus, Settings, Send, PieChart, Bell, Download, Shield, Clock
} from "lucide-react";
import DutyBoostLogo from "../components/DutyBoostLogo";

// ─── Slide definitions ────────────────────────────────────────────────────────

const SLIDES = [
  { id: "cover", type: "cover" },
  { id: "why", type: "why" },
  { id: "how_it_works", type: "how_it_works" },
  { id: "account", type: "account" },
  { id: "integration", type: "integration" },
  { id: "voucher_flow", type: "voucher_flow" },
  { id: "financials", type: "financials" },
  { id: "dashboard", type: "dashboard" },
  { id: "retailers_need_you", type: "retailers_need_you" },
  { id: "cta", type: "cta" },
];

// ─── Helpers ──────────────────────────────────────────────────────────────────

function Slide({ children, bg = "bg-white", className = "" }) {
  return (
    <div className={`relative w-full h-full flex flex-col items-center justify-center px-8 sm:px-14 py-10 overflow-hidden ${bg} ${className}`}>
      {children}
    </div>
  );
}

function Tag({ label, color = "text-blue-600 bg-blue-50 border-blue-200" }) {
  return (
    <span className={`text-xs font-bold uppercase tracking-widest px-3 py-1 rounded-full border ${color}`}>
      {label}
    </span>
  );
}

function StepBubble({ n, title, desc, icon: Icon, color = "bg-blue-600" }) {
  return (
    <div className="flex flex-col items-center text-center gap-2 max-w-[140px]">
      <div className={`w-12 h-12 ${color} rounded-2xl flex items-center justify-center shadow-md`}>
        <Icon className="w-5 h-5 text-white" />
      </div>
      <div className="w-6 h-6 bg-slate-800 text-white rounded-full text-xs flex items-center justify-center font-bold">{n}</div>
      <p className="font-semibold text-slate-800 text-sm leading-tight">{title}</p>
      <p className="text-slate-500 text-xs leading-relaxed">{desc}</p>
    </div>
  );
}

function Arrow() {
  return <ArrowRight className="w-5 h-5 text-slate-300 shrink-0 hidden sm:block" />;
}

// ─── Individual Slides ────────────────────────────────────────────────────────

function CoverSlide() {
  return (
    <div className="w-full h-full flex flex-col items-center justify-center bg-gradient-to-br from-blue-50 via-white to-indigo-50 relative overflow-hidden">
      <div className="absolute top-0 right-0 w-80 h-80 bg-blue-200/30 rounded-full blur-3xl" />
      <div className="absolute bottom-0 left-0 w-80 h-80 bg-indigo-200/20 rounded-full blur-3xl" />
      <div className="relative text-center space-y-5 max-w-3xl">
        <div className="flex justify-center"><DutyBoostLogo height={110} /></div>
        <div className="flex justify-center"><Tag label="Travel Agency Presentation" color="text-blue-700 bg-blue-100 border-blue-300" /></div>
        <h1 className="text-3xl sm:text-5xl font-heading font-bold text-slate-900 leading-tight">
          Turn Every Booking Into<br />
          <span className="bg-gradient-to-r from-blue-500 to-indigo-500 bg-clip-text text-transparent">Recurring Commission</span>
        </h1>
        <p className="text-slate-500 text-lg max-w-xl mx-auto leading-relaxed">
          A complete walkthrough of how DutyBoost works for travel agencies — from setup to payout.
        </p>
        <div className="flex flex-wrap justify-center gap-4 pt-2">
          {["Zero upfront cost", "1% commission per redemption", "API in minutes", "Real-time analytics"].map(b => (
            <div key={b} className="flex items-center gap-1.5 text-sm text-slate-600 bg-white border border-slate-200 rounded-full px-4 py-1.5 shadow-sm">
              <CheckCircle2 className="w-3.5 h-3.5 text-green-500" /> {b}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

function WhySlide() {
  return (
    <Slide bg="bg-slate-900" className="text-white">
      <div className="max-w-3xl w-full space-y-6 text-center">
        <Tag label="The Opportunity" color="text-blue-300 bg-blue-900/50 border-blue-700" />
        <h2 className="text-3xl sm:text-4xl font-heading font-bold">
          You already have the travelers.<br />
          <span className="text-slate-400">You're just not earning from what they do next.</span>
        </h2>
        <p className="text-slate-400 text-base max-w-xl mx-auto">
          Every traveler you book flies through an airport. Those airports are filled with retailers. Right now, you earn nothing from what happens there. DutyBoost changes that.
        </p>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-left mt-4">
          {[
            { icon: Building2, title: "You book the trip", text: "Your agency sends thousands of travelers to airports every year." },
            { icon: Store, title: "They shop at the airport", text: "Travelers spend billions at airport retail annually — none of it linked back to you." },
            { icon: Euro, title: "You earn nothing… yet", text: "With DutyBoost, every purchase your traveler makes earns you a 1% commission." },
          ].map(({ icon: Icon, title, text }) => (
            <div key={title} className="bg-white/5 border border-white/10 rounded-2xl p-5 space-y-3">
              <Icon className="w-6 h-6 text-blue-400" />
              <p className="font-semibold">{title}</p>
              <p className="text-slate-400 text-sm leading-relaxed">{text}</p>
            </div>
          ))}
        </div>
      </div>
    </Slide>
  );
}

function HowItWorksSlide() {
  return (
    <Slide bg="bg-gradient-to-br from-blue-600 to-indigo-700" className="text-white">
      <div className="max-w-4xl w-full space-y-6 text-center">
        <Tag label="How It Works" color="text-white bg-white/20 border-white/30" />
        <h2 className="text-3xl sm:text-4xl font-heading font-bold">The DutyBoost Loop</h2>
        <p className="text-blue-100 text-base max-w-lg mx-auto">
          A simple, automated closed loop — from booking confirmation to commission payout.
        </p>
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-center gap-4 sm:gap-3 mt-4">
          {[
            { n: "1", icon: Plane, label: "Traveler books flight via your agency" },
            { n: "2", icon: Send, label: "DutyBoost auto-generates a DutyCredit voucher" },
            { n: "3", icon: QrCode, label: "Traveler receives QR code before departure" },
            { n: "4", icon: Store, label: "QR scanned at airport retailer checkout" },
            { n: "5", icon: Euro, label: "1% commission credited to your account" },
          ].map((s, i, arr) => (
            <>
              <div key={s.n} className="flex flex-col items-center text-center gap-2 max-w-[130px]">
                <div className="relative">
                  <div className="w-12 h-12 bg-white/20 border border-white/30 rounded-2xl flex items-center justify-center">
                    <s.icon className="w-5 h-5 text-white" />
                  </div>
                  <div className="absolute -top-2 -right-2 w-5 h-5 bg-orange-400 text-white rounded-full text-xs flex items-center justify-center font-bold">{s.n}</div>
                </div>
                <p className="text-white text-xs font-medium leading-snug">{s.label}</p>
              </div>
              {i < arr.length - 1 && <ArrowRight key={`a${i}`} className="w-5 h-5 text-white/40 hidden sm:block shrink-0 mt-[-24px]" />}
            </>
          ))}
        </div>
        <div className="bg-white/10 border border-white/20 rounded-2xl p-4 mt-2 max-w-2xl mx-auto">
          <p className="text-white text-sm font-semibold">💡 Fully automated once integrated. No manual work per booking required.</p>
        </div>
      </div>
    </Slide>
  );
}

function AccountSlide() {
  return (
    <Slide>
      <div className="max-w-3xl w-full space-y-5">
        <div className="flex justify-center"><Tag label="Step 1 — Getting Started" color="text-blue-600 bg-blue-50 border-blue-200" /></div>
        <h2 className="text-3xl sm:text-4xl font-heading font-bold text-slate-900 text-center">Creating Your Agency Account</h2>
        <p className="text-slate-500 text-center text-base max-w-xl mx-auto">Sign up in minutes. No technical knowledge required to get started.</p>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-2">
          {[
            { icon: UserPlus, step: "1", title: "Apply online", desc: "Go to dutyboost.com/agency-signup. Fill in your agency name, KVK, VAT, and booking system. Takes under 5 minutes.", color: "bg-blue-600" },
            { icon: Shield, step: "2", title: "Account review", desc: "Our team verifies your details and approves your application — typically within 1 business day.", color: "bg-indigo-600" },
            { icon: Send, step: "3", title: "Welcome email", desc: "You receive login credentials and a Purchase Order with full service terms and commission structure.", color: "bg-violet-600" },
            { icon: Settings, step: "4", title: "Dashboard access", desc: "Log in to your Agency Dashboard. View your vouchers, bookings, analytics, and commission reports.", color: "bg-purple-600" },
          ].map(({ icon: Icon, step, title, desc, color }) => (
            <div key={step} className="flex gap-4 bg-slate-50 border border-slate-200 rounded-2xl p-5">
              <div className={`w-10 h-10 ${color} rounded-xl flex items-center justify-center shrink-0`}>
                <Icon className="w-5 h-5 text-white" />
              </div>
              <div>
                <p className="font-semibold text-slate-800 text-sm">{step}. {title}</p>
                <p className="text-slate-500 text-xs mt-1 leading-relaxed">{desc}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </Slide>
  );
}

function IntegrationSlide() {
  return (
    <Slide bg="bg-slate-50">
      <div className="max-w-3xl w-full space-y-5">
        <div className="flex justify-center"><Tag label="Step 2 — Integration" color="text-indigo-600 bg-indigo-50 border-indigo-200" /></div>
        <h2 className="text-3xl sm:text-4xl font-heading font-bold text-slate-900 text-center">Connecting Your Booking System</h2>
        <p className="text-slate-500 text-center text-base max-w-xl mx-auto">One API call is all it takes. Works with Amadeus, Sabre, Galileo, or any custom system.</p>
        <div className="bg-white border border-slate-200 rounded-2xl p-5 space-y-4">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 bg-green-100 border border-green-300 rounded-xl flex items-center justify-center">
              <Zap className="w-4 h-4 text-green-600" />
            </div>
            <p className="font-semibold text-slate-800">One API call after booking confirmation</p>
          </div>
          <div className="bg-slate-900 rounded-xl p-4 text-sm font-mono text-green-400 overflow-x-auto">
            <p className="text-slate-400 text-xs mb-2">// Called automatically after booking confirmation</p>
            <p>POST https://dutyboost.com/api/generate-duty-credit</p>
            <p className="text-slate-400 mt-2">{"{"}</p>
            <p className="ml-4 text-blue-300">"booking_id": <span className="text-yellow-300">"BK-2024-001"</span>,</p>
            <p className="ml-4 text-blue-300">"traveler_email": <span className="text-yellow-300">"traveler@example.com"</span>,</p>
            <p className="ml-4 text-blue-300">"departure_airport": <span className="text-yellow-300">"AMS"</span>,</p>
            <p className="ml-4 text-blue-300">"travel_date": <span className="text-yellow-300">"2024-06-15"</span>,</p>
            <p className="ml-4 text-blue-300">"total_ticket_price": <span className="text-yellow-300">850</span></p>
            <p className="text-slate-400">{"}"}</p>
          </div>
          <p className="text-xs text-slate-500">→ DutyBoost automatically calculates the discount tier, generates the voucher, and emails it to the traveler. Your job is done.</p>
        </div>
        <div className="grid grid-cols-3 gap-3">
          {["No POS changes needed", "Works with any booking system", "Full test environment available"].map(t => (
            <div key={t} className="flex items-center gap-2 text-xs text-slate-600 bg-white border border-slate-200 rounded-xl p-3">
              <CheckCircle2 className="w-4 h-4 text-green-500 shrink-0" /> {t}
            </div>
          ))}
        </div>
      </div>
    </Slide>
  );
}

function VoucherFlowSlide() {
  return (
    <Slide>
      <div className="max-w-3xl w-full space-y-5">
        <div className="flex justify-center"><Tag label="Step 3 — The Traveler Experience" color="text-emerald-600 bg-emerald-50 border-emerald-200" /></div>
        <h2 className="text-3xl sm:text-4xl font-heading font-bold text-slate-900 text-center">What Your Traveler Receives</h2>
        <p className="text-slate-500 text-center text-base">Fully automated. Zero effort from you or the traveler.</p>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          {[
            {
              icon: Send, color: "bg-blue-600", title: "Personalised email",
              desc: "The traveler receives a branded email with their DutyCredit voucher, discount value, and a scannable QR code — linked to their specific departure airport."
            },
            {
              icon: QrCode, color: "bg-emerald-600", title: "QR code at checkout",
              desc: "At the airport store, the retailer scans the QR code. The traveler gets an instant discount at the till. No app needed."
            },
            {
              icon: Euro, color: "bg-orange-500", title: "Real savings applied",
              desc: "Discounts range from 5% to 25% based on ticket price and number of items. The more they spend, the more they save."
            },
          ].map(({ icon: Icon, color, title, desc }) => (
            <div key={title} className="bg-slate-50 border border-slate-200 rounded-2xl p-5 space-y-3 text-center">
              <div className={`w-10 h-10 ${color} rounded-xl flex items-center justify-center mx-auto`}>
                <Icon className="w-5 h-5 text-white" />
              </div>
              <p className="font-semibold text-slate-800">{title}</p>
              <p className="text-slate-500 text-xs leading-relaxed">{desc}</p>
            </div>
          ))}
        </div>
        <div className="bg-emerald-50 border border-emerald-200 rounded-2xl p-4 text-center">
          <p className="text-emerald-800 font-semibold text-sm">✅ Traveler loyalty goes up. Repeat booking likelihood increases. Your brand becomes part of the airport experience.</p>
        </div>
      </div>
    </Slide>
  );
}

function FinancialsSlide() {
  return (
    <Slide bg="bg-slate-900" className="text-white">
      <div className="max-w-3xl w-full space-y-5 text-center">
        <Tag label="The Commission Model" color="text-blue-300 bg-blue-900/50 border-blue-700" />
        <h2 className="text-3xl sm:text-4xl font-heading font-bold">How the Money Flows</h2>
        <p className="text-slate-400 text-base max-w-xl mx-auto">Every time a traveler redeems a DutyCredit at the airport, here's exactly what happens financially:</p>

        <div className="bg-white/5 border border-white/10 rounded-2xl p-5 space-y-4 text-left">
          <p className="text-slate-300 text-sm font-medium mb-2">Example: Traveler buys €200 worth of goods at the airport</p>
          {[
            { label: "Gross transaction value", value: "€200.00", color: "text-white" },
            { label: "Effective discount to traveler (e.g. 10%)", value: "−€20.00", color: "text-orange-300" },
            { label: "Net retailer receives", value: "€180.00", color: "text-emerald-300" },
            { label: "DutyBoost platform fee (5% of gross)", value: "−€10.00", color: "text-slate-400" },
            { label: "Your agency commission (1% of gross)", value: "€2.00 ✓", color: "text-blue-300 font-bold text-lg" },
          ].map(({ label, value, color }) => (
            <div key={label} className="flex justify-between items-center border-b border-white/10 pb-2 last:border-0 last:pb-0">
              <span className="text-slate-400 text-sm">{label}</span>
              <span className={`text-sm font-semibold ${color}`}>{value}</span>
            </div>
          ))}
        </div>
        <p className="text-slate-500 text-xs">Commission is aggregated monthly and paid out automatically to your registered bank account (IBAN).</p>
      </div>
    </Slide>
  );
}

function DashboardSlide() {
  return (
    <Slide bg="bg-slate-50">
      <div className="max-w-3xl w-full space-y-5">
        <div className="flex justify-center"><Tag label="Your Agency Dashboard" color="text-blue-600 bg-blue-50 border-blue-200" /></div>
        <h2 className="text-3xl sm:text-4xl font-heading font-bold text-slate-900 text-center">Everything in One Place</h2>
        <p className="text-slate-500 text-center text-base max-w-xl mx-auto">Your real-time dashboard gives you full visibility into your DutyBoost performance.</p>
        <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
          {[
            { icon: BarChart3, title: "Commission tracking", desc: "Total earned, pending payouts, monthly trends" },
            { icon: Users, title: "Traveler overview", desc: "How many travelers redeemed, at which airports" },
            { icon: PieChart, title: "Voucher analytics", desc: "Active, redeemed, and expired DutyCredits" },
            { icon: Store, title: "Retailer breakdown", desc: "Which stores your travelers visited most" },
            { icon: Bell, title: "Redemption alerts", desc: "Real-time notifications when a voucher is redeemed" },
            { icon: Download, title: "Monthly reports", desc: "Download PDF or CSV commission statements" },
          ].map(({ icon: Icon, title, desc }) => (
            <div key={title} className="bg-white border border-slate-200 rounded-2xl p-4 space-y-2">
              <Icon className="w-5 h-5 text-blue-600" />
              <p className="font-semibold text-slate-800 text-sm">{title}</p>
              <p className="text-slate-500 text-xs leading-relaxed">{desc}</p>
            </div>
          ))}
        </div>
      </div>
    </Slide>
  );
}

function RetailersNeedYouSlide() {
  return (
    <Slide bg="bg-gradient-to-br from-orange-50 via-white to-blue-50">
      <div className="max-w-3xl w-full space-y-5 text-center">
        <Tag label="The Bigger Picture" color="text-orange-600 bg-orange-50 border-orange-200" />
        <h2 className="text-3xl sm:text-4xl font-heading font-bold text-slate-900">
          Airport Retailers Need You.<br />
          <span className="text-slate-500">And You Need Them.</span>
        </h2>
        <p className="text-slate-500 text-base max-w-2xl mx-auto">
          DutyBoost only works because both sides are in. Airport retailers attract your travelers with real discounts. Your travelers drive revenue for the retailers. Everyone wins — and you sit at the center, earning commission on every transaction.
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center mt-2">
          <div className="bg-blue-50 border border-blue-200 rounded-2xl p-5 flex-1 text-left space-y-2">
            <Building2 className="w-6 h-6 text-blue-600" />
            <p className="font-semibold text-blue-900">Your role as the agency</p>
            <p className="text-slate-500 text-sm">You send qualified, high-intent travelers to the airport with a voucher already in hand. Retailers receive pre-motivated buyers. That's your value in the ecosystem.</p>
          </div>
          <div className="bg-orange-50 border border-orange-200 rounded-2xl p-5 flex-1 text-left space-y-2">
            <Store className="w-6 h-6 text-orange-600" />
            <p className="font-semibold text-orange-900">What retailers bring</p>
            <p className="text-slate-500 text-sm">Participating stores accept DutyCredits, pay the 5% platform fee, and provide your travelers with a genuine discount — making the entire loop close successfully.</p>
          </div>
        </div>
        <div className="bg-slate-900 text-white rounded-2xl px-6 py-4 text-sm font-semibold">
          🔁 More agencies → more travelers with vouchers → more retailer revenue → more commission for you
        </div>
      </div>
    </Slide>
  );
}

function CtaSlide() {
  return (
    <div className="w-full h-full flex flex-col items-center justify-center bg-gradient-to-br from-blue-600 to-indigo-700 text-white px-8 sm:px-16 py-12 relative overflow-hidden">
      <div className="absolute top-0 right-0 w-80 h-80 bg-white/10 rounded-full blur-3xl" />
      <div className="absolute bottom-0 left-0 w-80 h-80 bg-black/10 rounded-full blur-3xl" />
      <div className="relative text-center space-y-5 max-w-2xl">
        <div className="flex justify-center"><DutyBoostLogo height={90} /></div>
        <Tag label="Ready to get started?" color="text-white bg-white/20 border-white/30" />
        <h2 className="text-3xl sm:text-5xl font-heading font-bold">Join DutyBoost Today</h2>
        <p className="text-blue-100 text-lg leading-relaxed">
          Zero upfront cost. No complex integrations. Just a new revenue stream from every trip you book.
        </p>
        <div className="grid grid-cols-3 gap-3 mt-2">
          {[
            { v: "1%", l: "Commission per redemption" },
            { v: "0€", l: "Upfront or monthly cost" },
            { v: "24h", l: "Account approval time" },
          ].map(({ v, l }) => (
            <div key={l} className="bg-white/10 border border-white/20 rounded-2xl p-3 text-center">
              <p className="text-2xl font-bold">{v}</p>
              <p className="text-blue-200 text-xs mt-1">{l}</p>
            </div>
          ))}
        </div>
        <a href="/agency-signup" className="inline-block mt-2 bg-white text-blue-700 font-bold px-8 py-3 rounded-xl hover:bg-blue-50 transition-colors text-sm shadow-lg">
          Apply Now at DutyBoost.com →
        </a>
      </div>
      <p className="absolute bottom-3 right-5 text-white/30 text-xs">© {new Date().getFullYear()} DutyBoost B.V.</p>
    </div>
  );
}

// ─── Renderer ─────────────────────────────────────────────────────────────────

function renderSlide(slide) {
  switch (slide.type) {
    case "cover": return <CoverSlide />;
    case "why": return <WhySlide />;
    case "how_it_works": return <HowItWorksSlide />;
    case "account": return <AccountSlide />;
    case "integration": return <IntegrationSlide />;
    case "voucher_flow": return <VoucherFlowSlide />;
    case "financials": return <FinancialsSlide />;
    case "dashboard": return <DashboardSlide />;
    case "retailers_need_you": return <RetailersNeedYouSlide />;
    case "cta": return <CtaSlide />;
    default: return null;
  }
}

const SLIDE_LABELS = [
  "Cover", "Opportunity", "How It Works", "Account Setup",
  "Integration", "Traveler Flow", "Financials", "Dashboard", "Ecosystem", "Get Started"
];

// ─── Main Component ───────────────────────────────────────────────────────────

export default function AgencyPresentationDeck() {
  const [current, setCurrent] = useState(0);
  const prev = () => setCurrent(i => Math.max(0, i - 1));
  const next = () => setCurrent(i => Math.min(SLIDES.length - 1, i + 1));

  return (
    <div
      className="min-h-screen bg-slate-950 flex flex-col items-center justify-center p-4"
      onKeyDown={e => { if (e.key === "ArrowRight" || e.key === "ArrowDown") next(); if (e.key === "ArrowLeft" || e.key === "ArrowUp") prev(); }}
      tabIndex={0} style={{ outline: "none" }}
    >
      {/* Header */}
      <div className="flex items-center gap-3 mb-4 w-full max-w-5xl">
        <div className="flex items-center gap-2 bg-blue-600/20 border border-blue-600/40 rounded-full px-4 py-1.5">
          <Building2 className="w-4 h-4 text-blue-400" />
          <span className="text-blue-300 text-xs font-semibold">Travel Agency Deck</span>
        </div>
        <a href="/deck" className="ml-auto text-slate-500 hover:text-slate-300 text-xs transition-colors">← Back to Overview</a>
        <a href="/retailer-deck" className="text-slate-500 hover:text-orange-300 text-xs transition-colors">Airport Retailer Deck →</a>
      </div>

      {/* Slide */}
      <div className="w-full max-w-5xl aspect-video rounded-2xl overflow-hidden shadow-2xl border border-white/10 relative">
        {renderSlide(SLIDES[current])}
      </div>

      {/* Controls */}
      <div className="flex items-center gap-4 mt-5">
        <button onClick={prev} disabled={current === 0}
          className="w-10 h-10 rounded-xl bg-white/10 hover:bg-white/20 disabled:opacity-30 disabled:cursor-not-allowed flex items-center justify-center text-white transition-colors">
          <ChevronLeft className="w-5 h-5" />
        </button>

        <div className="flex gap-1.5 flex-wrap justify-center max-w-xs">
          {SLIDES.map((_, i) => (
            <button key={i} onClick={() => setCurrent(i)} title={SLIDE_LABELS[i]}
              className={`h-2 rounded-full transition-all ${i === current ? "bg-blue-400 w-6" : "bg-white/20 hover:bg-white/40 w-2"}`} />
          ))}
        </div>

        <button onClick={next} disabled={current === SLIDES.length - 1}
          className="w-10 h-10 rounded-xl bg-white/10 hover:bg-white/20 disabled:opacity-30 disabled:cursor-not-allowed flex items-center justify-center text-white transition-colors">
          <ChevronRight className="w-5 h-5" />
        </button>
      </div>

      <p className="text-slate-600 text-xs mt-2">
        <span className="text-slate-400">{SLIDE_LABELS[current]}</span> · {current + 1} / {SLIDES.length} · Use arrow keys to navigate
      </p>
    </div>
  );
}