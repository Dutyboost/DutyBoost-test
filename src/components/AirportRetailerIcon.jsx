export default function AirportRetailerIcon({ className }) {
  return (
    <svg viewBox="0 0 200 120" className={className} fill="none" xmlns="http://www.w3.org/2000/svg">
      {/* Left traveler - entering with ticket and suitcase */}
      <g>
        {/* Head */}
        <circle cx="25" cy="28" r="8" fill="currentColor" />
        {/* Body */}
        <rect x="20" y="38" width="10" height="18" fill="currentColor" />
        {/* Left arm holding ticket */}
        <line x1="20" y1="42" x2="8" y2="48" stroke="currentColor" strokeWidth="3" strokeLinecap="round" />
        <rect x="5" y="46" width="6" height="8" fill="currentColor" />
        {/* Right arm */}
        <line x1="30" y1="42" x2="40" y2="48" stroke="currentColor" strokeWidth="3" strokeLinecap="round" />
        {/* Legs */}
        <line x1="23" y1="56" x2="21" y2="70" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" />
        <line x1="27" y1="56" x2="29" y2="70" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" />
        {/* Suitcase */}
        <rect x="38" y="56" width="10" height="14" fill="currentColor" />
        <circle cx="43" cy="72" r="1.5" fill="currentColor" opacity="0.5" />
      </g>
      
      {/* Center - DutyFree shop */}
      <g>
        {/* Shop building */}
        <rect x="80" y="30" width="40" height="45" fill="currentColor" opacity="0.08" stroke="currentColor" strokeWidth="3" />
        {/* Door */}
        <rect x="92" y="48" width="16" height="27" fill="currentColor" opacity="0.15" stroke="currentColor" strokeWidth="2" />
        {/* Door handle */}
        <circle cx="107" cy="62" r="2" fill="currentColor" />
        {/* Window */}
        <rect x="115" y="38" width="12" height="12" fill="currentColor" opacity="0.1" stroke="currentColor" strokeWidth="2" />
        {/* Text label */}
        <text x="100" y="22" fontSize="13" fontWeight="bold" textAnchor="middle" fill="currentColor">
          DutyFree
        </text>
      </g>
      
      {/* Right traveler - leaving with shopping bags and suitcase */}
      <g>
        {/* Head */}
        <circle cx="175" cy="28" r="8" fill="currentColor" />
        {/* Body */}
        <rect x="170" y="38" width="10" height="18" fill="currentColor" />
        {/* Left arm holding shopping bags */}
        <line x1="170" y1="42" x2="155" y2="52" stroke="currentColor" strokeWidth="3" strokeLinecap="round" />
        <rect x="150" y="50" width="8" height="12" fill="currentColor" opacity="0.7" />
        <rect x="160" y="52" width="8" height="12" fill="currentColor" opacity="0.6" />
        {/* Right arm */}
        <line x1="180" y1="42" x2="192" y2="48" stroke="currentColor" strokeWidth="3" strokeLinecap="round" />
        {/* Legs */}
        <line x1="173" y1="56" x2="171" y2="70" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" />
        <line x1="177" y1="56" x2="179" y2="70" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" />
        {/* Suitcase */}
        <rect x="186" y="56" width="10" height="14" fill="currentColor" />
        <circle cx="191" cy="72" r="1.5" fill="currentColor" opacity="0.5" />
      </g>
    </svg>
  );
}