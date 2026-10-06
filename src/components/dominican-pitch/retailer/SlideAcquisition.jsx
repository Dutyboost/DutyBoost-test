import { Fragment } from "react";
import { Search, Video, Camera, Play, MessageCircle, Users } from "lucide-react";
import { ACCENT, GridBg, SlideWrapper } from "../Shared";
import { SOURCES } from "../figures";
import { useDeckLang } from "../LanguageContext";

const CHANNEL_ICONS = [Search, Video, Camera, Play, MessageCircle, Users];

export default function SlideAcquisition() {
  const { t } = useDeckLang();
  const c = t.retail.acquisition;

  return (
    <SlideWrapper>
      <div className="flex-1 flex flex-col justify-center px-5 py-5 md:px-10 md:py-5 relative">
        <GridBg />
        <div className="relative z-10">
          <div className="mb-3">
            <span className="text-sm font-semibold uppercase tracking-widest" style={{ color: ACCENT }}>
              {c.eyebrow}
            </span>
            <h2 className="text-2xl md:text-4xl font-heading font-bold text-[#0a0f1e] mt-1.5">
              {c.title} <span style={{ color: ACCENT }}>{c.titleAccent}</span>
            </h2>
            <p className="text-slate-500 mt-1 text-sm md:text-base">{c.subtitle}</p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-3">
            <div className="space-y-3">
              <div className="bg-slate-50 border border-slate-200 rounded-2xl p-4">
                <h3 className="font-bold text-slate-800 text-sm md:text-base mb-1">{c.marketsTitle}</h3>
                <p className="text-slate-500 text-xs leading-snug mb-2">{c.marketsBody}</p>
                <div className="grid grid-cols-3 gap-1.5">
                  {c.markets.map((m) => (
                    <div key={m.name} className="bg-white border border-slate-200 rounded-lg px-1.5 py-2 text-center">
                      <p className="text-base leading-none mb-1">{m.flag}</p>
                      <p className="text-[11px] font-semibold text-slate-700 leading-tight">{m.name}</p>
                      <p className="text-xs font-bold mt-0.5" style={{ color: ACCENT }}>{m.movements}</p>
                      <p className="text-[10px] text-slate-400 leading-tight">{m.share}</p>
                    </div>
                  ))}
                </div>
                <p className="text-slate-400 text-[10px] mt-2 leading-snug">
                  {c.marketsNote}{" "}
                  <a href={SOURCES.dr} target="_blank" rel="noopener noreferrer" className="font-semibold underline" style={{ color: ACCENT }}>
                    DR
                  </a>
                </p>
              </div>

              <div className="rounded-2xl p-4" style={{ background: `${ACCENT}0d`, border: `1px solid ${ACCENT}33` }}>
                <h3 className="font-bold text-sm md:text-base mb-1" style={{ color: ACCENT }}>{c.campaignTitle}</h3>
                <p className="text-slate-600 text-xs italic mb-2">{c.campaignQuote}</p>
                <div className="bg-white border rounded-lg px-2 py-1.5 text-center mb-2" style={{ borderColor: `${ACCENT}33` }}>
                  <p className="text-xs text-slate-600 italic">{c.campaignQuestion}</p>
                </div>
                <div className="flex flex-wrap justify-center">
                  {c.channels.map((name, i) => {
                    const Icon = CHANNEL_ICONS[i];
                    return (
                      <div key={name} className="inline-flex items-center whitespace-nowrap px-2 py-1 m-[3px] bg-white border border-slate-200 rounded-full text-xs font-medium text-slate-700 leading-none">
                        <Icon className="w-3.5 h-3.5 mr-1 flex-shrink-0" style={{ color: ACCENT }} />
                        <span>{name}</span>
                      </div>
                    );
                  })}
                </div>
                <p className="text-slate-500 text-[11px] mt-2 text-center leading-snug">{c.campaignNote}</p>
              </div>
            </div>

            <div className="bg-slate-50 border border-slate-200 rounded-2xl p-4 flex flex-col justify-center">
              <h3 className="font-bold text-slate-800 text-base md:text-lg mb-3">{c.funnelTitle}</h3>
              <div className="space-y-2.5">
                {c.funnel.map((step, i) => (
                  <Fragment key={step}>
                    <div className="flex items-center">
                      <span
                        className="w-6 h-6 rounded-full text-white text-xs font-bold flex items-center justify-center flex-shrink-0 leading-none mr-2.5"
                        style={{ background: ACCENT }}
                      >
                        {i + 1}
                      </span>
                      <span className="text-sm md:text-base text-slate-700 leading-snug">{step}</span>
                    </div>
                    {i < c.funnel.length - 1 && <div className="pl-[11px] text-slate-300 text-sm leading-none">↓</div>}
                  </Fragment>
                ))}
              </div>
            </div>

            <div className="flex flex-col gap-3 h-full">
              <div className="bg-slate-800 text-white rounded-2xl p-4">
                <h3 className="font-bold text-white text-sm md:text-base mb-2">{c.costTitle}</h3>
                <div className="space-y-2">
                  <div className="bg-red-900/30 border border-red-500/30 rounded-lg p-2.5">
                    <p className="text-red-300 text-xs font-bold uppercase tracking-wide mb-1">{c.traditionalTitle}</p>
                    <p className="text-slate-300 text-sm leading-snug">{c.traditionalBody}</p>
                  </div>
                  <div className="bg-green-900/30 border border-green-500/30 rounded-lg p-2.5">
                    <p className="text-green-300 text-xs font-bold uppercase tracking-wide mb-1">{c.dutyboostTitle}</p>
                    <p className="text-slate-300 text-sm leading-snug">{c.dutyboostBody}</p>
                  </div>
                </div>
              </div>

              <div
                className="flex-1 flex items-center justify-center text-center rounded-2xl p-6 text-white"
                style={{ background: `linear-gradient(135deg, ${ACCENT} 0%, #6b1f66 100%)` }}
              >
                <p className="font-bold text-xl md:text-2xl lg:text-3xl leading-tight">{c.closing}</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </SlideWrapper>
  );
}