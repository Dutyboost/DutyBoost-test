import { Link, useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { ArrowLeft, ArrowRight, Train, Zap, QrCode, TrendingUp } from "lucide-react";
import DutyBoostLogo from "../components/DutyBoostLogo";
import LanguageSwitcher from "../components/LanguageSwitcher";
import PageFooter from "../components/PageFooter";
import { Button } from "@/components/ui/button";

const stepIcons = [Train, Zap, QrCode, TrendingUp];

const retailPartners = [
  { name: "Relay / WHSmith", cat: "Books, snacks, press" },
  { name: "Starbucks / Pret", cat: "Food & Beverage" },
  { name: "Rituals / Kiehl's", cat: "Personal care" },
  { name: "Local specialty", cat: "Regional artisan stores" },
];

export default function TrainShowcase() {
  const navigate = useNavigate();
  const { t } = useTranslation();

  const steps = [
    { title: t('showcase.train.step1'), desc: t('showcase.train.step1Desc') },
    { title: t('showcase.train.step2'), desc: t('showcase.train.step2Desc') },
    { title: t('showcase.train.step3'), desc: t('showcase.train.step3Desc') },
    { title: t('showcase.train.step4'), desc: t('showcase.train.step4Desc') },
  ];

  const stats = [
    { label: t('showcase.train.stat1_label'), value: t('showcase.train.stat1_value'), sub: t('showcase.train.stat1_sub') },
    { label: t('showcase.train.stat2_label'), value: t('showcase.train.stat2_value'), sub: t('showcase.train.stat2_sub') },
    { label: t('showcase.train.stat3_label'), value: t('showcase.train.stat3_value'), sub: t('showcase.train.stat3_sub') },
    { label: t('showcase.train.stat4_label'), value: t('showcase.train.stat4_value'), sub: t('showcase.train.stat4_sub') },
  ];

  const whyItems = t('showcase.train.why_items', { returnObjects: true });

  return (
    <div className="min-h-screen bg-background">
      <nav className="sticky top-0 z-50 backdrop-blur border-b border-border bg-background/80">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 h-16 sm:h-20 flex items-center justify-between gap-4">
          <Link to="/">
            <button className="flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground transition-colors">
              <ArrowLeft className="w-4 h-4" /> {t('showcase.train.back')}
            </button>
          </Link>
          <button onClick={() => navigate("/")} className="hover:opacity-80 transition-opacity">
            <DutyBoostLogo height={150} />
          </button>
          <LanguageSwitcher />
        </div>
      </nav>

      {/* Hero */}
      <section className="relative overflow-hidden py-20 px-4 sm:px-6 text-center">
        <div className="absolute inset-0 bg-gradient-to-br from-indigo-50 via-background to-violet-50 pointer-events-none" />
        <div className="relative max-w-4xl mx-auto space-y-6">
          <div className="inline-flex items-center gap-2 bg-indigo-100 text-indigo-700 text-sm font-semibold px-4 py-2 rounded-full">
            <Train className="w-4 h-4" /> {t('showcase.train.headline')}
          </div>
          <h1 className="text-5xl sm:text-6xl font-heading font-bold tracking-tight">
            {t('showcase.train.subtitle')}
          </h1>
          <div className="flex flex-wrap gap-4 justify-center pt-2">
            <Button size="lg" className="gap-2 bg-indigo-600 hover:bg-indigo-700 text-white px-8" onClick={() => navigate("/train-portal")}>
              {t('showcase.train.cta_explore')} <ArrowRight className="w-4 h-4" />
            </Button>
            <Button size="lg" variant="outline" className="gap-2 border-indigo-300 text-indigo-700 hover:bg-indigo-50" onClick={() => navigate("/train-signup")}>
              {t('showcase.train.cta_apply')}
            </Button>
          </div>
        </div>
      </section>

      {/* Stats */}
      <section className="py-12 px-4 sm:px-6 bg-indigo-600">
        <div className="max-w-5xl mx-auto grid grid-cols-2 lg:grid-cols-4 gap-6">
          {stats.map((s) => (
            <div key={s.label} className="text-center text-white">
              <div className="text-3xl font-heading font-bold">{s.value}</div>
              <div className="text-sm font-semibold mt-1 opacity-90">{s.label}</div>
              <div className="text-xs opacity-70 mt-0.5">{s.sub}</div>
            </div>
          ))}
        </div>
      </section>

      {/* How it works */}
      <section className="py-20 px-4 sm:px-6">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-14 space-y-3">
            <h2 className="text-4xl font-heading font-bold">{t('showcase.train.howItWorks')}</h2>
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {steps.map((step, i) => {
              const Icon = stepIcons[i];
              return (
                <div key={i} className="bg-card border border-border rounded-2xl p-6 space-y-4">
                  <div className="w-10 h-10 rounded-xl bg-indigo-100 flex items-center justify-center">
                    <Icon className="w-5 h-5 text-indigo-600" />
                  </div>
                  <div className="text-xs font-bold text-indigo-500 uppercase tracking-wide">Step {i + 1}</div>
                  <h3 className="font-heading font-semibold text-base">{step.title}</h3>
                  <p className="text-sm text-muted-foreground leading-relaxed">{step.desc}</p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Differentiators */}
      <section className="py-16 px-4 sm:px-6 bg-muted/40">
        <div className="max-w-5xl mx-auto grid md:grid-cols-2 gap-10">
          <div className="space-y-4">
            <h3 className="text-2xl font-heading font-bold">{t('showcase.train.why_title')}</h3>
            <ul className="space-y-3 text-sm text-muted-foreground">
              {Array.isArray(whyItems) && whyItems.map((item, i) => (
                <li key={i} className="flex items-start gap-2">
                  <div className="w-1.5 h-1.5 rounded-full bg-indigo-500 mt-2 shrink-0" />
                  {item}
                </li>
              ))}
            </ul>
          </div>
          <div className="space-y-4">
            <h3 className="text-2xl font-heading font-bold">{t('showcase.train.retail_title')}</h3>
            <div className="grid grid-cols-2 gap-3">
              {retailPartners.map((p) => (
                <div key={p.name} className="bg-card border border-border rounded-xl p-4">
                  <div className="font-semibold text-sm">{p.name}</div>
                  <div className="text-xs text-muted-foreground mt-0.5">{p.cat}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20 px-4 sm:px-6">
        <div className="max-w-3xl mx-auto text-center">
          <div className="bg-gradient-to-br from-indigo-600 to-violet-600 rounded-3xl p-12 text-white shadow-2xl space-y-6">
            <h2 className="text-4xl font-heading font-bold">{t('showcase.train.cta_title')}</h2>
            <p className="text-lg opacity-90 max-w-xl mx-auto">
              {t('showcase.train.cta_desc')}
            </p>
            <Button size="lg" className="bg-white text-indigo-700 hover:bg-white/90 gap-2 px-8" onClick={() => navigate("/train-signup")}>
              {t('showcase.train.cta_apply')} <ArrowRight className="w-4 h-4" />
            </Button>
          </div>
        </div>
      </section>

      <PageFooter />
    </div>
  );
}