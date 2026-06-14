import { Link } from "react-router-dom";

export default function DutyBoostLogo({ height = 100, inverted = false, linkTo = "/" }) {
  const color = inverted ? '#ffffff' : '#0a1628';
  const w = height * 3.8;

  const svg = (
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

  return (
    <Link to={linkTo} className="hover:opacity-80 transition-opacity inline-flex items-center">
      {svg}
    </Link>
  );
}