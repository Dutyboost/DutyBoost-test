import { useTranslation } from "react-i18next";
import { Link } from "react-router-dom";
import TravelerIcon from "./TravelerIcon";

const GRADIENT = "linear-gradient(135deg, hsl(220 100% 56%), hsl(243 75% 60%))";

export default function TravellerTransactionHub({ compact = false }) {
  const { t } = useTranslation();

  if (compact) {
    return (
      <Link
        to="/travellers-transaction"
        className="flex items-center gap-3 rounded-2xl px-4 py-4 shadow-lg"
        style={{ background: GRADIENT }}
      >
        <TravelerIcon className="w-8 h-8 text-white shrink-0" />
        <div className="min-w-0 text-left">
          <p className="font-heading font-bold text-white text-base leading-tight">{t('oval.hub_title')}</p>
          <p className="text-white/80 text-xs mt-1 leading-snug">{t('oval.hub_subtitle')}</p>
        </div>
      </Link>
    );
  }

  return (
    <Link
      to="/travellers-transaction"
      className="absolute z-20 flex flex-col items-center justify-center text-center rounded-full shadow-xl border-4 border-white transition-transform hover:scale-[1.03] cursor-pointer"
      style={{
        left: "50%",
        top: "50%",
        transform: "translate(-50%, -50%)",
        width: "320px",
        height: "320px",
        background: GRADIENT,
      }}
    >
      <TravelerIcon className="w-12 h-12 text-white mb-3" />
      <p className="font-heading font-bold text-white text-xl leading-tight px-6">{t('oval.hub_title')}</p>
      <p className="text-white/80 text-sm mt-2 leading-snug px-6">{t('oval.hub_subtitle')}</p>
    </Link>
  );
}