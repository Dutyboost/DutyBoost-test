import { useState } from "react";
import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import DutyBoostLogo from "@/components/DutyBoostLogo";
import LanguageSwitcher from "@/components/LanguageSwitcher";
import FooterLinks from "@/components/FooterLinks";
import {
  TrendingUp, Users, ShieldCheck, Globe, Cpu, Handshake,
  Store, Plane, Layers, ArrowRight, Wallet, Sparkles, Code2, Zap, QrCode,
} from "lucide-react";
import { fmtMoney } from "@/utils/formatNumber";

const PLATFORM_FEE_PCT = 2.5;
const POS_SHARE_PCT = 10;
const AVG_ANNUAL_SALES = 7500000;
const STORE_TICKS = [1, 5, 10, 25, 50, 75, 100, 150, 200, 300, 500, 750, 1000, 1500, 2000, 3000, 5000, 7500, 10000, 15000, 20000, 30000, 50000, 70000];

// Violet/indigo — matches POS partner page
const VIOLET = "#7c3aed";
const INDIGO = "#6366f1";
const VIOLET_LIGHT = "hsl(255 90% 95%)";
const VIOLET_700 = "#6d28d9";
const GRADIENT = `linear-gradient(to right, ${VIOLET}, ${INDIGO})`;
const GRADIENT_BR = `linear-gradient(135deg, hsl(255 90% 97%) 0%, hsl(243 75% 97%) 100%)`;

