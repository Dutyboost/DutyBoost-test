const POSITIONING = "A Performance-based Customer Acquisition Solution for Global Travel";

const HERO_GRADIENT = {
  backgroundImage: "linear-gradient(90deg, hsl(220 30% 12%) 0%, hsl(220 30% 22%) 42%, hsl(220 100% 56%) 62%, hsl(29 100% 50%) 100%)",
  WebkitBackgroundClip: "text",
  backgroundClip: "text",
  color: "transparent",
};

export default function PositioningLine({ dark = false, hero = false, size = "base", className = "", text = POSITIONING }) {
  if (hero) {
    const sizeCls = size === "xl"
      ? "text-2xl sm:text-3xl md:text-4xl lg:text-5xl"
      : "text-lg sm:text-xl md:text-2xl";
    return (
      <p
        className={`${sizeCls} font-heading font-bold tracking-tight leading-tight ${className}`}
        style={HERO_GRADIENT}
      >
        {text}
      </p>
    );
  }

  return (
    <p
      className={`text-xs md:text-sm font-semibold uppercase tracking-[0.2em] ${dark ? "text-slate-400" : "text-slate-500"} ${className}`}
    >
      {text}
    </p>
  );
}