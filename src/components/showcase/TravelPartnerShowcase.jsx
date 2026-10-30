import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { ArrowRight, Calculator } from "lucide-react";
import { Button } from "@/components/ui/button";
import DutyBoostLogo from "@/components/DutyBoostLogo";
import PageFooter from "@/components/PageFooter";
import LanguageSwitcher from "@/components/LanguageSwitcher";
import ShowcaseMobileNav from "@/components/ShowcaseMobileNav";

/**
 * Shared layout for every travel-partner showcase (flight, accommodation,
 * car rental, cruise, rail and touring coach), so all six keep the exact same
 * look and feel. Each page only supplies its own copy, accent colours and the
 * calculator it links to in the navigation.
 */
export default function TravelPartnerShowcase({
  icon: Icon,
  secondIcon: SecondIcon,
  pill1Text,
  pill2Text,
  pill1Class,
  pill2Class,
  titleBefore,
  titleHighlight,
  highlightClass,
  subtitle,
  heroFromClass,
  blobClass,
  numClass,
  flowHeading,
  flowSubtitle,
  steps = [],
  ctaFromClass,
  ctaTitle,
  ctaDesc,
  ctaLabel,
  ctaTo,
  ctaTextClass,
  calculatorTo,
  mobileNavGradient,
}) {
  const { t } = useTranslation();
  const calculatorLabel = t('nav.roi_calculator_travel_partner');

  return (
    <div className="min-h-screen bg-background font-body">
      {/* Nav */}
      <ShowcaseMobileNav calculatorTo={calculatorTo} gradient={mobileNavGradient} />
      <nav className="hidden sm:block sticky top-0 z-50 backdrop-blur border-b border-border bg-background/80">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 h-16 sm:h-20 flex items-center justify-between gap-4">
          <Link to="/" className="hover:opacity-80 transition-opacity">
            <DutyBoostLogo height={55} />
          </Link>
          <div className="flex items-center gap-4">
            <Link to={calculatorTo}>
              <Button variant="outline" size="sm" className="gap-1.5">
                <Calculator className="w-4 h-4 shrink-0" /> <span className="hidden sm:inline">{calculatorLabel}</span>
              </Button>
            </Link>
            <LanguageSwitcher />
          </div>
        </div>
      </nav>

      {/* Hero */}
      <section className="relative overflow-hidden pt-10 pb-12 px-4 sm:px-6">
        <div className={`absolute inset-0 bg-gradient-to-br ${heroFromClass} via-background to-background pointer-events-none`} />
        <div className={`absolute top-10 right-10 w-72 h-72 ${blobClass} rounded-full blur-3xl pointer-events-none`} />
        <div className="relative max-w-4xl mx-auto text-center space-y-8">
          <div className="flex justify-center gap-3 flex-wrap">
            <span className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-sm font-medium border ${pill1Class}`}>
              <Icon className="w-4 h-4" /> {pill1Text}
            </span>
            <span className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-sm font-medium border ${pill2Class}`}>
              <SecondIcon className="w-4 h-4" /> {pill2Text}
            </span>
          </div>
          <h1 className="text-4xl sm:text-5xl md:text-6xl font-heading font-bold tracking-tight leading-tight">
            {titleBefore}{" "}
            <span className={`bg-gradient-to-r ${highlightClass} bg-clip-text text-transparent`}>{titleHighlight}</span>
          </h1>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto leading-relaxed">
            {subtitle}
          </p>
        </div>
      </section>

      {/* Flow Section */}
      <section className="py-10 sm:py-12 px-4 sm:px-6 bg-card/30 border-y border-border">
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-10 space-y-3">
            <h2 className="text-4xl font-heading font-bold">{flowHeading}</h2>
            {flowSubtitle && (
              <p className="text-muted-foreground max-w-2xl mx-auto">{flowSubtitle}</p>
            )}
          </div>
          <div className="grid md:grid-cols-4 gap-6">
            {steps.map((item) => (
              <div key={item.num} className="bg-card rounded-2xl border border-border p-6 h-full">
                <p className={`text-4xl font-heading font-bold ${numClass} mb-3`}>{item.num}</p>
                <h4 className="font-heading font-semibold mb-2">{item.title}</h4>
                <p className="text-sm text-muted-foreground leading-relaxed">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-10 sm:py-14 px-4 sm:px-6">
        <div className="max-w-3xl mx-auto text-center">
          <div className={`bg-gradient-to-br ${ctaFromClass} rounded-3xl p-12 text-primary-foreground shadow-2xl relative overflow-hidden`}>
            <div className="absolute top-0 right-0 w-64 h-64 bg-white/10 rounded-full -translate-y-1/2 translate-x-1/2 pointer-events-none" />
            <div className="relative space-y-6">
              <h2 className="text-4xl font-heading font-bold">{ctaTitle}</h2>
              <p className="text-primary-foreground/80 text-lg max-w-xl mx-auto">{ctaDesc}</p>
              <div className="flex justify-center">
                <Link to={ctaTo}>
                  <Button size="lg" className={`bg-white ${ctaTextClass} hover:bg-white/90 gap-2 px-8 text-base mt-2`}>
                    {ctaLabel} <ArrowRight className="w-4 h-4" />
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