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
      <path d="M7.5 9.5v-3A3 3 0 0 1 10.5 3.5h3a3 3 0 0 1 3 3v5.5a1.5 1.5 0 0 1-1.5 1.5h-6A1.5 1.5 0 0 1 7.5 12.5Z" />
      {/* window */}
      <path d="M10 6.4h4" />
      {/* rails running under the train, receding in perspective */}
      <path d="M9.9 14.4 6.4 22.2" />
      <path d="M14.1 14.4 17.6 22.2" />
      {/* sleepers under the rails */}
      <path d="M8.3 16.4h7.4" />
      <path d="M7.4 19h9.2" />
      <path d="M6.5 21.6h11" />
      {/* station building beside the platform */}
      <path d="M1 15h5.4" />
      <path d="M1.8 15V9.8h3.6V15" />
      <path d="M1.2 9.8 3.6 7.2 6 9.8" />
      <path d="M2.9 11.9h1.4v1.4H2.9z" />
    </svg>
  );
}