import { Link } from "react-router-dom";

const LOGO_URL = "https://media.base44.com/images/public/69c97dcd1c1950fa88424690/39dfee0b4_UpdatedLogo.svg";

export default function DutyBoostLogo({ height = 55, inverted = false, linkTo = null }) {
  const img = (
    <img
      src={LOGO_URL}
      alt="DutyBoost"
      style={{ height: `${height}px`, width: 'auto', display: 'block' }}
    />
  );

  if (linkTo) {
    return (
      <Link to={linkTo} className="hover:opacity-80 transition-opacity inline-flex items-center">
        {img}
      </Link>
    );
  }

  return img;
}