import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { Button } from "@/components/ui/button";
import { ArrowLeft, ArrowRight } from "lucide-react";
import DutyBoostLogo from "../components/DutyBoostLogo";
import PageFooter from "../components/PageFooter";
import LanguageSwitcher from "../components/LanguageSwitcher";
import DashboardPreview3D from "../components/showcase/DashboardPreview3D";

export default function HotelShowcase() {
  const { t } = useTranslation();

  const flowSteps = [
    { num: '01', titleKey: 'showcase.hotel.step1', descKey: 'showcase.hotel.step1Desc' },
    { num: '02', titleKey: 'showcase.hotel.step2', descKey: 'showcase.hotel.step2Desc' },
    { num: '03', titleKey: 'showcase.hotel.step3', descKey: 'showcase.hotel.step3Desc' },
    { num: '04', titleKey: 'showcase.hotel.step4', descKey: 'showcase.hotel.step4Desc' },
  ];

  return (
    <div className="min-h-screen bg-background font-body">
      {/* Nav */}
      <nav className="sticky top-0 z-50 backdrop-blur border-b border-border bg-background/80">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 h-16 sm:h-20 flex items-center justify-between gap-4">
          <Link to="/get-started">
            <button className="flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground transition-colors">
              <ArrowLeft className="w-4 h-4" /> {t('common.back')}
            </button>
          </Link>
          <Link to="/" className="hover:opacity-80 transition-opacity">
            <DutyBoostLogo height={150} />
          </Link>
          <div className="flex items-center gap-4">
            <Link to="/retailer-calculator">
              <Button variant="outline" size="sm">{t('nav.roi_calculator')}</Button>
            </Link>
            <LanguageSwitcher />
          </div>
        </div>
      </nav>

      {/* Hero */}
      <section className="relative overflow-hidden pt-10 pb-12 px-4 sm:px-6">
        <div className="absolute inset-0 bg-gradient-to-br from-blue-50 via-background to-background pointer-events-none" />
        <div className="absolute top-10 right-10 w-72 h-72 bg-blue-500/10 rounded-full blur-3xl pointer-events-none" />
        <div className="relative max-w-4xl mx-auto text-center space-y-8">
          <h1 className="text-4xl sm:text-5xl md:text-6xl font-heading font-bold tracking-tight leading-tight">
            {t('showcase.hotel.titlePart1')} <span className="bg-gradient-to-r from-blue-400 to-cyan-600 bg-clip-text text-transparent">{t('showcase.hotel.titlePart2')}</span>
          </h1>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto leading-relaxed">
            {t('showcase.hotel.subtitle')}
          </p>
        </div>
      </section>

      {/* Flow Section */}
      <section className="py-10 sm:py-12 px-4 sm:px-6 bg-card/30 border-y border-border">
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-10 space-y-3">
            <h2 className="text-4xl font-heading font-bold">{t('showcase.hotel.howItWorks')}</h2>
          </div>
          <div className="grid md:grid-cols-4 gap-6">
            {flowSteps.map((item) => (
              <div key={item.num} className="bg-card rounded-2xl border border-border p-6 h-full">
                <p className="text-4xl font-heading font-bold text-blue-400/30 mb-3">{item.num}</p>
                <h4 className="font-heading font-semibold mb-2">{t(item.titleKey)}</h4>
                <p className="text-sm text-muted-foreground leading-relaxed">{t(item.descKey)}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 3D Dashboard Preview */}
      <DashboardPreview3D role="hotel" />

      {/* CTA */}
      <section className="py-10 sm:py-14 px-4 sm:px-6">
        <div className="max-w-3xl mx-auto text-center">
          <div className="bg-gradient-to-br from-blue-400 to-cyan-600 rounded-3xl p-12 text-primary-foreground shadow-2xl relative overflow-hidden">
            <div className="absolute top-0 right-0 w-64 h-64 bg-white/10 rounded-full -translate-y-1/2 translate-x-1/2 pointer-events-none" />
            <div className="relative space-y-6">
              <h2 className="text-4xl font-heading font-bold">{t('showcase.hotel.ctaTitle')}</h2>
              <p className="text-primary-foreground/80 text-lg max-w-xl mx-auto">
                {t('showcase.hotel.ctaDesc')}
              </p>
              <Link to="/request-demo">
                <Button size="lg" className="bg-white text-blue-600 hover:bg-white/90 gap-2 px-8 text-base mt-2">
                  Request a Demo <ArrowRight className="w-4 h-4" />
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>
      <PageFooter />
    </div>
  );
}