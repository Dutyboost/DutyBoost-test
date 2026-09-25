import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Printer, Download } from "lucide-react";
import { exportBusinessCardPdf } from "@/utils/exportBusinessCardPdf";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import DutyBoostLogo from "@/components/DutyBoostLogo";
import BusinessCardFront from "@/components/business-card/BusinessCardFront";
import BusinessCardBack from "@/components/business-card/BusinessCardBack";

const FIELDS = [
  { key: "name", label: "Full name", placeholder: "Jane Doe" },
  { key: "title", label: "Job title", placeholder: "Partnerships Director" },
  { key: "email", label: "Email", placeholder: "hello@dutyboost.com" },
  { key: "phone", label: "Phone", placeholder: "+31 20 123 4567" },
  { key: "website", label: "Website", placeholder: "dutyboost.com" },
];

const DEFAULT_DATA = {
  email: "hello@dutyboost.com",
  website: "dutyboost.com",
};

function loadSaved(storageKey, initial) {
  const base = { ...DEFAULT_DATA, ...initial };
  if (!storageKey) return base;
  try {
    const saved = localStorage.getItem(storageKey);
    return saved ? { ...base, ...JSON.parse(saved) } : base;
  } catch {
    return base;
  }
}

export default function BusinessCardEditor({ initial, storageKey }) {
  const [data, setData] = useState(() => loadSaved(storageKey, initial));

  useEffect(() => {
    if (!storageKey) return;
    try {
      localStorage.setItem(storageKey, JSON.stringify(data));
    } catch {
      // storage unavailable — card still works for this session
    }
  }, [data, storageKey]);

  const update = (key, value) => setData((d) => ({ ...d, [key]: value }));

  return (
    <div className="min-h-screen bg-background font-body">
      <style>{`
        @page { size: A4; margin: 12mm; }
        @media print {
          .bc-no-print { display: none !important; }
          body { background: #ffffff !important; }
          .bc-sheet { flex-direction: row !important; align-items: flex-start !important; gap: 6mm !important; }
          .bc-sheet .bc-card { border-radius: 0 !important; box-shadow: none !important; }
        }
      `}</style>

      <nav className="bc-no-print sticky top-0 z-50 bg-background/80 backdrop-blur border-b border-border">
        <div className="max-w-5xl mx-auto px-6 h-16 flex items-center justify-between">
          <Link to="/"><DutyBoostLogo height={50} /></Link>
          <Link to="/brand-guidelines" className="text-sm text-muted-foreground hover:text-primary transition-colors">
            ← Brand Guidelines
          </Link>
        </div>
      </nav>

      <div className="max-w-5xl mx-auto px-6 py-12 space-y-10">
        <div className="bc-no-print space-y-3">
          <h1 className="text-4xl font-heading font-bold text-foreground">Business Card</h1>
          <p className="text-muted-foreground max-w-2xl">
            Standard 85 × 55 mm card in the DutyBoost palette. Fill in your details and print — both sides lay out
            side by side on A4.
          </p>
        </div>

        <div className="flex flex-col lg:flex-row gap-10 items-start">
          <div className="bc-no-print w-full lg:w-80 shrink-0 bg-card border border-border rounded-2xl p-6 space-y-4">
            <h2 className="font-heading font-semibold text-foreground">Card details</h2>
            {FIELDS.map((f) => (
              <div key={f.key} className="space-y-1.5">
                <Label htmlFor={`bc-${f.key}`} className="text-xs">{f.label}</Label>
                <Input
                  id={`bc-${f.key}`}
                  value={data[f.key] || ""}
                  placeholder={f.placeholder}
                  onChange={(e) => update(f.key, e.target.value)}
                />
              </div>
            ))}
            <Button onClick={() => window.print()} className="w-full gap-2">
              <Printer className="w-4 h-4" /> Print / PDF
            </Button>
            <Button variant="outline" onClick={() => exportBusinessCardPdf(data)} className="w-full gap-2">
              <Download className="w-4 h-4" /> Download PDF
            </Button>
          </div>

          <div className="bc-sheet flex flex-col gap-6 w-full">
            <div className="bc-card rounded-xl overflow-hidden shadow-lg">
              <BusinessCardFront data={data} />
            </div>
            <div className="bc-card rounded-xl overflow-hidden shadow-lg">
              <BusinessCardBack data={data} />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}