// Anchor with a dock / jetty structure beside it, so the sea-side of the
// Airports & Sea Ports card reads differently from a plain anchor.
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
      <path d="M12 22V8" />
      <path d="M5 12H2a10 10 0 0 0 20 0h-3" />
      <circle cx="12" cy="5" r="3" />
      {/* water line */}
      <path d="M23.4 21.8h2.2M27 21.8h2.4" />
      {/* dock deck */}
      <path d="M23 14.5h8" />
      {/* pilings */}
      <path d="M24.6 14.5V21" />
      <path d="M29.2 14.5V21" />
      {/* dock shed roof */}
      <path d="M24 14.5 26.9 11.2 29.8 14.5" />
    </svg>
  );
}