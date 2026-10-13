import { useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { ArrowRight, Anchor, Ship, TrendingUp, QrCode } from "lucide-react";
import DutyBoostLogo from "../components/DutyBoostLogo";
import LanguageSwitcher from "../components/LanguageSwitcher";
import PageFooter from "../components/PageFooter";
import { Button } from "@/components/ui/button";

export default function CruisePortal() {
  const navigate = useNavigate();
  const { t } = useTranslation();

  const features = [
    { icon: Ship, title: t('showcase.cruise.step1'), desc: t('showcase.cruise.step1Desc') },
    { icon: QrCode, title: t('showcase.cruise.step3'), desc: t('showcase.cruise.step3Desc') },
    { icon: TrendingUp, title: t('showcase.cruise.step4'), desc: t('showcase.cruise.step4Desc') },
    { icon: Anchor, title: t('showcase.cruise.step2'), desc: t('showcase.cruise.step2Desc') },
  ];

  return (
    <div className="min-h-screen bg-background">
      <nav className="sticky top-0 z-50 backdrop-blur border-b border-border bg-background/80">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 h-16 sm:h-20 flex items-center justify-between gap-4">
          <div />
          <button onClick={() => navigate("/")} className="hover:opacity-80 transition-opacity">
            <DutyBoostLogo height={55} />
          </button>
          <LanguageSwitcher />
        </div>
      </nav>

      <section className="py-20 px-4 sm:px-6 max-w-6xl mx-auto space-y-16">
        <div className="text-center space-y-6">
          <h1 className="text-5xl sm:text-6xl font-heading font-bold">
            {t('cruise.portal_title')}
          </h1>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            {t('cruise.portal_subtitle')}
          </p>
          <Button size="lg" className="gap-2 px-8" onClick={() => navigate("/cruise-signup")}>
            {t('cruise.apply')} <ArrowRight className="w-4 h-4" />
          </Button>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {features.map((f, i) => {
            const Icon = f.icon;
            return (
              <div key={i} className="bg-card border border-border rounded-xl p-6 space-y-3">
                <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center">
                  <Icon className="w-5 h-5 text-primary" />
                </div>
                <h3 className="font-heading font-semibold">{f.title}</h3>
                <p className="text-sm text-muted-foreground">{f.desc}</p>
              </div>
            );
          })}
        </div>

        <div className="bg-gradient-to-r from-blue-600 to-cyan-500 rounded-2xl p-12 text-white text-center space-y-6">
          <h2 className="text-3xl font-heading font-bold">{t('showcase.cruise.ctaTitle')}</h2>
          <p className="text-lg opacity-90 max-w-xl mx-auto">{t('showcase.cruise.ctaDesc')}</p>
          <Button
            size="lg"
            className="bg-white text-blue-600 hover:bg-gray-100 gap-2"
            onClick={() => navigate("/cruise-signup")}
          >
            {t('cruise.apply')} <ArrowRight className="w-4 h-4" />
          </Button>
        </div>
      </section>
      <PageFooter />
    </div>
  );
}