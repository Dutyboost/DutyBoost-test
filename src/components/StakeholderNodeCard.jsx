import { useTranslation } from "react-i18next";
import { Link } from "react-router-dom";

export default function StakeholderNodeCard({ node }) {
  const { t } = useTranslation();
  const { key, Icon, extraIcons, bg, border, fg, link } = node;

  const iconCount = 1 + extraIcons.length;
  const iconSize =
    iconCount >= 4 ? "w-6 h-6 md:w-8 md:h-8"
    : iconCount >= 2 ? "w-6 h-6 md:w-9 md:h-9"
    : "w-7 h-7 md:w-11 md:h-11";

  return (
    <Link
      to={link}
      className={`flex flex-col items-center gap-2 ${bg} border ${border} rounded-2xl px-2 py-3 shadow-sm hover:shadow-md transition-shadow w-full h-full`}
    >
      <div className="flex flex-nowrap items-center justify-center gap-1.5">
        <Icon className={`${iconSize} ${fg} shrink-0`} />
        {extraIcons.map((AdIcon, idx) => (
          <AdIcon key={idx} className={`${iconSize} ${fg} shrink-0`} />
        ))}
      </div>
      <span className="text-[11px] md:text-xs font-bold leading-tight text-center whitespace-normal md:whitespace-nowrap">
        {t(`oval.nodes.${key}`)}
      </span>
    </Link>
  );
}