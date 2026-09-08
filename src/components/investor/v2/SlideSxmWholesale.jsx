import { Package, MessageSquare, CheckCircle, Store, Boxes } from "lucide-react";
import { SlideWrapper, GridBg } from "./Shared";

export default function SlideSxmWholesale() {
  return (
    <SlideWrapper>
      <div className="flex-1 flex flex-col justify-center px-5 py-6 md:px-12 md:py-6 relative">
        <GridBg />
        <div className="relative z-10">
          <div className="mb-5">
            <span className="text-blue-600 text-sm font-semibold uppercase tracking-widest">Sint Maarten — Wholesale</span>
            <h2 className="text-xl md:text-3xl font-heading font-bold text-[#0a0f1e] mt-2">
              Conversations with{" "}
              <a href="https://www.divico.shop" target="_blank" rel="noopener noreferrer" className="text-blue-600 underline decoration-blue-600/50 hover:decoration-blue-400 hover:text-blue-500 transition-colors">Divico</a>
              {" "}&amp;{" "}
              <a href="https://www.iltt-sxm.com" target="_blank" rel="noopener noreferrer" className="text-blue-600 underline decoration-blue-600/50 hover:decoration-blue-400 hover:text-blue-500 transition-colors">ILTT</a>
            </h2>
            <p className="text-slate-500 mt-1 text-sm">Wholesale and distribution partners at Princess Juliana International Airport — the supply chain that feeds SXM airport retail.</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {[
              {
                name: "Divico",
                website: "https://www.divico.shop",
                role: "Wholesale Distribution",
                status: "Active Conversation",
                statusColor: "bg-green-100 text-green-700 border-green-300",
                points: [
                  "Wholesale distributor supplying SXM airport retailers",
                  "Discussed how DutyBoost-driven sell-through accelerates reordering",
                  "Faster stock rotation = more frequent purchase orders",
                  "No direct cost — benefits flow through retailer transactions",
                  "Explored category alignment with DutyCredit tiers",
                ],
              },
              {
                name: "ILTT",
                website: "https://www.iltt-sxm.com",
                fullName: "International Liquor & Tobacco Trading N.V.",
                role: "Duty-Free Wholesale & Retail",
                status: "Active Conversation",
                statusColor: "bg-green-100 text-green-700 border-green-300",
                points: [
                  "Operates Princess Promenade duty-free stores at SXM",
                  "Joint venture with Penha Group — 6 retail outlets total",
                  "Liquor, tobacco, spirits, wine, beer & beverages",
                  "Discussed DutyBoost activation across their duty-free stores",
                  "Both wholesale supplier and retailer — dual benefit",
                ],
              },
            ].map((p) => (
              <div key={p.name} className="bg-slate-50 border border-slate-200 rounded-2xl p-6">
                <div className="flex items-center justify-between mb-3">
                  <div className="flex items-center gap-3">
                    <div className="w-12 h-12 rounded-full bg-green-600 text-white flex items-center justify-center">
                      <Package className="w-6 h-6" />
                    </div>
                    <div>
                      <h3 className="font-bold text-slate-800 text-lg">
                        <a href={p.website} target="_blank" rel="noopener noreferrer" className="text-blue-600 underline decoration-blue-600/50 hover:decoration-blue-400 hover:text-blue-500 transition-colors">{p.name}</a>
                      </h3>
                      {p.fullName && <div className="text-slate-500 text-xs">{p.fullName}</div>}
                      <div className="text-slate-500 text-xs">{p.role}</div>
                    </div>
                  </div>
                  <span className={`text-xs font-semibold px-3 py-1 rounded-full border ${p.statusColor}`}>{p.status}</span>
                </div>
                <ul className="space-y-2">
                  {p.points.map((pt, i) => (
                    <li key={i} className="flex items-start gap-2">
                      <CheckCircle className="w-4 h-4 text-green-600 flex-shrink-0 mt-0.5" />
                      <span className="text-slate-600 text-sm">{pt}</span>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
          <div className="mt-5 grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="bg-blue-50 border border-blue-200 rounded-2xl p-5 text-center">
              <Store className="w-7 h-7 text-blue-600 mx-auto mb-2" />
              <div className="text-slate-700 font-semibold text-sm">6 ILTT/Penha Stores</div>
              <div className="text-slate-500 text-xs mt-1">At SXM Princess Promenade</div>
            </div>
            <div className="bg-violet-50 border border-violet-200 rounded-2xl p-5 text-center">
              <Boxes className="w-7 h-7 text-violet-600 mx-auto mb-2" />
              <div className="text-slate-700 font-semibold text-sm">Faster Reordering</div>
              <div className="text-slate-500 text-xs mt-1">DutyBoost sell-through drives wholesale velocity</div>
            </div>
            <div className="bg-green-50 border border-green-200 rounded-2xl p-5 text-center">
              <MessageSquare className="w-7 h-7 text-green-600 mx-auto mb-2" />
              <div className="text-slate-700 font-semibold text-sm">Dual Benefit</div>
              <div className="text-slate-500 text-xs mt-1">ILTT benefits as both wholesaler & retailer</div>
            </div>
          </div>
          <div className="mt-4 bg-amber-50 border border-amber-300 rounded-2xl p-4">
            <p className="text-slate-700 text-sm font-medium">
              <span className="font-bold">Strategic significance:</span> Wholesale partners like Divico and ILTT sit upstream of the retailer — when they advocate DutyBoost to their retail customers, adoption accelerates across multiple stores simultaneously.
            </p>
          </div>
        </div>
      </div>
    </SlideWrapper>
  );
}