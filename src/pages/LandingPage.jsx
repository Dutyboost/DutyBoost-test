import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { base44 } from "@/api/base44Client";
import DutyBoostLogo from "../components/DutyBoostLogo";
import { Button } from "@/components/ui/button";
import {
  Calculator, ArrowRight, Menu, X, Cpu, Building2, Network, Plane, Package
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
      icon: Plane,
      color: "from-violet-400 to-indigo-600",
      bg: "bg-violet-50",
      iconColor: "text-violet-600",
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
      color: "from-emerald-400 to-green-600",
      bg: "bg-emerald-50",
      iconColor: "text-emerald-600",
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
            <Link to="/roi-calculator">
              <Button variant="outline" size="sm" className="gap-1.5 text-blue-600 border-blue-600 hover:text-blue-700 hover:bg-blue-50">
                <Calculator className="w-4 h-4 shrink-0" /> Retail Partner ROI
              </Button>
            </Link>
            <Link to="/roi-calculator-travel-partner">
              <Button variant="outline" size="sm" className="gap-1.5 text-green-600 border-green-600 hover:text-green-700 hover:bg-green-50">
                <Calculator className="w-4 h-4 shrink-0" /> Travel Partner ROI
              </Button>
            </Link>
            <Link to="/pos-partner#calculator">
              <Button variant="outline" size="sm" className="gap-1.5 text-violet-600 border-violet-600 hover:text-violet-700 hover:bg-violet-50">
                <Calculator className="w-4 h-4 shrink-0" /> POS Partner ROI
              </Button>
            </Link>
            <Link to="/roi-calculator-corporate-partner">
              <Button variant="outline" size="sm" className="gap-1.5 text-slate-600 border-slate-600 hover:text-slate-700 hover:bg-slate-50">
                <Calculator className="w-4 h-4 shrink-0" /> Corporate Partner ROI
              </Button>
            </Link>
            <Link to="/airport-calculator">
              <Button variant="outline" size="sm" className="gap-1.5 text-violet-600 border-violet-600 hover:text-violet-700 hover:bg-violet-50">
                <Calculator className="w-4 h-4 shrink-0" /> Airport ROI
              </Button>
            </Link>
            <Link to="/wholesale-calculator">
              <Button variant="outline" size="sm" className="gap-1.5 text-emerald-600 border-emerald-600 hover:text-emerald-700 hover:bg-emerald-50">
                <Calculator className="w-4 h-4 shrink-0" /> Wholesale ROI
              </Button>
            </Link>
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
            <Link to="/roi-calculator" onClick={() => setMobileMenuOpen(false)}>
              <Button variant="outline" size="sm" className="w-full gap-1.5 text-blue-600 border-blue-600 hover:text-blue-700 hover:bg-blue-50">
                <Calculator className="w-4 h-4 shrink-0" /> Retail Partner ROI
              </Button>
            </Link>
            <Link to="/roi-calculator-travel-partner" onClick={() => setMobileMenuOpen(false)}>
              <Button variant="outline" size="sm" className="w-full gap-1.5 text-green-600 border-green-600 hover:text-green-700 hover:bg-green-50">
                <Calculator className="w-4 h-4 shrink-0" /> Travel Partner ROI
              </Button>
            </Link>
            <Link to="/pos-partner#calculator" onClick={() => setMobileMenuOpen(false)}>
              <Button variant="outline" size="sm" className="w-full gap-1.5 text-violet-600 border-violet-600 hover:text-violet-700 hover:bg-violet-50">
                <Calculator className="w-4 h-4 shrink-0" /> POS Partner ROI
              </Button>
            </Link>
            <Link to="/roi-calculator-corporate-partner" onClick={() => setMobileMenuOpen(false)}>
              <Button variant="outline" size="sm" className="w-full gap-1.5 text-slate-600 border-slate-600 hover:text-slate-700 hover:bg-slate-50">
                <Calculator className="w-4 h-4 shrink-0" /> Corporate Partner ROI
              </Button>
            </Link>
            <Link to="/airport-calculator" onClick={() => setMobileMenuOpen(false)}>
              <Button variant="outline" size="sm" className="w-full gap-1.5 text-violet-600 border-violet-600 hover:text-violet-700 hover:bg-violet-50">
                <Calculator className="w-4 h-4 shrink-0" /> Airport ROI
              </Button>
            </Link>
            <Link to="/wholesale-calculator" onClick={() => setMobileMenuOpen(false)}>
              <Button variant="outline" size="sm" className="w-full gap-1.5 text-emerald-600 border-emerald-600 hover:text-emerald-700 hover:bg-emerald-50">
                <Calculator className="w-4 h-4 shrink-0" /> Wholesale ROI
              </Button>
            </Link>
          </div>
        )}
      </nav>

      {/* Hero */}
      <section className="relative overflow-hidden pt-12 pb-10 px-4 sm:px-6">
        <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-background to-accent/5 pointer-events-none" />
        <div className="absolute top-10 right-10 w-72 h-72 bg-primary/10 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute bottom-0 left-0 w-96 h-96 bg-accent/10 rounded-full blur-3xl pointer-events-none" />
        <div className="relative max-w-4xl mx-auto text-center space-y-5">
          <h1
            className="text-4xl sm:text-5xl md:text-6xl font-heading font-bold tracking-tight leading-tight"
            style={{
              backgroundImage: "linear-gradient(90deg, hsl(220 30% 12%) 0%, hsl(220 30% 22%) 42%, hsl(220 100% 56%) 62%, hsl(29 100% 50%) 100%)",
              WebkitBackgroundClip: "text",
              backgroundClip: "text",
              color: "transparent",
            }}
          >
            {t('hero.title_1')}
          </h1>
          <p className="text-lg sm:text-2xl text-muted-foreground leading-snug" dangerouslySetInnerHTML={{ __html: t('hero.subtitle_1') }} />
          <p className="text-lg sm:text-2xl text-muted-foreground leading-snug" dangerouslySetInnerHTML={{ __html: t('hero.subtitle_2') }} />
          <p className="text-lg sm:text-2xl text-muted-foreground leading-snug" dangerouslySetInnerHTML={{ __html: t('hero.subtitle_3') }} />
        </div>
      </section>

      {/* Stakeholders */}
      <section id="how-it-works" className="py-10 sm:py-14 px-4 sm:px-6">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-10 space-y-4">
            <h2 className="text-4xl font-heading font-bold">{t('ecosystem.title')}</h2>
            <p className="text-lg text-muted-foreground max-w-xl mx-auto">{t('ecosystem.subtitle')}</p>
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
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
              const cardContent = (
                <>
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
                  <h3 className="font-heading font-bold text-lg whitespace-nowrap mb-3">{title}</h3>
                  <p className="text-muted-foreground text-base leading-relaxed mb-5">{description}</p>
                  <ul className="space-y-2">
                    {benefits.map((b) => (
                      <li key={b} className="flex items-center gap-2 text-xs">
                        <div className={`w-1.5 h-1.5 rounded-full bg-gradient-to-r ${s.color} shrink-0`} />
                        {b}
                      </li>
                    ))}
                  </ul>
                </>
              );

              const cardClasses = `bg-card rounded-2xl border border-border p-8 transition-shadow ${isClickable ? 'hover:shadow-lg cursor-pointer' : 'hover:shadow-lg'}`;

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
          <p className="text-center text-base sm:text-lg text-muted-foreground max-w-2xl mx-auto mt-8 leading-relaxed">{t('ecosystem.platform_fee_note')}</p>
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