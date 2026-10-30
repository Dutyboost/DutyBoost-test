// Anchor with a dock / jetty station beside it, so the sea-side of the
// Airports & Sea Ports card reads differently from a plain anchor.
// The dock is deliberately the dominant element.
export default function AnchorDockIcon({ className }) {
  return (
    <svg
      viewBox="0 0 32 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.8"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
      aria-hidden="true"
    >
      {/* anchor */}
      <g transform="translate(1 6.84) scale(0.68)" strokeWidth="2.65">
        <path d="M12 22V8" />
        <path d="M5 12H2a10 10 0 0 0 20 0h-3" />
        <circle cx="12" cy="5" r="3" />
      </g>
      {/* water line */}
      <path d="M21.8 21.4h2.2M25.2 21.4h1.6M28 21.4h2.4" />
      {/* dock deck */}
      <path d="M21.5 13.2h9" />
      {/* pilings */}
      <path d="M23.2 13.2V21.3" />
      <path d="M28.8 13.2V21.3" />
      {/* dock station building */}
      <path d="M23.6 13.2V10.4h4.8v2.8" />
      <path d="M22.9 10.4 26 6.2 29.1 10.4" />
      <path d="M25.4 12.2h1.2" />
    </svg>
  );
}