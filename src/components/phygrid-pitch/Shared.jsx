// Visual foundation for the Phygrid presentation.
// Phygrid's own brand language: deep black canvas, white type, cyan accent.

export const CYAN = "#00E5FF";

// Shared surface for every card in the deck.
export const CARD = "bg-white/[0.04] border border-white/10 rounded-2xl";

export function SlideWrapper({ children }) {
  return (
    <div className="w-full flex flex-col overflow-y-auto lg:overflow-hidden bg-[#0a0b0d] text-white">
      {children}
    </div>
  );
}

export function GridBg() {
  return (
    <div
      className="absolute inset-0 opacity-[0.06] pointer-events-none"
      style={{
        backgroundImage: `linear-gradient(${CYAN} 1px, transparent 1px), linear-gradient(90deg, ${CYAN} 1px, transparent 1px)`,
        backgroundSize: "44px 44px",
      }}
    />
  );
}

export function Glow({ className = "" }) {
  return (
    <div
      className={`absolute rounded-full pointer-events-none ${className}`}
      style={{ background: "radial-gradient(circle, rgba(0,229,255,0.22) 0%, transparent 70%)" }}
    />
  );
}

export function SlideHeader({ eyebrow, title, subtitle }) {
  return (
    <div className="mb-5">
      <span className="text-[#00E5FF] text-xs md:text-sm font-semibold uppercase tracking-[0.25em]">{eyebrow}</span>
      <h2 className="text-xl md:text-3xl font-heading font-bold text-white mt-2">{title}</h2>
      {subtitle && <p className="text-slate-400 mt-2 text-sm leading-relaxed max-w-4xl">{subtitle}</p>}
    </div>
  );
}

export function PhygridMark({ className = "" }) {
  return (
    <span className={`font-heading font-bold tracking-tight text-white ${className}`}>
      Phy<span className="text-[#00E5FF]">grid</span>
    </span>
  );
}