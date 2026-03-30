export default function TravelerIcon({ className }) {
  return (
    <svg viewBox="0 0 200 120" className={className} fill="none" xmlns="http://www.w3.org/2000/svg">
      {/* Laptop/Computer */}
      <g>
        {/* Screen bezel */}
        <rect x="48" y="18" width="70" height="52" rx="2" fill="currentColor" opacity="0.12" stroke="currentColor" strokeWidth="3" />
        {/* Screen display - where text appears */}
        <rect x="54" y="24" width="58" height="40" fill="currentColor" opacity="0.08" stroke="currentColor" strokeWidth="2" />
        {/* DutyCredits text on screen */}
        <text x="83" y="52" fontSize="14" fontWeight="bold" textAnchor="middle" fill="currentColor">
          DutyCredits
        </text>
        {/* Laptop base/hinge */}
        <rect x="46" y="70" width="74" height="4" rx="1" fill="currentColor" opacity="0.5" />
        {/* Keyboard area */}
        <rect x="50" y="74" width="66" height="14" rx="1" fill="currentColor" opacity="0.12" stroke="currentColor" strokeWidth="2" />
        {/* Keyboard keys pattern */}
        <circle cx="62" cy="80" r="1.5" fill="currentColor" />
        <circle cx="75" cy="80" r="1.5" fill="currentColor" />
        <circle cx="88" cy="80" r="1.5" fill="currentColor" />
        <circle cx="62" cy="86" r="1.5" fill="currentColor" />
        <circle cx="75" cy="86" r="1.5" fill="currentColor" />
        <circle cx="88" cy="86" r="1.5" fill="currentColor" />
      </g>
      
      {/* Traveler/Person using laptop */}
      <g>
        {/* Head */}
        <circle cx="28" cy="32" r="9" fill="currentColor" />
        {/* Body leaning toward laptop */}
        <rect x="23" y="43" width="10" height="20" fill="currentColor" />
        {/* Left arm on keyboard */}
        <line x1="23" y1="48" x2="12" y2="58" stroke="currentColor" strokeWidth="3.5" strokeLinecap="round" />
        {/* Right arm on keyboard */}
        <line x1="33" y1="48" x2="44" y2="58" stroke="currentColor" strokeWidth="3.5" strokeLinecap="round" />
        {/* Legs */}
        <line x1="25" y1="63" x2="23" y2="78" stroke="currentColor" strokeWidth="3" strokeLinecap="round" />
        <line x1="31" y1="63" x2="33" y2="78" stroke="currentColor" strokeWidth="3" strokeLinecap="round" />
      </g>
      
      {/* Decorative elements - flight/travel arrows */}
      <g>
        <path d="M 135 28 L 165 14" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" />
        <polygon points="165,14 172,20 163,26" fill="currentColor" />
      </g>
      <g>
        <path d="M 142 55 L 172 42" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" />
        <polygon points="172,42 179,48 170,56" fill="currentColor" />
      </g>
    </svg>
  );
}