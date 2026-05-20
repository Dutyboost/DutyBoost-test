import { useTranslation } from 'react-i18next';
import DutyBoostLogo from './DutyBoostLogo';

const steps = [
  {
    num: '1',
    color: 'bg-blue-600',
    icon: '✈️',
    titleKey: 'circularFlow.step1_title',
    descKey: 'circularFlow.step1_desc',
    position: 'top',
  },
  {
    num: '2',
    color: 'bg-green-600',
    icon: '📱',
    titleKey: 'circularFlow.step2_title',
    descKey: 'circularFlow.step2_desc',
    position: 'right',
  },
  {
    num: '3',
    color: 'bg-orange-500',
    icon: '🛍️',
    titleKey: 'circularFlow.step3_title',
    descKey: 'circularFlow.step3_desc',
    position: 'bottom-right',
  },
  {
    num: '4',
    color: 'bg-purple-600',
    icon: '💡',
    titleKey: 'circularFlow.step4_title',
    descKey: 'circularFlow.step4_desc',
    position: 'bottom',
  },
  {
    num: '5',
    color: 'bg-blue-600',
    icon: '💰',
    titleKey: 'circularFlow.step5_title',
    descKey: 'circularFlow.step5_desc',
    position: 'bottom-left',
  },
  {
    num: '6',
    color: 'bg-green-600',
    icon: '😊',
    titleKey: 'circularFlow.step6_title',
    descKey: 'circularFlow.step6_desc',
    position: 'left',
  },
];

const results = ['r1', 'r2', 'r3', 'r4', 'r5'];

export default function CircularFlowSection() {
  const { t } = useTranslation();

  return (
    <section className="py-12 sm:py-20 px-4 sm:px-6 bg-white">
      <div className="max-w-5xl mx-auto">
        {/* Title */}
        <div className="text-center mb-10">
          <h2 className="text-2xl sm:text-3xl font-heading font-bold text-slate-900 mb-2">
            {t('circularFlow.title')}
          </h2>
          <p className="text-slate-500 text-sm sm:text-base max-w-xl mx-auto">
            {t('circularFlow.subtitle')}
          </p>
        </div>

        {/* Circular diagram grid */}
        <div className="relative grid grid-cols-3 gap-4 items-center max-w-3xl mx-auto">

          {/* Row 1: Step 1 (top center) */}
          <div className="col-start-2 flex justify-center">
            <StepCard step={steps[0]} t={t} />
          </div>

          {/* Row 2: Step 6 (left), Logo (center), Step 2 (right) */}
          <div className="flex justify-end">
            <StepCard step={steps[5]} t={t} />
          </div>
          <div className="flex flex-col items-center justify-center py-4">
            <div className="bg-white rounded-2xl shadow-lg border border-slate-100 p-4 flex flex-col items-center gap-2">
              <DutyBoostLogo height={80} />
            </div>
            {/* Circular arrows hint */}
            <div className="mt-3 flex gap-1 text-slate-300 text-lg select-none">
              <span>↻</span>
            </div>
          </div>
          <div className="flex justify-start">
            <StepCard step={steps[1]} t={t} />
          </div>

          {/* Row 3: Step 5 (left), Step 4 (center), Step 3 (right) */}
          <div className="flex justify-end">
            <StepCard step={steps[4]} t={t} />
          </div>
          <div className="flex justify-center">
            <StepCard step={steps[3]} t={t} />
          </div>
          <div className="flex justify-start">
            <StepCard step={steps[2]} t={t} />
          </div>
        </div>

        {/* Result banner */}
        <div className="mt-10 bg-blue-600 rounded-2xl p-6 text-white">
          <p className="text-center font-heading font-bold text-base sm:text-lg mb-4">
            {t('circularFlow.result_label')}
          </p>
          <div className="flex flex-wrap justify-center gap-3">
            {results.map((key) => (
              <div
                key={key}
                className="flex items-center gap-2 bg-white/15 rounded-full px-4 py-1.5 text-sm font-medium"
              >
                <span className="text-yellow-300">✓</span>
                {t(`circularFlow.${key}`)}
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

function StepCard({ step, t }) {
  return (
    <div className="flex flex-col items-center text-center max-w-[140px] sm:max-w-[160px]">
      <div className={`w-10 h-10 rounded-full ${step.color} text-white flex items-center justify-center text-lg font-bold mb-2 shadow-md`}>
        {step.num}
      </div>
      <div className="text-2xl mb-1">{step.icon}</div>
      <p className="font-heading font-semibold text-xs sm:text-sm text-slate-800 leading-tight mb-1">
        {t(step.titleKey)}
      </p>
      <p className="text-xs text-slate-500 leading-snug">
        {t(step.descKey)}
      </p>
    </div>
  );
}