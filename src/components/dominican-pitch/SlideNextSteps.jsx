import { Landmark, Handshake, Users, PlayCircle, Rocket } from "lucide-react";
import { GOV, RETAIL, SlideShell } from "./Shared";

const STEPS = [
  {
    Icon: Landmark,
    when: "Today",
    title: "Briefing and endorsement",
    body: "The Embassy reviews the model with the DutyBoost team and confirms the country-level interest.",
  },
  {
    Icon: Handshake,
    when: "Weeks 1–4",
    title: "Introductions",
    body: "The Embassy opens doors to the operators of the three gateways, the retail concessionaires and the six carriers.",
  },
  {
    Icon: Users,
    when: "Weeks 4–8",
    title: "A convening session in Santo Domingo",
    body: "One room, one agenda: operators, retailers and carriers hear the model together, at the Embassy's invitation.",
  },
  {
    Icon: PlayCircle,
    when: "Months 3–6",
    title: "A single-gateway pilot",
    body: "One airport, one retail group, one carrier. Ninety days, no upfront cost, no system replaced.",
  },
  {
    Icon: Rocket,
    when: "Months 6–12",
    title: "National rollout",
    body: "Punta Cana, Las Américas and La Isabela live, and the Dominican Republic as the Caribbean template.",
  },
];

export default function SlideNextSteps() {
  return (
    <SlideShell
      eyebrow="Next Steps"
      eyebrowColor={GOV}
      title={
        <>
          Five Steps. <span style={{ color: GOV }}>The First One Is This Room.</span>
        </>
      }
      subtitle="No decision is required from the Dominican Republic today beyond interest. Everything that follows is a private commercial conversation between DutyBoost and the parties in the market."
    >
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-3">
        {STEPS.map((s) => (
          <div key={s.title} className="bg-slate-50 border border-slate-200 rounded-2xl p-4 flex flex-col">
            <s.Icon className="w-6 h-6 mb-2" style={{ color: GOV }} />
            <div className="text-[11px] font-bold uppercase tracking-wide text-slate-400">{s.when}</div>
            <h3 className="font-bold text-[#0a0f1e] text-sm mt-1 mb-2">{s.title}</h3>
            <p className="text-slate-600 text-xs leading-relaxed">{s.body}</p>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 mt-4">
        <div className="bg-teal-50 border border-teal-200 rounded-2xl p-5">
          <h3 className="font-bold mb-3" style={{ color: GOV }}>
            What we ask of the Embassy
          </h3>
          <div className="space-y-2 text-sm">
            {[
              "An endorsement of the model as a private-sector opportunity for the country",
              "Introductions to the three airport operators and the retail concessionaires",
              "Introductions to the six carriers active on the Dominican market",
              "Support for one convening session in Santo Domingo",
            ].map((item) => (
              <div key={item} className="flex items-start gap-2">
                <span className="text-teal-600 font-bold">→</span>
                <span className="text-slate-700">{item}</span>
              </div>
            ))}
          </div>
        </div>

        <div className="rounded-2xl p-5 text-white" style={{ background: RETAIL }}>
          <h3 className="font-bold mb-2">What we ask of nobody</h3>
          <p className="text-blue-100 text-sm leading-relaxed">
            No public money, no legislation, no change to airport concessions and no cost to the travelling
            public. DutyBoost brings the technology, the carrier relationships and the operating model. The
            Dominican Republic brings what it already has: the busiest air market in the Caribbean, three
            world-class gateways, and an embassy willing to open the first door.
          </p>
        </div>
      </div>
    </SlideShell>
  );
}