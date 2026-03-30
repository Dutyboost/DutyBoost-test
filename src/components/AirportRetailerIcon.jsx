export default function AirportRetailerIcon({ className }) {
  return (
    <svg viewBox="0 0 200 120" className={className} fill="none" xmlns="http://www.w3.org/2000/svg">
      {/* Left traveler - entering with ticket and suitcase */}
      <g>
        {/* Head */}
        <circle cx="25" cy="30" r="6" fill="currentColor" />
        {/* Body */}
        <rect x="21" y="38" width="8" height="16" fill="currentColor" />
        {/* Left arm holding ticket */}
        <line x1="21" y1="42" x2="12" y2="45" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
        <rect x="10" y="43" width="4" height="6" fill="currentColor" opacity="0.7" />
        {/* Right arm */}
        <line x1="29" y1="42" x2="38" y2="45" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
        {/* Legs */}
        <line x1="23" y1="54" x2="22" y2="65" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
        <line x1="27" y1="54" x2="28" y2="65" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
        {/* Suitcase */}
        <rect x="32" y="55" width="8" height="12" fill="currentColor" opacity="0.6" />
        <rect x="33" y="56" width="6" height="2" fill="currentColor" opacity="0.4" />
      </g>
      
      {/* Center - DutyFree shop */}
      <g>
        {/* Shop building */}
        <rect x="85" y="35" width="30" height="35" fill="currentColor" opacity="0.1" stroke="currentColor" strokeWidth="2" />
        {/* Door */}
        <rect x="95" y="50" width="10" height="20" fill="currentColor" opacity="0.3" stroke="currentColor" strokeWidth="1" />
        {/* Window */}
        <rect x="120" y="42" width="8" height="8" fill="currentColor" opacity="0.2" stroke="currentColor" strokeWidth="1" />
        {/* Text label */}
        <text x="100" y="28" fontSize="10" fontWeight="bold" textAnchor="middle" fill="currentColor" opacity="0.8">
          DutyFree
        </text>
      </g>
      
      {/* Right traveler - leaving with shopping bags and suitcase */}
      <g>
        {/* Head */}
        <circle cx="175" cy="30" r="6" fill="currentColor" />
        {/* Body */}
        <rect x="171" y="38" width="8" height="16" fill="currentColor" />
        {/* Left arm holding shopping bags */}
        <line x1="171" y1="42" x2="160" y2="50" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
        <path d="M 158 48 Q 155 50 158 55" fill="currentColor" opacity="0.6" />
        <path d="M 162 48 Q 159 51 162 56" fill="currentColor" opacity="0.5" />
        {/* Right arm */}
        <line x1="179" y1="42" x2="188" y2="45" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
        {/* Legs */}
        <line x1="173" y1="54" x2="172" y2="65" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
        <line x1="177" y1="54" x2="178" y2="65" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
        {/* Suitcase */}
        <rect x="182" y="55" width="8" height="12" fill="currentColor" opacity="0.6" />
        <rect x="183" y="56" width="6" height="2" fill="currentColor" opacity="0.4" />
      </g>
    </svg>
  );
}