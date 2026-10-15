import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Zap, QrCode, BarChart3, ShieldCheck, Globe2, TrendingUp, ArrowRight, Plane, Anchor, BellRing, Calculator } from "lucide-react";
import DutyBoostLogo from "../components/DutyBoostLogo";
import PageFooter from "../components/PageFooter";
import LanguageSwitcher from "../components/LanguageSwitcher";
import ShowcaseMobileNav from "../components/ShowcaseMobileNav";
import DashboardPreview3D from "../components/showcase/DashboardPreview3D";

const featureIcons = [Zap, QrCode, BarChart3, ShieldCheck, Globe2, TrendingUp];

export default function RetailerShowcase() {
  const { t } = useTranslation();

  const flowSteps = [
    { num: '01', titleKey: 'showcase.retailer.step1', descKey: 'showcase.retailer.step1Desc' },
    { num: '02', titleKey: 'showcase.retailer.step2', descKey: 'showcase.retailer.step2Desc' },
    { num: '03', titleKey: 'showcase.retailer.step3', descKey: 'showcase.retailer.step3Desc' },
    { num: '04', titleKey: 'showcase.retailer.step4', descKey: 'showcase.retailer.step4Desc' },
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
      <ShowcaseMobileNav calculatorTo="/terminal-retailers-calculator" gradient="linear-gradient(to bottom, #fb923c, #ea580c)" />
      <nav className="hidden sm:block sticky top-0 z-50 backdrop-blur border-b border-border bg-background/80">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 h-16 sm:h-20 flex items-center justify-between gap-4">
          <Link to="/" className="hover:opacity-80 transition-opacity">
            <DutyBoostLogo height={55} />
          </Link>
          <div className="flex items-center gap-4">
            <Link to="/terminal-retailers-calculator">
              <Button variant="outline" size="sm" className="gap-1.5">
                <Calculator className="w-4 h-4 shrink-0" /> <span className="hidden sm:inline">{t('nav.roi_calculator')}</span>
              </Button>
            </Link>
            <LanguageSwitcher />
          </div>
        </div>
      </nav>

      {/* Hero */}
      <section className="relative overflow-hidden pt-10 pb-12 px-4 sm:px-6">
        <div className="absolute inset-0 bg-gradient-to-br from-orange-50 via-background to-background pointer-events-none" />
        <div className="absolute top-10 right-10 w-72 h-72 bg-orange-500/10 rounded-full blur-3xl pointer-events-none" />
        <div className="relative max-w-4xl mx-auto text-center space-y-8">
          <div className="inline-flex items-center gap-2 bg-orange-500/10 text-orange-600 text-xs font-semibold px-3 py-1.5 rounded-full uppercase tracking-widest">
            <Plane className="w-3.5 h-3.5" /> <Anchor className="w-3.5 h-3.5" /> Terminal Retail Partners
          </div>
          <h1 className="text-4xl sm:text-5xl md:text-6xl font-heading font-bold tracking-tight leading-tight">
            {t('showcase.retailer.titlePart1')} <span className="bg-gradient-to-r from-orange-400 to-orange-600 bg-clip-text text-transparent">{t('showcase.retailer.titlePart2')}</span>
          </h1>
          <div className="text-xl text-muted-foreground max-w-4xl mx-auto leading-relaxed space-y-4 text-center">
            {t('showcase.retailer.subtitle').split('\n\n').map((para, i) => (
              <p key={i}>{para}</p>
            ))}
          </div>
        </div>
      </section>

      {/* Flow Section */}
      <section className="py-10 sm:py-12 px-4 sm:px-6 bg-card/30 border-y border-border">
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-10 space-y-3">
            <h2 className="text-4xl font-heading font-bold">{t('showcase.retailer.howItWorks')}</h2>
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

      {/* 3D Dashboard Preview */}
      <DashboardPreview3D role="retailer" />

      {/* CTA */}
      <section className="py-10 sm:py-14 px-4 sm:px-6">
        <div className="max-w-3xl mx-auto text-center">
          <div className="bg-gradient-to-br from-orange-400 to-orange-600 rounded-3xl p-12 text-primary-foreground shadow-2xl relative overflow-hidden">
            <div className="absolute top-0 right-0 w-64 h-64 bg-white/10 rounded-full -translate-y-1/2 translate-x-1/2 pointer-events-none" />
            <div className="relative space-y-6">
              <h2 className="text-4xl font-heading font-bold">{t('showcase.retailer.ctaTitle')}</h2>
              <p className="text-primary-foreground/80 text-lg max-w-xl mx-auto">
                {t('showcase.retailer.ctaDesc')}
              </p>
              <div className="flex justify-center">
                <Link to="/terminal-retailers-request">
                  <Button size="lg" className="bg-white text-orange-600 hover:bg-white/90 gap-2 px-8 text-base mt-2">
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