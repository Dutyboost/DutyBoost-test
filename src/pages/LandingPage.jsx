import { useState } from "react";
import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";
import DutyBoostLogo from "../components/DutyBoostLogo";
import { ChevronDown } from "lucide-react";
import { base44 } from "@/api/base44Client";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  Zap, BarChart3, QrCode, TrendingUp,
  ShieldCheck, Globe2, ChevronRight, Star, ArrowRight, MapPin, Eye, Menu, X, Ticket
} from "lucide-react";
import TravelAgencyIcon from "../components/TravelAgencyIcon";
import AirportRetailerIcon from "../components/AirportRetailerIcon";
import TravelerIcon from "../components/TravelerIcon";
import WeCallYouModal from "../components/WeCallYouModal";
import LanguageSwitcher from "../components/LanguageSwitcher";
import FooterLinks from "../components/FooterLinks";

const featureIcons = [Zap, QrCode, BarChart3, ShieldCheck, Globe2, TrendingUp];

export default function LandingPage() {
  const { t } = useTranslation();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

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
      <nav className="sticky top-0 z-50 backdrop-blur border-b border-border bg-background/80">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 h-16 sm:h-20 flex items-center justify-between">
          <Link to="/" className="hover:opacity-80 transition-opacity">
            <DutyBoostLogo height={150} />
          </Link>
          {/* Desktop nav */}
          <div className="hidden lg:flex items-center gap-2">
            <LanguageSwitcher />
            <Link to="/agency-portal">
              <Button size="sm" variant="outline" className="text-green-600 border-green-600 hover:text-green-700 hover:bg-green-50">
                {t('nav.for_agencies')}
              </Button>
            </Link>
            <Link to="/traveler-portal">
              <Button size="sm" variant="outline" className="text-blue-600 border-blue-600 hover:text-blue-700 hover:bg-blue-50">
                {t('nav.for_travelers')}
              </Button>
            </Link>
            <Link to="/retailer-portal">
              <Button size="sm" variant="outline" className="text-orange-600 border-orange-600 hover:text-orange-700 hover:bg-orange-50">
                {t('nav.for_retailers')}
              </Button>
            </Link>
            <WeCallYouModal trigger={(setOpen) => (
              <Button size="sm" variant="outline" className="text-purple-600 border-purple-600 hover:text-purple-700 hover:bg-purple-50" onClick={() => setOpen(true)}>
                {t('nav.we_call_you')}
              </Button>
            )} />
            <Link to="/demo">
              <Button variant="outline" size="sm" className="gap-1.5 text-emerald-800 border-emerald-800 hover:text-emerald-900 hover:bg-emerald-50">
                <Eye className="w-3.5 h-3.5" /> {t('nav.live_demo')}
              </Button>
            </Link>
          </div>
          {/* Mobile nav toggle */}
          <div className="flex lg:hidden items-center gap-2">
            <LanguageSwitcher />
            <button onClick={() => setMobileMenuOpen(!mobileMenuOpen)} className="p-2 rounded-lg hover:bg-muted transition-colors">
              {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>
        {/* Mobile menu */}
        {mobileMenuOpen && (
          <div className="lg:hidden border-t border-border bg-background px-4 py-4 flex flex-col gap-2">
            <Link to="/agency-portal" onClick={() => setMobileMenuOpen(false)}>
             <Button size="sm" variant="outline" className="w-full text-green-600 border-green-600 hover:text-green-700 hover:bg-green-50">
               {t('nav.for_agencies')}
             </Button>
            </Link>
            <Link to="/traveler-portal" onClick={() => setMobileMenuOpen(false)}>
             <Button size="sm" variant="outline" className="w-full text-blue-600 border-blue-600 hover:text-blue-700 hover:bg-blue-50">
               {t('nav.for_travelers')}
             </Button>
            </Link>
            <Link to="/retailer-portal" onClick={() => setMobileMenuOpen(false)}>
              <Button size="sm" variant="outline" className="w-full text-orange-600 border-orange-600 hover:text-orange-700 hover:bg-orange-50">
                {t('nav.for_retailers')}
              </Button>
            </Link>
            <WeCallYouModal trigger={(setOpen) => (
             <Button size="sm" variant="outline" className="w-full text-purple-600 border-purple-600 hover:text-purple-700 hover:bg-purple-50" onClick={() => { setOpen(true); setMobileMenuOpen(false); }}>
                {t('nav.we_call_you')}
              </Button>
            )} />
            <Link to="/demo" onClick={() => setMobileMenuOpen(false)}>
             <Button variant="outline" size="sm" className="w-full gap-1.5 text-emerald-800 border-emerald-800 hover:text-emerald-900 hover:bg-emerald-50">
               <Eye className="w-3.5 h-3.5" /> {t('nav.live_demo')}
             </Button>
            </Link>
          </div>
        )}
      </nav>

      {/* Hero */}
      <section className="relative overflow-hidden pt-10 pb-12 px-4 sm:px-6">
        <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-background to-accent/5 pointer-events-none" />
        <div className="absolute top-10 right-10 w-72 h-72 bg-primary/10 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute bottom-0 left-0 w-96 h-96 bg-accent/10 rounded-full blur-3xl pointer-events-none" />

        <div className="relative max-w-4xl mx-auto text-center space-y-8">
          <h1 className="text-4xl sm:text-5xl md:text-7xl font-heading font-bold tracking-tight leading-tight">
            {t('hero.title_1')}{" "}
            <span className="bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
              {t('hero.title_2')}
            </span>
          </h1>

          {/* render subtitle with inline HTML for bold word */}
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto leading-relaxed" dangerouslySetInnerHTML={{ __html: t('hero.subtitle') }} />
        </div>
      </section>

      {/* Stakeholders */}
      <section id="how-it-works" className="py-10 sm:py-14 px-4 sm:px-6">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-10 space-y-4">
            <h2 className="text-4xl font-heading font-bold">See How The Ecosystem Works</h2>
            <p className="text-muted-foreground max-w-xl mx-auto">{t('ecosystem.subtitle')}</p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {[stakeholders[2], stakeholders[0], stakeholders[1]].map((s) => {
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
      <section className="py-10 sm:py-12 px-4 sm:px-6 bg-card/30 border-y border-border">
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
      <section className="py-10 sm:py-14 px-4 sm:px-6">
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
      <section className="py-10 sm:py-14 px-4 sm:px-6">
        <div className="max-w-3xl mx-auto text-center">
          <div className="bg-gradient-to-br from-primary via-primary/90 to-primary/70 rounded-3xl p-12 text-primary-foreground shadow-2xl relative overflow-hidden">
            <div className="absolute top-0 right-0 w-64 h-64 bg-white/10 rounded-full -translate-y-1/2 translate-x-1/2 pointer-events-none" />
            <div className="absolute bottom-0 left-0 w-48 h-48 bg-black/10 rounded-full translate-y-1/2 -translate-x-1/2 pointer-events-none" />
            <div className="relative space-y-6">
              <Badge className="bg-white/20 text-white border-white/30 text-sm px-4 py-1">{t('cta.badge')}</Badge>
              <h2 className="text-4xl font-heading font-bold">{t('cta.title')}</h2>
              <p className="text-primary-foreground/80 text-lg max-w-xl mx-auto" dangerouslySetInnerHTML={{ __html: t('cta.subtitle') }} />
              <Button size="lg" className="bg-white text-primary hover:bg-white/90 gap-2 px-8 text-base mt-2" onClick={() => window.location.href = '/get-started'}>
                {t('cta.button')} <ArrowRight className="w-4 h-4" />
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-border py-8 sm:py-10 px-4 sm:px-6">
        <div className="max-w-6xl mx-auto space-y-4">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4 text-sm text-muted-foreground">
            <div className="flex items-center gap-2">
              <DutyBoostLogo height={150} />
              <span>{t('footer.tagline')}</span>
            </div>
            <p>{t('footer.rights')}</p>
          </div>
          <FooterLinks />
        </div>
      </footer>
    </div>
  );
}