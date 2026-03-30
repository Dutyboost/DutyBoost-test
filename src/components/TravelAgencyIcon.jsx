export default function TravelAgencyIcon({ className }) {
  return (
    <svg viewBox="0 0 200 120" className={className} fill="none" xmlns="http://www.w3.org/2000/svg">
      {/* Runway - dashed lines */}
      <line x1="10" y1="80" x2="170" y2="80" stroke="currentColor" strokeWidth="2" strokeDasharray="8,6" opacity="0.4" />
      <line x1="15" y1="90" x2="165" y2="90" stroke="currentColor" strokeWidth="1.5" strokeDasharray="6,4" opacity="0.3" />
      
      {/* Runway markers */}
      <circle cx="30" cy="85" r="2" fill="currentColor" opacity="0.5" />
      <circle cx="60" cy="85" r="2" fill="currentColor" opacity="0.5" />
      <circle cx="90" cy="85" r="2" fill="currentColor" opacity="0.5" />
      <circle cx="120" cy="85" r="2" fill="currentColor" opacity="0.5" />
      <circle cx="150" cy="85" r="2" fill="currentColor" opacity="0.5" />
      
      {/* Plane taking off - simplified from right side going up */}
      <g transform="translate(155, 50) rotate(-25)">
        {/* Fuselage */}
        <ellipse cx="0" cy="0" rx="8" ry="3" fill="currentColor" />
        {/* Wings */}
        <rect x="-12" y="-1" width="24" height="2" fill="currentColor" />
        {/* Tail */}
        <polygon points="-8,-2 -12,-2 -10,2" fill="currentColor" opacity="0.8" />
        {/* Cockpit */}
        <circle cx="6" cy="0" r="1.5" fill="currentColor" opacity="0.6" />
      </g>
      
      {/* Trail/exhaust effect */}
      <line x1="145" y1="65" x2="140" y2="75" stroke="currentColor" strokeWidth="1.5" opacity="0.3" />
      <line x1="150" y1="60" x2="145" y2="72" stroke="currentColor" strokeWidth="1" opacity="0.2" />
    </svg>
  );
}