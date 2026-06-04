// Inline text-based logo that always renders correctly in html2canvas for PDF export
export default function OnePagerLogo({ height = 40 }) {
  return (
    <div style={{ display: 'inline-flex', alignItems: 'center', gap: '6px', lineHeight: 1 }}>
      <div style={{
        width: `${height}px`,
        height: `${height}px`,
        borderRadius: '8px',
        background: 'linear-gradient(135deg, #1A6BFF 0%, #0a3d8f 100%)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        flexShrink: 0,
      }}>
        <span style={{
          color: 'white',
          fontWeight: 800,
          fontSize: `${height * 0.55}px`,
          fontFamily: 'Space Grotesk, Inter, sans-serif',
          letterSpacing: '-1px',
        }}>D</span>
      </div>
      <span style={{
        fontFamily: 'Space Grotesk, Inter, sans-serif',
        fontWeight: 700,
        fontSize: `${height * 0.6}px`,
        color: '#0a1628',
        letterSpacing: '-0.5px',
        lineHeight: 1,
      }}>
        DutyBoost
      </span>
    </div>
  );
}