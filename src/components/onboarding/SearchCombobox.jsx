import { useEffect, useMemo, useRef, useState } from "react";
import { Input } from "@/components/ui/input";
import { cn } from "@/lib/utils";

/**
 * Text field with a filtered suggestion list. Typing narrows the list, picking
 * an entry fills the field (and anything else the caller needs). Free text is
 * always allowed, so something that is not in the list can still be entered.
 */
// Accents are folded so a name is found however it is typed — "espana" finds
// "España", "curacao" finds "Curaçao".
const fold = (text) =>
  (text || "")
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .toLowerCase();

export default function SearchCombobox({
  value,
  onChange,
  onPick,
  options = [],
  placeholder,
  emptyText = "No match — keep typing to enter it as new",
  className,
}) {
  const [open, setOpen] = useState(false);
  const boxRef = useRef(null);

  useEffect(() => {
    const onDown = (e) => {
      if (boxRef.current && !boxRef.current.contains(e.target)) setOpen(false);
    };
    document.addEventListener("mousedown", onDown);
    return () => document.removeEventListener("mousedown", onDown);
  }, []);

  const matches = useMemo(() => {
    const q = fold(value).trim();
    const list = q
      ? options.filter((o) => fold(`${o.label} ${o.sub || ""}`).includes(q))
      : options;
    // Show the whole list, not a teaser — an airport can carry well over a
    // hundred shops and the team needs to see all of them.
    return list.slice(0, 300);
  }, [value, options]);

  return (
    <div ref={boxRef} className={cn("relative", className)}>
      <Input
        value={value}
        onChange={(e) => { onChange(e.target.value); setOpen(true); }}
        onFocus={() => setOpen(true)}
        placeholder={placeholder}
      />
      {open && (
        <div className="absolute z-50 mt-1 w-full max-h-80 overflow-y-auto bg-popover border border-border rounded-lg shadow-lg">
          {matches.length === 0 ? (
            <p className="px-3 py-3 text-xs text-muted-foreground">{emptyText}</p>
          ) : (
            matches.map((o, i) => (
              <div key={o.key || o.label}>
                {o.group && o.group !== matches[i - 1]?.group && (
                  <p className="px-3 pt-2 pb-1 text-[10px] uppercase tracking-wide text-muted-foreground">
                    {o.group}
                  </p>
                )}
                <button
                  type="button"
                  onClick={() => { (onPick || onChange)(o); setOpen(false); }}
                  className="w-full text-left px-3 py-2 hover:bg-muted"
                >
                  <span className="block text-sm font-medium">{o.label}</span>
                  {o.sub && <span className="block text-xs text-muted-foreground">{o.sub}</span>}
                </button>
              </div>
            ))
          )}
        </div>
      )}
    </div>
  );
}