// Plane taking off with an air traffic control tower beside the apron.
// Distinguishes the Airports & Sea Ports card from the plain plane used elsewhere.
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
      <path d="M2 22h23.5" />
      {/* plane taking off */}
      <path d="M6.36 17.4 4 17l-2-4 1.1-.55a2 2 0 0 1 1.8 0l.17.1a2 2 0 0 0 1.8 0L8 12 5 6l.9-.45a2 2 0 0 1 2.09.2l4.02 3a2 2 0 0 0 2.1.2l4.19-2.06a2.41 2.41 0 0 1 1.73-.17L21 7a1.4 1.4 0 0 1 .87 1.99l-.38.76c-.23.46-.6.84-1.07 1.08L7.58 17.2a2 2 0 0 1-1.22.18Z" />
      {/* control tower */}
      <path d="M26.4 22 26.9 14h2.2l.5 8" />
      <path d="M25.9 14h4.2v-2.8h-4.2z" />
      <path d="M25.4 11.2h5.2" />
      <path d="M28 11.2V8" />
      <path d="M27.1 12.6h1.8" />
    </svg>
  );
}