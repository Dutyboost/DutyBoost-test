// Train on a track — a train carriage sitting on rails with sleepers.
// Deliberately different from the plain train carriage used on the Travel Retail Partners card.
export default function TrainOnTrackIcon({ className }) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.8"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
      aria-hidden="true"
    >
      {/* train body */}
      <path d="M7.5 9.5v-3A3 3 0 0 1 10.5 3.5h3a3 3 0 0 1 3 3v6a1.5 1.5 0 0 1-1.5 1.5h-6A1.5 1.5 0 0 1 7.5 12.5Z" />
      {/* window */}
      <path d="M10 6.4h4" />
      {/* rails with sleepers */}
      <path d="M3 16.6h18" />
      <path d="M3 20.6h18" />
      <path d="M6.5 15.6v6M12 15.6v6M17.5 15.6v6" />
    </svg>
  );
}