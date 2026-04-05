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
    icon: UtensilsCrossed,
    title: "Guaranteed Corporate Foot Traffic",
    description: "DutyBoost delivers pre-qualified business travelers directly to participating F&B outlets. These are high-income, expense-covered customers who are ready to spend.",
  },
  {
    icon: BarChart3,
    title: "Commission on Incremental Sales",
    description: "Airport F&B retailers pay a commission only on sales generated through DutyBoost. No upfront cost, no subscription — you only pay when we deliver revenue.",
  },
  {
    icon: ShieldCheck,
    title: "Real-Time QR Redemption",
    description: "Travelers scan their DutyCredit QR at the point of sale. Instant validation, instant approval. No manual processing, no settlement delays.",
  },
  {
    icon: CreditCard,
    title: "Zero Cost for Companies",
    description: "Corporate clients enrol their travelers at no charge. DutyBoost is entirely funded by the F&B merchant commission — making adoption frictionless for any company.",
  },
  {
    icon: Globe2,
    title: "Multi-Airport Coverage",
    description: "Join the DutyBoost merchant network across multiple airports. Traveler spend follows them — wherever they fly, your outlet is in the loop.",
  },
  {
    icon: Clock,
    title: "Predictable B2B Volume",
    description: "Corporate travel budgets are allocated in advance. That means predictable, pre-funded demand hitting your outlet — not random walk-ins.",
  },
];

const steps = [
  { step: "01", title: "Company Enrols — For Free", desc: "A corporate travel manager registers their employees on DutyBoost at zero cost. No subscription, no setup fee. Travelers get access to their F&B DutyCredits instantly." },
  { step: "02", title: "Traveler Arrives at the Airport", desc: "The business traveler opens DutyBoost, generates a time-limited QR code, and heads to any participating F&B outlet in the terminal." },
  { step: "03", title: "Merchant Scans & Earns", desc: "The F&B outlet scans the QR. The transaction is validated in real time. The merchant receives the full sale — DutyBoost collects a commission on the incremental revenue delivered." },
  { step: "04", title: "Retailer Pays Only on Results", desc: "At the end of each period, participating F&B merchants are invoiced a commission only on the sales DutyBoost generated. No fixed costs, no risk — pure performance." },
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
  { value: "€0", label: "Cost for companies" },
  { value: "5–15%", label: "Commission on F&B sales" },
  { value: "100%", label: "Performance-based — pay on results" },
  { value: "Real-time", label: "QR validation at point of sale" },
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
            <Link to="/business-travel/get-started">
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
            <UtensilsCrossed className="w-3 h-3 mr-1.5 inline" />
            Business Travel — Airport F&B Programme
          </Badge>

          <h1 className="text-5xl md:text-7xl font-heading font-bold tracking-tight leading-tight">
            Turn business travelers into{" "}
            <span className="bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
              guaranteed F&B revenue
            </span>
          </h1>

          <p className="text-xl text-muted-foreground max-w-2xl mx-auto leading-relaxed">
            DutyBoost connects <strong className="text-foreground">corporate travelers</strong> with airport F&B outlets — at <strong className="text-foreground">zero cost for companies</strong>. Travelers pay using pre-allocated DutyCredits. Airport F&B merchants receive a guaranteed flow of pre-qualified, expense-covered customers and pay a commission <strong className="text-foreground">only on the sales we deliver</strong>.
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
            <h2 className="text-4xl font-heading font-bold">Everyone wins — retailers fund it all</h2>
            <p className="text-muted-foreground max-w-xl mx-auto">
              Companies and travelers pay nothing. Airport F&B merchants pay only on results.
            </p>
          </div>
          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                icon: UtensilsCrossed,
                title: "Airport F&B Merchants",
                color: "from-orange-400 to-orange-600",
                bg: "bg-orange-50",
                iconColor: "text-orange-600",
                desc: "You receive a steady flow of corporate travelers with pre-allocated budgets ready to spend. Pay a commission of 5–15% only on the incremental sales DutyBoost delivers. No setup fee, no monthly cost.",
                benefits: ["Pay only on delivered revenue", "Guaranteed pre-qualified spend", "Real-time QR at point of sale"],
              },
              {
                icon: Briefcase,
                title: "Business Travelers",
                color: "from-primary to-primary/70",
                bg: "bg-primary/10",
                iconColor: "text-primary",
                desc: "No expense forms, no queues, no receipts. Present your DutyCredit QR at any participating F&B outlet in the terminal and pay instantly within your company's approved budget.",
                benefits: ["Zero paperwork or receipts", "Instant QR at airport F&B", "Budget-compliant by design"],
              },
              {
                icon: Building2,
                title: "Companies — Free to Join",
                color: "from-blue-400 to-blue-600",
                bg: "bg-blue-50",
                iconColor: "text-blue-600",
                desc: "Enrol your traveling employees at no cost. DutyBoost manages the F&B spend infrastructure — policy engine, QR redemption, reporting — entirely funded by the merchant commission.",
                benefits: ["Zero cost to companies", "Full spend visibility", "No integration required"],
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
            <h2 className="text-4xl font-heading font-bold">Built to grow F&B revenue at airports</h2>
            <p className="text-muted-foreground max-w-xl mx-auto">
              Every feature designed to deliver more corporate customers to your outlet — automatically.
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
                Join the DutyBoost F&B merchant network
              </h2>
              <p className="text-primary-foreground/80 text-lg max-w-xl mx-auto">
                Get a guaranteed stream of corporate travelers delivered to your outlet. No upfront cost. No monthly fee. Pay only on the sales we generate for you.
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