// Touring coach — side view, same horizontal orientation as the car rental icon.
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
      <path d="M4 16h16a1 1 0 0 0 1-1V9.5A1.5 1.5 0 0 0 19.5 8h-15A1.5 1.5 0 0 0 3 9.5V15a1 1 0 0 0 1 1Z" />
      {/* side windows */}
      <path d="M6 10.9h4.2" />
      <path d="M12.4 10.9h4.6" />
      {/* wheels */}
      <circle cx="7.6" cy="17.6" r="1.6" />
      <circle cx="16.4" cy="17.6" r="1.6" />
    </svg>
  );
}