export default function PosPartnerPresentation() {
  const { t } = useTranslation();
  const [downloading, setDownloading] = useState(false);

  // Calculator state
  const [posStoresRaw, setPosStoresRaw] = useState("200");
  const posStores = parseInt(posStoresRaw, 10) || 0;
  const [redemptionRate, setRedemptionRate] = useState(1);
  const [rateInput, setRateInput] = useState("1");
  const [currency, setCurrency] = useState("EUR");

  const storeSliderIndex = (() => {
    let closest = 0;
    let minDiff = Infinity;
    STORE_TICKS.forEach((tick, i) => {
      const diff = Math.abs(tick - posStores);
      if (diff < minDiff) { minDiff = diff; closest = i; }
    });
    return closest;
  })();

  const redemptionVolume = (posStores * AVG_ANNUAL_SALES * redemptionRate) / 100;
  const platformFees = (redemptionVolume * PLATFORM_FEE_PCT) / 100;
  const posEarnings = (platformFees * POS_SHARE_PCT) / 100;

  const localeForCurrency = (cur) => (cur === "EUR" ? "de-DE" : "en-US");
  const formatStores = (rawStr, cur) => {
    const num = parseInt(rawStr, 10);
    if (!num) return "";
    return new Intl.NumberFormat(localeForCurrency(cur)).format(num);
  };

  const currencyOptions = [
    { code: "EUR", symbol: "€" },
    { code: "USD", symbol: "$" },
    { code: "GBP", symbol: "£" },
  ];

  const handleDownload = async () => {
    setDownloading(true);
    try {
      const { exportAirportRetailerPptx } = await import("@/utils/exportRetailerPptx");
      await exportAirportRetailerPptx();
    } catch (err) {
      console.error("Failed to download:", err);
    } finally {
      setDownloading(false);
    }
  };

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

  const oppCards = [
    { icon: Store, title: t("posChannel.opportunity.card1_title"), desc: t("posChannel.opportunity.card1_desc") },
    { icon: Users, title: t("posChannel.opportunity.card2_title"), desc: t("posChannel.opportunity.card2_desc") },
    { icon: TrendingUp, title: t("posChannel.opportunity.card3_title"), desc: t("posChannel.opportunity.card3_desc") },
  ];

  const flowNodes = [
    { icon: Plane, label: t("posChannel.flow.node1_label"), desc: t("posChannel.flow.node1_desc") },
    { icon: Store, label: t("posChannel.flow.node2_label"), desc: t("posChannel.flow.node2_desc") },
    { icon: Cpu, label: t("posChannel.flow.node3_label"), desc: t("posChannel.flow.node3_desc"), highlight: true },
    { icon: Layers, label: t("posChannel.flow.node4_label"), desc: t("posChannel.flow.node4_desc") },
  ];

  const EXAMPLE_REDEMPTION = 1000;
  const exampleFee = (EXAMPLE_REDEMPTION * 2.5) / 100;
  const exampleTravel = (EXAMPLE_REDEMPTION * 0.5) / 100;
  const examplePos = (EXAMPLE_REDEMPTION * 0.25) / 100;
  const exampleDuty = (EXAMPLE_REDEMPTION * 1.75) / 100;

  return (
    <div className="min-h-screen bg-background font-body">
      {/* Nav */}
      <nav className="sticky top-0 z-50 backdrop-blur border-b border-border bg-background/80">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 h-16 sm:h-20 flex items-center justify-between">
          <DutyBoostLogo height={100} />
          <div className="flex items-center gap-2">
            <Link to="/retailer-presentation">
              <Button size="sm" variant="ghost" className="gap-1.5 hidden sm:flex text-muted-foreground">
                Retailer Guide →
              </Button>
            </Link>
            <LanguageSwitcher allowedLanguages={["en", "fr", "de", "es"]} />
            <Link to="/">
              <Button size="sm" variant="ghost" className="gap-1.5 text-muted-foreground">← Home</Button>
            </Link>
            <Button onClick={handleDownload} disabled={downloading} size="sm" className="gap-1.5 text-white" style={{ background: GRADIENT }}>
              {downloading ? "Generating..." : "Download PPTX"}
            </Button>
          </div>
        </div>
      </nav>

      <div className="max-w-6xl mx-auto px-4 sm:px-6 py-16 space-y-24">

        {/* Hero */}
        <section className="relative overflow-hidden text-center space-y-8 py-8">
          <div className="absolute inset-0 pointer-events-none rounded-3xl" style={{ background: GRADIENT_BR }} />
          <div className="absolute top-0 right-0 w-72 h-72 rounded-full blur-3xl pointer-events-none" style={{ background: `${VIOLET}10` }} />
          <div className="absolute bottom-0 left-0 w-96 h-96 rounded-full blur-3xl pointer-events-none" style={{ background: `${INDIGO}10` }} />
          <div className="relative space-y-6">
            <p className="text-xs font-bold uppercase tracking-widest" style={{ color: VIOLET_700 }}>{t("posChannel.hero.badge")}</p>
            <h1 className="text-5xl sm:text-6xl font-heading font-bold leading-tight">
              {t("posChannel.hero.title_1")}{" "}
              <span className="bg-clip-text text-transparent" style={{ backgroundImage: GRADIENT }}>
                {t("posChannel.hero.title_2")}
              </span>
            </h1>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto leading-relaxed">{t("posChannel.hero.subtitle")}</p>
            <div className="flex flex-wrap gap-3 justify-center pt-2">
              {[
                t("posChannel.how.step1_title"),
                t("posChannel.why.benefit3_title"),
                t("posChannel.why.benefit5_title"),
                t("posChannel.calculator.result_earnings"),
              ].map((label) => (
                <span key={label} className="px-4 py-2 rounded-full bg-card border border-border text-foreground text-sm font-medium">{label}</span>
              ))}
            </div>
          </div>
        </section>

        {/* The Opportunity */}
        <section className="space-y-8">
          <div className="border-l-4 pl-6" style={{ borderColor: VIOLET }}>
            <p className="text-xs font-bold uppercase tracking-widest mb-1" style={{ color: VIOLET_700 }}>{t("posChannel.opportunity.title")}</p>
            <h2 className="text-3xl font-heading font-bold">{t("posChannel.opportunity.title")}</h2>
            <p className="text-muted-foreground mt-2">{t("posChannel.opportunity.subtitle")}</p>
          </div>
          <div className="grid md:grid-cols-3 gap-6">
            {oppCards.map((c) => (
              <div key={c.title} className="bg-card border border-border rounded-2xl p-6 space-y-4 hover:shadow-lg transition-shadow">
                <div className="w-14 h-14 rounded-2xl flex items-center justify-center" style={{ background: VIOLET_LIGHT }}>
                  <c.icon className="w-8 h-8" style={{ color: VIOLET_700 }} />
                </div>
                <p className="font-heading font-bold text-lg">{c.title}</p>
                <p className="text-sm text-muted-foreground leading-relaxed">{c.desc}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Revenue Model */}
        <section className="space-y-8">
          <div className="border-l-4 pl-6" style={{ borderColor: INDIGO }}>
            <p className="text-xs font-bold uppercase tracking-widest mb-1" style={{ color: VIOLET_700 }}>{t("posChannel.revenue.badge")}</p>
            <h2 className="text-3xl font-heading font-bold">{t("posChannel.revenue.title")}</h2>
            <p className="text-muted-foreground mt-2 max-w-2xl">{t("posChannel.revenue.subtitle")}</p>
          </div>
          <div className="rounded-2xl border border-border overflow-hidden bg-card">
            {/* Parent */}
            <div className="px-5 sm:px-8 py-5 sm:py-6 border-b border-bg-muted/20 bg-muted/20">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 text-center sm:text-left">
                <div>
                  <p className="font-bold text-sm sm:text-base">{t("posChannel.revenue.row1_label")}</p>
                  <p className="text-xs font-bold text-muted-foreground mt-0.5">{t("posChannel.revenue.row1_note")}</p>
                </div>
                <div className="sm:text-right">
                  <p className="text-xl sm:text-2xl font-heading font-bold text-foreground">{t("posChannel.revenue.row1_value")}</p>
                  <p className="text-xs font-mono font-bold text-muted-foreground mt-0.5">≈ {fmtMoney(exampleFee, currency, 2)}</p>
                </div>
              </div>
            </div>

            {/* Example context */}
            <div className="px-5 py-2.5 flex flex-col items-center gap-2 bg-muted/30 border-b border-border">
              <p className="text-xs font-bold text-muted-foreground text-center">{t("posChannel.revenue.example_label", { amount: fmtMoney(EXAMPLE_REDEMPTION, currency, 0) })}</p>
            </div>

            {/* Connectors */}
            <div className="hidden sm:block relative h-10">
              <div className="absolute left-1/2 top-0 -translate-x-1/2 w-0.5 h-5 bg-foreground" />
              <div className="absolute top-5 left-[16.666%] right-[16.666%] h-0.5 bg-foreground" />
              <div className="absolute top-5 left-[16.666%] w-0.5 h-5 bg-foreground" />
              <div className="absolute top-5 left-1/2 -translate-x-1/2 w-0.5 h-5 bg-foreground" />
              <div className="absolute top-5 right-[16.666%] w-0.5 h-5 bg-foreground" />
            </div>

            {/* 3 children */}
            <div className="grid grid-cols-1 sm:grid-cols-3 divide-y sm:divide-y-0 sm:divide-x divide-border">
              <div className="px-5 py-5 text-center">
                <p className="font-bold text-sm">{t("posChannel.revenue.row2_label")}</p>
                <p className="text-xs font-bold text-muted-foreground mt-0.5 mb-3">{t("posChannel.revenue.row2_note")}</p>
                <p className="text-lg sm:text-xl font-heading font-bold text-foreground">{t("posChannel.revenue.row2_value")}</p>
                <p className="text-xs font-mono font-bold text-muted-foreground mt-1">≈ {fmtMoney(exampleTravel, currency, 2)}</p>
              </div>
              <div className="px-5 py-5 text-center" style={{ background: VIOLET_LIGHT }}>
                <p className="font-bold text-sm" style={{ color: "#4c1d95" }}>{t("posChannel.revenue.row3_label")}</p>
                <p className="text-xs font-bold text-muted-foreground mt-0.5 mb-3">{t("posChannel.revenue.row3_note")}</p>
                <p className="text-lg sm:text-xl font-heading font-bold" style={{ color: VIOLET_700 }}>{t("posChannel.revenue.row3_value")}</p>
                <p className="text-xs font-mono font-bold mt-1" style={{ color: VIOLET }}>≈ {fmtMoney(examplePos, currency, 2)}</p>
              </div>
              <div className="px-5 py-5 text-center">
                <p className="font-bold text-sm">{t("posChannel.revenue.row4_label")}</p>
                <p className="text-xs font-bold text-muted-foreground mt-0.5 mb-3">{t("posChannel.revenue.row4_note")}</p>
                <p className="text-lg sm:text-xl font-heading font-bold text-foreground">{t("posChannel.revenue.row4_value")}</p>
                <p className="text-xs font-mono font-bold text-muted-foreground mt-1">≈ {fmtMoney(exampleDuty, currency, 2)}</p>
              </div>
            </div>
          </div>
          <div className="flex items-start gap-3 text-sm text-muted-foreground bg-muted/50 rounded-xl p-4">
            <ShieldCheck className="w-5 h-5 shrink-0 mt-0.5" style={{ color: VIOLET_700 }} />
            <p>
              <strong className="text-foreground">{t("posChannel.revenue.bypass_bold")}</strong> {t("posChannel.revenue.bypass_text")}
            </p>
          </div>
        </section>

        {/* How it works */}
        <section className="space-y-8">
          <div className="border-l-4 pl-6" style={{ borderColor: VIOLET }}>
            <p className="text-xs font-bold uppercase tracking-widest mb-1" style={{ color: VIOLET_700 }}>{t("posChannel.how.title")}</p>
            <h2 className="text-3xl font-heading font-bold">{t("posChannel.how.title")}</h2>
            <p className="text-muted-foreground mt-2">{t("posChannel.how.subtitle")}</p>
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {steps.map((s) => (
              <div key={s.num} className="bg-card border border-border rounded-2xl p-5 space-y-3 hover:shadow-lg transition-shadow">
                <div className="flex items-center justify-between mb-2">
                  <div className="w-11 h-11 rounded-xl flex items-center justify-center" style={{ background: VIOLET_LIGHT }}>
                    <s.icon className="w-5 h-5" style={{ color: VIOLET_700 }} />
                  </div>
                  <span className="text-2xl font-heading font-bold" style={{ color: "hsl(255 90% 88%)" }}>{s.num}</span>
                </div>
                <p className="font-semibold text-foreground">{s.title}</p>
                <p className="text-sm text-muted-foreground leading-relaxed">{s.desc}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Calculator */}
        <section className="space-y-8">
          <div className="border-l-4 pl-6" style={{ borderColor: INDIGO }}>
            <p className="text-xs font-bold uppercase tracking-widest mb-1" style={{ color: VIOLET_700 }}>{t("posChannel.calculator.badge")}</p>
            <h2 className="text-3xl font-heading font-bold">{t("posChannel.calculator.title")}</h2>
            <p className="text-muted-foreground mt-2 max-w-2xl">{t("posChannel.calculator.subtitle")}</p>
          </div>
          <div className="rounded-2xl border border-border bg-card p-4 sm:p-8 space-y-5 sm:space-y-6">
            <p className="text-xs sm:text-sm text-muted-foreground text-center">
              {t("posChannel.calculator.market_context", { market_size: `${fmtMoney(40, currency, 0)}B+` })}
            </p>
            <div className="flex items-center justify-center">
              <div className="inline-flex items-center rounded-lg border border-border bg-muted/40 p-0.5">
                {currencyOptions.map((c) => (
                  <button
                    key={c.code}
                    onClick={() => setCurrency(c.code)}
                    className={`px-3 py-1 text-xs font-semibold rounded-md transition-colors ${
                      currency === c.code ? "bg-card shadow-sm" : "text-muted-foreground hover:text-foreground"
                    }`}
                    style={currency === c.code ? { color: VIOLET_700 } : {}}
                  >
                    {c.code}
                  </button>
                ))}
              </div>
            </div>
            <div className="flex items-center justify-between py-2 border-b border-border gap-2">
              <Label className="text-xs sm:text-sm font-medium">{t("posChannel.calculator.slider_sales")}</Label>
              <span className="text-xs sm:text-sm font-bold font-mono whitespace-nowrap">{fmtMoney(AVG_ANNUAL_SALES, currency, 0)}</span>
            </div>
            <div>
              <p className="text-xs text-muted-foreground text-center pb-1">{t("posChannel.calculator.manual_hint")}</p>
              <div className="flex items-center justify-between mb-2 gap-2">
                <Label className="text-xs sm:text-sm font-medium">{t("posChannel.calculator.slider_stores")}</Label>
                <input
                  type="text"
                  inputMode="numeric"
                  value={formatStores(posStoresRaw, currency)}
                  onChange={(e) => setPosStoresRaw(e.target.value.replace(/[^\d]/g, ""))}
                  placeholder="0"
                  className="w-28 sm:w-40 text-xs sm:text-sm font-bold font-mono text-right rounded-md border border-border bg-background px-2 py-1 focus:outline-none focus:ring-1 focus:ring-violet-500"
                />
              </div>
              <input
                type="range" min={0} max={STORE_TICKS.length - 1} step={1} value={storeSliderIndex}
                onChange={(e) => {
                  const idx = Number(e.target.value);
                  setPosStoresRaw(String(STORE_TICKS[idx]));
                }}
                className="w-full accent-violet-600"
              />
            </div>
            <div>
              <div className="flex items-center justify-between mb-2 gap-2">
                <Label className="text-xs sm:text-sm font-medium">{t("posChannel.calculator.slider_rate")}</Label>
                <div className="flex items-center gap-1">
                  <input
                    type="number" min={1} max={25} step={0.01}
                    value={rateInput}
                    onChange={(e) => {
                      const raw = e.target.value;
                      setRateInput(raw);
                      const v = Number(raw);
                      if (!Number.isNaN(v) && v >= 1 && v <= 25) setRedemptionRate(v);
                    }}
                    onBlur={() => {
                      const v = Number(rateInput);
                      const clamped = Number.isNaN(v) || v < 1 ? 1 : Math.min(25, v);
                      setRedemptionRate(clamped);
                      setRateInput(String(clamped));
                    }}
                    className="w-20 text-xs sm:text-sm font-bold font-mono text-right rounded-md border border-border bg-background px-2 py-1 focus:outline-none focus:ring-1 focus:ring-violet-500"
                  />
                  <span className="text-xs sm:text-sm font-bold font-mono">%</span>
                </div>
              </div>
              <input
                type="range" min={1} max={25} step={0.01} value={redemptionRate}
                onChange={(e) => {
                  const v = Number(e.target.value);
                  setRedemptionRate(v);
                  setRateInput(String(v));
                }}
                className="w-full accent-violet-600"
              />
            </div>

            <div className="border-t border-border pt-5 sm:pt-6">
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 sm:gap-4 text-center items-stretch">
                <div className="rounded-lg border border-border p-3 flex flex-col justify-center overflow-hidden">
                  <p className="text-xs font-bold text-muted-foreground mb-1">{t("posChannel.calculator.result_volume")}</p>
                  <p className="text-sm sm:text-base lg:text-lg font-heading font-bold whitespace-nowrap">{fmtMoney(redemptionVolume, currency, 0)}</p>
                </div>
                <div className="rounded-lg border border-border p-3 flex flex-col justify-center overflow-hidden">
                  <p className="text-xs font-bold text-muted-foreground mb-1">{t("posChannel.calculator.result_fees")}</p>
                  <p className="text-sm sm:text-base lg:text-lg font-heading font-bold whitespace-nowrap">{fmtMoney(platformFees, currency, 0)}</p>
                </div>
                <div className="rounded-lg p-3 flex flex-col justify-center overflow-hidden" style={{ background: VIOLET_LIGHT }}>
                  <p className="text-xs font-bold mb-1" style={{ color: VIOLET_700 }}>{t("posChannel.calculator.result_earnings")}</p>
                  <p className="text-sm sm:text-base lg:text-lg font-heading font-bold whitespace-nowrap" style={{ color: VIOLET_700 }}>
                    {fmtMoney(posEarnings, currency, 0)}
                  </p>
                </div>
              </div>
              <p className="text-xs font-bold text-muted-foreground text-center mt-4">{t("posChannel.calculator.note")}</p>
            </div>
          </div>
        </section>

        {/* Why partner */}
        <section className="space-y-8">
          <div className="border-l-4 pl-6" style={{ borderColor: VIOLET }}>
            <p className="text-xs font-bold uppercase tracking-widest mb-1" style={{ color: VIOLET_700 }}>{t("posChannel.why.title")}</p>
            <h2 className="text-3xl font-heading font-bold">{t("posChannel.why.title")}</h2>
            <p className="text-muted-foreground mt-2">{t("posChannel.why.subtitle")}</p>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
            {benefits.map((b) => (
              <div key={b.title} className="bg-card border border-border rounded-2xl p-5 space-y-2 hover:shadow-lg transition-shadow">
                <div className="flex items-start gap-3">
                  <div className="w-9 h-9 rounded-xl flex items-center justify-center shrink-0" style={{ background: VIOLET_LIGHT }}>
                    <b.icon className="w-4 h-4" style={{ color: VIOLET_700 }} />
                  </div>
                  <div>
                    <p className="font-semibold text-foreground text-sm">{b.title}</p>
                    <p className="text-xs text-muted-foreground mt-1 leading-relaxed">{b.desc}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Where you fit */}
        <section className="space-y-8">
          <div className="border-l-4 pl-6" style={{ borderColor: INDIGO }}>
            <p className="text-xs font-bold uppercase tracking-widest mb-1" style={{ color: VIOLET_700 }}>{t("posChannel.flow.badge")}</p>
            <h2 className="text-3xl font-heading font-bold">{t("posChannel.flow.title")}</h2>
            <p className="text-muted-foreground mt-2">{t("posChannel.flow.subtitle")}</p>
          </div>
          <div className="flex flex-col sm:flex-row items-stretch gap-3">
            {flowNodes.map((n, i, arr) => (
              <div key={n.label} className="flex items-stretch gap-3 flex-1">
                <div className={`flex-1 rounded-2xl border p-4 sm:p-5 text-center ${n.highlight ? "border-violet-300 bg-violet-50" : "border-border bg-card"}`}>
                  <div className="w-12 h-12 rounded-xl flex items-center justify-center mx-auto mb-3" style={{ background: n.highlight ? "hsl(255 90% 90%)" : "hsl(220 15% 94%)" }}>
                    <n.icon className="w-6 h-6" style={{ color: n.highlight ? VIOLET_700 : "hsl(var(--muted-foreground))" }} />
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
        </section>

        {/* CTA */}
        <section>
          <div className="rounded-3xl p-12 text-white shadow-2xl relative overflow-hidden text-center space-y-6" style={{ background: GRADIENT }}>
            <div className="absolute top-0 right-0 w-64 h-64 bg-white/10 rounded-full -translate-y-1/2 translate-x-1/2 pointer-events-none" />
            <div className="absolute bottom-0 left-0 w-48 h-48 bg-black/10 rounded-full translate-y-1/2 -translate-x-1/2 pointer-events-none" />
            <div className="relative space-y-4">
              <Sparkles className="w-8 h-8 mx-auto opacity-80" />
              <h2 className="text-3xl font-heading font-bold">{t("posChannel.cta.title")}</h2>
              <p className="text-white/80 text-lg max-w-2xl mx-auto">{t("posChannel.cta.subtitle")}</p>
              <div className="flex flex-wrap justify-center gap-3 pt-2">
                <Link to="/pos-partner-callback">
                  <Button size="lg" className="bg-white hover:bg-white/90 gap-2 px-8" style={{ color: VIOLET_700 }}>
                    {t("posChannel.cta.button_primary")} <ArrowRight className="w-4 h-4" />
                  </Button>
                </Link>
                <Link to="/retailer-presentation">
                  <Button size="lg" variant="outline" className="border-white/40 text-white hover:bg-white/10 gap-2 px-8">
                    Retailer Guide <ArrowRight className="w-4 h-4" />
                  </Button>
                </Link>
              </div>
            </div>
          </div>
        </section>
      </div>

      {/* Footer */}
      <footer className="border-t border-border py-8 sm:py-10 px-4 sm:px-6 mt-10">
        <div className="max-w-6xl mx-auto space-y-4">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4 text-sm text-muted-foreground">
            <DutyBoostLogo height={100} />
            <div className="text-right">
              <p>© 2026 DutyBoost. All rights reserved.</p>
              <p className="text-xs mt-0.5">Chamber of Commerce (KvK): 42053181</p>
            </div>
          </div>
          <FooterLinks />
        </div>
      </footer>
    </div>
  );
}