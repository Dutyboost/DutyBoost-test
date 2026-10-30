import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { Button } from "@/components/ui/button";
import { PlaneTakeoff, Anchor, Train, Calculator, ArrowRight, CheckCircle2 } from "lucide-react";
import { getAirportStrings } from "@/lib/i18nAirport";
import DutyBoostLogo from "@/components/DutyBoostLogo";
import PageFooter from "@/components/PageFooter";
import LanguageSwitcher from "@/components/LanguageSwitcher";
import ShowcaseMobileNav from "@/components/ShowcaseMobileNav";


export default function AirportShowcase() {
  const { t, i18n } = useTranslation();
  const o = getAirportStrings(i18n.language).showcase;

  const whyCards = [
    { title: o.why1_title, desc: o.why1_desc },
    { title: o.why2_title, desc: o.why2_desc },
    { title: o.why3_title, desc: o.why3_desc },
    { title: o.why4_title, desc: o.why4_desc },
  ];
  const steps = [
    { title: o.step1_title, desc: o.step1_desc },
    { title: o.step2_title, desc: o.step2_desc },
    { title: o.step3_title, desc: o.step3_desc },
    { title: o.step4_title, desc: o.step4_desc },
  ];
  const stats = [
    { value: o.stat1_value, label: o.stat1_label, desc: o.stat1_desc },
    { value: o.stat2_value, label: o.stat2_label, desc: o.stat2_desc },
    { value: o.stat3_value, label: o.stat3_label, desc: o.stat3_desc },
  ];

  return (
    <div className="min-h-screen bg-background font-body">
      <ShowcaseMobileNav calculatorTo="/travel-hubs-calculator" gradient="linear-gradient(to bottom, #0891b2, #0284c7)" />
      <nav className="hidden sm:block sticky top-0 z-50 backdrop-blur border-b border-border bg-background/80">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 h-16 sm:h-20 flex items-center justify-between gap-4">
          <Link to="/" className="hover:opacity-80 transition-opacity">
            <DutyBoostLogo height={55} />
          </Link>
          <div className="flex items-center gap-4">
            <Link to="/travel-hubs-calculator">
              <Button variant="outline" size="sm" className="gap-1.5 text-cyan-600 border-cyan-600 hover:text-cyan-700 hover:bg-cyan-50">
                <Calculator className="w-4 h-4 shrink-0" /> ROI Calculator
              </Button>
            </Link>
            <LanguageSwitcher />
          </div>
        </div>
      </nav>

      <section className="relative overflow-hidden pt-12 pb-12 px-4 sm:px-6">
        <div className="absolute inset-0 bg-gradient-to-br from-cyan-500/5 via-background to-primary/5 pointer-events-none" />
        <div className="absolute top-10 right-10 w-72 h-72 bg-cyan-500/10 rounded-full blur-3xl pointer-events-none" />
        <div className="relative max-w-4xl mx-auto text-center space-y-5">
          <div className="inline-flex items-center gap-2 bg-cyan-500/10 text-cyan-600 text-xs font-semibold px-3 py-1.5 rounded-full uppercase tracking-widest">
            <PlaneTakeoff className="w-3.5 h-3.5" />
            <Anchor className="w-3.5 h-3.5" />
            <Train className="w-3.5 h-3.5" /> {o.badge}
          </div>
          <h1 className="text-4xl sm:text-5xl md:text-6xl font-heading font-bold tracking-tight leading-tight">
            {o.headline}
          </h1>
          <p className="text-lg sm:text-xl text-muted-foreground max-w-3xl mx-auto leading-relaxed">{o.subtitle}</p>
        </div>
      </section>

      <section className="py-12 px-4 sm:px-6">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl sm:text-4xl font-heading font-bold text-center mb-10">{o.s1_title}</h2>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {whyCards.map((w, i) => (
              <div key={i} className="bg-card border border-border rounded-2xl p-6 space-y-2">
                <div className="w-10 h-10 rounded-xl bg-cyan-500/10 flex items-center justify-center mb-2">
                  <CheckCircle2 className="w-5 h-5 text-cyan-600" />
                </div>
                <h3 className="font-heading font-bold text-base">{w.title}</h3>
                <p className="text-sm text-muted-foreground leading-relaxed">{w.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-12 px-4 sm:px-6 bg-muted/30">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl sm:text-4xl font-heading font-bold text-center mb-10">{o.s2_title}</h2>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {steps.map((s, i) => (
              <div key={i} className="bg-card border border-border rounded-2xl p-6 space-y-2 relative">
                <span className="absolute -top-3 -left-3 w-8 h-8 rounded-full bg-cyan-600 text-white text-sm font-bold flex items-center justify-center">{i + 1}</span>
                <h3 className="font-heading font-bold text-base pt-2">{s.title}</h3>
                <p className="text-sm text-muted-foreground leading-relaxed">{s.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-12 px-4 sm:px-6">
        <div className="max-w-5xl mx-auto">
          <h2 className="text-3xl sm:text-4xl font-heading font-bold text-center mb-10">{o.s3_title}</h2>
          <div className="grid sm:grid-cols-3 gap-5">
            {stats.map((s, i) => (
              <div key={i} className="bg-gradient-to-br from-cyan-500/10 to-primary/5 border border-border rounded-2xl p-8 text-center space-y-2">
                <div className="text-4xl font-heading font-bold text-cyan-600">{s.value}</div>
                <div className="font-semibold text-sm">{s.label}</div>
                <p className="text-xs text-muted-foreground leading-relaxed">{s.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-10 sm:py-14 px-4 sm:px-6">
        <div className="max-w-3xl mx-auto text-center">
          <div className="bg-gradient-to-br from-cyan-600 to-sky-700 rounded-3xl p-12 text-white shadow-2xl relative overflow-hidden">
            <div className="absolute top-0 right-0 w-64 h-64 bg-white/10 rounded-full -translate-y-1/2 translate-x-1/2 pointer-events-none" />
            <div className="relative space-y-6">
              <h2 className="text-4xl font-heading font-bold">{o.ctaTitle}</h2>
              <p className="text-white/80 text-lg max-w-xl mx-auto">{o.ctaDesc}</p>
              <div className="flex justify-center">
                <Link to="/airport-partner-request">
                  <Button size="lg" className="bg-white text-cyan-700 hover:bg-white/90 gap-2 px-8 text-base mt-2">
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