import { Link } from "react-router-dom";

export default function DutyBoostLogo({ height = 100, inverted = false, linkTo = "/" }) {
  return (
    <Link to={linkTo} className="hover:opacity-80 transition-opacity inline-flex items-center">
      <img
        src="https://media.base44.com/images/public/69c97dcd1c1950fa88424690/8f264db8d_WhatsAppImage2026-06-01at160510.jpeg"
        alt="DutyBoost"
        onError={(e) => { e.target.style.display = 'none'; e.target.nextSibling.style.display = 'block'; }}
        style={{
          height: `${height * 0.5}px`,
          width: 'auto',
          maxWidth: `${height * 2}px`,
          objectFit: 'contain',
          display: 'block',
          filter: 'none',
        }}
      />
      <span style={{ display: 'none', fontFamily: 'Space Grotesk, sans-serif', fontWeight: 700, fontSize: `${height * 0.22}px`, color: inverted ? 'white' : '#1a1a2e', letterSpacing: '-0.5px' }}>
        DutyBoost
      </span>
    </Link>
  );
}