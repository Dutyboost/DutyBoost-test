import { Link, useNavigate } from "react-router-dom";
import { ArrowRight, ArrowLeft, Anchor, Gift, QrCode, TrendingUp } from "lucide-react";
import { useTranslation } from "react-i18next";
import DutyBoostLogo from "../components/DutyBoostLogo";
import LanguageSwitcher from "../components/LanguageSwitcher";
import ShowcaseMobileNav from "../components/ShowcaseMobileNav";
import PageFooter from "../components/PageFooter";
import { Button } from "@/components/ui/button";

export default function CruiseShowcase() {
  const navigate = useNavigate();
  const { t } = useTranslation();

  const steps = [
    { icon: Anchor, title: t('showcase.cruise.step1'), desc: t('showcase.cruise.step1Desc') },
    { icon: Gift, title: t('showcase.cruise.step2'), desc: t('showcase.cruise.step2Desc') },
    { icon: QrCode, title: t('showcase.cruise.step3'), desc: t('showcase.cruise.step3Desc') },
    { icon: TrendingUp, title: t('showcase.cruise.step4'), desc: t('showcase.cruise.step4Desc') },
  ];

  return (
    <div className="min-h-screen bg-background">
      <ShowcaseMobileNav calculatorTo="/retailer-calculator" />
      <nav className="hidden sm:block sticky top-0 z-50 backdrop-blur border-b border-border bg-background/80">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 h-16 sm:h-20 flex items-center justify-between gap-4">
          <button onClick={() => navigate("/")} className="hover:opacity-80 transition-opacity">
            <DutyBoostLogo height={55} />
          </button>
          <div className="flex items-center gap-4">
            <Link to="/retailer-calculator">
              <Button variant="outline" size="sm">{t('nav.roi_calculator')}</Button>
            </Link>
            <LanguageSwitcher />
            <Link to="/get-started">
              <button className="flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground transition-colors">
                <ArrowLeft className="w-4 h-4" /> {t('showcase.cruise.back')}
              </button>
            </Link>
          </div>
        </div>
      </nav>

      <section className="py-20 px-4 sm:px-6 max-w-6xl mx-auto">
        <div className="text-center space-y-6 mb-16">
          <h1 className="text-5xl sm:text-6xl font-heading font-bold">
            {t('showcase.cruise.headline').split('&')[0]}&{" "}
            <span className="text-primary">{t('showcase.cruise.headline').split('& ')[1]}</span>
          </h1>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            {t('showcase.cruise.subtitle')}
          </p>
        </div>

        <div className="space-y-20">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div className="space-y-4">
              <h2 className="text-3xl font-heading font-bold">{t('showcase.cruise.howItWorks')}</h2>
              <p className="text-muted-foreground">{t('showcase.cruise.description')}</p>
            </div>
            <div className="grid gap-4">
              {steps.map((step, i) => {
                const Icon = step.icon;
                return (
                  <div key={i} className="bg-card border border-border rounded-xl p-6 flex gap-4">
                    <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center flex-shrink-0">
                      <Icon className="w-5 h-5 text-primary" />
                    </div>
                    <div>
                      <h3 className="font-semibold text-sm">{step.title}</h3>
                      <p className="text-xs text-muted-foreground mt-1">{step.desc}</p>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          <div className="bg-gradient-to-r from-blue-600 to-cyan-500 rounded-2xl p-12 text-white text-center space-y-6">
            <h2 className="text-3xl font-heading font-bold">{t('showcase.cruise.ctaTitle')}</h2>
            <p className="text-lg opacity-90 max-w-2xl mx-auto">{t('showcase.cruise.ctaDesc')}</p>
            <Button
              size="lg"
              className="bg-white text-blue-600 hover:bg-gray-100 gap-2"
              onClick={() => navigate("/cruise-portal")}
            >
              {t('showcase.cruise.ctaButton')} <ArrowRight className="w-4 h-4" />
            </Button>
          </div>
        </div>
      </section>
      <PageFooter />
    </div>
  );
}