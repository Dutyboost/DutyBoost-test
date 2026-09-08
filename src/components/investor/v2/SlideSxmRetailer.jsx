import { Store, MessageSquare, CheckCircle, TrendingUp, ShoppingBag } from "lucide-react";
import { SlideWrapper, GridBg } from "./Shared";

export default function SlideSxmRetailer() {
  return (
    <SlideWrapper>
      <div className="flex-1 flex flex-col justify-center px-5 py-6 md:px-12 md:py-6 relative">
        <GridBg />
        <div className="relative z-10">
          <div className="mb-5">
            <span className="text-blue-600 text-sm font-semibold uppercase tracking-widest">Sint Maarten — Retailer</span>
            <h2 className="text-xl md:text-3xl font-heading font-bold text-[#0a0f1e] mt-2">
              Conversation with <span className="text-blue-600">Dutch Delight</span>
            </h2>
            <p className="text-slate-500 mt-1 text-sm">A retailer operating at Princess Juliana International Airport — representing the retail endpoint where DutyCredits are redeemed and incremental sales are captured.</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="bg-slate-50 border border-slate-200 rounded-2xl p-6">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-12 h-12 rounded-full bg-blue-600 text-white flex items-center justify-center">
                  <Store className="w-6 h-6" />
                </div>
                <div>
                  <h3 className="font-bold text-slate-800 text-lg">Dutch Delight</h3>
                  <div className="text-slate-500 text-xs">Airport Retailer — SXM</div>
                </div>
              </div>
              <ul className="space-y-2.5">
                {[
                  "Discussed the performance-based model — zero upfront cost",
                  "Reviewed the DutyCredit tier structure and 87.5% retailer net",
                  "Confirmed interest in pre-activated travellers arriving with purchase intent",
                  "10% discount on qualifying transactions only — no impact on existing sales",
                  "Toggle-on approach: Dutch Delight activates DutyBoost via POS toggle",
                  "First-mover advantage: attracts pre-activated travellers ahead of competitors",
                ].map((pt, i) => (
                  <li key={i} className="flex items-start gap-2">
                    <CheckCircle className="w-4 h-4 text-blue-600 flex-shrink-0 mt-0.5" />
                    <span className="text-slate-600 text-sm">{pt}</span>
                  </li>
                ))}
              </ul>
            </div>
            <div className="flex flex-col gap-4">
              <div className="bg-blue-50 border border-blue-200 rounded-2xl p-5">
                <h3 className="font-bold text-blue-900 mb-3">The Retailer Value Proposition at SXM</h3>
                <div className="space-y-2.5 text-sm">
                  {[
                    { metric: "Incremental revenue", val: "From 625K non-purchasing travellers" },
                    { metric: "Upfront cost", val: "$0 — no setup, subscription or integration fees" },
                    { metric: "Customer acquisition", val: "Handled by Travel & Corporate Partners before arrival" },
                    { metric: "Marketing spend", val: "Not required — travellers arrive pre-activated" },
                    { metric: "Retailer keeps", val: "87.5% of every qualifying sale" },
                    { metric: "Payment terms", val: "Performance-based — only on validated transactions" },
                  ].map((row) => (
                    <div key={row.metric} className="flex items-start gap-2">
                      <CheckCircle className="w-4 h-4 text-green-600 flex-shrink-0 mt-0.5" />
                      <div>
                        <span className="text-slate-700 font-semibold">{row.metric}: </span>
                        <span className="text-slate-600">{row.val}</span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
              <div className="bg-gradient-to-br from-blue-600 to-indigo-700 rounded-2xl p-5 text-white">
                <div className="flex items-center gap-2 mb-2">
                  <ShoppingBag className="w-5 h-5" />
                  <h3 className="font-bold">The Core Question for Retailers</h3>
                </div>
                <p className="text-lg font-bold leading-snug">
                  "Is earning $87.50 from an incremental $100 sale — without any upfront acquisition cost — more valuable than earning $0 from a traveller who otherwise wouldn't have converted?"
                </p>
                <p className="text-sm mt-2 opacity-80">Yes. Every time.</p>
              </div>
            </div>
          </div>
          <div className="mt-5 grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="bg-green-50 border border-green-200 rounded-2xl p-5 text-center">
              <TrendingUp className="w-7 h-7 text-green-600 mx-auto mb-2" />
              <div className="text-slate-700 font-semibold text-sm">Incremental Revenue</div>
              <div className="text-slate-500 text-xs mt-1">From travellers who otherwise walk past</div>
            </div>
            <div className="bg-blue-50 border border-blue-200 rounded-2xl p-5 text-center">
              <MessageSquare className="w-7 h-7 text-blue-600 mx-auto mb-2" />
              <div className="text-slate-700 font-semibold text-sm">Active Conversation</div>
              <div className="text-slate-500 text-xs mt-1">Pilot-ready retailer at SXM</div>
            </div>
            <div className="bg-violet-50 border border-violet-200 rounded-2xl p-5 text-center">
              <Store className="w-7 h-7 text-violet-600 mx-auto mb-2" />
              <div className="text-slate-700 font-semibold text-sm">First-Mover Advantage</div>
              <div className="text-slate-500 text-xs mt-1">Attracts pre-activated travellers ahead of competitors</div>
            </div>
          </div>
        </div>
      </div>
    </SlideWrapper>
  );
}