import { Link } from "react-router-dom";

export default function DutyBoostLogo({ height = 72, inverted = false, linkTo = "/" }) {
  return (
    <Link to={linkTo} className="hover:opacity-80 transition-opacity inline-flex items-center">
      <img
        src="https://media.base44.com/images/public/69c97dcd1c1950fa88424690/070a9887d_ChatGPT_Image_May_4__2026__10_50_55_AM-removebg-preview.png"
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