export default function TravelAgencyIcon({ className }) {
  return (
    <svg viewBox="0 0 200 120" className={className} fill="none" xmlns="http://www.w3.org/2000/svg">
      {/* Runway - dashed lines */}
      <line x1="10" y1="80" x2="170" y2="80" stroke="currentColor" strokeWidth="3" strokeDasharray="10,8" />
      <line x1="15" y1="92" x2="165" y2="92" stroke="currentColor" strokeWidth="2" strokeDasharray="8,6" opacity="0.6" />
      
      {/* Runway markers */}
      <circle cx="30" cy="86" r="3" fill="currentColor" />
      <circle cx="60" cy="86" r="3" fill="currentColor" />
      <circle cx="90" cy="86" r="3" fill="currentColor" />
      <circle cx="120" cy="86" r="3" fill="currentColor" />
      <circle cx="150" cy="86" r="3" fill="currentColor" />
      
      {/* Plane taking off - simplified from right side going up */}
      <g transform="translate(155, 45) rotate(-25)">
        {/* Fuselage */}
        <ellipse cx="0" cy="0" rx="10" ry="4" fill="currentColor" />
        {/* Wings */}
        <rect x="-15" y="-2" width="30" height="4" fill="currentColor" />
        {/* Tail */}
        <polygon points="-10,-3 -15,-3 -12,3" fill="currentColor" />
        {/* Cockpit */}
        <circle cx="7" cy="0" r="2.5" fill="currentColor" />
      </g>
      
      {/* Trail/exhaust effect */}
      <line x1="140" y1="65" x2="135" y2="78" stroke="currentColor" strokeWidth="2.5" />
      <line x1="148" y1="58" x2="142" y2="72" stroke="currentColor" strokeWidth="2" opacity="0.7" />
    </svg>
  );
}