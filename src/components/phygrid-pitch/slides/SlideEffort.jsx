import { Search, Code2, ShieldCheck, Rocket, XCircle, Clock } from "lucide-react";
import { SlideWrapper, GridBg } from "@/components/phygrid-pitch/Shared";

const PHASES = [
  {
    n: "01",
    title: "Discovery & Scope",
    effort: "~2 days",
    Icon: Search,
    points: [
      "Identify the transaction-validation touchpoint in the existing checkout flow",
      "Agree the single API request/response contract",
      "Confirm supported POS versions and the pilot store footprint",
    ],
  },
  {
    n: "02",
    title: "Build & Connect",
    effort: "~3–5 days",
    Icon: Code2,
    points: [
      "One API call — send the validated transaction, receive the discount and settlement back",
      "Add a DutyBoost toggle and redemption screen to the POS dashboard",
      "No changes to payment, ERP, inventory or pricing systems",
    ],
  },
  {
    n: "03",
    title: "Test & Certify",
    effort: "~2 days",
    Icon: ShieldCheck,
    points: [
      "Sandbox validation against DutyBoost test DutyCredits",
      "Edge cases: partial refunds, voids, multi-item baskets",
      "Joint sign-off before production activation",
    ],
  },
  {
    n: "04",
    title: "Activate & Scale",
    effort: "Same day",
    Icon: Rocket,
    points: [
      "Switch it on — every store running the POS goes live instantly",
      "Zero downtime; no store-level reconfiguration required",
      "Rolls out to further retailers, airports and markets with no rework",
    ],
  },
];

export default function SlideEffort() {
  return (
    <SlideWrapper>
      <div className="flex-1 flex flex-col justify-center px-5 py-6 md:px-12 md:py-6 relative">
        <GridBg />
        <div className="relative z-10">
          <div className="mb-5">
            <span className="text-blue-600 text-sm font-semibold uppercase tracking-widest">Integration Effort</span>
            <h2 className="text-xl md:text-3xl font-heading font-bold text-[#0a0f1e] mt-2">
              What Phygrid <span className="text-blue-600">Actually Needs to Do</span>
            </h2>
            <p className="text-slate-500 mt-1 text-sm">
              A single API call — one request, one response. Not a platform migration, and no replacement of the
              checkout, payment or inventory systems you already run.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-5">
            {PHASES.map((p) => (
              <div key={p.n} className="bg-slate-50 border border-slate-200 rounded-2xl p-5 flex flex-col">
                <div className="flex items-center justify-between mb-3">
                  <span className="text-2xl font-bold text-blue-200">{p.n}</span>
                  <p.Icon className="w-6 h-6 text-blue-600" />
                </div>
                <div className="text-slate-800 font-bold mb-1">{p.title}</div>
                <div className="text-blue-600 text-xs font-semibold mb-3">{p.effort}</div>
                <ul className="space-y-2 flex-1">
                  {p.points.map((pt, i) => (
                    <li key={i} className="flex items-start gap-2">
                      <div className="w-1.5 h-1.5 rounded-full bg-blue-500 mt-1.5 flex-shrink-0" />
                      <span className="text-slate-600 text-xs leading-snug">{pt}</span>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            <div className="bg-slate-50 border border-slate-200 rounded-2xl p-5">
              <h3 className="font-bold text-slate-800 mb-3">
                What This Does <span className="text-red-500">Not</span> Require
              </h3>
              <ul className="space-y-2">
                {[
                  "No replacement of POS, payment terminals or ERP",
                  "No changes to pricing, merchandising or inventory logic",
                  "No store-level hardware or staff retraining",
                  "No data migration or system downtime",
                  "No lock-in — it can be switched off anytime",
                ].map((item, i) => (
                  <li key={i} className="flex items-start gap-2">
                    <XCircle className="w-4 h-4 text-red-500 flex-shrink-0 mt-0.5" />
                    <span className="text-slate-600 text-sm">{item}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div className="bg-gradient-to-br from-blue-600 to-indigo-700 rounded-2xl p-5 text-white">
              <div className="flex items-center gap-2 mb-2">
                <Clock className="w-5 h-5" />
                <h3 className="font-bold">Total Effort: ~1–2 Weeks, One API Call</h3>
              </div>
              <p className="text-blue-50 text-sm leading-relaxed">
                The whole integration is one API call — one request with the validated transaction, one response
                with the discount and the settlement. One engineering stream builds it once; every connected store
                is then live.
              </p>
              <div className="grid grid-cols-3 gap-3 mt-4 text-center">
                {[
                  { val: "1", label: "API Call" },
                  { val: "1", label: "Toggle" },
                  { val: "0", label: "System Replacements" },
                ].map((s) => (
                  <div key={s.label} className="bg-white/10 rounded-xl p-3">
                    <div className="text-white font-bold text-lg">{s.val}</div>
                    <div className="text-blue-100 text-xs mt-1">{s.label}</div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </SlideWrapper>
  );
}