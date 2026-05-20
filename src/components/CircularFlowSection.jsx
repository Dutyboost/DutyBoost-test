import { useTranslation } from 'react-i18next';

const imagesByLang = {
  es: "https://media.base44.com/images/public/69c97dcd1c1950fa88424690/4b9f831ea_ChatGPTImageMay20202609_54_27PM.png",
  default: "https://media.base44.com/images/public/69c97dcd1c1950fa88424690/418ac3f01_ChatGPTImageMay20202608_49_56PM.png",
};

export default function CircularFlowSection() {
  const { i18n } = useTranslation();
  const lang = i18n.language?.slice(0, 2);
  const src = imagesByLang[lang] || imagesByLang.default;

  return (
    <section className="py-12 sm:py-20 px-4 sm:px-6 bg-white">
      <div className="max-w-6xl mx-auto">
        <img
          src={src}
          alt="DutyBoost Circular Giving Flow"
          className="w-full h-auto rounded-2xl shadow-lg"
        />
      </div>
    </section>
  );
}