import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { Button } from "@/components/ui/button";
import { PlaneTakeoff, Package, ShieldX, Rocket, ArrowRight, ArrowUpRight } from "lucide-react";
import DutyBoostLogo from "@/components/DutyBoostLogo";
import PageFooter from "@/components/PageFooter";
import LanguageSwitcher from "@/components/LanguageSwitcher";
import ShowcaseMobileNav from "@/components/ShowcaseMobileNav";
import TravelAgencyIcon from "@/components/TravelAgencyIcon";
import AirportRetailerIcon from "@/components/AirportRetailerIcon";
import TravelerIcon from "@/components/TravelerIcon";
import HotelIcon from "@/components/HotelIcon";
import CarRentalIcon from "@/components/CarRentalIcon";
import { hubShowcaseStrings } from "@/lib/i18nHubShowcase";

const STAKEHOLDERS = [
  { key: 'retailers', Icon: AirportRetailerIcon, bg: "bg-orange-50", border: "border-orange-200", fg: "text-orange-600", iconWrap: "bg-orange-100", link: "/travel-retailers" },
  { key: 'airports', Icon: PlaneTakeoff, bg: "bg-cyan-50", border: "border-cyan-200", fg: "text-cyan-600", iconWrap: "bg-cyan-100", link: "/travel-hubs-showcase" },
  { key: 'wholesale', Icon: Package, bg: "bg-amber-50", border: "border-amber-200", fg: "text-amber-600", iconWrap: "bg-amber-100", link: "/wholesale-showcase" },
  { key: 'travel', Icon: TravelAgencyIcon, bg: "bg-green-50", border: "border-green-200", fg: "text-green-600", iconWrap: "bg-green-100", link: "/get-started?from=agency", extraIcons: [HotelIcon, CarRentalIcon] },
];

