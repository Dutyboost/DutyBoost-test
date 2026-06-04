import { Link } from "react-router-dom";

export default function DutyBoostLogo({ height = 100, inverted = false, linkTo = "/" }) {
  return (
    <Link to={linkTo} className="hover:opacity-80 transition-opacity inline-flex items-center">
      <div style={inverted ? { background: 'white', borderRadius: '12px', padding: '6px 14px', display: 'inline-flex', alignItems: 'center' } : {}}>
        <img
          src="https://media.base44.com/images/public/69c97dcd1c1950fa88424690/71d6891ff_UpdatedLogo.svg"
          alt="DutyBoost"
          onError={(e) => { e.target.style.display = 'none'; e.target.nextSibling.style.display = 'block'; }}
          style={{
            height: `${height}px`,
            width: 'auto',
            maxWidth: `${height * 4}px`,
            objectFit: 'contain',
            display: 'block',
          }}
        />
        <span style={{ display: 'none', fontFamily: 'Space Grotesk, sans-serif', fontWeight: 700, fontSize: `${height * 0.22}px`, color: inverted ? 'white' : '#1a1a2e', letterSpacing: '-0.5px' }}>
          DutyBoost
        </span>
      </div>
    </Link>
  );
}