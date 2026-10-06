import { SOURCES } from "../figures";
import { ACCENT, GridBg, SlideWrapper } from "../Shared";
import { useDeckLang } from "../LanguageContext";

const CTO_LINK = "https://www.onecaribbean.org/caribbean-tourism-shows-resilient-growth-amid-global-headwinds-in-2025/";
const M1NDSET_LINK = "https://www.gtrmag.com/blog/gtr-magazine-looks-at-the-state-of-travel-and-tourism-in-the-caribbean";

const link = { color: ACCENT, fontWeight: 600, textDecoration: "underline" };

export default function SlideProblem() {
  const { t } = useDeckLang();
  const c = t.retail.problem;

  return (
    <SlideWrapper>
      <div className="flex-1 flex flex-col justify-center px-5 py-4 md:px-10 md:py-4 relative">
        <GridBg />
        <div className="relative z-10">
          <div className="mb-3">
            <span className="text-sm font-semibold uppercase tracking-widest" style={{ color: ACCENT }}>
              {c.eyebrow}
            </span>
            <h2 className="text-xl md:text-2xl font-heading font-bold text-[#0a0f1e] mt-1">
              {c.title}
              <br />
              <span style={{ color: ACCENT }}>{c.titleAccent}</span>
            </h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6">
            <div className="space-y-3">
              <div className="bg-slate-50 border border-slate-200 rounded-2xl p-4">
                <div className="text-2xl md:text-4xl font-bold mb-2" style={{ color: ACCENT }}>{c.c1.value}</div>
                <div className="text-slate-800 font-semibold">{c.c1.label}</div>
                <div className="text-slate-500 text-xs mt-1">
                  {c.c1.note}{" "}
                  <a href={CTO_LINK} target="_blank" rel="noopener noreferrer" style={link}>(CTO)</a>{" "}
                  <a href={SOURCES.drArrivals} target="_blank" rel="noopener noreferrer" style={link}>(DR)</a>
                </div>
              </div>
              <div className="bg-slate-50 border border-slate-200 rounded-2xl p-4">
                <div className="text-2xl md:text-4xl font-bold mb-2" style={{ color: ACCENT }}>{c.c2.value}</div>
                <div className="text-slate-800 font-semibold">{c.c2.label}</div>
                <div className="text-slate-500 text-xs mt-1">
                  {c.c2.note}{" "}
                  <a href={SOURCES.dr} target="_blank" rel="noopener noreferrer" style={link}>(DR)</a>
                </div>
              </div>
              <div className="bg-red-50 border border-red-200 rounded-2xl p-4">
                <div className="text-2xl md:text-4xl font-bold text-red-600 mb-2">{c.c3.value}</div>
                <a href={M1NDSET_LINK} target="_blank" rel="noopener noreferrer" style={link}>{c.c3.label}</a>
                <div className="text-slate-500 text-xs mt-1">{c.c3.note}</div>
              </div>
            </div>
            <div className="flex flex-col gap-3 justify-center">
              <div className="bg-slate-50 border border-slate-200 rounded-2xl p-4">
                <h3 className="text-slate-800 font-semibold text-base mb-3">{c.challengesTitle}</h3>
                <ul className="space-y-2">
                  {c.challenges.map((item) => (
                    <li key={item} className="flex items-start gap-3">
                      <div className="w-1.5 h-1.5 rounded-full bg-red-500 mt-2 flex-shrink-0" />
                      <span className="text-slate-600 text-sm">{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
              <div className="rounded-2xl p-4" style={{ background: `${ACCENT}0d`, border: `1px solid ${ACCENT}33` }}>
                <p className="text-sm leading-relaxed italic" style={{ color: ACCENT }}>{c.quote}</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </SlideWrapper>
  );
}