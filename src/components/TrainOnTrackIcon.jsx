// Train on a track with a station building beside the platform.
// Deliberately different from the plain train carriage used on the Travel Retail Partners card.
// The station building is the dominant element, the train sits smaller on the track.
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
      {/* station building */}
      <path d="M1.6 21.5V10.8h9.6v10.7" />
      <path d="M0.8 10.8 6.4 4.4 12 10.8" />
      <path d="M3.2 13.4h2.4v2.2H3.2z" />
      <path d="M7.4 13.4h2.4v2.2H7.4z" />
      <path d="M5.2 21.5v-3.6h2.4v3.6" />
      {/* train carriage on the track */}
      <g transform="translate(10.55 6.9) scale(0.68)" strokeWidth="2.65">
        <path d="M7.5 9.5v-3A3 3 0 0 1 10.5 3.5h3a3 3 0 0 1 3 3v5.5a1.5 1.5 0 0 1-1.5 1.5h-6A1.5 1.5 0 0 1 7.5 12.5Z" />
        <path d="M10 6.4h4" />
        {/* rails running under the train, receding in perspective */}
        <path d="M9.9 14.4 6.4 22.2" />
        <path d="M14.1 14.4 17.6 22.2" />
        {/* sleepers under the rails */}
        <path d="M8.3 16.4h7.4" />
        <path d="M7.4 19h9.2" />
        <path d="M6.5 21.6h11" />
      </g>
    </svg>
  );
}