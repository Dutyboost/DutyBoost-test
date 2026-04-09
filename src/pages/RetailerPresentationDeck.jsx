import { useState } from "react";
import {
  ChevronLeft, ChevronRight, Store, Gift, TrendingUp, BarChart3,
  Zap, CheckCircle2, ArrowRight, Users, Building2, Euro, QrCode,
  UserPlus, Settings, Scan, PieChart, Bell, Download, Shield, Clock,
  Receipt, Percent, CreditCard
} from "lucide-react";
import DutyBoostLogo from "../components/DutyBoostLogo";

// ─── Slides ───────────────────────────────────────────────────────────────────

const SLIDES = [
  { id: "cover", type: "cover" },
  { id: "problem", type: "problem" },
  { id: "solution", type: "solution" },
  { id: "account", type: "account" },
  { id: "setup", type: "setup" },
  { id: "scan_flow", type: "scan_flow" },
  { id: "financials", type: "financials" },
  { id: "dashboard", type: "dashboard" },
  { id: "agencies_need_you", type: "agencies_need_you" },
  { id: "live_data", type: "live_data" },
  { id: "cta", type: "cta" },
];

const SLIDE_LABELS = [
  "Cover", "The Problem", "The Solution", "Account Setup",
  "Store Setup", "Scan Flow", "Financials", "Dashboard", "Live Example", "Ecosystem", "Get Started"
];

// ─── Helpers ──────────────────────────────────────────────────────────────────

function Slide({ children, bg = "bg-white", className = "" }) {
  return (
    <div className={`relative w-full h-full flex flex-col items-center justify-center px-8 sm:px-14 py-10 overflow-hidden ${bg} ${className}`}>
      {children}
    </div>
  );
}

function Tag({ label, color = "text-orange-600 bg-orange-50 border-orange-200" }) {
  return (
    <span className={`text-xs font-bold uppercase tracking-widest px-3 py-1 rounded-full border ${color}`}>
      {label}
    </span>
  );
}

// ─── Slides ───────────────────────────────────────────────────────────────────

