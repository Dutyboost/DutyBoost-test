export default function DemoBadge({ large = false }) {
  if (large) {
    return (
      <div className="flex justify-center">
        <span className="inline-flex items-center gap-2 text-sm font-bold uppercase tracking-widest text-amber-700 bg-amber-100 border border-amber-300 px-5 py-2 rounded-full shadow-sm">
          <span className="w-2 h-2 rounded-full bg-amber-500 animate-pulse" />
          Demo Mode
        </span>
      </div>
    );
  }
  return (
    <span className="inline-flex items-center gap-1.5 text-xs font-bold uppercase tracking-widest text-amber-700 bg-amber-100 border border-amber-200 px-3 py-1 rounded-full">
      <span className="w-1.5 h-1.5 rounded-full bg-amber-500 animate-pulse" />
      Demo
    </span>
  );
}