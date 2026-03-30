export default function TravelerIcon({ className }) {
  return (
    <svg viewBox="0 0 200 120" className={className} fill="none" xmlns="http://www.w3.org/2000/svg">
      {/* Laptop/Computer */}
      <g>
        {/* Screen bezel */}
        <rect x="50" y="20" width="60" height="45" rx="2" fill="currentColor" opacity="0.1" stroke="currentColor" strokeWidth="2" />
        {/* Screen display - where text appears */}
        <rect x="55" y="25" width="50" height="35" fill="currentColor" opacity="0.05" stroke="currentColor" strokeWidth="1" />
        {/* DutyCredits text on screen */}
        <text x="80" y="48" fontSize="12" fontWeight="bold" textAnchor="middle" fill="currentColor" opacity="0.9">
          DutyCredits
        </text>
        {/* Laptop base/hinge */}
        <rect x="48" y="63" width="64" height="3" rx="1" fill="currentColor" opacity="0.4" />
        {/* Keyboard area */}
        <rect x="52" y="66" width="56" height="12" rx="1" fill="currentColor" opacity="0.08" stroke="currentColor" strokeWidth="1" />
        {/* Keyboard keys pattern */}
        <circle cx="62" cy="71" r="1" fill="currentColor" opacity="0.3" />
        <circle cx="72" cy="71" r="1" fill="currentColor" opacity="0.3" />
        <circle cx="82" cy="71" r="1" fill="currentColor" opacity="0.3" />
        <circle cx="92" cy="71" r="1" fill="currentColor" opacity="0.3" />
        <circle cx="62" cy="76" r="1" fill="currentColor" opacity="0.3" />
        <circle cx="72" cy="76" r="1" fill="currentColor" opacity="0.3" />
        <circle cx="82" cy="76" r="1" fill="currentColor" opacity="0.3" />
        <circle cx="92" cy="76" r="1" fill="currentColor" opacity="0.3" />
      </g>
      
      {/* Traveler/Person using laptop */}
      <g>
        {/* Head */}
        <circle cx="30" cy="35" r="7" fill="currentColor" opacity="0.7" />
        {/* Body leaning toward laptop */}
        <path d="M 30 42 Q 28 55 32 65" stroke="currentColor" strokeWidth="3" strokeLinecap="round" opacity="0.7" />
        {/* Left arm on keyboard */}
        <path d="M 28 48 Q 20 52 18 60" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" opacity="0.6" />
        {/* Right arm on keyboard */}
        <path d="M 32 48 Q 38 52 42 60" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" opacity="0.6" />
        {/* Legs */}
        <line x1="30" y1="65" x2="28" y2="78" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" opacity="0.6" />
        <line x1="34" y1="65" x2="36" y2="78" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" opacity="0.6" />
      </g>
      
      {/* Decorative elements - flight/travel arrows */}
      <g opacity="0.3">
        <path d="M 140 30 L 160 20" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
        <polygon points="160,20 165,25 158,28" fill="currentColor" />
      </g>
      <g opacity="0.3">
        <path d="M 145 50 L 165 40" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
        <polygon points="165,40 170,45 163,48" fill="currentColor" />
      </g>
    </svg>
  );
}