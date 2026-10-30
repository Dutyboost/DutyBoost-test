import { useTranslation } from "react-i18next";
import TravelPartnerShowcase from "@/components/showcase/TravelPartnerShowcase";
import CruiseShipIcon from "@/components/CruiseShipIcon";
import { getTravelPartnerCardStrings } from "@/lib/i18nTravelPartnerCards";

export default function CruiseShowcase() {
  const { t, i18n } = useTranslation();
  const tp = getTravelPartnerCardStrings(i18n.language);
  const headline = t('showcase.cruise.headline');
  const words = headline.trim().split(/\s+/);
  const titleHighlight = words.length > 1 ? words.pop() : headline;
  const titleBefore = words.join(' ');

  return (
    <TravelPartnerShowcase
      icon={CruiseShipIcon}
      secondIcon={CruiseShipIcon}
      pill1Text={`${t('travelstackonepager.pill_1st')} DutyCredit — ${t('travelstackonepager.at_booking')}`}
      pill2Text={`${t('travelstackonepager.pill_2nd')} DutyCredit — ${tp.cruise_pill_2}`}
      pill1Class="bg-blue-100 text-blue-700 border-blue-200"
      pill2Class="bg-teal-100 text-teal-700 border-teal-200"
      titleBefore={titleBefore}
      titleHighlight={titleHighlight}
      highlightClass="from-teal-400 to-cyan-600"
      subtitle={t('showcase.cruise.subtitle')}
      heroFromClass="from-teal-50"
      blobClass="bg-teal-500/10"
      numClass="text-teal-400/30"
      flowHeading={t('showcase.cruise.howItWorks')}
      flowSubtitle={t('showcase.cruise.description')}
      steps={[
        { num: '01', title: t('showcase.cruise.step1'), desc: t('showcase.cruise.step1Desc') },
        { num: '02', title: t('showcase.cruise.step2'), desc: t('showcase.cruise.step2Desc') },
        { num: '03', title: t('showcase.cruise.step3'), desc: t('showcase.cruise.step3Desc') },
        { num: '04', title: t('showcase.cruise.step4'), desc: t('showcase.cruise.step4Desc') },
      ]}
      dashboardRole="retailer"
      ctaFromClass="from-teal-400 to-cyan-600"
      ctaTitle={t('showcase.cruise.ctaTitle')}
      ctaDesc={t('showcase.cruise.ctaDesc')}
      ctaLabel={t('showcase.cruise.ctaButton')}
      ctaTo="/cruise-portal"
      ctaTextClass="text-teal-600"
      calculatorTo="/cruise-partner-calculator"
      mobileNavGradient="linear-gradient(to bottom, #2dd4bf, #0891b2)"
    />
  );
}