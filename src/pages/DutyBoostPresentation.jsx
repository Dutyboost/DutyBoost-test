import { useState, useMemo } from "react";
import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { Download, ArrowRight, Users, Target, DollarSign, BarChart3, Store, TrendingUp, Euro, ScanLine, Terminal, Globe, Sparkles, MapPin, Gift } from "lucide-react";
import { Button } from "@/components/ui/button";
import ConversionRateSlider from "@/components/presentation/ConversionRateSlider";
import DutyBoostLogo from "@/components/DutyBoostLogo";
import LanguageSwitcher from "@/components/LanguageSwitcher";
import FooterLinks from "@/components/FooterLinks";
import AirportRetailerIcon from "@/components/AirportRetailerIcon";
import TravelAgencyIcon from "@/components/TravelAgencyIcon";
import TravelerIcon from "@/components/TravelerIcon";
import PresentationAggregation from "@/components/presentation/PresentationAggregation";
import PosIntegrationSection from "@/components/presentation/PosIntegrationSection";
import WhyDutyBoostSummary from "@/components/presentation/WhyDutyBoostSummary";
import CuriosityCampaign from "@/components/presentation/CuriosityCampaign";
import PresentationNav from "@/components/presentation/PresentationNav";
import { AIRPORT_RETAIL_COMPANIES } from "@/data/airportRetailCompanies";
import { fmtNum, fmtEur, fmtMoney, fmtCompact } from "@/utils/formatNumber";
import { computeCompanyTotals, computeCompanyStoreCount } from "@/utils/retailerCalc";

const CURRENCY_SYMBOLS = { EUR: "€", USD: "$", AWG: "Afl." };

function getTierRows(currency) {
  const sym = CURRENCY_SYMBOLS[currency] || "€";
  return [
    { basket: `${sym}20–${sym}49`, discount: `${sym}2.50`, fee: `${sym}0.50`, net: `${sym}17–${sym}45` },
    { basket: `${sym}50–${sym}99`, discount: `${sym}5`, fee: `${sym}1.25`, net: `${sym}44–${sym}92` },
    { basket: `${sym}100–${sym}199`, discount: `${sym}10+`, fee: `${sym}2.50–5`, net: `${sym}83–${sym}169` },
    { basket: `${sym}200–${sym}299`, discount: `${sym}30+`, fee: `${sym}5–7.50`, net: `${sym}150–${sym}234` },
    { basket: `${sym}300–${sym}1,000`, discount: `Up to ${sym}60`, fee: `max ${sym}25`, net: `${sym}215+ net` },
    { basket: `${sym}1,000+`, discount: `Up to ${sym}60`, fee: `${sym}0 (everything above ${sym}1k is yours)`, net: `${sym}940+` },
  ];
}

function getFeeNote(currency) {
  const sym = CURRENCY_SYMBOLS[currency] || "€";
  return `Platform fee: 2.5% of net sales, capped at ${sym}25 on baskets up to ${sym}1,000. All basket value above ${sym}1,000 is entirely yours — no platform fee.`;
}

