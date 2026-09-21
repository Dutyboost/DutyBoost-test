import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { base44 } from "@/api/base44Client";
import DutyBoostLogo from "../components/DutyBoostLogo";
import { Button } from "@/components/ui/button";
import {
  ArrowRight, Menu, X, Cpu, Building2, Network, PlaneTakeoff, Package
} from "lucide-react";
import { corporateStrings } from "@/lib/i18nCorporate";
import { getAirportStrings } from "@/lib/i18nAirport";
import { getWholesaleStrings } from "@/lib/i18nWholesale";
import TravelAgencyIcon from "../components/TravelAgencyIcon";
import AirportRetailerIcon from "../components/AirportRetailerIcon";
import TravelerIcon from "../components/TravelerIcon";
import HotelIcon from "../components/HotelIcon";
import CarRentalIcon from "../components/CarRentalIcon";
import LanguageSwitcher from "../components/LanguageSwitcher";
import FooterLinks from "../components/FooterLinks";
import TravellerJourneyOval from "../components/TravellerJourneyOval";
import LiveInterfaceSection from "../components/live/LiveInterfaceSection";
import StakeholderEnvironmentCard from "../components/terminal/StakeholderEnvironmentCard";
import { getPerson } from "@/data/roleAvatars";
import { ENVIRONMENTS } from "@/data/stakeholderEnvironments";

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
      key: 'wholesale',
      icon: Package,
      color: "from-amber-400 to-yellow-600",
      bg: "bg-amber-50",
      iconColor: "text-amber-600",
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

      {/* Hero — terminal wayfinding */}
      <section className="relative overflow-hidden bg-terminal-navy">
        <img
          src={ENVIRONMENTS.airports.image}
          alt="Airport departures hall"
          className="absolute inset-0 w-full h-full object-cover opacity-45"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-terminal-navy via-terminal-navy/90 to-terminal-navy/40" />
        <div className="absolute inset-x-0 top-0 h-1 bg-terminal-orange" />
        <div className="relative max-w-6xl mx-auto px-4 sm:px-6 py-10 sm:py-16">
          <h1 className="font-heading font-bold text-3xl sm:text-4xl md:text-5xl text-white tracking-tight leading-tight max-w-4xl">
            {t('hero.title_1')}
          </h1>
          <div className="mt-6 sm:mt-8 max-w-3xl border-l-4 border-terminal-orange bg-terminal-navy/80 backdrop-blur-sm">
            <p className="px-4 py-2.5 text-sm sm:text-base text-white/85 leading-snug border-b border-white/10" dangerouslySetInnerHTML={{ __html: t('hero.subtitle_1') }} />
            <p className="px-4 py-2.5 text-sm sm:text-base text-white/85 leading-snug border-b border-white/10" dangerouslySetInnerHTML={{ __html: t('hero.subtitle_2') }} />
            <p className="px-4 py-2.5 text-sm sm:text-base text-white/85 leading-snug" dangerouslySetInnerHTML={{ __html: t('hero.subtitle_3') }} />
          </div>
        </div>
      </section>

      {/* Live network interface */}
      <LiveInterfaceSection />

      {/* Stakeholders */}
      <section id="how-it-works" className="py-2 sm:py-4 px-4 sm:px-6">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-5 space-y-2">
            <h2 className="text-2xl sm:text-3xl font-heading font-bold text-terminal-navy uppercase tracking-wide">{t('ecosystem.title')}</h2>
            <div className="w-16 h-1 bg-terminal-orange mx-auto" />
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

              if (s.key === 'wholesale') {
                const wo = getWholesaleStrings(i18n.language).showcase;
                title = 'Wholesale / Retail Suppliers';
                description = wo.subtitle;
                benefits = [
                  wo.why1_title + ' — no new listing required.',
                  wo.why2_title + ' — products move, not sit.',
                  wo.why3_title + ' — incremental volume at no cost.',
                ];
              }

              if (s.key === 'corporate') {
                title = 'Corporate Partners';
                description = corporateOne.subtitle;
                benefits = [
                  'Earn 0.5% on every validated airport basket — paid monthly.',
                  'Zero cost, zero risk: you only earn, never pay.',
                  'One snippet activates every business trip — no system change.',
                ];
              }
              
              if (s.key === 'agencies') {
                         AdditionalIcons = [HotelIcon, CarRentalIcon];
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

              const isClickable = s.key === 'agencies' || s.key === 'retailers' || s.key === 'airports' || s.key === 'wholesale' || s.key === 'travelers' || s.key === 'posPartner' || s.key === 'corporate';
              const cardLink = s.key === 'retailers' ? '/retailer-showcase' : s.key === 'airports' ? '/airport-showcase' : s.key === 'wholesale' ? '/wholesale-showcase' : s.key === 'agencies' ? '/get-started?from=agency' : s.key === 'travelers' ? '/eligibility-showcase' : s.key === 'posPartner' ? '/pos-partner' : s.key === 'corporate' ? '/corporate-partner-showcase' : '/get-started';
              const person = getPerson(s.key);

              return (
                <StakeholderEnvironmentCard
                  key={s.key}
                  envKey={s.key}
                  Icon={Icon}
                  AdditionalIcons={AdditionalIcons}
                  title={title}
                  person={person}
                  description={description}
                  benefits={benefits}
                  link={isClickable ? cardLink : null}
                />
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
          <div className="relative overflow-hidden rounded-sm bg-terminal-navy border-t-4 border-terminal-orange px-6 sm:px-12 py-10 text-center shadow-2xl">
            <img
              src={ENVIRONMENTS.airports.image}
              alt=""
              className="absolute inset-0 w-full h-full object-cover opacity-20"
            />
            <div className="relative space-y-5">
              <h2 className="text-3xl sm:text-4xl font-heading font-bold text-white uppercase tracking-wide">{t('cta.title')}</h2>
              <p className="text-white/75 text-base sm:text-lg leading-relaxed mx-auto max-w-xl">{t('cta.description')}</p>
              <Link to="/get-started" className="block w-full sm:inline-block sm:w-auto mt-2">
                <Button size="lg" className="bg-terminal-orange text-white hover:bg-terminal-orange/90 gap-2 px-6 sm:px-8 text-base w-full sm:w-auto whitespace-normal h-auto py-3 leading-snug">
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