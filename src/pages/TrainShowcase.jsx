import { useTranslation } from "react-i18next";
import TravelPartnerShowcase from "@/components/showcase/TravelPartnerShowcase";
import TrainIcon from "@/components/TrainIcon";
import { getTravelPartnerCardStrings } from "@/lib/i18nTravelPartnerCards";

export default function TrainShowcase() {
  const { t, i18n } = useTranslation();
  const tp = getTravelPartnerCardStrings(i18n.language);
  const headline = t('showcase.train.headline');
  const words = headline.trim().split(/\s+/);
  const titleHighlight = words.length > 1 ? words.pop() : headline;
  const titleBefore = words.join(' ');

  return (
    <TravelPartnerShowcase
      icon={TrainIcon}
      secondIcon={TrainIcon}
      pill1Text={`${t('travelstackonepager.pill_1st')} DutyCredit — ${t('travelstackonepager.at_booking')}`}
      pill2Text={`${t('travelstackonepager.pill_2nd')} DutyCredit — ${tp.train_pill_2}`}
      pill1Class="bg-blue-100 text-blue-700 border-blue-200"
      pill2Class="bg-indigo-100 text-indigo-700 border-indigo-200"
      titleBefore={titleBefore}
      titleHighlight={titleHighlight}
      highlightClass="from-indigo-400 to-violet-600"
      subtitle={t('showcase.train.subtitle')}
      heroFromClass="from-indigo-50"
      blobClass="bg-indigo-500/10"
      numClass="text-indigo-400/30"
      flowHeading={t('showcase.train.howItWorks')}
      steps={[
        { num: '01', title: t('showcase.train.step1'), desc: t('showcase.train.step1Desc') },
        { num: '02', title: t('showcase.train.step2'), desc: t('showcase.train.step2Desc') },
        { num: '03', title: t('showcase.train.step3'), desc: t('showcase.train.step3Desc') },
        { num: '04', title: t('showcase.train.step4'), desc: t('showcase.train.step4Desc') },
      ]}
      dashboardRole="agency"
      ctaFromClass="from-indigo-600 to-violet-500"
      ctaTitle={t('showcase.train.cta_title')}
      ctaDesc={t('showcase.train.cta_desc')}
      ctaLabel={t('showcase.train.cta_apply')}
      ctaTo="/train-signup"
      ctaTextClass="text-indigo-600"
      calculatorTo="/train-partner-calculator"
      mobileNavGradient="linear-gradient(to bottom, #6366f1, #8b5cf6)"
    />
  );
}