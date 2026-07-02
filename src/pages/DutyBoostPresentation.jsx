import { useState, useMemo } from "react";
import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { Download, ArrowRight, Users, Target, DollarSign, BarChart3, Store, TrendingUp, Euro, ScanLine, Terminal, Globe, Sparkles, MapPin, Gift } from "lucide-react";
import { Button } from "@/components/ui/button";
import DutyBoostLogo from "@/components/DutyBoostLogo";
import LanguageSwitcher from "@/components/LanguageSwitcher";
import FooterLinks from "@/components/FooterLinks";
import AirportRetailerIcon from "@/components/AirportRetailerIcon";
import TravelAgencyIcon from "@/components/TravelAgencyIcon";
import TravelerIcon from "@/components/TravelerIcon";
import PresentationAggregation from "@/components/presentation/PresentationAggregation";
import { AIRPORT_RETAIL_COMPANIES } from "@/data/airportRetailCompanies";
import { fmtNum, fmtEur } from "@/utils/formatNumber";
import { computeCompanyTotals, computeCompanyStoreCount } from "@/utils/retailerCalc";

export default function DutyBoostPresentation() {
  const { t } = useTranslation();
  const [downloading, setDownloading] = useState(false);
  const [selectedCompanyIdx, setSelectedCompanyIdx] = useState(1);
  const [conversionRate] = useState(3);

  const company = AIRPORT_RETAIL_COMPANIES[selectedCompanyIdx];
  const totals = useMemo(
    () => computeCompanyTotals(company.airports, conversionRate),
    [company, conversionRate]
  );
  const storeCount = useMemo(
    () => company.storeCount ?? computeCompanyStoreCount(company.airports),
    [company]
  );

  const handleDownload = async () => {
    setDownloading(true);
    try {
      const { exportDutyBoostPptx } = await import("@/utils/exportDutyBoostPptx");
      await exportDutyBoostPptx(company, conversionRate);
    } catch (err) {
      console.error("Failed to download:", err);
    } finally {
      setDownloading(false);
    }
  };

  return (
    <div className="min-h-screen bg-background font-body">
      <nav className="sticky top-0 z-50 backdrop-blur border-b border-border bg-background/80">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 h-16 sm:h-20 flex items-center justify-between gap-4">
          <DutyBoostLogo height={55} />
          <div className="flex items-center gap-2">
            <select
              className="text-sm border border-input rounded-lg px-3 py-1.5 bg-background max-w-[200px] hidden md:block"
              value={selectedCompanyIdx}
              onChange={e => setSelectedCompanyIdx(Number(e.target.value))}
            >
              {AIRPORT_RETAIL_COMPANIES.map((c, i) => (
                <option key={c.name} value={i}>{c.name}</option>
              ))}
            </select>
            <LanguageSwitcher />
            <Link to="/">
              <Button size="sm" variant="ghost" className="text-muted-foreground">{t('presentation.nav.home')}</Button>
            </Link>
            <Button onClick={handleDownload} disabled={downloading} size="sm" className="gap-1.5 bg-primary text-primary-foreground hover:bg-primary/90">
              <Download className="w-3.5 h-3.5" />
              {downloading ? t('presentation.nav.generating') : t('presentation.nav.download')}
            </Button>
          </div>
        </div>
      </nav>

      <div className="max-w-6xl mx-auto px-4 sm:px-6 py-16 space-y-24">

        {/* HERO */}
        <section className="relative overflow-hidden text-center space-y-8 py-8">
          <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-background to-accent/5 pointer-events-none rounded-3xl" />
          <div className="absolute top-0 right-0 w-72 h-72 bg-accent/10 rounded-full blur-3xl pointer-events-none" />
          <div className="absolute bottom-0 left-0 w-96 h-96 bg-primary/10 rounded-full blur-3xl pointer-events-none" />
          <div className="relative space-y-6">
            <p className="text-xs font-bold uppercase tracking-widest text-accent">{t('presentation.hero.badge')}</p>
            <h1 className="text-5xl sm:text-6xl font-heading font-bold leading-tight">
              {t('presentation.hero.title_1')}
              <span className="block bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">{t('presentation.hero.title_2')}</span>
            </h1>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto leading-relaxed">
              {t('presentation.hero.subtitle')}
            </p>
            <div className="flex flex-wrap gap-3 justify-center pt-2">
              <span className="px-4 py-2 rounded-full bg-card border border-border text-foreground text-sm font-medium">{t('presentation.hero.pill_1')}</span>
              <span className="px-4 py-2 rounded-full bg-card border border-border text-foreground text-sm font-medium">{t('presentation.hero.pill_2')}</span>
              <span className="px-4 py-2 rounded-full bg-card border border-border text-foreground text-sm font-medium">{t('presentation.hero.pill_3')}</span>
            </div>
          </div>
        </section>

        {/* WHY — The Problem */}
        <section className="space-y-8">
          <div className="border-l-4 border-accent pl-6">
            <p className="text-xs font-bold uppercase tracking-widest text-accent mb-1">{t('presentation.why.label')}</p>
            <h2 className="text-3xl font-heading font-bold">{t('presentation.why.title')}</h2>
            <p className="text-muted-foreground mt-2">{t('presentation.why.subtitle')}</p>
          </div>
          <div className="grid md:grid-cols-3 gap-6">
            {[
              { icon: Target, title: t('presentation.why.problem_1_title'), desc: t('presentation.why.problem_1_desc') },
              { icon: Users, title: t('presentation.why.problem_2_title'), desc: t('presentation.why.problem_2_desc') },
              { icon: DollarSign, title: t('presentation.why.problem_3_title'), desc: t('presentation.why.problem_3_desc') },
            ].map(({ icon: Icon, title, desc }, i) => (
              <div key={i} className="bg-card border border-border rounded-2xl p-6 space-y-4 hover:shadow-lg transition-shadow">
                <div className="w-14 h-14 rounded-2xl bg-red-50 flex items-center justify-center">
                  <Icon className="w-8 h-8 text-red-500" />
                </div>
                <p className="font-heading font-bold text-lg">{title}</p>
                <p className="text-sm text-muted-foreground leading-relaxed">{desc}</p>
              </div>
            ))}
          </div>

          <div className="grid md:grid-cols-4 gap-4">
            {[
              { val: t('presentation.why.stat_1_val'), label: t('presentation.why.stat_1_label') },
              { val: t('presentation.why.stat_2_val'), label: t('presentation.why.stat_2_label') },
              { val: t('presentation.why.stat_3_val'), label: t('presentation.why.stat_3_label') },
              { val: t('presentation.why.stat_4_val'), label: t('presentation.why.stat_4_label') },
            ].map(({ val, label }, i) => (
              <div key={i} className="bg-card border border-border rounded-2xl p-5 text-center space-y-1 hover:shadow-md transition-shadow">
                <p className="text-3xl font-heading font-bold bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">{val}</p>
                <p className="text-xs text-muted-foreground leading-relaxed">{label}</p>
              </div>
            ))}
          </div>

          <div className="bg-gradient-to-br from-primary/5 to-accent/5 border border-border rounded-2xl p-6 space-y-3">
            <p className="font-heading font-bold text-lg flex items-center gap-2">
              <Sparkles className="w-5 h-5 text-primary" />
              {t('presentation.why.opportunity_title')}
            </p>
            <p className="text-sm text-muted-foreground leading-relaxed">
              {t('presentation.why.opportunity_text')}
            </p>
          </div>
        </section>

        {/* THE TRAVELLER JOURNEY — Consumer Acquisition */}
        <section className="space-y-8">
          <div className="border-l-4 border-emerald-500 pl-6">
            <p className="text-xs font-bold uppercase tracking-widest text-emerald-600 mb-1">{t('presentation.journey.label')}</p>
            <h2 className="text-3xl font-heading font-bold">{t('presentation.journey.title')}</h2>
            <p className="text-muted-foreground mt-2 max-w-3xl">{t('presentation.journey.subtitle')}</p>
          </div>

          <div className="bg-gradient-to-br from-emerald-50 via-blue-50 to-primary/5 border border-emerald-200 rounded-3xl p-6 sm:p-10 space-y-8">
            <div className="grid md:grid-cols-3 gap-6">
              <div className="bg-card border border-emerald-200 rounded-2xl p-6 space-y-4">
                <div className="flex items-center justify-between">
                  <div className="w-12 h-12 rounded-xl bg-emerald-500 flex items-center justify-center">
                    <MapPin className="w-6 h-6 text-white" />
                  </div>
                  <span className="text-xs font-bold uppercase tracking-wider text-emerald-600">{t('presentation.journey.step1_badge')}</span>
                </div>
                <p className="font-heading font-bold text-lg">{t('presentation.journey.step1_title')}</p>
                <p className="text-sm text-muted-foreground leading-relaxed">{t('presentation.journey.step1_desc')}</p>
              </div>
              <div className="bg-card border border-blue-200 rounded-2xl p-6 space-y-4">
                <div className="flex items-center justify-between">
                  <div className="w-12 h-12 rounded-xl bg-blue-500 flex items-center justify-center">
                    <Gift className="w-6 h-6 text-white" />
                  </div>
                  <span className="text-xs font-bold uppercase tracking-wider text-blue-600">{t('presentation.journey.step2_badge')}</span>
                </div>
                <p className="font-heading font-bold text-lg">{t('presentation.journey.step2_title')}</p>
                <p className="text-sm text-muted-foreground leading-relaxed">{t('presentation.journey.step2_desc')}</p>
              </div>
              <div className="bg-card border border-accent/30 rounded-2xl p-6 space-y-4">
                <div className="flex items-center justify-between">
                  <div className="w-12 h-12 rounded-xl bg-accent flex items-center justify-center">
                    <ScanLine className="w-6 h-6 text-white" />
                  </div>
                  <span className="text-xs font-bold uppercase tracking-wider text-accent">{t('presentation.journey.step3_badge')}</span>
                </div>
                <p className="font-heading font-bold text-lg">{t('presentation.journey.step3_title')}</p>
                <p className="text-sm text-muted-foreground leading-relaxed">{t('presentation.journey.step3_desc')}</p>
              </div>
            </div>

            <div className="grid grid-cols-3 gap-4 max-w-2xl mx-auto">
              <div className="text-center space-y-1">
                <p className="text-2xl font-heading font-bold text-emerald-600">{t('presentation.journey.stat_free')}</p>
                <p className="text-xs text-muted-foreground">{t('presentation.journey.stat_free_label')}</p>
              </div>
              <div className="text-center space-y-1">
                <p className="text-2xl font-heading font-bold text-blue-600">{t('presentation.journey.stat_seconds')}</p>
                <p className="text-xs text-muted-foreground">{t('presentation.journey.stat_seconds_label')}</p>
              </div>
              <div className="text-center space-y-1">
                <p className="text-2xl font-heading font-bold text-accent">{t('presentation.journey.stat_discount')}</p>
                <p className="text-xs text-muted-foreground">{t('presentation.journey.stat_discount_label')}</p>
              </div>
            </div>

            <div className="text-center">
              <Link to="/eligibility-showcase">
                <Button size="lg" className="bg-emerald-600 hover:bg-emerald-700 text-white gap-2">
                  {t('presentation.journey.cta')}
                  <ArrowRight className="w-4 h-4" />
                </Button>
              </Link>
            </div>
          </div>
        </section>

        {/* HOW — Flows */}
        <section className="space-y-8">
          {/* Flow 1 — Traveller */}
          <div className="bg-emerald-50 border border-emerald-200 rounded-2xl p-8 space-y-6">
            <div className="flex items-center gap-4">
              <div className="w-14 h-14 rounded-2xl bg-emerald-500 flex items-center justify-center">
                <TravelerIcon className="w-8 h-8 text-white" />
              </div>
              <div>
                <p className="text-xs font-bold uppercase tracking-widest text-emerald-600">{t('presentation.how.flow1_label')}</p>
                <h3 className="text-2xl font-heading font-bold">{t('presentation.how.flow1_title')}</h3>
                <span className="inline-block mt-1.5 text-xs font-semibold px-2.5 py-1 rounded-full bg-emerald-100 text-emerald-700">{t('presentation.how.flow1_phase')}</span>
              </div>
            </div>
            <p className="text-muted-foreground leading-relaxed">{t('presentation.how.flow1_desc')}</p>
            <div className="grid md:grid-cols-3 gap-4">
              {[
                { stat: t('presentation.how.flow1_stat1'), statLabel: t('presentation.how.flow1_stat1_label'), title: t('presentation.how.flow1_title1'), desc: t('presentation.how.flow1_desc1') },
                { stat: t('presentation.how.flow1_stat2'), statLabel: t('presentation.how.flow1_stat2_label'), title: t('presentation.how.flow1_title2'), desc: t('presentation.how.flow1_desc2') },
                { stat: t('presentation.how.flow1_stat3'), statLabel: t('presentation.how.flow1_stat3_label'), title: t('presentation.how.flow1_title3'), desc: t('presentation.how.flow1_desc3') },
              ].map(({ title, desc, stat, statLabel }, i) => (
                <div key={i} className="bg-card border border-emerald-200 rounded-xl p-5 space-y-3">
                  <p className="text-3xl font-heading font-bold text-emerald-600">{stat}</p>
                  <p className="text-xs text-muted-foreground">{statLabel}</p>
                  <p className="font-semibold text-sm">{title}</p>
                  <p className="text-xs text-muted-foreground leading-relaxed">{desc}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Flow 3 — Airport Retailer */}
          <div className="bg-orange-50 border border-orange-200 rounded-2xl p-8 space-y-6">
            <div className="flex items-center gap-4">
              <div className="w-14 h-14 rounded-2xl bg-orange-500 flex items-center justify-center">
                <AirportRetailerIcon className="w-8 h-8 text-white" />
              </div>
              <div>
                <p className="text-xs font-bold uppercase tracking-widest text-orange-600">{t('presentation.how.flow3_label')}</p>
                <h3 className="text-2xl font-heading font-bold">{t('presentation.how.flow3_title')}</h3>
              </div>
            </div>
            <p className="text-muted-foreground leading-relaxed">{t('presentation.how.flow3_desc')}</p>
            <div className="grid md:grid-cols-3 gap-4">
              {[
                { stat: t('presentation.how.flow3_stat1'), statLabel: t('presentation.how.flow3_stat1_label'), title: t('presentation.how.flow3_title1'), desc: t('presentation.how.flow3_desc1') },
                { stat: t('presentation.how.flow3_stat2'), statLabel: t('presentation.how.flow3_stat2_label'), title: t('presentation.how.flow3_title2'), desc: t('presentation.how.flow3_desc2') },
                { stat: t('presentation.how.flow3_stat3'), statLabel: t('presentation.how.flow3_stat3_label'), title: t('presentation.how.flow3_title3'), desc: t('presentation.how.flow3_desc3') },
              ].map(({ title, desc, stat, statLabel }, i) => (
                <div key={i} className="bg-card border border-orange-200 rounded-xl p-5 space-y-3">
                  <p className="text-3xl font-heading font-bold text-orange-600">{stat}</p>
                  <p className="text-xs text-muted-foreground">{statLabel}</p>
                  <p className="font-semibold text-sm">{title}</p>
                  <p className="text-xs text-muted-foreground leading-relaxed">{desc}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* WHAT — Global Aggregation */}
        <section className="space-y-8">
          <div className="border-l-4 border-accent pl-6">
            <p className="text-xs font-bold uppercase tracking-widest text-accent mb-1">{t('presentation.what.agg_label')}</p>
            <h2 className="text-3xl font-heading font-bold">{t('presentation.what.agg_title')}</h2>
            <p className="text-muted-foreground mt-2">{t('presentation.what.agg_subtitle')}</p>
          </div>

          <div className="bg-card border border-border rounded-xl p-4 flex flex-col sm:flex-row items-start sm:items-center gap-3">
            <label className="text-sm font-semibold text-muted-foreground shrink-0">{t('presentation.what.company_label')}</label>
            <p className="text-sm font-semibold text-foreground px-3 py-2">{company.name}</p>
            <div className="flex gap-4 text-sm text-muted-foreground ml-auto">
              <span><strong className="text-foreground">{fmtNum(company.airports.length)}</strong> {t('presentation.what.airports')}</span>
              <span><strong className="text-foreground">{fmtNum(storeCount)}</strong> {t('presentation.what.stores')}</span>
              <span><strong className="text-foreground">{fmtNum(totals.totalDailyTravelers)}</strong> {t('presentation.what.daily_travelers')}</span>
            </div>
          </div>

          <PresentationAggregation company={company} conversionRate={conversionRate} />
        </section>

        {/* WHAT — POS Implementation */}
        <section className="space-y-8">
          <div className="border-l-4 border-primary pl-6">
            <p className="text-xs font-bold uppercase tracking-widest text-primary mb-1">{t('presentation.what.pos_label')}</p>
            <h2 className="text-3xl font-heading font-bold">{t('presentation.what.pos_title')}</h2>
            <p className="text-muted-foreground mt-2">{t('presentation.what.pos_subtitle')}</p>
          </div>

          <div className="grid md:grid-cols-1 gap-6">
            {[
              { icon: Terminal, label: t('presentation.what.option_a_badge'), labelColor: "bg-green-100 text-green-700", title: t('presentation.what.option_a_title'), desc: t('presentation.what.option_a_desc') },
            ].map(({ icon: Icon, label, labelColor, title, desc }, i) => (
              <div key={i} className="bg-card border border-border rounded-2xl p-5 space-y-3 hover:shadow-lg transition-shadow">
                <div className="flex items-center justify-between">
                  <div className="w-9 h-9 rounded-lg bg-primary/10 flex items-center justify-center">
                    <Icon className="w-4 h-4 text-primary" />
                  </div>
                  <span className={`text-xs font-semibold px-2 py-1 rounded-full ${labelColor}`}>{label}</span>
                </div>
                <p className="font-semibold text-sm">{title}</p>
                <p className="text-xs text-muted-foreground leading-relaxed">{desc}</p>
              </div>
            ))}
          </div>

          <div className="bg-card border border-border rounded-2xl p-6 space-y-4">
            <p className="font-semibold">{t('presentation.what.how_title')}</p>
            <div className="grid md:grid-cols-4 gap-3">
              {[
                { num: "1", title: t('presentation.what.step1_title'), desc: t('presentation.what.step1_desc') },
                { num: "2", title: t('presentation.what.step2_title'), desc: t('presentation.what.step2_desc') },
                { num: "3", title: t('presentation.what.step3_title'), desc: t('presentation.what.step3_desc') },
                { num: "4", title: t('presentation.what.step4_title'), desc: t('presentation.what.step4_desc') },
              ].map(s => (
                <div key={s.num} className="bg-muted/30 border border-border rounded-xl p-4 space-y-2">
                  <div className="w-8 h-8 rounded-lg bg-primary text-primary-foreground flex items-center justify-center text-sm font-bold">{s.num}</div>
                  <p className="font-semibold text-sm">{s.title}</p>
                  <p className="text-xs text-muted-foreground leading-relaxed">{s.desc}</p>
                </div>
              ))}
            </div>
          </div>

          <div className="overflow-hidden rounded-2xl border border-border">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-border bg-muted/50">
                  <th className="px-5 py-3 text-left text-xs font-semibold text-muted-foreground uppercase tracking-wider">{t('presentation.what.tier_basket')}</th>
                  <th className="px-5 py-3 text-left text-xs font-semibold text-muted-foreground uppercase tracking-wider">{t('presentation.what.tier_discount')}</th>
                  <th className="px-5 py-3 text-left text-xs font-semibold text-muted-foreground uppercase tracking-wider">{t('presentation.what.tier_fee')}</th>
                  <th className="px-5 py-3 text-left text-xs font-semibold text-muted-foreground uppercase tracking-wider">{t('presentation.what.tier_net')}</th>
                </tr>
              </thead>
              <tbody>
                {[
                  { tier: t('presentation.what.tier_1_basket'), save: t('presentation.what.tier_1_discount'), fee: t('presentation.what.tier_1_fee'), net: t('presentation.what.tier_1_net') },
                  { tier: t('presentation.what.tier_2_basket'), save: t('presentation.what.tier_2_discount'), fee: t('presentation.what.tier_2_fee'), net: t('presentation.what.tier_2_net') },
                  { tier: t('presentation.what.tier_3_basket'), save: t('presentation.what.tier_3_discount'), fee: t('presentation.what.tier_3_fee'), net: t('presentation.what.tier_3_net') },
                  { tier: t('presentation.what.tier_4_basket'), save: t('presentation.what.tier_4_discount'), fee: t('presentation.what.tier_4_fee'), net: t('presentation.what.tier_4_net') },
                  { tier: t('presentation.what.tier_5_basket'), save: t('presentation.what.tier_5_discount'), fee: t('presentation.what.tier_5_fee'), net: t('presentation.what.tier_5_net') },
                ].map(({ tier, save, fee, net }) => (
                  <tr key={tier} className="border-b border-border hover:bg-muted/30 transition-colors">
                    <td className="px-5 py-4 font-semibold">{tier}</td>
                    <td className="px-5 py-4 font-semibold text-accent">{save}</td>
                    <td className="px-5 py-4 text-muted-foreground">{fee}</td>
                    <td className="px-5 py-4 font-bold text-primary">{net}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <p className="text-xs text-muted-foreground">{t('presentation.what.fee_note')}</p>
        </section>

        {/* WHAT — Dashboard Preview */}
        <section className="space-y-8">
          <div className="border-l-4 border-accent pl-6">
            <p className="text-xs font-bold uppercase tracking-widest text-accent mb-1">{t('presentation.what.dash_label')}</p>
            <h2 className="text-3xl font-heading font-bold">{t('presentation.what.dash_title')}</h2>
            <p className="text-muted-foreground mt-2">{t('presentation.what.dash_subtitle')}</p>
          </div>

          <div className="bg-card border border-border rounded-2xl p-6 space-y-4">
            <div className="flex items-center gap-2">
              <BarChart3 className="w-5 h-5 text-primary" />
              <p className="font-heading font-bold text-lg">{t('presentation.what.dash_tab_title')}</p>
            </div>
            <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
              {[
                { label: t('presentation.what.kpi_redemptions'), value: fmtNum(totals.dailyRedemptions * 30), icon: ScanLine, color: "text-blue-500" },
                { label: t('presentation.what.kpi_net_revenue'), value: fmtEur(totals.monthlyNet, 0), icon: Euro, color: "text-orange-500" },
                { label: t('presentation.what.kpi_avg_sale'), value: `€${totals.avgBasket.toFixed(0)}`, icon: TrendingUp, color: "text-emerald-500" },
                { label: t('presentation.what.kpi_platform_fee'), value: fmtEur(totals.monthlyFee, 0), icon: Store, color: "text-purple-500" },
                { label: t('presentation.what.kpi_potential'), value: `€${(totals.avgBasket * 1.01).toFixed(0)}`, icon: Sparkles, color: "text-indigo-500" },
              ].map(({ label, value, icon: Icon, color }) => (
                <div key={label} className="bg-muted/30 border border-border rounded-xl p-4 space-y-2">
                  <div className="flex items-center justify-between">
                    <p className="text-xs text-muted-foreground font-medium">{label}</p>
                    <Icon className={`w-4 h-4 ${color}`} />
                  </div>
                  <p className="text-lg font-heading font-bold">{value}</p>
                </div>
              ))}
            </div>
            <div className="bg-muted/30 border border-border rounded-xl p-4 space-y-2">
              <p className="text-xs font-semibold text-muted-foreground">{t('presentation.what.rev_breakdown')}</p>
              <div className="space-y-2 text-sm">
                <div className="flex justify-between"><span className="text-muted-foreground">{t('presentation.what.rev_gross')}</span><span className="font-semibold">{fmtEur(totals.monthlyNet + totals.monthlyFee, 0)}</span></div>
                <div className="flex justify-between text-rose-600"><span>{t('presentation.what.rev_savings')}</span><span className="font-semibold">- {fmtEur(totals.dailyRedemptions * 30 * totals.avgBasket * 0.1, 0)}</span></div>
                <div className="flex justify-between text-destructive"><span>{t('presentation.what.rev_fee')}</span><span className="font-semibold">- {fmtEur(totals.monthlyFee, 0)}</span></div>
                <div className="border-t border-border pt-2 flex justify-between"><span className="font-semibold">{t('presentation.what.rev_net')}</span><span className="font-bold text-emerald-600">{fmtEur(totals.monthlyNet, 0)}</span></div>
              </div>
            </div>
          </div>

          <div className="bg-card border border-border rounded-2xl p-6 space-y-4">
            <div className="flex items-center gap-2">
              <Globe className="w-5 h-5 text-primary" />
              <p className="font-heading font-bold text-lg">{t('presentation.what.agg_tab_title')}</p>
            </div>
            <p className="text-sm text-muted-foreground">{t('presentation.what.agg_tab_desc')}</p>
            <PresentationAggregation company={company} conversionRate={conversionRate} compact />
          </div>

          <div className="bg-card border border-border rounded-2xl p-6 space-y-4">
            <div className="flex items-center gap-2">
              <Store className="w-5 h-5 text-primary" />
              <p className="font-heading font-bold text-lg">{t('presentation.what.profile_tab_title')}</p>
            </div>
            <p className="text-sm text-muted-foreground">{t('presentation.what.profile_tab_desc')}</p>
            <div className="grid md:grid-cols-2 gap-4">
              <div className="bg-muted/30 border border-border rounded-xl p-4 space-y-2">
                <p className="text-xs font-semibold text-muted-foreground">{t('presentation.what.profile_company')}</p>
                <p className="font-semibold text-sm">{company.name}</p>
              </div>
              <div className="bg-muted/30 border border-border rounded-xl p-4 space-y-2">
                <p className="text-xs font-semibold text-muted-foreground">{t('presentation.what.profile_network')}</p>
                <p className="font-semibold text-sm">{fmtNum(company.airports.length)} {t('presentation.what.airports')} · {fmtNum(storeCount)} {t('presentation.what.stores')}</p>
              </div>
            </div>
          </div>
        </section>

        {/* CTA */}
        <section>
          <div className="bg-gradient-to-br from-primary via-primary/90 to-primary/70 rounded-3xl p-12 text-primary-foreground shadow-2xl relative overflow-hidden text-center space-y-6">
            <div className="absolute top-0 right-0 w-64 h-64 bg-white/10 rounded-full -translate-y-1/2 translate-x-1/2 pointer-events-none" />
            <div className="absolute bottom-0 left-0 w-48 h-48 bg-black/10 rounded-full translate-y-1/2 -translate-x-1/2 pointer-events-none" />
            <div className="relative space-y-4">
              <p className="text-xs font-bold uppercase tracking-widest text-primary-foreground/70">{t('presentation.what.cta_label')}</p>
              <h2 className="text-3xl font-heading font-bold">{t('presentation.what.cta_title')}</h2>
              <p className="text-primary-foreground/80 text-lg max-w-2xl mx-auto">{t('presentation.what.cta_desc', { company: company.name })}</p>
              <div className="flex flex-wrap justify-center gap-3 pt-2">
                <a href="mailto:rael@dutyboost.com">
                  <Button size="lg" className="bg-white text-primary hover:bg-white/90 gap-2 px-8">
                    rael@dutyboost.com <ArrowRight className="w-4 h-4" />
                  </Button>
                </a>
                <Button onClick={handleDownload} disabled={downloading} size="lg" variant="outline" className="border-white/40 text-white hover:bg-white/10 gap-2 px-8">
                  <Download className="w-4 h-4" />
                  {downloading ? t('presentation.nav.generating') : t('presentation.what.cta_download')}
                </Button>
              </div>
            </div>
          </div>
        </section>
      </div>

      <footer className="border-t border-border py-8 sm:py-10 px-4 sm:px-6 mt-10">
        <div className="max-w-6xl mx-auto space-y-4">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4 text-sm text-muted-foreground">
            <DutyBoostLogo height={55} />
            <div className="text-right">
              <p>{t('presentation.footer.rights')}</p>
              <p className="text-xs mt-0.5">{t('presentation.footer.kvk')}</p>
            </div>
          </div>
          <FooterLinks />
        </div>
      </footer>
    </div>
  );
}