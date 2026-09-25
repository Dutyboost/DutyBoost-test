// PNG logo for one-pagers — renders correctly in html2canvas for PDF export
// Uses PNG instead of SVG to avoid html2canvas cross-origin SVG issues
const LOGO_PNG_URL = "https://media.base44.com/images/public/69c97dcd1c1950fa88424690/b420115ee_DutyBoostLogo_1.jpg";

export default function OnePagerLogo({ height = 40 }) {
  return (
    <img
      src={LOGO_PNG_URL}
      alt="DutyBoost"
      style={{ height: `${height}px`, width: 'auto', objectFit: 'contain', display: 'block' }}
    />
  );
}