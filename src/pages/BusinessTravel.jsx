import { Link } from "react-router-dom";
import { useState } from "react";
import DutyBoostLogo from "../components/DutyBoostLogo";
import { base44 } from "@/api/base44Client";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  Briefcase, UtensilsCrossed, ShieldCheck, BarChart3,
  ChevronRight, ArrowRight, Star, CheckCircle, XCircle,
  Building2, CreditCard, Clock, Eye, FileText, Globe2
} from "lucide-react";
import WeCallYouModal from "../components/WeCallYouModal";

const features = [
  {
    icon: CreditCard,
    title: "F&B-Restricted DutyCredits",
    description: "Issue meal credits locked exclusively to Food & Beverage merchants. Travelers can only spend at approved F&B outlets — no retail, no exceptions.",
  },
  {
    icon: ShieldCheck,
    title: "Corporate Policy Engine",
    description: "Define daily limits, per-transaction caps, and meal-time windows (breakfast, lunch, dinner). Every transaction is validated in real time against your policy.",
  },
  {
    icon: UtensilsCrossed,
    title: "Whitelisted F&B Merchants",
    description: "Only registered F&B merchants with active status can accept payments. Non-compliant merchants are automatically rejected at point of scan.",
  },
  {
    icon: BarChart3,
    title: "Full Audit & Reporting",
    description: "Every transaction is logged with traveler, merchant, amount, airport, and timestamp. Export CSV reports or integrate via API for VAT breakdown.",
  },
  {
    icon: Clock,
    title: "Short-Lived QR Tokens",
    description: "Signed, time-limited QR codes (2–5 minute TTL) prevent fraud. Single-use enforcement and duplicate scan detection built in.",
  },
  {
    icon: Globe2,
    title: "Multi-Airport Ready",
    description: "Restrict credits to specific departure airports or allow use across any participating location. Scales with your travel programme.",
  },
];

const steps = [
  { step: "01", title: "Company Enrols Travelers", desc: "The corporate admin registers traveling employees on DutyBoost and sets meal-time windows. Each traveler gets access to their personal F&B DutyCredit." },
  { step: "02", title: "Traveler Shows QR at Airport", desc: "At any participating airport F&B outlet, the traveler opens the DutyBoost app and presents their unique, time-limited QR code at the point of sale." },
  { step: "03", title: "15% Discount Applied Instantly", desc: "The merchant scans the QR. The system validates the traveler's eligibility and automatically applies a 15% discount — the merchant receives full settlement from DutyBoost." },
  { step: "04", title: "Annual Fee Billed at Year-End", desc: "At the end of each year, the company receives a single invoice: 10% of the total discounts all their travelers received. Transparent, predictable, no surprises." },
];

const validationRules = [
  "Merchant must be category F&B and status active",
  "Token must not be expired or already used",
  "Airport restriction must match merchant airport",
  "Balance must cover transaction amount",
  "Corporate daily & per-transaction limits enforced",
  "Meal-time windows (breakfast / lunch / dinner) validated",
];

const rejectionTriggers = [
  "Non-F&B merchant category",
  "Expired QR token (> 5 min TTL)",
  "Token already used (single-use enforcement)",
  "Exceeded daily spend limit",
  "Outside configured meal-time window",
  "Airport mismatch",
];

const stats = [
  { value: "15%", label: "Fixed F&B discount for travelers" },
  { value: "10%", label: "Yearly fee of total discounts given" },
  { value: "Real-time", label: "Policy & merchant validation" },
  { value: "Full", label: "Audit trail per transaction" },
];

