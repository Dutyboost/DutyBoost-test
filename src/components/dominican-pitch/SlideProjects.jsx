import { ACCENT, GridBg, SlideWrapper } from "./Shared";
import { useDeckLang } from "./LanguageContext";
import LiveRedemptionCard from "./LiveRedemptionCard";
import { SXM_BASKETS, SXM_REDEMPTIONS, SXM_SINCE_LAUNCH } from "./sxmRedemptions";
import { POS_BASKETS, POS_REDEMPTIONS, POS_SINCE_LAUNCH } from "./posRedemptions";

// Live deployment track record: the two Caribbean markets already redeeming
// DutyCredits, shown to the Dominican Republic as proof of execution.
export default function SlideProjects() {
  const { lang, t } = useDeckLang();
  const c = t.projects;
  const compact = lang === "es";

  return (
    <SlideWrapper>
      <div className="flex-1 flex flex-col justify-center px-5 py-3 md:px-9 md:py-4 relative">
        <GridBg />
        <div className="relative z-10">
          <div className="mb-2">
            <span className="text-sm md:text-base font-semibold uppercase tracking-widest" style={{ color: ACCENT }}>
              {c.eyebrow}
            </span>
            <h2 className={`${compact ? "text-lg md:text-2xl" : "text-xl md:text-3xl"} font-heading font-bold text-[#0a0f1e] mt-1`}>
              {c.title} <span style={{ color: ACCENT }}>{c.titleAccent}</span>
            </h2>
            <p className="text-slate-500 mt-1 text-xs md:text-sm leading-snug">{c.subtitle}</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-2.5">
            <LiveRedemptionCard
              code="SXM"
              data={SXM_REDEMPTIONS}
              since={SXM_SINCE_LAUNCH}
              baskets={SXM_BASKETS}
              copy={c.sxm}
            />
            <LiveRedemptionCard
              code="POS"
              data={POS_REDEMPTIONS}
              since={POS_SINCE_LAUNCH}
              baskets={POS_BASKETS}
              copy={c.tnt}
            />
          </div>
        </div>
      </div>
    </SlideWrapper>
  );
}