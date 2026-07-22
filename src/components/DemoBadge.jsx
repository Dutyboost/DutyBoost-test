export default function DemoBadge() {
  return (
    <span className="inline-flex items-center gap-1.5 text-xs font-bold uppercase tracking-widest text-amber-700 bg-amber-100 border border-amber-200 px-3 py-1 rounded-full">
      <span className="w-1.5 h-1.5 rounded-full bg-amber-500 animate-pulse" />
      Demo
    </span>
  );
}