export default function BusinessTravel() {
  return (
    <div className="min-h-screen bg-background font-body">
      {/* Nav */}
      <nav className="sticky top-0 z-50 backdrop-blur border-b border-border">
        <div className="max-w-6xl mx-auto px-6 h-24 flex items-center justify-between">
          <Link to="/" className="flex items-center">
            <DutyBoostLogo height={130} />
          </Link>
          <div className="flex items-center gap-3 flex-wrap justify-end">
            <Link to="/demo">
              <Button variant="outline" size="sm" className="gap-1.5">
                <Eye className="w-3.5 h-3.5" /> Live Demo
              </Button>
            </Link>
            <Button variant="ghost" size="sm" onClick={() => base44.auth.redirectToLogin('/dashboard')}>Sign In</Button>
            <Link to="/get-started">
              <Button size="sm" className="gap-1">
                Get Started <ChevronRight className="w-3 h-3" />
              </Button>
            </Link>
            <WeCallYouModal trigger={(setOpen) => (
              <Button size="sm" variant="outline" onClick={() => setOpen(true)}>
                We Call You
              </Button>
            )} />
          </div>
        </div>
      </nav>

      {/* Hero */}
      <section className="relative overflow-hidden pt-12 pb-14 px-6">
        <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-background to-accent/5 pointer-events-none" />
        <div className="absolute top-10 right-10 w-72 h-72 bg-primary/10 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute bottom-0 left-0 w-96 h-96 bg-accent/10 rounded-full blur-3xl pointer-events-none" />

        <div className="relative max-w-4xl mx-auto text-center space-y-8">
          <Badge className="bg-primary/10 text-primary border-primary/20 px-4 py-1.5 text-sm font-medium">
            <Briefcase className="w-3 h-3 mr-1.5 inline" />
            Business Travel Mode — F&B DutyCredits
          </Badge>

          <h1 className="text-5xl md:text-7xl font-heading font-bold tracking-tight leading-tight">
            Controlled airport meal spending for{" "}
            <span className="bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
              business travelers
            </span>
          </h1>

          <p className="text-xl text-muted-foreground max-w-2xl mx-auto leading-relaxed">
            Your business travelers get a <strong className="text-foreground">15% discount</strong> on food &amp; beverages at participating airport merchants — automatically. Your company pays a simple <strong className="text-foreground">yearly subscription of 10%</strong> of the total discounts your travelers received. No per-transaction fees. No hidden costs.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center pt-2">
            <Link to="/business-travel/get-started">
              <Button size="lg" className="gap-2 px-8 text-base">
                Get Started for Business <ArrowRight className="w-4 h-4" />
              </Button>
            </Link>
            <a href="#how-it-works">
              <Button size="lg" variant="outline" className="px-8 text-base">
                See How It Works
              </Button>
            </a>
          </div>
        </div>
      </section>

      {/* Stats */}
      <section className="py-10 px-6 bg-card/30 border-y border-border">
        <div className="max-w-4xl mx-auto grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
          {stats.map(({ value, label }) => (
            <div key={label}>
              <p className="text-3xl font-heading font-bold text-primary">{value}</p>
              <p className="text-sm text-muted-foreground mt-1">{label}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Who it's for */}
      <section className="py-14 px-6">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-10 space-y-4">
            <Badge variant="outline" className="text-xs tracking-widest uppercase px-4 py-1">Who It's For</Badge>
            <h2 className="text-4xl font-heading font-bold">Built for corporate travel programmes</h2>
            <p className="text-muted-foreground max-w-xl mx-auto">
              Three stakeholders, one controlled spending loop.
            </p>
          </div>
          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                icon: Building2,
                title: "Corporate Admins",
                color: "from-blue-400 to-blue-600",
                bg: "bg-blue-50",
                iconColor: "text-blue-600",
                desc: "Enrol your travelers and set meal-time windows. Your yearly subscription fee is 10% of the total discounts your travelers received — calculated automatically at year-end.",
                benefits: ["Simple annual billing: 10% of total discounts", "Per-employee enrolment", "Full spend dashboard & reports"],
              },
              {
                icon: Briefcase,
                title: "Business Travelers",
                color: "from-primary to-primary/70",
                bg: "bg-primary/10",
                iconColor: "text-primary",
                desc: "Show your DutyCredit QR at any participating airport F&B outlet and automatically receive a 15% discount at the point of sale. No paperwork, no reimbursements.",
                benefits: ["Automatic 15% F&B discount", "Zero paperwork or receipts", "Works at any participating airport"],
              },
              {
                icon: UtensilsCrossed,
                title: "Airport F&B Merchants",
                color: "from-orange-400 to-orange-600",
                bg: "bg-orange-50",
                iconColor: "text-orange-600",
                desc: "Attract a guaranteed flow of corporate travelers. Scan the DutyCredit QR, apply the 15% discount at POS, and receive full payment settlement — DutyBoost reimburses the discount.",
                benefits: ["Full transaction value settled", "Real-time QR redemption", "Predictable B2B volume"],
              },
            ].map(({ icon: Icon, title, color, bg, iconColor, desc, benefits }) => (
              <div key={title} className="bg-card rounded-2xl border border-border p-8 hover:shadow-lg transition-shadow">
                <div className={`w-16 h-16 rounded-2xl ${bg} flex items-center justify-center mb-5`}>
                  <Icon className={`w-8 h-8 ${iconColor}`} />
                </div>
                <h3 className="font-heading font-bold text-xl mb-3">{title}</h3>
                <p className="text-muted-foreground text-sm leading-relaxed mb-5">{desc}</p>
                <ul className="space-y-2">
                  {benefits.map(b => (
                    <li key={b} className="flex items-center gap-2 text-sm">
                      <div className={`w-1.5 h-1.5 rounded-full bg-gradient-to-r ${color} shrink-0`} />
                      {b}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* How it works */}
      <section id="how-it-works" className="py-12 px-6 bg-card/30 border-y border-border">
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-10 space-y-3">
            <Badge variant="outline" className="text-xs tracking-widest uppercase px-4 py-1">The Flow</Badge>
            <h2 className="text-4xl font-heading font-bold">From Policy to Payment</h2>
          </div>
          <div className="grid md:grid-cols-4 gap-6">
            {steps.map(({ step, title, desc }) => (
              <div key={step} className="bg-card rounded-2xl border border-border p-6 h-full">
                <p className="text-4xl font-heading font-bold text-primary/20 mb-3">{step}</p>
                <h4 className="font-heading font-semibold mb-2">{title}</h4>
                <p className="text-sm text-muted-foreground leading-relaxed">{desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Features */}
      <section className="py-14 px-6">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-10 space-y-4">
            <Badge variant="outline" className="text-xs tracking-widest uppercase px-4 py-1">Platform</Badge>
            <h2 className="text-4xl font-heading font-bold">Everything you need to control F&B spend</h2>
            <p className="text-muted-foreground max-w-xl mx-auto">
              Every feature engineered for compliance, transparency, and zero operational friction.
            </p>
          </div>
          <div className="grid md:grid-cols-3 gap-6">
            {features.map(({ icon: Icon, title, description }) => (
              <div key={title} className="group p-6 rounded-2xl border border-border bg-card hover:border-primary/30 hover:shadow-md transition-all">
                <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center mb-4 group-hover:bg-primary/20 transition-colors">
                  <Icon className="w-5 h-5 text-primary" />
                </div>
                <h4 className="font-heading font-semibold mb-2">{title}</h4>
                <p className="text-sm text-muted-foreground leading-relaxed">{description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Validation rules */}
      <section className="py-14 px-6 bg-card/30 border-y border-border">
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-10 space-y-3">
            <Badge variant="outline" className="text-xs tracking-widest uppercase px-4 py-1">Security</Badge>
            <h2 className="text-4xl font-heading font-bold">Airtight transaction validation</h2>
            <p className="text-muted-foreground max-w-xl mx-auto">Every scan goes through a real-time rules engine. Non-compliant transactions never go through.</p>
          </div>
          <div className="grid md:grid-cols-2 gap-6">
            <div className="bg-card rounded-2xl border border-border p-6 space-y-3">
              <h3 className="font-semibold flex items-center gap-2 text-green-700"><CheckCircle className="w-4 h-4 text-green-500" /> What gets approved</h3>
              {validationRules.map(r => (
                <div key={r} className="flex items-start gap-2 text-sm"><div className="w-1.5 h-1.5 rounded-full bg-green-500 mt-1.5 shrink-0" />{r}</div>
              ))}
            </div>
            <div className="bg-card rounded-2xl border border-border p-6 space-y-3">
              <h3 className="font-semibold flex items-center gap-2 text-red-700"><XCircle className="w-4 h-4 text-red-500" /> What gets blocked</h3>
              {rejectionTriggers.map(r => (
                <div key={r} className="flex items-start gap-2 text-sm"><div className="w-1.5 h-1.5 rounded-full bg-red-500 mt-1.5 shrink-0" />{r}</div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-14 px-6">
        <div className="max-w-3xl mx-auto text-center">
          <div className="bg-gradient-to-br from-primary via-primary/90 to-primary/70 rounded-3xl p-12 text-primary-foreground shadow-2xl relative overflow-hidden">
            <div className="absolute top-0 right-0 w-64 h-64 bg-white/10 rounded-full -translate-y-1/2 translate-x-1/2 pointer-events-none" />
            <div className="absolute bottom-0 left-0 w-48 h-48 bg-black/10 rounded-full translate-y-1/2 -translate-x-1/2 pointer-events-none" />
            <div className="relative space-y-6">
              <Badge className="bg-white/20 text-white border-white/30 text-sm px-4 py-1">Ready to launch?</Badge>
              <h2 className="text-4xl font-heading font-bold">
                The smarter F&B benefit for business travelers
              </h2>
              <p className="text-primary-foreground/80 text-lg max-w-xl mx-auto">
                Your travelers get an automatic 15% discount on airport F&B — no receipts, no reimbursements. Your company pays one simple annual fee: 10% of the total discounts given.
              </p>
              <div className="flex flex-col sm:flex-row gap-3 justify-center">
                <Link to="/business-travel/get-started">
                  <Button size="lg" className="bg-white text-primary hover:bg-white/90 gap-2 px-8 text-base">
                    Get Started <ArrowRight className="w-4 h-4" />
                  </Button>
                </Link>
                <WeCallYouModal trigger={(setOpen) => (
                  <Button size="lg" variant="outline" className="border-white/40 text-white hover:bg-white/10 px-8 text-base" onClick={() => setOpen(true)}>
                    We Call You
                  </Button>
                )} />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-border py-10 px-6 bg-transparent">
        <div className="max-w-6xl mx-auto space-y-4">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4 text-sm text-muted-foreground">
            <div className="flex items-center gap-2">
              <DutyBoostLogo height={130} />
              <span className="text-muted-foreground">— Business Travel Mode</span>
            </div>
            <p>© 2026 DutyBoost. All rights reserved.</p>
          </div>
          <div className="flex flex-wrap justify-center md:justify-start gap-x-5 gap-y-2 text-xs text-muted-foreground border-t border-border pt-4">
            <Link to="/" className="hover:text-primary transition-colors">Home</Link>
            <Link to="/privacy" className="hover:text-primary transition-colors">Privacy Policy</Link>
            <Link to="/terms" className="hover:text-primary transition-colors">Terms of Service</Link>
            <Link to="/faq" className="hover:text-primary transition-colors">FAQ</Link>
            <Link to="/airport-map" className="hover:text-primary transition-colors">Airport Map</Link>
          </div>
        </div>
      </footer>
    </div>
  );
}