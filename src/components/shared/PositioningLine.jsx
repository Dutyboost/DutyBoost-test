const POSITIONING = "The Performance-based Customer Acquisition Infrastructure for Global Travel";

const HERO_GRADIENT = {
  backgroundImage: "linear-gradient(90deg, hsl(220 30% 12%) 0%, hsl(220 30% 22%) 42%, hsl(220 100% 56%) 62%, hsl(29 100% 50%) 100%)",
  WebkitBackgroundClip: "text",
  backgroundClip: "text",
  color: "transparent",
};

export default function PositioningLine({ dark = false, hero = false, className = "" }) {
  if (hero) {
    return (
      <p
        className={`text-lg sm:text-xl md:text-2xl font-heading font-bold tracking-tight leading-tight ${className}`}
        style={HERO_GRADIENT}
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