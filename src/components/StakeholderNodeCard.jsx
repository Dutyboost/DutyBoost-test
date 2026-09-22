import { useTranslation } from "react-i18next";
import { Link } from "react-router-dom";

export default function StakeholderNodeCard({ node }) {
  const { t } = useTranslation();
  const { key, Icon, extraIcons, bg, border, fg, link } = node;

  return (
    <Link
      to={link}
      className={`flex flex-col items-center gap-2 ${bg} border ${border} rounded-2xl px-2 py-3 shadow-sm hover:shadow-md transition-shadow w-full h-full`}
    >
      <div className="flex flex-wrap items-center justify-center gap-1">
        <div className="w-9 h-9 md:w-12 md:h-12 rounded-lg bg-white/80 flex items-center justify-center shrink-0">
          <Icon className={`w-5 h-5 md:w-7 md:h-7 ${fg}`} />
        </div>
        {extraIcons.map((AdIcon, idx) => (
          <div key={idx} className="w-9 h-9 md:w-12 md:h-12 rounded-lg bg-white/80 flex items-center justify-center shrink-0">
            <AdIcon className={`w-5 h-5 md:w-7 md:h-7 ${fg}`} />
          </div>
        ))}
      </div>
      <span className="text-[11px] md:text-xs font-bold leading-tight text-center whitespace-normal md:whitespace-nowrap">
        {t(`oval.nodes.${key}`)}
      </span>
    </Link>
  );
}