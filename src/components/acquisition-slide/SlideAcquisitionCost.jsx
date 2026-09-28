import { Coins, Megaphone, Users } from "lucide-react";
import AcquisitionFlow from "./AcquisitionFlow";

const LOGO = "https://media.base44.com/images/public/69c97dcd1c1950fa88424690/313f3d7a0_DutyBoostLogo_1.jpg";

function LogoMark({ height = 34 }) {
  return (
    <span className="inline-flex items-center rounded-lg bg-white px-2.5 py-1.5 border border-slate-200 shadow-sm">
      <img src={LOGO} alt="DutyBoost" className="w-auto block" style={{ height: `${height}px` }} />
    </span>
  );
}

function NoPay({ Icon, label }) {
  return (
    <div className="flex items-center gap-3">
      <div className="relative w-11 h-11 shrink-0 rounded-full border-2 border-primary/35 bg-primary/10 flex items-center justify-center">
        <Icon className="w-5 h-5 text-primary" />
        <div className="absolute w-[40px] h-[2px] rounded-full bg-primary rotate-45" />
      </div>
      <div className="text-foreground text-sm font-medium">{label}</div>
    </div>
  );
}

export default function SlideAcquisitionCost() {
  return (
    <div className="relative w-full h-full overflow-hidden bg-white font-body">
      <div
        className="absolute inset-0"
        style={{
          background:
            "linear-gradient(135deg, hsl(216 60% 97%) 0%, hsl(217 50% 95%) 25%, hsl(216 45% 96%) 50%, hsl(220 40% 97%) 75%, hsl(216 55% 96%) 100%)",
        }}
      />
      <div
        className="absolute inset-0"
        style={{
          backgroundImage:
            "linear-gradient(rgba(37,99,235,0.06) 1px, transparent 1px), linear-gradient(90deg, rgba(37,99,235,0.06) 1px, transparent 1px)",
          backgroundSize: "44px 44px",
        }}
      />

      <div className="relative z-10 h-full flex flex-col px-12 py-8">
        <LogoMark height={38} />

        <h1 className="font-heading font-bold text-foreground text-[30px] leading-[1.15] mt-6 max-w-4xl">
          What if Customer <span className="text-primary">Acquisition</span> Cost only existed when a customer{" "}
          <span className="text-primary">actually generated revenue</span>?
        </h1>

        <p className="text-muted-foreground text-sm leading-relaxed mt-5 max-w-3xl">
          Airport Retailers invest heavily in campaigns, media, traffic and customer acquisition — often before knowing
          whether those efforts will generate a sale.
        </p>
        <p className="text-foreground text-sm font-semibold mt-2">At DutyBoost, we believe there is another way.</p>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mt-6">
          <div className="flex flex-col gap-5">
            <div className="bg-white border border-slate-200 rounded-2xl p-5 shadow-sm flex gap-4">
              <div className="w-1 rounded-full bg-primary shrink-0" />
              <div>
                <p className="text-foreground text-base font-semibold leading-snug">
                  If the traveller doesn't generate revenue, there should be no customer acquisition cost.
                </p>
                <p className="text-muted-foreground text-sm mt-1.5">
                  That is why DutyBoost operates on a 100% performance-based model.
                </p>
              </div>
            </div>

            <p className="text-muted-foreground text-sm leading-relaxed">
              We pre-activate travellers before they reach the airport, connect that activation to the retailer's
              existing environment, and measure the incremental revenue generated.
            </p>

            <div>
              <p className="text-foreground text-sm font-semibold mb-3">
                For airport retailers and Duty Free operators, the equation becomes simple:
              </p>
              <AcquisitionFlow />
            </div>
          </div>

          <div className="flex flex-col gap-5">
            <div className="bg-white border border-slate-200 rounded-2xl p-5 shadow-sm space-y-4">
              <NoPay Icon={Coins} label="No paying for potential." />
              <NoPay Icon={Megaphone} label="No paying for exposure." />
              <NoPay Icon={Users} label="No paying for traffic that doesn't convert." />
            </div>

            <div className="bg-primary/10 border border-primary/20 rounded-2xl p-4">
              <p className="text-primary font-heading font-bold text-base">
                Revenue first. Compensation follows performance.
              </p>
            </div>
          </div>
        </div>

        <div className="mt-auto pt-5 border-t border-slate-200 flex items-end gap-8">
          <div className="flex-1">
            <p className="text-muted-foreground text-sm leading-relaxed max-w-xl">
              We believe Customer Acquisition Cost should be aligned with Customer Value.{" "}
              <span className="text-foreground font-semibold">
                What if you only paid when the traveller actually spent?
              </span>
            </p>
            <p className="text-slate-400 text-xs mt-2 tracking-wide">
              #DutyBoost #DutyFree #TravelRetail #CustomerAcquisition #IncrementalRevenue
            </p>
          </div>
          <div className="flex flex-col items-end gap-2.5">
            <p className="text-right text-foreground text-sm font-bold leading-snug max-w-[290px]">
              The retailer doesn't take the acquisition risk upfront. <span className="text-primary">DutyBoost does.</span>
            </p>
            <LogoMark height={28} />
          </div>
        </div>
      </div>
    </div>
  );
}