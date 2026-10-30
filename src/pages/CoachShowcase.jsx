import { useTranslation } from "react-i18next";
import TravelPartnerShowcase from "@/components/showcase/TravelPartnerShowcase";
import CoachOnRoadIcon from "@/components/CoachOnRoadIcon";
import { getTravelPartnerCardStrings } from "@/lib/i18nTravelPartnerCards";

export default function CoachShowcase() {
  const { t, i18n } = useTranslation();
  const tp = getTravelPartnerCardStrings(i18n.language);
  const headline = tp.coach_title;
  const words = headline.trim().split(/\s+/);
  const titleHighlight = words.length > 1 ? words.pop() : headline;
  const titleBefore = words.join(' ');

  return (
    <TravelPartnerShowcase
      icon={CoachOnRoadIcon}
      secondIcon={CoachOnRoadIcon}
      pill1Text={`${t('travelstackonepager.pill_1st')} DutyCredit — ${t('travelstackonepager.at_booking')}`}
      pill2Text={`${t('travelstackonepager.pill_2nd')} DutyCredit — ${tp.coach_pill_2}`}
      pill1Class="bg-blue-100 text-blue-700 border-blue-200"
      pill2Class="bg-amber-100 text-amber-700 border-amber-200"
      titleBefore={titleBefore}
      titleHighlight={titleHighlight}
      highlightClass="from-amber-400 to-orange-600"
      subtitle={tp.coach_description}
      heroFromClass="from-amber-50"
      blobClass="bg-amber-500/10"
      numClass="text-amber-400/30"
      flowHeading={t('showcase.accommodation.howItWorks')}
      steps={[
        { num: '01', title: tp.coach_step1, desc: tp.coach_step1Desc },
        { num: '02', title: tp.coach_step2, desc: tp.coach_step2Desc },
        { num: '03', title: tp.coach_step3, desc: tp.coach_step3Desc },
        { num: '04', title: tp.coach_step4, desc: tp.coach_step4Desc },
      ]}
      ctaFromClass="from-amber-400 to-orange-600"
      ctaTitle={tp.coach_cta_title}
      ctaDesc={tp.coach_cta_desc}
      ctaLabel={t('common.request_more_info')}
      ctaTo="/coach-signup"
      ctaTextClass="text-orange-600"
      calculatorTo="/coach-partner-calculator"
      mobileNavGradient="linear-gradient(to bottom, #fbbf24, #ea580c)"
    />
  );
}