export default function DemoPill({ label = "Demo", className = "" }) {
  return (
    <span
      className={`inline-flex items-center rounded-full bg-amber-100 text-amber-800 border border-amber-200 px-2 py-0.5 text-[10px] font-semibold uppercase tracking-wider align-middle ${className}`}
    >
      {label}
    </span>
  );
}