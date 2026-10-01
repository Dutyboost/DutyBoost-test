export const CARIBBEAN_DUTY_FREE_LOGO_URL = "https://media.base44.com/images/public/69c97dcd1c1950fa88424690/68bf26b6d_image.png";

const LOGO_URL = CARIBBEAN_DUTY_FREE_LOGO_URL;

export default function CaribbeanDutyFreeLogo({ height = 70, className = "" }) {
  return (
    <img
      src={LOGO_URL}
      alt="Caribbean Duty Free"
      className={className}
      style={{ height: `${height}px`, width: "auto", display: "block" }}
    />
  );
}