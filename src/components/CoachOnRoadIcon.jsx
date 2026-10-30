// Touring coach — side profile with raked windshield, window band, luggage bay and wheels.
export default function CoachOnRoadIcon({ className }) {
  return (
    <svg
      viewBox="2.6 6.5 18.6 11.6"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.4"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
      aria-hidden="true"
    >
      {/* body with raked front */}
      <path d="M3 9c0-1.1.9-2 2-2h11.1c.7 0 1.3.3 1.7.9l2.6 3.5c.3.4.4.9.4 1.4v1.3c0 .8-.6 1.4-1.4 1.4H4.4C3.6 15.5 3 14.9 3 14.1z" />
      {/* windshield */}
      <path d="M17.7 8.4 20.1 11.6" />
      {/* side windows */}
      <path d="M4.6 8.6h11.5" />
      <path d="M4.6 11.7h11.5" />
      <path d="M8.3 8.6v3.1" />
      <path d="M12 8.6v3.1" />
      {/* luggage bay panel */}
      <path d="M4.2 13.5h12.7" />
      {/* wheels */}
      <circle cx="6.3" cy="15.8" r="1.85" />
      <circle cx="17.3" cy="15.8" r="1.85" />
      <circle cx="6.3" cy="15.8" r="0.5" />
      <circle cx="17.3" cy="15.8" r="0.5" />
    </svg>
  );
}