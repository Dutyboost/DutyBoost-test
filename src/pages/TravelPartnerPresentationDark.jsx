import { Link } from "react-router-dom";
import { useState } from "react";
import { useTranslation } from "react-i18next";
import DutyBoostLogo from "../components/DutyBoostLogo";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Download, FileText, Mail, ArrowRight, TrendingUp, Users, Globe, Plane, Zap, Star, BarChart3, Check, ExternalLink, DollarSign } from "lucide-react";
import TravelAgencyIcon from "@/components/TravelAgencyIcon";
import HotelIcon from "@/components/HotelIcon";
import CarRentalIcon from "@/components/CarRentalIcon";
import TravelerIcon from "@/components/TravelerIcon";
import AirportRetailerIcon from "@/components/AirportRetailerIcon";
import FooterLinks from "@/components/FooterLinks";
import LanguageSwitcher from "@/components/LanguageSwitcher";

export default function TravelPartnerPresentationDark() {
  const { t } = useTranslation();
  const p = (key) => t(`presentation.partner.${key}`);
  const [isDownloading, setIsDownloading] = useState(false);

  const downloadPdf = () => window.print();

  const downloadPresentation = async () => {
    setIsDownloading(true);
    try {
      const { exportTravelPartnerPptx } = await import("../utils/exportTravelPartnerPptx");
      await exportTravelPartnerPptx();
    } finally {
      setIsDownloading(false);
    }
  };

  return (
    <div className="min-h-screen bg-background font-body">
      {/* Navigation */}
      <nav className="sticky top-0 z-50 backdrop-blur border-b border-border bg-background/80 print:hidden">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 h-16 sm:h-20 flex items-center justify-between">
          <DutyBoostLogo height={100} />
          <div className="flex items-center gap-2">
            <Link to="/retailer-presentation-dark">
              <Button size="sm" variant="ghost" className="text-sm hidden sm:flex text-muted-foreground">{p('nav_retailer')}</Button>
            </Link>
            <LanguageSwitcher />
            <Link to="/">
              <Button size="sm" variant="ghost" className="text-sm text-muted-foreground">{p('nav_home')}</Button>
            </Link>
            <Button size="sm" variant="outline" className="gap-1.5" onClick={downloadPdf}>
              <FileText className="w-3.5 h-3.5" /> PDF
            </Button>
            <Button size="sm" className="gap-1.5 bg-primary text-primary-foreground hover:bg-primary/90"
              onClick={downloadPresentation} disabled={isDownloading}>
              <Download className="w-3.5 h-3.5" /> {isDownloading ? p('generating') : p('download')}
            </Button>
          </div>
        </div>
      </nav>

      <div className="max-w-6xl mx-auto px-4 sm:px-6 py-16 space-y-20">

        {/* Hero */}
        <section className="relative overflow-hidden text-center space-y-8 py-10">
          <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-background to-accent/5 pointer-events-none rounded-3xl" />
          <div className="absolute top-0 right-0 w-72 h-72 bg-primary/10 rounded-full blur-3xl pointer-events-none" />
          <div className="absolute bottom-0 left-0 w-96 h-96 bg-accent/10 rounded-full blur-3xl pointer-events-none" />
          <div className="relative space-y-6">
            <Badge className="bg-primary/10 text-primary border-primary/30 mx-auto">{p('badge')}</Badge>
            <h1 className="text-5xl sm:text-6xl font-heading font-bold leading-tight">
              {p('hero_title_1')}{' '}
              <span className="bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">{p('hero_title_2')}</span>
            </h1>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto leading-relaxed">{p('hero_subtitle')}</p>
            <div className="flex flex-wrap gap-3 justify-center pt-2">
              {[p('pill_1'), p('pill_2'), p('pill_3'), p('pill_4')].map(label => (
                <span key={label} className="px-4 py-2 rounded-full bg-card border border-border text-foreground text-sm font-medium">{label}</span>
              ))}
            </div>
          </div>
        </section>

        {/* Who it's for */}
        <section className="space-y-8">
          <div className="border-l-4 border-primary pl-6">
            <p className="text-xs font-bold uppercase tracking-widest text-primary mb-1">{p('why_label')}</p>
            <h2 className="text-3xl font-heading font-bold">{p('why_title')}</h2>
            <p className="text-muted-foreground mt-2">{p('why_subtitle')}</p>
          </div>

          {/* Partner type icons */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {[
              { Icon: TravelAgencyIcon, bg: 'bg-green-50', iconColor: 'text-green-600', label: 'Flight Partners' },
              { Icon: HotelIcon, bg: 'bg-blue-50', iconColor: 'text-blue-600', label: 'Accommodation Partners' },
              { Icon: CarRentalIcon, bg: 'bg-orange-50', iconColor: 'text-orange-600', label: 'Car Rental Partners' },
              { Icon: TravelerIcon, bg: 'bg-purple-50', iconColor: 'text-purple-600', label: 'Their Travellers' },
            ].map(({ Icon, bg, iconColor, label }, i) => (
              <div key={i} className="bg-card border border-border rounded-2xl p-5 flex flex-col items-center text-center gap-3 hover:shadow-lg transition-shadow">
                <div className={`w-14 h-14 rounded-2xl ${bg} flex items-center justify-center`}>
                  <Icon className={`w-8 h-8 ${iconColor}`} />
                </div>
                <p className="font-semibold text-sm">{label}</p>
              </div>
            ))}
          </div>

          {/* Scale stats */}
          <div className="grid md:grid-cols-2 gap-4">
            {[
              { icon: Globe, val: '4.8B', label: p('why_s1_label'), detail: p('why_s1_detail') },
              { icon: Plane, val: '68.8M', label: p('why_s2_label'), detail: p('why_s2_detail') },
              { icon: BarChart3, val: '€68.2B', label: p('why_s3_label'), detail: p('why_s3_detail') },
              { icon: TrendingUp, val: '1h 10m', label: p('why_s4_label'), detail: p('why_s4_detail') },
            ].map(({ icon: Icon, val, label, detail }, i) => (
              <div key={i} className="bg-card border border-border rounded-2xl p-6 space-y-3 hover:shadow-lg transition-shadow">
                <div className="flex items-start gap-3">
                  <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center shrink-0">
                    <Icon className="w-5 h-5 text-primary" />
                  </div>
                  <div>
                    <p className="text-2xl font-heading font-bold bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">{val}</p>
                    <p className="text-sm font-semibold mt-0.5">{label}</p>
                    <p className="text-xs text-muted-foreground mt-1 leading-relaxed">{detail}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Schiphol box */}
          <div className="bg-card border border-border rounded-2xl p-6">
            <p className="text-sm font-bold uppercase tracking-widest text-muted-foreground mb-4">{p('schiphol_box_title')}</p>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-center">
              {[
                { period: p('daily'), value: '188,500', sub: p('daily_sub') },
                { period: p('weekly'), value: '1.32M', sub: p('weekly_sub') },
                { period: p('monthly'), value: '5.73M', sub: p('monthly_sub') },
                { period: p('yearly'), value: '68.8M', sub: p('yearly_sub') },
              ].map(({ period, value, sub }) => (
                <div key={period} className="space-y-1">
                  <p className="text-xs text-muted-foreground uppercase tracking-wider">{period}</p>
                  <p className="text-2xl font-heading font-bold text-primary">{value}</p>
                  <p className="text-xs text-muted-foreground">{sub}</p>
                </div>
              ))}
            </div>
            <p className="text-xs text-muted-foreground mt-4">{p('schiphol_source')}</p>
          </div>
        </section>

        {/* Conversion Opportunity */}
        <section className="space-y-8">
          <div className="border-l-4 border-accent pl-6">
            <p className="text-xs font-bold uppercase tracking-widest text-accent mb-1">{p('conv_label')}</p>
            <h2 className="text-3xl font-heading font-bold">{p('conv_title')}</h2>
            <p className="text-muted-foreground mt-2">{p('conv_subtitle')}</p>
          </div>
          <div className="grid md:grid-cols-3 gap-5">
            {[
              { stat: '28%', color: 'text-foreground', label: p('conv_28_label'), detail: p('conv_28_detail') },
              { stat: '63%', color: 'text-primary', label: p('conv_63_label'), detail: p('conv_63_detail') },
              { stat: '71%', color: 'text-accent', label: p('conv_71_label'), detail: p('conv_71_detail') },
            ].map(({ stat, color, label, detail }, i) => (
              <div key={i} className="bg-card border border-border rounded-2xl p-6 space-y-3 hover:shadow-lg transition-shadow">
                <p className={`text-5xl font-heading font-bold ${color}`}>{stat}</p>
                <p className="text-sm font-semibold">{label}</p>
                <p className="text-xs text-muted-foreground leading-relaxed">{detail}</p>
              </div>
            ))}
          </div>
          <div className="bg-gradient-to-br from-primary/5 to-accent/5 border border-border rounded-2xl p-6">
            <p className="font-heading font-bold text-lg mb-2">{p('preact_title')}</p>
            <p className="text-sm text-muted-foreground leading-relaxed">{p('preact_p1')}</p>
          </div>
        </section>

        {/* How it Works */}
        <section className="space-y-8">
          <div className="border-l-4 border-primary pl-6">
            <p className="text-xs font-bold uppercase tracking-widest text-primary mb-1">{p('how_label')}</p>
            <h2 className="text-3xl font-heading font-bold">{p('how_title')}</h2>
            <p className="text-muted-foreground mt-2">{p('how_subtitle')}</p>
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {[
              { num: '1', title: p('step1_title'), desc: p('step1_desc') },
              { num: '2', title: p('step2_title'), desc: p('step2_desc') },
              { num: '3', title: p('step3_title'), desc: p('step3_desc') },
              { num: '4', title: p('step4_title'), desc: p('step4_desc') },
            ].map(({ num, title, desc }) => (
              <div key={num} className="bg-card border border-border rounded-2xl p-5 space-y-3 hover:shadow-lg transition-shadow">
                <div className="w-10 h-10 rounded-full bg-gradient-to-r from-primary to-accent flex items-center justify-center font-heading font-bold text-white text-lg">{num}</div>
                <p className="font-semibold">{title}</p>
                <p className="text-sm text-muted-foreground leading-relaxed">{desc}</p>
              </div>
            ))}
          </div>

          {/* Tier table */}
          <div className="overflow-hidden rounded-2xl border border-border">
            <div className="bg-muted/50 px-6 py-4 border-b border-border">
              <p className="font-semibold">{p('tier_table_title')}</p>
              <p className="text-xs text-muted-foreground mt-1">{p('tier_table_subtitle')}</p>
            </div>
            <table className="w-full">
              <thead>
                <tr className="border-b border-border bg-muted/30">
                  {[p('tier_col_tier'), p('tier_col_basket'), p('tier_col_save'), p('tier_col_comm')].map(h => (
                    <th key={h} className="px-5 py-3 text-left text-xs font-semibold text-muted-foreground uppercase tracking-wider">{h}</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {[
                  { tier: '🟡 Boarding', basket: '€70–€99', saving: '€5–€10', comm: 'up to €2.50' },
                  { tier: '🔵 Priority', basket: '€100–€199', saving: '€10–€30', comm: 'up to €5' },
                  { tier: '🟢 Lounge', basket: '€200–€299', saving: '€30–€60', comm: 'up to €5' },
                  { tier: '🟣 VIP', basket: '€300+', saving: '€60 flat', comm: 'up to €5 (capped)' },
                ].map(({ tier, basket, saving, comm }) => (
                  <tr key={tier} className="border-b border-border hover:bg-muted/20 transition-colors">
                    <td className="px-5 py-4 font-semibold">{tier}</td>
                    <td className="px-5 py-4 text-muted-foreground">{basket}</td>
                    <td className="px-5 py-4 font-semibold text-primary">{saving}</td>
                    <td className="px-5 py-4 font-semibold text-accent">{comm}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>

        {/* Revenue Model */}
        <section className="space-y-8">
          <div className="border-l-4 border-accent pl-6">
            <p className="text-xs font-bold uppercase tracking-widest text-accent mb-1">{p('what_label')}</p>
            <h2 className="text-3xl font-heading font-bold">{p('what_title')}</h2>
            <p className="text-muted-foreground mt-2">{p('what_subtitle')}</p>
          </div>
          <div className="bg-gradient-to-br from-primary/5 to-accent/5 border border-border rounded-2xl p-8">
            <p className="text-sm font-bold uppercase tracking-widest text-muted-foreground mb-6">{p('revenue_title')}</p>
            <div className="space-y-2 text-sm">
              {[
                { label: p('rev_row1'), val: '100,000' },
                { label: p('rev_row2'), val: '100,000' },
                { label: p('rev_row3'), val: '20,000' },
                { label: p('rev_row4'), val: '€135' },
                { label: p('rev_row5'), val: '€3.38 avg' },
                { label: p('rev_row6'), val: '€0.67 avg' },
              ].map(({ label, val }) => (
                <div key={label} className="flex justify-between items-center py-2.5 border-b border-border">
                  <span className="text-muted-foreground">{label}</span>
                  <span className="font-semibold">{val}</span>
                </div>
              ))}
            </div>
            <div className="mt-4 grid md:grid-cols-2 gap-4">
              <div className="flex justify-between items-center py-3 px-4 bg-primary/10 rounded-xl border border-primary/20">
                <span className="font-semibold">{p('rev_annual_commission')}</span>
                <span className="text-2xl font-heading font-bold text-primary">€13,400</span>
              </div>
              <div className="flex justify-between items-center py-3 px-4 bg-accent/10 rounded-xl border border-accent/20">
                <span className="font-semibold">{p('rev_cost_to_you')}</span>
                <span className="text-2xl font-heading font-bold text-accent">€0</span>
              </div>
            </div>
            <p className="text-xs text-muted-foreground mt-4">{p('revenue_note')}</p>
          </div>

          {/* Scale table */}
          <div className="overflow-hidden rounded-2xl border border-border">
            <div className="bg-muted/50 px-6 py-4 border-b border-border">
              <p className="font-semibold">{p('scale_title')}</p>
            </div>
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-border bg-muted/30">
                  {[p('col_bookings'), p('col_redemptions'), p('col_commission')].map(h => (
                    <th key={h} className="px-5 py-3 text-left text-xs font-semibold text-muted-foreground uppercase">{h}</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {[
                  { b: '10,000', r: '2,000', c: '€1,340' },
                  { b: '50,000', r: '10,000', c: '€6,700' },
                  { b: '100,000', r: '20,000', c: '€13,400' },
                  { b: '500,000', r: '100,000', c: '€67,000' },
                  { b: '1,000,000', r: '200,000', c: '€134,000' },
                ].map(({ b, r, c }) => (
                  <tr key={b} className="border-b border-border hover:bg-muted/20 transition-colors">
                    <td className="px-5 py-3.5 font-medium">{b}</td>
                    <td className="px-5 py-3.5 text-muted-foreground">{r}</td>
                    <td className="px-5 py-3.5 font-bold text-primary">{c}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>

        {/* Loyalty */}
        <section className="space-y-8">
          <div className="border-l-4 border-primary pl-6">
            <p className="text-xs font-bold uppercase tracking-widest text-primary mb-1">{p('loyalty_label')}</p>
            <h2 className="text-3xl font-heading font-bold">{p('loyalty_title')}</h2>
            <p className="text-muted-foreground mt-2">{p('loyalty_subtitle')}</p>
          </div>
          <div className="grid md:grid-cols-2 gap-5">
            {[
              { icon: Star, title: p('l1_title'), desc: p('l1_desc') },
              { icon: Users, title: p('l2_title'), desc: p('l2_desc') },
              { icon: TrendingUp, title: p('l3_title'), desc: p('l3_desc') },
              { icon: DollarSign, title: p('l4_title'), desc: p('l4_desc') },
            ].map(({ icon: Icon, title, desc }, i) => (
              <div key={i} className="bg-card border border-border rounded-2xl p-6 space-y-3 hover:shadow-lg transition-shadow">
                <div className="flex items-start gap-3">
                  <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center shrink-0">
                    <Icon className="w-5 h-5 text-primary" />
                  </div>
                  <div>
                    <p className="font-semibold">{title}</p>
                    <p className="text-sm text-muted-foreground mt-1 leading-relaxed">{desc}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Full Advantages */}
        <section className="space-y-8">
          <div className="border-l-4 border-accent pl-6">
            <p className="text-xs font-bold uppercase tracking-widest text-accent mb-1">{p('advantage_label')}</p>
            <h2 className="text-3xl font-heading font-bold">{p('advantage_title')}</h2>
          </div>
          <div className="grid md:grid-cols-2 gap-4">
            {[p('b1_title'), p('b2_title'), p('b3_title'), p('b4_title'), p('b5_title'), p('b6_title')].map((title, i) => (
              <div key={i} className="bg-card border border-border rounded-2xl p-5 hover:shadow-lg transition-shadow">
                <div className="flex items-start gap-3">
                  <div className="w-8 h-8 rounded-lg bg-primary/10 flex items-center justify-center shrink-0">
                    <Check className="w-4 h-4 text-primary" />
                  </div>
                  <div>
                    <p className="font-semibold text-sm">{title}</p>
                    <p className="text-xs text-muted-foreground mt-1 leading-relaxed">{p(`b${i + 1}_desc`)}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Retailer bridge */}
        <section className="bg-card border border-border rounded-2xl p-8 space-y-4">
          <div className="flex items-center gap-4">
            <div className="w-14 h-14 rounded-2xl bg-orange-50 flex items-center justify-center">
              <AirportRetailerIcon className="w-8 h-8 text-orange-600" />
            </div>
            <div>
              <p className="font-heading font-bold text-lg">The Retailer Network</p>
              <p className="text-muted-foreground text-sm">Where your DutyCredits are redeemed</p>
            </div>
          </div>
          <p className="text-sm text-muted-foreground leading-relaxed">
            Your travellers' DutyCredits are valid at airport retailers in the DutyBoost network — creating real, tangible value that your customers associate with your brand.
          </p>
          <Link to="/retailer-presentation-dark">
            <Button variant="outline" size="sm" className="gap-1.5 text-primary border-primary hover:bg-primary/5">
              {p('cta_retailer')} <ArrowRight className="w-3.5 h-3.5" />
            </Button>
          </Link>
        </section>

        {/* Sources */}
        <section className="space-y-4">
          <h2 className="text-xl font-heading font-bold text-muted-foreground">{p('sources_title')}</h2>
          <div className="bg-card border border-border rounded-2xl p-6 space-y-2.5">
            {[
              { label: 'IATA Annual Review 2025 — Global air passenger traffic 4.8B in 2024 (+10.6% YoY)', url: 'https://www.iata.org/contentassets/c81222d96c9a4e0bb4ff6ced0126f0bb/iata-annual-review-2025.pdf' },
              { label: 'Schiphol Group — 68.8M passengers in 2025 (+2.9% YoY)', url: 'https://airportindustry-news.com/schiphol-airport-handles-68-8-million-passengers-in-2025/' },
              { label: 'LinkedIn Market Research — Global Duty-Free & Travel Retail Market $68.2B 2024', url: 'https://www.linkedin.com/pulse/global-duty-free-travel-retail-market-growth-analysis-tcnme' },
              { label: 'Pi Insight — Duty Free Competes for 1h10m Airport Dwell Time', url: 'https://www.linkedin.com/posts/pi-insight_travelretail-dutyfree-shopperbehaviour-activity-7450856841967869953-OGWq' },
              { label: 'Kearney — Travel Retail & Geopolitical Realities 2024 (63% incentive confidence)', url: 'https://www.kearney.com/industry/consumer-retail/article/travel-retail-amid-today-s-geopolitical-realities' },
              { label: 'm1nd-set Research — Solo Travel & Conversion Rates (71% with incentives)', url: 'https://www.linkedin.com/posts/m1nd-set_m1nd-set-research-reveals-solo-travel-will-activity-7388090859046731776-3Gbn' },
              { label: 'ETRC — Economic Impact of Duty-Free & Travel Retail in Europe, April 2025', url: 'https://etrc.org/wp-content/uploads/documents/ETRC-EU-Economic-Impact-of-Duty-Free-Travel-Retail-Report-April-2025-FINAL.pdf' },
            ].map((s, i) => (
              <a key={i} href={s.url} target="_blank" rel="noopener noreferrer"
                className="flex items-start gap-2 text-sm text-muted-foreground hover:text-foreground transition-colors group">
                <ExternalLink className="w-3.5 h-3.5 shrink-0 mt-0.5 group-hover:text-primary" />
                {s.label}
              </a>
            ))}
          </div>
        </section>

        {/* CTA */}
        <section>
          <div className="bg-gradient-to-br from-primary via-primary/90 to-primary/70 rounded-3xl p-12 text-primary-foreground shadow-2xl relative overflow-hidden text-center space-y-6">
            <div className="absolute top-0 right-0 w-64 h-64 bg-white/10 rounded-full -translate-y-1/2 translate-x-1/2 pointer-events-none" />
            <div className="absolute bottom-0 left-0 w-48 h-48 bg-black/10 rounded-full translate-y-1/2 -translate-x-1/2 pointer-events-none" />
            <div className="relative space-y-4">
              <Badge className="bg-white/20 text-white border-white/30 mx-auto">{p('cta_badge')}</Badge>
              <h3 className="text-3xl font-heading font-bold">{p('cta_title')}</h3>
              <p className="text-primary-foreground/80 text-lg max-w-lg mx-auto">{p('cta_subtitle')}</p>
              <div className="flex flex-wrap gap-3 justify-center pt-2">
                <a href="mailto:hello@dutyboost.com">
                  <Button size="lg" className="bg-white text-primary hover:bg-white/90 gap-2 px-8">
                    <Mail className="w-4 h-4" /> hello@dutyboost.com
                  </Button>
                </a>
                <Link to="/retailer-presentation-dark">
                  <Button size="lg" variant="outline" className="border-white/40 text-white hover:bg-white/10 gap-2 px-8">
                    {p('cta_retailer')} <ArrowRight className="w-4 h-4" />
                  </Button>
                </Link>
              </div>
            </div>
          </div>
        </section>
      </div>

      {/* Footer */}
      <footer className="border-t border-border py-8 sm:py-10 px-4 sm:px-6 print:hidden mt-10">
        <div className="max-w-6xl mx-auto space-y-4">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4 text-sm text-muted-foreground">
            <DutyBoostLogo height={100} />
            <div className="flex items-center gap-6">
              <Link to="/" className="hover:text-foreground transition-colors">{p('nav_home').replace('← ', '')}</Link>
              <a href="mailto:hello@dutyboost.com" className="hover:text-foreground transition-colors">hello@dutyboost.com</a>
              <span>© 2026 DutyBoost</span>
            </div>
          </div>
          <FooterLinks />
        </div>
      </footer>
    </div>
  );
}