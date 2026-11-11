import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";
import DutyBoostLogo from "@/components/DutyBoostLogo";
import PositioningLine from "@/components/shared/PositioningLine";
import * as F from "./figures";

function GridBg() {
  return (
    <div className="absolute inset-0 opacity-[0.06]" style={{
      backgroundImage: "linear-gradient(rgba(34,197,94,0.6) 1px, transparent 1px), linear-gradient(90deg, rgba(34,197,94,0.6) 1px, transparent 1px)",
      backgroundSize: "40px 40px",
    }} />
  );
}

export default function SlideThankYou() {
  return (
    <div className="w-full flex flex-col overflow-y-auto lg:overflow-hidden bg-white text-[#052e16]">
      <div className="flex-1 flex flex-col items-center justify-center px-6 md:px-16 text-center relative py-8">
        <GridBg />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] rounded-full opacity-[0.07]"
          style={{ background: "radial-gradient(circle, #22C55E 0%, transparent 70%)" }} />
        <div className="relative z-10 flex flex-col items-center gap-5 lg:gap-7 w-full">
          <div className="bg-white border border-slate-200 rounded-2xl px-8 py-4 shadow-lg">
            <DutyBoostLogo height={48} linkTo={null} />
          </div>
          <div>
            <span className="text-green-600 text-sm font-semibold uppercase tracking-widest">Thank You</span>
            <h1 className="text-3xl md:text-5xl font-heading font-bold text-[#052e16] mt-2 mb-3 leading-tight">
              Let's Turn Your Network<br />
              <span className="text-green-600">Into a Revenue Stream.</span>
            </h1>
            <PositioningLine className="mb-2" />
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 w-full max-w-4xl">
            {[
              { val: F.GROUP_PASSENGERS, label: "Passengers carried in 2025", sub: "Across Air France, KLM and Transavia" },
              { val: F.TOTAL_POINTS, label: "Redemption points", sub: `${F.DESTINATIONS} destinations + ${F.IFE_AIRCRAFT} in-flight` },
              { val: "€0", label: "Cost to Air France-KLM", sub: "No setup fee, no subscription, no risk" },
            ].map((s) => (
              <div key={s.label} className="bg-green-50 border border-green-200 rounded-2xl p-5">
                <div className="text-2xl md:text-3xl font-bold text-green-700 mb-1">{s.val}</div>
                <div className="text-[#052e16] font-semibold text-sm">{s.label}</div>
                <div className="text-slate-500 text-xs mt-1">{s.sub}</div>
              </div>
            ))}
          </div>
          <p className="text-slate-600 text-sm md:text-base max-w-3xl leading-relaxed">
            One lightweight snippet, one performance-based revenue share, and every traveller you already carry becomes a new
            retail opportunity. We would welcome the chance to walk your team through a live integration.
          </p>
          <div className="flex flex-col items-center gap-3">
            <Link
              to="/travel-partner-request"
              className="inline-flex items-center gap-2 bg-green-600 hover:bg-green-700 text-white font-semibold px-7 py-3.5 rounded-xl transition-colors"
            >
              Book a Partnership Call <ArrowRight className="w-4 h-4" />
            </Link>
            <div className="text-xs text-slate-500 border border-slate-200 bg-slate-50 rounded px-4 py-2">
              CONFIDENTIAL — 2026 | Chamber of Commerce: 42053188 | VAT: NL869492068B01
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}