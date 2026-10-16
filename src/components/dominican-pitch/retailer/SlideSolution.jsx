import { Fragment } from "react";
import { Link } from "react-router-dom";
import { ChevronRight, Zap, Briefcase, RefreshCw } from "lucide-react";
import HotelIcon from "@/components/HotelIcon";
import CarRentalIcon from "@/components/CarRentalIcon";
import TravelAgencyIcon from "@/components/TravelAgencyIcon";
import { ACCENT, GridBg, SlideWrapper, SITE } from "../Shared";
import { useDeckLang } from "../LanguageContext";

const ICONS = [TravelAgencyIcon, HotelIcon, CarRentalIcon, Briefcase];
const COLORS = ["#2563eb", "#7c3aed", "#16a34a", "#d97706"];

export default function SlideSolution() {
  const { t } = useDeckLang();
  const c = t.retail.solution;

  return (
    <SlideWrapper>
      <div className="flex-1 flex flex-col justify-center px-5 py-6 md:px-12 md:py-6 relative">
        <GridBg />
        <div className="relative z-10">
          <div className="mb-4">
            <span className="text-sm font-semibold uppercase tracking-widest" style={{ color: ACCENT }}>{c.eyebrow}</span>
            <h2 className="text-2xl md:text-4xl font-heading font-bold text-[#0a0f1e] mt-2">
              {c.title} <span style={{ color: ACCENT }}>{c.titleAccent}</span>
            </h2>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-5 gap-3 md:gap-5 mb-5">
            <div className="rounded-2xl p-5 text-center text-white" style={{ background: ACCENT }}>
              <Zap className="w-10 h-10 mx-auto mb-3" />
              <Link
                to="/eligibility-showcase"
                target="_blank"
                rel="noopener noreferrer"
                data-pdf-link={`${SITE}/eligibility-showcase`}
                className="font-semibold mb-1 inline-flex items-center gap-1 underline decoration-white/40"
              >
                {c.platforms[0].title}
              </Link>
              <div className="text-white/80 text-sm">{c.platforms[0].desc}</div>
            </div>
            {c.platforms.slice(1).map((p, i) => {
              const Icon = ICONS[i];
              return (
                <div key={p.title} className="bg-slate-50 border border-slate-200 rounded-2xl p-5 text-center">
                  <Icon className="w-10 h-10 mx-auto mb-3" style={{ color: COLORS[i] }} />
                  <div className="text-slate-800 font-semibold mb-1">{p.title}</div>
                  <div className="text-slate-500 text-sm">{p.desc}</div>
                </div>
              );
            })}
          </div>

          <div className="hidden lg:flex items-stretch gap-2 mb-5">
            {c.steps.map((step, i, arr) => (
              <Fragment key={step}>
                <div className="flex-1 min-w-0 bg-slate-50 border border-slate-200 rounded-xl px-3 py-2.5 text-center">
                  <div className="text-xs font-semibold leading-none h-3.5 flex items-center justify-center" style={{ color: ACCENT }}>
                    {i + 1}
                  </div>
                  <div className="text-slate-800 text-xs mt-1 leading-tight">{step}</div>
                </div>
                {i < arr.length - 1 && <ChevronRight className="flex-shrink-0 self-center w-4 h-4 text-slate-300" />}
              </Fragment>
            ))}
          </div>

          <div
            className="grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-6 text-center rounded-2xl p-5 mb-4"
            style={{ background: `${ACCENT}0d`, border: `1px solid ${ACCENT}33` }}
          >
            {c.stats.map((s) => (
              <div key={s.label}>
                <div className="text-2xl font-bold" style={{ color: ACCENT }}>{s.value}</div>
                <div className="text-slate-500 text-sm mt-1">{s.label}</div>
              </div>
            ))}
          </div>

          <div className="bg-amber-50 border border-amber-200 rounded-2xl p-4">
            <div className="flex items-start gap-3">
              <RefreshCw className="w-5 h-5 text-amber-600 flex-shrink-0 mt-0.5" />
              <p className="text-slate-700 text-sm leading-relaxed">
                <span className="font-bold">{c.noteTitle}</span> {c.note}
              </p>
            </div>
          </div>
        </div>
      </div>
    </SlideWrapper>
  );
}