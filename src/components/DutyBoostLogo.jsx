import { Link } from "react-router-dom";

export default function DutyBoostLogo({ height = 150, inverted = false }) {
  return (
    <Link to="/" className="hover:opacity-80 transition-opacity inline-block">
      <img
        src="https://media.base44.com/images/public/69c97dcd1c1950fa88424690/43134c199_ChatGPTImageMay3202601_39_22PM.png"
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