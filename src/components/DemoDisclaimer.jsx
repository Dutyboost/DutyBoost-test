import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import { Info, X } from "lucide-react";

const STORAGE_KEY = "dutyboost_demo_disclaimer_dismissed_v1";

// Routes that are the authenticated app shell (real operator data lives there)
// — the demo disclaimer is only relevant on public-facing pages.
const AUTHED_PREFIXES = [
  "/dashboard",
  "/vouchers",
  "/retailers",
  "/travel-partners",
  "/admin",
  "/admin-dashboard",
  "/retailer-dashboard",
  "/scan-redeem",
  "/retailer-scan",
  "/leads-admin",
  "/survey-dashboard",
  "/travel-partner-integration",
];

export default function DemoDisclaimer() {
  const location = useLocation();
  const [hidden, setHidden] = useState(true);

  useEffect(() => {
    const isAuthed = AUTHED_PREFIXES.some((p) => location.pathname.startsWith(p));
    const dismissed = localStorage.getItem(STORAGE_KEY) === "1";
    setHidden(isAuthed || dismissed);
  }, [location.pathname]);

  if (hidden) return null;

  const dismiss = () => {
    localStorage.setItem(STORAGE_KEY, "1");
    setHidden(true);
  };

  return (
    <div className="fixed bottom-0 inset-x-0 z-40 print:hidden">
      <div className="mx-auto max-w-5xl m-3 rounded-lg border border-amber-200 bg-amber-50/95 backdrop-blur px-4 py-2.5 shadow-lg flex items-start gap-2.5">
        <Info className="w-4 h-4 text-amber-600 mt-0.5 shrink-0" />
        <p className="text-xs text-amber-900 leading-snug flex-1">
          <span className="font-semibold">Demo notice:</span> All data, figures,
          partner names, and performance metrics shown on DutyBoost — including
          Travel Partner and Airport Retailer showcases, calculators, and
          dashboards — are for demonstration purposes only and do not represent
          real transactions, partnerships, or financial results.
        </p>
        <button
          onClick={dismiss}
          aria-label="Dismiss demo notice"
          className="text-amber-700 hover:text-amber-900 transition-colors mt-0.5"
        >
          <X className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
}