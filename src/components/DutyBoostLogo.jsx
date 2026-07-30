import { Link } from "react-router-dom";

const LOGO_URL = "https://media.base44.com/images/public/69c97dcd1c1950fa88424690/39dfee0b4_UpdatedLogo.svg";

export default function DutyBoostLogo({ height = 55, inverted = false, linkTo = "/" }) {
  const content = (
    <span className="inline-flex items-start gap-0.5" style={{ height: `${height}px` }}>
      <img
        src={LOGO_URL}
        alt="DutyBoost"
        style={{ height: `${height}px`, width: 'auto', display: 'block' }}
      />
      <span
        className="font-heading font-semibold leading-none"
        style={{
          fontSize: `${Math.round(height * 0.4) + 6}px`,
          color: inverted ? '#ffffff' : 'hsl(var(--accent))',
          marginTop: '1px',
        }}
      >
        ™
      </span>
    </span>
  );

  if (linkTo) {
    return (
      <Link to={linkTo} aria-label="DutyBoost — Home" className="hover:opacity-80 transition-opacity inline-flex items-center">
        {content}
      </Link>
    );
  }

  return content;
}