import { Link } from "react-router-dom";

export default function DutyBoostLogo({ height = 68, inverted = false, linkTo = "/" }) {
  return (
    <Link to={linkTo} className="hover:opacity-80 transition-opacity inline-flex items-center">
      <img
        src="https://media.base44.com/images/public/69c97dcd1c1950fa88424690/bf996fe49_Screenshot_2026-05-04_at_095154-removebg-preview.png"
        alt="DutyBoost"
        style={{
          height: `${height}px`,
          width: 'auto',
          maxWidth: `${height * 4}px`,
          objectFit: 'contain',
          display: 'block',
        }}
      />
    </Link>
  );
}