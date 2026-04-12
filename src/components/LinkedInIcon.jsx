export default function LinkedInIcon({ className = "w-7 h-7" }) {
  return (
    <svg
      className={className}
      viewBox="0 0 72 72"
      xmlns="http://www.w3.org/2000/svg"
      aria-label="LinkedIn"
    >
      <rect width="72" height="72" rx="12" fill="hsl(220, 100%, 56%)" />
      <circle cx="24" cy="22" r="5" fill="white" />
      <rect x="19" y="31" width="10" height="24" rx="1" fill="white" />
      <path
        d="M38 31h9v3.3c1.3-2 3.8-3.8 7.5-3.8 7 0 9.5 4.5 9.5 11v13.5h-10V43c0-3.2-1.1-5.3-3.8-5.3-2.8 0-4.2 2-4.2 5.3v12H38V31z"
        fill="white"
      />
    </svg>
  );
}