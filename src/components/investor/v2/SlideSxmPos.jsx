import { Cpu, MessageSquare, CheckCircle, Clock, ArrowRight } from "lucide-react";
import { SlideWrapper, GridBg } from "./Shared";

export default function SlideSxmPos() {
  return (
    <SlideWrapper>
      <div className="flex-1 flex flex-col justify-center px-5 py-6 md:px-12 md:py-6 relative">
        <GridBg />
        <div className="relative z-10">
          <div className="mb-5">
            <span className="text-blue-600 text-sm font-semibold uppercase tracking-widest">Sint Maarten — POS Integration</span>
            <h2 className="text-xl md:text-3xl font-heading font-bold text-[#0a0f1e] mt-2">
              Conversations with <span className="text-blue-600">Wagos &amp; Antek</span>
            </h2>
            <p className="text-slate-500 mt-1 text-sm">NCR CounterPoint integrators and support partners serving retailers at Princess Juliana International Airport — the technical entry point for DutyBoost at SXM.</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {[
              {
                name: "Wagos",
                role: "NCR CounterPoint Integrator & Support Partner — Trinidad & Tobago",
                status: "Active Conversation",
                statusColor: "bg-green-100 text-green-700 border-green-300",
                points: [
                  "Trinidad & Tobago-based NCR CounterPoint business partner — not the POS provider, but the integrator and support partner",
                  "Configures, deploys, and supports NCR CounterPoint across Trinidad, Tobago, and the wider Caribbean",
                  "Discussed DutyBoost as a toggle feature within existing NCR CounterPoint workflows",
                  "Wagos-supported retailers can opt-in per store via toggle activation",
                ],
              },
              {
                name: "Antek",
                role: "NCR CounterPoint System Integrator & Support Partner — Sint Maarten",
                status: "Active Conversation",
                statusColor: "bg-green-100 text-green-700 border-green-300",
                points: [
                  "Sint Maarten's NCR CounterPoint system integrator and support partner for 25+ years",
                  "Services Sint Maarten (SXM) and neighboring Caribbean islands",
                  "Reviewed the non-invasive, performance-based model",
                  "Confirmed technical feasibility of DutyCredit validation at NCR CounterPoint checkout",
                ],
              },
            ].map((p) => (
              <div key={p.name} className="bg-slate-50 border border-slate-200 rounded-2xl p-6">
                <div className="flex items-center justify-between mb-3">
                  <div className="flex items-center gap-3">
                    <div className="w-12 h-12 rounded-full bg-purple-600 text-white flex items-center justify-center">
                      <Cpu className="w-6 h-6" />
                    </div>
                    <div>
                      <h3 className="font-bold text-slate-800 text-lg">{p.name}</h3>
                      <div className="text-slate-500 text-xs">{p.role}</div>
                    </div>
                  </div>
                  <span className={`text-xs font-semibold px-3 py-1 rounded-full border ${p.statusColor}`}>{p.status}</span>
                </div>
                <ul className="space-y-2">
                  {p.points.map((pt, i) => (
                    <li key={i} className="flex items-start gap-2">
                      <CheckCircle className="w-4 h-4 text-blue-600 flex-shrink-0 mt-0.5" />
                      <span className="text-slate-600 text-sm">{pt}</span>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
          <div className="mt-5 grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="bg-blue-50 border border-blue-200 rounded-2xl p-5 text-center">
              <MessageSquare className="w-7 h-7 text-blue-600 mx-auto mb-2" />
              <div className="text-slate-700 font-semibold text-sm">Two NCR CounterPoint Integrators Engaged</div>
              <div className="text-slate-500 text-xs mt-1">Covering SXM and the wider Caribbean retailer base</div>
            </div>
            <div className="bg-green-50 border border-green-200 rounded-2xl p-5 text-center">
              <CheckCircle className="w-7 h-7 text-green-600 mx-auto mb-2" />
              <div className="text-slate-700 font-semibold text-sm">Technical Feasibility Confirmed</div>
              <div className="text-slate-500 text-xs mt-1">Non-invasive toggle integration validated</div>
            </div>
            <div className="bg-amber-50 border border-amber-200 rounded-2xl p-5 text-center">
              <Clock className="w-7 h-7 text-amber-600 mx-auto mb-2" />
              <div className="text-slate-700 font-semibold text-sm">Next: Pilot Activation</div>
              <div className="text-slate-500 text-xs mt-1">First DutyBoost-enabled stores at SXM</div>
            </div>
          </div>
          <div className="mt-4 bg-gradient-to-r from-blue-600 to-indigo-700 rounded-2xl p-5 text-white">
            <div className="flex items-center gap-3">
              <ArrowRight className="w-5 h-5" />
              <p className="text-blue-50 text-sm font-medium">
                Both NCR CounterPoint integrators serve as the single integration point — once enabled, every retailer on their supported islands can toggle DutyBoost on without additional development.
              </p>
            </div>
          </div>
        </div>
      </div>
    </SlideWrapper>
  );
}