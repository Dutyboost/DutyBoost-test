import { Cpu, Plane, User, Briefcase, Building2, CheckCircle, XCircle } from "lucide-react";
import { SlideWrapper, GridBg } from "./Shared";

const stakeholders = [
  {
    Icon: Cpu,
    name: "POS Providers",
    iconBg: "bg-purple-600",
    pros: [
      "New transaction revenue (0.25% per qualifying sale)",
      "Strategic position as the activation layer",
      "Single integration deploys across many retailers",
      "Strengthens retailer relationships",
      "Differentiation in competitive POS market",
    ],
    cons: [
      "Technical integration effort required upfront",
      "Must handle validation, discount & settlement reporting",
      "Revenue per transaction is modest — needs volume",
      "Depends on retailer adoption and upstream activation",
    ],
  },
  {
    Icon: Plane,
    name: "Travel Partners",
    iconBg: "bg-indigo-600",
    pros: [
      "New ancillary revenue (0.5% per qualifying transaction)",
      "Enhanced booking value with tangible benefit",
      "Differentiated offering vs. competitors",
      "No operational change — existing booking flows",
      "Strengthens traveller engagement without loyalty points",
    ],
    cons: [
      "Requires integration to distribute DutyCredits",
      "Revenue per transaction modest — needs scale",
      "Depends on retailer and POS coverage at destinations",
      "Traveller activation depends on upstream partner participation",
    ],
  },
  {
    Icon: User,
    name: "Traveller",
    iconBg: "bg-green-600",
    pros: [
      "Direct financial value — €1 to €60 per basket",
      "No app to download, no loyalty card required",
      "Real discounts at stores they already walk past",
      "Pre-activated with purchase intent before arrival",
      "Free benefit — no cost to the traveller",
    ],
    cons: [
      "Must be reached by a Travel or Corporate Partner",
      "Requires a participating retailer at their airport",
      "Discount varies by basket size and tier",
      "Benefit expires — must redeem within validity window",
    ],
  },
  {
    Icon: Briefcase,
    name: "Corporate Partners",
    iconBg: "bg-amber-600",
    pros: [
      "Cost-recovery stream from existing business travel",
      "Employee benefit at no company cost",
      "Company-paid expenses drive predictable redemption",
      "Data visibility on employee airport spending",
      "Mitigates the initial retailer revenue dip",
    ],
    cons: [
      "Requires T&E platform integration",
      "Depends on retailer coverage at transit airports",
      "Policy alignment needed (limits, categories)",
      "Scale depends on number of business travellers",
    ],
  },
  {
    Icon: Building2,
    name: "Airport Partners",
    iconBg: "bg-violet-600",
    pros: [
      "Direct revenue growth — concession rate on incremental sales",
      "No upfront investment — grows existing revenue base",
      "Non-aeronautical revenue without capital expenditure",
      "Strengthens airport retail attractiveness",
      "Performance-based — earns more as conversion increases",
    ],
    cons: [
      "Requires supporting retailer POS activation",
      "Benefits material only past MAG threshold",
      "Depends on upstream traveller activation",
      "Coordination across multiple concessionaires needed",
    ],
  },
];

export default function SlideStakeholderPrimary() {
  return (
    <SlideWrapper>
      <div className="flex-1 flex flex-col justify-center px-5 py-6 md:px-12 md:py-6 relative">
        <GridBg />
        <div className="relative z-10">
          <div className="mb-5">
            <span className="text-blue-600 text-sm font-semibold uppercase tracking-widest">Ecosystem — Primary Partners</span>
            <h2 className="text-xl md:text-3xl font-heading font-bold text-[#0a0f1e] mt-2">
              Five Primary Stakeholders <span className="text-blue-600">— Pros &amp; Cons</span>
            </h2>
            <p className="text-slate-500 mt-1 text-sm">Each primary partner earns from the same validated transaction — with distinct value and risk profiles.</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {stakeholders.map((s) => (
              <div key={s.name} className="bg-white border border-slate-200 rounded-2xl p-4 flex flex-col shadow-sm">
                <div className="flex items-center gap-3 mb-3">
                  <div className={`w-10 h-10 rounded-full ${s.iconBg} text-white flex items-center justify-center flex-shrink-0`}>
                    <s.Icon className="w-5 h-5" />
                  </div>
                  <h3 className="font-bold text-slate-800 text-sm">{s.name}</h3>
                </div>
                <div className="space-y-1 mb-2">
                  {s.pros.slice(0, 3).map((p, i) => (
                    <div key={i} className="flex items-start gap-1.5">
                      <CheckCircle className="w-3.5 h-3.5 text-green-600 flex-shrink-0 mt-0.5" />
                      <span className="text-slate-600 text-xs leading-snug">{p}</span>
                    </div>
                  ))}
                </div>
                <div className="border-t border-slate-100 pt-2 mt-auto">
                  {s.cons.slice(0, 2).map((c, i) => (
                    <div key={i} className="flex items-start gap-1.5">
                      <XCircle className="w-3.5 h-3.5 text-red-400 flex-shrink-0 mt-0.5" />
                      <span className="text-slate-500 text-xs leading-snug">{c}</span>
                    </div>
                  ))}
                </div>
              </div>
            ))}
            <div className="bg-gradient-to-br from-blue-600 to-indigo-700 rounded-2xl p-4 text-white flex flex-col justify-center">
              <h3 className="font-bold text-lg mb-2">One Transaction.</h3>
              <h3 className="font-bold text-lg mb-3">Five Beneficiaries.</h3>
              <p className="text-blue-50 text-sm leading-relaxed">
                Every validated DutyBoost transaction creates value for all five primary partners simultaneously — the traveller saves, the retailer earns, the POS provider earns, the travel/corporate partner earns, and the airport earns more concession revenue.
              </p>
            </div>
          </div>
        </div>
      </div>
    </SlideWrapper>
  );
}