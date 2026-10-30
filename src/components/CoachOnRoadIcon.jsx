// Touring coach on a motorway — a coach sitting on a road receding in perspective.
// Companion to TrainOnTrackIcon: the road equivalent for touring-car partners.
export default function CoachOnRoadIcon({ className }) {
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
      {/* coach body */}
      <path d="M6 6.6a3 3 0 0 1 3-3h6a3 3 0 0 1 3 3v3.6a1.6 1.6 0 0 1-1.6 1.6H7.6A1.6 1.6 0 0 1 6 10.2Z" />
      {/* windscreen */}
      <path d="M9 6.6h6" />
      {/* wheels */}
      <circle cx="8.8" cy="12.9" r="1.1" />
      <circle cx="15.2" cy="12.9" r="1.1" />
      {/* motorway edges receding in perspective */}
      <path d="M9.9 15.6 6.4 22.2" />
      <path d="M14.1 15.6 17.6 22.2" />
      {/* centre lane markings */}
      <path d="M12 16.4v1.2" />
      <path d="M12 19v1.2" />
      <path d="M12 21.2v1" />
    </svg>
  );
}