export default function TravellersTransactionShowcase() {
  const { t, i18n } = useTranslation();
  const lang = (i18n.language || "en").split("-")[0];
  const o = hubShowcaseStrings[lang] || hubShowcaseStrings.en;

  return (
    <div className="min-h-screen bg-background font-body">
      <ShowcaseMobileNav />
      <nav className="hidden sm:block sticky top-0 z-50 backdrop-blur border-b border-border bg-background/80">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 h-16 sm:h-20 flex items-center justify-between gap-4">
          <Link to="/" className="hover:opacity-80 transition-opacity">
            <DutyBoostLogo height={55} />
          </Link>
          <LanguageSwitcher />
        </div>
      </nav>

      {/* Hero */}
      <section className="relative overflow-hidden pt-12 pb-12 px-4 sm:px-6">
        <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-background to-primary/5 pointer-events-none" />
        <div className="absolute top-10 right-10 w-72 h-72 bg-primary/10 rounded-full blur-3xl pointer-events-none" />
        <div className="relative max-w-4xl mx-auto text-center space-y-5">
          <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-gradient-to-br from-primary to-violet-600 shadow-lg mb-2">
            <TravelerIcon className="w-8 h-8 text-white" />
          </div>
          <div className="inline-flex items-center gap-2 bg-primary/10 text-primary text-xs font-semibold px-3 py-1.5 rounded-full uppercase tracking-widest">
            {o.badge}
          </div>
          <h1 className="text-4xl sm:text-5xl md:text-6xl font-heading font-bold tracking-tight leading-tight">
            {o.headline}
          </h1>
          <p className="text-lg sm:text-xl text-muted-foreground max-w-3xl mx-auto leading-relaxed">{o.subtitle}</p>
        </div>
      </section>

      {/* Problem / Solution recap */}
      <section className="py-8 px-4 sm:px-6">
        <div className="max-w-4xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="bg-red-50 border border-red-200 rounded-2xl p-5 flex items-start gap-4">
            <div className="w-11 h-11 rounded-xl bg-red-100 flex items-center justify-center flex-shrink-0">
              <ShieldX className="w-6 h-6 text-red-600" />
            </div>
            <div>
              <h3 className="font-heading font-bold text-red-700 text-sm mb-1">{t('oval.actual_title')}</h3>
              <p className="text-red-700/80 text-xs leading-relaxed">{t('oval.actual_text')}</p>
            </div>
          </div>
          <div className="bg-green-50 border border-green-200 rounded-2xl p-5 flex items-start gap-4">
            <div className="w-11 h-11 rounded-xl bg-green-100 flex items-center justify-center flex-shrink-0">
              <Rocket className="w-6 h-6 text-green-600" />
            </div>
            <div>
              <h3 className="font-heading font-bold text-green-700 text-sm mb-1">{t('oval.activated_title')}</h3>
              <p className="text-green-700/80 text-xs leading-relaxed">{t('oval.activated_text')}</p>
            </div>
          </div>
        </div>
      </section>

      {/* Convergence explanation */}
      <section className="py-12 px-4 sm:px-6 bg-muted/30">
        <div className="max-w-3xl mx-auto text-center space-y-4">
          <h2 className="text-3xl sm:text-4xl font-heading font-bold">{o.convergence_title}</h2>
          <p className="text-base sm:text-lg text-muted-foreground leading-relaxed">{o.convergence_desc}</p>
        </div>
      </section>

      {/* Stakeholder value cards */}
      <section className="py-12 px-4 sm:px-6">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-10 space-y-2">
            <h2 className="text-3xl sm:text-4xl font-heading font-bold">{o.stakeholders_title}</h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">{o.stakeholders_subtitle}</p>
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {STAKEHOLDERS.map((s) => (
              <Link
                key={s.key}
                to={s.link}
                className={`group ${s.bg} border ${s.border} rounded-2xl p-6 space-y-3 transition-shadow hover:shadow-md`}
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <div className={`w-12 h-12 rounded-xl ${s.iconWrap} flex items-center justify-center`}>
                      <s.Icon className={`w-6 h-6 ${s.fg}`} />
                    </div>
                    {s.extraIcons?.map((AdIcon, idx) => (
                      <div key={idx} className={`w-12 h-12 rounded-xl ${s.iconWrap} flex items-center justify-center`}>
                        <AdIcon className={`w-6 h-6 ${s.fg}`} />
                      </div>
                    ))}
                  </div>
                  <ArrowUpRight className={`w-5 h-5 ${s.fg} opacity-40 group-hover:opacity-100 transition-opacity`} />
                </div>
                <h3 className="font-heading font-bold text-base">{t(`oval.nodes.${s.key}`)}</h3>
                <p className="text-sm text-muted-foreground leading-relaxed">{o[`${s.key}_value`]}</p>
                <span className={`inline-flex items-center gap-1 text-sm font-semibold ${s.fg}`}>
                  {o.explore} <ArrowRight className="w-3.5 h-3.5" />
                </span>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-10 sm:py-14 px-4 sm:px-6">
        <div className="max-w-3xl mx-auto text-center">
          <div className="bg-gradient-to-br from-primary to-violet-600 rounded-3xl p-12 text-white shadow-2xl relative overflow-hidden">
            <div className="absolute top-0 right-0 w-64 h-64 bg-white/10 rounded-full -translate-y-1/2 translate-x-1/2 pointer-events-none" />
            <div className="relative space-y-6">
              <h2 className="text-4xl font-heading font-bold">{o.cta_title}</h2>
              <p className="text-white/80 text-lg max-w-xl mx-auto">{o.cta_desc}</p>
              <div className="flex justify-center">
                <Link to="/request-more-information">
                  <Button size="lg" className="bg-white text-primary hover:bg-white/90 gap-2 px-8 text-base mt-2">
                    {o.cta_button} <ArrowRight className="w-4 h-4" />
                  </Button>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      <PageFooter />
    </div>
  );
}