import { useState } from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import DutyBoostLogo from "../components/DutyBoostLogo";
import LanguageSwitcher from "../components/LanguageSwitcher";
import {
  Zap, Plug, Wallet, TrendingUp, ShieldCheck, Users, Store, Plane,
  QrCode, ArrowRight, CheckCircle2, Calculator, Sparkles, Code2, Handshake, Cpu, Globe
} from "lucide-react";
import { fmtMoney } from "../utils/formatNumber";

// ── Revenue model ──────────────────────────────────────────────
// Retailer pays 2.5% platform fee on every confirmed DutyCredit
// redemption. That fee is split three ways when the retailer was
// acquired through a POS Channel Partner:
//
//   • Travel Partner   → 20% of fee  (0.50% of gross)  — brings the traveller
//   • POS Channel      → 10% of fee  (0.25% of gross)  — brings the retailer
//   • DutyBoost        → 70% of fee  (1.75% of gross)  — runs the platform
//
// The retailer's cost is identical regardless of channel — the
// channel commission is carved out of DutyBoost's own margin.
const PLATFORM_FEE_PCT = 2.5;
const POS_SHARE_PCT = 10; // % of the platform fee

export default function PosChannelPartner() {
  // ── Interactive earnings calculator ──
  const [retailerCount, setRetailerCount] = useState(200);
  const [avgAnnualSales, setAvgAnnualSales] = useState(500000);
  const [redemptionRate, setRedemptionRate] = useState(8);

  const redemptionVolume = (retailerCount * avgAnnualSales * redemptionRate) / 100;
  const platformFees = (redemptionVolume * PLATFORM_FEE_PCT) / 100;
  const posEarnings = (platformFees * POS_SHARE_PCT) / 100;

  const steps = [
    {
      num: "01",
      icon: Code2,
      title: "One-time integration",
      desc: "DutyBoost exposes a simple webhook + QR-scan endpoint. Your engineering team integrates once — typically in under two weeks.",
    },
    {
      num: "02",
      icon: Zap,
      title: "Flip the switch",
      desc: "Each of your airport-retailer clients sees a 'DutyBoost' toggle in their POS dashboard. They opt in with a single click — no hardware, no training.",
    },
    {
      num: "03",
      icon: QrCode,
      title: "Redemptions flow",
      desc: "When a traveller scans their DutyCredit QR at checkout, your POS validates it via the webhook and applies the discount automatically.",
    },
    {
      num: "04",
      icon: Wallet,
      title: "Earn recurring revenue",
      desc: "Every confirmed redemption on a retailer you brought in earns you 10% of the platform fee — monthly, for the lifetime of the account.",
    },
  ];

  const benefits = [
    {
      icon: TrendingUp,
      title: "Recurring revenue, zero marginal cost",
      desc: "After the one-time integration, every redemption on your retailers generates passive income. No ongoing support burden — DutyBoost handles traveller support, retailer onboarding, and settlement.",
    },
    {
      icon: Users,
      title: "Sticky retailer relationships",
      desc: "Retailers who earn more through DutyBoost stay on your POS longer. You're not just processing their payments — you're growing their revenue, which reduces churn.",
    },
    {
      icon: ShieldCheck,
      title: "Retailer pays nothing extra",
      desc: "The channel fee is carved out of DutyBoost's margin, never added to the retailer's bill. Your clients pay the same 2.5% whether they onboard via you or directly — so there's no reason to bypass the channel.",
    },
    {
      icon: Globe,
      title: "Airport-network effect",
      desc: "As DutyBoost expands to more airports and travel partners, the redemption volume on your retailers grows automatically. You benefit from platform growth you didn't have to fund.",
    },
    {
      icon: Cpu,
      title: "No hardware, no POS replacement",
      desc: "DutyBoost is a software layer on top of your existing POS. No terminals to ship, no firmware to update, no field-service calls. Pure API integration.",
    },
    {
      icon: Handshake,
      title: "Co-marketing by default",
      desc: "DutyBoost drives traveller demand to your retailers' stores. Every campaign we run increases footfall and basket size at the checkout — on hardware you already own.",
    },
  ];

  const splitRows = [
    { label: "Retailer pays (platform fee)", value: "2.5% of redemption", note: "Same regardless of channel", highlight: false },
    { label: "Travel Partner earns", value: "20% of fee", note: "0.50% of gross · brings the traveller", highlight: false },
    { label: "POS Channel Partner earns", value: "10% of fee", note: "0.25% of gross · brings the retailer", highlight: true },
    { label: "DutyBoost retains", value: "70% of fee", note: "1.75% of gross · runs the platform", highlight: false },
  ];

  return (
    <div className="min-h-screen bg-background font-body">
      {/* ── Nav ── */}
      <nav className="sticky top-0 z-50 backdrop-blur border-b border-border bg-background/80">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 h-16 flex items-center justify-between">
          <Link to="/"><DutyBoostLogo height={45} /></Link>
          <div className="flex items-center gap-3">
            <LanguageSwitcher />
            <a href="#calculator">
              <Button className="gap-2" style={{ background: "linear-gradient(to right, #7c3aed, #6366f1)" }}>
                <Calculator className="w-4 h-4" /> Model your earnings
              </Button>
            </a>
          </div>
        </div>
      </nav>

      {/* ── Hero ── */}
      <section className="relative overflow-hidden">
        <div className="absolute inset-0 opacity-40" style={{ background: "radial-gradient(ellipse 60% 50% at 50% 0%, hsl(255 90% 92%) 0%, transparent 70%)" }} />
        <div className="relative max-w-4xl mx-auto px-4 sm:px-6 py-20 sm:py-28 text-center">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full text-sm font-medium mb-6" style={{ background: "hsl(255 90% 95%)", color: "#6d28d9" }}>
            <Plug className="w-4 h-4" />
            POS &amp; Technology Channel Partners
          </div>
          <h1 className="text-4xl sm:text-6xl font-heading font-bold tracking-tight leading-tight">
            Turn every checkout into{" "}
            <span className="bg-clip-text text-transparent" style={{ backgroundImage: "linear-gradient(to right, #7c3aed, #6366f1)" }}>
              recurring revenue
            </span>
            .
          </h1>
          <p className="text-xl text-muted-foreground mt-6 max-w-2xl mx-auto leading-relaxed">
            Integrate DutyBoost into your POS once. Every airport retailer you switch on earns you a lifetime share of every DutyCredit redemption — passive income from hardware you've already deployed.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-3 mt-10">
            <a href="#calculator">
              <Button size="lg" className="gap-2 h-14 px-8 text-base" style={{ background: "linear-gradient(to right, #7c3aed, #6366f1)" }}>
                <Calculator className="w-5 h-5" /> See your earnings
              </Button>
            </a>
            <Link to="/pos-partner-callback">
              <Button size="lg" variant="outline" className="h-14 px-8 text-base gap-2">
                <Handshake className="w-5 h-5" /> Talk to partnerships
              </Button>
            </Link>
          </div>
          <p className="text-sm text-muted-foreground mt-6">
            One-time integration · No hardware · Live in 2 weeks
          </p>
        </div>
      </section>

      {/* ── The Opportunity ── */}
      <section className="py-16 sm:py-20 bg-card border-y border-border">
        <div className="max-w-5xl mx-auto px-4 sm:px-6">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-heading font-bold">You already own the rail.</h2>
            <p className="text-lg text-muted-foreground mt-3 max-w-2xl mx-auto">
              Your POS terminals sit at the exact moment of purchase in every airport retailer you serve. DutyBoost turns that position into a revenue stream — without changing what your retailers pay.
            </p>
          </div>
          <div className="grid sm:grid-cols-3 gap-5">
            {[
              { icon: Store, title: "You're at the checkout", desc: "Every traveller redemption flows through your hardware. You're already the rail — we make the rail earn." },
              { icon: Users, title: "You have the trust", desc: "Airport retailers already rely on your POS daily. A switch-on from you carries more weight than any cold outreach." },
              { icon: TrendingUp, title: "You have the scale", desc: "Hundreds of retailers on one integration. Activate them all with a dashboard toggle — no per-store sales cycle." },
            ].map((c) => (
              <div key={c.title} className="rounded-2xl border border-border p-6 bg-background">
                <div className="w-11 h-11 rounded-xl flex items-center justify-center mb-4" style={{ background: "hsl(255 90% 95%)" }}>
                  <c.icon className="w-5 h-5" style={{ color: "#6d28d9" }} />
                </div>
                <h3 className="font-heading font-bold text-lg mb-1.5">{c.title}</h3>
                <p className="text-sm text-muted-foreground leading-relaxed">{c.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Revenue Model ── */}
      <section className="py-16 sm:py-24">
        <div className="max-w-4xl mx-auto px-4 sm:px-6">
          <div className="text-center mb-10">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-semibold mb-4" style={{ background: "hsl(255 90% 95%)", color: "#6d28d9" }}>
              <Wallet className="w-3.5 h-3.5" /> The commission model
            </div>
            <h2 className="text-3xl font-heading font-bold">One fee. Three earners.</h2>
            <p className="text-lg text-muted-foreground mt-3 max-w-2xl mx-auto">
              The retailer always pays the same 2.5% platform fee. When you brought the retailer, a slice of that fee flows to you — carved from DutyBoost's margin, never added to the retailer's bill.
            </p>
          </div>

          <div className="rounded-2xl border border-border overflow-hidden bg-card">
            <div className="grid grid-cols-1">
              {splitRows.map((row) => (
                <div
                  key={row.label}
                  className={`flex flex-col sm:flex-row sm:items-center gap-1 sm:gap-4 px-5 sm:px-6 py-4 border-b border-border last:border-b-0 ${row.highlight ? "bg-violet-50" : ""}`}
                >
                  <div className="flex-1">
                    <p className={`font-semibold ${row.highlight ? "text-violet-900" : ""}`}>{row.label}</p>
                    <p className="text-xs text-muted-foreground">{row.note}</p>
                  </div>
                  <div className={`text-lg font-heading font-bold sm:w-56 sm:text-right ${row.highlight ? "text-violet-700" : "text-foreground"}`}>
                    {row.value}
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="flex items-start gap-3 mt-5 text-sm text-muted-foreground bg-muted/50 rounded-xl p-4">
            <ShieldCheck className="w-5 h-5 shrink-0 mt-0.5" style={{ color: "#6d28d9" }} />
            <p>
              <strong className="text-foreground">No bypass incentive.</strong> A retailer onboarded directly pays the same 2.5% as one onboarded via your channel. The channel fee rewards acquisition — it's never a tax on access.
            </p>
          </div>
        </div>
      </section>

      {/* ── How it works ── */}
      <section className="py-16 sm:py-20 bg-card border-y border-border">
        <div className="max-w-5xl mx-auto px-4 sm:px-6">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-heading font-bold">From integration to income</h2>
            <p className="text-lg text-muted-foreground mt-3">Four steps. Two weeks. Lifetime revenue.</p>
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {steps.map((s) => (
              <div key={s.num} className="relative rounded-2xl border border-border p-6 bg-background">
                <div className="flex items-center justify-between mb-4">
                  <div className="w-11 h-11 rounded-xl flex items-center justify-center" style={{ background: "hsl(255 90% 95%)" }}>
                    <s.icon className="w-5 h-5" style={{ color: "#6d28d9" }} />
                  </div>
                  <span className="text-2xl font-heading font-bold text-violet-200">{s.num}</span>
                </div>
                <h3 className="font-heading font-bold mb-1.5">{s.title}</h3>
                <p className="text-sm text-muted-foreground leading-relaxed">{s.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Earnings Calculator ── */}
      <section id="calculator" className="py-16 sm:py-24 scroll-mt-16">
        <div className="max-w-3xl mx-auto px-4 sm:px-6">
          <div className="text-center mb-10">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-semibold mb-4" style={{ background: "hsl(255 90% 95%)", color: "#6d28d9" }}>
              <Calculator className="w-3.5 h-3.5" /> Model your earnings
            </div>
            <h2 className="text-3xl font-heading font-bold">Your recurring revenue</h2>
            <p className="text-lg text-muted-foreground mt-3">Adjust the sliders to see your projected annual channel earnings.</p>
          </div>

          <div className="rounded-2xl border border-border bg-card p-6 sm:p-8 space-y-6">
            <div>
              <div className="flex items-center justify-between mb-2">
                <Label className="text-sm font-medium">Airport stores on your POS</Label>
                <span className="text-sm font-bold font-mono">{retailerCount}</span>
              </div>
              <input
                type="range" min={5} max={1000} step={5} value={retailerCount}
                onChange={(e) => setRetailerCount(Number(e.target.value))}
                className="w-full accent-violet-600"
              />
            </div>
            <div>
              <div className="flex items-center justify-between mb-2">
                <Label className="text-sm font-medium">Avg. annual sales per store (EUR)</Label>
                <span className="text-sm font-bold font-mono">€{avgAnnualSales.toLocaleString()}</span>
              </div>
              <input
                type="range" min={50000} max={2000000} step={10000} value={avgAnnualSales}
                onChange={(e) => setAvgAnnualSales(Number(e.target.value))}
                className="w-full accent-violet-600"
              />
            </div>
            <div>
              <div className="flex items-center justify-between mb-2">
                <Label className="text-sm font-medium">DutyCredit redemption rate (%)</Label>
                <span className="text-sm font-bold font-mono">{redemptionRate}%</span>
              </div>
              <input
                type="range" min={1} max={20} step={1} value={redemptionRate}
                onChange={(e) => setRedemptionRate(Number(e.target.value))}
                className="w-full accent-violet-600"
              />
            </div>

            <div className="border-t border-border pt-6">
              <div className="grid grid-cols-3 gap-4 text-center">
                <div>
                  <p className="text-xs text-muted-foreground mb-1">Redemption volume</p>
                  <p className="text-lg font-heading font-bold">{fmtMoney(redemptionVolume, "EUR", 0)}</p>
                </div>
                <div>
                  <p className="text-xs text-muted-foreground mb-1">Platform fees (2.5%)</p>
                  <p className="text-lg font-heading font-bold">{fmtMoney(platformFees, "EUR", 0)}</p>
                </div>
                <div className="rounded-xl p-2" style={{ background: "hsl(255 90% 95%)" }}>
                  <p className="text-xs mb-1" style={{ color: "#6d28d9" }}>Your channel earnings</p>
                  <p className="text-2xl font-heading font-bold" style={{ color: "#6d28d9" }}>
                    {fmtMoney(posEarnings, "EUR", 0)}
                  </p>
                </div>
              </div>
              <p className="text-xs text-muted-foreground text-center mt-4">
                Projection based on 10% of the 2.5% platform fee. Paid monthly for the lifetime of each retailer account. Illustrative only.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ── Why partner ── */}
      <section className="py-16 sm:py-20 bg-card border-y border-border">
        <div className="max-w-5xl mx-auto px-4 sm:px-6">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-heading font-bold">Why partner with DutyBoost</h2>
            <p className="text-lg text-muted-foreground mt-3">More than a referral fee — a growth engine for your retailer network.</p>
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {benefits.map((b) => (
              <div key={b.title} className="rounded-2xl border border-border p-6 bg-background">
                <div className="w-11 h-11 rounded-xl flex items-center justify-center mb-4" style={{ background: "hsl(255 90% 95%)" }}>
                  <b.icon className="w-5 h-5" style={{ color: "#6d28d9" }} />
                </div>
                <h3 className="font-heading font-bold mb-1.5">{b.title}</h3>
                <p className="text-sm text-muted-foreground leading-relaxed">{b.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Where you fit ── */}
      <section className="py-16 sm:py-20">
        <div className="max-w-4xl mx-auto px-4 sm:px-6">
          <div className="text-center mb-10">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-semibold mb-4" style={{ background: "hsl(255 90% 95%)", color: "#6d28d9" }}>
              <Sparkles className="w-3.5 h-3.5" /> The circular flow
            </div>
            <h2 className="text-3xl font-heading font-bold">Where you fit in the loop</h2>
            <p className="text-lg text-muted-foreground mt-3">You're the rail at the moment of redemption — the point where value becomes revenue.</p>
          </div>
          <div className="flex flex-col sm:flex-row items-stretch gap-3">
            {[
              { icon: Plane, label: "Travel Partner", desc: "Brings the traveller · earns 20% of fee" },
              { icon: Store, label: "Airport Retailer", desc: "Sells & scans the DutyCredit · pays 2.5%" },
              { icon: Cpu, label: "POS Channel", desc: "Validates the QR & applies discount · earns 10%", highlight: true },
              { icon: Wallet, label: "DutyBoost", desc: "Runs the platform · retains 70%" },
            ].map((n, i, arr) => (
              <div key={n.label} className="flex items-stretch gap-3 flex-1">
                <div className={`flex-1 rounded-2xl border p-5 text-center ${n.highlight ? "border-violet-300 bg-violet-50" : "border-border bg-card"}`}>
                  <div className={`w-12 h-12 rounded-xl flex items-center justify-center mx-auto mb-3 ${n.highlight ? "" : ""}`} style={{ background: n.highlight ? "hsl(255 90% 90%)" : "hsl(220 15% 94%)" }}>
                    <n.icon className="w-6 h-6" style={{ color: n.highlight ? "#6d28d9" : "hsl(var(--muted-foreground))" }} />
                  </div>
                  <p className={`font-heading font-bold text-sm ${n.highlight ? "text-violet-900" : ""}`}>{n.label}</p>
                  <p className="text-xs text-muted-foreground mt-1">{n.desc}</p>
                </div>
                {i < arr.length - 1 && (
                  <div className="hidden sm:flex items-center">
                    <ArrowRight className="w-5 h-5 text-muted-foreground" />
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── CTA ── */}
      <section className="py-16 sm:py-24" style={{ background: "linear-gradient(135deg, hsl(255 90% 97%) 0%, hsl(243 75% 97%) 100%)" }}>
        <div className="max-w-2xl mx-auto px-4 sm:px-6 text-center">
          <h2 className="text-3xl sm:text-4xl font-heading font-bold">Ready to switch on your network?</h2>
          <p className="text-lg text-muted-foreground mt-4">
            Tell us about your POS footprint and we'll walk you through the integration, the commercial terms, and a tailored revenue projection.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-3 mt-8">
            <Link to="/pos-partner-callback">
              <Button size="lg" className="gap-2 h-14 px-8 text-base" style={{ background: "linear-gradient(to right, #7c3aed, #6366f1)" }}>
                <Handshake className="w-5 h-5" /> Become a Channel Partner
              </Button>
            </Link>
            <Link to="/">
              <Button size="lg" variant="outline" className="h-14 px-8 text-base gap-2">
                Learn about DutyBoost <ArrowRight className="w-5 h-5" />
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* ── Footer ── */}
      <footer className="border-t border-border py-8 px-4 sm:px-6">
        <div className="max-w-6xl mx-auto flex flex-col md:flex-row items-center justify-between gap-4 text-sm text-muted-foreground">
          <Link to="/"><DutyBoostLogo height={40} /></Link>
          <p>© {new Date().getFullYear()} DutyBoost B.V. — The Travel Retail Conversion Layer</p>
        </div>
      </footer>
    </div>
  );
}