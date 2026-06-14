import { Link } from "react-router-dom";

// Inline SVG logo — always renders correctly in browser AND in html2canvas PDF export
function LogoSVG({ height, color = "#0a1628" }) {
  const w = height * 3.8;
  return (
    <svg width={w} height={height} viewBox="0 0 380 100" xmlns="http://www.w3.org/2000/svg" style={{ display: 'block' }}>
      <text
        x="0" y="72"
        fontFamily="Space Grotesk, Inter, sans-serif"
        fontWeight="700"
        fontSize="72"
        fill={color}
        letterSpacing="-2"
      >
        DutyBoost
      </text>
    </svg>
  );
}

export default function DutyBoostLogo({ height = 100, inverted = false, linkTo = "/" }) {
  const logoUrl = "https://media.base44.com/images/public/69c97dcd1c1950fa88424690/c496a161e_UpdatedLogonew.jpg";
  const aspectRatio = 4;
  const w = height * aspectRatio;
  const textColor = inverted ? 'white' : '#0a1628';

  return (
    <Link to={linkTo} className="hover:opacity-80 transition-opacity inline-flex items-center">
      <div style={inverted ? { background: 'white', borderRadius: '12px', padding: '6px 14px', display: 'inline-flex', alignItems: 'center' } : {}}>
        <img
          src={logoUrl}
          alt="DutyBoost"
          crossOrigin="anonymous"
          width={w}
          height={height}
          onError={(e) => {
            e.target.style.display = 'none';
            if (e.target.nextSibling) e.target.nextSibling.style.display = 'inline-block';
          }}
          style={{ height: `${height}px`, width: `${w}px`, objectFit: 'contain', display: 'block' }}
        />
        <span style={{ display: 'none' }}><LogoSVG height={height} color={textColor} /></span>
      </div>
    </Link>
  );
}