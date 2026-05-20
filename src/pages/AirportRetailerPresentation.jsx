import { useState } from 'react';
import { Link } from 'react-router-dom';
import { Download, ChevronRight, TrendingUp, Users, Target, Zap, DollarSign, BarChart3, ArrowRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import DutyBoostLogo from '@/components/DutyBoostLogo';
import AirportRetailerIcon from '@/components/AirportRetailerIcon';
import TravelAgencyIcon from '@/components/TravelAgencyIcon';
import TravelerIcon from '@/components/TravelerIcon';
import FooterLinks from '@/components/FooterLinks';
import { useTranslation } from 'react-i18next';
import LanguageSwitcher from '@/components/LanguageSwitcher';

export default function AirportRetailerPresentation() {
  const [downloading, setDownloading] = useState(false);
  const { t } = useTranslation();
  const p = (key) => t(`presentation.retailer.${key}`);

  const handleDownload = async () => {
    setDownloading(true);
    try {
      const { exportAirportRetailerPptx } = await import('@/utils/exportRetailerPptx');
      await exportAirportRetailerPptx();
    } catch (err) {
      console.error('Failed to download:', err);
    } finally {
      setDownloading(false);
    }
  };

  const tiers = [
    { tier: '🟡 Boarding', basket: '€70–€99', save: '€5–€10', fee: '€1.75–€2.50', net: '€56–€86' },
    { tier: '🔵 Priority', basket: '€100–€199', save: '€10–€30', fee: '€2.50–€5', net: '€83–€169' },
    { tier: '🟢 Lounge', basket: '€200–€299', save: '€30–€60', fee: '€5–€7.50', net: '€150–€234' },
    { tier: '🟣 VIP', basket: '€300+', save: '€60 flat', fee: 'max €25', net: '€215+ net' },
  ];

  return (
    <div className="min-h-screen bg-background font-body">
      {/* Nav */}
      <nav className="sticky top-0 z-50 backdrop-blur border-b border-border bg-background/80">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 h-16 sm:h-20 flex items-center justify-between">
          <DutyBoostLogo height={100} />
          <div className="flex items-center gap-2">
            <Link to="/travel-partner-presentation">
              <Button size="sm" variant="ghost" className="gap-1.5 hidden sm:flex text-muted-foreground">
                {p('nav_partner')}
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
          <div className="absolute top-0 right-0 w-72 h-72 bg-accent/10 rounded-full blur-3xl pointer-events-none" />
          <div className="absolute bottom-0 left-0 w-96 h-96 bg-primary/10 rounded-full blur-3xl pointer-events-none" />
          <div className="relative space-y-6">
            <p className="text-xs font-bold uppercase tracking-widest text-accent">{p('badge')}</p>
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

        {/* Stakeholder icons */}
        <section className="space-y-8">
          <div className="border-l-4 border-accent pl-6">
            <p className="text-xs font-bold uppercase tracking-widest text-accent mb-1">{p('why_label')}</p>
            <h2 className="text-3xl font-heading font-bold">{p('why_title')}</h2>
            <p className="text-muted-foreground mt-2">{p('why_subtitle')}</p>
          </div>

          <div className="grid md:grid-cols-3 gap-6">
            {[
              { Icon: TravelAgencyIcon, bg: 'bg-green-50', iconColor: 'text-green-600', label: p('why_s1_label'), detail: p('why_s1_detail') },
              { Icon: TravelerIcon, bg: 'bg-blue-50', iconColor: 'text-blue-600', label: p('why_s2_label'), detail: p('why_s2_detail') },
              { Icon: AirportRetailerIcon, bg: 'bg-orange-50', iconColor: 'text-orange-600', label: p('why_s3_label'), detail: p('why_s3_detail') },
            ].map(({ Icon, bg, iconColor, label, detail }, i) => (
              <div key={i} className="bg-card border border-border rounded-2xl p-6 space-y-4 hover:shadow-lg transition-shadow">
                <div className={`w-14 h-14 rounded-2xl ${bg} flex items-center justify-center`}>
                  <Icon className={`w-8 h-8 ${iconColor}`} />
                </div>
                <p className="font-heading font-bold text-lg">{label}</p>
                <p className="text-sm text-muted-foreground leading-relaxed">{detail}</p>
              </div>
            ))}
          </div>

          {/* Market stats */}
          <div className="grid md:grid-cols-4 gap-4">
            {[
              { stat: p('why_s1_label').split('—')[0]?.trim() || '4.8B', val: '4.8B', label: p('why_s1_label') },
              { val: '68.8M', label: p('why_s2_label') },
              { val: '1h 10m', label: p('why_s3_label') },
              { val: '€68.2B', label: p('why_s4_label') },
            ].map(({ val, label }, i) => (
              <div key={i} className="bg-card border border-border rounded-2xl p-5 text-center space-y-1 hover:shadow-md transition-shadow">
                <p className="text-3xl font-heading font-bold bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">{val}</p>
                <p className="text-xs text-muted-foreground leading-relaxed">{label}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Conversion Gap */}
        <section className="space-y-8">
          <div className="border-l-4 border-primary pl-6">
            <p className="text-xs font-bold uppercase tracking-widest text-primary mb-1">{p('conv_label')}</p>
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
                <p className="text-sm font-semibold text-foreground">{label}</p>
                <p className="text-xs text-muted-foreground leading-relaxed">{detail}</p>
              </div>
            ))}
          </div>
          <div className="bg-gradient-to-br from-primary/5 to-accent/5 border border-border rounded-2xl p-6 space-y-3">
            <p className="font-heading font-bold text-lg">{p('preact_title')}</p>
            <p className="text-sm text-muted-foreground leading-relaxed">{p('preact_p1')}</p>
            <p className="text-sm text-muted-foreground leading-relaxed">{p('preact_p2')}</p>
          </div>
        </section>

        {/* How it Works */}
        <section className="space-y-8">
          <div className="border-l-4 border-accent pl-6">
            <p className="text-xs font-bold uppercase tracking-widest text-accent mb-1">{p('how_label')}</p>
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
        </section>

        {/* Tier Table */}
        <section className="space-y-8">
          <div className="border-l-4 border-primary pl-6">
            <h2 className="text-3xl font-heading font-bold">{p('tier_table_title')}</h2>
            <p className="text-muted-foreground mt-2">{p('tier_table_subtitle')}</p>
          </div>
          <div className="overflow-hidden rounded-2xl border border-border">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-border bg-muted/50">
                  {[p('tier_col_tier'), p('tier_col_basket'), p('tier_col_save'), p('tier_col_fee'), p('tier_col_net')].map(h => (
                    <th key={h} className="px-5 py-3 text-left text-xs font-semibold text-muted-foreground uppercase tracking-wider">{h}</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {tiers.map(({ tier, basket, save, fee, net }) => (
                  <tr key={tier} className="border-b border-border hover:bg-muted/30 transition-colors">
                    <td className="px-5 py-4 font-semibold">{tier}</td>
                    <td className="px-5 py-4 text-muted-foreground">{basket}</td>
                    <td className="px-5 py-4 font-semibold text-accent">{save}</td>
                    <td className="px-5 py-4 text-muted-foreground">{fee}</td>
                    <td className="px-5 py-4 font-bold text-primary">{net}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <p className="text-xs text-muted-foreground">{p('tier_note')}</p>
        </section>

        {/* Revenue Impact */}
        <section className="space-y-8">
          <div className="border-l-4 border-primary pl-6">
            <p className="text-xs font-bold uppercase tracking-widest text-primary mb-1">{p('what_label')}</p>
            <h2 className="text-3xl font-heading font-bold">{p('what_title')}</h2>
            <p className="text-muted-foreground mt-2">{p('what_subtitle')}</p>
          </div>
          <div className="grid md:grid-cols-3 gap-5">
            {[
              { label: p('metric_conv'), before: '28%', after: '40–50%', icon: Target },
              { label: p('metric_basket'), before: '€20–€28', after: '€100–€140', icon: TrendingUp },
              { label: p('metric_daily'), before: '€2,100', after: '€5,400', icon: BarChart3 },
            ].map(({ label, before, after, icon: Icon }, i) => (
              <div key={i} className="bg-card border border-border rounded-2xl p-6 space-y-4 hover:shadow-lg transition-shadow">
                <div className="flex items-center gap-2">
                  <Icon className="w-5 h-5 text-primary" />
                  <p className="text-xs font-semibold text-muted-foreground uppercase tracking-wider">{label}</p>
                </div>
                <div className="space-y-2 text-sm">
                  <div className="flex justify-between"><span className="text-muted-foreground">{p('without')}</span><span className="font-bold">{before}</span></div>
                  <div className="flex justify-between"><span className="text-foreground font-medium">{p('with_db')}</span><span className="font-bold text-primary">{after}</span></div>
                </div>
              </div>
            ))}
          </div>
          <div className="bg-card border border-border rounded-2xl p-6">
            <p className="font-heading font-bold text-lg mb-4">{p('annual_title')}</p>
            <div className="grid sm:grid-cols-2 gap-3 text-sm">
              {[
                { label: p('annual_baseline'), val: '€2,100/day' },
                { label: p('annual_with'), val: '€5,400/day' },
                { label: p('annual_uplift'), val: '+€3,150/day' },
                { label: p('annual_total'), val: '+€1.1M/year' },
              ].map(({ label, val }) => (
                <div key={label} className="flex justify-between items-center py-2 border-b border-border">
                  <span className="text-muted-foreground">{label}</span>
                  <span className="font-bold text-primary">{val}</span>
                </div>
              ))}
            </div>
            <p className="text-xs text-muted-foreground mt-4">{p('annual_note')}</p>
          </div>
        </section>

        {/* Retailer Advantages */}
        <section className="space-y-8">
          <div className="border-l-4 border-accent pl-6">
            <p className="text-xs font-bold uppercase tracking-widest text-accent mb-1">{p('advantage_label')}</p>
            <h2 className="text-3xl font-heading font-bold">{p('advantage_title')}</h2>
          </div>
          <div className="grid md:grid-cols-2 gap-4">
            {[
              { icon: DollarSign, title: p('b1_title'), desc: p('b1_desc') },
              { icon: Users, title: p('b2_title'), desc: p('b2_desc') },
              { icon: TrendingUp, title: p('b3_title'), desc: p('b3_desc') },
              { icon: Zap, title: p('b4_title'), desc: p('b4_desc') },
              { icon: BarChart3, title: p('b5_title'), desc: p('b5_desc') },
              { icon: ChevronRight, title: p('b6_title'), desc: p('b6_desc') },
              { icon: ChevronRight, title: p('b7_title'), desc: p('b7_desc') },
              { icon: ChevronRight, title: p('b8_title'), desc: p('b8_desc') },
            ].map(({ icon: Icon, title, desc }, i) => (
              <div key={i} className="bg-card border border-border rounded-2xl p-5 space-y-2 hover:shadow-lg transition-shadow">
                <div className="flex items-start gap-3">
                  <div className="w-9 h-9 rounded-xl bg-primary/10 flex items-center justify-center shrink-0">
                    <Icon className="w-4 h-4 text-primary" />
                  </div>
                  <div>
                    <p className="font-semibold text-foreground text-sm">{title}</p>
                    <p className="text-xs text-muted-foreground mt-1 leading-relaxed">{desc}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Market Context */}
        <section className="space-y-8">
          <div className="border-l-4 border-primary pl-6">
            <p className="text-xs font-bold uppercase tracking-widest text-primary mb-1">{p('market_label')}</p>
            <h2 className="text-3xl font-heading font-bold">{p('market_title')}</h2>
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {[
              { val: '+8.8%', label: p('mkt_s1_label') },
              { val: '+10.6%', label: p('mkt_s3_label') },
              { val: '+8.5%', label: p('mkt_s2_label') },
              { val: '62%', label: p('mkt_s4_label') },
            ].map(({ val, label }, i) => (
              <div key={i} className="bg-card border border-border rounded-2xl p-5 text-center space-y-2 hover:shadow-md transition-shadow">
                <p className="text-3xl font-heading font-bold bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">{val}</p>
                <p className="text-xs text-muted-foreground">{label}</p>
              </div>
            ))}
          </div>
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
                <Link to="/travel-partner-presentation">
                  <Button size="lg" variant="outline" className="border-white/40 text-white hover:bg-white/10 gap-2 px-8">
                    {p('cta_partner')} <ArrowRight className="w-4 h-4" />
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