export default function DutyBoostPresentation({ company: providedCompany, stat3Val, stat4Val, stat5Val, stat1Label, stat2Label, hideCompanySelector = false, hidePosIntegration = false, campaignData, currency = "EUR", marketStats = null } = {}) {
  const { t, i18n } = useTranslation();
  const lang = (i18n?.language || "en").split("-")[0];
  const [downloading, setDownloading] = useState(false);
  const [selectedCompanyIdx, setSelectedCompanyIdx] = useState(3);
  const [conversionRate, setConversionRate] = useState(0.01);

  const company = providedCompany ?? AIRPORT_RETAIL_COMPANIES[selectedCompanyIdx];
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
            {!hideCompanySelector && (
            <select
              className="text-sm border border-input rounded-lg px-3 py-1.5 bg-background max-w-[200px] hidden md:block"
              value={selectedCompanyIdx}
              onChange={e => setSelectedCompanyIdx(Number(e.target.value))}
            >
              {AIRPORT_RETAIL_COMPANIES.map((c, i) => (
                <option key={c.name} value={i}>{c.name}</option>
              ))}
            </select>
            )}
            <LanguageSwitcher />

          </div>
        </div>
      </nav>

      <PresentationNav />

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
            <div className="flex flex-wrap gap-3 justify-center pt-2">
              <span className="px-4 py-2 rounded-full bg-card border border-border text-foreground text-sm font-medium">{t('presentation.hero.pill_1')}</span>
              <span className="px-4 py-2 rounded-full bg-card border border-border text-foreground text-sm font-medium">{t('presentation.hero.pill_2')}</span>
              <span className="px-4 py-2 rounded-full bg-card border border-border text-foreground text-sm font-medium">{t('presentation.hero.pill_3')}</span>
            </div>
          </div>
        </section>

        {/* WHY — The Problem */}
        <section id="challenge" className="space-y-8 scroll-mt-36">
          <div className="border-l-4 border-accent pl-6">
            <p className="text-xs font-bold uppercase tracking-widest text-accent mb-1">{t('presentation.why.label')}</p>
            <h2 className="text-3xl font-heading font-bold">{t('presentation.why.title')}</h2>
            <p className="text-muted-foreground mt-2">{t('presentation.why.subtitle')}</p>
          </div>
          <div className="grid md:grid-cols-3 gap-6">
            {[
              { icon: Target, title: t('presentation.why.problem_1_title'), desc: t('presentation.why.problem_1_desc') },
              { icon: Users, title: t('presentation.why.problem_2_title'), desc: t('presentation.why.problem_2_desc') },
              { icon: Euro, title: t('presentation.why.problem_3_title'), desc: t('presentation.why.problem_3_desc') },
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

          {marketStats && marketStats.length > 0 && (
            <div className="grid md:grid-cols-3 gap-4">
              {marketStats.map(({ val, label }, i) => (
                <div key={i} className="bg-gradient-to-br from-primary/10 to-accent/10 border border-primary/20 rounded-2xl p-6 text-center space-y-2">
                  <p className="text-3xl sm:text-4xl font-heading font-bold bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">{val}</p>
                  <p className="text-sm text-muted-foreground leading-relaxed">{label}</p>
                </div>
              ))}
            </div>
          )}

          <div className="grid md:grid-cols-5 gap-4">
            {[
              { val: fmtCompact(totals.totalDailyTravelers * 365, lang), label: stat1Label ?? t('presentation.why.stat_1_label', { company: company.name }) },
              { val: fmtCompact(totals.totalDailyTravelers, lang, 2), label: stat2Label ?? t('presentation.why.stat_2_label', { company: company.name }) },
              { val: stat3Val ?? t('presentation.why.stat_3_val'), label: t('presentation.why.stat_3_label') },
              { val: stat5Val ?? t('presentation.why.stat_5_val'), label: t('presentation.why.stat_5_label') },
              { val: stat4Val ?? t('presentation.why.stat_4_val'), label: t('presentation.why.stat_4_label') },
            ].map(({ val, label }, i) => (
              <div key={i} className="bg-card border border-border rounded-2xl p-5 text-center space-y-1 hover:shadow-md transition-shadow">
                <p className="text-3xl font-heading font-bold bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">{val}</p>
                <p className="text-xs text-muted-foreground leading-relaxed">{label}</p>
              </div>
            ))}
          </div>

        </section>

        {/* THE TRAVELLER JOURNEY — Consumer Acquisition */}
        <section id="solution" className="space-y-8 scroll-mt-36">
          <div className="border-l-4 border-emerald-500 pl-6 space-y-3">
            <p className="font-heading font-bold text-2xl flex items-center gap-2">
              <Sparkles className="w-5 h-5 text-primary" />
              {t('presentation.journey.title')}
            </p>
            <p className="text-sm text-muted-foreground leading-relaxed max-w-3xl">
              {t('presentation.why.opportunity_text')}
            </p>
            <ul className="space-y-2 text-sm text-muted-foreground max-w-3xl">
              {t('presentation.why.opportunity_bullets', { returnObjects: true }).map((bullet, i) => (
                <li key={i} className="flex items-start gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-primary mt-1.5 shrink-0" />
                  <span className="leading-relaxed">{bullet}</span>
                </li>
              ))}
            </ul>
          </div>

          <p className="text-center text-2xl font-heading font-bold text-primary">{t('presentation.why.how_question')}</p>

          <div className="bg-gradient-to-br from-emerald-50 via-blue-50 to-primary/5 border border-emerald-200 rounded-3xl p-6 sm:p-10 space-y-8">
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
              <div className="bg-card border border-emerald-200 rounded-2xl p-6 space-y-4">
                <div className="flex flex-col gap-3">
                  <div className="w-12 h-12 rounded-xl bg-emerald-500 flex items-center justify-center">
                    <MapPin className="w-6 h-6 text-white" />
                  </div>
                  <span className="text-xs font-bold uppercase tracking-wider text-emerald-600">{t('presentation.journey.step1_badge')}</span>
                </div>
                <p className="font-heading font-bold text-lg">{t('presentation.journey.step1_title')}</p>
                <p className="text-sm text-muted-foreground leading-relaxed">{t('presentation.journey.step1_desc')}</p>
              </div>
              <div className="bg-card border border-blue-200 rounded-2xl p-6 space-y-4">
                <div className="flex flex-col gap-3">
                  <div className="w-12 h-12 rounded-xl bg-blue-500 flex items-center justify-center">
                    <Gift className="w-6 h-6 text-white" />
                  </div>
                  <span className="text-xs font-bold uppercase tracking-wider text-blue-600">{t('presentation.journey.step2_badge')}</span>
                </div>
                <p className="font-heading font-bold text-lg">{t('presentation.journey.step2_title')}</p>
                <p className="text-sm text-muted-foreground leading-relaxed">{t('presentation.journey.step2_desc')}</p>
              </div>
              <div className="bg-card border border-accent/30 rounded-2xl p-6 space-y-4">
                <div className="flex flex-col gap-3">
                  <div className="w-12 h-12 rounded-xl bg-accent flex items-center justify-center">
                    <ScanLine className="w-6 h-6 text-white" />
                  </div>
                  <span className="text-xs font-bold uppercase tracking-wider text-accent">{t('presentation.journey.step3_badge')}</span>
                </div>
                <p className="font-heading font-bold text-lg">{t('presentation.journey.step3_title')}</p>
                <p className="text-sm text-muted-foreground leading-relaxed">{t('presentation.journey.step3_desc')}</p>
              </div>
              <div className="bg-gradient-to-br from-primary/10 to-accent/10 border border-primary/30 rounded-2xl p-6 space-y-4">
                <div className="flex flex-col gap-3">
                  <div className="w-12 h-12 rounded-xl bg-primary flex items-center justify-center">
                    <TrendingUp className="w-6 h-6 text-white" />
                  </div>
                  <span className="text-xs font-bold uppercase tracking-wider text-primary">{t('presentation.journey.step4_badge')}</span>
                </div>
                <p className="font-heading font-bold text-lg">{t('presentation.journey.step4_title')}</p>
                <p className="text-sm text-muted-foreground leading-relaxed">{t('presentation.journey.step4_desc')}</p>
              </div>
            </div>

            <div className="grid grid-cols-3 gap-4 max-w-2xl mx-auto">
              <div className="text-center space-y-1">
                <p className="text-2xl font-heading font-bold text-accent">{t('presentation.journey.stat_discount')}</p>
                <p className="text-xs text-muted-foreground">{t('presentation.journey.stat_discount_label')}</p>
              </div>
              <div className="text-center space-y-1">
                <p className="text-2xl font-heading font-bold text-emerald-600">{t('presentation.journey.stat_free')}</p>
                <p className="text-xs text-muted-foreground">{t('presentation.journey.stat_free_label')}</p>
              </div>
              <div className="text-center space-y-1">
                <p className="text-2xl font-heading font-bold text-blue-600">{t('presentation.journey.stat_seconds')}</p>
                <p className="text-xs text-muted-foreground">{t('presentation.journey.stat_seconds_label')}</p>
              </div>
            </div>

            <p className="text-center text-sm text-muted-foreground leading-relaxed max-w-2xl mx-auto italic">
              {t('presentation.journey.efficiency_note')}
            </p>

            <CuriosityCampaign campaignData={campaignData} />
          </div>
        </section>

        {/* HOW — Flows */}
        <section id="retailers" className="space-y-8 scroll-mt-36">
          {/* Flow 3 — Airport Retailer */}
          <div className="bg-orange-50 border border-orange-200 rounded-2xl p-8 space-y-6">
            <div className="flex items-center gap-4">
              <div className="w-14 h-14 rounded-2xl bg-orange-500 flex items-center justify-center">
                <AirportRetailerIcon className="w-8 h-8 text-white" />
              </div>
              <div>
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

        {/* POS Integration Technical Section */}
        {!hidePosIntegration && (
        <section className="scroll-mt-36">
          <PosIntegrationSection />
        </section>
        )}

        {/* WHAT — Global Aggregation */}
        <section id="projection" className="space-y-8 scroll-mt-36">
          <div className="border-l-4 border-accent pl-6">
            <p className="text-xs font-bold uppercase tracking-widest text-accent mb-1">{t('presentation.what.agg_label')}</p>
            <h2 className="text-3xl font-heading font-bold">{t('presentation.what.agg_title')}</h2>
            <p className="text-muted-foreground mt-2">{t('presentation.what.agg_subtitle')}</p>
          </div>

          <div className="bg-card border border-border rounded-xl p-4 flex flex-col sm:flex-row items-start sm:items-center gap-3">
            <label className="text-sm font-semibold text-muted-foreground shrink-0">{t('presentation.what.company_label')}</label>
            <p className="text-sm font-semibold text-foreground px-3 py-2">{company.name}</p>
            <div className="flex gap-4 text-sm text-muted-foreground ml-auto flex-wrap">
              <span><strong className="text-foreground">{fmtNum(company.airportCount ?? company.airports.length)}</strong> {t('presentation.what.airports')}</span>
              <span><strong className="text-foreground">{fmtNum(storeCount)}</strong> {t('presentation.what.stores')}</span>
              <span><strong className="text-foreground">{fmtNum(totals.totalDailyTravelers)}</strong> {t('presentation.what.daily_travelers')}</span>
              <span><strong className="text-foreground">{fmtMoney(totals.avgBasket, currency, 2)}</strong> {t('presentation.agg.avg_basket')}</span>
            </div>
          </div>

          <ConversionRateSlider value={conversionRate} onChange={setConversionRate} />

          <PresentationAggregation company={company} conversionRate={conversionRate} currency={currency} />
        </section>

        {/* WHAT — POS Implementation */}
        <section className="space-y-8">
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
                {getTierRows(currency).map(({ basket, discount, fee, net }) => ({
                  tier: basket, save: discount, fee, net
                })).map(({ tier, save, fee, net }) => (
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
          <p className="text-xs text-muted-foreground">{getFeeNote(currency)}</p>
        </section>

        {/* Why Airport Retailers Need DutyBoost */}
        <WhyDutyBoostSummary />
      </div>

      <footer className="py-8 sm:py-10 px-4 sm:px-6 mt-10">
        <div className="max-w-6xl mx-auto space-y-4">
          <div className="flex flex-col lg:flex-row items-center justify-between gap-4 text-sm text-muted-foreground">
            <DutyBoostLogo height={55} />
            <div className="text-center lg:text-right">
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