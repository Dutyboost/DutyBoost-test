import { useState } from 'react';
import { Link } from 'react-router-dom';
import { Download, TrendingUp, Users, Zap, BarChart3, ArrowRight, DollarSign, Star, Check, Globe, Plane } from 'lucide-react';
import { Button } from '@/components/ui/button';
import DutyBoostLogo from '@/components/DutyBoostLogo';
import TravelAgencyIcon from '@/components/TravelAgencyIcon';
import HotelIcon from '@/components/HotelIcon';
import CarRentalIcon from '@/components/CarRentalIcon';
import TravelerIcon from '@/components/TravelerIcon';
import AirportRetailerIcon from '@/components/AirportRetailerIcon';
import FooterLinks from '@/components/FooterLinks';
import LanguageSwitcher from '@/components/LanguageSwitcher';
import { useTranslation } from 'react-i18next';

export default function TravelPartnerPresentation() {
  const [downloading, setDownloading] = useState(false);
  const { t } = useTranslation();
  const p = (key) => t(`presentation.partner.${key}`);

  const handleDownload = async () => {
    setDownloading(true);
    try {
      const { exportTravelPartnerPptx } = await import('@/utils/exportTravelPartnerPptx');
      await exportTravelPartnerPptx();
    } catch (err) {
      console.error('Failed to download:', err);
    } finally {
      setDownloading(false);
    }
  };

  return (
    <div className="min-h-screen bg-background font-body">
      {/* Nav */}
      <nav className="sticky top-0 z-50 backdrop-blur border-b border-border bg-background/80">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 h-16 sm:h-20 flex items-center justify-between">
          <DutyBoostLogo height={100} />
          <div className="flex items-center gap-2">
            <Link to="/retailer-presentation">
              <Button size="sm" variant="ghost" className="gap-1.5 hidden sm:flex text-muted-foreground">
                {p('nav_retailer')}
              </Button>
            </Link>
            <LanguageSwitcher />
            <Link to="/">
              <Button size="sm" variant="ghost" className="gap-1.5 text-muted-foreground">{p('nav_home')}</Button>
            </Link>
            <Button onClick={handleDownload} disabled={downloading} size="sm" className="gap-1.5 bg-primary text-primary-foreground hover:bg-primary/90">
              <Download className="w-3.5 h-3.5" />
              {downloading ? p('generating') : p('download')}
            </Button>
          </div>
        </div>
      </nav>

      <div className="max-w-6xl mx-auto px-4 sm:px-6 py-16 space-y-24">

        {/* Hero */}
        <section className="relative overflow-hidden text-center space-y-8 py-8">
          <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-background to-accent/5 pointer-events-none rounded-3xl" />
          <div className="absolute top-0 right-0 w-72 h-72 bg-primary/10 rounded-full blur-3xl pointer-events-none" />
          <div className="absolute bottom-0 left-0 w-96 h-96 bg-accent/10 rounded-full blur-3xl pointer-events-none" />
          <div className="relative space-y-6">
            <p className="text-xs font-bold uppercase tracking-widest text-primary">{p('badge')}</p>
            <h1 className="text-5xl sm:text-6xl font-heading font-bold leading-tight">
              {p('hero_title_1')}{' '}
              <span className="bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">{p('hero_title_2')}</span>
            </h1>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto leading-relaxed">{p('hero_subtitle')}</p>
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

          {/* Partner types */}
          <div className="grid md:grid-cols-4 gap-4">
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
                    <p className="text-sm font-semibold text-foreground mt-0.5">{label}</p>
                    <p className="text-xs text-muted-foreground mt-1 leading-relaxed">{detail}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Schiphol box */}
          <div className="bg-card border border-border rounded-2xl p-6">
            <p className="text-sm font-bold text-foreground uppercase tracking-widest mb-4">{p('schiphol_box_title')}</p>
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
                <p className="font-semibold text-foreground">{title}</p>
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
                  { tier: '🟡 Boarding', basket: '€50–€99', saving: '€5–€10', comm: 'up to €2.50' },
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
              <div key={i} className="bg-card border border-border rounded-2xl p-5 space-y-2 hover:shadow-lg transition-shadow">
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

        {/* Also works with Airport Retailer */}
        <section className="bg-card border border-border rounded-2xl p-8 space-y-4">
          <div className="flex items-center gap-4">
            <div className="w-14 h-14 rounded-2xl bg-orange-50 flex items-center justify-center">
              <AirportRetailerIcon className="w-8 h-8 text-orange-600" />
            </div>
            <div>
              <p className="font-heading font-bold text-lg">The Retailer Side</p>
              <p className="text-muted-foreground text-sm">Your DutyCredits are redeemed here</p>
            </div>
          </div>
          <p className="text-sm text-muted-foreground leading-relaxed">
            Every DutyCredit your travellers receive is redeemable at airport retailers in the DutyBoost network — creating real, tangible value that your customers associate with your brand.
          </p>
          <Link to="/retailer-presentation">
            <Button variant="outline" size="sm" className="gap-1.5 text-primary border-primary hover:bg-primary/5">
              {p('cta_retailer')} <ArrowRight className="w-3.5 h-3.5" />
            </Button>
          </Link>
        </section>

        {/* CTA */}
        <section>
          <div className="bg-gradient-to-br from-primary via-primary/90 to-primary/70 rounded-3xl p-12 text-primary-foreground shadow-2xl relative overflow-hidden text-center space-y-6">
            <div className="absolute top-0 right-0 w-64 h-64 bg-white/10 rounded-full -translate-y-1/2 translate-x-1/2 pointer-events-none" />
            <div className="absolute bottom-0 left-0 w-48 h-48 bg-black/10 rounded-full translate-y-1/2 -translate-x-1/2 pointer-events-none" />
            <div className="relative space-y-4">
              <p className="text-xs font-bold uppercase tracking-widest text-primary-foreground/70">{p('cta_badge')}</p>
              <h2 className="text-3xl font-heading font-bold">{p('cta_title')}</h2>
              <p className="text-primary-foreground/80 text-lg max-w-2xl mx-auto">{p('cta_subtitle')}</p>
              <div className="flex flex-wrap justify-center gap-3 pt-2">
                <a href="mailto:hello@dutyboost.com">
                  <Button size="lg" className="bg-white text-primary hover:bg-white/90 gap-2 px-8">
                    hello@dutyboost.com <ArrowRight className="w-4 h-4" />
                  </Button>
                </a>
                <Link to="/retailer-presentation">
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
      <footer className="py-8 sm:py-10 px-4 sm:px-6 mt-10">
        <div className="max-w-6xl mx-auto space-y-4">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4 text-sm text-muted-foreground">
            <DutyBoostLogo height={100} />
            <div className="text-right">
              <p>© 2026 DutyBoost. All rights reserved.</p>
              <p className="text-xs mt-0.5">Chamber of Commerce (KvK): 42053088</p>
            </div>
          </div>
          <FooterLinks />
        </div>
      </footer>
    </div>
  );
}