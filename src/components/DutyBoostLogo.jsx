import { Link } from "react-router-dom";

export default function DutyBoostLogo({ height = 400, inverted = false }) {
  return (
    <Link to="/" className="hover:opacity-80 transition-opacity inline-block">
      <img
        src="https://media.base44.com/images/public/69c97dcd1c1950fa88424690/5c03930ce_WhatsAppImage2026-05-01at102444.jpg"
        alt="DutyBoost"
        style={{
          height: `${height}px`,
          objectFit: 'contain',
          backgroundColor: 'transparent',
          filter: 'hue-rotate(0deg) saturate(1.1) brightness(1.0)',
        }}
      />
    </Link>
  );
}