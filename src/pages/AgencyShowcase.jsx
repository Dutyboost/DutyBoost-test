import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { ArrowLeft, Zap, QrCode, BarChart3, ShieldCheck, Globe2, TrendingUp, ArrowRight, BellRing } from "lucide-react";
import DutyBoostLogo from "../components/DutyBoostLogo";
import PageFooter from "../components/PageFooter";
import LanguageSwitcher from "../components/LanguageSwitcher";
import DashboardPreview3D from "../components/showcase/DashboardPreview3D";
import TravelAgencyIcon from "../components/TravelAgencyIcon";

const featureIcons = [Zap, QrCode, BarChart3, ShieldCheck, Globe2, TrendingUp];

export default function AgencyShowcase() {
  const { t } = useTranslation();
  const urlParams = new URLSearchParams(window.location.search);
  const fromAgency = urlParams.get('from') === 'agency';
  const backTo = fromAgency ? '/get-started?from=agency' : '/get-started';

  const flowSteps = [
    { num: '01', titleKey: 'showcase.agency.step1', descKey: 'showcase.agency.step1Desc' },
    { num: '02', titleKey: 'showcase.agency.step2', descKey: 'showcase.agency.step2Desc' },
    { num: '03', titleKey: 'showcase.agency.step3', descKey: 'showcase.agency.step3Desc' },
    { num: '04', titleKey: 'showcase.agency.step4', descKey: 'showcase.agency.step4Desc' },
  ];

  const doubleDutyHighlight = {
    flight: { label: t('travelstackonepager.at_booking'), color: 'bg-blue-50 border-blue-200 text-blue-700' },
    reminder: { label: t('travelstackonepager.at_return_reminder') || 'Return Flight Reminder', color: 'bg-green-50 border-green-200 text-green-700' },
  };

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
        <div className="max-w-6xl mx-auto px-4 sm:px-6 h-16 sm:h-20 flex items-center justify-between gap-4">
          <Link to="/" className="hover:opacity-80 transition-opacity">
            <DutyBoostLogo height={55} />
          </Link>
          <div className="flex items-center gap-4">
            <Link to="/retailer-calculator">
              <Button variant="outline" size="sm">{t('nav.roi_calculator')}</Button>
            </Link>
            <LanguageSwitcher />
            <Link to={backTo}>
              <button className="flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground transition-colors">
                <ArrowLeft className="w-4 h-4" /> {t('common.back')}
              </button>
            </Link>
          </div>
        </div>
      </nav>

      {/* Hero */}
      <section className="relative overflow-hidden pt-10 pb-12 px-4 sm:px-6">
        <div className="absolute inset-0 bg-gradient-to-br from-green-50 via-background to-background pointer-events-none" />
        <div className="absolute top-10 right-10 w-72 h-72 bg-green-500/10 rounded-full blur-3xl pointer-events-none" />
        <div className="relative max-w-4xl mx-auto text-center space-y-8">
          <div className="flex justify-center gap-3 flex-wrap">
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-blue-100 text-blue-700 text-sm font-medium border border-blue-200">
              <TravelAgencyIcon className="w-4 h-4" /> {t('travelstackonepager.pill_1st')} DutyCredit — {t('travelstackonepager.at_booking')}
            </span>
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-100 text-emerald-700 text-sm font-medium border border-emerald-200">
              <BellRing className="w-4 h-4" /> {t('travelstackonepager.pill_2nd')} DutyCredit — {t('travelstackonepager.at_return_reminder')}
            </span>
          </div>
          <h1 className="text-4xl sm:text-5xl md:text-6xl font-heading font-bold tracking-tight leading-tight">
            {t('showcase.agency.titlePart1')} <span className="bg-gradient-to-r from-green-400 to-emerald-600 bg-clip-text text-transparent">{t('showcase.agency.titlePart2')}</span>
          </h1>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto leading-relaxed">
            {t('showcase.agency.subtitle')}
          </p>
        </div>
      </section>

      {/* Flow Section */}
      <section className="py-10 sm:py-12 px-4 sm:px-6 bg-card/30 border-y border-border">
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-10 space-y-3">
            <h2 className="text-4xl font-heading font-bold">{t('showcase.agency.howItWorks')}</h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">From booking to commission — fully automated, zero operational effort on your end.</p>
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
      <DashboardPreview3D role="agency" />

      {/* CTA */}
      <section className="py-10 sm:py-14 px-4 sm:px-6">
        <div className="max-w-3xl mx-auto text-center">
          <div className="bg-gradient-to-br from-green-400 to-emerald-600 rounded-3xl p-12 text-primary-foreground shadow-2xl relative overflow-hidden">
            <div className="absolute top-0 right-0 w-64 h-64 bg-white/10 rounded-full -translate-y-1/2 translate-x-1/2 pointer-events-none" />
            <div className="relative space-y-6">
              <h2 className="text-4xl font-heading font-bold">{t('showcase.agency.ctaTitle')}</h2>
              <p className="text-primary-foreground/80 text-lg max-w-xl mx-auto">
                {t('showcase.agency.ctaDesc')}
              </p>
              <Link to="/request-more-information">
                <Button size="lg" className="bg-white text-green-600 hover:bg-white/90 gap-2 px-8 text-base mt-2">
                  {t('common.request_more_info')} <ArrowRight className="w-4 h-4" />
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