const LOGO_URL = "https://media.base44.com/images/public/69c97dcd1c1950fa88424690/9126268cb_image.png";

export default function AirFranceKLMLogo({ height = 40, className = "" }) {
  return (
    <span
      className={`inline-flex items-center bg-black rounded-xl shadow-lg ${className}`}
      style={{ padding: `${Math.round(height * 0.16)}px ${Math.round(height * 0.3)}px` }}
    >
      <img
        src={LOGO_URL}
        alt="Air France-KLM"
        style={{ height: `${height}px`, width: "auto", display: "block" }}
      />
    </span>
  );
}