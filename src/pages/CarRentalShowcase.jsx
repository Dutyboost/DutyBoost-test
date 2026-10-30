import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";
import DutyBoostLogo from "../components/DutyBoostLogo";
import PageFooter from "../components/PageFooter";
import LanguageSwitcher from "../components/LanguageSwitcher";
import ShowcaseMobileNav from "../components/ShowcaseMobileNav";
import CarRentalIcon from "../components/CarRentalIcon";

export default function CarRentalShowcase() {
  const { t } = useTranslation();
  // This is the car rental travel-partner showcase: its calculator is always
  // the car rental travel-partner ROI calculator, never the terminal retailer one.
  const calculatorTo = '/car-rental-partner-calculator';

  const flowSteps = [
    { num: '01', titleKey: 'showcase.car.step1', descKey: 'showcase.car.step1Desc' },
    { num: '02', titleKey: 'showcase.car.step2', descKey: 'showcase.car.step2Desc' },
    { num: '03', titleKey: 'showcase.car.step3', descKey: 'showcase.car.step3Desc' },
    { num: '04', titleKey: 'showcase.car.step4', descKey: 'showcase.car.step4Desc' },
  ];

  return (
    <div className="min-h-screen bg-background font-body">
      {/* Nav */}
      <ShowcaseMobileNav calculatorTo={calculatorTo} gradient="linear-gradient(to bottom, #f87171, #e11d48)" />
      <nav className="hidden sm:block sticky top-0 z-50 backdrop-blur border-b border-border bg-background/80">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 h-16 sm:h-20 flex items-center justify-between gap-4">
          <Link to="/" className="hover:opacity-80 transition-opacity">
            <DutyBoostLogo height={55} />
          </Link>
          <div className="flex items-center gap-4">
            <Link to={calculatorTo}>
              <Button variant="outline" size="sm">{t('nav.roi_calculator_travel_partner')}</Button>
            </Link>
            <LanguageSwitcher />
          </div>
        </div>
      </nav>

      {/* Hero */}
      <section className="relative overflow-hidden pt-10 pb-12 px-4 sm:px-6">
        <div className="absolute inset-0 bg-gradient-to-br from-red-50 via-background to-background pointer-events-none" />
        <div className="absolute top-10 right-10 w-72 h-72 bg-red-500/10 rounded-full blur-3xl pointer-events-none" />
        <div className="relative max-w-4xl mx-auto text-center space-y-8">
          <div className="flex justify-center gap-3 flex-wrap">
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-red-100 text-red-700 text-sm font-medium border border-red-200">
              <CarRentalIcon className="w-4 h-4" /> {t('travelstackonepager.pill_1st')} DutyCredit — {t('travelstackonepager.at_booking')}
            </span>
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-rose-100 text-rose-700 text-sm font-medium border border-rose-200">
              <CarRentalIcon className="w-4 h-4" /> {t('travelstackonepager.pill_2nd')} DutyCredit — {t('travelstackonepager.at_car_return')}
            </span>
          </div>
          <h1 className="text-4xl sm:text-5xl md:text-6xl font-heading font-bold tracking-tight leading-tight">
            {t('showcase.car.titlePart1')} <span className="bg-gradient-to-r from-red-400 to-rose-600 bg-clip-text text-transparent">{t('showcase.car.titlePart2')}</span>
          </h1>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto leading-relaxed">
            {t('showcase.car.subtitle')}
          </p>
        </div>
      </section>

      {/* Flow Section */}
      <section className="py-10 sm:py-12 px-4 sm:px-6 bg-card/30 border-y border-border">
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-10 space-y-3">
            <h2 className="text-4xl font-heading font-bold">{t('showcase.car.howItWorks')}</h2>
          </div>
          <div className="grid md:grid-cols-4 gap-6">
            {flowSteps.map((item) => (
              <div key={item.num} className="bg-card rounded-2xl border border-border p-6 h-full">
                <p className="text-4xl font-heading font-bold text-red-400/30 mb-3">{item.num}</p>
                <h4 className="font-heading font-semibold mb-2">{t(item.titleKey)}</h4>
                <p className="text-sm text-muted-foreground leading-relaxed">{t(item.descKey)}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-10 sm:py-14 px-4 sm:px-6">
        <div className="max-w-3xl mx-auto text-center">
          <div className="bg-gradient-to-br from-red-400 to-rose-600 rounded-3xl p-12 text-primary-foreground shadow-2xl relative overflow-hidden">
            <div className="absolute top-0 right-0 w-64 h-64 bg-white/10 rounded-full -translate-y-1/2 translate-x-1/2 pointer-events-none" />
            <div className="relative space-y-6">
              <h2 className="text-4xl font-heading font-bold">{t('showcase.car.ctaTitle')}</h2>
              <p className="text-primary-foreground/80 text-lg max-w-xl mx-auto">
                {t('showcase.car.ctaDesc')}
              </p>
              <div className="flex justify-center">
                <Link to="/car-rental-request">
                  <Button size="lg" className="bg-white text-red-600 hover:bg-white/90 gap-2 px-8 text-base mt-2">
                    {t('common.request_more_info')} <ArrowRight className="w-4 h-4" />
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