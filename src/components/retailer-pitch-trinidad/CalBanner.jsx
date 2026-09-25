import { CAL_LOGO, CAL_DESTINATIONS, flagUrl } from "./destinations";

const PURPLE = "#952d8b";
const GREY = "#58595b";
const SCRIPT_FONT = "'Brush Script MT', 'Segoe Script', 'Apple Chancery', cursive";

// Decorative swirls that flow out from behind the Caribbean Airlines hummingbird.
function Swirls() {
  return (
    <svg
      viewBox="0 0 200 120"
      className="absolute -left-16 -bottom-2 w-40 md:w-52 h-auto pointer-events-none"
      fill="none"
      aria-hidden="true"
    >
      <path d="M4 96 C 46 96, 78 78, 118 62" stroke={PURPLE} strokeWidth="3" strokeLinecap="round" />
      <path d="M4 106 C 52 104, 90 88, 136 74" stroke="#ec4899" strokeWidth="3" strokeLinecap="round" />
      <path d="M10 116 C 62 112, 104 100, 152 86" stroke="#f59e0b" strokeWidth="3" strokeLinecap="round" />
      <path d="M24 84 C 62 82, 92 68, 128 52" stroke="#22c55e" strokeWidth="2.5" strokeLinecap="round" />
      <path d="M34 72 C 68 70, 96 58, 130 40" stroke="#3b82f6" strokeWidth="2.5" strokeLinecap="round" />
    </svg>
  );
}

/**
 * The Caribbean Airlines "WELCOME HOME!" header banner, adapted for the
 * Trinidad & Tobago retailer presentation.
 */
export default function CalBanner({ subtitle, className = "" }) {
  return (
    <div className={`w-full bg-white rounded-2xl border border-slate-200 shadow-xl overflow-hidden ${className}`}>
      <div className="flex items-start justify-between gap-4 px-5 pt-4 md:px-8 md:pt-6">
        <div className="text-left">
          <p
            className="leading-none"
            style={{ fontFamily: SCRIPT_FONT, color: PURPLE, fontSize: "clamp(1.75rem, 4vw, 3rem)" }}
          >
            Welcome Home!
          </p>
          <div className="h-[3px] w-32 md:w-56 rounded-full mt-1" style={{ background: PURPLE }} />
          <p className="text-[11px] md:text-sm mt-2 max-w-md leading-snug" style={{ color: GREY }}>
            {subtitle || "Caribbean Airlines Duty Free — Piarco International Airport & A.N.R. Robinson International Airport, Tobago"}
          </p>
        </div>
        <div className="relative shrink-0 pt-1">
          <Swirls />
          <img
            src={CAL_LOGO}
            alt="Caribbean Airlines"
            className="relative h-9 md:h-14 w-auto"
          />
        </div>
      </div>

      <div className="px-4 pb-4 pt-3 md:px-8 md:pb-5">
        <div className="flex flex-wrap items-center justify-center gap-1 md:gap-1.5">
          {CAL_DESTINATIONS.map((d, i) => (
            <img
              key={`${d.name}-${i}`}
              src={flagUrl(d.flag)}
              alt={d.name}
              title={d.name}
              loading="lazy"
              className="h-4 md:h-6 w-auto rounded-[2px] border border-slate-200"
            />
          ))}
        </div>
        <p
          className="text-center text-[9px] md:text-[11px] mt-2 leading-snug"
          style={{ color: GREY }}
        >
          {CAL_DESTINATIONS.map((d) => d.name).join(" | ")}
        </p>
      </div>
    </div>
  );
}