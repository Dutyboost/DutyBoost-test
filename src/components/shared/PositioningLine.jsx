const POSITIONING = "The Performance-based Customer Acquisition Infrastructure for Global Travel";

export default function PositioningLine({ dark = false, header = false, className = "" }) {
  if (header) {
    return (
      <p
        className={`text-sm md:text-base font-heading font-bold uppercase tracking-[0.18em] leading-snug ${dark ? "text-white" : "text-[#0a0f1e]"} ${className}`}
      >
        {POSITIONING}
      </p>
    );
  }

  return (
    <p
      className={`text-xs md:text-sm font-semibold uppercase tracking-[0.2em] ${dark ? "text-slate-400" : "text-slate-500"} ${className}`}
    >
      {POSITIONING}
    </p>
  );
}