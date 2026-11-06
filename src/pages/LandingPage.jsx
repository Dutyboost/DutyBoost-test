import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { base44 } from "@/api/base44Client";
import DutyBoostLogo from "../components/DutyBoostLogo";
import { Button } from "@/components/ui/button";
import {
  ArrowRight, Menu, X, Anchor, PlaneTakeoff, Route, Store
} from "lucide-react";
import CruiseShipIcon from "../components/CruiseShipIcon";
import TravelAgencyIcon from "../components/TravelAgencyIcon";
import HotelIcon from "../components/HotelIcon";
import CarRentalIcon from "../components/CarRentalIcon";
import TrainIcon from "../components/TrainIcon";
import TrainOnTrackIcon from "../components/TrainOnTrackIcon";
import CoachOnRoadIcon from "../components/CoachOnRoadIcon";
import { getEcosystemCardsStrings } from "@/lib/i18nEcosystemCards";
import LanguageSwitcher from "../components/LanguageSwitcher";
import FooterLinks from "../components/FooterLinks";
import PageBackdrop from "../components/PageBackdrop";

export default function LandingPage() {
  const { t, i18n } = useTranslation();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const navigate = useNavigate();
  const eco = getEcosystemCardsStrings(i18n.language);



  // Traveller-first order: demand, then revenue locations, then the enabler.
  const stakeholders = [
    {
      key: 'agencies',
      icon: TravelAgencyIcon,
      color: "from-green-400 to-emerald-600",
      bg: "bg-green-50",
      iconColor: "text-green-600",
    },
    {
      key: 'retailers',
      icon: null,
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
  ];

  return (
    <div className="min-h-screen font-body relative">
      {/* Page background — same blue / orange light as the hero */}
      <PageBackdrop />

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
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-3 sm:gap-4">
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

              if (s.key === 'retailers') {
                AdditionalIcons = [PlaneTakeoff, CruiseShipIcon, Route, TrainIcon, Store];
                title = eco.retailers.title;
                description = eco.retailers.description;
                benefits = [eco.retailers.b1, eco.retailers.b2, eco.retailers.b3];
              }

              if (s.key === 'airports') {
                AdditionalIcons = [Anchor, TrainOnTrackIcon];
                title = eco.airports.title;
                description = eco.airports.description;
                benefits = [eco.airports.b1, eco.airports.b2, eco.airports.b3];
              }

              if (s.key === 'agencies') {
                AdditionalIcons = [CruiseShipIcon, TrainIcon, HotelIcon, CarRentalIcon, CoachOnRoadIcon];
              }

              // Cards with many icons get a slightly smaller tile so the row stays on one line.
              // The six-icon card keeps smaller tiles at every breakpoint so the row stays inside the card.
              const manyIcons = s.key === 'agencies';
              const tileClass = `rounded-lg ${s.bg} flex items-center justify-center shrink-0 ${manyIcons ? 'w-10 h-10 xl:w-9 xl:h-9' : 'w-12 h-12 xl:w-10 xl:h-10'}`;
              const glyphClass = `${s.iconColor} ${manyIcons ? 'w-5 h-5 xl:w-[1.125rem] xl:h-[1.125rem]' : 'w-[1.625rem] h-[1.625rem] xl:w-5 xl:h-5'}`;

              const isClickable = true;
              const cardLink = s.key === 'retailers' ? '/travel-retailers' : s.key === 'airports' ? '/travel-hubs-showcase' : '/travel-partner-showcase';

              const cardContent = (
                <>
                  <div className="flex flex-wrap items-center gap-1 sm:gap-1.5 mb-2">
                    {Icon && (
                      <div className={tileClass}>
                        <Icon className={glyphClass} />
                      </div>
                    )}
                    {AdditionalIcons.map((AdIcon, idx) => (
                      <div key={idx} className={tileClass}>
                        <AdIcon className={glyphClass} />
                      </div>
                    ))}
                  </div>
                  <h3 className="font-heading font-bold text-sm leading-tight mb-1">{title}</h3>
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
      <footer className="py-8 sm:py-10 px-4 sm:px-6">
        <div className="max-w-6xl mx-auto space-y-4">
          <div className="flex flex-col lg:flex-row items-center justify-between gap-4 text-sm text-muted-foreground">
            <div>
              <DutyBoostLogo height={55} />
            </div>
            <div className="text-center lg:text-right">
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