import { useTranslation } from "react-i18next";

const steps = [
  { num: "1", color: "bg-blue-600", textColor: "text-blue-600", borderColor: "border-blue-600" },
  { num: "2", color: "bg-blue-500", textColor: "text-blue-500", borderColor: "border-blue-500" },
  { num: "3", color: "bg-blue-700", textColor: "text-blue-700", borderColor: "border-blue-700" },
  { num: "4", color: "bg-blue-800", textColor: "text-blue-800", borderColor: "border-blue-800" },
  { num: "5", color: "bg-blue-600", textColor: "text-blue-600", borderColor: "border-blue-600" },
  { num: "6", color: "bg-blue-500", textColor: "text-blue-500", borderColor: "border-blue-500" },
];

const resultItems = [
  { icon: "💰", key: "r1" },
  { icon: "🏪", key: "r2" },
  { icon: "✈️", key: "r3" },
  { icon: "🔵", key: "r4" },
  { icon: "👥", key: "r5" },
];

export default function CircularFlowSection() {
  const { t } = useTranslation();

  return (
    <section className="py-12 sm:py-16 px-4 sm:px-6 bg-white">
      <div className="max-w-5xl mx-auto">
        {/* Header */}
        <div className="text-center mb-10 space-y-3">
          <h2 className="text-3xl sm:text-4xl font-heading font-bold text-slate-900">
            {t('circularFlow.title')}
          </h2>
          <p className="text-muted-foreground max-w-xl mx-auto text-base">
            {t('circularFlow.subtitle')}
          </p>
        </div>

        {/* 6-step flow grid */}
        <div className="grid grid-cols-2 sm:grid-cols-3 gap-4 mb-8">
          {steps.map((s, i) => (
            <div key={s.num} className={`relative rounded-2xl border-2 ${s.borderColor} bg-white p-5 flex flex-col gap-2 shadow-sm`}>
              <div className={`w-8 h-8 rounded-full ${s.color} text-white text-sm font-bold flex items-center justify-center shrink-0`}>
                {s.num}
              </div>
              <p className={`font-heading font-bold text-sm ${s.textColor}`}>
                {t(`circularFlow.step${s.num}_title`)}
              </p>
              <p className="text-xs text-muted-foreground leading-snug">
                {t(`circularFlow.step${s.num}_desc`)}
              </p>
            </div>
          ))}
        </div>

        {/* Result bar */}
        <div className="rounded-2xl bg-blue-50 border border-blue-200 p-5">
          <div className="flex flex-wrap items-center gap-3 mb-4">
            <div className="w-9 h-9 rounded-full bg-blue-600 flex items-center justify-center shrink-0">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M23 21v-2a4 4 0 0 0-3-3.87"/><path d="M16 3.13a4 4 0 0 1 0 7.75"/>
              </svg>
            </div>
            <p className="font-heading font-bold text-blue-800 text-sm uppercase tracking-wide">
              {t('circularFlow.result_label')}
            </p>
          </div>
          <div className="flex flex-wrap items-center gap-2 sm:gap-3">
            {resultItems.map((item, i) => (
              <div key={item.key} className="flex items-center gap-1.5">
                <div className="bg-white rounded-xl border border-blue-200 px-3 py-2 text-xs font-semibold text-slate-700 shadow-sm">
                  {item.icon} {t(`circularFlow.${item.key}`)}
                </div>
                {i < resultItems.length - 1 && (
                  <span className="text-blue-400 font-bold text-base">→</span>
                )}
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}