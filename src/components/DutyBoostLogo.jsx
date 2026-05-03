import { Link } from "react-router-dom";

export default function DutyBoostLogo({ height = 150, inverted = false }) {
  return (
    <Link to="/" className="hover:opacity-80 transition-opacity inline-block">
      <img
        src="https://media.base44.com/images/public/69c97dcd1c1950fa88424690/9155a95d6_ChatGPTImageMay3202601_34_20PM.png"
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