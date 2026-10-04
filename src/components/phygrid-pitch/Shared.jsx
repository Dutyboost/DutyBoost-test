// Layout foundation for the Phygrid presentation.
// Uses the standard DutyBoost slide language: light canvas, blue accent.

// Shared surface for every card in the deck.
export const CARD = "bg-slate-50 border border-slate-200 rounded-2xl";

export function SlideWrapper({ children }) {
  return (
    <div className="w-full flex flex-col overflow-y-auto lg:overflow-hidden bg-white text-[#0a0f1e]">
      {children}
    </div>
  );
}

export function GridBg() {
  return (
    <div
      className="absolute inset-0 opacity-[0.04] pointer-events-none"
      style={{
        backgroundImage:
          "linear-gradient(rgba(59,130,246,0.4) 1px, transparent 1px), linear-gradient(90deg, rgba(59,130,246,0.4) 1px, transparent 1px)",
        backgroundSize: "40px 40px",
      }}
    />
  );
}

export function Glow({ className = "" }) {
  return (
    <div
      className={`absolute rounded-full opacity-10 pointer-events-none ${className}`}
      style={{ background: "radial-gradient(circle, #3b82f6 0%, transparent 70%)" }}
    />
  );
}

export function SlideHeader({ eyebrow, title, subtitle }) {
  return (
    <div className="mb-5">
      <span className="text-blue-600 text-sm font-semibold uppercase tracking-widest">{eyebrow}</span>
      <h2 className="text-xl md:text-3xl font-heading font-bold text-[#0a0f1e] mt-2">{title}</h2>
      {subtitle && <p className="text-slate-500 mt-1 text-sm leading-relaxed max-w-4xl">{subtitle}</p>}
    </div>
  );
}