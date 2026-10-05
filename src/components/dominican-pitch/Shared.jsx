// Shared look and feel for the Dominican Republic × DutyBoost deck.
// The Dominican flag carries the deck chrome — blue for retail, red as the
// second flag colour — with a third colour for the public-interest story.

export const ACCENT = "#952d8b"; // deck chrome — Trinidad deck accent
export const RETAIL = "#002d62"; // Dominican flag blue — airport retailers
export const AIRLINE = "#ce1126"; // Dominican flag red — second deck colour
export const GOV = "#0f766e"; // Dominican Government
export const POS = "#b45309"; // POS integration

export const SITE = "https://dutyboost.com";

export function SlideWrapper({ children }) {
  return (
    <div className="w-full flex flex-col overflow-y-auto bg-white text-[#0a0f1e]">{children}</div>
  );
}

export function GridBg({ rgb = "149,45,139" }) {
  return (
    <div
      className="absolute inset-0 opacity-[0.04] pointer-events-none"
      style={{
        backgroundImage: `linear-gradient(rgba(${rgb},0.5) 1px, transparent 1px), linear-gradient(90deg, rgba(${rgb},0.5) 1px, transparent 1px)`,
        backgroundSize: "40px 40px",
      }}
    />
  );
}

// Standard slide frame: eyebrow, heading, optional subtitle, then the body.
export function SlideShell({ eyebrow, eyebrowColor = ACCENT, title, subtitle, children }) {
  return (
    <SlideWrapper>
      <div className="flex-1 flex flex-col justify-center px-5 py-6 md:px-12 md:py-6 relative">
        <GridBg />
        <div className="relative z-10">
          <div className="mb-5">
            <span className="text-sm font-semibold uppercase tracking-widest" style={{ color: eyebrowColor }}>
              {eyebrow}
            </span>
            <h2 className="text-xl md:text-3xl font-heading font-bold text-[#0a0f1e] mt-2">{title}</h2>
            {subtitle && <p className="text-slate-500 mt-1 text-sm md:text-base leading-relaxed">{subtitle}</p>}
          </div>
          {children}
        </div>
      </div>
    </SlideWrapper>
  );
}