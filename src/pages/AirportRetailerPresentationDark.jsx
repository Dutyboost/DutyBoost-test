import { Link } from "react-router-dom";
import { useState } from "react";
import { useTranslation } from "react-i18next";
import DutyBoostLogo from "../components/DutyBoostLogo";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Download, Mail, ArrowRight, TrendingUp, Users, Globe, ShoppingBag, Zap, Star, BarChart3, Check, ExternalLink, Plane } from "lucide-react";

function SrcLink({ href, children }) {
  return (
    <a href={href} target="_blank" rel="noopener noreferrer"
      className="inline-flex items-center gap-1 text-xs text-slate-500 hover:text-orange-400 mt-2 transition-colors">
      <ExternalLink className="w-3 h-3" />{children}
    </a>
  );
}

function SourceBox({ sources }) {
  return (
    <div className="mt-4 pt-4 border-t border-slate-700/50">
      <p className="text-xs text-slate-500 font-semibold uppercase tracking-wider mb-2">Sources</p>
      <ul className="space-y-1">
        {sources.map((s, i) => (
          <li key={i} className="flex items-start gap-2 text-xs text-slate-500">
            <span className="shrink-0 mt-0.5">›</span>
            <a href={s.url} target="_blank" rel="noopener noreferrer"
              className="hover:text-slate-300 transition-colors underline underline-offset-2">{s.label}</a>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default function AirportRetailerPresentationDark() {
  const { t } = useTranslation();
  const r = (key) => t(`presentation.retailer.${key}`);
  const [isDownloading, setIsDownloading] = useState(false);

  const downloadPresentation = async () => {
    setIsDownloading(true);
    try {
      const { exportRetailerPptxDark } = await import("../utils/exportRetailerPptxDark");
      await exportRetailerPptxDark();
    } finally {
      setIsDownloading(false);
    }
  };

  return (
    <div className="min-h-screen bg-slate-950 text-slate-50 font-body">
      {/* Navigation */}
      <nav className="sticky top-0 z-50 backdrop-blur border-b border-slate-800 bg-slate-950/80 print:hidden">
        <div className="max-w-6xl mx-auto px-6 h-20 flex items-center justify-between">
          <DutyBoostLogo height={150} inverted />
          <div className="flex items-center gap-2">
            <Link to="/travel-partner-presentation-dark">
              <Button size="sm" variant="outline" className="text-sm hidden sm:flex bg-slate-900 border-slate-700 text-slate-200 hover:bg-slate-800">{r('nav_partner')}</Button>
            </Link>
            <Link to="/">
              <Button size="sm" variant="ghost" className="text-sm text-slate-300">{r('nav_home')}</Button>
            </Link>
            <Button size="sm" variant="outline" className="gap-1.5 bg-slate-900 border-slate-700 text-slate-200 hover:bg-slate-800"
              onClick={downloadPresentation} disabled={isDownloading}>
              <Download className="w-3.5 h-3.5" /> {isDownloading ? r('generating') : r('download')}
            </Button>
          </div>
        </div>
      </nav>

      <div className="max-w-4xl mx-auto px-6 py-16 space-y-20">

        {/* ── HERO ── */}
        <section className="space-y-6 text-center py-12">
          <Badge className="bg-orange-900/30 text-orange-300 border-orange-700 mx-auto">{r('badge')}</Badge>
          <h1 className="text-5xl sm:text-6xl font-heading font-bold leading-tight">
            {r('hero_title_1')}<br />
            <span className="text-orange-400">{r('hero_title_2')}</span>
          </h1>
          <p className="text-xl text-slate-300 max-w-3xl mx-auto leading-relaxed">
            {r('hero_subtitle')}
          </p>
          <div className="flex flex-wrap gap-3 justify-center pt-2">
            {[r('pill_1'), r('pill_2'), r('pill_3'), r('pill_4')].map(label => (
              <span key={label} className="px-3 py-1.5 rounded-full bg-orange-900/30 border border-orange-700/50 text-orange-300 text-sm font-medium">{label}</span>
            ))}
          </div>
        </section>

        {/* ── WHY DUTYBOOST — THE SCALE OF FOOT TRAFFIC ── */}
        <section className="space-y-8">
          <div className="border-l-4 border-orange-500 pl-6">
            <p className="text-xs font-bold uppercase tracking-widest text-orange-400 mb-1">{r('why_label')}</p>
            <h2 className="text-3xl font-heading font-bold">{r('why_title')}</h2>
            <p className="text-slate-400 mt-2">{r('why_subtitle')}</p>
          </div>

          <div className="grid md:grid-cols-2 gap-4">
            {[
              {
                icon: Globe,
                stat: '4.8B',
                label: r('why_s1_label'),
                detail: r('why_s1_detail'),
                src: { label: 'IATA Annual Review 2025', url: 'https://www.iata.org/contentassets/c81222d96c9a4e0bb4ff6ced0126f0bb/iata-annual-review-2025.pdf' },
              },
              {
                icon: Plane,
                stat: '188,500',
                label: r('why_s2_label'),
                detail: r('why_s2_detail'),
                src: { label: 'Schiphol Group Annual Traffic Review 2025', url: 'https://airportindustry-news.com/schiphol-airport-handles-68-8-million-passengers-in-2025/' },
              },
              {
                icon: BarChart3,
                stat: '1h 10m',
                label: r('why_s3_label'),
                detail: r('why_s3_detail'),
                src: { label: 'Pi Insight — Duty Free Competes for 1h10m Airport Dwell Time', url: 'https://www.linkedin.com/posts/pi-insight_travelretail-dutyfree-shopperbehaviour-activity-7450856841967869953-OGWq' },
              },
              {
                icon: TrendingUp,
                stat: '€68.2B',
                label: r('why_s4_label'),
                detail: r('why_s4_detail'),
                src: { label: 'Mordor Intelligence — Duty Free & Travel Retail Market 2026', url: 'https://www.mordorintelligence.com/industry-reports/duty-free-and-travel-retail-market' },
              },
            ].map(({ icon: Icon, stat, label, detail, src }, i) => (
              <div key={i} className="bg-gradient-to-br from-orange-900/15 to-slate-900 border border-orange-800/40 rounded-xl p-6 space-y-3 hover:border-orange-600 transition-colors">
                <div className="flex items-start gap-3">
                  <Icon className="w-6 h-6 text-orange-400 shrink-0 mt-1" />
                  <div>
                    <p className="text-3xl font-heading font-bold text-orange-300">{stat}</p>
                    <p className="text-sm font-semibold text-slate-200 mt-0.5">{label}</p>
                    <p className="text-sm text-slate-400 mt-2 leading-relaxed">{detail}</p>
                    <SrcLink href={src.url}>{src.label}</SrcLink>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Schiphol Breakdown */}
          <div className="bg-gradient-to-br from-slate-800 to-slate-900 border border-slate-700 rounded-xl p-6">
            <p className="text-sm font-bold text-slate-300 uppercase tracking-widest mb-4">{r('schiphol_box_title')}</p>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-center">
              {[
                { period: r('daily'), value: '188,500', sub: r('daily_sub') },
                { period: r('weekly'), value: '1.32M', sub: r('weekly_sub') },
                { period: r('monthly'), value: '5.73M', sub: r('monthly_sub') },
                { period: r('yearly'), value: '68.8M', sub: r('yearly_sub') },
              ].map(({ period, value, sub }) => (
                <div key={period} className="space-y-1">
                  <p className="text-xs text-slate-500 uppercase tracking-wider">{period}</p>
                  <p className="text-2xl font-heading font-bold text-orange-300">{value}</p>
                  <p className="text-xs text-slate-500">{sub}</p>
                </div>
              ))}
            </div>
            <p className="text-xs text-slate-500 mt-4">{r('schiphol_source')}</p>
          </div>
        </section>

        {/* ── WHY DUTYBOOST — THE CONVERSION OPPORTUNITY ── */}
        <section className="space-y-8">
          <div className="border-l-4 border-green-500 pl-6">
            <p className="text-xs font-bold uppercase tracking-widest text-green-400 mb-1">{r('conv_label')}</p>
            <h2 className="text-3xl font-heading font-bold">{r('conv_title')}</h2>
            <p className="text-slate-400 mt-2">{r('conv_subtitle')}</p>
          </div>

          <div className="grid md:grid-cols-3 gap-4">
            {[
              { stat: '28%', color: 'text-slate-300', label: r('conv_28_label'), detail: r('conv_28_detail') },
              { stat: '63%', color: 'text-orange-400', label: r('conv_63_label'), detail: r('conv_63_detail'), src: { label: 'Kearney — Travel Retail & Geopolitical Realities 2024', url: 'https://www.kearney.com/industry/consumer-retail/article/travel-retail-amid-today-s-geopolitical-realities' } },
              { stat: '71%', color: 'text-green-400', label: r('conv_71_label'), detail: r('conv_71_detail'), src: { label: 'm1nd-set Research — Conversion with Incentives 2025', url: 'https://www.linkedin.com/posts/m1nd-set_m1nd-set-research-reveals-solo-travel-will-activity-7388090859046731776-3Gbn' } },
            ].map(({ stat, color, label, detail, src }, i) => (
              <div key={i} className="bg-slate-800/60 border border-slate-700 rounded-xl p-5 space-y-3 hover:border-orange-700 transition-colors">
                <p className={`text-4xl font-heading font-bold ${color}`}>{stat}</p>
                <p className="text-sm font-semibold text-slate-200">{label}</p>
                <p className="text-xs text-slate-400 leading-relaxed">{detail}</p>
                {src && <SrcLink href={src.url}>{src.label}</SrcLink>}
              </div>
            ))}
          </div>

          <div className="bg-gradient-to-br from-orange-900/20 to-slate-900 border border-orange-800/40 rounded-xl p-6 space-y-3">
            <p className="font-semibold text-slate-100 flex items-center gap-2">
              <Zap className="w-5 h-5 text-orange-400" /> {r('preact_title')}
            </p>
            <p className="text-sm text-slate-400 leading-relaxed">{r('preact_p1')}</p>
            <p className="text-sm text-slate-400 leading-relaxed mt-2">{r('preact_p2')}</p>
            <SrcLink href="https://www.sciencedirect.com/science/article/pii/S0969699724000851">ScienceDirect — Shopping or Dining? Dwell Time & Non-Aeronautical Revenue 2024</SrcLink>
          </div>
        </section>

        {/* ── HOW DUTYBOOST WORKS ── */}
        <section className="space-y-8">
          <div className="border-l-4 border-orange-500 pl-6">
            <p className="text-xs font-bold uppercase tracking-widest text-orange-400 mb-1">{r('how_label')}</p>
            <h2 className="text-3xl font-heading font-bold">{r('how_title')}</h2>
            <p className="text-slate-400 mt-2">{r('how_subtitle')}</p>
          </div>

          <div className="grid md:grid-cols-4 gap-4">
            {[
              { num: '1', title: r('step1_title'), desc: r('step1_desc') },
              { num: '2', title: r('step2_title'), desc: r('step2_desc') },
              { num: '3', title: r('step3_title'), desc: r('step3_desc') },
              { num: '4', title: r('step4_title'), desc: r('step4_desc') },
            ].map(({ num, title, desc }) => (
              <div key={num} className="bg-gradient-to-br from-slate-800 to-slate-900 border border-slate-700 rounded-xl p-5 space-y-3 hover:border-orange-600 transition-colors">
                <div className="w-10 h-10 rounded-full bg-orange-600 flex items-center justify-center font-heading font-bold text-white text-lg">{num}</div>
                <p className="font-semibold text-slate-100">{title}</p>
                <p className="text-sm text-slate-400 leading-relaxed">{desc}</p>
              </div>
            ))}
          </div>

          {/* Tier Table */}
          <div className="overflow-hidden rounded-xl border border-slate-700">
            <div className="bg-slate-800/60 px-6 py-4 border-b border-slate-700">
              <p className="font-semibold text-slate-200">{r('tier_table_title')}</p>
              <p className="text-xs text-slate-400 mt-1">{r('tier_table_subtitle')}</p>
            </div>
            <table className="w-full">
              <thead>
                <tr className="border-b border-slate-700 bg-slate-900/40">
                  <th className="px-5 py-3 text-left text-xs font-semibold text-slate-400 uppercase">{r('tier_col_tier')}</th>
                  <th className="px-5 py-3 text-left text-xs font-semibold text-slate-400 uppercase">{r('tier_col_basket')}</th>
                  <th className="px-5 py-3 text-left text-xs font-semibold text-slate-400 uppercase">{r('tier_col_save')}</th>
                  <th className="px-5 py-3 text-left text-xs font-semibold text-slate-400 uppercase">{r('tier_col_fee')}</th>
                  <th className="px-5 py-3 text-left text-xs font-semibold text-slate-400 uppercase">{r('tier_col_net')}</th>
                </tr>
              </thead>
              <tbody>
                {[
                  { tier: '🟡 Boarding', basket: '€70–€99', save: '€5–€10', fee: '€1.75–€2.50', net: '€56–€86', row: 'bg-yellow-900/10' },
                  { tier: '🔵 Priority', basket: '€100–€199', save: '€10–€30', fee: '€2.50–€5', net: '€83–€169', row: 'bg-blue-900/10' },
                  { tier: '🟢 Lounge', basket: '€200–€299', save: '€30–€60', fee: '€5–€7.50', net: '€150–€234', row: 'bg-green-900/10' },
                  { tier: '🟣 VIP', basket: '€300+', save: '€60 flat', fee: 'max €25', net: '€215+ net', row: 'bg-purple-900/10' },
                ].map(({ tier, basket, save, fee, net, row }) => (
                  <tr key={tier} className={`border-b border-slate-700/50 ${row} hover:bg-slate-800/40 transition-colors`}>
                    <td className="px-5 py-4 font-semibold text-slate-100 text-sm">{tier}</td>
                    <td className="px-5 py-4 text-slate-400 text-sm">{basket}</td>
                    <td className="px-5 py-4 font-semibold text-orange-400 text-sm">{save}</td>
                    <td className="px-5 py-4 text-slate-500 text-sm">{fee}</td>
                    <td className="px-5 py-4 font-bold text-green-400 text-sm">{net}</td>
                  </tr>
                ))}
              </tbody>
            </table>
            <p className="px-5 py-3 text-xs text-slate-500">{r('tier_note')}</p>
          </div>
        </section>

        {/* ── WHAT DUTYBOOST BRINGS — REVENUE IMPACT ── */}
        <section className="space-y-8">
          <div className="border-l-4 border-green-500 pl-6">
            <p className="text-xs font-bold uppercase tracking-widest text-green-400 mb-1">{r('what_label')}</p>
            <h2 className="text-3xl font-heading font-bold">{r('what_title')}</h2>
            <p className="text-slate-400 mt-2">{r('what_subtitle')}</p>
          </div>

          <div className="grid md:grid-cols-3 gap-5">
            {[
              {
                metric: r('metric_conv'),
                baseline: '28%',
                with_db: '40–50%',
                lift: '+42–78%',
                note: r('conv_note'),
                src: { label: 'm1nd-set Research 2025', url: 'https://www.linkedin.com/posts/m1nd-set_m1nd-set-research-reveals-solo-travel-will-activity-7388090859046731776-3Gbn' },
              },
              {
                metric: r('metric_basket'),
                baseline: '€20–€28',
                with_db: '€100–€140',
                lift: '4–5× uplift',
                note: r('basket_note'),
                src: { label: 'ETRC EU Duty-Free Economic Impact Report April 2025', url: 'https://etrc.org/wp-content/uploads/documents/ETRC-EU-Economic-Impact-of-Duty-Free-Travel-Retail-Report-April-2025-FINAL.pdf' },
              },
              {
                metric: r('metric_daily'),
                baseline: '28 sales × €75 = €2,100',
                with_db: '45 sales × €120 = €5,400',
                lift: '+€3,300/day',
                note: r('daily_note'),
              },
            ].map(({ metric, baseline, with_db, lift, note, src }) => (
              <div key={metric} className="bg-gradient-to-br from-slate-800 to-slate-900 border border-slate-700 rounded-xl p-6 space-y-4 hover:border-green-700 transition-colors">
                <p className="text-slate-400 text-xs font-semibold uppercase tracking-wider">{metric}</p>
                <div className="space-y-2">
                  <div className="flex justify-between items-center">
                    <span className="text-slate-500 text-sm">{r('without')}</span>
                    <span className="text-lg font-bold text-slate-300">{baseline}</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-slate-300 text-sm">{r('with_db')}</span>
                    <span className="text-lg font-bold text-orange-400">{with_db}</span>
                  </div>
                </div>
                <div className="pt-3 border-t border-slate-700">
                  <p className="text-center font-bold text-green-400 text-base">{lift}</p>
                  <p className="text-xs text-slate-500 mt-2 leading-relaxed">{note}</p>
                  {src && <SrcLink href={src.url}>{src.label}</SrcLink>}
                </div>
              </div>
            ))}
          </div>

          {/* Annual impact */}
          <div className="bg-gradient-to-br from-green-900/20 to-slate-900 border border-green-800/50 rounded-xl p-6">
            <p className="font-semibold text-slate-100 mb-4">{r('annual_title')}</p>
            <div className="space-y-2 text-sm">
              <div className="flex justify-between py-2 border-b border-slate-700/40">
                <span className="text-slate-400">{r('annual_baseline')}</span>
                <span className="text-slate-300 font-semibold">€2,100/day</span>
              </div>
              <div className="flex justify-between py-2 border-b border-slate-700/40">
                <span className="text-slate-400">{r('annual_with')}</span>
                <span className="text-orange-400 font-semibold">€5,400/day</span>
              </div>
              <div className="flex justify-between py-2 border-b border-slate-700/40">
                <span className="text-slate-400">{r('annual_uplift')}</span>
                <span className="text-green-400 font-semibold">€3,150/day</span>
              </div>
              <div className="flex justify-between py-3 text-base">
                <span className="text-slate-100 font-semibold">{r('annual_total')}</span>
                <span className="text-green-400 font-bold text-xl">€1,149,750</span>
              </div>
            </div>
            <p className="text-xs text-slate-500 mt-2">{r('annual_note')}</p>
          </div>
        </section>

        {/* ── WHAT DUTYBOOST BRINGS — FULL VALUE SUMMARY ── */}
        <section className="space-y-8">
          <div className="border-l-4 border-orange-500 pl-6">
            <p className="text-xs font-bold uppercase tracking-widest text-orange-400 mb-1">{r('advantage_label')}</p>
            <h2 className="text-3xl font-heading font-bold">{r('advantage_title')}</h2>
          </div>

          <div className="grid md:grid-cols-2 gap-4">
            {[
              { icon: Check, title: r('b1_title'), desc: r('b1_desc') },
              { icon: Check, title: r('b2_title'), desc: r('b2_desc') },
              { icon: Check, title: r('b3_title'), desc: r('b3_desc') },
              { icon: Check, title: r('b4_title'), desc: r('b4_desc') },
              { icon: BarChart3, title: r('b5_title'), desc: r('b5_desc') },
              { icon: Zap, title: r('b6_title'), desc: r('b6_desc') },
              { icon: Star, title: r('b7_title'), desc: r('b7_desc') },
              { icon: Users, title: r('b8_title'), desc: r('b8_desc') },
            ].map(({ icon: Icon, title, desc }, i) => (
              <div key={i} className="bg-gradient-to-br from-slate-800 to-slate-900 border border-slate-700 rounded-xl p-5 space-y-2 hover:border-orange-600 transition-colors">
                <div className="flex items-start gap-3">
                  <Icon className="w-5 h-5 text-orange-400 shrink-0 mt-0.5" />
                  <div>
                    <p className="font-semibold text-slate-100 text-sm">{title}</p>
                    <p className="text-xs text-slate-400 mt-1 leading-relaxed">{desc}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* ── MARKET GROWTH CONTEXT ── */}
        <section className="space-y-8">
          <div className="border-l-4 border-blue-500 pl-6">
            <p className="text-xs font-bold uppercase tracking-widest text-blue-400 mb-1">{r('market_label')}</p>
            <h2 className="text-3xl font-heading font-bold">{r('market_title')}</h2>
          </div>
          <div className="grid md:grid-cols-2 gap-5">
            {[
              { stat: '+8.8%', label: r('mkt_s1_label'), context: r('mkt_s1_context'), src: { label: 'Mordor Intelligence — Duty Free & Travel Retail Market 2026', url: 'https://www.mordorintelligence.com/industry-reports/duty-free-and-travel-retail-market' } },
              { stat: '+8.5%', label: r('mkt_s2_label'), context: r('mkt_s2_context'), src: { label: 'LinkedIn — Airport DOOH & Digital Conversion Research', url: 'https://www.linkedin.com/posts/linna-chen-a0055924a_dooh-programmaticadvertising-airportadvertising-activity-7394937993599488000-u16w' } },
              { stat: '+10.6%', label: r('mkt_s3_label'), context: r('mkt_s3_context'), src: { label: 'IATA Annual Review 2025', url: 'https://www.iata.org/contentassets/c81222d96c9a4e0bb4ff6ced0126f0bb/iata-annual-review-2025.pdf' } },
              { stat: '62%', label: r('mkt_s4_label'), context: r('mkt_s4_context'), src: { label: 'Market Growth Reports — Duty Free Travel Retail 2024', url: 'https://www.marketgrowthreports.com/market-reports/duty-free-travel-retail-market-114899' } },
            ].map(({ stat, label, context, src }, i) => (
              <div key={i} className="bg-gradient-to-br from-slate-800 to-slate-900 border border-slate-700 rounded-xl p-5 space-y-2 hover:border-blue-600 transition-colors">
                <p className="text-3xl font-heading font-bold text-blue-400">{stat}</p>
                <p className="text-sm font-semibold text-slate-200">{label}</p>
                <p className="text-xs text-slate-400 leading-relaxed">{context}</p>
                <SrcLink href={src.url}>{src.label}</SrcLink>
              </div>
            ))}
          </div>
        </section>

        {/* ── SOURCES ── */}
        <section className="space-y-4">
          <h2 className="text-xl font-heading font-bold text-slate-400">{r('sources_title')}</h2>
          <div className="bg-slate-900 border border-slate-700 rounded-xl p-6 space-y-2.5">
            {[
              { label: 'IATA Annual Review 2025 — 4.8B air passengers in 2024 (+10.6% YoY)', url: 'https://www.iata.org/contentassets/c81222d96c9a4e0bb4ff6ced0126f0bb/iata-annual-review-2025.pdf' },
              { label: 'Schiphol Group — 68.8M passengers in 2025 (+2.9% YoY)', url: 'https://airportindustry-news.com/schiphol-airport-handles-68-8-million-passengers-in-2025/' },
              { label: 'Mordor Intelligence — Duty Free & Travel Retail Market $102.5B 2026, CAGR 8.8%', url: 'https://www.mordorintelligence.com/industry-reports/duty-free-and-travel-retail-market' },
              { label: 'Pi Insight — Duty Free Competes for 1h10m Airport Dwell Time', url: 'https://www.linkedin.com/posts/pi-insight_travelretail-dutyfree-shopperbehaviour-activity-7450856841967869953-OGWq' },
              { label: 'Air Travel Design Guide — Schiphol Average Dwell Time 146 min per passenger', url: 'https://airtraveldesign.guide/Time' },
              { label: 'ScienceDirect — Dwell Time & Non-Aeronautical Revenue: 10% dwell = +8% retail sales', url: 'https://www.sciencedirect.com/science/article/pii/S0969699724000851' },
              { label: 'Kearney — Travel Retail & Geopolitical Realities 2024 (63% confidence with incentives)', url: 'https://www.kearney.com/industry/consumer-retail/article/travel-retail-amid-today-s-geopolitical-realities' },
              { label: 'm1nd-set Research — Solo Travel & Conversion Rates (71% achievable with incentives)', url: 'https://www.linkedin.com/posts/m1nd-set_m1nd-set-research-reveals-solo-travel-will-activity-7388090859046731776-3Gbn' },
              { label: 'ETRC — Economic Impact of Duty-Free & Travel Retail in Europe, April 2025 (€20–€28/pax)', url: 'https://etrc.org/wp-content/uploads/documents/ETRC-EU-Economic-Impact-of-Duty-Free-Travel-Retail-Report-April-2025-FINAL.pdf' },
              { label: 'TFWA Insight — Duty Free Spend Understanding Study 2024', url: 'https://www.tfwa.com/research/tfwa-insight/tfwa-insight-the-duty-free-spend-understanding-study-2024-100016689' },
              { label: 'LinkedIn — Airport DOOH & Digital Conversion Research (+8.5% conversion with digital)', url: 'https://www.linkedin.com/posts/linna-chen-a0055924a_dooh-programmaticadvertising-airportadvertising-activity-7394937993599488000-u16w' },
              { label: 'Market Growth Reports — Duty Free Travel Retail Market 2024 (62% digital capability)', url: 'https://www.marketgrowthreports.com/market-reports/duty-free-travel-retail-market-114899' },
            ].map((s, i) => (
              <a key={i} href={s.url} target="_blank" rel="noopener noreferrer"
                className="flex items-start gap-2 text-sm text-slate-500 hover:text-slate-300 transition-colors group">
                <ExternalLink className="w-3.5 h-3.5 shrink-0 mt-0.5 group-hover:text-orange-400" />
                {s.label}
              </a>
            ))}
          </div>
        </section>

        {/* ── CTA ── */}
        <section className="bg-gradient-to-r from-orange-900/40 to-slate-900 border border-orange-700/50 rounded-2xl p-10 space-y-6 text-center">
          <Badge className="bg-orange-900/30 text-orange-300 border-orange-700 mx-auto">{r('cta_badge')}</Badge>
          <h3 className="text-3xl font-heading font-bold">{r('cta_title')}</h3>
          <p className="text-slate-300 max-w-lg mx-auto">{r('cta_subtitle')}</p>
          <div className="flex flex-wrap gap-3 justify-center">
            <a href="mailto:hello@dutyboost.com">
              <Button className="gap-2 bg-orange-600 hover:bg-orange-700 text-base px-6 py-5">
                <Mail className="w-4 h-4" /> hello@dutyboost.com
              </Button>
            </a>
            <Link to="/travel-partner-presentation-dark">
              <Button variant="outline" className="gap-2 bg-slate-900 border-slate-700 text-slate-200 hover:bg-slate-800 text-base px-6 py-5">
                {r('cta_partner')} <ArrowRight className="w-4 h-4" />
              </Button>
            </Link>
          </div>
        </section>

      </div>

      <footer className="border-t border-slate-800 py-8 px-6 print:hidden mt-10">
        <div className="max-w-6xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4 text-sm text-slate-400">
          <DutyBoostLogo height={120} inverted />
          <div className="flex items-center gap-6">
            <Link to="/" className="hover:text-slate-200 transition-colors">{r('nav_home').replace('← ', '')}</Link>
            <a href="mailto:hello@dutyboost.com" className="hover:text-slate-200 transition-colors">hello@dutyboost.com</a>
            <span>© 2026 DutyBoost</span>
          </div>
        </div>
      </footer>
    </div>
  );
}