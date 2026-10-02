import { useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { FileText } from "lucide-react";

/**
 * Terms & Conditions card for the retailer POS-integration authorisation.
 * The acceptance box must be ticked before the document can be downloaded;
 * the link opens the clauses, which cover this authorisation only.
 */
export default function RetailerPosTerms({ strings: s, checked, onChange }) {
  const [open, setOpen] = useState(false);

  return (
    <div className="bg-card border border-border rounded-2xl p-6 space-y-4">
      <h3 className="font-heading font-semibold flex items-center gap-2">
        <FileText className="w-4 h-4 text-primary shrink-0" /> {s.sec_terms}
      </h3>
      <p className="text-sm text-muted-foreground">{s.terms_intro}</p>

      <label
        className={`flex items-start gap-3 rounded-xl border p-3 cursor-pointer transition-colors ${
          checked ? "border-primary bg-primary/5" : "border-border hover:border-primary/50"
        }`}
      >
        <input
          type="checkbox"
          className="mt-0.5 accent-primary"
          checked={checked}
          onChange={(e) => onChange(e.target.checked)}
        />
        <span className="text-sm text-foreground">
          {s.terms_accept_prefix}
          <button
            type="button"
            onClick={(e) => {
              e.preventDefault();
              e.stopPropagation();
              setOpen(true);
            }}
            className="text-primary underline underline-offset-2 font-medium hover:text-primary/80"
          >
            {s.terms_link}
          </button>
          {s.terms_accept_suffix}
        </span>
      </label>

      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent className="max-w-2xl max-h-[85vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle className="text-lg">{s.terms_title}</DialogTitle>
          </DialogHeader>
          <div className="space-y-4 text-sm">
            <p className="text-muted-foreground leading-relaxed">{s.terms_scope}</p>
            {s.terms_clauses.map((c, i) => (
              <div key={c.title} className="space-y-1">
                <p className="font-semibold text-foreground">
                  {i + 1}. {c.title}
                </p>
                <p className="text-muted-foreground leading-relaxed">{c.body}</p>
              </div>
            ))}
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
}