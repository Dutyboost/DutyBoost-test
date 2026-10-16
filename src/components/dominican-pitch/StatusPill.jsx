export default function StatusPill({ label, isLive = true }) {
  return (
    <span
      className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider px-3 py-1 rounded-full flex-shrink-0"
      style={{ background: "rgba(255,255,255,0.12)", color: "#f5d0fe" }}
    >
      <span className={`w-2 h-2 rounded-full ${isLive ? "bg-green-400" : "bg-red-400"}`} />
      {label}
    </span>
  );
}