function CoverSlide() {
  return (
    <div className="w-full h-full flex flex-col items-center justify-center bg-gradient-to-br from-orange-50 via-white to-amber-50 relative overflow-hidden">
      <div className="absolute top-0 right-0 w-80 h-80 bg-orange-200/30 rounded-full blur-3xl" />
      <div className="absolute bottom-0 left-0 w-80 h-80 bg-amber-200/20 rounded-full blur-3xl" />
      <div className="relative text-center space-y-5 max-w-3xl">
        <div className="flex justify-center"><DutyBoostLogo height={110} /></div>
        <div className="flex justify-center"><Tag label="Airport Retailer Presentation" /></div>
        <h1 className="text-3xl sm:text-5xl font-heading font-bold text-slate-900 leading-tight">
          Turn Passing Travelers Into<br />
          <span className="bg-gradient-to-r from-orange-500 to-amber-500 bg-clip-text text-transparent">Paying Customers</span>
        </h1>
        <p className="text-slate-500 text-lg max-w-xl mx-auto leading-relaxed">
          A complete walkthrough of how DutyBoost works for airport retailers — from store registration to dashboard analytics.
        </p>
        <div className="flex flex-wrap justify-center gap-4 pt-2">
          {["Pay only on redemption", "No POS system changes", "Pre-motivated buyers", "Real-time dashboard"].map(b => (
            <div key={b} className="flex items-center gap-1.5 text-sm text-slate-600 bg-white border border-slate-200 rounded-full px-4 py-1.5 shadow-sm">
              <CheckCircle2 className="w-3.5 h-3.5 text-green-500" /> {b}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

function ProblemSlide() {
  return (
    <Slide bg="bg-slate-900" className="text-white">
      <div className="max-w-3xl w-full space-y-6 text-center">
        <Tag label="The Challenge" color="text-orange-300 bg-orange-900/40 border-orange-700" />
        <h2 className="text-3xl sm:text-4xl font-heading font-bold">
          Thousands walk past your store every day.<br />
          <span className="text-slate-400">Most never stop.</span>
        </h2>
        <p className="text-slate-400 text-base max-w-xl mx-auto">
          Airport retail is competitive. Travelers are distracted, time-pressured, and bombarded with offers. Converting casual passersby into buyers is hard — without the right incentive.
        </p>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-left mt-4">
          {[
            { icon: Users, title: "High footfall, low conversion", text: "Airports generate enormous foot traffic — but only a fraction of travelers walk through your door." },
            { icon: Percent, title: "Generic promotions don't work", text: "Window displays and blanket offers don't cut through the noise. Travelers need a personal reason to stop." },
            { icon: Euro, title: "High rents, thin margins", text: "Airport leases are expensive. Every unsold item reduces profitability. You need proven foot traffic drivers." },
          ].map(({ icon: Icon, title, text }) => (
            <div key={title} className="bg-white/5 border border-white/10 rounded-2xl p-5 space-y-3">
              <Icon className="w-6 h-6 text-orange-400" />
              <p className="font-semibold">{title}</p>
              <p className="text-slate-400 text-sm leading-relaxed">{text}</p>
            </div>
          ))}
        </div>
      </div>
    </Slide>
  );
}

function SolutionSlide() {
  return (
    <Slide bg="bg-gradient-to-br from-orange-500 to-amber-600" className="text-white">
      <div className="max-w-3xl w-full space-y-5 text-center">
        <Tag label="Fully Automated Solution" color="text-white bg-white/20 border-white/30" />
        <h2 className="text-3xl sm:text-4xl font-heading font-bold">Zero manual work. 100% automated checkout-to-payout.</h2>
        <p className="text-orange-100 text-base max-w-xl mx-auto">
          Travel agencies issue personalised DutyCredit vouchers automatically. Your POS reads them, applies the discount, logs the transaction, and triggers the billing — entirely without staff intervention.
        </p>
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-center gap-3 mt-2">
          {[
            { n: "1", icon: Building2, label: "Agency booking triggers DutyCredit" },
            { n: "2", icon: Gift, label: "Voucher emailed to traveler" },
            { n: "3", icon: Store, label: "Traveler shops at your store" },
            { n: "4", icon: QrCode, label: "POS scans & auto-applies discount" },
            { n: "5", icon: BarChart3, label: "Dashboard & invoice auto-updated" },
            { n: "6", icon: TrendingUp, label: "Monthly invoice auto-generated" },
          ].map((s, i, arr) => (
            <>
              <div key={s.n} className="flex flex-col items-center text-center gap-2 max-w-[100px]">
                <div className="relative">
                  <div className="w-11 h-11 bg-white/20 border border-white/30 rounded-2xl flex items-center justify-center">
                    <s.icon className="w-5 h-5 text-white" />
                  </div>
                  <div className="absolute -top-2 -right-2 w-5 h-5 bg-slate-900 text-white rounded-full text-xs flex items-center justify-center font-bold">{s.n}</div>
                </div>
                <p className="text-white text-xs font-medium leading-snug">{s.label}</p>
              </div>
              {i < arr.length - 1 && <ArrowRight key={`a${i}`} className="w-4 h-4 text-white/40 hidden sm:block shrink-0 mt-[-20px]" />}
            </>
          ))}
        </div>
        <div className="bg-white/10 border border-white/20 rounded-2xl p-4 mt-2">
          <p className="text-white text-sm font-semibold">💡 You only pay when a voucher is redeemed — 5% of gross. Invoice is auto-generated monthly. Zero manual reconciliation.</p>
        </div>
      </div>
    </Slide>
  );
}

function AccountSlide() {
  return (
    <Slide bg="bg-slate-50">
      <div className="max-w-3xl w-full space-y-5">
        <div className="flex justify-center"><Tag label="Step 1 — Getting Started" /></div>
        <h2 className="text-3xl sm:text-4xl font-heading font-bold text-slate-900 text-center">Creating Your Retailer Account</h2>
        <p className="text-slate-500 text-center text-base max-w-xl mx-auto">Sign up in minutes. No legal complexity. No technical barriers.</p>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-2">
          {[
            { icon: UserPlus, step: "1", title: "Apply online", desc: "Go to dutyboost.com/retailer-signup. Fill in your store name, airport location, category, and business details (KVK, VAT). Takes under 5 minutes.", color: "bg-orange-500" },
            { icon: Shield, step: "2", title: "Account review", desc: "Our team verifies your store details and activates your account — typically within 1 business day.", color: "bg-amber-600" },
            { icon: Receipt, step: "3", title: "Purchase Order sent", desc: "You receive a signed digital Purchase Order confirming the 5% performance fee model and all service terms.", color: "bg-rose-500" },
            { icon: Settings, step: "4", title: "Dashboard access", desc: "Log in to your Retailer Dashboard. View live transactions, revenue stats, monthly invoices, and traveler insights.", color: "bg-red-600" },
          ].map(({ icon: Icon, step, title, desc, color }) => (
            <div key={step} className="flex gap-4 bg-white border border-slate-200 rounded-2xl p-5">
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

function SetupSlide() {
  return (
    <Slide>
      <div className="max-w-3xl w-full space-y-5">
        <div className="flex justify-center"><Tag label="Step 2 — Store Setup" /></div>
        <h2 className="text-3xl sm:text-4xl font-heading font-bold text-slate-900 text-center">Connecting Your POS System</h2>
        <p className="text-slate-500 text-center text-base max-w-xl mx-auto">DutyBoost integrates directly into your existing checkout flow. No separate device or manual step needed.</p>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          {[
            {
              icon: Zap, color: "bg-orange-500", title: "POS plugin installed",
              desc: "Our team installs a lightweight POS plugin that connects DutyBoost to your existing checkout system. Works with all major providers."
            },
            {
              icon: QrCode, color: "bg-amber-600", title: "QR auto-detected",
              desc: "When a traveler presents their QR code, your POS scanner reads it automatically. No separate device or manual lookup required."
            },
            {
              icon: CreditCard, color: "bg-rose-500", title: "Discount applied instantly",
              desc: "The POS calculates the effective discount, deducts it from the total, and logs the transaction — all in under 2 seconds."
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
        <div className="bg-orange-50 border border-orange-200 rounded-2xl p-4 flex gap-3 items-start">
          <Zap className="w-5 h-5 text-orange-500 shrink-0 mt-0.5" />
          <p className="text-orange-800 text-sm">
            <span className="font-semibold">100% automated at checkout.</span> Your staff does nothing differently. The POS handles detection, discount calculation, transaction logging, and data sync to your dashboard — automatically.
          </p>
        </div>
      </div>
    </Slide>
  );
}

function ScanFlowSlide() {
  return (
    <Slide bg="bg-slate-50">
      <div className="max-w-3xl w-full space-y-5">
        <div className="flex justify-center"><Tag label="Step 3 — Automated Checkout" /></div>
        <h2 className="text-3xl sm:text-4xl font-heading font-bold text-slate-900 text-center">What Happens at the Register</h2>
        <p className="text-slate-500 text-center text-base">Fully automated. No staff training required beyond a standard checkout.</p>
        <div className="flex flex-col gap-3">
          {[
            { n: "1", icon: Users, color: "bg-blue-600", title: "Traveler presents QR at checkout", desc: "The customer shows their DutyCredit QR code (received by email). Your standard barcode scanner reads it as part of the normal checkout flow." },
            { n: "2", icon: QrCode, color: "bg-orange-500", title: "POS validates & fetches voucher", desc: "The POS plugin instantly calls the DutyBoost API, validates the QR, confirms it is active, and retrieves the discount tier — in under 1 second." },
            { n: "3", icon: Percent, color: "bg-amber-600", title: "Discount calculated automatically", desc: "DutyBoost calculates the effective discount based on basket value and number of items (5–25%). The POS applies it to the total without any manual input." },
            { n: "4", icon: Receipt, color: "bg-emerald-600", title: "Transaction logged & synced", desc: "The final transaction value, discount applied, and platform fee are recorded in real time. Your dashboard updates instantly. The voucher is marked redeemed." },
            { n: "5", icon: CheckCircle2, color: "bg-green-600", title: "Invoice generated automatically", desc: "At month end, DutyBoost automatically generates your invoice, calculates the 5% fee on gross redemption volume, and sends it for payment — no manual reconciliation needed." },
          ].map(({ n, icon: Icon, color, title, desc }) => (
            <div key={n} className="flex gap-4 bg-white border border-slate-200 rounded-2xl p-4 items-start">
              <div className={`w-9 h-9 ${color} rounded-xl flex items-center justify-center shrink-0`}>
                <Icon className="w-4 h-4 text-white" />
              </div>
              <div>
                <p className="font-semibold text-slate-800 text-sm">{n}. {title}</p>
                <p className="text-slate-500 text-xs mt-0.5 leading-relaxed">{desc}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </Slide>
  );
}

function FinancialsSlide() {
  return (
    <Slide bg="bg-slate-900" className="text-white">
      <div className="max-w-3xl w-full space-y-5 text-center">
        <Tag label="Automated Billing" color="text-orange-300 bg-orange-900/40 border-orange-700" />
        <h2 className="text-3xl sm:text-4xl font-heading font-bold">Transparent. Automated. No Surprises.</h2>
        <p className="text-slate-400 text-base max-w-xl mx-auto">Every financial step — from discount calculation to fee invoicing to payout — happens automatically, without anyone lifting a finger.</p>

        <div className="bg-white/5 border border-white/10 rounded-2xl p-5 space-y-4 text-left">
          <p className="text-slate-300 text-sm font-medium mb-2">Example: Traveler basket = €200 | 2 items | Base discount 20%</p>
          {[
            { label: "POS reads QR → fetches discount tier", value: "Automated", color: "text-blue-300" },
            { label: "Effective discount applied at till (20% ÷ 2 = 10%)", value: "−€20.00", color: "text-orange-300" },
            { label: "Net amount collected from traveler", value: "€180.00", color: "text-white" },
            { label: "Transaction logged to dashboard (real-time)", value: "Automated", color: "text-blue-300" },
            { label: "DutyBoost platform fee (5% of gross)", value: "−€10.00", color: "text-slate-400" },
            { label: "Monthly invoice generated & sent", value: "Automated", color: "text-blue-300" },
            { label: "Your net revenue after fee", value: "€170.00 ✓", color: "text-green-300 font-bold text-lg" },
          ].map(({ label, value, color }) => (
            <div key={label} className="flex justify-between items-center border-b border-white/10 pb-2 last:border-0 last:pb-0">
              <span className="text-slate-400 text-sm">{label}</span>
              <span className={`text-sm font-semibold ${color}`}>{value}</span>
            </div>
          ))}
        </div>

        <div className="grid grid-cols-3 gap-3 mt-2">
          {[
            { v: "5%", l: "fee auto-calculated per redemption" },
            { v: "0", l: "manual reconciliation steps" },
            { v: "Auto", l: "invoice sent at month end" },
          ].map(({ v, l }) => (
            <div key={l} className="bg-white/5 border border-white/10 rounded-2xl p-3 text-center">
              <p className="text-xl font-bold text-orange-300">{v}</p>
              <p className="text-slate-400 text-xs mt-1">{l}</p>
            </div>
          ))}
        </div>
        <p className="text-slate-500 text-xs">Invoices are auto-generated monthly. Payment via registered direct debit or bank transfer. Overdue invoices trigger automated reminders.</p>
      </div>
    </Slide>
  );
}

function DashboardSlide() {
  return (
    <Slide bg="bg-slate-50">
      <div className="max-w-3xl w-full space-y-5">
        <div className="flex justify-center"><Tag label="Your Retailer Dashboard" /></div>
        <h2 className="text-3xl sm:text-4xl font-heading font-bold text-slate-900 text-center">Full Visibility. Zero Guesswork.</h2>
        <p className="text-slate-500 text-center text-base max-w-xl mx-auto">Your dashboard gives you everything you need to understand your DutyBoost performance at a glance.</p>
        <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
          {[
            { icon: TrendingUp, title: "Transaction volume", desc: "Total gross sales driven by DutyCredit redemptions" },
            { icon: BarChart3, title: "Revenue per store", desc: "Performance broken down by location if you have multiple stores" },
            { icon: PieChart, title: "Conversion analytics", desc: "How many travelers visited, how many converted, average basket size" },
            { icon: Clock, title: "Redemption heatmap", desc: "See which hours and days generate the most DutyCredit activity" },
            { icon: Bell, title: "Live notifications", desc: "Get alerted when a voucher is redeemed at your store" },
            { icon: Download, title: "Monthly invoices", desc: "Download PDF invoices per month for your accounting records" },
          ].map(({ icon: Icon, title, desc }) => (
            <div key={title} className="bg-white border border-slate-200 rounded-2xl p-4 space-y-2">
              <Icon className="w-5 h-5 text-orange-500" />
              <p className="font-semibold text-slate-800 text-sm">{title}</p>
              <p className="text-slate-500 text-xs leading-relaxed">{desc}</p>
            </div>
          ))}
        </div>
      </div>
    </Slide>
  );
}

function RetailerLiveDataSlide() {
  const recentScans = [
    { code: "DC-AMS-4821", time: "Today, 14:32", discount: "15%", sale: "€ 214", saved: "€ 32", fee: "€ 10.70" },
    { code: "DC-AMS-4790", time: "Today, 11:08", discount: "15%", sale: "€ 340", saved: "€ 51", fee: "€ 17.00" },
    { code: "DC-AMS-4744", time: "Yesterday, 17:45", discount: "10%", sale: "€ 175", saved: "€ 18", fee: "€ 8.75" },
    { code: "DC-AMS-4710", time: "Yesterday, 09:12", discount: "15%", sale: "€ 420", saved: "€ 63", fee: "€ 21.00" },
    { code: "DC-AMS-4688", time: "2 Apr, 16:20", discount: "10%", sale: "€ 98", saved: "€ 10", fee: "€ 4.90" },
  ];

  return (
    <Slide bg="bg-slate-50">
      <div className="max-w-4xl w-full space-y-4">
        <div>
          <div className="flex justify-center mb-1"><Tag label="Live Dashboard Example" /></div>
          <h2 className="text-2xl sm:text-3xl font-heading font-bold text-slate-900 text-center">What You See in Your Dashboard</h2>
          <p className="text-slate-500 text-center text-sm mt-1">Example: Schiphol Duty Free — Amsterdam Airport — Last 30 days</p>
        </div>

        {/* KPI strip */}
        <div className="grid grid-cols-4 gap-3">
          {[
            { label: "Total Redemptions", value: "523", sub: "DutyCredits scanned", color: "text-blue-600", bg: "bg-blue-50 border-blue-200" },
            { label: "Gross Revenue", value: "€ 52,300", sub: "from DutyCredit sales", color: "text-orange-600", bg: "bg-orange-50 border-orange-200" },
            { label: "Platform Fee (5%)", value: "€ 2,615", sub: "billed monthly", color: "text-red-600", bg: "bg-red-50 border-red-200" },
            { label: "Your Net Revenue", value: "€ 49,685", sub: "after DutyBoost fee", color: "text-emerald-600", bg: "bg-emerald-50 border-emerald-200" },
          ].map(({ label, value, sub, color, bg }) => (
            <div key={label} className={`border rounded-xl p-3 ${bg}`}>
              <p className="text-xs text-slate-500 font-medium">{label}</p>
              <p className={`text-2xl font-bold font-heading ${color}`}>{value}</p>
              <p className="text-xs text-slate-400 mt-0.5">{sub}</p>
            </div>
          ))}
        </div>

        {/* Breakdown + scans table */}
        <div className="grid grid-cols-5 gap-3">
          {/* Revenue breakdown */}
          <div className="col-span-2 bg-white border border-slate-200 rounded-xl p-4 space-y-3">
            <p className="font-semibold text-slate-800 text-sm">Monthly Revenue Statement</p>
            <p className="text-xs text-slate-400">April 2026 — Schiphol Duty Free</p>
            <div className="space-y-2 text-sm">
              {[
                { label: "Gross DutyCredit sales", value: "€ 52,300", color: "text-slate-800" },
                { label: "Avg. basket size", value: "€ 100", color: "text-slate-800" },
                { label: "Total traveler savings", value: "€ 7,845", color: "text-orange-600" },
                { label: "DutyBoost fee (5%)", value: "− € 2,615", color: "text-red-600 font-bold" },
                { label: "Net revenue (after fee)", value: "€ 49,685", color: "text-emerald-600 font-bold" },
                { label: "Invoice due (30 Apr)", value: "€ 2,615", color: "text-slate-600 font-semibold" },
              ].map(({ label, value, color }) => (
                <div key={label} className="flex justify-between items-center border-b border-slate-100 pb-1.5 last:border-0">
                  <span className="text-slate-500 text-xs">{label}</span>
                  <span className={`text-xs font-semibold ${color}`}>{value}</span>
                </div>
              ))}
            </div>
            <div className="bg-orange-50 border border-orange-200 rounded-lg p-2.5 text-xs text-orange-700">
              📄 Invoice sent by DutyBoost at month end. Pay by bank transfer or card.
            </div>
          </div>

          {/* Recent scans table */}
          <div className="col-span-3 bg-white border border-slate-200 rounded-xl p-4 space-y-3">
            <p className="font-semibold text-slate-800 text-sm">Recent QR Scan Transactions</p>
            <table className="w-full text-xs">
              <thead>
                <tr className="border-b border-slate-100">
                  {["Code", "Scanned", "Discount", "Sale Value", "Traveler Saved", "Fee (5%)"].map(h => (
                    <th key={h} className="text-left py-1.5 px-2 text-slate-400 font-medium">{h}</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {recentScans.map(s => (
                  <tr key={s.code} className="border-b border-slate-50 hover:bg-slate-50">
                    <td className="py-2 px-2 font-mono text-slate-500">{s.code}</td>
                    <td className="py-2 px-2 text-slate-400">{s.time}</td>
                    <td className="py-2 px-2 font-bold text-orange-600">{s.discount}</td>
                    <td className="py-2 px-2 font-semibold text-slate-800">{s.sale}</td>
                    <td className="py-2 px-2 text-emerald-600 font-medium">{s.saved}</td>
                    <td className="py-2 px-2 text-red-500 font-medium">{s.fee}</td>
                  </tr>
                ))}
              </tbody>
            </table>
            <div className="grid grid-cols-3 gap-2 pt-1">
              {[
                { label: "Avg discount applied", value: "12.4%", color: "text-orange-600" },
                { label: "Avg sale per scan", value: "€ 249", color: "text-slate-800" },
                { label: "Redemption this week", value: "37 scans", color: "text-blue-600" },
              ].map(({ label, value, color }) => (
                <div key={label} className="bg-slate-50 border border-slate-200 rounded-lg p-2 text-center">
                  <p className={`font-bold text-sm ${color}`}>{value}</p>
                  <p className="text-xs text-slate-400 mt-0.5">{label}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </Slide>
  );
}

function AgenciesNeedYouSlide() {
  return (
    <Slide bg="bg-gradient-to-br from-blue-50 via-white to-orange-50">
      <div className="max-w-3xl w-full space-y-5 text-center">
        <Tag label="The Bigger Picture" color="text-blue-600 bg-blue-50 border-blue-200" />
        <h2 className="text-3xl sm:text-4xl font-heading font-bold text-slate-900">
          Travel Agencies Need You.<br />
          <span className="text-slate-500">And You Need Them.</span>
        </h2>
        <p className="text-slate-500 text-base max-w-2xl mx-auto">
          DutyBoost is a two-sided platform. Without participating retailers, agencies have nowhere to send their travelers. Without agency bookings, there are no travelers with vouchers. Your participation makes the whole system work.
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center mt-2">
          <div className="bg-orange-50 border border-orange-200 rounded-2xl p-5 flex-1 text-left space-y-2">
            <Store className="w-6 h-6 text-orange-600" />
            <p className="font-semibold text-orange-900">Your role as a retailer</p>
            <p className="text-slate-500 text-sm">You accept DutyCredits, offer genuine discounts, and close the loop. In return, you receive pre-motivated buyers who already intended to enter your store — and a 5% performance fee only on completed transactions.</p>
          </div>
          <div className="bg-blue-50 border border-blue-200 rounded-2xl p-5 flex-1 text-left space-y-2">
            <Building2 className="w-6 h-6 text-blue-600" />
            <p className="font-semibold text-blue-900">What agencies bring</p>
            <p className="text-slate-500 text-sm">Travel agencies integrate DutyBoost into their booking confirmation flow. Every ticket sold at a partner agency generates a DutyCredit for the traveler — pointing them to you.</p>
          </div>
        </div>
        <div className="bg-slate-900 text-white rounded-2xl px-6 py-4 text-sm font-semibold">
          🔁 More retailers → larger network → more value for travelers → more agencies want in → more vouchers → more footfall for you
        </div>
      </div>
    </Slide>
  );
}

function CtaSlide() {
  return (
    <div className="w-full h-full flex flex-col items-center justify-center bg-gradient-to-br from-orange-500 to-amber-600 text-white px-8 sm:px-16 py-12 relative overflow-hidden">
      <div className="absolute top-0 right-0 w-80 h-80 bg-white/10 rounded-full blur-3xl" />
      <div className="absolute bottom-0 left-0 w-80 h-80 bg-black/10 rounded-full blur-3xl" />
      <div className="relative text-center space-y-5 max-w-2xl">
        <div className="flex justify-center"><DutyBoostLogo height={90} /></div>
        <Tag label="Ready to join?" color="text-white bg-white/20 border-white/30" />
        <h2 className="text-3xl sm:text-5xl font-heading font-bold">Start Accepting DutyCredits</h2>
        <p className="text-orange-100 text-lg leading-relaxed">
          No subscriptions. No system changes. Just more qualified customers walking through your door.
        </p>
        <div className="grid grid-cols-3 gap-3 mt-2">
          {[
            { v: "5%", l: "fee only on redemptions" },
            { v: "0€", l: "upfront or monthly cost" },
            { v: "24h", l: "account activation" },
          ].map(({ v, l }) => (
            <div key={l} className="bg-white/10 border border-white/20 rounded-2xl p-3 text-center">
              <p className="text-2xl font-bold">{v}</p>
              <p className="text-orange-200 text-xs mt-1">{l}</p>
            </div>
          ))}
        </div>
        <a href="/retailer-signup" className="inline-block mt-2 bg-white text-orange-600 font-bold px-8 py-3 rounded-xl hover:bg-orange-50 transition-colors text-sm shadow-lg">
          Register Your Store at DutyBoost.com →
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
    case "problem": return <ProblemSlide />;
    case "solution": return <SolutionSlide />;
    case "account": return <AccountSlide />;
    case "setup": return <SetupSlide />;
    case "scan_flow": return <ScanFlowSlide />;
    case "financials": return <FinancialsSlide />;
    case "dashboard": return <DashboardSlide />;
    case "live_data": return <RetailerLiveDataSlide />;
    case "agencies_need_you": return <AgenciesNeedYouSlide />;
    case "cta": return <CtaSlide />;
    default: return null;
  }
}

// ─── Main Component ───────────────────────────────────────────────────────────

export default function RetailerPresentationDeck() {
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
        <div className="flex items-center gap-2 bg-orange-600/20 border border-orange-600/40 rounded-full px-4 py-1.5">
          <Store className="w-4 h-4 text-orange-400" />
          <span className="text-orange-300 text-xs font-semibold">Airport Retailer Deck</span>
        </div>
        <a href="/deck" className="ml-auto text-slate-500 hover:text-slate-300 text-xs transition-colors">← Back to Overview</a>
        <a href="/agency-deck" className="text-slate-500 hover:text-blue-300 text-xs transition-colors">Travel Agency Deck →</a>
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
              className={`h-2 rounded-full transition-all ${i === current ? "bg-orange-400 w-6" : "bg-white/20 hover:bg-white/40 w-2"}`} />
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