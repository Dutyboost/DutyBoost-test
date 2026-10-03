// Shared look and feel for the Caribbean Airlines × DutyBoost deck.
// Caribbean Airlines purple carries the deck chrome; the two revenue positions
// get their own colours so the double-sided story reads at a glance.

export const ACCENT = "#952d8b"; // Caribbean Airlines purple — deck accent
export const PARTNER = "#0e7490"; // Travel Partner position
export const RETAIL = "#952d8b"; // Retailer position
export const POS = "#b45309"; // POS integration

export const CAL_LOGO = "https://upload.wikimedia.org/wikipedia/commons/5/52/Caribbean_Airlines_logo.png";
export const CAL_SITE = "https://www.caribbean-airlines.com/";
export const CAL_DF_SITE = "https://dutyfree.caribbean-airlines.com/";

export function SlideWrapper({ children }) {
  return (
    <div className="w-full flex flex-col overflow-y-auto bg-white text-[#0a0f1e]">
      {children}
    </div>
  );
}

export function GridBg({ rgb = "149,45,139" }) {
  return (
    <div
      className="absolute inset-0 opacity-[0.04]"
      style={{
        backgroundImage: `linear-gradient(rgba(${rgb},0.5) 1px, transparent 1px), linear-gradient(90deg, rgba(${rgb},0.5) 1px, transparent 1px)`,
        backgroundSize: "40px 40px",
      }}
    />
  );
}

export function CalLogo({ height = 40, className = "" }) {
  return (
    <img
      src={CAL_LOGO}
      alt="Caribbean Airlines"
      className={className}
      style={{ height: `${height}px`, width: "auto", display: "block" }}
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
            {subtitle && <p className="text-slate-500 mt-1">{subtitle}</p>}
          </div>
          {children}
        </div>
      </div>
    </SlideWrapper>
  );
}