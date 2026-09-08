import { Package, CheckCircle, XCircle, TrendingUp, RefreshCw, Boxes } from "lucide-react";
import { SlideWrapper, GridBg } from "./Shared";

export default function SlideStakeholderSecondary() {
  return (
    <SlideWrapper>
      <div className="flex-1 flex flex-col justify-center px-5 py-6 md:px-12 md:py-6 relative">
        <GridBg />
        <div className="relative z-10">
          <div className="mb-5">
            <span className="text-blue-600 text-sm font-semibold uppercase tracking-widest">Ecosystem — Secondary</span>
            <h2 className="text-xl md:text-3xl font-heading font-bold text-[#0a0f1e] mt-2">
              Wholesale / Retail Suppliers <span className="text-blue-600">— Indirect Beneficiaries</span>
            </h2>
            <p className="text-slate-500 mt-1 text-sm">Suppliers benefit indirectly — faster stock rotation and more frequent reordering — without direct revenue participation.</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="bg-green-50 border border-green-200 rounded-2xl p-6">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-12 h-12 rounded-full bg-green-600 text-white flex items-center justify-center">
                  <Package className="w-6 h-6" />
                </div>
                <h3 className="font-bold text-slate-800 text-lg">Pros</h3>
              </div>
              <ul className="space-y-2.5">
                {[
                  "Faster stock rotation drives more frequent reordering from retailers",
                  "Incremental sell-through from existing shelf space — no new listings",
                  "No direct cost — benefits flow through retailers indirectly",
                  "Brand exposure finally converts into actual sell-through",
                  "Growth in supplier volume without pricing or logistics changes",
                  "Inventory turnover improves across all DutyBoost-enabled stores",
                ].map((p, i) => (
                  <li key={i} className="flex items-start gap-2">
                    <CheckCircle className="w-4 h-4 text-green-600 flex-shrink-0 mt-0.5" />
                    <span className="text-slate-700 text-sm">{p}</span>
                  </li>
                ))}
              </ul>
            </div>
            <div className="bg-red-50 border border-red-200 rounded-2xl p-6">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-12 h-12 rounded-full bg-red-500 text-white flex items-center justify-center">
                  <XCircle className="w-6 h-6" />
                </div>
                <h3 className="font-bold text-slate-800 text-lg">Cons</h3>
              </div>
              <ul className="space-y-2.5">
                {[
                  "No direct revenue participation — benefits are indirect",
                  "Depends entirely on retailer adoption of DutyBoost",
                  "Limited control over DutyCredit tier alignment with products",
                  "Must advocate DutyBoost to retail customers to see benefit",
                  "No direct contractual relationship with DutyBoost",
                  "Benefits lag behind retailer adoption — delayed impact",
                ].map((c, i) => (
                  <li key={i} className="flex items-start gap-2">
                    <XCircle className="w-4 h-4 text-red-500 flex-shrink-0 mt-0.5" />
                    <span className="text-slate-700 text-sm">{c}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-5">
            <div className="bg-slate-800 text-white rounded-2xl p-5 text-center">
              <RefreshCw className="w-8 h-8 text-blue-400 mx-auto mb-2" />
              <div className="text-2xl font-bold text-blue-400">Faster</div>
              <div className="text-slate-300 text-sm">Stock rotation across all enabled stores</div>
            </div>
            <div className="bg-slate-800 text-white rounded-2xl p-5 text-center">
              <TrendingUp className="w-8 h-8 text-green-400 mx-auto mb-2" />
              <div className="text-2xl font-bold text-green-400">More</div>
              <div className="text-slate-300 text-sm">Frequent reordering from retailers</div>
            </div>
            <div className="bg-slate-800 text-white rounded-2xl p-5 text-center">
              <Boxes className="w-8 h-8 text-violet-400 mx-auto mb-2" />
              <div className="text-2xl font-bold text-violet-400">Zero</div>
              <div className="text-slate-300 text-sm">Direct cost or integration required</div>
            </div>
          </div>
          <div className="mt-4 bg-amber-50 border border-amber-300 rounded-2xl p-4">
            <p className="text-slate-700 text-sm font-medium">
              <span className="font-bold">Why secondary:</span> Suppliers don't participate directly in the transaction economics — but they benefit measurably from the increased velocity of product moving through DutyBoost-enabled retailers. Their growth is a lagging indicator of retailer adoption.
            </p>
          </div>
        </div>
      </div>
    </SlideWrapper>
  );
}