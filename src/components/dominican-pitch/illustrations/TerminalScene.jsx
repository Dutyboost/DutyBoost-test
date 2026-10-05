// Cover illustration for the Dominican Republic deck.
// A single terminal façade with three arched gateways — one for each airport —
// a plane climbing out of it, and one symbol inside each arch: retail, flight
// and the traveller. Drawn as flat vector shapes so it prints and exports cleanly.

import { ACCENT, AIRLINE, RETAIL } from "../Shared";

const CODES = ["PUJ", "SDQ", "JBQ"];

export default function TerminalScene({ className = "" }) {
  return (
    <svg
      viewBox="0 0 640 360"
      className={className}
      role="img"
      aria-label="Three gateway terminals: Punta Cana, Las Américas and La Isabela"
    >
      <defs>
        <clipPath id="tsClip">
          <rect x="0" y="0" width="640" height="360" rx="22" />
        </clipPath>
      </defs>

      <g clipPath="url(#tsClip)">
        <rect x="0" y="0" width="640" height="360" fill="#eef4ff" />
        <rect x="0" y="306" width="640" height="54" fill="#dde8fa" />

        {/* flight path */}
        <path
          d="M470,86 C420,64 330,66 232,100"
          fill="none"
          stroke={AIRLINE}
          strokeWidth="2"
          strokeDasharray="6 8"
          opacity="0.45"
        />

        {/* aircraft */}
        <g transform="translate(468,44) rotate(-10)">
          <polygon points="0,22 58,0 24,26" fill={AIRLINE} />
          <polygon points="24,26 32,16 44,24" fill="#f0a8b1" />
        </g>

        {/* terminal building */}
        <rect x="70" y="104" width="500" height="202" rx="18" fill="#ffffff" stroke="#cfd9e8" strokeWidth="2" />
        <rect x="70" y="104" width="500" height="26" rx="13" fill={RETAIL} />
        <rect x="70" y="117" width="500" height="13" fill={RETAIL} />
        <rect x="88" y="112" width="118" height="9" rx="4.5" fill="#3b82f6" opacity="0.5" />

        {/* three arched gateways */}
        <path d="M100,306 L100,219 A59,59 0 0 1 218,219 L218,306 Z" fill="#eaf2ff" stroke="#c7d8f2" strokeWidth="2" />
        <path d="M261,306 L261,219 A59,59 0 0 1 379,219 L379,306 Z" fill="#eaf2ff" stroke="#c7d8f2" strokeWidth="2" />
        <path d="M422,306 L422,219 A59,59 0 0 1 540,219 L540,306 Z" fill="#eaf2ff" stroke="#c7d8f2" strokeWidth="2" />

        {/* retail */}
        <path d="M144,248 A15,15 0 0 1 174,248" fill="none" stroke={ACCENT} strokeWidth="5" />
        <rect x="136" y="246" width="46" height="44" rx="7" fill={ACCENT} />
        <circle cx="184" cy="242" r="14" fill="#f59e0b" />
        <text
          x="184"
          y="247"
          textAnchor="middle"
          fontSize="15"
          fontWeight="700"
          fill="#ffffff"
          fontFamily="Inter, Helvetica, Arial, sans-serif"
        >
          %
        </text>

        {/* flight */}
        <path
          d="M300,150 C300,182 310,204 316,236"
          fill="none"
          stroke={ACCENT}
          strokeWidth="2"
          strokeDasharray="5 7"
          opacity="0.6"
        />
        <polygon points="288,272 348,240 316,286" fill={ACCENT} />
        <polygon points="316,286 326,272 338,280" fill="#93c5fd" />

        {/* the traveller */}
        <circle cx="470" cy="256" r="12" fill={RETAIL} />
        <path d="M450,292 A20,20 0 0 1 490,292 Z" fill={RETAIL} />
        <rect x="492" y="252" width="24" height="36" rx="5" fill="#94a3b8" />
        <rect x="498" y="245" width="12" height="7" rx="3" fill="#64748b" />

        {/* gateway codes */}
        {CODES.map((code, i) => (
          <text
            key={code}
            x={159 + i * 161}
            y="338"
            textAnchor="middle"
            fontSize="14"
            fontWeight="700"
            letterSpacing="1.5"
            fill="#64748b"
            fontFamily="Inter, Helvetica, Arial, sans-serif"
          >
            {code}
          </text>
        ))}
      </g>
    </svg>
  );
}