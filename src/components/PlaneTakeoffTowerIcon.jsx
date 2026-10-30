// Plane taking off with an air traffic control tower beside the apron.
// The tower is deliberately the dominant element so the Airports & Sea Ports
// card reads differently from the plain plane used on the other cards.
export default function PlaneTakeoffTowerIcon({ className }) {
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
      {/* apron / runway edge */}
      <path d="M1.8 21.8h26.7" />
      {/* plane taking off */}
      <g transform="translate(0.8 6.84) scale(0.68)" strokeWidth="2.65">
        <path d="M6.36 17.4 4 17l-2-4 1.1-.55a2 2 0 0 1 1.8 0l.17.1a2 2 0 0 0 1.8 0L8 12 5 6l.9-.45a2 2 0 0 1 2.09.2l4.02 3a2 2 0 0 0 2.1.2l4.19-2.06a2.41 2.41 0 0 1 1.73-.17L21 7a1.4 1.4 0 0 1 .87 1.99l-.38.76c-.23.46-.6.84-1.07 1.08L7.58 17.2a2 2 0 0 1-1.22.18Z" />
      </g>
      {/* control tower */}
      <path d="M23.5 21.8 24.6 12h2.8l1.1 9.8" />
      <path d="M23.2 12h5.6V8.9h-5.6z" />
      <path d="M22.7 8.9h6.6" />
      <path d="M26 8.9V4.6" />
      <path d="M24.7 6.6h2.6" />
      <path d="M24.6 10.5h2.8" />
    </svg>
  );
}