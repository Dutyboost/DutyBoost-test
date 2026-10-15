import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { base44 } from "@/api/base44Client";
import DutyBoostLogo from "../components/DutyBoostLogo";
import { Button } from "@/components/ui/button";
import {
  ArrowRight, Menu, X, Cpu, Building2, Anchor, Network, PlaneTakeoff
} from "lucide-react";
import CruiseShipIcon from "../components/CruiseShipIcon";
import { corporateStrings } from "@/lib/i18nCorporate";
import { getAirportStrings } from "@/lib/i18nAirport";
import { getPortsStrings } from "@/lib/i18nPorts";
import TravelAgencyIcon from "../components/TravelAgencyIcon";
import AirportRetailerIcon from "../components/AirportRetailerIcon";
import TravelerIcon from "../components/TravelerIcon";
import HotelIcon from "../components/HotelIcon";
import CarRentalIcon from "../components/CarRentalIcon";
import LanguageSwitcher from "../components/LanguageSwitcher";
import FooterLinks from "../components/FooterLinks";
import TravellerJourneyOval from "../components/TravellerJourneyOval";

export default function LandingPage() {
  const { t, i18n } = useTranslation();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const navigate = useNavigate();
  const corporateLang = (i18n.language || "en").split("-")[0];
  const corporateOne = (corporateStrings[corporateLang] || corporateStrings.en).onepager;



  const stakeholders = [
    {
      key: 'posPartner',
      icon: Cpu,
      color: "from-violet-400 to-indigo-600",
      bg: "bg-violet-50",
      iconColor: "text-violet-600",
    },
    {
      key: 'retailers',
      icon: AirportRetailerIcon,
      color: "from-orange-400 to-orange-600",
      bg: "bg-orange-50",
      iconColor: "text-orange-600",
    },
    {
      key: 'airports',
      icon: PlaneTakeoff,
      color: "from-cyan-400 to-sky-600",
      bg: "bg-cyan-50",
      iconColor: "text-cyan-600",
    },
    {
      key: 'travelers',
      icon: TravelerIcon,
      color: "from-blue-400 to-blue-600",
      bg: "bg-blue-50",
      iconColor: "text-blue-600",
    },
    {
      key: 'agencies',
      icon: TravelAgencyIcon,
      color: "from-green-400 to-emerald-600",
      bg: "bg-green-50",
      iconColor: "text-green-600",
    },
    {
      key: 'corporate',
      icon: Building2,
      color: "from-slate-500 to-slate-700",
      bg: "bg-slate-50",
      iconColor: "text-slate-700",
    },
    {
      key: 'ports',
      icon: Anchor,
      color: "from-blue-500 to-indigo-700",
      bg: "bg-blue-50",
      iconColor: "text-indigo-600",
    },
    {
      key: 'dutyboost',
      icon: Network,
      color: "from-primary to-accent",
      bg: "bg-primary/5",
      iconColor: "text-primary",
    },
  ];

  return (
    <div className="min-h-screen bg-background font-body">
      {/* Nav */}
      <nav className="sticky top-0 z-50 backdrop-blur border-b border-border bg-background/80">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 h-16 sm:h-20 flex items-center justify-between">
          <span className="sm:hidden"><DutyBoostLogo height={36} /></span>
          <span className="hidden sm:inline-flex"><DutyBoostLogo height={55} /></span>
          <div className="hidden lg:flex items-center gap-2">
            <LanguageSwitcher />
          </div>
          <div className="flex lg:hidden items-center gap-2">
            <LanguageSwitcher />
            <button onClick={() => setMobileMenuOpen(!mobileMenuOpen)} className="p-2 rounded-lg hover:bg-muted transition-colors" aria-label="Menu">
              {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>
        {/* Mobile menu */}
        {mobileMenuOpen && (
          <div className="lg:hidden border-t border-border bg-background/95 backdrop-blur px-4 py-4 flex flex-col gap-3">
            <LanguageSwitcher />
          </div>
        )}
      </nav>

      {/* Hero */}
      <section className="relative overflow-hidden pt-4 pb-2 px-4 sm:px-6">
        <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-background to-accent/5 pointer-events-none" />
        <div className="absolute top-10 right-10 w-72 h-72 bg-primary/10 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute bottom-0 left-0 w-96 h-96 bg-accent/10 rounded-full blur-3xl pointer-events-none" />
        <div className="relative max-w-4xl mx-auto text-center space-y-2.5">
          <h1
            className="text-3xl sm:text-4xl md:text-5xl font-heading font-bold tracking-tight leading-tight"
            style={{
              backgroundImage: "linear-gradient(90deg, hsl(220 30% 12%) 0%, hsl(220 30% 22%) 42%, hsl(220 100% 56%) 62%, hsl(29 100% 50%) 100%)",
              WebkitBackgroundClip: "text",
              backgroundClip: "text",
              color: "transparent",
            }}
          >
            {t('hero.title_1')}
          </h1>
          <p className="text-base sm:text-xl text-muted-foreground leading-snug" dangerouslySetInnerHTML={{ __html: t('hero.subtitle_1') }} />
          <p className="text-base sm:text-xl text-muted-foreground leading-snug" dangerouslySetInnerHTML={{ __html: t('hero.subtitle_2') }} />
          <p className="text-base sm:text-xl text-muted-foreground leading-snug" dangerouslySetInnerHTML={{ __html: t('hero.subtitle_3') }} />
        </div>
      </section>

      {/* Stakeholders */}
      <section id="how-it-works" className="py-2 sm:py-4 px-4 sm:px-6">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-5 space-y-2">
            <h2 className="text-2xl sm:text-3xl font-heading font-bold">{t('ecosystem.title')}</h2>
            <p className="text-sm sm:text-base text-muted-foreground max-w-xl mx-auto">{t('ecosystem.subtitle')}</p>
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4">
            {stakeholders.map((s) => {
              let Icon = s.icon;
              let AdditionalIcons = [];
              let title = t(`stakeholders.${s.key}.title`);
              let description = t(`stakeholders.${s.key}.description`);
              let benefits = [
                t(`stakeholders.${s.key}.b1`),
                t(`stakeholders.${s.key}.b2`),
                t(`stakeholders.${s.key}.b3`),
              ];

              if (s.key === 'airports') {
                const ao = getAirportStrings(i18n.language).showcase;
                title = 'Airports';
                description = ao.subtitle;
                benefits = [
                  ao.why2_title + ' — 15% concession on incremental sales.',
                  ao.why1_title + ' — no capex, no integration.',
                  ao.why3_title + ' — revenue realised above MAG.',
                ];
              }

              if (s.key === 'corporate') {
                title = 'Corporate Travel Partners';
                description = corporateOne.subtitle;
                benefits = [
                  'Earn 20% on every validated airport basket — paid monthly.',
                  'Zero cost, zero risk: you only earn, never pay.',
                  'One snippet activates every business trip — no system change.',
                ];
              }
              
              if (s.key === 'agencies') {
                         AdditionalIcons = [CruiseShipIcon, HotelIcon, CarRentalIcon];
                       }

              if (s.key === 'dutyboost') {
                title = t(`stakeholders.${s.key}.title`);
                description = t(`stakeholders.${s.key}.description`);
                benefits = [
                  t(`stakeholders.${s.key}.b1`),
                  t(`stakeholders.${s.key}.b2`),
                  t(`stakeholders.${s.key}.b3`),
                ];
              }

              if (s.key === 'ports') {
                const po = getPortsStrings(i18n.language).showcase;
                title = 'Sea Ports';
                description = po.subtitle;
                benefits = [
                  po.why2_title + ' — 15% concession on incremental sales.',
                  po.why1_title + ' — no capex, no integration.',
                  po.why3_title + ' — revenue realised above MAG.',
                ];
              }

              const isClickable = s.key === 'agencies' || s.key === 'retailers' || s.key === 'airports' || s.key === 'ports' || s.key === 'travelers' || s.key === 'posPartner' || s.key === 'corporate';
              const cardLink = s.key === 'retailers' ? '/retailer-showcase' : s.key === 'airports' ? '/airport-showcase' : s.key === 'ports' ? '/ports-showcase' : s.key === 'agencies' ? '/get-started?from=agency' : s.key === 'travelers' ? '/eligibility-showcase' : s.key === 'posPartner' ? '/pos-partner' : s.key === 'corporate' ? '/corporate-partner-showcase' : '/get-started';

              const cardContent = (
                <>
                  <div className={`flex items-center gap-2 mb-2`}>
                    <div className={`w-10 h-10 rounded-xl ${s.bg} flex items-center justify-center`}>
                      <Icon className={`w-5 h-5 ${s.iconColor}`} />
                    </div>
                    {AdditionalIcons.map((AdIcon, idx) => (
                      <div key={idx} className={`w-10 h-10 rounded-xl ${s.bg} flex items-center justify-center`}>
                        <AdIcon className={`w-5 h-5 ${s.iconColor}`} />
                      </div>
                    ))}
                  </div>
                  <h3 className="font-heading font-bold text-sm whitespace-nowrap mb-1">{title}</h3>
                  <p className="text-muted-foreground text-xs leading-snug mb-2">{description}</p>
                  <ul className="space-y-1">
                    {benefits.map((b) => (
                      <li key={b} className="flex items-center gap-1.5 text-[11px] leading-snug">
                        <div className={`w-1 h-1 rounded-full bg-gradient-to-r ${s.color} shrink-0`} />
                        {b}
                      </li>
                    ))}
                  </ul>
                </>
              );

              const cardClasses = `bg-card rounded-xl border border-border p-3 sm:p-4 transition-shadow ${isClickable ? 'hover:shadow-lg cursor-pointer' : 'hover:shadow-lg'}`;

              return isClickable ? (
                <Link key={s.key} to={cardLink} className={cardClasses}>
                  {cardContent}
                </Link>
              ) : (
                <div key={s.key} className={cardClasses}>
                  {cardContent}
                </div>
              );
            })}
          </div>
          <p className="text-center text-xs sm:text-sm text-muted-foreground max-w-2xl mx-auto mt-4 leading-relaxed">{t('ecosystem.platform_fee_note')}</p>
        </div>
      </section>

      {/* Traveller Journey Oval */}
      <TravellerJourneyOval />

      {/* CTA */}
      <section className="py-10 sm:py-14 px-4 sm:px-6">
        <div className="max-w-3xl mx-auto text-center">
          <div className="bg-gradient-to-br from-primary via-primary/90 to-primary/70 rounded-3xl p-12 text-primary-foreground shadow-2xl relative overflow-hidden">
            <div className="absolute top-0 right-0 w-64 h-64 bg-white/10 rounded-full -translate-y-1/2 translate-x-1/2 pointer-events-none" />
            <div className="absolute bottom-0 left-0 w-48 h-48 bg-black/10 rounded-full translate-y-1/2 -translate-x-1/2 pointer-events-none" />
            <div className="relative space-y-6">
              <h2 className="text-4xl font-heading font-bold">{t('cta.title')}</h2>
              <p className="text-primary-foreground/80 text-lg sm:text-xl leading-relaxed mx-auto">{t('cta.description')}</p>
              <Link to="/get-started" className="block w-full sm:inline-block sm:w-auto mt-2">
                <Button size="lg" className="bg-white text-primary hover:bg-white/90 gap-2 px-6 sm:px-8 text-base w-full sm:w-auto whitespace-normal h-auto py-3 leading-snug">
                  {t('cta.button')} <ArrowRight className="w-4 h-4 shrink-0" />
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-border py-8 sm:py-10 px-4 sm:px-6">
        <div className="max-w-6xl mx-auto space-y-4">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4 text-sm text-muted-foreground">
            <div>
              <DutyBoostLogo height={55} />
            </div>
            <div className="text-right">
              <p>{t('footer.rights')}</p>
              <p className="text-xs mt-0.5">{t('footer.kvk')}</p>
              <p className="text-xs mt-0.5">{t('footer.vat')}</p>
            </div>
          </div>
          <FooterLinks />
        </div>
      </footer>
    </div>
  );
}