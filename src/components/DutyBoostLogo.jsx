import { Link } from "react-router-dom";

export default function DutyBoostLogo({ height = 100, inverted = false }) {
  return (
    <Link to="/" className="hover:opacity-80 transition-opacity inline-block">
      <img
        src="https://media.base44.com/images/public/69c97dcd1c1950fa88424690/bf996fe49_Screenshot_2026-05-04_at_095154-removebg-preview.png"
        alt="DutyBoost"
        style={{
          height: `${height}px`,
          objectFit: 'contain',
          backgroundColor: 'transparent',
        }}
      />
    </Link>
  );
}