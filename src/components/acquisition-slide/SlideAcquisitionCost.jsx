import { Coins, Megaphone, Users } from "lucide-react";
import AcquisitionFlow from "./AcquisitionFlow";

const BRAND_BLUE = "#0055ff";
const NAVY = "#081439";
const BACKGROUND = "https://media.base44.com/images/public/69c97dcd1c1950fa88424690/96bcc83f7_generated_image.png";
const LOGO = "https://media.base44.com/images/public/69c97dcd1c1950fa88424690/313f3d7a0_DutyBoostLogo_1.jpg";

function LogoCard({ height }) {
  return (
    <div className="bg-white rounded-lg shadow-lg px-3 py-1.5 inline-flex items-center">
      <img src={LOGO} alt="DutyBoost" className="w-auto block" style={{ height: `${height}px` }} />
    </div>
  );
}

function NoPayIcon({ Icon, label }) {
  return (
    <div className="flex flex-col items-center text-center gap-2.5">
      <div
        className="relative w-14 h-14 rounded-full border-2 flex items-center justify-center"
        style={{ borderColor: BRAND_BLUE, backgroundColor: "rgba(0,85,255,0.10)" }}
      >
        <Icon className="w-6 h-6 text-white" />
        <div
          className="absolute w-[54px] h-[2px] rounded-full"
          style={{ backgroundColor: BRAND_BLUE, transform: "rotate(-45deg)" }}
        />
      </div>
      <div className="text-slate-200 text-xs leading-snug max-w-[170px]">{label}</div>
    </div>
  );
}

export default function SlideAcquisitionCost() {
  return (
    <div className="relative w-full h-full overflow-hidden" style={{ backgroundColor: NAVY }}>
      <img src={BACKGROUND} alt="" className="absolute inset-0 w-full h-full object-cover" />
      <div
        className="absolute inset-0"
        style={{ background: `linear-gradient(90deg, ${NAVY} 0%, rgba(8,20,57,0.93) 45%, rgba(8,20,57,0.72) 100%)` }}
      />
      <div className="absolute inset-0" style={{ background: "linear-gradient(180deg, rgba(5,10,20,0.55) 0%, rgba(8,20,57,0.25) 45%, rgba(5,10,20,0.85) 100%)" }} />

      {/* Brand sweep, bottom right */}
      <svg className="absolute bottom-0 right-0 w-[55%] h-[32%]" viewBox="0 0 100 100" preserveAspectRatio="none">
        <defs>
          <linearGradient id="dbSweep" x1="0" y1="1" x2="1" y2="0">
            <stop offset="0%" stopColor="#ffffff" stopOpacity="0.06" />
            <stop offset="55%" stopColor={BRAND_BLUE} stopOpacity="0.55" />
            <stop offset="100%" stopColor={BRAND_BLUE} stopOpacity="0.95" />
          </linearGradient>
        </defs>
        <path d="M0,100 C30,72 55,42 100,32 L100,100 Z" fill="url(#dbSweep)" />
      </svg>

      <div className="relative z-10 h-full flex flex-col px-12 py-8">
        {/* Header */}
        <div className="flex items-center gap-4">
          <LogoCard height={38} />
          <span className="text-[11px] font-semibold tracking-[0.28em]" style={{ color: BRAND_BLUE }}>
            TRAVELLERS SPEND MORE
          </span>
        </div>

        {/* Headline */}
        <h1 className="font-heading font-bold text-white text-[30px] leading-[1.15] mt-7 max-w-4xl">
          What if Customer <span style={{ color: BRAND_BLUE }}>Acquisition</span> Cost only existed when a customer{" "}
          <span style={{ color: BRAND_BLUE }}>actually generated revenue</span>?
        </h1>

        <p className="text-slate-300 text-sm leading-relaxed mt-5 max-w-2xl">
          Retailers invest heavily in campaigns, media, traffic and customer acquisition — often before knowing whether
          those efforts will generate a sale.
          <br />
          At <span className="text-white font-semibold">DutyBoost</span>, we believe there is another way.
        </p>

        {/* Value proposition */}
        <div className="flex gap-4 mt-6 max-w-2xl">
          <div className="w-1 rounded-full shrink-0" style={{ backgroundColor: BRAND_BLUE }} />
          <div>
            <p className="text-white text-base font-semibold leading-snug">
              If the traveller doesn't generate revenue, there should be no customer acquisition cost.
            </p>
            <p className="text-slate-300 text-sm mt-1">
              That is why DutyBoost operates on a 100% performance-based model.
            </p>
          </div>
        </div>

        {/* What we don't charge for */}
        <div className="flex items-start gap-14 mt-7">
          <NoPayIcon Icon={Coins} label="No paying for potential." />
          <NoPayIcon Icon={Megaphone} label="No paying for exposure." />
          <NoPayIcon Icon={Users} label="No paying for traffic that doesn't convert." />
        </div>

        {/* Process */}
        <p className="text-slate-300 text-sm leading-relaxed mt-7 max-w-3xl">
          We pre-activate travellers before they reach the airport, connect that activation to the retailer's existing
          environment, and measure the incremental revenue generated.
        </p>
        <div className="mt-4">
          <AcquisitionFlow />
        </div>

        {/* Footer */}
        <div className="mt-auto flex items-end gap-8 pt-4">
          <p className="flex-1 max-w-xl text-slate-300 text-xs leading-relaxed">
            We believe Customer Acquisition Cost should be aligned with Customer Value.{" "}
            <span className="text-white font-semibold">What if you only paid when the traveller actually spent?</span>
          </p>
          <div className="flex flex-col items-end gap-2.5">
            <p className="max-w-[290px] text-right text-white text-sm font-bold leading-snug">
              The retailer doesn't take the acquisition risk upfront.{" "}
              <span style={{ color: BRAND_BLUE }}>DutyBoost does.</span>
            </p>
            <LogoCard height={30} />
          </div>
        </div>
      </div>
    </div>
  );
}