import { useTranslation } from "react-i18next";
import { Link } from "react-router-dom";

export default function StakeholderNodeCard({ node }) {
  const { t } = useTranslation();
  const { key, Icon, extraIcons, bg, border, fg, link } = node;

  const iconClass = `w-7 h-7 md:w-9 md:h-9 ${fg} shrink-0`;

  return (
    <Link
      to={link}
      className={`flex flex-col items-center justify-center gap-2 ${bg} border ${border} rounded-2xl px-2 py-3 shadow-sm hover:shadow-md transition-shadow w-full h-[100px] md:h-[110px]`}
    >
      <div className="flex flex-nowrap items-center justify-center gap-1.5 h-7 md:h-9">
        <Icon className={iconClass} />
        {extraIcons.map((AdIcon, idx) => (
          <AdIcon key={idx} className={iconClass} />
        ))}
      </div>
      <span className="text-[11px] md:text-xs font-bold leading-tight text-center line-clamp-2">
        {t(`oval.nodes.${key}`)}
      </span>
    </Link>
  );
}