import { Link } from "react-router-dom";

export default function DutyBoostLogo({ height = 150, inverted = false, linkTo = "/" }) {
  return (
    <Link to={linkTo} className="hover:opacity-80 transition-opacity inline-flex items-center">
      <img
        src="https://media.base44.com/images/public/69c97dcd1c1950fa88424690/195c01c5f_ChatGPT_Image_May_4__2026__10_58_20_AM-removebg-preview.png"
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