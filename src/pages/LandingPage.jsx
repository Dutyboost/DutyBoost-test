import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { base44 } from "@/api/base44Client";
import { useTranslation } from "react-i18next";
import DutyBoostLogo from "../components/DutyBoostLogo";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  Zap, BarChart3, QrCode, TrendingUp,
  ShieldCheck, Globe2, ArrowRight, Eye, Menu, X
} from "lucide-react";
import TravelAgencyIcon from "../components/TravelAgencyIcon";
import AirportRetailerIcon from "../components/AirportRetailerIcon";
import TravelerIcon from "../components/TravelerIcon";
import HotelIcon from "../components/HotelIcon";
import CarRentalIcon from "../components/CarRentalIcon";
import WeCallYouModal from "../components/WeCallYouModal";
import LanguageSwitcher from "../components/LanguageSwitcher";
import FooterLinks from "../components/FooterLinks";

const featureIcons = [Zap, QrCode, BarChart3, ShieldCheck, Globe2, TrendingUp];

export default function LandingPage() {
  const { t } = useTranslation();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [authedUser, setAuthedUser] = useState(null);
  const [contactModalOpen, setContactModalOpen] = useState(false);

  useEffect(() => {
    base44.auth.isAuthenticated().then(async (authed) => {
      if (authed) {
        try {
          const me = await base44.auth.me();
          setAuthedUser(me);
        } catch {
          // not authenticated
        }
      }
    });
    const params = new URLSearchParams(window.location.search);
    if (params.get('contact') === '1') {
      setContactModalOpen(true);
    }
  }, []);

  const stakeholders = [
    {
      key: 'agencies',
      icon: TravelAgencyIcon,
      color: "from-green-400 to-emerald-600",
      bg: "bg-green-50",
      iconColor: "text-green-600",
    },
    {
      key: 'travelers',
      icon: TravelerIcon,
      color: "from-blue-400 to-blue-600",
      bg: "bg-blue-50",
      iconColor: "text-blue-600",
    },
    {
      key: 'retailers',
      icon: AirportRetailerIcon,
      color: "from-orange-400 to-orange-600",
      bg: "bg-orange-50",
      iconColor: "text-orange-600",
    },
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
          <DutyBoostLogo height={150} />
          <div className="hidden lg:flex items-center gap-2">
            <Link to="/get-started">
              <Button size="sm" variant="outline" className="gap-1.5 text-green-600 border-green-600 hover:text-green-700 hover:bg-green-50">
                {t('nav.for_agencies')}
              </Button>
            </Link>

            <Link to="/get-started">
              <Button size="sm" variant="outline" className="gap-1.5 text-orange-600 border-orange-600 hover:text-orange-700 hover:bg-orange-50">
                Airport Retail Partners
              </Button>
            </Link>
            <Link to="/retailer-calculator">
              <Button variant="outline" size="sm" className="gap-1.5 text-blue-600 border-blue-600 hover:text-blue-700 hover:bg-blue-50">
                <BarChart3 className="w-3.5 h-3.5" /> ROI Calculator
              </Button>
            </Link>
            <WeCallYouModal trigger={(setOpen) => (
              <Button size="sm" variant="outline" className="gap-1.5 text-purple-600 border-purple-600 hover:text-purple-700 hover:bg-purple-50" onClick={() => setOpen(true)}>
                {t('nav.we_call_you')}
              </Button>
            )} />
            {authedUser ? (
              <Link to="/dashboard"><Button size="sm" className="gap-1.5">Dashboard</Button></Link>
            ) : (
              <Button size="sm" className="gap-1.5" onClick={() => base44.auth.redirectToLogin('/dashboard')}>Sign In</Button>
            )}
            <LanguageSwitcher />
          </div>
          <div className="flex lg:hidden items-center gap-2">
            <LanguageSwitcher />
            <button onClick={() => setMobileMenuOpen(!mobileMenuOpen)} className="p-2 rounded-lg hover:bg-muted transition-colors">
              {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>
        {/* Mobile menu */}
        {mobileMenuOpen && (
          <div className="lg:hidden border-t border-border bg-background/95 backdrop-blur px-4 py-4 flex flex-col gap-3">
            <Link to="/get-started" onClick={() => setMobileMenuOpen(false)}>
              <Button size="sm" variant="outline" className="w-full gap-1.5 text-green-600 border-green-600 hover:text-green-700 hover:bg-green-50">
                {t('nav.for_agencies')}
              </Button>
            </Link>

            <Link to="/get-started" onClick={() => setMobileMenuOpen(false)}>
              <Button size="sm" variant="outline" className="w-full gap-1.5 text-orange-600 border-orange-600 hover:text-orange-700 hover:bg-orange-50">
                Airport Retail Partners
              </Button>
            </Link>
            <WeCallYouModal trigger={(setOpen) => (
              <Button size="sm" variant="outline" className="w-full gap-1.5 text-purple-600 border-purple-600 hover:text-purple-700 hover:bg-purple-50" onClick={() => setOpen(true)}>
                {t('nav.we_call_you')}
              </Button>
            )} />
            <Link to="/retailer-calculator" onClick={() => setMobileMenuOpen(false)}>
              <Button variant="outline" size="sm" className="w-full gap-1.5 text-blue-600 border-blue-600 hover:text-blue-700 hover:bg-blue-50">
                <BarChart3 className="w-3.5 h-3.5" /> ROI Calculator
              </Button>
            </Link>
            <Link to="/demo" onClick={() => setMobileMenuOpen(false)}>
              <Button variant="outline" size="sm" className="w-full gap-1.5 text-emerald-800 border-emerald-800 hover:text-emerald-900 hover:bg-emerald-50">
                <Eye className="w-3.5 h-3.5" /> Live Demo
              </Button>
            </Link>
            {authedUser ? (
              <Link to="/dashboard" onClick={() => setMobileMenuOpen(false)}><Button size="sm" className="w-full gap-1.5">Dashboard</Button></Link>
            ) : (
              <Button size="sm" className="w-full gap-1.5" onClick={() => base44.auth.redirectToLogin('/dashboard')}>Sign In</Button>
            )}
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
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto leading-relaxed" dangerouslySetInnerHTML={{ __html: t('hero.subtitle') }} />
        </div>
      </section>

      {/* Stakeholders */}
      <section id="how-it-works" className="py-10 sm:py-14 px-4 sm:px-6">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-10 space-y-4">
            <h2 className="text-4xl font-heading font-bold">{t('ecosystem.title')}</h2>
            <p className="text-muted-foreground max-w-xl mx-auto">{t('ecosystem.subtitle')}</p>
          </div>
          <div className="grid md:grid-cols-3 gap-8">
            {stakeholders.map((s) => {
              let Icon = s.icon;
              let AdditionalIcons = [];
              let title, description, benefits;
              
              if (s.key === 'agencies') {
                 title = 'Travel Partners';
                 description = t('stakeholders.agencies.description');
                 benefits = [
                   t('stakeholders.agencies.b1'),
                   t('stakeholders.agencies.b2'),
                   t('stakeholders.agencies.b3'),
                 ];
               } else {
                benefits = [
                  t(`stakeholders.${s.key}.b1`),
                  t(`stakeholders.${s.key}.b2`),
                  t(`stakeholders.${s.key}.b3`),
                ];
                title = s.key === 'travelers' ? t('nav.for_travelers') : 'Airport Retail Partners';
                description = t(`stakeholders.${s.key}.description`);
              }
              
              if (s.key === 'agencies') {
                AdditionalIcons = [HotelIcon, CarRentalIcon];
              }

              return (
                <div key={s.key} className="bg-card rounded-2xl border border-border p-8 hover:shadow-lg transition-shadow">
                  <div className={`flex items-center gap-3 mb-5`}>
                    <div className={`w-24 h-24 rounded-2xl ${s.bg} flex items-center justify-center`}>
                      <Icon className={`w-12 h-12 ${s.iconColor}`} />
                    </div>
                    {AdditionalIcons.map((AdIcon, idx) => (
                      <div key={idx} className={`w-24 h-24 rounded-2xl ${s.bg} flex items-center justify-center`}>
                        <AdIcon className={`w-12 h-12 ${s.iconColor}`} />
                      </div>
                    ))}
                  </div>
                  <h3 className="font-heading font-bold text-xl mb-3">{title}</h3>
                  <p className="text-muted-foreground text-sm leading-relaxed mb-5">{description}</p>
                  <ul className="space-y-2">
                    {benefits.map((b) => (
                      <li key={b} className="flex items-center gap-2 text-sm">
                        <div className={`w-1.5 h-1.5 rounded-full bg-gradient-to-r ${s.color} shrink-0`} />
                        {b}
                      </li>
                    ))}
                  </ul>
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
              <h2 className="text-4xl font-heading font-bold">{t('cta.title')}</h2>
              <p className="text-primary-foreground/80 text-lg max-w-xl mx-auto">{t('cta.description')}</p>
              <Link to="/get-started">
                <Button size="lg" className="bg-white text-primary hover:bg-white/90 gap-2 px-8 text-base mt-2">
                  {t('cta.button')} <ArrowRight className="w-4 h-4" />
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Auto-open contact modal from ?contact=1 */}
      <WeCallYouModal
        open={contactModalOpen}
        onOpenChange={setContactModalOpen}
        trigger={null}
      />

      {/* Footer */}
      <footer className="border-t border-border py-8 sm:py-10 px-4 sm:px-6">
        <div className="max-w-6xl mx-auto space-y-4">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4 text-sm text-muted-foreground">
            <div className="flex flex-col items-center md:items-start gap-0.5">
              <DutyBoostLogo height={150} />
              <span className="text-xs">DutyBoost is a Borderless Solutions B.V. product</span>
            </div>
            <p>{t('footer.rights')}</p>
          </div>
          <FooterLinks />
        </div>
      </footer>
    </div>
  );
}