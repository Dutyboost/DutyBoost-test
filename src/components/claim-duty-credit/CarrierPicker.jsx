import { useState, useMemo, useRef, useEffect } from "react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Building2, CheckCircle2 } from "lucide-react";

/**
 * Company field with suggestions for a travel vertical (cruise line, rail
 * operator, coach operator, rental company, hotel group). Typing is always
 * allowed — the list is a shortcut, not a constraint.
 */
export default function CarrierPicker({ options, value, onChange, label, placeholder }) {
  const [open, setOpen] = useState(false);
  const boxRef = useRef(null);

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (boxRef.current && !boxRef.current.contains(e.target)) setOpen(false);
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const filtered = useMemo(() => {
    const q = value.trim().toLowerCase();
    if (!q) return options.slice(0, 8);
    return options
      .filter(
        (o) =>
          o.name.toLowerCase().includes(q) ||
          (o.country || "").toLowerCase().includes(q)
      )
      .slice(0, 8);
  }, [options, value]);

  return (
    <div>
      <Label className="text-sm font-semibold mb-2 block">{label}</Label>
      <div ref={boxRef} className="relative">
        <div className="relative">
          <Building2 className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
          <Input
            type="text"
            value={value}
            onChange={(e) => {
              onChange(e.target.value);
              setOpen(true);
            }}
            onFocus={() => setOpen(true)}
            placeholder={placeholder}
            autoComplete="off"
            className="pl-10 h-12 text-base"
          />
          {value && !open && (
            <CheckCircle2 className="absolute right-3 top-1/2 -translate-y-1/2 w-5 h-5 text-green-500" />
          )}
        </div>
        {open && filtered.length > 0 && (
          <div className="absolute z-50 mt-1 w-full max-h-64 overflow-y-auto bg-white border border-border rounded-xl shadow-lg">
            {filtered.map((o) => (
              <button
                key={o.name}
                type="button"
                onClick={() => {
                  onChange(o.name);
                  setOpen(false);
                }}
                className="w-full flex items-center gap-3 px-4 py-2.5 text-left hover:bg-muted transition-colors border-b border-border last:border-b-0"
              >
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-medium truncate">{o.name}</p>
                  {o.country && (
                    <p className="text-xs text-muted-foreground">{o.country}</p>
                  )}
                </div>
              </button>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}