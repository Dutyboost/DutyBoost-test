import { useState } from "react";
import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import DutyBoostLogo from "../components/DutyBoostLogo";
import LanguageSwitcher from "../components/LanguageSwitcher";
import {
  Zap, Plug, Wallet, TrendingUp, ShieldCheck, Users, Store, Plane,
  QrCode, ArrowRight, CheckCircle2, Calculator, Sparkles, Code2, Handshake, Cpu, Globe, Layers
} from "lucide-react";
import { fmtMoney } from "../utils/formatNumber";

const PLATFORM_FEE_PCT = 2.5;
const POS_SHARE_PCT = 10;

export default function PosChannelPartner() {
  const { t } = useTranslation();

  const [retailerCount, setRetailerCount] = useState(5);
  const [redemptionRate, setRedemptionRate] = useState(0.01);
  const [currency, setCurrency] = useState("EUR");

  const AVG_ANNUAL_SALES = 15000000;

  const redemptionVolume = (retailerCount * AVG_ANNUAL_SALES * redemptionRate) / 100;
  const platformFees = (redemptionVolume * PLATFORM_FEE_PCT) / 100;
  const posEarnings = (platformFees * POS_SHARE_PCT) / 100;

  const currencyOptions = [
    { code: "EUR", symbol: "€" },
    { code: "USD", symbol: "$" },
    { code: "GBP", symbol: "£" },
  ];

  const steps = [
    { num: "01", icon: Code2, title: t("posChannel.how.step1_title"), desc: t("posChannel.how.step1_desc") },
    { num: "02", icon: Zap, title: t("posChannel.how.step2_title"), desc: t("posChannel.how.step2_desc") },
    { num: "03", icon: QrCode, title: t("posChannel.how.step3_title"), desc: t("posChannel.how.step3_desc") },
    { num: "04", icon: Wallet, title: t("posChannel.how.step4_title"), desc: t("posChannel.how.step4_desc") },
  ];

  const benefits = [
    { icon: TrendingUp, title: t("posChannel.why.benefit1_title"), desc: t("posChannel.why.benefit1_desc") },
    { icon: Users, title: t("posChannel.why.benefit2_title"), desc: t("posChannel.why.benefit2_desc") },
    { icon: ShieldCheck, title: t("posChannel.why.benefit3_title"), desc: t("posChannel.why.benefit3_desc") },
    { icon: Globe, title: t("posChannel.why.benefit4_title"), desc: t("posChannel.why.benefit4_desc") },
    { icon: Cpu, title: t("posChannel.why.benefit5_title"), desc: t("posChannel.why.benefit5_desc") },
    { icon: Handshake, title: t("posChannel.why.benefit6_title"), desc: t("posChannel.why.benefit6_desc") },
  ];

  const splitRows = [
    { label: t("posChannel.revenue.row1_label"), value: t("posChannel.revenue.row1_value"), note: t("posChannel.revenue.row1_note"), highlight: false },
    { label: t("posChannel.revenue.row2_label"), value: t("posChannel.revenue.row2_value"), note: t("posChannel.revenue.row2_note"), highlight: false },
    { label: t("posChannel.revenue.row3_label"), value: t("posChannel.revenue.row3_value"), note: t("posChannel.revenue.row3_note"), highlight: true },
    { label: t("posChannel.revenue.row4_label"), value: t("posChannel.revenue.row4_value"), note: t("posChannel.revenue.row4_note"), highlight: false },
  ];

  const flowNodes = [
    { icon: Plane, label: t("posChannel.flow.node1_label"), desc: t("posChannel.flow.node1_desc") },
    { icon: Store, label: t("posChannel.flow.node2_label"), desc: t("posChannel.flow.node2_desc") },
    { icon: Cpu, label: t("posChannel.flow.node3_label"), desc: t("posChannel.flow.node3_desc"), highlight: true },
    { icon: Layers, label: t("posChannel.flow.node4_label"), desc: t("posChannel.flow.node4_desc") },
  ];

  const oppCards = [
    { icon: Store, title: t("posChannel.opportunity.card1_title"), desc: t("posChannel.opportunity.card1_desc") },
    { icon: Users, title: t("posChannel.opportunity.card2_title"), desc: t("posChannel.opportunity.card2_desc") },
    { icon: TrendingUp, title: t("posChannel.opportunity.card3_title"), desc: t("posChannel.opportunity.card3_desc") },
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
                <Calculator className="w-4 h-4" /> {t("posChannel.nav.model_earnings")}
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
            {t("posChannel.hero.badge")}
          </div>
          <h1 className="text-4xl sm:text-6xl font-heading font-bold tracking-tight leading-tight">
            {t("posChannel.hero.title_1")}{" "}
            <span className="bg-clip-text text-transparent" style={{ backgroundImage: "linear-gradient(to right, #7c3aed, #6366f1)" }}>
              {t("posChannel.hero.title_2")}
            </span>
            .
          </h1>
          <p className="text-xl text-muted-foreground mt-6 max-w-2xl mx-auto leading-relaxed">
            {t("posChannel.hero.subtitle")}
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-3 mt-10">
            <Link to="/pos-partner-callback">
              <Button size="lg" className="gap-2 h-14 px-8 text-base" style={{ background: "linear-gradient(to right, #7c3aed, #6366f1)" }}>
                <Handshake className="w-5 h-5" /> {t("posChannel.hero.cta_secondary")}
              </Button>
            </Link>
          </div>
          <p className="text-sm text-muted-foreground mt-6">
            {t("posChannel.hero.note")}
          </p>
        </div>
      </section>

      {/* ── The Opportunity ── */}
      <section className="py-16 sm:py-20 bg-card border-y border-border">
        <div className="max-w-5xl mx-auto px-4 sm:px-6">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-heading font-bold">{t("posChannel.opportunity.title")}</h2>
            <p className="text-lg text-muted-foreground mt-3 max-w-2xl mx-auto">
              {t("posChannel.opportunity.subtitle")}
            </p>
          </div>
          <div className="grid sm:grid-cols-3 gap-5">
            {oppCards.map((c) => (
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
              <Wallet className="w-3.5 h-3.5" /> {t("posChannel.revenue.badge")}
            </div>
            <h2 className="text-3xl font-heading font-bold">{t("posChannel.revenue.title")}</h2>
            <p className="text-lg text-muted-foreground mt-3 max-w-2xl mx-auto">
              {t("posChannel.revenue.subtitle")}
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
              <strong className="text-foreground">{t("posChannel.revenue.bypass_bold")}</strong> {t("posChannel.revenue.bypass_text")}
            </p>
          </div>
        </div>
      </section>

      {/* ── How it works ── */}
      <section className="py-16 sm:py-20 bg-card border-y border-border">
        <div className="max-w-5xl mx-auto px-4 sm:px-6">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-heading font-bold">{t("posChannel.how.title")}</h2>
            <p className="text-lg text-muted-foreground mt-3">{t("posChannel.how.subtitle")}</p>
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
              <Calculator className="w-3.5 h-3.5" /> {t("posChannel.calculator.badge")}
            </div>
            <h2 className="text-3xl font-heading font-bold">{t("posChannel.calculator.title")}</h2>
            <p className="text-lg text-muted-foreground mt-3">{t("posChannel.calculator.subtitle")}</p>
          </div>

          <div className="rounded-2xl border border-border bg-card p-6 sm:p-8 space-y-6">
            <div className="flex items-center justify-end">
              <div className="inline-flex items-center rounded-lg border border-border bg-muted/40 p-0.5">
                {currencyOptions.map((c) => (
                  <button
                    key={c.code}
                    onClick={() => setCurrency(c.code)}
                    className={`px-3 py-1 text-xs font-semibold rounded-md transition-colors ${
                      currency === c.code
                        ? "bg-card text-violet-700 shadow-sm"
                        : "text-muted-foreground hover:text-foreground"
                    }`}
                  >
                    {c.code}
                  </button>
                ))}
              </div>
            </div>
            <div className="flex items-center justify-between py-2 border-b border-border">
              <Label className="text-sm font-medium">{t("posChannel.calculator.slider_sales")}</Label>
              <span className="text-sm font-bold font-mono">15 Million</span>
            </div>
            <div>
              <div className="flex items-center justify-between mb-2">
                <Label className="text-sm font-medium">{t("posChannel.calculator.slider_stores")}</Label>
                <span className="text-sm font-bold font-mono">{retailerCount.toLocaleString()}</span>
              </div>
              <input
                type="range" min={5} max={10000} step={5} value={retailerCount}
                onChange={(e) => setRetailerCount(Number(e.target.value))}
                className="w-full accent-violet-600"
              />
            </div>
            <div>
              <div className="flex items-center justify-between mb-2">
                <Label className="text-sm font-medium">{t("posChannel.calculator.slider_rate")}</Label>
                <span className="text-sm font-bold font-mono">{redemptionRate}%</span>
              </div>
              <input
                type="range" min={0.01} max={20} step={0.01} value={redemptionRate}
                onChange={(e) => setRedemptionRate(Number(e.target.value))}
                className="w-full accent-violet-600"
              />
            </div>

            <div className="border-t border-border pt-6">
              <div className="grid grid-cols-3 gap-4 text-center">
                <div>
                  <p className="text-xs text-muted-foreground mb-1">{t("posChannel.calculator.result_volume")}</p>
                  <p className="text-lg font-heading font-bold">{fmtMoney(redemptionVolume, currency, 0)}</p>
                </div>
                <div>
                  <p className="text-xs text-muted-foreground mb-1">{t("posChannel.calculator.result_fees")}</p>
                  <p className="text-lg font-heading font-bold">{fmtMoney(platformFees, currency, 0)}</p>
                </div>
                <div className="rounded-xl p-2" style={{ background: "hsl(255 90% 95%)" }}>
                  <p className="text-xs mb-1" style={{ color: "#6d28d9" }}>{t("posChannel.calculator.result_earnings")}</p>
                  <p className="text-2xl font-heading font-bold" style={{ color: "#6d28d9" }}>
                    {fmtMoney(posEarnings, currency, 0)}
                  </p>
                </div>
              </div>
              <p className="text-xs text-muted-foreground text-center mt-4">
                {t("posChannel.calculator.note")}
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ── Why partner ── */}
      <section className="py-16 sm:py-20 bg-card border-y border-border">
        <div className="max-w-5xl mx-auto px-4 sm:px-6">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-heading font-bold">{t("posChannel.why.title")}</h2>
            <p className="text-lg text-muted-foreground mt-3">{t("posChannel.why.subtitle")}</p>
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
              <Sparkles className="w-3.5 h-3.5" /> {t("posChannel.flow.badge")}
            </div>
            <h2 className="text-3xl font-heading font-bold">{t("posChannel.flow.title")}</h2>
            <p className="text-lg text-muted-foreground mt-3">{t("posChannel.flow.subtitle")}</p>
          </div>
          <div className="flex flex-col sm:flex-row items-stretch gap-3">
            {flowNodes.map((n, i, arr) => (
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
          <h2 className="text-3xl sm:text-4xl font-heading font-bold">{t("posChannel.cta.title")}</h2>
          <p className="text-lg text-muted-foreground mt-4">
            {t("posChannel.cta.subtitle")}
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-3 mt-8">
            <Link to="/pos-partner-callback">
              <Button size="lg" className="gap-2 h-14 px-8 text-base" style={{ background: "linear-gradient(to right, #7c3aed, #6366f1)" }}>
                <Handshake className="w-5 h-5" /> {t("posChannel.cta.button_primary")}
              </Button>
            </Link>
            <Link to="/">
              <Button size="lg" variant="outline" className="h-14 px-8 text-base gap-2">
                {t("posChannel.cta.button_secondary")} <ArrowRight className="w-5 h-5" />
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* ── Footer ── */}
      <footer className="border-t border-border py-8 px-4 sm:px-6">
        <div className="max-w-6xl mx-auto flex flex-col md:flex-row items-center justify-between gap-4 text-sm text-muted-foreground">
          <Link to="/"><DutyBoostLogo height={40} /></Link>
          <p>{t("posChannel.footer.tagline", { year: new Date().getFullYear() })}</p>
        </div>
      </footer>
    </div>
  );
}