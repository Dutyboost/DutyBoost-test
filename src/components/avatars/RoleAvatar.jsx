export default function RoleAvatar({ person, size = 40, active = false, className = "" }) {
  if (!person) return null;

  return (
    <span
      className={`relative inline-flex shrink-0 ${className}`}
      style={{ width: size, height: size }}
    >
      <img
        src={person.avatar}
        alt={`${person.person} — ${person.personRole}`}
        className={`w-full h-full rounded-full object-cover ring-2 ${
          active ? "ring-indigo-400" : "ring-slate-700/70"
        }`}
      />
      {active && (
        <span className="absolute -bottom-0.5 -right-0.5 w-2.5 h-2.5 rounded-full bg-emerald-400 border-2 border-slate-950" />
      )}
    </span>
  );
}