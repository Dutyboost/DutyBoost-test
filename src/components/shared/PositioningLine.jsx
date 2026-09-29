export default function PositioningLine({ dark = false, className = "" }) {
  return (
    <p
      className={`text-xs md:text-sm font-semibold uppercase tracking-[0.2em] ${dark ? "text-slate-400" : "text-slate-500"} ${className}`}
    >
      The Performance-based Customer Acquisition Infrastructure for Global Travel
    </p>
  );
}