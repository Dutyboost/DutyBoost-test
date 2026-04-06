import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";
import DutyBoostLogo from "../components/DutyBoostLogo";
import { base44 } from "@/api/base44Client";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  Zap, BarChart3, QrCode, TrendingUp,
  ShieldCheck, Globe2, ChevronRight, Star, ArrowRight, MapPin, Eye
} from "lucide-react";
import TravelAgencyIcon from "../components/TravelAgencyIcon";
import AirportRetailerIcon from "../components/AirportRetailerIcon";
import TravelerIcon from "../components/TravelerIcon";
import WeCallYouModal from "../components/WeCallYouModal";
import LanguageSwitcher from "../components/LanguageSwitcher";

const featureIcons = [Zap, QrCode, BarChart3, ShieldCheck, Globe2, TrendingUp];

export default function LandingPage() {
  const { t } = useTranslation();

  const stakeholders = [
    {
      key: 'travelers',
      icon: TravelerIcon,
      color: "from-blue-400 to-blue-600",
      bg: "bg-blue-50",
      iconColor: "text-blue-600",
      mapLink: true,
    },
    {
      key: 'retailers',
      icon: AirportRetailerIcon,
      color: "from-orange-400 to-orange-600",
      bg: "bg-orange-50",
      iconColor: "text-orange-600",
    },
    {
      key: 'agencies',
      icon: TravelAgencyIcon,
      color: "from-green-400 to-emerald-600",
      bg: "bg-green-50",
      iconColor: "text-green-600",
    },
  ];

  const flowSteps = [
    { num: '01', titleKey: 'flow.step1_title', descKey: 'flow.step1_desc' },
    { num: '02', titleKey: 'flow.step2_title', descKey: 'flow.step2_desc' },
    { num: '03', titleKey: 'flow.step3_title', descKey: 'flow.step3_desc' },
    { num: '04', titleKey: 'flow.step4_title', descKey: 'flow.step4_desc' },
  ];

  const featureKeys = [
    { titleKey: 'features.f1_title', descKey: 'features.f1_desc' },
    { titleKey: 'features.f2_title', descKey: 'features.f2_desc' },
    { titleKey: 'features.f3_title', descKey: 'features.f3_desc' },
    { titleKey: 'features.f4_title', descKey: 'features.f4_desc' },
    { titleKey: 'features.f5_title', descKey: 'features.f5_desc' },
    { titleKey: 'features.f6_title', descKey: 'features.f6_desc' },
  ];

  return (
    <div className="min-h-screen bg-background font-body">
      {/* Nav */}
      <nav className="sticky top-0 z-50 backdrop-blur border-b border-border">
        <div className="max-w-6xl mx-auto px-6 h-24 flex items-center justify-between">
          <DutyBoostLogo height={130} />
          <div className="flex items-center gap-3">
            <LanguageSwitcher />
            <Button size="sm" onClick={() => base44.auth.redirectToLogin('/dashboard')}>{t('nav.sign_in')}</Button>
            <Link to="/get-started">
              <Button size="sm" className="gap-1">
                {t('nav.get_started')} <ChevronRight className="w-3 h-3" />
              </Button>
            </Link>
            <WeCallYouModal trigger={(setOpen) => (
              <Button size="sm" variant="outline" className="text-accent border-accent hover:text-accent hover:bg-accent/5" onClick={() => setOpen(true)}>
                {t('nav.we_call_you')}
              </Button>
            )} />
            <Link to="/demo">
              <Button variant="outline" size="sm" className="gap-1.5 text-accent border-accent hover:text-accent hover:bg-accent/5">
                <Eye className="w-3.5 h-3.5" /> {t('nav.live_demo')}
              </Button>
            </Link>
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
            <Star className="w-3 h-3 mr-1.5 inline" />
            {t('hero.badge')}
          </Badge>

          <h1 className="text-5xl md:text-7xl font-heading font-bold tracking-tight leading-tight">
            {t('hero.title_1')}{" "}
            <span className="bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
              {t('hero.title_2')}
            </span>
          </h1>

          {/* render subtitle with inline HTML for bold word */}
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto leading-relaxed" dangerouslySetInnerHTML={{ __html: t('hero.subtitle') }} />

          <div className="flex flex-col sm:flex-row gap-4 justify-center pt-2">
            <Button size="lg" className="gap-2 px-8 text-base" onClick={() => window.location.href = '/get-started'}>
              {t('hero.launch')} <ArrowRight className="w-4 h-4" />
            </Button>
            <a href="#how-it-works">
              <Button size="lg" variant="outline" className="px-8 text-base">
                {t('hero.how_it_works')}
              </Button>
            </a>
          </div>
        </div>
      </section>

      {/* Stakeholders */}
      <section id="how-it-works" className="py-14 px-6">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-10 space-y-4">
            <Badge variant="outline" className="text-xs tracking-widest uppercase px-4 py-1">{t('ecosystem.badge')}</Badge>
            <h2 className="text-4xl font-heading font-bold">{t('ecosystem.title')}</h2>
            <p className="text-muted-foreground max-w-xl mx-auto">{t('ecosystem.subtitle')}</p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {stakeholders.map((s) => {
              const Icon = s.icon;
              const benefits = [
                t(`stakeholders.${s.key}.b1`),
                t(`stakeholders.${s.key}.b2`),
                t(`stakeholders.${s.key}.b3`),
              ];
              return (
                <div key={s.key} className="bg-card rounded-2xl border border-border p-8 hover:shadow-lg transition-shadow">
                  <div className={`w-24 h-24 rounded-2xl ${s.bg} flex items-center justify-center mb-5`}>
                    <Icon className={`w-24 h-24 ${s.iconColor}`} />
                  </div>
                  <h3 className="font-heading font-bold text-xl mb-3">{t(`stakeholders.${s.key}.title`)}</h3>
                  <p className="text-muted-foreground text-sm leading-relaxed mb-5">{t(`stakeholders.${s.key}.description`)}</p>
                  <ul className="space-y-2">
                    {benefits.map((b) => (
                      <li key={b} className="flex items-center gap-2 text-sm">
                        <div className={`w-1.5 h-1.5 rounded-full bg-gradient-to-r ${s.color} shrink-0`} />
                        {b}
                      </li>
                    ))}
                  </ul>
                  {s.mapLink && (
                    <Link to="/airport-map" className="mt-4 inline-flex items-center gap-1.5 text-xs font-medium text-sky-600 hover:text-sky-700 transition-colors">
                      <MapPin className="w-3.5 h-3.5" /> {t('stakeholders.travelers.map_link')}
                    </Link>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* How it works flow */}
      <section className="py-12 px-6 bg-card/30 border-y border-border">
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-10 space-y-3">
            <Badge variant="outline" className="text-xs tracking-widest uppercase px-4 py-1">{t('flow.badge')}</Badge>
            <h2 className="text-4xl font-heading font-bold">{t('flow.title')}</h2>
          </div>
          <div className="grid md:grid-cols-4 gap-6">
            {flowSteps.map((item) => (
              <div key={item.num} className="bg-card rounded-2xl border border-border p-6 h-full">
                <p className="text-4xl font-heading font-bold text-primary/20 mb-3">{item.num}</p>
                <h4 className="font-heading font-semibold mb-2">{t(item.titleKey)}</h4>
                <p className="text-sm text-muted-foreground leading-relaxed">{t(item.descKey)}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Features */}
      <section className="py-14 px-6">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-10 space-y-4">
            <Badge variant="outline" className="text-xs tracking-widest uppercase px-4 py-1">{t('features.badge')}</Badge>
            <h2 className="text-4xl font-heading font-bold">{t('features.title')}</h2>
            <p className="text-muted-foreground max-w-xl mx-auto">{t('features.subtitle')}</p>
          </div>
          <div className="grid md:grid-cols-3 gap-6">
            {featureKeys.map((f, i) => {
              const Icon = featureIcons[i];
              return (
                <div key={f.titleKey} className="group p-6 rounded-2xl border border-border bg-card hover:border-primary/30 hover:shadow-md transition-all">
                  <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center mb-4 group-hover:bg-primary/20 transition-colors">
                    <Icon className="w-5 h-5 text-primary" />
                  </div>
                  <h4 className="font-heading font-semibold mb-2">{t(f.titleKey)}</h4>
                  <p className="text-sm text-muted-foreground leading-relaxed">{t(f.descKey)}</p>
                </div>
              );
            })}
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
              <Badge className="bg-white/20 text-white border-white/30 text-sm px-4 py-1">{t('cta.badge')}</Badge>
              <h2 className="text-4xl font-heading font-bold">{t('cta.title')}</h2>
              <p className="text-primary-foreground/80 text-lg max-w-xl mx-auto">{t('cta.subtitle')}</p>
              <Button size="lg" className="bg-white text-primary hover:bg-white/90 gap-2 px-8 text-base mt-2" onClick={() => window.location.href = '/get-started'}>
                {t('cta.button')} <ArrowRight className="w-4 h-4" />
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-border py-10 px-6">
        <div className="max-w-6xl mx-auto space-y-4">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4 text-sm text-muted-foreground">
            <div className="flex items-center gap-2">
              <DutyBoostLogo height={130} />
              <span>{t('footer.tagline')}</span>
            </div>
            <p>{t('footer.rights')}</p>
          </div>
          <div className="flex flex-wrap justify-center md:justify-start gap-x-5 gap-y-2 text-xs text-muted-foreground border-t border-border pt-4">
            <Link to="/privacy" className="hover:text-primary transition-colors">Privacy Policy</Link>
            <Link to="/terms" className="hover:text-primary transition-colors">Terms of Service</Link>
            <Link to="/dpa" className="hover:text-primary transition-colors">Data Processing Agreement</Link>
            <Link to="/refunds" className="hover:text-primary transition-colors">Refund Policy</Link>
            <Link to="/code-of-conduct" className="hover:text-primary transition-colors">Code of Conduct</Link>
            <Link to="/cookies" className="hover:text-primary transition-colors">Cookie Policy</Link>
            <Link to="/faq" className="hover:text-primary transition-colors">FAQ</Link>
            <Link to="/user-guide" className="hover:text-primary transition-colors">User Guide</Link>
            <Link to="/airport-map" className="hover:text-primary transition-colors">Airport Map</Link>
          </div>
        </div>
      </footer>
    </div>
  );
}