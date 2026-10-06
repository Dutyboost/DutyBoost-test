import { Coins, Ticket } from "lucide-react";
import { ACCENT } from "./Shared";
import { useDeckLang } from "./LanguageContext";
import { MODEL, num, usd, usdShort } from "./figures";
import { SXM_BASKETS, SXM_REDEMPTIONS, SXM_SINCE_LAUNCH } from "./sxmRedemptions";

// The Sint Maarten redemption card: the live market's daily DutyCredit volumes
// and a sample of the baskets redeemed at the till.
export default function SxmRedemptionCard() {
  const { t } = useDeckLang();
  const c = t.projects.sxm;

  return (
    <div className="relative overflow-hidden rounded-2xl p-3.5 md:p-4 text-white bg-gradient-to-br from-[#0a0f1e] via-[#140c28] to-[#231136] border border-white/10 flex flex-col h-full">
      <div
        className="absolute -top-16 -right-16 w-56 h-56 rounded-full opacity-25 pointer-events-none"
        style={{ background: `radial-gradient(circle, ${ACCENT} 0%, transparent 70%)` }}
      />
      <div className="relative z-10 flex flex-col h-full min-h-0">
        <div className="flex items-start justify-between gap-3">
          <div>
            <div className="flex items-center gap-2">
              <span className="text-sm font-bold tracking-widest text-white/40">SXM</span>
              <Ticket className="w-4 h-4 text-white/40" />
            </div>
            <h3 className="font-heading font-bold text-xl md:text-2xl mt-0.5">{c.country}</h3>
            <p className="text-white/50 text-sm">{c.airport}</p>
          </div>
          <span
            className="flex items-center gap-2 text-xs font-bold uppercase tracking-widest px-3 py-1.5 rounded-full flex-shrink-0"
            style={{ background: "rgba(255,255,255,0.12)", color: "#f5d0fe" }}
          >
            <span className="w-2 h-2 rounded-full bg-green-400" />
            {t.projects.live}
          </span>
        </div>

        <p className="text-sm font-semibold mt-1.5" style={{ color: "#f5d0fe" }}>
          {c.status}
        </p>

        <div className="mt-2 flex-1 min-h-0 space-y-1.5 overflow-hidden">
          <div className="text-xs uppercase tracking-widest text-white/40">{c.redemptionsTitle}</div>
          <div className="rounded-xl bg-white/5 border border-white/10 px-3.5 py-2">
            <span className="text-2xl font-bold" style={{ color: "#f5d0fe" }}>
              {num(SXM_REDEMPTIONS.redeemed)}
            </span>
            <span className="text-sm text-white/60 ml-2">{c.redeemedLabel}</span>
            <div className="text-sm text-white/45 mt-1">
              {c.preActivatedLine(
                num(SXM_REDEMPTIONS.preActivated),
                SXM_REDEMPTIONS.activationPct,
                num(SXM_REDEMPTIONS.passengers)
              )}
            </div>
          </div>

          <div className="rounded-xl bg-white/5 border border-white/10 px-3.5 py-2">
            <div className="text-xs uppercase tracking-widest text-white/40">{c.sinceTitle}</div>
            <div className="mt-1">
              <span className="text-2xl font-bold" style={{ color: "#f5d0fe" }}>
                {usdShort(SXM_SINCE_LAUNCH.retailValue)}
              </span>
              <span className="text-sm text-white/60 ml-2">{c.revenueLabel}</span>
            </div>
            <div className="text-sm text-white/45 mt-1">
              {c.sinceLine(num(SXM_SINCE_LAUNCH.redeemed))}
            </div>
          </div>

          <div className="flex flex-wrap items-center gap-2">
            <span
              className="flex items-center gap-2 rounded-full px-3 py-1.5 text-xs font-bold uppercase tracking-widest"
              style={{ background: `${ACCENT}22`, border: `1px solid ${ACCENT}55`, color: "#f5d0fe" }}
            >
              <Coins className="w-3.5 h-3.5" />
              {c.feePill(MODEL.platformFee * 100)} · {usd(SXM_SINCE_LAUNCH.platformFee)}
            </span>
          </div>

          <div className="text-xs uppercase tracking-widest text-white/40">{c.basketsTitle}</div>
          <div className="space-y-1">
            {SXM_BASKETS.map((b) => (
              <div
                key={b.basket}
                className="flex items-baseline justify-between gap-2 rounded-lg bg-white/5 border border-white/10 px-3 py-0.5"
              >
                <span className="text-base font-bold" style={{ color: "#f5d0fe" }}>
                  {usd(b.basket)}
                </span>
                <span className="text-xs text-white/40 truncate">{b.store}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}