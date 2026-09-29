const LOGO_URL = "https://media.base44.com/images/public/69c97dcd1c1950fa88424690/78d44da7c_Air-France-KLM-Logo-2009.png";

export default function AirFranceKLMLogo({ height = 48, className = "" }) {
  return (
    <img
      src={LOGO_URL}
      alt="Air France-KLM"
      className={className}
      style={{ height: `${height}px`, width: "auto", display: "block" }}
    />
  );
}