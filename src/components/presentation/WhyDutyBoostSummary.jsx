import { useTranslation } from "react-i18next";
import { TrendingUp, ShieldCheck, Zap, Gift } from "lucide-react";

const ICONS = [TrendingUp, ShieldCheck, Zap, Gift];

export default function WhyDutyBoostSummary() {
  const { t } = useTranslation();
  const reasons = t('presentation.why_summary.reasons', { returnObjects: true });

  return (
    <section>
      <div className="bg-gradient-to-br from-primary via-primary/90 to-primary/70 rounded-3xl p-8 sm:p-12 lg:p-16 text-primary-foreground shadow-2xl relative overflow-hidden">
        <div className="absolute top-0 right-0 w-64 h-64 bg-white/10 rounded-full -translate-y-1/2 translate-x-1/2 pointer-events-none" />
        <div className="absolute bottom-0 left-0 w-48 h-48 bg-black/10 rounded-full translate-y-1/2 -translate-x-1/2 pointer-events-none" />
        <div className="relative space-y-8">
          <div className="text-center space-y-3">
            <p className="text-xs font-bold uppercase tracking-widest text-white/70">{t('presentation.why_summary.label')}</p>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-heading font-bold leading-tight">{t('presentation.why_summary.title')}</h2>
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {reasons.map((reason, i) => {
              const Icon = ICONS[i] || TrendingUp;
              return (
                <div key={i} className="bg-white/10 border border-white/20 rounded-2xl p-5 space-y-3 backdrop-blur">
                  <div className="w-10 h-10 rounded-xl bg-white/20 flex items-center justify-center">
                    <Icon className="w-5 h-5 text-white" />
                  </div>
                  <p className="font-heading font-bold text-base">{reason.title}</p>
                  <p className="text-sm text-white/80 leading-relaxed">{reason.desc}</p>
                </div>
              );
            })}
          </div>
          <div className="text-center pt-2">
            <p className="text-lg sm:text-xl font-heading font-semibold text-white">{t('presentation.why_summary.closing')}</p>
          </div>
        </div>
      </div>
    </section>
  );
}