export default function DutyBoostLogo({ height = 400, inverted = false }) {
  return (
    <img
      src="https://media.base44.com/images/public/69c97dcd1c1950fa88424690/9a64855b0_ChatGPT_Image_Mar_30__2026__03_06_29_PM-removebg-preview.png"
      alt="DutyBoost"
      style={{
        height: `${height}px`,
        objectFit: 'contain',
        backgroundColor: 'transparent',
        filter: 'hue-rotate(0deg) saturate(1.1) brightness(1.0)',
      }}
    />
  );
}